import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentColor?: 'teal' | 'amber';
}

export function FeatureCard({ icon, title, description, accentColor = 'teal' }: FeatureCardProps) {
  const iconBgClass = accentColor === 'teal' 
    ? 'gradient-teal shadow-glow' 
    : 'gradient-amber shadow-glow-amber';

  return (
    <Card className="group glass-card hover:border-teal/50 hover:shadow-glow transition-all duration-500">
      <CardContent className="p-6">
        <div className={`w-14 h-14 rounded-xl ${iconBgClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
