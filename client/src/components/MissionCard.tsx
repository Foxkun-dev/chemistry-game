import { Mission } from '@/lib/gameData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Zap } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  isCompleted: boolean;
  score?: number;
  onStart: () => void;
}

export function MissionCard({
  mission,
  isCompleted,
  score,
  onStart,
}: MissionCardProps) {
  const difficultyColors = {
    easy: 'bg-accent/20 text-accent',
    medium: 'bg-primary/20 text-primary',
    hard: 'bg-destructive/20 text-destructive',
  };

  return (
    <Card className="holographic-card p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">{mission.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{mission.description}</p>
        </div>
        {isCompleted && (
          <div className="ml-4 text-right">
            <div className="text-xs text-muted-foreground">Điểm</div>
            <div className="text-2xl font-bold text-accent">{score}</div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className={difficultyColors[mission.difficulty]}>
          {mission.difficulty === 'easy' && 'Dễ'}
          {mission.difficulty === 'medium' && 'Trung Bình'}
          {mission.difficulty === 'hard' && 'Khó'}
        </Badge>
        <Badge variant="outline" className="bg-primary/20 text-primary gap-1">
          <Zap className="w-3 h-3" />
          {mission.basePoints} điểm
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-foreground">Mục tiêu:</div>
        <ul className="text-sm text-muted-foreground space-y-1">
          {mission.objectives.map((obj, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onStart}
        className={`w-full gap-2 ${
          isCompleted
            ? 'bg-accent/30 hover:bg-accent/40 text-accent'
            : 'bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-blue'
        }`}
      >
        {isCompleted ? 'Làm Lại' : 'Bắt Đầu'}
        <ChevronRight className="w-4 h-4" />
      </Button>
    </Card>
  );
}
