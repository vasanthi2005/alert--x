import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/sections/HomePage';
import { CrowdSimulation } from '@/components/CrowdSimulation';
import { AlertDashboard } from '@/components/AlertDashboard';
import { AlertsPage } from '@/components/sections/AlertsPage';
import { ContactPage } from '@/components/sections/ContactPage';
import { EmergencyPage } from '@/components/sections/EmergencyPage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Play,
  Pause,
  RotateCcw,
  BarChart3
} from 'lucide-react';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [crowdSize, setCrowdSize] = useState(150);
  const [currentRisk, setCurrentRisk] = useState<'safe' | 'warning' | 'danger'>('safe');

  const handleRiskDetected = (level: 'safe' | 'warning' | 'danger') => {
    setCurrentRisk(level);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    if (section === 'demo') {
      startDemo();
    }
  };

  const startDemo = () => {
    setIsSimulationActive(true);
    setCrowdSize(250); // Trigger overcrowding for demo
    setCurrentSection('demo');
  };

  const resetDemo = () => {
    setIsSimulationActive(false);
    setCrowdSize(150);
    setCurrentRisk('safe');
  };

  // Render different sections based on current selection
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onSectionChange={handleSectionChange} />;
      
      case 'demo':
        return (
          <div className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Live Crowd Simulation Demo</h1>
                <p className="text-xl text-muted-foreground">
                  Experience real-time crowd monitoring with heat map visualization and automated alerts
                </p>
                
                <div className="flex justify-center gap-4 mt-6">
                  <Button 
                    onClick={startDemo}
                    disabled={isSimulationActive}
                    className="gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {isSimulationActive ? 'Demo Active' : 'Start Demo'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={resetDemo}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <CrowdSimulation 
                    isActive={isSimulationActive}
                    crowdSize={crowdSize}
                    onRiskDetected={handleRiskDetected}
                  />
                </div>
                <div className="xl:col-span-1">
                  <AlertDashboard 
                    currentRisk={currentRisk}
                    crowdSize={crowdSize}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4">
              <AlertDashboard 
                currentRisk={currentRisk}
                crowdSize={crowdSize}
              />
            </div>
          </div>
        );
      
      case 'alerts':
        return <AlertsPage currentRisk={currentRisk} crowdSize={crowdSize} />;
      
      case 'contact':
        return <ContactPage />;
      
      case 'emergency':
        return <EmergencyPage riskLevel={currentRisk} crowdSize={crowdSize} />;
      
      default:
        return <HomePage onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        riskLevel={currentRisk}
      />
      {renderCurrentSection()}
    </div>
  );
};

export default Index;