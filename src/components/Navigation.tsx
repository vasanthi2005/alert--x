import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Home, 
  BarChart3, 
  Bell, 
  Phone, 
  Siren 
} from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  riskLevel: 'safe' | 'warning' | 'danger';
}

export const Navigation = ({ currentSection, onSectionChange, riskLevel }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'demo', label: 'Live Demo', icon: BarChart3 },
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'emergency', label: 'Emergency', icon: Siren }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">Alert<span className="text-primary">X</span></span>
            </div>
            <Badge 
              variant={riskLevel === 'danger' ? 'destructive' : riskLevel === 'warning' ? 'secondary' : 'outline'}
              className={`${riskLevel === 'danger' ? 'animate-pulse' : ''}`}
            >
              {riskLevel.toUpperCase()}
            </Badge>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className={`gap-2 ${item.id === 'emergency' && riskLevel === 'danger' ? 'bg-danger text-danger-foreground animate-pulse' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {item.id === 'alerts' && riskLevel !== 'safe' && (
                    <AlertTriangle className="w-3 h-3 text-danger animate-bounce" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <BarChart3 className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Emergency Alert Banner */}
      {riskLevel === 'danger' && (
        <div className="bg-danger text-danger-foreground px-4 py-2 text-center animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <Siren className="w-4 h-4 animate-spin" />
            <span className="font-bold">EMERGENCY ALERT: STAMPEDE RISK DETECTED</span>
            <Siren className="w-4 h-4 animate-spin" />
          </div>
        </div>
      )}
    </nav>
  );
};