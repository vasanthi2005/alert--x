import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  AlertTriangle,
  Headphones,
  Building
} from 'lucide-react';

export const ContactPage = () => {
  const emergencyContacts = [
    {
      title: 'Emergency Hotline',
      number: '911',
      description: 'Immediate emergency response',
      icon: AlertTriangle,
      color: 'text-danger',
      bgColor: 'bg-danger/10 border-danger/20'
    },
    {
      title: 'Police Control Room',
      number: '+91-100',
      description: 'Direct police coordination',
      icon: Shield,
      color: 'text-primary',
      bgColor: 'bg-primary/10 border-primary/20'
    },
    {
      title: 'Crowd Management Team',
      number: '+91-1234567890',
      description: 'Specialized crowd control unit',
      icon: Users,
      color: 'text-safe',
      bgColor: 'bg-safe/10 border-safe/20'
    }
  ];

  const supportTeam = [
    {
      name: 'Technical Support',
      email: 'support@alertx.ai',
      phone: '+91-9876543210',
      hours: '24/7 Available',
      department: 'System Monitoring'
    },
    {
      name: 'Emergency Response',
      email: 'emergency@alertx.ai', 
      phone: '+91-9876543211',
      hours: 'Always Active',
      department: 'Crisis Management'
    },
    {
      name: 'Operations Center',
      email: 'ops@alertx.ai',
      phone: '+91-9876543212', 
      hours: '24/7 Monitoring',
      department: 'Live Monitoring'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 text-primary border-primary">Emergency Contacts</Badge>
          <h1 className="text-4xl font-bold mb-4">Contact & Emergency Response</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Direct communication channels for emergency response, technical support, and system monitoring
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Emergency Response Hotlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Card key={index} className={`p-8 text-center border-2 ${contact.bgColor} hover:shadow-glow transition-all`}>
                  <Icon className={`w-12 h-12 ${contact.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <div className="text-3xl font-bold mb-3 text-foreground">{contact.number}</div>
                  <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                  <Button className="w-full" variant={index === 0 ? 'destructive' : 'default'}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Support Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Support Team Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportTeam.map((member, index) => (
              <Card key={index} className="p-6 hover:shadow-glow transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.department}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-safe font-medium">{member.hours}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Operations Center Info */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">AlertX Operations Center</h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <p>123 Safety Boulevard, Tech City</p>
                    <p>Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>24/7 Live Monitoring & Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Certified Emergency Response Center</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">24/7</div>
              <div className="text-lg font-medium mb-4">Always Monitoring</div>
              <Badge variant="outline" className="text-safe border-safe">
                <div className="w-2 h-2 bg-safe rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};