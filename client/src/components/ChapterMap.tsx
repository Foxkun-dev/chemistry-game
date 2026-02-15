import { Chapter } from '@/lib/gameData';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle2 } from 'lucide-react';

interface ChapterMapProps {
  chapters: Chapter[];
  currentChapter: string;
  completedMissions: string[];
  onSelectChapter: (chapterId: string) => void;
}

export function ChapterMap({
  chapters,
  currentChapter,
  completedMissions,
  onSelectChapter,
}: ChapterMapProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Bản Đồ Chương</h2>
      <div className="space-y-3">
        {chapters.map((chapter, index) => {
          const isUnlocked = index === 0 || chapters[index - 1].missions.every(m => completedMissions.includes(m.id));
          const isCompleted = chapter.missions.every(m => completedMissions.includes(m.id));
          const isActive = chapter.id === currentChapter;

          return (
            <Button
              key={chapter.id}
              onClick={() => isUnlocked && onSelectChapter(chapter.id)}
              disabled={!isUnlocked}
              className={`w-full justify-start gap-3 h-auto py-3 px-4 transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground neon-glow-blue'
                  : isCompleted
                    ? 'bg-accent/20 text-accent border border-accent'
                    : 'bg-card/50 text-foreground hover:bg-card'
              } ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              variant="outline"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{chapter.icon}</span>
                <div className="text-left">
                  <div className="font-bold">{chapter.title}</div>
                  <div className="text-xs opacity-75">
                    {chapter.missions.filter(m => completedMissions.includes(m.id)).length}/{chapter.missions.length} nhiệm vụ
                  </div>
                </div>
              </div>
              <div>
                {!isUnlocked && <Lock className="w-5 h-5" />}
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-accent" />}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
