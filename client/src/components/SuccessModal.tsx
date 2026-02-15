import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Flame } from 'lucide-react';

interface SuccessModalProps {
  score: number;
  basePoints: number;
  combo: number;
  message: string;
  onContinue: () => void;
}

export function SuccessModal({
  score,
  basePoints,
  combo,
  message,
  onContinue,
}: SuccessModalProps) {
  const accuracyBonus = score - basePoints;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="holographic-card p-8 max-w-md space-y-6 border-accent/50">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
            <CheckCircle2 className="w-16 h-16 text-accent relative" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground display-font">Tuyệt Vời!</h2>
          <p className="text-muted-foreground">{message}</p>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Điểm Cơ Bản</span>
            <Badge variant="outline" className="bg-primary/20 text-primary">
              +{basePoints}
            </Badge>
          </div>
          {accuracyBonus > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Bonus Độ Chính Xác</span>
              <Badge variant="outline" className="bg-secondary/20 text-secondary">
                +{accuracyBonus}
              </Badge>
            </div>
          )}
          {combo > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Combo Multiplier</span>
              <Badge variant="outline" className="bg-destructive/20 text-destructive gap-1">
                <Flame className="w-3 h-3" />
                x{combo}
              </Badge>
            </div>
          )}
          <div className="border-t border-primary/20 pt-3 flex items-center justify-between font-bold">
            <span className="text-foreground">Tổng Điểm</span>
            <div className="text-2xl text-accent">{score}</div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-green"
        >
          Tiếp Tục
        </Button>
      </Card>
    </div>
  );
}
