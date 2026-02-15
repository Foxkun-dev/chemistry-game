import { Card } from '@/components/ui/card';
import { Flame, Star, Trophy } from 'lucide-react';

interface ScoreBoardProps {
  totalScore: number;
  combo: number;
  completedMissions: number;
  totalMissions: number;
}

export function ScoreBoard({
  totalScore,
  combo,
  completedMissions,
  totalMissions,
}: ScoreBoardProps) {
  const progressPercent = (completedMissions / totalMissions) * 100;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Tiến Trình</h2>

      {/* Total Score */}
      <Card className="holographic-card p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-muted-foreground">Tổng Điểm</span>
          </div>
          <div className="text-2xl font-bold text-accent">{totalScore}</div>
        </div>
      </Card>

      {/* Combo */}
      {combo > 0 && (
        <Card className="holographic-card p-4 space-y-2 border-secondary/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-destructive animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground">Combo</span>
            </div>
            <div className="text-2xl font-bold text-destructive">{combo}x</div>
          </div>
          <div className="text-xs text-muted-foreground">Tiếp tục hoàn thành để tăng combo!</div>
        </Card>
      )}

      {/* Progress Bar */}
      <Card className="holographic-card p-4 space-y-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground">Tiến Trình</span>
          </div>
          <span className="text-sm font-bold text-primary">
            {completedMissions}/{totalMissions}
          </span>
        </div>
        <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-primary/30">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {Math.round(progressPercent)}% hoàn thành
        </div>
      </Card>
    </div>
  );
}
