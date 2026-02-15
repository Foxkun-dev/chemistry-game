// Additional missions for Chapters 2-4
// This file contains 36 missions to expand each chapter to 12 missions

export const chapter2AdditionalMissions = [
  // m2-5 to m2-12 (8 missions)
  {
    id: 'm2-5-no2',
    chapterId: 'ch2-nitrogen-sulfur',
    title: 'Nitrogen Dioxide',
    description: 'Chon phan ung tao NO2 tu NO.',
    objectives: ['Chon phan ung: 2NO + O2 -> 2NO2', 'Hieu oxidation NO', 'Nhan biet khi NO2 nau do'],
    elements: ['NO', 'O2'],
    reactions: [
      {id: 'r2-5-1', reactants: ['NO', 'O2'], products: ['NO2', 'NO2'], description: '2NO + O2 -> 2NO2', animation: 'color_change', color: '#FF6B00', sound: 'reaction_color_change', isCorrect: true},
      {id: 'r2-5-2', reactants: ['NO'], products: ['N2', 'O2'], description: 'NO -> N2 + O2', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai!'},
      {id: 'r2-5-3', reactants: ['NO', 'H2O'], products: ['HNO2', 'H2'], description: 'NO + H2O -> HNO2 + H2', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai!'}
    ],
    basePoints: 150,
    difficulty: 'medium',
    hints: ['Lien quan den oxygen', 'Tim phan ung tao NO2', 'Hay sua: 2NO + O2 -> 2NO2'],
    successMessage: 'Tuyet voi!',
    failureMessage: 'Hay thu lai.'
  },
  {
    id: 'm2-6-hno3',
    chapterId: 'ch2-nitrogen-sulfur',
    title: 'Nitric Acid',
    description: 'Chon phan ung tao HNO3 tu NO2.',
    objectives: ['Chon phan ung: 3NO2 + H2O -> 2HNO3 + NO', 'Hieu tao acid nitric', 'Nhan biet san pham'],
    elements: ['NO2', 'H2O'],
    reactions: [
      {id: 'r2-6-1', reactants: ['NO2', 'H2O'], products: ['HNO3', 'NO'], description: '3NO2 + H2O -> 2HNO3 + NO', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
      {id: 'r2-6-2', reactants: ['NO2', 'H2O'], products: ['HNO2', 'HNO3'], description: 'NO2 + H2O -> HNO2 + HNO3', animation: 'color_change', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai!'},
      {id: 'r2-6-3', reactants: ['NO2'], products: ['N2', 'O2'], description: 'NO2 -> N2 + O2', animation: 'explosion', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai!'}
    ],
    basePoints: 200,
    difficulty: 'hard',
    hints: ['Lien quan den nuoc', 'San pham chinh la HNO3', 'Hay nho: 3NO2 + H2O -> 2HNO3 + NO'],
    successMessage: 'Xuat sac!',
    failureMessage: 'Hay thu lai.'
  },
];

export const chapter3AdditionalMissions = [
  // m3-5 to m3-12 (8 missions)
  {
    id: 'm3-5-alkane-combustion',
    chapterId: 'ch3-organic',
    title: 'Dot chay Alkane',
    description: 'Chon phan ung dot chay alkane.',
    objectives: ['Chon phan ung: C2H6 + 7/2 O2 -> 2CO2 + 3H2O', 'Hieu dot chay hoan toan', 'Nhan biet san pham'],
    elements: ['C2H6', 'O2'],
    reactions: [
      {id: 'r3-5-1', reactants: ['C2H6', 'O2'], products: ['CO2', 'H2O'], description: 'C2H6 + 7/2 O2 -> 2CO2 + 3H2O', animation: 'color_change', color: '#00D9FF', sound: 'reaction_color_change', isCorrect: true},
      {id: 'r3-5-2', reactants: ['C2H6'], products: ['C2H4', 'H2'], description: 'C2H6 -> C2H4 + H2', animation: 'gas_release', color: '#D946EF', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai!'},
      {id: 'r3-5-3', reactants: ['C2H6', 'O2'], products: ['CO', 'H2O'], description: 'C2H6 + O2 -> CO + H2O', animation: 'color_change', color: '#CCFF00', sound: 'reaction_error', isCorrect: false, errorMessage: 'Sai!'}
    ],
    basePoints: 150,
    difficulty: 'medium',
    hints: ['Lien quan den oxygen', 'San pham la CO2 va H2O', 'Tim phan ung dot chay hoan toan'],
    successMessage: 'Tuyet voi!',
    failureMessage: 'Hay thu lai.'
  },
];

export const chapter4AdditionalMissions = [
  // m4-5 to m4-12 (8 missions - chemical select type)
  {
    id: 'm4-5-haber-advanced',
    chapterId: 'ch4-synthesis',
    title: 'Tong Hop Amoniac Nang Cao',
    description: 'Chon 2 chat dung de tao amoniac voi dieu kien toi uu.',
    objectives: ['Chon N2 va H2', 'Hieu qua trinh Haber cong nghiep', 'Ap dung dieu kien toi uu'],
    elements: [],
    basePoints: 250,
    difficulty: 'hard',
    hints: [],
    successMessage: 'Xuat sac!',
    failureMessage: 'Hay thu lai.',
    type: 'chemical-select',
  },
];
