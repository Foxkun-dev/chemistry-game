import { useState, useRef, useEffect } from 'react';
import { Mission } from '@/lib/gameData';
import { useAudioManager } from '@/hooks/useAudioManager';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Volume2, VolumeX, Play } from 'lucide-react';

interface AdvancedSimulationProps {
  mission: Mission;
  onSuccess: (score: number) => void;
  soundEnabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface Molecule {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'reactant' | 'product';
  color: string;
  rotation: number;
}

export function AdvancedSimulation({
  mission,
  onSuccess,
  soundEnabled,
}: AdvancedSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(50);
  const [pressure, setPressure] = useState(50);
  const [catalyst, setCatalyst] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [reactionProgress, setReactionProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [molecules, setMolecules] = useState<Molecule[]>([]);
  const { playSound } = useAudioManager(soundEnabled);

  // Initialize molecules
  useEffect(() => {
    if (!isRunning) return;

    const initialMolecules: Molecule[] = [];
    
    // Add reactant molecules
    mission.reactions?.[0]?.reactants.forEach((_, idx) => {
      initialMolecules.push({
        x: 150 + idx * 40,
        y: 200,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        type: 'reactant',
        color: '#00D9FF',
        rotation: 0,
      });
    });

    setMolecules(initialMolecules);
  }, [isRunning, mission]);

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Update molecules
      setMolecules((prev) => {
        const updated = prev.map((mol) => {
          let newVx = mol.vx;
          let newVy = mol.vy;

          // Temperature affects speed
          const tempFactor = 1 + (temperature - 50) / 100;
          newVx *= tempFactor;
          newVy *= tempFactor;

          // Pressure affects collision
          if (pressure > 50) {
            newVx *= 1 + (pressure - 50) / 100;
            newVy *= 1 + (pressure - 50) / 100;
          }

          // Gravity
          newVy += 0.1;

          let newX = mol.x + newVx;
          let newY = mol.y + newVy;

          // Bounce off walls
          if (newX < 50 || newX > 550) newVx *= -1;
          if (newY < 50 || newY > 350) newVy *= -1;

          return {
            ...mol,
            x: Math.max(50, Math.min(550, newX)),
            y: Math.max(50, Math.min(350, newY)),
            vx: newVx,
            vy: newVy,
            rotation: mol.rotation + 2,
          };
        });

        return updated;
      });

      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
            life: p.life - 2,
          }))
          .filter((p) => p.life > 0)
      );

      // Update reaction progress
      setReactionProgress((prev) => {
        const increment = catalyst ? 2 : 1;
        return Math.min(100, prev + increment);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isRunning, temperature, pressure, catalyst]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
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

    // Container
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 500, 300);

    // Container glow
    ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 500, 300);
    ctx.shadowColor = 'transparent';

    // Draw molecules
    molecules.forEach((mol) => {
      ctx.save();
      ctx.translate(mol.x, mol.y);
      ctx.rotate((mol.rotation * Math.PI) / 180);

      // Draw molecule circle
      ctx.fillStyle = mol.color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.strokeStyle = mol.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = 1;
      ctx.restore();
    });

    // Draw particles
    particles.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.life / 100;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Draw reaction progress bar
    ctx.fillStyle = 'rgba(0, 217, 255, 0.2)';
    ctx.fillRect(50, 370, 500, 20);

    ctx.fillStyle = '#00D9FF';
    ctx.fillRect(50, 370, (500 * reactionProgress) / 100, 20);

    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 370, 500, 20);

    // Text
    ctx.fillStyle = '#E0F2FE';
    ctx.font = 'bold 12px Space Mono';
    ctx.textAlign = 'center';
    ctx.fillText(`Tiến Trình: ${reactionProgress}%`, 300, 385);
  }, [molecules, particles, reactionProgress]);

  const startReaction = () => {
    setIsRunning(true);
    playSound('reaction');

    // Generate success particles when complete
    const checkCompletion = setInterval(() => {
      setReactionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(checkCompletion);
          
          // Generate success particles
          const newParticles = Array.from({ length: 50 }, () => ({
            x: 300,
            y: 200,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 3,
            life: 100,
            color: mission.reactions?.[0]?.color || '#D946EF',
            size: Math.random() * 4 + 2,
          }));
          setParticles(newParticles);

          playSound('success');
          setTimeout(() => {
            const score = calculateScore();
            onSuccess(score);
          }, 1000);
        }
        return prev;
      });
    }, 50);
  };

  const calculateScore = () => {
    let score = mission.basePoints;
    
    // Temperature accuracy
    if (Math.abs(temperature - 50) < 15) score += 20;
    else if (Math.abs(temperature - 50) < 30) score += 10;

    // Pressure accuracy
    if (Math.abs(pressure - 50) < 15) score += 20;
    else if (Math.abs(pressure - 50) < 30) score += 10;

    // Catalyst bonus
    if (catalyst) score += 30;

    return score;
  };

  const reset = () => {
    setIsRunning(false);
    setReactionProgress(0);
    setTemperature(50);
    setPressure(50);
    setCatalyst(false);
    setParticles([]);
    setMolecules([]);
  };

  return (
    <div className="space-y-6">
      <Card className="holographic-card p-6">
        <canvas
          ref={canvasRef}
          width={600}
          height={420}
          className="w-full border border-primary/30 rounded-lg bg-background"
        />
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {/* Temperature */}
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
            disabled={isRunning}
            className="w-full"
          />
        </Card>

        {/* Pressure */}
        <Card className="holographic-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">Áp Suất</label>
            <Badge variant="outline" className="bg-secondary/20 text-secondary">
              {pressure} atm
            </Badge>
          </div>
          <Slider
            value={[pressure]}
            onValueChange={(val) => setPressure(val[0])}
            min={0}
            max={100}
            step={1}
            disabled={isRunning}
            className="w-full"
          />
        </Card>

        {/* Catalyst */}
        <Card className="holographic-card p-4 space-y-3">
          <div className="text-sm font-semibold text-foreground">Xúc Tác</div>
          <Button
            onClick={() => setCatalyst(!catalyst)}
            disabled={isRunning}
            variant={catalyst ? 'default' : 'outline'}
            className={catalyst ? 'w-full bg-accent text-accent-foreground' : 'w-full'}
          >
            {catalyst ? '✓ Bật' : 'Tắt'}
          </Button>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={startReaction}
          disabled={isRunning}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-green gap-2"
        >
          <Play className="w-4 h-4" />
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
      </div>
    </div>
  );
}
