import { EmblemDef } from '../types/logo';

export const EMBLEMS: EmblemDef[] = [
  // Geometric
  {
    id: 'prism-core',
    nameAr: 'منشور هندسي',
    category: 'geometric',
    elements: [
      { type: 'polygon', attrs: { points: '50,12 86,74 14,74' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '50,32 70,68 30,68' }, role: 'accent' },
    ],
  },
  {
    id: 'orbit-rings',
    nameAr: 'مدار ثلاثي',
    category: 'geometric',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 30 }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 16 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 74, cy: 26, r: 6 }, role: 'accent' },
    ],
  },
  {
    id: 'hex-cube',
    nameAr: 'مكعب سداسي',
    category: 'geometric',
    elements: [
      { type: 'polygon', attrs: { points: '50,12 83,31 83,69 50,88 17,69 17,31' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M50 12 L50 50 L83 69 M50 50 L17 69' }, role: 'accent' },
    ],
  },
  {
    id: 'diamond-cut',
    nameAr: 'ألماسة مقطوعة',
    category: 'geometric',
    elements: [
      { type: 'polygon', attrs: { points: '50,12 86,50 50,88 14,50' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '50,28 70,50 50,72 30,50' }, role: 'accent' },
    ],
  },
  {
    id: 'twin-pillars',
    nameAr: 'أعمدة متوازية',
    category: 'geometric',
    elements: [
      { type: 'rect', attrs: { x: 20, y: 20, width: 18, height: 60, rx: 4 }, role: 'primary' },
      { type: 'rect', attrs: { x: 46, y: 14, width: 18, height: 72, rx: 4 }, role: 'accent' },
      { type: 'rect', attrs: { x: 72, y: 28, width: 10, height: 44, rx: 4 }, role: 'primary' },
    ],
  },
  {
    id: 'arch-gate',
    nameAr: 'بوابة قوسية',
    category: 'geometric',
    elements: [
      { type: 'path', attrs: { d: 'M22 82 V46 C22 28 34 16 50 16 C66 16 78 28 78 46 V82 H62 V48 C62 39 57 32 50 32 C43 32 38 39 38 48 V82 Z' }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 62, r: 7 }, role: 'accent' },
    ],
  },

  // Tech
  {
    id: 'code-brackets',
    nameAr: 'أقواس برمجية',
    category: 'tech',
    elements: [
      { type: 'path', attrs: { d: 'M36 28 L16 50 L36 72' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M64 28 L84 50 L64 72' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M56 22 L44 78' }, role: 'accent' },
    ],
  },
  {
    id: 'circuit-node',
    nameAr: 'عقدة رقمية',
    category: 'tech',
    elements: [
      { type: 'rect', attrs: { x: 26, y: 26, width: 48, height: 48, rx: 12 }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 10 }, role: 'accent' },
      { type: 'path', attrs: { d: 'M50 12 V26 M50 74 V88 M12 50 H26 M74 50 H88' }, role: 'accent' },
    ],
  },
  {
    id: 'bolt-pulse',
    nameAr: 'نبض الطاقة',
    category: 'tech',
    elements: [
      { type: 'polygon', attrs: { points: '56,12 24,54 48,54 42,88 76,44 52,44' }, role: 'primary' },
    ],
  },
  {
    id: 'radar-signal',
    nameAr: 'إشارة بث',
    category: 'tech',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 66, r: 8 }, role: 'accent' },
      { type: 'path', attrs: { d: 'M32 50 A24 24 0 0 1 68 50' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M20 36 A40 40 0 0 1 80 36' }, role: 'primary' },
    ],
  },
  {
    id: 'terminal-cursor',
    nameAr: 'طرفية الأوامر',
    category: 'tech',
    elements: [
      { type: 'rect', attrs: { x: 16, y: 22, width: 68, height: 56, rx: 10 }, role: 'primary' },
      { type: 'path', attrs: { d: 'M30 42 L42 50 L30 58' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M48 58 H66' }, role: 'accent' },
    ],
  },
  {
    id: 'rocket-vector',
    nameAr: 'انطلاقة صاروخ',
    category: 'tech',
    elements: [
      { type: 'path', attrs: { d: 'M50 14 C64 26 68 46 64 66 L50 58 L36 66 C32 46 36 26 50 14 Z' }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 40, r: 6 }, role: 'accent' },
      { type: 'path', attrs: { d: 'M42 70 L50 86 L58 70' }, role: 'accent' },
    ],
  },

  // Creative & Creators
  {
    id: 'aperture-lens',
    nameAr: 'عدسة كاميرا',
    category: 'creative',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 34 }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 15 }, role: 'accent' },
      { type: 'path', attrs: { d: 'M50 16 L60 38 M84 50 L62 60 M50 84 L40 62 M16 50 L38 40' }, role: 'primary' },
    ],
  },
  {
    id: 'sound-wave',
    nameAr: 'موجة صوتية',
    category: 'creative',
    elements: [
      { type: 'rect', attrs: { x: 18, y: 40, width: 8, height: 20, rx: 4 }, role: 'primary' },
      { type: 'rect', attrs: { x: 32, y: 26, width: 8, height: 48, rx: 4 }, role: 'accent' },
      { type: 'rect', attrs: { x: 46, y: 16, width: 8, height: 68, rx: 4 }, role: 'primary' },
      { type: 'rect', attrs: { x: 60, y: 30, width: 8, height: 40, rx: 4 }, role: 'accent' },
      { type: 'rect', attrs: { x: 74, y: 42, width: 8, height: 16, rx: 4 }, role: 'primary' },
    ],
  },
  {
    id: 'pen-nib',
    nameAr: 'ريشة تصميم',
    category: 'creative',
    elements: [
      { type: 'path', attrs: { d: 'M50 12 L78 54 L64 82 H36 L22 54 Z' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M50 12 V46' }, role: 'accent' },
      { type: 'circle', attrs: { cx: 50, cy: 52, r: 6 }, role: 'accent' },
    ],
  },
  {
    id: 'play-prism',
    nameAr: 'زر تشغيل إبداعي',
    category: 'creative',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 34 }, role: 'primary' },
      { type: 'polygon', attrs: { points: '42,34 70,50 42,66' }, role: 'accent' },
    ],
  },
  {
    id: 'mic-studio',
    nameAr: 'ميكروفون بودكاست',
    category: 'creative',
    elements: [
      { type: 'rect', attrs: { x: 38, y: 16, width: 24, height: 40, rx: 12 }, role: 'primary' },
      { type: 'path', attrs: { d: 'M26 48 C26 62 36 72 50 72 C64 72 74 62 74 48 M50 72 V86 M36 86 H64' }, role: 'accent' },
    ],
  },
  {
    id: 'film-frame',
    nameAr: 'إطار سينمائي',
    category: 'creative',
    elements: [
      { type: 'rect', attrs: { x: 16, y: 24, width: 68, height: 52, rx: 8 }, role: 'primary' },
      { type: 'polygon', attrs: { points: '44,38 64,50 44,62' }, role: 'accent' },
    ],
  },

  // Gaming & Esports
  {
    id: 'shield-crest',
    nameAr: 'درع المنافسة',
    category: 'gaming',
    elements: [
      { type: 'path', attrs: { d: 'M50 12 L82 24 V50 C82 70 68 82 50 88 C32 82 18 70 18 50 V24 Z' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '50,28 64,50 50,70 36,50' }, role: 'accent' },
    ],
  },
  {
    id: 'wolf-fang',
    nameAr: 'أجنحة حادة',
    category: 'gaming',
    elements: [
      { type: 'polygon', attrs: { points: '14,26 46,44 38,76 18,54' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '86,26 54,44 62,76 82,54' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '50,24 58,48 50,80 42,48' }, role: 'accent' },
    ],
  },
  {
    id: 'crosshair-pro',
    nameAr: 'تصويب دقيق',
    category: 'gaming',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 28 }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 8 }, role: 'accent' },
      { type: 'path', attrs: { d: 'M50 12 V30 M50 70 V88 M12 50 H30 M70 50 H88' }, role: 'accent' },
    ],
  },
  {
    id: 'flame-spark',
    nameAr: 'شعلة التحدي',
    category: 'gaming',
    elements: [
      { type: 'path', attrs: { d: 'M52 12 C68 28 78 44 74 62 C70 78 58 86 48 86 C34 86 24 74 26 58 C28 46 38 38 42 30 C44 40 50 44 54 38 C56 30 54 20 52 12 Z' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M50 54 C56 60 58 68 54 74 C50 78 44 76 42 70 C40 64 46 58 50 54 Z' }, role: 'accent' },
    ],
  },
  {
    id: 'controller-pad',
    nameAr: 'وحدة تحكم',
    category: 'gaming',
    elements: [
      { type: 'path', attrs: { d: 'M28 36 H72 C80 36 86 44 84 56 L80 72 C78 78 72 78 68 72 L60 62 H40 L32 72 C28 78 22 78 20 72 L16 56 C14 44 20 36 28 36 Z' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M30 49 H42 M36 43 V55' }, role: 'accent' },
      { type: 'circle', attrs: { cx: 64, cy: 46, r: 3.5 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 70, cy: 53, r: 3.5 }, role: 'accent' },
    ],
  },

  // Luxury & Identity
  {
    id: 'royal-crown',
    nameAr: 'تاج ملكي',
    category: 'luxury',
    elements: [
      { type: 'polygon', attrs: { points: '16,72 22,30 38,50 50,24 62,50 78,30 84,72' }, role: 'primary' },
      { type: 'rect', attrs: { x: 18, y: 76, width: 64, height: 8, rx: 3 }, role: 'accent' },
    ],
  },
  {
    id: 'crescent-star',
    nameAr: 'هلال ونجمة',
    category: 'luxury',
    elements: [
      { type: 'path', attrs: { d: 'M58 18 C38 18 24 32 24 50 C24 68 38 82 58 82 C44 76 38 64 38 50 C38 36 44 24 58 18 Z' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '68,28 72,38 82,40 74,47 76,58 68,52 60,58 62,47 54,40 64,38' }, role: 'accent' },
    ],
  },
  {
    id: 'north-star',
    nameAr: 'نجمة الشمال',
    category: 'luxury',
    elements: [
      { type: 'path', attrs: { d: 'M50 10 L58 42 L90 50 L58 58 L50 90 L42 58 L10 50 L42 42 Z' }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 8 }, role: 'accent' },
    ],
  },
  {
    id: 'laurel-crest',
    nameAr: 'إكليل التميز',
    category: 'luxury',
    elements: [
      { type: 'path', attrs: { d: 'M34 78 C20 66 16 44 28 24 C28 38 34 48 42 56' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M66 78 C80 66 84 44 72 24 C72 38 66 48 58 56' }, role: 'primary' },
      { type: 'polygon', attrs: { points: '50,24 56,42 50,60 44,42' }, role: 'accent' },
    ],
  },
  {
    id: 'lotus-bloom',
    nameAr: 'زهرة اللوتس',
    category: 'luxury',
    elements: [
      { type: 'path', attrs: { d: 'M50 18 C60 32 62 50 50 68 C38 50 40 32 50 18 Z' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M24 36 C36 38 44 50 44 68 C30 62 22 50 24 36 Z' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M76 36 C64 38 56 50 56 68 C70 62 78 50 76 36 Z' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M30 76 H70' }, role: 'primary' },
    ],
  },
  {
    id: 'infinity-loop',
    nameAr: 'حلقة لا متناهية',
    category: 'geometric',
    elements: [
      { type: 'path', attrs: { d: 'M32 36 C20 36 14 44 14 50 C14 56 20 64 32 64 C44 64 56 36 68 36 C80 36 86 44 86 50 C86 56 80 64 68 64 C56 64 44 36 32 36 Z' }, role: 'primary' },
    ],
  },
  {
    id: 'panda-face',
    nameAr: 'باندا',
    category: 'cartoon',
    elements: [
      { type: 'circle', attrs: { cx: 26, cy: 26, r: 10 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 74, cy: 26, r: 10 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 50, cy: 54, r: 30 }, role: 'primary' },
      { type: 'circle', attrs: { cx: 38, cy: 48, r: 7 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 62, cy: 48, r: 7 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 50, cy: 62, r: 4.5 }, role: 'accent' },
    ],
  },

  // Anime
  {
    id: 'anime-shuriken',
    nameAr: 'شوريكين نينجا',
    category: 'anime',
    elements: [
      {
        type: 'path',
        attrs: {
          d: 'M50 8 L60 40 L92 50 L60 60 L50 92 L40 60 L8 50 L40 40 Z',
        },
        role: 'primary',
      },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 10 }, role: 'accent' },
    ],
  },
  {
    id: 'anime-katana',
    nameAr: 'سيوف الساموراي',
    category: 'anime',
    elements: [
      { type: 'path', attrs: { d: 'M18 82 L78 16 L84 22 L24 88 Z' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M82 82 L22 16 L16 22 L76 88 Z' }, role: 'primary' },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 10 }, role: 'accent' },
    ],
  },
  {
    id: 'anime-kitsune-mask',
    nameAr: 'قناع كيتسوني',
    category: 'anime',
    elements: [
      {
        type: 'polygon',
        attrs: { points: '22,16 36,34 64,34 78,16 84,54 50,86 16,54' },
        role: 'primary',
      },
      { type: 'polygon', attrs: { points: '28,48 42,54 32,60' }, role: 'accent' },
      { type: 'polygon', attrs: { points: '72,48 58,54 68,60' }, role: 'accent' },
      { type: 'polygon', attrs: { points: '50,38 56,46 50,54 44,46' }, role: 'accent' },
    ],
  },

  // Cartoon
  {
    id: 'cartoon-boom',
    nameAr: 'انفجار كرتوني',
    category: 'cartoon',
    elements: [
      {
        type: 'polygon',
        attrs: {
          points: '50,8 61,28 84,18 74,40 94,52 72,62 82,84 58,74 50,94 40,74 18,84 28,62 6,50 28,40 18,18 40,28',
        },
        role: 'primary',
      },
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 14 }, role: 'accent' },
    ],
  },
  {
    id: 'cartoon-alien',
    nameAr: 'فضائي كرتوني',
    category: 'cartoon',
    elements: [
      {
        type: 'path',
        attrs: {
          d: 'M50 14 C72 14 84 30 82 52 C80 72 64 86 50 86 C36 86 20 72 18 52 C16 30 28 14 50 14 Z',
        },
        role: 'primary',
      },
      { type: 'circle', attrs: { cx: 36, cy: 48, r: 9 }, role: 'accent' },
      { type: 'circle', attrs: { cx: 64, cy: 48, r: 9 }, role: 'accent' },
      { type: 'path', attrs: { d: 'M42 68 Q50 75 58 68' }, role: 'accent' },
    ],
  },

  // Celebrities & Stars
  {
    id: 'celeb-aviators',
    nameAr: 'نظارة النجوم',
    category: 'celebrities',
    elements: [
      {
        type: 'path',
        attrs: {
          d: 'M12 36 H46 L42 64 C38 72 18 72 14 58 Z',
        },
        role: 'primary',
      },
      {
        type: 'path',
        attrs: {
          d: 'M54 36 H88 L86 58 C82 72 62 72 58 64 Z',
        },
        role: 'primary',
      },
      { type: 'path', attrs: { d: 'M44 38 H56' }, role: 'accent' },
      { type: 'polygon', attrs: { points: '50,14 54,22 62,24 56,30 58,38 50,34 42,38 44,30 38,24 46,22' }, role: 'accent' },
    ],
  },
  {
    id: 'celeb-mic',
    nameAr: 'مايك المشاهير',
    category: 'celebrities',
    elements: [
      { type: 'rect', attrs: { x: 36, y: 14, width: 28, height: 42, rx: 14 }, role: 'primary' },
      { type: 'path', attrs: { d: 'M26 44 C26 60 36 68 50 68 C64 68 74 60 74 44' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M50 68 V86 M36 86 H64' }, role: 'primary' },
    ],
  },
  {
    id: 'celeb-spotlight',
    nameAr: 'نجمة السجادة الحمراء',
    category: 'celebrities',
    elements: [
      {
        type: 'polygon',
        attrs: { points: '50,12 60,36 86,38 66,54 72,80 50,66 28,80 34,54 14,38 40,36' },
        role: 'primary',
      },
      { type: 'circle', attrs: { cx: 50, cy: 48, r: 10 }, role: 'accent' },
    ],
  },

  // Sports
  {
    id: 'sports-cup',
    nameAr: 'كأس البطولة',
    category: 'sports',
    elements: [
      { type: 'path', attrs: { d: 'M30 18 H70 V42 C70 56 60 64 50 64 C40 64 30 56 30 42 Z' }, role: 'primary' },
      { type: 'path', attrs: { d: 'M30 24 H18 C16 38 22 46 30 46' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M70 24 H82 C84 38 78 46 70 46' }, role: 'accent' },
      { type: 'rect', attrs: { x: 45, y: 64, width: 10, height: 14 }, role: 'primary' },
      { type: 'rect', attrs: { x: 32, y: 78, width: 36, height: 8, rx: 3 }, role: 'accent' },
    ],
  },
  {
    id: 'sports-soccer',
    nameAr: 'كرة قدم',
    category: 'sports',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 34 }, role: 'primary' },
      { type: 'polygon', attrs: { points: '50,34 64,44 58,60 42,60 36,44' }, role: 'accent' },
    ],
  },
  {
    id: 'sports-basketball',
    nameAr: 'كرة سلة',
    category: 'sports',
    elements: [
      { type: 'circle', attrs: { cx: 50, cy: 50, r: 34 }, role: 'primary' },
      { type: 'path', attrs: { d: 'M16 50 H84 M50 16 V84' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M26 24 C40 38 40 62 26 76' }, role: 'accent' },
      { type: 'path', attrs: { d: 'M74 24 C60 38 60 62 74 76' }, role: 'accent' },
    ],
  },
  {
    id: 'sports-dumbbell',
    nameAr: 'لياقة ورياضة',
    category: 'sports',
    elements: [
      { type: 'rect', attrs: { x: 14, y: 34, width: 12, height: 32, rx: 3 }, role: 'primary' },
      { type: 'rect', attrs: { x: 26, y: 26, width: 10, height: 48, rx: 3 }, role: 'accent' },
      { type: 'rect', attrs: { x: 36, y: 45, width: 28, height: 10 }, role: 'primary' },
      { type: 'rect', attrs: { x: 64, y: 26, width: 10, height: 48, rx: 3 }, role: 'accent' },
      { type: 'rect', attrs: { x: 74, y: 34, width: 12, height: 32, rx: 3 }, role: 'primary' },
    ],
  },
];
