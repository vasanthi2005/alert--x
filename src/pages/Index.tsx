import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CrowdSimulation } from '@/components/CrowdSimulation';
import { AlertDashboard } from '@/components/AlertDashboard';
import heroControlRoom from '@/assets/hero-control-room.jpg';
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Eye, 
  Zap, 
  TrendingUp,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const Index = () => {
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [crowdSize, setCrowdSize] = useState(150);
  const [currentRisk, setCurrentRisk] = useState<'safe' | 'warning' | 'danger'>('safe');

  const handleRiskDetected = (level: 'safe' | 'warning' | 'danger') => {
    setCurrentRisk(level);
  };

  const startDemo = () => {
    setIsSimulationActive(true);
    setCrowdSize(250); // Trigger overcrowding for demo
  };

  const resetDemo = () => {
    setIsSimulationActive(false);
    setCrowdSize(150);
    setCurrentRisk('safe');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroControlRoom} 
            alt="AI-powered crowd monitoring control room" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-accent/10"></div>
        </div>
        
        <div className="relative z-10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Safety System</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Alert<span className="text-primary">X</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Prevent stampedes before they happen with real-time crowd density monitoring and instant early warning alerts
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={startDemo}
                  disabled={isSimulationActive}
                  variant="hero"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Live Demo
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={resetDemo}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset System
                </Button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-2">0.3s</div>
                <div className="text-sm text-muted-foreground">Detection Time</div>
              </Card>
              <Card className="p-6 text-center bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-safe mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Prevention Rate</div>
              </Card>
              <Card className="p-6 text-center bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-accent mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Lives Saved</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Simulation Area */}
          <div className="xl:col-span-2">
            <CrowdSimulation 
              isActive={isSimulationActive}
              crowdSize={crowdSize}
              onRiskDetected={handleRiskDetected}
            />
          </div>

          {/* Alert Dashboard */}
          <div className="xl:col-span-1">
            <AlertDashboard 
              currentRisk={currentRisk}
              crowdSize={crowdSize}
            />
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How AlertX Saves Lives</h2>
            <p className="text-lg text-muted-foreground">
              Advanced AI monitors crowd patterns and prevents tragedies before they happen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-glow transition-all duration-300">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Vision</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered cameras track crowd density and movement patterns continuously
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-alert transition-all duration-300">
              <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Instant Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Automated warnings when dangerous conditions are detected
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-safe transition-all duration-300">
              <Users className="w-12 h-12 text-safe mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Crowd Control</h3>
              <p className="text-sm text-muted-foreground">
                Dynamic crowd redirection to prevent bottlenecks and overcrowding
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-glow transition-all duration-300">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Sub-second response time for maximum protection effectiveness
              </p>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">
              Preventing Tragedies at Scale
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              From Ganesh immersion festivals to concerts and sporting events, AlertX protects 
              thousands of lives by detecting dangerous crowd conditions before they become deadly.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-primary border-primary">Festivals</Badge>
              <Badge variant="outline" className="text-primary border-primary">Concerts</Badge>
              <Badge variant="outline" className="text-primary border-primary">Stadiums</Badge>
              <Badge variant="outline" className="text-primary border-primary">Pilgrimage Sites</Badge>
              <Badge variant="outline" className="text-primary border-primary">Malls</Badge>
              <Badge variant="outline" className="text-primary border-primary">Airports</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;