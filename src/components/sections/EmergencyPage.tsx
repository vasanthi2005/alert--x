import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Siren, 
  AlertTriangle, 
  Phone, 
  Users, 
  MapPin, 
  Clock, 
  Shield, 
  Volume2,
  RadioIcon,
  Megaphone
} from 'lucide-react';

interface EmergencyPageProps {
  riskLevel: 'safe' | 'warning' | 'danger';
  crowdSize: number;
}

export const EmergencyPage = ({ riskLevel, crowdSize }: EmergencyPageProps) => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [responseTime, setResponseTime] = useState(0);

  useEffect(() => {
    if (riskLevel === 'danger') {
      setEmergencyActive(true);
      const timer = setInterval(() => {
        setResponseTime(prev => prev + 0.1);
      }, 100);
      return () => clearInterval(timer);
    } else {
      setEmergencyActive(false);
      setResponseTime(0);
    }
  }, [riskLevel]);

  const emergencyActions = [
    {
      title: 'Loudspeaker Alert',
      status: riskLevel === 'danger' ? 'active' : 'standby',
      message: 'Crowd density alert activated',
      icon: Volume2
    },
    {
      title: 'Police Notification',
      status: riskLevel === 'danger' ? 'notified' : 'standby', 
      message: 'Control room alerted automatically',
      icon: Shield
    },
    {
      title: 'Crowd Redirection',
      status: riskLevel === 'danger' ? 'active' : 'standby',
      message: 'Alternative routes activated',
      icon: Users
    },
    {
      title: 'Emergency Broadcast',
      status: riskLevel === 'danger' ? 'broadcasting' : 'standby',
      message: 'Public address system engaged',
      icon: Megaphone
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'notified':
      case 'broadcasting':
        return 'text-safe bg-safe/10 border-safe';
      case 'standby':
        return 'text-muted-foreground bg-muted/50 border-border';
      default:
        return 'text-muted-foreground bg-muted/50 border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Emergency Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 ${
            emergencyActive 
              ? 'bg-danger text-danger-foreground animate-pulse' 
              : 'bg-muted text-muted-foreground'
          }`}>
            <Siren className={`w-6 h-6 ${emergencyActive ? 'animate-spin' : ''}`} />
            <span className="font-bold text-lg">
              {emergencyActive ? 'EMERGENCY PROTOCOL ACTIVE' : 'EMERGENCY SYSTEMS READY'}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Emergency Response Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Automated emergency protocols and real-time crisis management system
          </p>
        </div>

        {/* Emergency Status Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Current Status */}
          <Card className={`p-8 text-center border-2 ${
            emergencyActive 
              ? 'bg-danger/10 border-danger animate-pulse' 
              : 'bg-safe/10 border-safe'
          }`}>
            <AlertTriangle className={`w-16 h-16 mx-auto mb-4 ${
              emergencyActive ? 'text-danger animate-bounce' : 'text-safe'
            }`} />
            <h3 className="text-2xl font-bold mb-2">Alert Status</h3>
            <Badge 
              variant={emergencyActive ? 'destructive' : 'outline'}
              className="text-lg px-4 py-2 mb-4"
            >
              {riskLevel.toUpperCase()}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {emergencyActive 
                ? 'Emergency protocols activated' 
                : 'All systems monitoring normally'
              }
            </p>
          </Card>

          {/* Response Time */}
          <Card className="p-8 text-center">
            <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Response Time</h3>
            <div className="text-4xl font-bold text-primary mb-2">
              {responseTime.toFixed(1)}s
            </div>
            <p className="text-sm text-muted-foreground">
              {emergencyActive 
                ? 'Active response duration' 
                : 'Ready for instant response'
              }
            </p>
          </Card>

          {/* People Count */}
          <Card className="p-8 text-center">
            <Users className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Crowd Size</h3>
            <div className="text-4xl font-bold text-accent mb-2">
              {crowdSize}
            </div>
            <p className="text-sm text-muted-foreground">
              People currently monitored
            </p>
          </Card>
        </div>

        {/* Active Emergency Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Emergency Response Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className={`p-6 border ${getStatusColor(action.status)}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      action.status === 'standby' 
                        ? 'bg-muted' 
                        : 'bg-safe/20 animate-pulse'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        action.status === 'standby' 
                          ? 'text-muted-foreground' 
                          : 'text-safe'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{action.title}</h3>
                      <p className="text-sm opacity-80">{action.message}</p>
                      <Badge 
                        variant="outline" 
                        className={`mt-2 ${getStatusColor(action.status)}`}
                      >
                        {action.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Procedures */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-2xl font-bold mb-6 text-center">Automated Emergency Procedures</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <RadioIcon className="w-5 h-5 text-primary" />
                Immediate Response (0-30 seconds)
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                  <span>AI detects dangerous crowd density patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                  <span>Automatic loudspeaker alerts activated</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                  <span>Police control room receives instant notification</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                  <span>Digital displays show crowd redirection messages</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Escalation Protocol (30+ seconds)
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <span>Emergency services team dispatched to location</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <span>Additional exit routes opened automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <span>Medical teams placed on high alert</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <span>Crowd control barriers deployed if available</span>
                </li>
              </ul>
            </div>
          </div>

          {emergencyActive && (
            <div className="mt-8 p-6 bg-danger/10 border border-danger/20 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Siren className="w-6 h-6 text-danger animate-spin" />
                <h3 className="text-lg font-bold text-danger">CURRENT EMERGENCY STATUS</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">Location:</div>
                  <div className="text-muted-foreground">Gate B - Entry Zone</div>
                </div>
                <div>
                  <div className="font-medium">Risk Level:</div>
                  <div className="text-danger font-bold">CRITICAL</div>
                </div>
                <div>
                  <div className="font-medium">Action Taken:</div>
                  <div className="text-safe">Automatic Response Active</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};