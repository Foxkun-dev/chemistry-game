import { useState, useCallback, useEffect } from 'react';
import { GameState, initialGameState, allChapters } from '@/lib/gameData';

const GAME_STATE_KEY = 'chemquest-game-state';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(GAME_STATE_KEY);
      return saved ? JSON.parse(saved) : initialGameState;
    } catch {
      return initialGameState;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const completeMission = useCallback((missionId: string, score: number) => {
    setGameState((prev) => {
      const newState = { ...prev };
      
      // Add to completed missions if not already
      if (!newState.completedMissions.includes(missionId)) {
        newState.completedMissions.push(missionId);
      }

      // Update score
      const previousScore = newState.missionScores[missionId] || 0;
      const newScore = Math.max(previousScore, score);
      newState.missionScores[missionId] = newScore;

      // Update total score and combo
      newState.totalScore = Object.values(newState.missionScores).reduce((a, b) => a + b, 0);
      
      // Increase combo if last mission was also completed
      const currentChapter = allChapters.find(ch => ch.id === prev.currentChapter);
      if (currentChapter) {
        const currentMissionIndex = currentChapter.missions.findIndex(m => m.id === missionId);
        if (currentMissionIndex > 0) {
          const previousMissionId = currentChapter.missions[currentMissionIndex - 1].id;
          if (newState.completedMissions.includes(previousMissionId)) {
            newState.combo += 1;
          } else {
            newState.combo = 1;
          }
        } else {
          newState.combo = 1;
        }
      }

      return newState;
    });
  }, []);

  const setCurrentMission = useCallback((missionId: string) => {
    setGameState((prev) => ({
      ...prev,
      currentMission: missionId,
    }));
  }, []);

  const setCurrentChapter = useCallback((chapterId: string) => {
    setGameState((prev) => {
      const chapter = allChapters.find(ch => ch.id === chapterId);
      return {
        ...prev,
        currentChapter: chapterId,
        currentMission: chapter?.missions[0].id || prev.currentMission,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  return {
    gameState,
    completeMission,
    setCurrentMission,
    setCurrentChapter,
    resetGame,
  };
}
