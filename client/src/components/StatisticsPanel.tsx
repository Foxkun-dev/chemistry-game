import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';

interface MissionStat {
  missionId: string;
  missionTitle: string;
  score: number;
  maxScore: number;
  completed: boolean;
}

interface StatisticsPanelProps {
  totalScore: number;
  completedMissions: number;
  totalMissions: number;
  combo: number;
  missionStats: MissionStat[];
}

export function StatisticsPanel({
  totalScore,
  completedMissions,
  totalMissions,
  combo,
  missionStats,
}: StatisticsPanelProps) {
  const accuracy = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;
  const averageScore = completedMissions > 0 ? Math.round(totalScore / completedMissions) : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary display-font">Thống Kê</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="holographic-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">Tổng Điểm</span>
          </div>
          <div className="text-2xl font-bold text-accent">{totalScore}</div>
        </Card>

        <Card className="holographic-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Hoàn Thành</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            {completedMissions}/{totalMissions}
          </div>
        </Card>

        <Card className="holographic-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Combo</span>
          </div>
          <div className="text-2xl font-bold text-secondary">{combo}x</div>
        </Card>

        <Card className="holographic-card p-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Trung Bình</span>
          </div>
          <div className="text-2xl font-bold text-destructive">{averageScore}</div>
        </Card>
      </div>

      {/* Accuracy Bar */}
      <Card className="holographic-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Độ Chính Xác</span>
          <Badge variant="outline" className="bg-accent/20 text-accent">
            {Math.round(accuracy)}%
          </Badge>
        </div>
        <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-primary/30">
          <div
            className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </Card>

      {/* Mission Details */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">Chi Tiết Nhiệm Vụ</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {missionStats.map((stat) => (
            <Card
              key={stat.missionId}
              className="holographic-card p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {stat.missionTitle}
                </span>
                {stat.completed && (
                  <Badge variant="outline" className="bg-accent/20 text-accent text-xs">
                    ✓
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {stat.score} / {stat.maxScore} điểm
                </span>
                <div className="w-24 bg-card rounded-full h-1 overflow-hidden border border-primary/20">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(stat.score / stat.maxScore) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
