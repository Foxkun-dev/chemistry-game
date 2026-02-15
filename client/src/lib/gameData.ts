/**
 * Game Data Configuration
 * Chứa tất cả dữ liệu về chương, nhiệm vụ, phản ứng hóa học
 * Design: Cyberpunk Futuristic Lab
 */

export interface Element {
  id: string;
  name: string;
  symbol: string;
  color: string;
  icon: string;
}

export interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  icon: string;
}

export interface ChemicalMission extends Omit<Mission, 'reactions'> {
  type: 'chemical-select';
  availableChemicals: Chemical[];
  correctReactants: string[]; // Chemical IDs
  expectedProducts: string[]; // Chemical IDs
}

export interface Reaction {
  id: string;
  reactants: string[];
  products: string[];
  description: string;
  animation: 'explosion' | 'color_change' | 'gas_release' | 'precipitate';
  color: string;
  sound: string;
  isCorrect?: boolean;
  errorMessage?: string;
}

export interface Mission {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  objectives: string[];
  elements: string[];
  reactions?: Reaction[];
  basePoints: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  successMessage: string;
  failureMessage: string;
  type?: 'reaction-select' | 'chemical-select';
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  missions: Mission[];
  color: string;
  backgroundImage: string;
}

export interface GameState {
  currentChapter: string;
  currentMission: string;
  totalScore: number;
  combo: number;
  completedMissions: string[];
  missionScores: Record<string, number>;
}

// ============================================
// CHAPTER 1: CÂN BẰNG HÓA HỌC
// ============================================

