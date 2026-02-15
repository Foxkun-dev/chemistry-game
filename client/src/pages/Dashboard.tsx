import { allChapters } from '@/lib/gameData';
import { useGameState } from '@/hooks/useGameState';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Target, TrendingUp, Zap, ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Dashboard Page - Kết Quả & Thống Kê
 * Hiển thị biểu đồ tương tác về tiến trình học tập
 */

export default function Dashboard() {
  const { gameState } = useGameState();
  const [, setLocation] = useLocation();

  const totalMissions = allChapters.reduce((sum, ch) => sum + ch.missions.length, 0);
  const completionRate = (gameState.completedMissions.length / totalMissions) * 100;

  // Prepare data for charts
  const chapterData = allChapters.map((chapter) => {
    const completedInChapter = chapter.missions.filter((m) =>
      gameState.completedMissions.includes(m.id)
    ).length;
    const totalScore = chapter.missions.reduce((sum, m) => {
      return sum + (gameState.missionScores[m.id] || 0);
    }, 0);

    return {
      name: chapter.title,
      completed: completedInChapter,
      total: chapter.missions.length,
      score: totalScore,
      percentage: (completedInChapter / chapter.missions.length) * 100,
    };
  });

  const difficultyData = [
    {
      name: 'Dễ',
      value: allChapters.reduce(
        (sum, ch) => sum + ch.missions.filter((m) => m.difficulty === 'easy').length,
        0
      ),
    },
    {
      name: 'Trung Bình',
      value: allChapters.reduce(
        (sum, ch) => sum + ch.missions.filter((m) => m.difficulty === 'medium').length,
        0
      ),
    },
    {
      name: 'Khó',
      value: allChapters.reduce(
        (sum, ch) => sum + ch.missions.filter((m) => m.difficulty === 'hard').length,
        0
      ),
    },
  ];

  const COLORS = ['#CCFF00', '#00D9FF', '#D946EF'];

  const progressData = allChapters.flatMap((chapter) =>
    chapter.missions.map((mission) => ({
      name: mission.title,
      score: gameState.missionScores[mission.id] || 0,
      maxScore: mission.basePoints,
      completed: gameState.completedMissions.includes(mission.id),
    }))
  );

  return (
    <div className="min-h-screen bg-background circuit-pattern">
      {/* Header */}
      <header className="border-b border-primary/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setLocation('/')}
              variant="outline"
              size="icon"
              className="border-primary/30"
            >
              <ChevronLeft className="w-4 h-4 text-primary" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary display-font">Bảng Điều Khiển</h1>
              <p className="text-xs text-muted-foreground">Thống Kê & Tiến Trình Học Tập</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="holographic-card p-6 space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Tổng Điểm</span>
              </div>
              <div className="text-3xl font-bold text-accent">{gameState.totalScore}</div>
              <div className="text-xs text-muted-foreground">Từ {totalMissions} nhiệm vụ</div>
            </Card>

            <Card className="holographic-card p-6 space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Hoàn Thành</span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {gameState.completedMissions.length}/{totalMissions}
              </div>
              <div className="text-xs text-muted-foreground">{Math.round(completionRate)}%</div>
            </Card>

            <Card className="holographic-card p-6 space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Trung Bình</span>
              </div>
              <div className="text-3xl font-bold text-secondary">
                {gameState.completedMissions.length > 0
                  ? Math.round(gameState.totalScore / gameState.completedMissions.length)
                  : 0}
              </div>
              <div className="text-xs text-muted-foreground">Điểm/Nhiệm vụ</div>
            </Card>

            <Card className="holographic-card p-6 space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Combo</span>
              </div>
              <div className="text-3xl font-bold text-destructive">{gameState.combo}x</div>
              <div className="text-xs text-muted-foreground">Liên tiếp</div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chapter Progress */}
            <Card className="holographic-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Tiến Trình Theo Chương</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chapterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A2847',
                      border: '1px solid #00D9FF',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#E0F2FE' }}
                  />
                  <Legend />
                  <Bar dataKey="completed" fill="#00D9FF" name="Hoàn Thành" />
                  <Bar dataKey="total" fill="#334155" name="Tổng Cộng" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Difficulty Distribution */}
            <Card className="holographic-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Phân Bố Độ Khó</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A2847',
                      border: '1px solid #00D9FF',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#E0F2FE' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Score Trend */}
            <Card className="holographic-card p-6 space-y-4 lg:col-span-2">
              <h2 className="text-lg font-bold text-foreground">Xu Hướng Điểm Số</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData.slice(0, 15)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="#94A3B8" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A2847',
                      border: '1px solid #00D9FF',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#E0F2FE' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#00D9FF"
                    strokeWidth={2}
                    name="Điểm Đạt Được"
                    dot={{ fill: '#00D9FF', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="maxScore"
                    stroke="#D946EF"
                    strokeWidth={2}
                    name="Điểm Tối Đa"
                    dot={{ fill: '#D946EF', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Chapter Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Chi Tiết Theo Chương</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {chapterData.map((chapter, idx) => (
                <Card key={idx} className="holographic-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">{chapter.name}</h3>
                    <Badge variant="outline" className="bg-primary/20 text-primary">
                      {chapter.completed}/{chapter.total}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tiến Trình</span>
                      <span className="font-bold text-primary">{Math.round(chapter.percentage)}%</span>
                    </div>
                    <div className="w-full bg-card rounded-full h-2 overflow-hidden border border-primary/30">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${chapter.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tổng Điểm</span>
                    <span className="font-bold text-accent">{chapter.score}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => setLocation('/')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground neon-glow-green px-8 py-6 text-lg"
            >
              Quay Lại Chơi Game
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/30 bg-background/80 backdrop-blur-sm py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>ChemQuest © 2026 - Học Hóa Học Vừa Chơi Vừa Học</p>
        </div>
      </footer>
    </div>
  );
}
