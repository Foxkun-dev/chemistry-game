import { useState } from 'react';
import { allChapters, Reaction } from '@/lib/gameData';
import { useGameState } from '@/hooks/useGameState';
import { ChapterMap } from '@/components/ChapterMap';
import { MissionCard } from '@/components/MissionCard';
import { MissionDetail } from '@/components/MissionDetail';
import { ScoreBoard } from '@/components/ScoreBoard';
import { SimulationCanvas } from '@/components/SimulationCanvas';
import { ReactionSelector } from '@/components/ReactionSelector';
import { ChemicalSelector } from '@/components/ChemicalSelector';
import { SuccessModal } from '@/components/SuccessModal';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Volume2, VolumeX, BarChart3 } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Home Page - Main Game Interface
 * Design: Cyberpunk Futuristic Lab
 * Layout: Sidebar (left) + Canvas (center) + Info (right)
 * Flow: Missions → Detail → Reaction Select → Simulation → Success
 */

type ViewState = 'chapters' | 'missions' | 'detail' | 'reaction-select' | 'chemical-select' | 'simulation' | 'success';

export default function Home() {
  const { gameState, completeMission, setCurrentMission, setCurrentChapter, resetGame } = useGameState();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [viewState, setViewState] = useState<ViewState>('missions');
  const [lastScore, setLastScore] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);
  const [, setLocation] = useLocation();

  const currentChapter = allChapters.find((ch) => ch.id === gameState.currentChapter);
  const currentMission = currentChapter?.missions.find((m) => m.id === gameState.currentMission);
  const totalMissions = allChapters.reduce((sum, ch) => sum + ch.missions.length, 0);

  if (!currentChapter || !currentMission) {
    return <div>Loading...</div>;
  }

  const handleStartMission = (missionId: string) => {
    setCurrentMission(missionId);
    setViewState('detail');
  };

  const handleBeginSimulation = () => {
    if (currentMission?.type === 'chemical-select') {
      setViewState('chemical-select');
    } else {
      setViewState('reaction-select');
    }
  };

  const handleReactionSelected = (reaction: Reaction) => {
    setSelectedReaction(reaction);
    setViewState('simulation');
  };

  const handleChemicalsSelected = (reactants: string[]) => {
    const reaction: Reaction = {
      id: `custom-${reactants.join('-')}`,
      reactants,
      products: [],
      description: `Phan ung giua ${reactants.join(' va ')}`,
      animation: 'color_change',
      color: '#00D9FF',
      sound: 'reaction_synthesis',
      isCorrect: true,
    };
    setSelectedReaction(reaction);
    setViewState('simulation');
  };

  const handleMissionSuccess = (score: number) => {
    setLastScore(score);
    completeMission(currentMission.id, score);
    setViewState('success');
  };

  const handleContinue = () => {
    const currentIndex = currentChapter.missions.findIndex((m) => m.id === currentMission.id);
    if (currentIndex < currentChapter.missions.length - 1) {
      const nextMission = currentChapter.missions[currentIndex + 1];
      setCurrentMission(nextMission.id);
      setSelectedReaction(null);
      setViewState('missions');
    } else {
      setSelectedReaction(null);
      setViewState('missions');
    }
  };

  const renderMainContent = () => {
    if (viewState === 'missions') {
      return (
        <div className="space-y-6">
          <Card className="holographic-card p-6 border-l-4" style={{ borderLeftColor: currentChapter.color }}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{currentChapter.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground display-font">
                  {currentChapter.title}
                </h2>
                <p className="text-muted-foreground mt-2">{currentChapter.description}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Nhiệm Vụ Trong Chương</h3>
            <div className="grid gap-4">
              {currentChapter.missions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  isCompleted={gameState.completedMissions.includes(mission.id)}
                  score={gameState.missionScores[mission.id]}
                  onStart={() => handleStartMission(mission.id)}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (viewState === 'detail' && currentMission) {
      return (
        <div className="space-y-6">
          <MissionDetail
            mission={currentMission}
            onBack={() => setViewState('missions')}
          />
          <Button
            onClick={handleBeginSimulation}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-green py-6 text-lg"
          >
            Bắt Đầu Mô Phỏng
          </Button>
        </div>
      );
    }

    if (viewState === 'reaction-select' && currentMission) {
      return (
        <ReactionSelector
          mission={currentMission}
          onSelectReaction={handleReactionSelected}
          onCancel={() => setViewState('detail')}
        />
      );
    }

    if (viewState === 'chemical-select' && currentMission) {
      return (
        <ChemicalSelector
          mission={currentMission as any}
          onSelectChemicals={handleChemicalsSelected}
          onCancel={() => setViewState('detail')}
        />
      );
    }

    if (viewState === 'simulation' && currentMission && selectedReaction) {
      return (
        <SimulationCanvas
          mission={currentMission}
          selectedReaction={selectedReaction}
          onSuccess={handleMissionSuccess}
          onFailure={() => setViewState(currentMission.type === 'chemical-select' ? 'chemical-select' : 'reaction-select')}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background circuit-pattern">
      {/* Header */}
      <header className="border-b border-primary/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🧪</div>
            <div>
              <h1 className="text-2xl font-bold text-primary display-font">ChemQuest</h1>
              <p className="text-xs text-muted-foreground">Hành Trình Khám Phá Hóa Học</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setLocation('/dashboard')}
              variant="outline"
              size="icon"
              className="border-primary/30"
              title="Xem Thống Kê"
            >
              <BarChart3 className="w-4 h-4 text-primary" />
            </Button>
            <Button
              onClick={() => setSoundEnabled(!soundEnabled)}
              variant="outline"
              size="icon"
              className="border-primary/30"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-primary" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              size="icon"
              className="border-primary/30"
            >
              <RotateCcw className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <ResponsiveLayout
          sidebar={
            <ChapterMap
              chapters={allChapters}
              currentChapter={gameState.currentChapter}
              completedMissions={gameState.completedMissions}
              onSelectChapter={(chapterId) => {
                setCurrentChapter(chapterId);
                setViewState('missions');
              }}
            />
          }
          main={renderMainContent()}
          info={
            <ScoreBoard
              totalScore={gameState.totalScore}
              combo={gameState.combo}
              completedMissions={gameState.completedMissions.length}
              totalMissions={totalMissions}
            />
          }
        />
      </main>

      {/* Success Modal */}
      {viewState === 'success' && currentMission && (
        <SuccessModal
          score={lastScore}
          basePoints={currentMission.basePoints}
          combo={gameState.combo}
          message={currentMission.successMessage}
          onContinue={handleContinue}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-primary/30 bg-background/80 backdrop-blur-sm py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>ChemQuest © 2026 - Học Hóa Học Vừa Chơi Vừa Học</p>
          <p className="mt-2">Thiết kế: Cyberpunk Futuristic Lab | Phong cách: Neon Glow + Interactive</p>
        </div>
      </footer>
    </div>
  );
}
