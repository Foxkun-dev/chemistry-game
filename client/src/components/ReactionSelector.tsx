import { useState } from 'react';
import { Mission, Reaction } from '@/lib/gameData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReactionSelectorProps {
  mission: Mission;
  onSelectReaction: (reaction: Reaction) => void;
  onCancel: () => void;
}

/**
 * Reaction Selector Component
 * Cho phép học sinh chọn phản ứng đúng từ nhiều lựa chọn
 */
export function ReactionSelector({
  mission,
  onSelectReaction,
  onCancel,
}: ReactionSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectReaction = (reaction: Reaction) => {
    setIsProcessing(true);
    setSelectedId(reaction.id);

    if (reaction.isCorrect) {
      setFeedback({
        type: 'success',
        message: '✓ Chính xác! Bạn chọn đúng phản ứng.',
      });
      setTimeout(() => {
        onSelectReaction(reaction);
      }, 1000);
    } else {
      setFeedback({
        type: 'error',
        message: reaction.errorMessage || 'Sai! Hãy thử lại.',
      });
      setTimeout(() => {
        setSelectedId(null);
        setFeedback(null);
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="holographic-card p-6 border-l-4 border-primary">
        <h2 className="text-2xl font-bold text-foreground display-font mb-2">
          {mission.title}
        </h2>
        <p className="text-muted-foreground">{mission.description}</p>
      </Card>

      {/* Instructions */}
      <Card className="holographic-card p-4 bg-primary/10 border border-primary/30">
        <div className="flex gap-3">
          <div className="text-2xl">🔍</div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Chọn Phản Ứng Đúng</h3>
            <p className="text-sm text-muted-foreground">
              Có {mission.reactions?.length || 0} lựa chọn. Chọn phản ứng hóa học đúng để bắt đầu mô phỏng.
            </p>
          </div>
        </div>
      </Card>

      {/* Reaction Options */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Các Lựa Chọn Phản Ứng</h3>
        <div className="grid gap-3">
          {mission.reactions && mission.reactions.length > 0 && mission.reactions.map((reaction, idx) => {
            const isSelected = selectedId === reaction.id;
            const isCorrect = reaction.isCorrect;
            const showResult = feedback && isSelected;

            return (
              <Card
                key={reaction.id}
                className={`holographic-card p-4 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? showResult && isCorrect
                      ? 'border-accent/50 bg-accent/10'
                      : showResult && !isCorrect
                        ? 'border-destructive/50 bg-destructive/10'
                        : 'border-primary/50 bg-primary/10'
                    : 'border-primary/20 hover:border-primary/40'
                } ${isProcessing && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isProcessing && handleSelectReaction(reaction)}
              >
                <div className="flex items-start gap-4">
                  {/* Reaction Number */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{idx + 1}</span>
                  </div>

                  {/* Reaction Content */}
                  <div className="flex-1 space-y-2">
                    {/* Reaction Formula */}
                    <div className="font-mono font-bold text-foreground text-lg">
                      {reaction.reactants.join(' + ')} → {reaction.products.join(' + ')}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{reaction.description}</p>

                    {/* Animation Badge */}
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-secondary/20 text-secondary text-xs">
                        {reaction.animation === 'color_change' && '🎨 Đổi Màu'}
                        {reaction.animation === 'gas_release' && '💨 Khí Thoát'}
                        {reaction.animation === 'explosion' && '💥 Nổ'}
                        {reaction.animation === 'precipitate' && '🧂 Kết Tủa'}
                      </Badge>
                    </div>
                  </div>

                  {/* Result Icon */}
                  {showResult && (
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-accent animate-pulse" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-destructive animate-pulse" />
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <Card
          className={`p-4 border-l-4 ${
            feedback.type === 'success'
              ? 'bg-accent/10 border-accent/50 text-accent'
              : 'bg-destructive/10 border-destructive/50 text-destructive'
          }`}
        >
          <div className="flex gap-3 items-start">
            <div className="text-2xl">
              {feedback.type === 'success' ? '✓' : '✗'}
            </div>
            <div>
              <p className="font-bold">{feedback.message}</p>
              {feedback.type === 'error' && (
                <p className="text-sm mt-1 opacity-80">
                  Hãy xem xét lại các lựa chọn khác.
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Hints */}
      <Card className="holographic-card p-4 space-y-2">
        <h3 className="font-bold text-foreground">💡 Gợi Ý</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {mission.hints?.map((hint, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary">→</span>
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onCancel}
          variant="outline"
          className="flex-1"
          disabled={isProcessing}
        >
          Quay Lại
        </Button>
      </div>
    </div>
  );
}
