import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDashboard } from '@/components/AlertDashboard';
import { 
  Bell, 
  AlertTriangle, 
  Shield, 
  Users, 
  MapPin, 
  Clock,
  Filter,
  Search,
  Download,
  Archive
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'stampede' | 'overcrowding' | 'bottleneck';
  location: string;
  severity: 'safe' | 'warning' | 'danger';
  timestamp: Date;
  peopleCount: number;
  status: 'active' | 'resolved' | 'acknowledged';
  description: string;
}

interface AlertsPageProps {
  currentRisk: 'safe' | 'warning' | 'danger';
  crowdSize: number;
}

export const AlertsPage = ({ currentRisk, crowdSize }: AlertsPageProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  
  // Sample alert history
  useEffect(() => {
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        type: 'stampede',
        location: 'Gate B - Main Entrance',
        severity: 'danger',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        peopleCount: 350,
        status: 'resolved',
        description: 'Critical density reached, automated response deployed'
      },
      {
        id: '2', 
        type: 'overcrowding',
        location: 'Central Plaza',
        severity: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        peopleCount: 200,
        status: 'acknowledged',
        description: 'Moderate crowding detected, monitoring continues'
      },
      {
        id: '3',
        type: 'bottleneck',
        location: 'Exit Gate C',
        severity: 'warning', 
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        peopleCount: 180,
        status: 'resolved',
        description: 'Temporary bottleneck cleared by redirection'
      }
    ];
    
    if (currentRisk === 'danger') {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: 'stampede',
        location: 'Gate B - Entry Zone',
        severity: 'danger',
        timestamp: new Date(),
        peopleCount: crowdSize,
        status: 'active',
        description: 'Live stampede risk detected - emergency protocols activated'
      };
      setAlerts([newAlert, ...sampleAlerts]);
    } else {
      setAlerts(sampleAlerts);
    }
  }, [currentRisk, crowdSize]);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'stampede': return <AlertTriangle className="w-5 h-5" />;
      case 'overcrowding': return <Users className="w-5 h-5" />;
      case 'bottleneck': return <MapPin className="w-5 h-5" />;
    }
  };

  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'danger': return 'border-danger bg-danger/5';
      case 'warning': return 'border-warning bg-warning/5';
      default: return 'border-safe bg-safe/5';
    }
  };

  const getSeverityBadge = (severity: Alert['severity']) => {
    switch (severity) {
      case 'danger': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 text-primary border-primary">Alert Management System</Badge>
          <h1 className="text-4xl font-bold mb-4">Alerts & Monitoring</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time alert monitoring, historical data, and emergency response tracking
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Live Dashboard */}
          <div className="xl:col-span-2">
            <AlertDashboard currentRisk={currentRisk} crowdSize={crowdSize} />
          </div>

          {/* Alert History & Controls */}
          <div className="space-y-6">
            {/* Controls */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Alert Filters
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                    className="flex-1"
                  >
                    All ({alerts.length})
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === 'active' ? 'default' : 'outline'}
                    onClick={() => setFilter('active')}
                    className="flex-1"
                  >
                    Active ({alerts.filter(a => a.status === 'active').length})
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Archive className="w-4 h-4 mr-1" />
                    Archive
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Alerts</span>
                  <span className="font-medium">{alerts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Critical</span>
                  <span className="font-medium text-danger">
                    {alerts.filter(a => a.severity === 'danger').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Resolved</span>
                  <span className="font-medium text-safe">
                    {alerts.filter(a => a.status === 'resolved').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg Response</span>
                  <span className="font-medium">0.8s</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Alert History */}
        <div className="mt-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Alert History</h3>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Showing {filteredAlerts.length} alerts
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAlerts.map(alert => (
                <Card key={alert.id} className={`p-4 border ${getAlertColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        alert.severity === 'danger' ? 'bg-danger/10' : 
                        alert.severity === 'warning' ? 'bg-warning/10' : 'bg-safe/10'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">
                            {alert.type === 'stampede' ? 'STAMPEDE RISK' : 
                             alert.type === 'overcrowding' ? 'OVERCROWDING' : 'BOTTLENECK'}
                          </h4>
                          <Badge variant={getSeverityBadge(alert.severity) as any}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.location}</span>
                            <span>•</span>
                            <Users className="w-3 h-3" />
                            <span>{alert.peopleCount} people</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{alert.timestamp.toLocaleString()}</span>
                          </div>
                          <p className="mt-2">{alert.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {alert.status === 'active' && (
                        <Button size="sm" variant="outline">
                          Acknowledge
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filteredAlerts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="w-16 h-16 mx-auto mb-4" />
                  <p>No alerts found for the selected filter</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};