export const chapter1: Chapter = {
  id: 'ch1-equilibrium',
  title: 'Cân Bằng Hóa Học',
  description: 'Khám phá bản chất của cân bằng hóa học - trạng thái động nơi tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch. Tìm hiểu cách các điều kiện ảnh hưởng đến cân bằng.',
  icon: '⚖️',
  color: '#00D9FF',
  backgroundImage: 'https://private-us-east-1.manuscdn.com/sessionFile/aqrqG4hAD5AZujURSHJqbG/sandbox/mNXA8cAujX6na9BNCVADLV-img-1_1770511140000_na1fn_aGVyby1sYWI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  missions: [
    {
      id: 'm1-1-intro',
      chapterId: 'ch1-equilibrium',
      title: 'Giới Thiệu Cân Bằng Động',
      description: 'Tìm hiểu khái niệm cân bằng hóa học thông qua phản ứng N₂O₄ ⇌ 2NO₂. Chọn phản ứng đúng!',
      objectives: [
        'Chọn phản ứng đúng: N₂O₄ ⇌ 2NO₂',
        'Hiểu rằng cân bằng là trạng thái động',
        'Nhận biết các chất phản ứng và sản phẩm',
      ],
      elements: ['N2O4', 'NO2'],
      reactions: [
        {
          id: 'r1-1-1',
          reactants: ['N2O4'],
          products: ['NO2', 'NO2'],
          description: 'N₂O₄ (không màu) ⇌ 2NO₂ (nâu đỏ)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_color_change',
          isCorrect: true,
        },
        {
          id: 'r1-1-2',
          reactants: ['N2O4'],
          products: ['N2', 'O2'],
          description: 'N₂O₄ → N₂ + 2O₂ (Phân hủy hoàn toàn)',
          animation: 'gas_release',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! N₂O₄ không phân hủy thành N₂ và O₂. Đây là phản ứng khả nghịch tạo NO₂.',
        },
        {
          id: 'r1-1-3',
          reactants: ['N2O4'],
          products: ['N2', 'O4'],
          description: 'N₂O₄ → N₂ + O₄ (Phân tử tử)',
          animation: 'explosion',
          color: '#FF6B00',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! O₄ không tồn tại. Phản ứng đúng là N₂O₄ ⇌ 2NO₂.',
        },
      ],
      basePoints: 100,
      difficulty: 'easy',
      hints: [
        'Phản ứng này là phản ứng khả nghịch - có thể xảy ra theo cả hai chiều',
        'Sản phẩm là NO₂ - khí nâu đỏ',
        'Tìm phản ứng có màu tím/nâu đỏ',
      ],
      successMessage: 'Tuyệt vời! Bạn chọn đúng phản ứng cân bằng động!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng khả nghịch tạo NO₂.',
    },
    {
      id: 'm1-2-temperature',
      chapterId: 'ch1-equilibrium',
      title: 'Ảnh Hưởng Của Nhiệt Độ',
      description: 'Chọn phản ứng đúng và điều chỉnh nhiệt độ để quan sát cân bằng dịch chuyển.',
      objectives: [
        'Chọn phản ứng N₂O₄ ⇌ 2NO₂ (phản ứng tỏa nhiệt)',
        'Tăng nhiệt độ để quan sát cân bằng dịch chuyển',
        'Hiểu nguyên lý Le Chatelier',
      ],
      elements: ['N2O4', 'NO2'],
      reactions: [
        {
          id: 'r1-2-1',
          reactants: ['N2O4'],
          products: ['NO2', 'NO2'],
          description: 'N₂O₄ ⇌ 2NO₂ (Phản ứng tỏa nhiệt)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_color_change',
          isCorrect: true,
        },
        {
          id: 'r1-2-2',
          reactants: ['NO2'],
          products: ['N2O4'],
          description: 'Phản ứng ngược: 2NO₂ → N₂O₄ (Sai chiều)',
          animation: 'color_change',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phản ứng ngược. Chọn phản ứng thuận: N₂O₄ → 2NO₂',
        },
        {
          id: 'r1-2-3',
          reactants: ['N2O4', 'Heat'],
          products: ['N2', 'O2'],
          description: 'N₂O₄ + Nhiệt → N₂ + 2O₂ (Phân hủy)',
          animation: 'explosion',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Phản ứng này không đúng. N₂O₄ tỏa nhiệt, không cần thêm nhiệt.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Tìm phản ứng tỏa nhiệt: N₂O₄ → 2NO₂',
        'Phản ứng này là phản ứng thuận, không phải ngược',
        'Chọn phản ứng có mũi tên đơn hoặc có từ "tỏa nhiệt"',
      ],
      successMessage: 'Xuất sắc! Bạn hiểu ảnh hưởng của nhiệt độ!',
      failureMessage: 'Hãy kiểm tra lại. Chọn phản ứng tỏa nhiệt.',
    },
    {
      id: 'm1-3-concentration',
      chapterId: 'ch1-equilibrium',
      title: 'Ảnh Hưởng Của Nồng Độ',
      description: 'Chọn phản ứng đúng và điều chỉnh nồng độ để quan sát cân bằng dịch chuyển.',
      objectives: [
        'Chọn phản ứng N₂O₄ ⇌ 2NO₂',
        'Tăng nồng độ N₂O₄ để quan sát dịch chuyển',
        'Áp dụng nguyên lý Le Chatelier cho nồng độ',
      ],
      elements: ['N2O4', 'NO2'],
      reactions: [
        {
          id: 'r1-3-1',
          reactants: ['N2O4'],
          products: ['NO2', 'NO2'],
          description: 'N₂O₄ ⇌ 2NO₂ (Phản ứng khả nghịch)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_color_change',
          isCorrect: true,
        },
        {
          id: 'r1-3-2',
          reactants: ['NO2'],
          products: ['N2O4'],
          description: '2NO₂ ⇌ N₂O₄ (Phản ứng ngược)',
          animation: 'color_change',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phản ứng ngược. Chọn phản ứng thuận.',
        },
        {
          id: 'r1-3-3',
          reactants: ['N2O4', 'Catalyst'],
          products: ['NO2', 'NO2'],
          description: 'N₂O₄ + Xúc tác → 2NO₂ (Có xúc tác)',
          animation: 'gas_release',
          color: '#CCFF00',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Phản ứng này không cần xúc tác. Chọn phản ứng khả nghịch đơn giản.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Tìm phản ứng khả nghịch: N₂O₄ ⇌ 2NO₂',
        'Không có xúc tác trong phản ứng này',
        'Chọn phản ứng với mũi tên hai chiều',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu ảnh hưởng của nồng độ!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng khả nghịch.',
    },
    {
      id: 'm1-4-pressure',
      chapterId: 'ch1-equilibrium',
      title: 'Ảnh Hưởng Của Áp Suất',
      description: 'Chọn phản ứng đúng (1 mol → 2 mol khí) và điều chỉnh áp suất.',
      objectives: [
        'Chọn phản ứng N₂O₄ ⇌ 2NO₂ (1 mol → 2 mol)',
        'Tăng áp suất để quan sát dịch chuyển sang trái',
        'Giảm áp suất để quan sát dịch chuyển sang phải',
      ],
      elements: ['N2O4', 'NO2'],
      reactions: [
        {
          id: 'r1-4-1',
          reactants: ['N2O4'],
          products: ['NO2', 'NO2'],
          description: 'N₂O₄ ⇌ 2NO₂ (1 mol → 2 mol khí)',
          animation: 'gas_release',
          color: '#00D9FF',
          sound: 'reaction_color_change',
          isCorrect: true,
        },
        {
          id: 'r1-4-2',
          reactants: ['N2O4'],
          products: ['NO2'],
          description: 'N₂O₄ ⇌ NO₂ (Sai công thức)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Công thức sai. Phản ứng đúng tạo 2NO₂, không phải 1NO₂.',
        },
        {
          id: 'r1-4-3',
          reactants: ['N2O4'],
          products: ['N2', 'O2', 'O2'],
          description: 'N₂O₄ ⇌ N₂ + 2O₂ (Sai sản phẩm)',
          animation: 'explosion',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Sản phẩm sai. Phản ứng đúng tạo NO₂, không phải N₂ và O₂.',
        },
      ],
      basePoints: 200,
      difficulty: 'hard',
      hints: [
        'Tìm phản ứng có 1 mol chất phản ứng tạo 2 mol sản phẩm khí',
        'Phản ứng này: N₂O₄ (1 mol) → 2NO₂ (2 mol)',
        'Chọn phản ứng với mũi tên hai chiều',
      ],
      successMessage: 'Tuyệt vời! Bạn nắm được ảnh hưởng của áp suất!',
      failureMessage: 'Hãy kiểm tra lại. Chọn phản ứng tạo 2 mol từ 1 mol.',
    },
    {
      id: 'm1-5-amonium',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Amonium Nitrate',
      description: 'Chọn phản ứng cân bằng giữa amonium và nitrate trong dung dịch nước.',
      objectives: ['Chọn phản ứng: NH4+ + H2O ⇌ NH3 + H3O+', 'Hiểu cân bằng ion trong nước', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['NH4+', 'H2O'],
      reactions: [
        {id: 'r1-5-1', reactants: ['NH4+', 'H2O'], products: ['NH3', 'H3O+'], description: 'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-5-2', reactants: ['NH4+'], products: ['NH3', 'H+'], description: 'NH₄⁺ → NH₃ + H⁺ (Không cân bằng)', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Phản ứng này không cân bằng. Chọn phản ứng với H₂O.'},
        {id: 'r1-5-3', reactants: ['NH4+', 'OH-'], products: ['NH3', 'H2O'], description: 'NH₄⁺ + OH⁻ → NH₃ + H₂O (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là NH₃ và H₃O⁺', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Tuyệt vời! Bạn hiểu cân bằng ion!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-6-carbonate',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Carbonate',
      description: 'Chọn phản ứng cân bằng của carbonate trong nước.',
      objectives: ['Chọn phản ứng: CO3(2-) + H2O ⇌ HCO3- + OH-', 'Hiểu tính chất kiềm của carbonate', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['CO3(2-)', 'H2O'],
      reactions: [
        {id: 'r1-6-1', reactants: ['CO3(2-)', 'H2O'], products: ['HCO3-', 'OH-'], description: 'CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-6-2', reactants: ['CO3(2-)'], products: ['CO2', 'O2'], description: 'CO₃²⁻ → CO₂ + O₂ (Phân hủy)', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Carbonate không phân hủy thành CO₂ và O₂.'},
        {id: 'r1-6-3', reactants: ['CO3(2-)', 'H+'], products: ['HCO3-'], description: 'CO₃²⁻ + H⁺ → HCO₃⁻ (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là HCO₃⁻ và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Tuyệt vời! Bạn hiểu cân bằng carbonate!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-7-acetate',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Acetate',
      description: 'Chọn phản ứng cân bằng của acetate trong nước.',
      objectives: ['Chọn phản ứng: CH3COO- + H2O ⇌ CH3COOH + OH-', 'Hiểu tính chất kiềm của acetate', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['CH3COO-', 'H2O'],
      reactions: [
        {id: 'r1-7-1', reactants: ['CH3COO-', 'H2O'], products: ['CH3COOH', 'OH-'], description: 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-7-2', reactants: ['CH3COO-'], products: ['CH3', 'COO-'], description: 'CH₃COO⁻ → CH₃ + COO⁻ (Phân tách)', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Acetate không phân tách thế. Chọn phản ứng với H₂O.'},
        {id: 'r1-7-3', reactants: ['CH3COO-', 'H+'], products: ['CH3COOH'], description: 'CH₃COO⁻ + H⁺ → CH₃COOH (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là CH₃COOH và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Tuyệt vời! Bạn hiểu cân bằng acetate!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-8-phosphate',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Phosphate',
      description: 'Chọn phản ứng cân bằng của phosphate trong nước.',
      objectives: ['Chọn phản ứng: PO4(3-) + H2O ⇌ HPO4(2-) + OH-', 'Hiểu cân bằng đa bậc', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['PO4(3-)', 'H2O'],
      reactions: [
        {id: 'r1-8-1', reactants: ['PO4(3-)', 'H2O'], products: ['HPO4(2-)', 'OH-'], description: 'PO₄³⁻ + H₂O ⇌ HPO₄²⁻ + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-8-2', reactants: ['PO4(3-)'], products: ['P', 'O2'], description: 'PO₄³⁻ → P + O₂ (Phân hủy)', animation: 'explosion', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Phosphate không phân hủy thế. Chọn phản ứng với H₂O.'},
        {id: 'r1-8-3', reactants: ['PO4(3-)', 'H+'], products: ['HPO4(2-)'], description: 'PO₄³⁻ + H⁺ → HPO₄²⁻ (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 200,
      difficulty: 'hard',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là HPO₄²⁻ và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Xuất sắc! Bạn hiểu cân bằng đa bậc!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-9-sulfite',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Sulfite',
      description: 'Chọn phản ứng cân bằng của sulfite trong nước.',
      objectives: ['Chọn phản ứng: SO3(2-) + H2O ⇌ HSO3- + OH-', 'Hiểu cân bằng của sulfite', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['SO3(2-)', 'H2O'],
      reactions: [
        {id: 'r1-9-1', reactants: ['SO3(2-)', 'H2O'], products: ['HSO3-', 'OH-'], description: 'SO₃²⁻ + H₂O ⇌ HSO₃⁻ + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-9-2', reactants: ['SO3(2-)'], products: ['SO2', 'O2'], description: 'SO₃²⁻ → SO₂ + O₂ (Phân hủy)', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Sulfite không phân hủy thế. Chọn phản ứng với H₂O.'},
        {id: 'r1-9-3', reactants: ['SO3(2-)', 'H+'], products: ['HSO3-'], description: 'SO₃²⁻ + H⁺ → HSO₃⁻ (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là HSO₃⁻ và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Tuyệt vời! Bạn hiểu cân bằng sulfite!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-10-fluoride',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Fluoride',
      description: 'Chọn phản ứng cân bằng của fluoride trong nước.',
      objectives: ['Chọn phản ứng: F- + H2O ⇌ HF + OH-', 'Hiểu cân bằng của fluoride', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['F-', 'H2O'],
      reactions: [
        {id: 'r1-10-1', reactants: ['F-', 'H2O'], products: ['HF', 'OH-'], description: 'F⁻ + H₂O ⇌ HF + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-10-2', reactants: ['F-'], products: ['F', 'e-'], description: 'F⁻ → F + e⁻ (Ôxidation)', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Fluoride không ôxidation thế. Chọn phản ứng với H₂O.'},
        {id: 'r1-10-3', reactants: ['F-', 'H+'], products: ['HF'], description: 'F⁻ + H⁺ → HF (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là HF và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Tuyệt vời! Bạn hiểu cân bằng fluoride!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-11-cyanide',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Cyanide',
      description: 'Chọn phản ứng cân bằng của cyanide trong nước.',
      objectives: ['Chọn phản ứng: CN- + H2O ⇌ HCN + OH-', 'Hiểu cân bằng của cyanide', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['CN-', 'H2O'],
      reactions: [
        {id: 'r1-11-1', reactants: ['CN-', 'H2O'], products: ['HCN', 'OH-'], description: 'CN⁻ + H₂O ⇌ HCN + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-11-2', reactants: ['CN-'], products: ['C', 'N'], description: 'CN⁻ → C + N (Phân tách)', animation: 'explosion', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Cyanide không phân tách thế. Chọn phản ứng với H₂O.'},
        {id: 'r1-11-3', reactants: ['CN-', 'H+'], products: ['HCN'], description: 'CN⁻ + H⁺ → HCN (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 200,
      difficulty: 'hard',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là HCN và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Xuất sắc! Bạn hiểu cân bằng cyanide!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
    {
      id: 'm1-12-thiocyanate',
      chapterId: 'ch1-equilibrium',
      title: 'Cân Bằng Thiocyanate',
      description: 'Chọn phản ứng cân bằng của thiocyanate trong nước.',
      objectives: ['Chọn phản ứng: SCN- + H2O ⇌ HSCN + OH-', 'Hiểu cân bằng của thiocyanate', 'Áp dụng nguyên lý Le Chatelier'],
      elements: ['SCN-', 'H2O'],
      reactions: [
        {id: 'r1-12-1', reactants: ['SCN-', 'H2O'], products: ['HSCN', 'OH-'], description: 'SCN⁻ + H₂O ⇌ HSCN + OH⁻', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
        {id: 'r1-12-2', reactants: ['SCN-'], products: ['S', 'C', 'N'], description: 'SCN⁻ → S + C + N (Phân tách)', animation: 'explosion', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Thiocyanate không phân tách thế. Chọn phản ứng với H₂O.'},
        {id: 'r1-12-3', reactants: ['SCN-', 'H+'], products: ['HSCN'], description: 'SCN⁻ + H⁺ → HSCN (Không khả nghịch)', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai! Chọn phản ứng khả nghịch với H₂O.'}
      ],
      basePoints: 200,
      difficulty: 'hard',
      hints: ['Phản ứng này liên quan đến nước', 'Sản phẩm là HSCN và OH⁻', 'Tìm phản ứng khả nghịch'],
      successMessage: 'Xuất sắc! Bạn nắm vững cân bằng hóa học!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng với H₂O.'
    },
  ],
};

// ============================================
// CHAPTER 2: NITROGEN - SULFUR
// ============================================

export const chapter2: Chapter = {
  id: 'ch2-nitrogen-sulfur',
  title: 'Nitrogen - Sulfur',
  description: 'Khám phá các hợp chất của Nitrogen và Sulfur, vai trò của chúng trong tự nhiên, công nghiệp và ứng dụng thực tế. Tìm hiểu các phản ứng quan trọng.',
  icon: '⚗️',
  color: '#D946EF',
  backgroundImage: 'https://private-us-east-1.manuscdn.com/sessionFile/aqrqG4hAD5AZujURSHJqbG/sandbox/mNXA8cAujX6na9BNCVADLV-img-2_1770511134000_na1fn_bW9sZWN1bGUtYW5pbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  missions: [
    {
      id: 'm2-1-ammonia',
      chapterId: 'ch2-nitrogen-sulfur',
      title: 'Amoniac (NH₃) - Hợp Chất Quan Trọng',
      description: 'Chọn phản ứng tổng hợp amoniac đúng từ N₂ và H₂.',
      objectives: [
        'Chọn phản ứng: N₂ + 3H₂ ⇌ 2NH₃',
        'Hiểu quá trình Haber',
        'Nhận biết ứng dụng của amoniac',
      ],
      elements: ['N2', 'H2', 'NH3'],
      reactions: [
        {
          id: 'r2-1-1',
          reactants: ['N2', 'H2'],
          products: ['NH3'],
          description: 'N₂ + 3H₂ ⇌ 2NH₃ (Quá trình Haber)',
          animation: 'gas_release',
          color: '#CCFF00',
          sound: 'reaction_synthesis',
          isCorrect: true,
        },
        {
          id: 'r2-1-2',
          reactants: ['N2', 'H2'],
          products: ['NH2'],
          description: 'N₂ + H₂ → NH₂ (Sai công thức)',
          animation: 'gas_release',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Công thức sai. Phản ứng đúng tạo NH₃ (amoniac), không phải NH₂.',
        },
        {
          id: 'r2-1-3',
          reactants: ['N2', 'O2'],
          products: ['NO'],
          description: 'N₂ + O₂ → 2NO (Sai chất phản ứng)',
          animation: 'gas_release',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Chất phản ứng sai. Phản ứng Haber dùng N₂ + H₂, không phải O₂.',
        },
      ],
      basePoints: 100,
      difficulty: 'easy',
      hints: [
        'Quá trình Haber: N₂ + 3H₂ ⇌ 2NH₃',
        'Cần xúc tác Fe và điều kiện áp suất cao',
        'Tìm phản ứng tạo amoniac (NH₃)',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu quá trình Haber!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng tạo amoniac từ N₂ và H₂.',
    },
    {
      id: 'm2-2-nitric-acid',
      chapterId: 'ch2-nitrogen-sulfur',
      title: 'Axit Nitric (HNO₃) - Axit Mạnh',
      description: 'Chọn phản ứng ôxidation amoniac để tạo axit nitric.',
      objectives: [
        'Chọn phản ứng: 4NH₃ + 5O₂ → 4NO + 6H₂O',
        'Hiểu ôxidation amoniac',
        'Nhận biết tính chất của axit nitric',
      ],
      elements: ['NH3', 'O2', 'HNO3'],
      reactions: [
        {
          id: 'r2-2-1',
          reactants: ['NH3', 'O2'],
          products: ['NO', 'H2O'],
          description: '4NH₃ + 5O₂ → 4NO + 6H₂O (Ôxidation)',
          animation: 'color_change',
          color: '#FF0080',
          sound: 'reaction_oxidation',
          isCorrect: true,
        },
        {
          id: 'r2-2-2',
          reactants: ['NH3'],
          products: ['N2', 'H2'],
          description: '2NH₃ → N₂ + 3H₂ (Phân hủy)',
          animation: 'gas_release',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phân hủy, không phải ôxidation. Chọn phản ứng với O₂.',
        },
        {
          id: 'r2-2-3',
          reactants: ['NH3', 'HCl'],
          products: ['NH4Cl'],
          description: 'NH₃ + HCl → NH₄Cl (Trung hòa hóa)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là trung hòa hóa, không phải ôxidation. Chọn phản ứng với O₂.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Ôxidation amoniac: 4NH₃ + 5O₂ → 4NO + 6H₂O',
        'Cần xúc tác Pt (bạch kim)',
        'Tìm phản ứng tạo NO từ NH₃ và O₂',
      ],
      successMessage: 'Xuất sắc! Bạn hiểu ôxidation amoniac!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng ôxidation với O₂.',
    },
    {
      id: 'm2-3-sulfuric-acid',
      chapterId: 'ch2-nitrogen-sulfur',
      title: 'Axit Sulfuric (H₂SO₄) - Chất Hóa Học Hàng Đầu',
      description: 'Chọn phản ứng đốt cháy lưu huỳnh để tạo SO₂.',
      objectives: [
        'Chọn phản ứng: S + O₂ → SO₂',
        'Hiểu quá trình Contact',
        'Nhận biết tính chất của axit sulfuric',
      ],
      elements: ['S', 'O2', 'SO2', 'H2SO4'],
      reactions: [
        {
          id: 'r2-3-1',
          reactants: ['S', 'O2'],
          products: ['SO2'],
          description: 'S + O₂ → SO₂ (Đốt cháy lưu huỳnh)',
          animation: 'gas_release',
          color: '#00D9FF',
          sound: 'reaction_combustion',
          isCorrect: true,
        },
        {
          id: 'r2-3-2',
          reactants: ['S'],
          products: ['S2'],
          description: '2S → S₂ (Phân tử tử)',
          animation: 'gas_release',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! S không tự phân tử tử. Chọn phản ứng đốt cháy với O₂.',
        },
        {
          id: 'r2-3-3',
          reactants: ['S', 'H2O'],
          products: ['H2S', 'O2'],
          description: 'S + H₂O → H₂S + O₂ (Sai)',
          animation: 'color_change',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! S không phản ứng với nước theo cách này. Chọn phản ứng với O₂.',
        },
      ],
      basePoints: 200,
      difficulty: 'hard',
      hints: [
        'Đốt cháy lưu huỳnh: S + O₂ → SO₂',
        'SO₂ có mùi chua kích thích',
        'Tìm phản ứng tạo SO₂ từ S và O₂',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu quá trình tạo axit sulfuric!',
      failureMessage: 'Hãy kiểm tra lại. Chọn phản ứng đốt cháy lưu huỳnh.',
    },
    {
      id: 'm2-4-nitrogen-oxides',
      chapterId: 'ch2-nitrogen-sulfur',
      title: 'Các Oxide Của Nitrogen',
      description: 'Chọn phản ứng tạo NO từ N₂ và O₂ ở nhiệt độ cao.',
      objectives: [
        'Chọn phản ứng: N₂ + O₂ → 2NO',
        'Hiểu hình thành NO ở nhiệt độ cao',
        'Nhận biết vai trò trong ô nhiễm không khí',
      ],
      elements: ['N2', 'O2', 'NO', 'NO2'],
      reactions: [
        {
          id: 'r2-4-1',
          reactants: ['N2', 'O2'],
          products: ['NO'],
          description: 'N₂ + O₂ → 2NO (Ở nhiệt độ cao)',
          animation: 'gas_release',
          color: '#FF0080',
          sound: 'reaction_combustion',
          isCorrect: true,
        },
        {
          id: 'r2-4-2',
          reactants: ['N2', 'O2'],
          products: ['NO2'],
          description: 'N₂ + O₂ → 2NO₂ (Sai)',
          animation: 'gas_release',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Ở nhiệt độ cao tạo NO, không phải NO₂. NO₂ hình thành sau từ NO.',
        },
        {
          id: 'r2-4-3',
          reactants: ['N2', 'O2'],
          products: ['N2O'],
          description: 'N₂ + O₂ → N₂O (Sai)',
          animation: 'gas_release',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Phản ứng này không tạo N₂O. Chọn phản ứng tạo NO.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Ở nhiệt độ cao: N₂ + O₂ → 2NO',
        'NO được hình thành trong động cơ xe',
        'Tìm phản ứng tạo NO từ N₂ và O₂',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu về nitrogen oxides!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng tạo NO.',
    },
  ],
};

// ============================================
// CHAPTER 3: ĐẠI CƯƠNG HÓA HỌC HỮU CƠ
// ============================================

export const chapter3: Chapter = {
  id: 'ch3-organic',
  title: 'Đại Cương Hóa Học Hữu Cơ',
  description: 'Khám phá thế giới của hóa học hữu cơ - các hợp chất chứa carbon. Tìm hiểu cấu trúc, tính chất và phản ứng của các hợp chất hữu cơ.',
  icon: '🧬',
  color: '#CCFF00',
  backgroundImage: 'https://private-us-east-1.manuscdn.com/sessionFile/aqrqG4hAD5AZujURSHJqbG/sandbox/mNXA8cAujX6na9BNCVADLV-img-3_1770511132000_na1fn_cmVhY3Rpb24tZWZmZWN0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  missions: [
    {
      id: 'm3-1-alkanes',
      chapterId: 'ch3-organic',
      title: 'Alkanes - Hydrocarbon Bão Hòa',
      description: 'Chọn phản ứng đốt cháy hoàn toàn của methane.',
      objectives: [
        'Chọn phản ứng: CH₄ + 2O₂ → CO₂ + 2H₂O',
        'Hiểu đốt cháy hoàn toàn',
        'Nhận biết sản phẩm: CO₂ và H₂O',
      ],
      elements: ['CH4', 'C2H6', 'C3H8'],
      reactions: [
        {
          id: 'r3-1-1',
          reactants: ['CH4', 'O2'],
          products: ['CO2', 'H2O'],
          description: 'CH₄ + 2O₂ → CO₂ + 2H₂O (Đốt cháy hoàn toàn)',
          animation: 'explosion',
          color: '#FF0080',
          sound: 'reaction_combustion',
          isCorrect: true,
        },
        {
          id: 'r3-1-2',
          reactants: ['CH4', 'O2'],
          products: ['CO', 'H2O'],
          description: 'CH₄ + O₂ → CO + 2H₂O (Đốt cháy không hoàn toàn)',
          animation: 'gas_release',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là đốt cháy không hoàn toàn tạo CO. Chọn đốt cháy hoàn toàn tạo CO₂.',
        },
        {
          id: 'r3-1-3',
          reactants: ['CH4'],
          products: ['C', 'H2'],
          description: 'CH₄ → C + 2H₂ (Phân hủy)',
          animation: 'color_change',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phân hủy, không phải đốt cháy. Chọn phản ứng với O₂.',
        },
      ],
      basePoints: 100,
      difficulty: 'easy',
      hints: [
        'Đốt cháy hoàn toàn: CH₄ + 2O₂ → CO₂ + 2H₂O',
        'Sản phẩm là CO₂ (khí carbon dioxide) và H₂O (nước)',
        'Tìm phản ứng tạo CO₂, không phải CO',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu đốt cháy alkanes!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng đốt cháy hoàn toàn tạo CO₂.',
    },
    {
      id: 'm3-2-alkenes',
      chapterId: 'ch3-organic',
      title: 'Alkenes - Hydrocarbon Không Bão Hòa',
      description: 'Chọn phản ứng cộng của ethene với Br₂.',
      objectives: [
        'Chọn phản ứng: C₂H₄ + Br₂ → C₂H₄Br₂',
        'Hiểu phản ứng cộng',
        'Nhận biết làm mất màu Br₂',
      ],
      elements: ['C2H4', 'Br2', 'C2H4Br2'],
      reactions: [
        {
          id: 'r3-2-1',
          reactants: ['C2H4', 'Br2'],
          products: ['C2H4Br2'],
          description: 'C₂H₄ + Br₂ → C₂H₄Br₂ (Phản ứng cộng)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_addition',
          isCorrect: true,
        },
        {
          id: 'r3-2-2',
          reactants: ['C2H4', 'O2'],
          products: ['CO2', 'H2O'],
          description: 'C₂H₄ + 3O₂ → 2CO₂ + 2H₂O (Đốt cháy)',
          animation: 'explosion',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là đốt cháy, không phải phản ứng cộng. Chọn phản ứng với Br₂.',
        },
        {
          id: 'r3-2-3',
          reactants: ['C2H4', 'H2'],
          products: ['C2H6'],
          description: 'C₂H₄ + H₂ → C₂H₆ (Thêm hydrogen)',
          animation: 'gas_release',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phản ứng cộng H₂, không phải Br₂. Chọn phản ứng với Br₂.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Phản ứng cộng: C₂H₄ + Br₂ → C₂H₄Br₂',
        'Br₂ có màu nâu đỏ, phản ứng làm mất màu',
        'Tìm phản ứng với Br₂ tạo C₂H₄Br₂',
      ],
      successMessage: 'Xuất sắc! Bạn hiểu phản ứng cộng!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng cộng với Br₂.',
    },
    {
      id: 'm3-3-alcohols',
      chapterId: 'ch3-organic',
      title: 'Alcohols - Hợp Chất Chứa OH',
      description: 'Chọn phản ứng ôxidation ethanol thành acetaldehyde.',
      objectives: [
        'Chọn phản ứng: C₂H₅OH + [O] → CH₃CHO + H₂O',
        'Hiểu ôxidation alcohols',
        'Nhận biết làm mất màu KMnO₄',
      ],
      elements: ['C2H5OH', 'KMnO4', 'CH3CHO'],
      reactions: [
        {
          id: 'r3-3-1',
          reactants: ['C2H5OH', 'KMnO4'],
          products: ['CH3CHO'],
          description: 'Ôxidation ethanol thành acetaldehyde',
          animation: 'color_change',
          color: '#00D9FF',
          sound: 'reaction_oxidation',
          isCorrect: true,
        },
        {
          id: 'r3-3-2',
          reactants: ['C2H5OH', 'O2'],
          products: ['CO2', 'H2O'],
          description: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O (Đốt cháy)',
          animation: 'explosion',
          color: '#FF0080',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là đốt cháy, không phải ôxidation. Chọn phản ứng với KMnO₄.',
        },
        {
          id: 'r3-3-3',
          reactants: ['C2H5OH'],
          products: ['C2H4', 'H2O'],
          description: 'C₂H₅OH → C₂H₄ + H₂O (Mất nước)',
          animation: 'gas_release',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phản ứng mất nước, không phải ôxidation. Chọn phản ứng với KMnO₄.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Ôxidation ethanol: C₂H₅OH + [O] → CH₃CHO + H₂O',
        'KMnO₄ có màu tím, phản ứng làm mất màu',
        'Tìm phản ứng với KMnO₄ tạo acetaldehyde',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu ôxidation alcohols!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng ôxidation với KMnO₄.',
    },
    {
      id: 'm3-4-carboxylic-acids',
      chapterId: 'ch3-organic',
      title: 'Carboxylic Acids - Axit Hữu Cơ',
      description: 'Chọn phản ứng trung hòa hóa axit acetic với NaOH.',
      objectives: [
        'Chọn phản ứng: CH₃COOH + NaOH → CH₃COONa + H₂O',
        'Hiểu tính chất axit của carboxylic acids',
        'Nhận biết sản phẩm: muối và nước',
      ],
      elements: ['CH3COOH', 'NaOH', 'CH3COONa'],
      reactions: [
        {
          id: 'r3-4-1',
          reactants: ['CH3COOH', 'NaOH'],
          products: ['CH3COONa', 'H2O'],
          description: 'CH₃COOH + NaOH → CH₃COONa + H₂O (Trung hòa hóa)',
          animation: 'color_change',
          color: '#CCFF00',
          sound: 'reaction_neutralization',
          isCorrect: true,
        },
        {
          id: 'r3-4-2',
          reactants: ['CH3COOH', 'H2O'],
          products: ['CH3COO-', 'H3O+'],
          description: 'CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺ (Phân ly)',
          animation: 'color_change',
          color: '#00D9FF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phân ly trong nước, không phải trung hòa hóa. Chọn phản ứng với NaOH.',
        },
        {
          id: 'r3-4-3',
          reactants: ['CH3COOH', 'CH3OH'],
          products: ['CH3COOCH3', 'H2O'],
          description: 'CH₃COOH + CH₃OH → CH₃COOCH₃ + H₂O (Tạo ester)',
          animation: 'color_change',
          color: '#D946EF',
          sound: 'reaction_error',
          isCorrect: false,
          errorMessage: 'Sai! Đây là phản ứng tạo ester, không phải trung hòa hóa. Chọn phản ứng với NaOH.',
        },
      ],
      basePoints: 150,
      difficulty: 'medium',
      hints: [
        'Trung hòa hóa: CH₃COOH + NaOH → CH₃COONa + H₂O',
        'Sản phẩm là muối (CH₃COONa) và nước',
        'Tìm phản ứng với NaOH tạo muối',
      ],
      successMessage: 'Tuyệt vời! Bạn hiểu carboxylic acids!',
      failureMessage: 'Hãy thử lại. Chọn phản ứng trung hòa hóa với NaOH.',
    },
  ],
};



// ============================================
// CHAPTER 4: TONG HOP PHAN UNG - CHON CHAT
// ============================================

export const chapter4: Chapter = {
  id: 'ch4-synthesis',
  title: 'Tong Hop Phan Ung',
  description: 'Thap thach nhat! Chon cac chat hoa hoc tu danh sach de tao phan ung dung. Khong co goi y - chi co thap thach!',
  icon: 'brain',
  color: '#FF0080',
  backgroundImage: 'https://private-us-east-1.manuscdn.com/sessionFile/aqrqG4hAD5AZujURSHJqbG/sandbox/mNXA8cAujX6na9BNCVADLV-img-4_1770511130000_na1fn_c3VjY2Vzcy1iYWRnZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
  missions: [
    {
      id: 'm4-1-haber',
      chapterId: 'ch4-synthesis',
      title: 'Tong Hop Amoniac (Haber)',
      description: 'Chon 2 chat dung tu 4 lua chon de tao amoniac. Khong co goi y!',
      objectives: [
        'Chon chat phan ung dung: N2 va H2',
        'Tao phan ung: N2 + 3H2 = 2NH3',
        'Hieu qua trinh Haber cong nghiep',
      ],
      elements: [],
      basePoints: 200,
      difficulty: 'hard',
      hints: [],
      successMessage: 'Tuyet voi! Ban chon dung chat phan ung!',
      failureMessage: 'Sai! Hay thu lai.',
      type: 'chemical-select',
    },
    {
      id: 'm4-2-nitric',
      chapterId: 'ch4-synthesis',
      title: 'Oxidation Amoniac',
      description: 'Chon 2 chat dung tu 4 lua chon de tao NO. Khong co goi y!',
      objectives: [
        'Chon chat phan ung dung: NH3 va O2',
        'Tao phan ung: 4NH3 + 5O2 -> 4NO + 6H2O',
        'Hieu oxidation amoniac',
      ],
      elements: [],
      basePoints: 250,
      difficulty: 'hard',
      hints: [],
      successMessage: 'Xuat sac! Ban hieu oxidation amoniac!',
      failureMessage: 'Sai! Hay thu lai.',
      type: 'chemical-select',
    },
    {
      id: 'm4-3-sulfur',
      chapterId: 'ch4-synthesis',
      title: 'Dot Chay Luu Huynh',
      description: 'Chon 2 chat dung tu 4 lua chon de tao SO2. Khong co goi y!',
      objectives: [
        'Chon chat phan ung dung: S va O2',
        'Tao phan ung: S + O2 -> SO2',
        'Hieu dot chay luu huynh',
      ],
      elements: [],
      basePoints: 200,
      difficulty: 'hard',
      hints: [],
      successMessage: 'Tuyet voi! Ban chon dung!',
      failureMessage: 'Sai! Hay thu lai.',
      type: 'chemical-select',
    },
    {
      id: 'm4-4-combustion',
      chapterId: 'ch4-synthesis',
      title: 'Dot Chay Methane',
      description: 'Chon 2 chat dung tu 4 lua chon de tao CO2 va H2O. Khong co goi y!',
      objectives: [
        'Chon chat phan ung dung: CH4 va O2',
        'Tao phan ung: CH4 + 2O2 -> CO2 + 2H2O',
        'Hieu dot chay hoan toan',
      ],
      elements: [],
      basePoints: 250,
      difficulty: 'hard',
      hints: [],
      successMessage: 'Xuat sac! Ban nam vung hoa hoc!',
      failureMessage: 'Sai! Hay thu lai.',
      type: 'chemical-select',
    },
  ],
};



// ============================================
// ALL CHAPTERS
// ============================================

export const allChapters: Chapter[] = [chapter1, chapter2, chapter3, chapter4];

// ============================================
// INITIAL GAME STATE
// ============================================

export const initialGameState: GameState = {
  currentChapter: 'ch1-equilibrium',
  currentMission: 'm1-1-intro',
  totalScore: 0,
  combo: 0,
  completedMissions: [],
  missionScores: {},
};
