import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Person {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  riskLevel: 'safe' | 'warning' | 'danger';
}

interface CrowdSimulationProps {
  isActive: boolean;
  crowdSize: number;
  onRiskDetected: (level: 'safe' | 'warning' | 'danger') => void;
}

export const CrowdSimulation = ({ isActive, crowdSize, onRiskDetected }: CrowdSimulationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [riskLevel, setRiskLevel] = useState<'safe' | 'warning' | 'danger'>('safe');
  const animationRef = useRef<number>();

  // Initialize crowd
  useEffect(() => {
    const newPeople: Person[] = [];
    for (let i = 0; i < crowdSize; i++) {
      newPeople.push({
        id: i,
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: Math.random() * 300 + 350, // Exit area
        targetY: Math.random() * 200 + 50,
        riskLevel: 'safe'
      });
    }
    setPeople(newPeople);
  }, [crowdSize]);

  // Animation loop
  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setPeople(prev => {
        const updated = prev.map(person => {
          // Move toward target
          const dx = person.targetX - person.x;
          const dy = person.targetY - person.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 5) {
            person.vx = (dx / distance) * 1.5;
            person.vy = (dy / distance) * 1.5;
          }

          // Apply crowd pressure simulation
          let nearbyCount = 0;
          prev.forEach(other => {
            if (other.id !== person.id) {
              const dist = Math.sqrt((other.x - person.x) ** 2 + (other.y - person.y) ** 2);
              if (dist < 20) {
                nearbyCount++;
                // Repulsion force when too close
                if (dist < 15) {
                  const repelX = (person.x - other.x) / dist * 0.5;
                  const repelY = (person.y - other.y) / dist * 0.5;
                  person.vx += repelX;
                  person.vy += repelY;
                }
              }
            }
          });

          // Determine risk level based on density
          person.riskLevel = nearbyCount > 6 ? 'danger' : nearbyCount > 3 ? 'warning' : 'safe';

          // Update position
          person.x += person.vx;
          person.y += person.vy;

          // Boundary constraints
          person.x = Math.max(10, Math.min(790, person.x));
          person.y = Math.max(10, Math.min(290, person.y));

          return person;
        });

        // Calculate overall risk level
        const dangerCount = updated.filter(p => p.riskLevel === 'danger').length;
        const warningCount = updated.filter(p => p.riskLevel === 'warning').length;
        
        let overallRisk: 'safe' | 'warning' | 'danger' = 'safe';
        if (dangerCount > crowdSize * 0.15) overallRisk = 'danger';
        else if (dangerCount > crowdSize * 0.05 || warningCount > crowdSize * 0.3) overallRisk = 'warning';

        if (overallRisk !== riskLevel) {
          setRiskLevel(overallRisk);
          onRiskDetected(overallRisk);
        }

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, crowdSize, riskLevel, onRiskDetected]);

  // Canvas rendering with heat map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, 800, 300);

      // Draw heat map background
      const gridSize = 40;
      for (let x = 0; x < 800; x += gridSize) {
        for (let y = 0; y < 300; y += gridSize) {
          let density = 0;
          people.forEach(person => {
            const distance = Math.sqrt((person.x - (x + gridSize/2)) ** 2 + (person.y - (y + gridSize/2)) ** 2);
            if (distance < gridSize) {
              density += 1 - (distance / gridSize);
            }
          });
          
          // Heat map coloring
          const intensity = Math.min(density / 3, 1);
          if (intensity > 0.1) {
            const red = Math.floor(255 * intensity);
            const green = Math.floor(255 * (1 - intensity));
            ctx.fillStyle = `rgba(${red}, ${green}, 0, ${intensity * 0.3})`;
            ctx.fillRect(x, y, gridSize, gridSize);
          }
        }
      }

      // Draw background zones
      ctx.fillStyle = 'rgba(20, 30, 50, 0.1)';
      ctx.fillRect(0, 0, 400, 300); // Entry zone

      ctx.fillStyle = 'rgba(34, 197, 94, 0.05)';
      ctx.fillRect(400, 0, 400, 300); // Exit zone

      // Draw zone labels
      ctx.fillStyle = 'rgba(210, 214, 240, 0.8)';
      ctx.font = '14px sans-serif';
      ctx.fillText('Entry Zone', 20, 25);
      ctx.fillText('Exit Zone', 420, 25);
      
      // Add heat map legend
      ctx.fillText('Heat Map: ', 20, 280);
      ctx.fillStyle = 'rgba(0, 255, 0, 0.6)';
      ctx.fillRect(90, 270, 20, 10);
      ctx.fillStyle = 'rgba(210, 214, 240, 0.8)';
      ctx.font = '10px sans-serif';
      ctx.fillText('Low', 115, 278);
      
      ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
      ctx.fillRect(140, 270, 20, 10);
      ctx.fillStyle = 'rgba(210, 214, 240, 0.8)';
      ctx.fillText('Med', 165, 278);
      
      ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
      ctx.fillRect(190, 270, 20, 10);
      ctx.fillStyle = 'rgba(210, 214, 240, 0.8)';
      ctx.fillText('High', 215, 278);

      // Draw people with enhanced visualization
      people.forEach(person => {
        const colors = {
          safe: '#22c55e',
          warning: '#eab308', 
          danger: '#ef4444'
        };

        // Draw person with glow effect for danger
        if (person.riskLevel === 'danger') {
          ctx.shadowColor = colors[person.riskLevel];
          ctx.shadowBlur = 10;
        }

        ctx.beginPath();
        ctx.arc(person.x, person.y, person.riskLevel === 'danger' ? 7 : 5, 0, 2 * Math.PI);
        ctx.fillStyle = colors[person.riskLevel];
        ctx.fill();
        
        if (person.riskLevel === 'danger') {
          ctx.strokeStyle = colors[person.riskLevel];
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      requestAnimationFrame(render);
    };

    render();
  }, [people]);

  const getRiskBadgeVariant = () => {
    switch (riskLevel) {
      case 'danger': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'danger': return 'text-danger';
      case 'warning': return 'text-warning';  
      default: return 'text-safe';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Crowd Simulation</h3>
        <div className="flex items-center gap-2">
          <Badge variant={getRiskBadgeVariant()} className={getRiskColor()}>
            {riskLevel.toUpperCase()}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {people.length} people tracked
          </span>
        </div>
      </div>
      
      <div className="relative border border-border rounded-lg overflow-hidden">
        <canvas 
          ref={canvasRef}
          width={800}
          height={300}
          className="w-full h-[300px] bg-card"
        />
        
        {riskLevel === 'danger' && (
          <div className="absolute top-2 left-2 bg-danger/90 text-danger-foreground px-3 py-1 rounded-md text-sm font-medium animate-pulse">
            ⚠ STAMPEDE RISK DETECTED
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-safe rounded-full"></div>
          <span>Safe Movement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span>Moderate Density</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-danger rounded-full"></div>
          <span>High Risk Zone</span>
        </div>
      </div>
    </Card>
  );
};