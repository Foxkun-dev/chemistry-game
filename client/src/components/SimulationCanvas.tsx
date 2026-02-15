import { useState, useRef, useEffect } from 'react';
import { Mission, Reaction } from '@/lib/gameData';
import { useAudioManager } from '@/hooks/useAudioManager';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface SimulationCanvasProps {
  mission: Mission;
  selectedReaction: Reaction;
  onSuccess: (score: number) => void;
  onFailure: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export function SimulationCanvas({
  mission,
  selectedReaction,
  onSuccess,
  onFailure,
}: SimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(50);
  const [concentration, setConcentration] = useState(50);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reactionTriggered, setReactionTriggered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { playSound } = useAudioManager(soundEnabled);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with dark background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw circuit pattern
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw beaker/container
    const beakerX = canvas.width / 2;
    const beakerY = canvas.height / 2;
    const beakerWidth = 150;
    const beakerHeight = 200;

    // Beaker outline
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(beakerX - beakerWidth / 2, beakerY - beakerHeight / 2);
    ctx.lineTo(beakerX - beakerWidth / 2, beakerY + beakerHeight / 2);
    ctx.lineTo(beakerX + beakerWidth / 2, beakerY + beakerHeight / 2);
    ctx.lineTo(beakerX + beakerWidth / 2, beakerY - beakerHeight / 2);
    ctx.stroke();

    // Beaker glow
    ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(beakerX - beakerWidth / 2, beakerY - beakerHeight / 2);
    ctx.lineTo(beakerX - beakerWidth / 2, beakerY + beakerHeight / 2);
    ctx.lineTo(beakerX + beakerWidth / 2, beakerY + beakerHeight / 2);
    ctx.lineTo(beakerX + beakerWidth / 2, beakerY - beakerHeight / 2);
    ctx.stroke();
    ctx.shadowColor = 'transparent';

    // Liquid color based on selected reaction
    const liquidColor = reactionTriggered ? selectedReaction.color : '#1A2847';
    ctx.fillStyle = liquidColor;
    ctx.globalAlpha = 0.3 + (concentration / 100) * 0.4;
    ctx.fillRect(
      beakerX - beakerWidth / 2 + 3,
      beakerY - beakerHeight / 2 + 3,
      beakerWidth - 6,
      beakerHeight - 6
    );
    ctx.globalAlpha = 1;

    // Draw particles
    particles.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.life / 100;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw labels
    ctx.fillStyle = '#E0F2FE';
    ctx.font = 'bold 14px Space Mono';
    ctx.textAlign = 'center';
    ctx.fillText('Phòng Thí Nghiệm Ảo', beakerX, 30);

    ctx.font = '12px Inter';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`Nhiệt độ: ${temperature}°C`, 50, canvas.height - 20);
    ctx.fillText(`Nồng độ: ${concentration}%`, canvas.width - 100, canvas.height - 20);
  }, [temperature, concentration, reactionTriggered, particles, mission]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity
            life: p.life - 2,
          }))
          .filter((p) => p.life > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const triggerReaction = () => {
    if (reactionTriggered) return;

    setReactionTriggered(true);

    // Generate particles based on selected reaction
    const newParticles = Array.from({ length: 30 }, () => ({
      x: canvasRef.current!.width / 2,
      y: canvasRef.current!.height / 2,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4 - 2,
      life: 100,
      color: selectedReaction.color,
    }));
    setParticles(newParticles);

    // Play sound
    playSound('reaction');

    // Calculate score based on conditions
    let score = mission.basePoints;
    const tempAccuracy = Math.abs(temperature - 50) < 20 ? 30 : 0;
    const concAccuracy = Math.abs(concentration - 50) < 20 ? 20 : 0;
    score += tempAccuracy + concAccuracy;

    // Success after animation
    setTimeout(() => {
      playSound('success');
      onSuccess(score);
      setReactionTriggered(false);
    }, 1500);
  };

  const reset = () => {
    setTemperature(50);
    setConcentration(50);
    setReactionTriggered(false);
    setParticles([]);
  };

  return (
    <div className="space-y-6">
      <Card className="holographic-card p-6">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full border border-primary/30 rounded-lg bg-background"
        />
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {/* Temperature Control */}
        <Card className="holographic-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">Nhiệt Độ</label>
            <Badge variant="outline" className="bg-primary/20 text-primary">
              {temperature}°C
            </Badge>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={(val) => setTemperature(val[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground">
            Điều chỉnh nhiệt độ để quan sát ảnh hưởng
          </div>
        </Card>

        {/* Concentration Control */}
        <Card className="holographic-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">Nồng Độ</label>
            <Badge variant="outline" className="bg-secondary/20 text-secondary">
              {concentration}%
            </Badge>
          </div>
          <Slider
            value={[concentration]}
            onValueChange={(val) => setConcentration(val[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground">
            Điều chỉnh nồng độ để quan sát ảnh hưởng
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={triggerReaction}
          disabled={reactionTriggered}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-green"
        >
          Bắt Đầu Phản Ứng
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Đặt Lại
        </Button>
        <Button
          onClick={() => setSoundEnabled(!soundEnabled)}
          variant="outline"
          size="icon"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Mission Info */}
      <Card className="holographic-card p-4 space-y-3">
        <h3 className="font-bold text-foreground">Gợi Ý:</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          {mission.hints.map((hint, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary">→</span>
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
