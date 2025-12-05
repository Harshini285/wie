import { Star, MapPin, Briefcase, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface LawyerCardProps {
  id: string;
  name: string;
  specialization: string[];
  rating: number;
  experience: number;
  city: string;
  verified: boolean;
  image: string;
  consultationFee: number;
  distance?: number;
}

export function LawyerCard({
  id,
  name,
  specialization,
  rating,
  experience,
  city,
  verified,
  image,
  consultationFee,
  distance
}: LawyerCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group hover:border-teal/50 hover:shadow-glow transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={image}
              alt={`${name} profile`}
              className="w-16 h-16 rounded-xl object-cover border-2 border-border group-hover:border-teal transition-colors"
            />
            {verified && (
              <div className="absolute -bottom-1 -right-1 bg-teal rounded-full p-0.5" title="Verified Lawyer">
                <CheckCircle className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-semibold text-foreground truncate">{name}</h3>
              <div className="flex items-center gap-1 text-amber">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5 mt-2">
              {specialization.slice(0, 2).map((spec) => (
                <Badge key={spec} variant="teal" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                {experience} yrs
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {city}
                {distance !== undefined && ` (${distance.toFixed(1)} km)`}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Consultation</span>
            <p className="text-sm font-semibold text-foreground">₹{consultationFee}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(`/lawyer/${id}`)}>
              View Profile
            </Button>
            <Button variant="hero" size="sm">
              Request Consult
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
