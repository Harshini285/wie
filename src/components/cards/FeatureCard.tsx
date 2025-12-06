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
    ? 'bg-gradient-to-r from-[#CD7F32] to-[#B87326] shadow-lg' 
    : 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] shadow-lg';

  return (
    <Card className="group bg-white border border-gray-200 hover:border-[#CD7F32]/50 hover:shadow-lg transition-all duration-500 hover-lift relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{
          background: 'radial-gradient(circle, rgba(205, 127, 50, 0.05) 0%, transparent 70%)'
        }}
      />
      <CardContent className="p-6 relative z-10">
        <div className={`w-16 h-16 rounded-2xl ${iconBgClass} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <div className="group-hover:scale-110 transition-transform duration-300 text-white">
            {icon}
          </div>
        </div>
        <h3 className="font-heading font-bold text-xl text-black mb-3 group-hover:text-[#CD7F32] transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>
        <div className="mt-4 h-1 w-0 bg-gradient-to-r from-[#CD7F32] to-[#FFD700] group-hover:w-full transition-all duration-500 rounded-full" />
      </CardContent>
    </Card>
  );
}
