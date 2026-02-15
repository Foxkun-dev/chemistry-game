import { useState } from 'react';
import { Mission } from '@/lib/gameData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ChemicalSelectorProps {
  mission: Mission & { type: 'chemical-select'; availableChemicals: any[]; correctReactants: string[] };
  onSelectChemicals: (reactants: string[]) => void;
  onCancel: () => void;
}

/**
 * Chemical Selector Component
 * Cho phép học sinh chọn chất phản ứng từ danh sách
 * Khó hơn ReactionSelector - phải biết chất nào phản ứng với nhau
 */
export function ChemicalSelector({
  mission,
  onSelectChemicals,
  onCancel,
}: ChemicalSelectorProps) {
  const [selectedChemicals, setSelectedChemicals] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Danh sách chất có sẵn cho chương 4
  const availableChemicals = [
    { id: 'N2', name: 'Nitrogen', formula: 'N₂', color: '#00D9FF', icon: '💨' },
    { id: 'H2', name: 'Hydrogen', formula: 'H₂', color: '#CCFF00', icon: '💨' },
    { id: 'O2', name: 'Oxygen', formula: 'O₂', color: '#D946EF', icon: '💨' },
    { id: 'NH3', name: 'Amoniac', formula: 'NH₃', color: '#FF0080', icon: '⚗️' },
    { id: 'S', name: 'Lưu Huỳnh', formula: 'S', color: '#FFD700', icon: '🟡' },
    { id: 'CH4', name: 'Methane', formula: 'CH₄', color: '#00FF88', icon: '🔥' },
  ];

  const handleToggleChemical = (chemicalId: string) => {
    setSelectedChemicals((prev) => {
      if (prev.includes(chemicalId)) {
        return prev.filter((id) => id !== chemicalId);
      } else {
        // Chỉ cho phép chọn tối đa 2 chất
        if (prev.length < 2) {
          return [...prev, chemicalId];
        }
        return prev;
      }
    });
  };

  const handleSubmit = () => {
    if (selectedChemicals.length !== 2) {
      setFeedback({
        type: 'error',
        message: 'Bạn phải chọn đúng 2 chất phản ứng!',
      });
      return;
    }

    setIsProcessing(true);

    // Kiểm tra xem chất được chọn có đúng không
    const isCorrect =
      selectedChemicals.every((id) =>
        mission.correctReactants.includes(id)
      ) &&
      mission.correctReactants.every((id) =>
        selectedChemicals.includes(id)
      );

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: '✓ Chính xác! Bạn chọn đúng chất phản ứng.',
      });
      setTimeout(() => {
        onSelectChemicals(selectedChemicals);
      }, 1000);
    } else {
      setFeedback({
        type: 'error',
        message: 'Sai! Những chất này không phản ứng với nhau. Hãy thử lại.',
      });
      setTimeout(() => {
        setSelectedChemicals([]);
        setFeedback(null);
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="holographic-card p-6 border-l-4 border-destructive">
        <h2 className="text-2xl font-bold text-foreground display-font mb-2">
          {mission.title}
        </h2>
        <p className="text-muted-foreground">{mission.description}</p>
      </Card>

      {/* Instructions */}
      <Card className="holographic-card p-4 bg-destructive/10 border border-destructive/30">
        <div className="flex gap-3">
          <div className="text-2xl">🧪</div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Chọn 2 Chất Phản Ứng</h3>
            <p className="text-sm text-muted-foreground">
              Không có gợi ý! Chỉ có thách thức. Chọn 2 chất hóa học đúng để tạo phản ứng.
            </p>
          </div>
        </div>
      </Card>

      {/* Objectives */}
      <Card className="holographic-card p-4 space-y-2">
        <h3 className="font-bold text-foreground">Mục Tiêu</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {mission.objectives.map((obj, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary">→</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Chemical Selection Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Các Chất Có Sẵn</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {availableChemicals.map((chemical) => {
            const isSelected = selectedChemicals.includes(chemical.id);
            return (
              <Card
                key={chemical.id}
                className={`holographic-card p-4 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-accent/50 bg-accent/10'
                    : 'border-primary/20 hover:border-primary/40'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isProcessing && handleToggleChemical(chemical.id)}
              >
                <div className="space-y-2 text-center">
                  <div className="text-3xl">{chemical.icon}</div>
                  <div className="font-bold text-foreground">{chemical.formula}</div>
                  <div className="text-xs text-muted-foreground">{chemical.name}</div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-accent mx-auto mt-1" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Selected Chemicals Display */}
      {selectedChemicals.length > 0 && (
        <Card className="holographic-card p-4 bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚗️</div>
            <div>
              <h3 className="font-bold text-foreground">Chất Được Chọn</h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedChemicals.map((id) => {
                  const chem = availableChemicals.find((c) => c.id === id);
                  return (
                    <Badge key={id} className="bg-accent/20 text-accent">
                      {chem?.formula}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      )}

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
                  Gợi ý: Hãy suy nghĩ về phản ứng hóa học mà bạn đã học.
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

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
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-green"
          disabled={selectedChemicals.length !== 2 || isProcessing}
        >
          Xác Nhận
        </Button>
      </div>
    </div>
  );
}
