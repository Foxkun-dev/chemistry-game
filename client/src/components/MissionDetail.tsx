import { Mission } from '@/lib/gameData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface MissionDetailProps {
  mission: Mission;
  onBack: () => void;
}

export function MissionDetail({ mission, onBack }: MissionDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="icon"
          className="flex-shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground display-font">
            {mission.title}
          </h2>
          <p className="text-muted-foreground mt-2">{mission.description}</p>
        </div>
      </div>

      {/* Mission Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="holographic-card p-4 text-center">
          <div className="text-2xl font-bold text-accent">{mission.basePoints}</div>
          <div className="text-xs text-muted-foreground mt-1">Điểm Cơ Bản</div>
        </Card>
        <Card className="holographic-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {mission.difficulty === 'easy' ? '⭐' : mission.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Độ Khó</div>
        </Card>
        <Card className="holographic-card p-4 text-center">
          <div className="text-2xl font-bold text-secondary">{mission.reactions?.length || 0}</div>
          <div className="text-xs text-muted-foreground mt-1">Phản Ứng</div>
        </Card>
      </div>

      {/* Objectives */}
      <Card className="holographic-card p-6 space-y-4">
        <h3 className="text-lg font-bold text-foreground">Mục Tiêu</h3>
        <ul className="space-y-3">
          {mission.objectives.map((obj, idx) => (
            <li key={idx} className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{idx + 1}</span>
              </div>
              <span className="text-foreground">{obj}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Reactions */}
      {mission.reactions && mission.reactions.length > 0 && (
        <Card className="holographic-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Phản Ứng Hóa Học</h3>
          <div className="space-y-3">
            {mission.reactions?.map((reaction, idx) => (
              <div key={idx} className="p-4 bg-card/50 rounded-lg border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm font-bold text-primary">
                    {reaction.reactants.join(' + ')} → {reaction.products.join(' + ')}
                  </div>
                  <Badge variant="outline" className="bg-secondary/20 text-secondary">
                    {reaction.animation}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{reaction.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Elements */}
      {mission.elements && mission.elements.length > 0 && (
        <Card className="holographic-card p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Chất Liệu Cần Dùng</h3>
          <div className="flex flex-wrap gap-2">
            {mission.elements?.map((element) => (
              <Badge key={element} variant="outline" className="bg-accent/20 text-accent">
                {element}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
