import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  lessons: number;
  image: string;
  progress?: number;
}

export function CourseCard({
  id,
  title,
  description,
  difficulty,
  duration,
  lessons,
  image,
  progress = 0
}: CourseCardProps) {
  const navigate = useNavigate();

  const getDifficultyVariant = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="group overflow-hidden hover:border-teal/50 hover:shadow-glow transition-all duration-300">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <Badge 
          variant={getDifficultyVariant(difficulty) as any}
          className="absolute top-3 right-3"
        >
          {difficulty}
        </Badge>
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-heading font-semibold text-foreground line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {lessons} lessons
          </span>
        </div>

        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-teal font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-teal group-hover:text-primary-foreground group-hover:border-teal transition-all"
          onClick={() => navigate(`/study-portal/course/${id}`)}
        >
          {progress > 0 ? 'Continue Learning' : 'Start Course'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
