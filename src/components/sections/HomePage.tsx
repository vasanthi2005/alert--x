import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroControlRoom from '@/assets/hero-control-room.jpg';
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  Users, 
  Zap, 
  TrendingUp,
  Play,
  ArrowRight,
  BarChart3
} from 'lucide-react';

interface HomePageProps {
  onSectionChange: (section: string) => void;
}

export const HomePage = ({ onSectionChange }: HomePageProps) => {
  return (
    <div className="min-h-screen">
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
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Safety System</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Alert<span className="text-primary">X</span>
              </h1>
              
              <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
                Prevent stampedes before they happen with real-time crowd density monitoring, 
                heat maps, and instant early warning alerts to save lives
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={() => onSectionChange('demo')}
                  variant="hero"
                  className="text-lg px-8 py-4"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Live Demo
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => onSectionChange('dashboard')}
                  className="text-lg px-8 py-4"
                >
                  <BarChart3 className="w-6 h-6 mr-3" />
                  View Dashboard
                </Button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <Card className="p-8 text-center bg-card/50 backdrop-blur hover:shadow-glow transition-all">
                <div className="text-4xl font-bold text-primary mb-3">0.3s</div>
                <div className="text-sm text-muted-foreground">Detection Time</div>
              </Card>
              <Card className="p-8 text-center bg-card/50 backdrop-blur hover:shadow-safe transition-all">
                <div className="text-4xl font-bold text-safe mb-3">100%</div>
                <div className="text-sm text-muted-foreground">Prevention Rate</div>
              </Card>
              <Card className="p-8 text-center bg-card/50 backdrop-blur hover:shadow-alert transition-all">
                <div className="text-4xl font-bold text-accent mb-3">1000+</div>
                <div className="text-sm text-muted-foreground">Lives Saved</div>
              </Card>
              <Card className="p-8 text-center bg-card/50 backdrop-blur hover:shadow-glow transition-all">
                <div className="text-4xl font-bold text-warning mb-3">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">How AlertX Saves Lives</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI monitors crowd patterns, generates heat maps, and prevents tragedies before they happen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 group">
            <Eye className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4">Real-time Vision</h3>
            <p className="text-muted-foreground">
              AI-powered cameras track crowd density and movement patterns continuously
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-alert transition-all duration-300 group">
            <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4">Heat Map Analysis</h3>
            <p className="text-muted-foreground">
              Visual heat maps show crowd density hot spots and danger zones in real-time
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-safe transition-all duration-300 group">
            <Users className="w-16 h-16 text-safe mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4">Crowd Control</h3>
            <p className="text-muted-foreground">
              Dynamic crowd redirection to prevent bottlenecks and overcrowding
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 group">
            <Zap className="w-16 h-16 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4">Instant Alerts</h3>
            <p className="text-muted-foreground">
              Sub-second response time with automated emergency notifications
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <TrendingUp className="w-20 h-20 text-primary mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-6">
              Preventing Tragedies at Scale
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              From Ganesh immersion festivals to concerts and sporting events, AlertX protects 
              thousands of lives by detecting dangerous crowd conditions before they become deadly.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">Festivals</Badge>
              <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">Concerts</Badge>
              <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">Stadiums</Badge>
              <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">Pilgrimage Sites</Badge>
              <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">Malls</Badge>
              <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">Airports</Badge>
            </div>
            <Button 
              size="lg" 
              onClick={() => onSectionChange('demo')}
              className="text-lg px-8 py-4"
            >
              Experience the Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};