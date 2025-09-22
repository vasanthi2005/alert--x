import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Users, MapPin, Volume2 } from 'lucide-react';

interface Alert {
  id: string;
  type: 'stampede' | 'overcrowding' | 'bottleneck';
  location: string;
  severity: 'safe' | 'warning' | 'danger';
  timestamp: Date;
  peopleCount: number;
  status: 'active' | 'resolved' | 'acknowledged';
}

interface AlertDashboardProps {
  currentRisk: 'safe' | 'warning' | 'danger';
  crowdSize: number;
}

export const AlertDashboard = ({ currentRisk, crowdSize }: AlertDashboardProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeAlerts: 0,
    livesProtected: 0,
    responseTime: '0.3s'
  });

  // Generate alerts based on risk level
  useEffect(() => {
    if (currentRisk === 'danger' && alerts.length === 0) {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: 'stampede',
        location: 'Gate B - Entry Zone',
        severity: 'danger',
        timestamp: new Date(),
        peopleCount: crowdSize,
        status: 'active'
      };
      setAlerts(prev => [newAlert, ...prev]);
      setStats(prev => ({
        ...prev,
        totalAlerts: prev.totalAlerts + 1,
        activeAlerts: prev.activeAlerts + 1,
        livesProtected: prev.livesProtected + crowdSize
      }));
    } else if (currentRisk === 'warning' && !alerts.some(a => a.severity === 'warning' && a.status === 'active')) {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: 'overcrowding',
        location: 'Main Corridor',
        severity: 'warning',
        timestamp: new Date(),
        peopleCount: crowdSize,
        status: 'active'
      };
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      setStats(prev => ({
        ...prev,
        totalAlerts: prev.totalAlerts + 1,
        activeAlerts: prev.activeAlerts + 1
      }));
    }
  }, [currentRisk, crowdSize, alerts.length]);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' as const }
        : alert
    ));
    setStats(prev => ({
      ...prev,
      activeAlerts: Math.max(0, prev.activeAlerts - 1)
    }));
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'stampede': return <AlertTriangle className="w-4 h-4" />;
      case 'overcrowding': return <Users className="w-4 h-4" />;
      case 'bottleneck': return <MapPin className="w-4 h-4" />;
    }
  };

  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'danger': return 'text-danger border-danger bg-danger/10';
      case 'warning': return 'text-warning border-warning bg-warning/10';
      default: return 'text-safe border-safe bg-safe/10';
    }
  };

  const getStatusColor = (severity: 'safe' | 'warning' | 'danger') => {
    switch (severity) {
      case 'danger': return 'bg-gradient-to-r from-danger to-danger/80 shadow-alert';
      case 'warning': return 'bg-gradient-to-r from-warning to-warning/80';
      default: return 'bg-gradient-to-r from-safe to-safe/80 shadow-safe';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card className={`p-6 border-2 ${getStatusColor(currentRisk)}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {currentRisk === 'safe' ? (
              <Shield className="w-8 h-8 text-safe" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-danger animate-pulse" />
            )}
            <div>
              <h2 className="text-2xl font-bold">System Status</h2>
              <p className="text-sm opacity-80">Real-time crowd monitoring active</p>
            </div>
          </div>
          <Badge 
            variant={currentRisk === 'danger' ? 'destructive' : currentRisk === 'warning' ? 'secondary' : 'outline'}
            className="text-lg px-4 py-2"
          >
            {currentRisk.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-primary">{stats.totalAlerts}</div>
            <div className="text-sm opacity-80">Total Alerts</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-danger">{stats.activeAlerts}</div>
            <div className="text-sm opacity-80">Active Alerts</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-safe">{stats.livesProtected}</div>
            <div className="text-sm opacity-80">Lives Protected</div>
          </div>
          <div className="bg-card/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-accent">{stats.responseTime}</div>
            <div className="text-sm opacity-80">Response Time</div>
          </div>
        </div>
      </Card>

      {/* Active Alerts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          {currentRisk === 'danger' && (
            <Button size="sm" className="bg-primary text-primary-foreground">
              <Volume2 className="w-4 h-4 mr-2" />
              Broadcast Alert
            </Button>
          )}
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-2 text-safe" />
              <p>All systems operational</p>
              <p className="text-sm">No active alerts detected</p>
            </div>
          ) : (
            alerts.map(alert => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getAlertColor(alert.severity)} ${
                  alert.status === 'active' ? 'animate-pulse' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <div className="font-medium">
                        {alert.type === 'stampede' ? 'STAMPEDE RISK' : 
                         alert.type === 'overcrowding' ? 'OVERCROWDING' : 'BOTTLENECK'}
                      </div>
                      <div className="text-sm opacity-80">
                        {alert.location} • {alert.peopleCount} people
                      </div>
                      <div className="text-xs opacity-60">
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  {alert.status === 'active' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>

                {alert.severity === 'danger' && alert.status === 'active' && (
                  <div className="mt-3 pt-3 border-t border-current/20">
                    <div className="text-sm font-medium mb-2">Automated Response:</div>
                    <div className="text-xs space-y-1">
                      <div>✓ Loudspeaker alert activated</div>
                      <div>✓ Crowd redirected to Gate D</div>
                      <div>✓ Security team notified</div>
                      <div>✓ Emergency services on standby</div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};