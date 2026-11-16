import { AppLanguage } from '../types/logo';

export interface Translations {
  brandName: string;
  pageTitle: string;
  languageLabel: string;
  appBackdropLabel: string;
  appBackdrops: {
    studio: string;
    grid: string;
    mesh: string;
    plain: string;
  };
  nav: {
    studio: string;
    builder: string;
    templates: string;
    platforms: string;
    saved: string;
    profile: string;
    settings: string;
  };
  exportBtn: string;
  entry: {
    gateTitle: string;
    profileTitle: string;
    gateSubtitle: string;
    profileSubtitle: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    genderLabel: string;
    male: string;
    female: string;
    applyToLogoLabel: string;
    errFirstName: string;
    errLastName: string;
    saveAndEnter: string;
    saveChanges: string;
    resetData: string;
    saveStatus: string;
    lastUpdated: string;
    livePreviewLabel: string;
    defaultFirst: string;
    defaultLast: string;
    readyToCustomize: string;
    enterSaved: string;
  };
  studio: {
    welcomePrefix: string;
    quickStart: string;
    viewAll: string;
    undo: string;
    redo: string;
    circularGuide: string;
    backdropLabel: string;
    backdropChecker: string;
    backdropLight: string;
    backdropDark: string;
    smartRandomize: string;
    saveToLibrary: string;
    copySvg: string;
    downloadPng: string;
  };
  inspector: {
    tabs: {
      identity: string;
      frame: string;
      colors: string;
      typography: string;
      effects: string;
    };
    titleLabel: string;
    titlePlaceholder: string;
    subtitleLabel: string;
    subtitlePlaceholder: string;
    layoutLabel: string;
    layouts: {
      'emblem-above': string;
      'emblem-only': string;
      'text-only': string;
      'emblem-backdrop': string;
      'monogram-frame': string;
    };
    emblemLibrary: string;
    graphicArtworks: string;
    graphicVectors: string;
    artworkFitLabel: string;
    artworkFitCover: string;
    artworkFitBadge: string;
    artworkOpacity: string;
    noArtworkLabel: string;
    uploadPhotoBtn: string;
    changePhotoBtn: string;
    customPhotoActive: string;
    uploadPhotoHint: string;
    customSketchActive: string;
    clearSketchBtn: string;
    artworkCats: {
      all: string;
      characters: string;
      anime: string;
      cartoon: string;
      celebrities: string;
      sports: string;
    };
    filled: string;
    outline: string;
    emblemCats: {
      all: string;
      anime: string;
      cartoon: string;
      celebrities: string;
      sports: string;
      geometric: string;
      tech: string;
      creative: string;
      gaming: string;
      luxury: string;
    };
    emblemSize: string;
    strokeWidth: string;
    backdropOpacity: string;
    maskShapeLabel: string;
    shapes: {
      circle: string;
      squircle: string;
      hexagon: string;
      square: string;
    };
    innerRingLabel: string;
    ringStyles: {
      none: string;
      solid: string;
      accent: string;
      double: string;
      dashed: string;
    };
    ringThickness: string;
    cornerBadgeLabel: string;
    badges: {
      none: string;
      dot: string;
      spark: string;
      check: string;
    };
    palettesLabel: string;
    bgFillMode: string;
    bgModes: {
      solid: string;
      linear: string;
      radial: string;
      split: string;
    };
    gradientAngle: string;
    manualColors: string;
    bgColor1: string;
    bgColor2: string;
    fgColor: string;
    accentColor: string;
    bgPatternLabel: string;
    patterns: {
      none: string;
      dots: string;
      grid: string;
      rings: string;
      diagonal: string;
    };
    patternOpacity: string;
    fontFamilyLabel: string;
    fonts: {
      Cairo: string;
      'Readex Pro': string;
      'Playfair Display': string;
      Oswald: string;
      'JetBrains Mono': string;
    };
    fontSizeLabel: string;
    fontWeightLabel: string;
    letterSpacingLabel: string;
    subtitleSizeLabel: string;
    effectsQuickLabel: string;
    effectPresets: {
      clean: string;
      softDepth: string;
      popShadow: string;
      crispGlow: string;
      studioHalo: string;
    };
    shadowSectionLabel: string;
    shadowModes: {
      none: string;
      soft: string;
      elevated: string;
      crisp: string;
    };
    shadowBlurLabel: string;
    shadowOffsetLabel: string;
    shadowOpacityLabel: string;
    shadowColorLabel: string;
    glowSectionLabel: string;
    glowModes: {
      none: string;
      foreground: string;
      halo: string;
      both: string;
    };
    glowIntensityLabel: string;
    glowColorLabel: string;
    matchAccentBtn: string;
  };
  preview: {
    title: string;
    allPlatforms: string;
    clarityTest: string;
    igProfile: string;
    lightMode: string;
    postsCount: string;
    followersCount: string;
    followingCount: string;
    ytDiscord: string;
    darkMode: string;
    channelMeta: string;
    subscribe: string;
    xHeader: string;
    xBio: string;
  };
  templates: {
    heading: string;
    subheading: string;
    searchPlaceholder: string;
    emptyTitle: string;
    emptyDesc: string;
    showAllBtn: string;
    customizeBtn: string;
    categories: {
      all: string;
      characters: string;
      anime: string;
      cartoon: string;
      celebrities: string;
      sports: string;
      business: string;
      creators: string;
      gaming: string;
      art: string;
      minimal: string;
    };
  };
  platforms: {
    heading: string;
    subheading: string;
    backToStudio: string;
    download1024: string;
    igBio: string;
    ytMeta: string;
    subscribe: string;
    discordTitlePrefix: string;
    discordMeta: string;
    linkedinSector: string;
    follow: string;
    tiktokMeta: string;
  };
  saved: {
    heading: string;
    subheading: string;
    createNew: string;
    emptyTitle: string;
    emptyDesc: string;
    openStudio: string;
    untitled: string;
    editBtn: string;
    duplicateTitle: string;
    deleteTitle: string;
  };
  builder: {
    heading: string;
    subheading: string;
    startBlankBtn: string;
    importCurrentBtn: string;
    steps: {
      identity: string;
      mark: string;
      style: string;
      finish: string;
    };
    autoInitialsBtn: string;
    markModes: {
      sketch: string;
      vector: string;
      photo: string;
    };
    sketchHint: string;
    brushPrimary: string;
    brushAccent: string;
    symmetryLabel: string;
    brushSizeLabel: string;
    undoStrokeBtn: string;
    clearSketchBtn: string;
    rotationLabel: string;
    clarityStripLabel: string;
    applyToStudioBtn: string;
    saveLogoBtn: string;
    downloadPngBtn: string;
    downloadSvgBtn: string;
    prevStepBtn: string;
    nextStepBtn: string;
  };
  exportModal: {
    title: string;
    close: string;
    defaultName: string;
    transparentHint: string;
    choosePngRes: string;
    fastHint: string;
    hdHint: string;
    ultraHint: string;
    preparing: string;
    downloadPngPrefix: string;
    downloadSvg: string;
    copySvg: string;
    copiedSvg: string;
  };
  settings: {
    heading: string;
    subheading: string;
    backToStudio: string;
    appearanceHeading: string;
    appearanceDesc: string;
    defaultStageLabel: string;
    studioHeading: string;
    studioDesc: string;
    defaultExportSizeLabel: string;
    defaultArtworkFitLabel: string;
    autoPersonalizeLabel: string;
    autoPersonalizeDesc: string;
    autoPaletteLabel: string;
    autoPaletteDesc: string;
    defaultSafeZoneLabel: string;
    defaultSafeZoneDesc: string;
    profileHeading: string;
    profileDesc: string;
    editProfileBtn: string;
    savedLogosCount: string;
    dataHeading: string;
    dataDesc: string;
    exportBackupBtn: string;
    importBackupBtn: string;
    clearSavedBtn: string;
    confirmClearBtn: string;
    cancelBtn: string;
    resetSettingsBtn: string;
  };
  toasts: {
    profileSaved: (fullName: string) => string;
    logoSaved: string;
    pngDownloaded: (size: number) => string;
    svgDownloaded: string;
    svgCopied: string;
    templateLoaded: string;
    logoLoaded: string;
    logoDuplicated: string;
    logoDeleted: string;
    backupExported: string;
    backupImported: string;
    backupInvalid: string;
    savedCleared: string;
    settingsReset: string;
    photoAdded: string;
    photoInvalid: string;
    builderApplied: string;
  };
  emblemNames: Record<string, string>;
  artworkNames: Record<string, string>;
  paletteNames: Record<string, string>;
  templateText: Record<string, { title: string; desc: string }>;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  ar: {
    brandName: 'باندا لتسكوم',
    pageTitle: 'باندا لتسكوم — استوديو لوغوهات البروفايل',
    languageLabel: 'اللغة',
    appBackdropLabel: 'خلفية التطبيق',
    appBackdrops: {
      studio: 'استوديو',
      grid: 'شبكة',
      mesh: 'تدرج',
      plain: 'صافي',
    },
    nav: {
      studio: 'استوديو التصميم',
      builder: 'صنع لوجو خاص',
      templates: 'القوالب الجاهزة',
      platforms: 'معاينة المنصات',
      saved: 'محفوظاتي',
      profile: 'بياناتي',
      settings: 'الإعدادات',
    },
    exportBtn: 'تصدير الشعار',
    entry: {
      gateTitle: 'بياناتك الشخصية للبدء',
      profileTitle: 'بياناتي الشخصية المحفوظة',
      gateSubtitle:
        'أدخل الاسم واللقب وحدد الجنس لحفظ بياناتك وتجهيز شعار بروفايل مخصص باسمك فور الدخول.',
      profileSubtitle:
        'بياناتك محفوظة محلياً على جهازك وتُستخدم لتخصيص معاينات البروفايل والشعارات.',
      firstNameLabel: 'الاسم',
      firstNamePlaceholder: 'مثال: آدم أو سارة',
      lastNameLabel: 'اللقب',
      lastNamePlaceholder: 'مثال: المنصور',
      genderLabel: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      applyToLogoLabel: 'تحديث نص وألوان الشعار الحالي بالبيانات الجديدة',
      errFirstName: 'يرجى إدخال الاسم قبل الحفظ.',
      errLastName: 'يرجى إدخال اللقب قبل الحفظ.',
      saveAndEnter: 'حفظ البيانات والدخول',
      saveChanges: 'حفظ التعديلات',
      resetData: 'مسح البيانات',
      saveStatus: 'حالة الحفظ: محفوظة محلياً',
      lastUpdated: 'آخر تحديث',
      livePreviewLabel: 'معاينة مباشرة لشعار بروفايلك',
      defaultFirst: 'الاسم',
      defaultLast: 'اللقب',
      readyToCustomize: 'جاهز للتخصيص والتصدير',
      enterSaved: 'دخول المحفوظات',
    },
    studio: {
      welcomePrefix: 'أهلاً،',
      quickStart: 'قوالب سريعة',
      viewAll: 'عرض الكل',
      undo: 'تراجع',
      redo: 'إعادة',
      circularGuide: 'دليل القص الدائري',
      backdropLabel: 'خلفية منصة العرض',
      backdropChecker: 'شفاف',
      backdropLight: 'فاتح',
      backdropDark: 'داكن',
      smartRandomize: 'توليد ذكي',
      saveToLibrary: 'حفظ في مكتبتي',
      copySvg: 'نسخ SVG',
      downloadPng: 'تنزيل PNG جاهز',
    },
    inspector: {
      tabs: {
        identity: 'الهوية',
        frame: 'الإطار',
        colors: 'الألوان',
        typography: 'الخطوط',
        effects: 'المؤثرات',
      },
      titleLabel: 'الاسم أو الحرف الرئيسي',
      titlePlaceholder: 'مثال: أُفق أو A أو NOVA',
      subtitleLabel: 'الوصف الفرعي (اختياري)',
      subtitlePlaceholder: 'مثال: STUDIO أو @HANDLE',
      layoutLabel: 'تكوين الشعار',
      layouts: {
        'emblem-above': 'رمز + نص',
        'emblem-only': 'رمز فقط',
        'text-only': 'نص فقط',
        'emblem-backdrop': 'خلفية رمز',
        'monogram-frame': 'إطار حرف',
      },
      emblemLibrary: 'مكتبة الصور والرموز',
      graphicArtworks: 'صور ورسومات',
      graphicVectors: 'رموز متجهة',
      artworkFitLabel: 'موضع الصورة',
      artworkFitCover: 'ملء الإطار',
      artworkFitBadge: 'دائرة ميدالية',
      artworkOpacity: 'وضوح الصورة',
      noArtworkLabel: 'إزالة الصورة',
      uploadPhotoBtn: 'إضافة صورة من جهازك',
      changePhotoBtn: 'تغيير الصورة',
      customPhotoActive: 'صورتك المخصصة',
      uploadPhotoHint: 'PNG أو JPG أو WebP',
      customSketchActive: 'رسمك اليدوي المخصص مفعّل',
      clearSketchBtn: 'إلغاء الرسم',
      artworkCats: {
        all: 'الكل',
        characters: 'شخصيات',
        anime: 'أنمي',
        cartoon: 'كرتون',
        celebrities: 'مشاهير',
        sports: 'رياضات',
      },
      filled: 'ممتلئ',
      outline: 'خطوط',
      emblemCats: {
        all: 'الكل',
        anime: 'أنمي',
        cartoon: 'كرتون',
        celebrities: 'مشاهير',
        sports: 'رياضات',
        geometric: 'هندسي',
        tech: 'تقني',
        creative: 'إبداعي',
        gaming: 'ألعاب',
        luxury: 'فخامة',
      },
      emblemSize: 'حجم الرمز',
      strokeWidth: 'سماكة الخط',
      backdropOpacity: 'شفافية الرمز الخلفي',
      maskShapeLabel: 'قصة الإطار (الشكل الخارجي)',
      shapes: {
        circle: 'دائري',
        squircle: 'مربع ناعم',
        hexagon: 'سداسي',
        square: 'مربع حاد',
      },
      innerRingLabel: 'الإطار الداخلي (الحلقة)',
      ringStyles: {
        none: 'بدون',
        solid: 'متصل',
        accent: 'مميز',
        double: 'مزدوج',
        dashed: 'متقطع',
      },
      ringThickness: 'سماكة الإطار',
      cornerBadgeLabel: 'علامة زاوية صغيرة',
      badges: {
        none: 'بدون',
        dot: 'نقطة',
        spark: 'نجمة',
        check: 'صح',
      },
      palettesLabel: 'لوحات ألوان متناسقة',
      bgFillMode: 'نوع تعبئة الخلفية',
      bgModes: {
        solid: 'لون واحد',
        linear: 'تدرج',
        radial: 'إشعاع',
        split: 'مقسوم',
      },
      gradientAngle: 'زاوية التدرج',
      manualColors: 'تخصيص الألوان يدوياً',
      bgColor1: 'الخلفية 1',
      bgColor2: 'الخلفية 2',
      fgColor: 'النص والرمز',
      accentColor: 'اللون المميز',
      bgPatternLabel: 'نقش الخلفية',
      patterns: {
        none: 'صافي',
        dots: 'نقاط',
        grid: 'شبكة',
        rings: 'حلقات',
        diagonal: 'خطوط مائلة',
      },
      patternOpacity: 'وضوح النقش',
      fontFamilyLabel: 'عائلة الخط',
      fonts: {
        Cairo: 'Cairo — عصري واضح',
        'Readex Pro': 'Readex Pro — هندسي ناعم',
        'Playfair Display': 'Playfair — كلاسيكي فاخر',
        Oswald: 'Oswald — رياضي جريء',
        'JetBrains Mono': 'JetBrains — تقني رقمي',
      },
      fontSizeLabel: 'حجم العنوان الرئيسي',
      fontWeightLabel: 'سماكة الخط',
      letterSpacingLabel: 'تباعد الحروف (للاتينية)',
      subtitleSizeLabel: 'حجم الوصف الفرعي',
      effectsQuickLabel: 'تأثيرات احترافية سريعة',
      effectPresets: {
        clean: 'نظيف',
        softDepth: 'عمق ناعم',
        popShadow: 'ظل بارز',
        crispGlow: 'بريق ساطع',
        studioHalo: 'هالة استوديو',
      },
      shadowSectionLabel: 'الظلال والعمق (Drop Shadow)',
      shadowModes: {
        none: 'بدون',
        soft: 'ناعم',
        elevated: 'عميق',
        crisp: 'حاد',
      },
      shadowBlurLabel: 'نعومة الظل (Blur)',
      shadowOffsetLabel: 'إزاحة الظل',
      shadowOpacityLabel: 'كثافة الظل',
      shadowColorLabel: 'لون الظل',
      glowSectionLabel: 'تأثير البريق والتوهج (Glow)',
      glowModes: {
        none: 'بدون',
        foreground: 'توهج الشعار',
        halo: 'هالة خلفية',
        both: 'مزدوج',
      },
      glowIntensityLabel: 'شدة البريق',
      glowColorLabel: 'لون البريق',
      matchAccentBtn: 'مطابقة اللون المميز',
    },
    preview: {
      title: 'معاينة البروفايل المباشرة',
      allPlatforms: 'كل المنصات',
      clarityTest: 'اختبار الوضوح بالأحجام الصغيرة',
      igProfile: 'بروفايل إنستغرام',
      lightMode: 'الوضع الفاتح',
      postsCount: '128 منشور',
      followersCount: '24.8K متابع',
      followingCount: '310 يتابع',
      ytDiscord: 'يوتيوب وديسكورد',
      darkMode: 'الوضع الداكن',
      channelMeta: 'قناة إبداعية · 142K مشترك',
      subscribe: 'اشتراك',
      xHeader: 'رأس حساب منصة X',
      xBio: 'هوية بصرية جاهزة للنشر الرقمي',
    },
    templates: {
      heading: 'قوالب شعارات البروفايل الجاهزة',
      subheading:
        'اختر نقطة بداية مصممة بعناية لحسابك الشخصي أو مشروعك، ثم عدّل الاسم والألوان والرمز مباشرة داخل الاستوديو.',
      searchPlaceholder: 'ابحث عن قالب...',
      emptyTitle: 'لم نعثر على قوالب مطابقة',
      emptyDesc: 'جرّب كلمة بحث أخرى أو اختر تصنيف جميع القوالب.',
      showAllBtn: 'عرض جميع القوالب',
      customizeBtn: 'تخصيص هذا القالب',
      categories: {
        all: 'جميع القوالب',
        characters: 'شخصيات',
        anime: 'أنمي',
        cartoon: 'كرتون',
        celebrities: 'مشاهير ونجوم',
        sports: 'رياضات',
        business: 'أعمال وتقنية',
        creators: 'صناع محتوى',
        gaming: 'ألعاب',
        art: 'فنون وتصوير',
        minimal: 'شخصي وبسيط',
      },
    },
    platforms: {
      heading: 'معاينة الشعار على منصات التواصل',
      subheading:
        'تحقق من وضوح وتوازن شعارك قبل اعتماده كصورة بروفايل رسمية عبر المنصات الشهيرة.',
      backToStudio: 'العودة للتعديل',
      download1024: 'تنزيل 1024×1024 PNG',
      igBio: 'حساب رسمي · محتوى بصري وإبداعي',
      ytMeta: '215K مشترك',
      subscribe: 'اشتراك',
      discordTitlePrefix: 'سيرفر',
      discordMeta: '1,420 متصل الآن · 8,900 عضو',
      linkedinSector: 'التصميم والمنتجات الرقمية',
      follow: 'متابعة +',
      tiktokMeta: '1.2M إعجاب · 98K متابع',
    },
    saved: {
      heading: 'مكتبة شعاراتي المحفوظة',
      subheading: 'تُحفظ تصاميمك محلياً على جهازك لتتمكن من الرجوع إليها وتعديلها في أي وقت.',
      createNew: 'تصميم شعار جديد',
      emptyTitle: 'لا توجد شعارات محفوظة بعد',
      emptyDesc:
        'صمم شعار البروفايل الخاص بك في الاستوديو واضغط على «حفظ في مكتبتي» للاحتفاظ بنسخة قابلة للتعديل لاحقاً.',
      openStudio: 'فتح استوديو التصميم',
      untitled: 'شعار بدون عنوان',
      editBtn: 'تعديل',
      duplicateTitle: 'تكرار',
      deleteTitle: 'حذف',
    },
    builder: {
      heading: 'صانع اللوجو الخاص بك',
      subheading:
        'صمّم شعارك الفريد خطوة بخطوة من الصفر: ارسم رمزك الخاص باليد أو اختر رمزاً وقم بتدويره وتنسيق الألوان والإطار ثم صدّره فوراً.',
      startBlankBtn: 'بدء من الصفر',
      importCurrentBtn: 'استيراد من الاستوديو',
      steps: {
        identity: '١. الاسم والخط',
        mark: '٢. الرسم والرمز',
        style: '٣. الألوان والإطار',
        finish: '٤. اللمسات والتصدير',
      },
      autoInitialsBtn: 'توليد أحرف اسمك',
      markModes: {
        sketch: 'رسم حر باليد',
        vector: 'رموز وتدوير',
        photo: 'صورة مخصصة',
      },
      sketchHint: 'ارسم هنا لإنشاء شعار فيكتور خاص بك — يدعم التماثل التلقائي للجهتين',
      brushPrimary: 'لون أساسي',
      brushAccent: 'لون مميز',
      symmetryLabel: 'تماثل تلقائي',
      brushSizeLabel: 'سُمك الخط',
      undoStrokeBtn: 'تراجع خطوة',
      clearSketchBtn: 'مسح الرسم',
      rotationLabel: 'زاوية تدوير الرمز',
      clarityStripLabel: 'اختبار الوضوح بأحجام البروفايل',
      applyToStudioBtn: 'متابعة التعديل في الاستوديو',
      saveLogoBtn: 'حفظ في مكتبتي',
      downloadPngBtn: 'تنزيل PNG',
      downloadSvgBtn: 'تنزيل SVG',
      prevStepBtn: 'السابق',
      nextStepBtn: 'التالي',
    },
    exportModal: {
      title: 'تصدير شعار البروفايل',
      close: 'إغلاق',
      defaultName: 'شعار البروفايل',
      transparentHint: 'خلفية شفافة خارج الإطار · جاهز لجميع منصات التواصل',
      choosePngRes: 'اختر دقة صورة PNG',
      fastHint: 'سريع للبروفايل',
      hdHint: 'قياسي عالي الدقة',
      ultraHint: 'فائق الدقة والطباعة',
      preparing: 'جاري التجهيز...',
      downloadPngPrefix: 'تنزيل PNG بدقة',
      downloadSvg: 'تنزيل ملف SVG',
      copySvg: 'نسخ كود SVG',
      copiedSvg: 'تم نسخ الكود',
    },
    settings: {
      heading: 'إعدادات التطبيق والاستوديو',
      subheading: 'خصّص لغة الواجهة، خلفية التطبيق، دقة التصدير الافتراضية، ونسخك الاحتياطية.',
      backToStudio: 'العودة إلى الاستوديو',
      appearanceHeading: 'اللغة والمظهر العام',
      appearanceDesc: 'تحديث لغة التطبيق واتجاه القراءة وخلفية مساحة العمل الافتراضية.',
      defaultStageLabel: 'خلفية منصة المعاينة الافتراضية',
      studioHeading: 'تفضيلات التصميم والتصدير',
      studioDesc: 'تُطبَّق هذه الإعدادات تلقائياً عند التنزيل أو اختيار الصور والقوالب.',
      defaultExportSizeLabel: 'دقة تصدير PNG الافتراضية',
      defaultArtworkFitLabel: 'تأطير الصور الافتراضي',
      autoPersonalizeLabel: 'تطبيق اسمك تلقائياً على القوالب',
      autoPersonalizeDesc: 'استبدال اسم القالب تلقائياً باسمك المسجل عند اختيار قالب جديد.',
      autoPaletteLabel: 'مزامنة ألوان الشعار مع الصورة',
      autoPaletteDesc: 'ضبط ألوان الإطار والتدرج تلقائياً لتناسب الصورة المختارة.',
      defaultSafeZoneLabel: 'إظهار الدليل الدائري افتراضياً',
      defaultSafeZoneDesc: 'عرض حدود القص الدائرية للمنصات الاجتماعية في لوحة الرسم.',
      profileHeading: 'البيانات الشخصية',
      profileDesc: 'الاسم واللقب والجنس المستخدمة لتخصيص الشعارات.',
      editProfileBtn: 'تعديل الملف الشخصي',
      savedLogosCount: 'الشعارات المحفوظة',
      dataHeading: 'النسخ الاحتياطي وإدارة البيانات',
      dataDesc: 'احفظ نسخة احتياطية من شعاراتك وإعداداتك في ملف JSON أو استعدها في أي وقت.',
      exportBackupBtn: 'تصدير نسخة احتياطية',
      importBackupBtn: 'استيراد نسخة',
      clearSavedBtn: 'مسح جميع المحفوظات',
      confirmClearBtn: 'تأكيد المسح النهائي',
      cancelBtn: 'إلغاء',
      resetSettingsBtn: 'إعادة الإعدادات للافتراضي',
    },
    toasts: {
      profileSaved: (fullName) => `تم حفظ بيانات ${fullName} بنجاح`,
      logoSaved: 'تم حفظ الشعار في مكتبتك',
      pngDownloaded: (size) => `تم تنزيل الشعار بدقة ${size}×${size} PNG`,
      svgDownloaded: 'تم تنزيل ملف المتجهات SVG',
      svgCopied: 'تم نسخ كود SVG إلى الحافظة',
      templateLoaded: 'تم تحميل القالب باسمك في الاستوديو',
      logoLoaded: 'تم فتح الشعار للتعديل',
      logoDuplicated: 'تم نسخ الشعار',
      logoDeleted: 'تم حذف الشعار من المكتبة',
      backupExported: 'تم تنزيل ملف النسخة الاحتياطية بنجاح',
      backupImported: 'تم استيراد النسخة الاحتياطية بنجاح',
      backupInvalid: 'تعذّر قراءة ملف النسخة الاحتياطية',
      savedCleared: 'تم مسح جميع الشعارات المحفوظة',
      settingsReset: 'تمت استعادة الإعدادات الافتراضية',
      photoAdded: 'تمت إضافة صورتك إلى الشعار بنجاح',
      photoInvalid: 'تعذر قراءة الصورة، اختر ملف صورة صالح',
      builderApplied: 'تم اعتماد شعارك الخاص في الاستوديو',
    },
    emblemNames: {
      'prism-core': 'منشور هندسي',
      'orbit-rings': 'مدار ثلاثي',
      'hex-cube': 'مكعب سداسي',
      'diamond-cut': 'ألماسة مقطوعة',
      'twin-pillars': 'أعمدة متوازية',
      'arch-gate': 'بوابة قوسية',
      'code-brackets': 'أقواس برمجية',
      'circuit-node': 'عقدة رقمية',
      'bolt-pulse': 'نبض الطاقة',
      'radar-signal': 'إشارة بث',
      'terminal-cursor': 'طرفية الأوامر',
      'rocket-vector': 'انطلاقة صاروخ',
      'aperture-lens': 'عدسة كاميرا',
      'sound-wave': 'موجة صوتية',
      'pen-nib': 'ريشة تصميم',
      'play-prism': 'زر تشغيل إبداعي',
      'mic-studio': 'ميكروفون بودكاست',
      'film-frame': 'إطار سينمائي',
      'shield-crest': 'درع المنافسة',
      'wolf-fang': 'أجنحة حادة',
      'crosshair-pro': 'تصويب دقيق',
      'flame-spark': 'شعلة التحدي',
      'controller-pad': 'وحدة تحكم',
      'royal-crown': 'تاج ملكي',
      'crescent-star': 'هلال ونجمة',
      'north-star': 'نجمة الشمال',
      'laurel-crest': 'إكليل التميز',
      'lotus-bloom': 'زهرة اللوتس',
      'infinity-loop': 'حلقة لا متناهية',
      'panda-face': 'باندا',
      'anime-shuriken': 'شوريكين نينجا',
      'anime-katana': 'سيوف الساموراي',
      'anime-kitsune-mask': 'قناع كيتسوني',
      'cartoon-boom': 'انفجار كرتوني',
      'cartoon-alien': 'فضائي كرتوني',
      'celeb-aviators': 'نظارة النجوم',
      'celeb-mic': 'مايك المشاهير',
      'celeb-spotlight': 'نجمة السجادة الحمراء',
      'sports-cup': 'كأس البطولة',
      'sports-soccer': 'كرة قدم',
      'sports-basketball': 'كرة سلة',
      'sports-dumbbell': 'لياقة ورياضة',
    },
    artworkNames: {
      'anime-warrior': 'محارب الأنمي',
      'anime-kitsune': 'روح كيتسوني',
      'cartoon-panda': 'باندا ستار',
      'cartoon-lion': 'أسد كرتوني',
      'celeb-redcarpet': 'نجم السجادة الحمراء',
      'celeb-popicon': 'أيقونة البوب',
      'sports-football': 'بطل كرة القدم',
      'sports-basketball': 'أجنحة السلة',
      'anime-cybergirl': 'بطلة السايبر أنمي',
      'anime-dragon': 'تنين الطاقة الأنمي',
      'cartoon-monkey': 'قرد الفضاء',
      'cartoon-fox': 'ثعلب النينجا',
      'celeb-cinemaking': 'ملك السينما',
      'celeb-dj': 'أسطورة الدي جي',
      'sports-boxing': 'بطل الملاكمة',
      'sports-racing': 'خوذة التيربو',
      'sports-academy': 'أكاديمية مستقبل المناصر',
      'char-samurai': 'الساموراي السيبراني',
      'char-mage': 'الساحر الغامض',
      'char-astronaut': 'رائد الفضاء',
      'char-pirate': 'قبطان القراصنة',
      'char-knight': 'الفارس الملكي',
      'char-ninja': 'نينجا الظلال',
    },
    paletteNames: {
      'obsidian-gold': 'سبج وذهب',
      'cobalt-studio': 'كوبالت استوديو',
      'alabaster-ink': 'أبيض وحبر',
      'emerald-slate': 'زمردي داكن',
      'crimson-noir': 'قرمزي جريء',
      'warm-ivory': 'عاجي كلاسيكي',
      'cyber-teal': 'تيل تقني',
      'sunset-amber': 'عنبر دافئ',
      'royal-plum': 'بنفسجي ملكي',
      'graphite-lime': 'جرافيت وليموني',
      'ocean-mist': 'أزرق سماوي',
      'sand-terracotta': 'رملي وطيني',
    },
    templateText: {
      't-cartoon-panda': {
        title: 'باندا كرتون',
        desc: 'شخصية باندا كرتونية جريئة بألوان البنفسجي والأصفر لبروفايل عصري مميز',
      },
      't-sports-academy': {
        title: 'أكاديمية مستقبل المناصر',
        desc: 'درع نادي وأكاديمية كرة قدم باللون الأزرق الملكي والذهبي مع نسر وكرة قدم',
      },
      't-char-samurai': {
        title: 'الساموراي السيبراني',
        desc: 'شخصية محارب ساموراي مدرع بقناع متوهج باللون الأحمر والذهبي',
      },
      't-char-mage': {
        title: 'الساحر الغامض',
        desc: 'شخصية ساحر فانتازيا برداء بنفسجي ونقوش ذهبية وطاقة سحرية متوهجة',
      },
      't-char-astronaut': {
        title: 'رائد الفضاء',
        desc: 'شخصية مستكشف فضاء بخوذة لامعة تعكس أضواء المجرة والنجوم',
      },
      't-char-pirate': {
        title: 'قبطان القراصنة',
        desc: 'شخصية قبطان بحري بقبعة مزخرفة بالذهب وإضاءة فانوس دافئة',
      },
      't-char-knight': {
        title: 'الفارس الملكي',
        desc: 'شخصية فارس نبيل بدرع فضي وذهبي ووشاح أزرق ملكي',
      },
      't-char-ninja': {
        title: 'نينجا الظلال',
        desc: 'شخصية نينجا مقنّع بعيون زمردية متوهجة وضباب ليلي غامض',
      },
      't-anime-warrior': {
        title: 'محارب الأنمي',
        desc: 'رسمة أنمي بطاقة نيون زرقاء حادة مثالية لحسابات الأنمي والجيمنج',
      },
      't-anime-kitsune': {
        title: 'روح كيتسوني',
        desc: 'قناع ثعلب أنمي ياباني بتوهج قرمزي وبنفسجي لصناع المحتوى',
      },
      't-cartoon-lion': {
        title: 'أسد كرتوني',
        desc: 'شخصية أسد بسماعات موسيقية وألوان تيل وبرتقالي للبودكاست والستريم',
      },
      't-celeb-redcarpet': {
        title: 'نجم السجادة الحمراء',
        desc: 'لوغو بورتريه بأسلوب بوب آرت ذهبي لحسابات المشاهير والسينما',
      },
      't-celeb-popicon': {
        title: 'أيقونة البوب والنجومية',
        desc: 'بورتريه فني بأضواء المسرح والنيون لعشاق الغناء والترفيه والمشاهير',
      },
      't-sports-football': {
        title: 'بطل كرة القدم',
        desc: 'شعار رياضي احترافي لكرة القدم بأجنحة ذهبية ودرع متوهج',
      },
      't-sports-basketball': {
        title: 'أجنحة السلة',
        desc: 'شعار كرة سلة مشتعل بأجنحة النصر لحسابات الرياضة والبطولات',
      },
      't-anime-cybergirl': {
        title: 'بطلة السايبر أنمي',
        desc: 'شخصية أنمي مستقبلية بنظارة نيون وردية وبتلات ساكورا مضيئة',
      },
      't-anime-dragon': {
        title: 'تنين الطاقة الأنمي',
        desc: 'شعار تنين أنمي ياباني بنيران زمردية وسماوية لعشاق القوة والبطولات',
      },
      't-cartoon-monkey': {
        title: 'قرد الفضاء الكرتوني',
        desc: 'شخصية قرد رائد فضاء بألوان الأصفر والبنفسجي بطابع كرتوني مرح',
      },
      't-cartoon-fox': {
        title: 'ثعلب النينجا الكرتوني',
        desc: 'ماسكوت ثعلب نينجا رشيق بلمسات برتقالية وتيل لبروفايلات الألعاب والترفيه',
      },
      't-celeb-cinemaking': {
        title: 'ملك السينما والأضواء',
        desc: 'بورتريه بوب آرت ذهبي لنجم سينمائي بأسلوب كلاسيكي عصري مبهر',
      },
      't-celeb-dj': {
        title: 'أسطورة الدي جي والحفلات',
        desc: 'بورتريه نجم موسيقى ودي جي تحت أضواء الليزر البنفسجية والذهبية',
      },
      't-sports-boxing': {
        title: 'بطل الملاكمة والقتال',
        desc: 'درع ملاكمة ذهبي وقرمزي بصدمة طاقة قوية لعشاق الرياضات القتالية',
      },
      't-sports-racing': {
        title: 'تيربو سباقات السيارات',
        desc: 'خوذة متسابق فورمولا بخطوط سرعة نيون سماوية وذهبية لقنوات السيارات',
      },
      't-ufuq-studio': {
        title: 'أُفق استوديو',
        desc: 'شعار هندسي متوازن للعلامات التجارية والاستوديوهات الحديثة',
      },
      't-dev-bracket': {
        title: 'مطور برمجيات',
        desc: 'هوية تقنية نظيفة لحسابات المبرمجين ومشاريع التقنية',
      },
      't-podcast-wave': {
        title: 'بودكاست وصوت',
        desc: 'موجات صوتية واضحة تبرز فوراً في قوائم البودكاست ويوتيوب',
      },
      't-camera-lens': {
        title: 'عدسة مصور',
        desc: 'رمز عدسة أنيق للمصورين وصناع الأفلام على إنستغرام',
      },
      't-esports-crest': {
        title: 'فريق ألعاب',
        desc: 'درع حاد وتباين عالٍ مصمم لبروفايلات ديسكورد وتويتش',
      },
      't-monogram-luxury': {
        title: 'مونوجرام فاخر',
        desc: 'حرف أو اسم بارز بخط كلاسيكي وإطار ذهبي راقٍ',
      },
      't-royal-crown': {
        title: 'تاج الفخامة',
        desc: 'علامة شخصية فاخرة لعشاق التصميم والأزياء والعلامات الراقية',
      },
      't-minimal-arab': {
        title: 'بسيط معاصر',
        desc: 'حرف جريء بدون زوائد — مثالي للظهور الواضح في القياسات الصغيرة',
      },
      't-cyber-bolt': {
        title: 'شرارة تقنية',
        desc: 'أيقونة صاعقة حادة لقنوات البث المباشر وصناع المحتوى السريع',
      },
      't-emerald-leaf': {
        title: 'استوديو مستدام',
        desc: 'تدرج زمردي هادئ للمشاريع الناشئة ومنصات التعليم والمحتوى',
      },
      't-video-creator': {
        title: 'صانع فيديو',
        desc: 'أيقونة تشغيل متباينة تمنح قناتك على يوتيوب وتيك توك حضوراً مميزاً',
      },
      't-pen-designer': {
        title: 'مصمم جرافيك',
        desc: 'رمز ريشة التصميم الكلاسيكي داخل خلفية هندسية نظيفة',
      },
      't-emblem-pure': {
        title: 'أيقونة صافية',
        desc: 'رمز هندسي خالص بدون نص — مثالي للعلامات البصرية العالمية',
      },
      't-crescent-heritage': {
        title: 'هوية تراثية',
        desc: 'تدرج رملي دافئ مع هلال ونجمة لحسابات الثقافة والأدب',
      },
      't-rocket-launch': {
        title: 'مشروع ناشئ',
        desc: 'شعار انطلاقة سريع للشركات الناشئة ومنتجات الويب الحديثة',
      },
      't-wolf-clan': {
        title: 'كلان تنافسي',
        desc: 'أجنحة متماثلة عالية التباين لفرق الألعاب التنافسية',
      },
    },
  },

  en: {
    brandName: 'باندا لتسكوم',
    pageTitle: 'باندا لتسكوم — Profile Logo Maker',
    languageLabel: 'Language',
    appBackdropLabel: 'App Backdrop',
    appBackdrops: {
      studio: 'Studio',
      grid: 'Grid',
      mesh: 'Mesh',
      plain: 'Plain',
    },
    nav: {
      studio: 'Design Studio',
      builder: 'Custom Maker',
      templates: 'Templates',
      platforms: 'Platforms',
      saved: 'Saved',
      profile: 'My Profile',
      settings: 'Settings',
    },
    exportBtn: 'Export Logo',
    entry: {
      gateTitle: 'Your Profile Details',
      profileTitle: 'Saved Profile Details',
      gateSubtitle:
        'Enter your first name, last name, and gender to save your details and generate a personalized profile logo workspace.',
      profileSubtitle:
        'Your details are saved locally on your device and personalize your profile previews and logos.',
      firstNameLabel: 'First Name',
      firstNamePlaceholder: 'e.g. Adam or Sara',
      lastNameLabel: 'Last Name',
      lastNamePlaceholder: 'e.g. Mansour',
      genderLabel: 'Gender',
      male: 'Male',
      female: 'Female',
      applyToLogoLabel: 'Update current logo text and palette with these details',
      errFirstName: 'Please enter your first name before saving.',
      errLastName: 'Please enter your last name before saving.',
      saveAndEnter: 'Save & Enter Studio',
      saveChanges: 'Save Changes',
      resetData: 'Clear Data',
      saveStatus: 'Storage: Saved locally',
      lastUpdated: 'Last updated',
      livePreviewLabel: 'Live Preview of Your Profile Logo',
      defaultFirst: 'First',
      defaultLast: 'Last',
      readyToCustomize: 'Ready to customize & export',
      enterSaved: 'Open Saved',
    },
    studio: {
      welcomePrefix: 'Welcome,',
      quickStart: 'Quick Presets',
      viewAll: 'View All',
      undo: 'Undo',
      redo: 'Redo',
      circularGuide: 'Circular Crop Guide',
      backdropLabel: 'Canvas Stage Backdrop',
      backdropChecker: 'Transparent',
      backdropLight: 'Light',
      backdropDark: 'Dark',
      smartRandomize: 'Smart Shuffle',
      saveToLibrary: 'Save to Library',
      copySvg: 'Copy SVG',
      downloadPng: 'Download PNG',
    },
    inspector: {
      tabs: {
        identity: 'Identity',
        frame: 'Shape',
        colors: 'Colors',
        typography: 'Type',
        effects: 'Effects',
      },
      titleLabel: 'Main Name or Monogram',
      titlePlaceholder: 'e.g. NOVA or A',
      subtitleLabel: 'Subtitle (Optional)',
      subtitlePlaceholder: 'e.g. STUDIO or @HANDLE',
      layoutLabel: 'Logo Composition',
      layouts: {
        'emblem-above': 'Icon + Text',
        'emblem-only': 'Icon Only',
        'text-only': 'Text Only',
        'emblem-backdrop': 'Icon Backdrop',
        'monogram-frame': 'Monogram',
      },
      emblemLibrary: 'Artworks & Emblems',
      graphicArtworks: 'Artworks & Characters',
      graphicVectors: 'Vector Icons',
      artworkFitLabel: 'Image Framing',
      artworkFitCover: 'Full Frame',
      artworkFitBadge: 'Badge Medallion',
      artworkOpacity: 'Image Opacity',
      noArtworkLabel: 'Remove Image',
      uploadPhotoBtn: 'Upload Your Photo',
      changePhotoBtn: 'Change Photo',
      customPhotoActive: 'Your Custom Photo',
      uploadPhotoHint: 'PNG, JPG, or WebP',
      customSketchActive: 'Custom hand-drawn mark active',
      clearSketchBtn: 'Clear sketch',
      artworkCats: {
        all: 'All',
        characters: 'Characters',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Celebrities',
        sports: 'Sports',
      },
      filled: 'Filled',
      outline: 'Outline',
      emblemCats: {
        all: 'All',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Celebrities',
        sports: 'Sports',
        geometric: 'Geometric',
        tech: 'Tech',
        creative: 'Creative',
        gaming: 'Gaming',
        luxury: 'Luxury',
      },
      emblemSize: 'Emblem Scale',
      strokeWidth: 'Stroke Weight',
      backdropOpacity: 'Backdrop Opacity',
      maskShapeLabel: 'Avatar Cutout Shape',
      shapes: {
        circle: 'Circle',
        squircle: 'Squircle',
        hexagon: 'Hexagon',
        square: 'Square',
      },
      innerRingLabel: 'Inner Frame Ring',
      ringStyles: {
        none: 'None',
        solid: 'Solid',
        accent: 'Accent',
        double: 'Double',
        dashed: 'Dashed',
      },
      ringThickness: 'Ring Thickness',
      cornerBadgeLabel: 'Corner Accent Mark',
      badges: {
        none: 'None',
        dot: 'Dot',
        spark: 'Spark',
        check: 'Check',
      },
      palettesLabel: 'Curated Color Palettes',
      bgFillMode: 'Background Fill',
      bgModes: {
        solid: 'Solid',
        linear: 'Linear',
        radial: 'Radial',
        split: 'Split',
      },
      gradientAngle: 'Gradient Angle',
      manualColors: 'Custom Colors',
      bgColor1: 'Background 1',
      bgColor2: 'Background 2',
      fgColor: 'Text & Icon',
      accentColor: 'Accent',
      bgPatternLabel: 'Background Pattern',
      patterns: {
        none: 'Clean',
        dots: 'Dots',
        grid: 'Grid',
        rings: 'Rings',
        diagonal: 'Diagonal',
      },
      patternOpacity: 'Pattern Opacity',
      fontFamilyLabel: 'Font Family',
      fonts: {
        Cairo: 'Cairo — Modern Bilingual',
        'Readex Pro': 'Readex Pro — Soft Geometric',
        'Playfair Display': 'Playfair — Editorial Serif',
        Oswald: 'Oswald — Bold Condensed',
        'JetBrains Mono': 'JetBrains — Technical Mono',
      },
      fontSizeLabel: 'Title Size',
      fontWeightLabel: 'Font Weight',
      letterSpacingLabel: 'Letter Spacing',
      subtitleSizeLabel: 'Subtitle Size',
      effectsQuickLabel: 'Quick Effect Presets',
      effectPresets: {
        clean: 'Clean',
        softDepth: 'Soft Depth',
        popShadow: 'Pop Shadow',
        crispGlow: 'Crisp Glow',
        studioHalo: 'Studio Halo',
      },
      shadowSectionLabel: 'Drop Shadow',
      shadowModes: {
        none: 'None',
        soft: 'Soft',
        elevated: 'Elevated',
        crisp: 'Crisp',
      },
      shadowBlurLabel: 'Shadow Blur',
      shadowOffsetLabel: 'Vertical Offset',
      shadowOpacityLabel: 'Shadow Opacity',
      shadowColorLabel: 'Shadow Color',
      glowSectionLabel: 'Glow & Backlight',
      glowModes: {
        none: 'None',
        foreground: 'Logo Glow',
        halo: 'Halo',
        both: 'Both',
      },
      glowIntensityLabel: 'Glow Intensity',
      glowColorLabel: 'Glow Color',
      matchAccentBtn: 'Match Accent',
    },
    preview: {
      title: 'Live Profile Previews',
      allPlatforms: 'All Platforms',
      clarityTest: 'Small-Size Legibility Check',
      igProfile: 'Instagram Profile',
      lightMode: 'Light Mode',
      postsCount: '128 posts',
      followersCount: '24.8K followers',
      followingCount: '310 following',
      ytDiscord: 'YouTube & Discord',
      darkMode: 'Dark Mode',
      channelMeta: 'Creative Channel · 142K subscribers',
      subscribe: 'Subscribe',
      xHeader: 'X Profile Header',
      xBio: 'Visual identity ready for social publishing',
    },
    templates: {
      heading: 'Ready-Made Profile Logo Templates',
      subheading:
        'Pick a crafted starting point for your personal profile or brand, then customize text, colors, and emblem inside the studio.',
      searchPlaceholder: 'Search templates...',
      emptyTitle: 'No matching templates found',
      emptyDesc: 'Try another search keyword or switch back to all templates.',
      showAllBtn: 'Show All Templates',
      customizeBtn: 'Customize Template',
      categories: {
        all: 'All Templates',
        characters: 'Characters',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Celebrities',
        sports: 'Sports',
        business: 'Business & Tech',
        creators: 'Creators',
        gaming: 'Gaming',
        art: 'Art & Photo',
        minimal: 'Personal & Minimal',
      },
    },
    platforms: {
      heading: 'Social Platform Mockups',
      subheading:
        'Inspect clarity and balance before exporting your logo as an official profile picture.',
      backToStudio: 'Back to Editor',
      download1024: 'Download 1024×1024 PNG',
      igBio: 'Official Account · Visual & Creative Identity',
      ytMeta: '215K subscribers',
      subscribe: 'Subscribe',
      discordTitlePrefix: 'Server',
      discordMeta: '1,420 online · 8,900 members',
      linkedinSector: 'Design & Digital Products',
      follow: 'Follow +',
      tiktokMeta: '1.2M Likes · 98K Followers',
    },
    saved: {
      heading: 'My Saved Logos',
      subheading: 'Your designs are saved locally on your device so you can revisit and edit them anytime.',
      createNew: 'Design New Logo',
      emptyTitle: 'No saved logos yet',
      emptyDesc:
        'Design your profile logo in the studio and click "Save to Library" to keep an editable copy here.',
      openStudio: 'Open Design Studio',
      untitled: 'Untitled Logo',
      editBtn: 'Edit',
      duplicateTitle: 'Duplicate',
      deleteTitle: 'Delete',
    },
    builder: {
      heading: 'Custom Logo Maker',
      subheading:
        'Build your own original logo from scratch: sketch a symmetrical vector mark by hand, rotate emblems or upload a photo, and style every detail.',
      startBlankBtn: 'Start Blank',
      importCurrentBtn: 'Load Studio Logo',
      steps: {
        identity: '1. Name & Font',
        mark: '2. Draw & Mark',
        style: '3. Colors & Frame',
        finish: '4. Effects & Export',
      },
      autoInitialsBtn: 'Use My Initials',
      markModes: {
        sketch: 'Freehand Draw',
        vector: 'Vectors & Rotate',
        photo: 'Upload Photo',
      },
      sketchHint: 'Sketch here to craft your own crisp vector mark — mirror mode draws symmetrically',
      brushPrimary: 'Primary Color',
      brushAccent: 'Accent Color',
      symmetryLabel: 'Mirror Symmetry',
      brushSizeLabel: 'Stroke Width',
      undoStrokeBtn: 'Undo Stroke',
      clearSketchBtn: 'Clear Canvas',
      rotationLabel: 'Emblem Rotation',
      clarityStripLabel: 'Avatar Size Clarity Test',
      applyToStudioBtn: 'Open in Studio',
      saveLogoBtn: 'Save to Library',
      downloadPngBtn: 'Download PNG',
      downloadSvgBtn: 'Download SVG',
      prevStepBtn: 'Previous',
      nextStepBtn: 'Next Step',
    },
    exportModal: {
      title: 'Export Profile Logo',
      close: 'Close',
      defaultName: 'Profile Logo',
      transparentHint: 'Transparent outside cutout · Ready for all social platforms',
      choosePngRes: 'Choose PNG Resolution',
      fastHint: 'Fast Avatar',
      hdHint: 'Standard HD',
      ultraHint: 'Print & Ultra HD',
      preparing: 'Preparing...',
      downloadPngPrefix: 'Download PNG',
      downloadSvg: 'Download SVG',
      copySvg: 'Copy SVG Code',
      copiedSvg: 'Copied!',
    },
    settings: {
      heading: 'App & Studio Settings',
      subheading: 'Configure interface language, backdrop theme, default export resolution, and backups.',
      backToStudio: 'Back to Studio',
      appearanceHeading: 'Language & Appearance',
      appearanceDesc: 'Update app language, text direction, and workspace backdrop preferences.',
      defaultStageLabel: 'Default Stage Backdrop',
      studioHeading: 'Studio & Export Preferences',
      studioDesc: 'Applied automatically when downloading exports or picking artworks and templates.',
      defaultExportSizeLabel: 'Default PNG Export Resolution',
      defaultArtworkFitLabel: 'Default Image Framing',
      autoPersonalizeLabel: 'Auto-apply your name to templates',
      autoPersonalizeDesc: 'Replace template sample text with your profile name when loading a template.',
      autoPaletteLabel: 'Sync colors with selected artwork',
      autoPaletteDesc: 'Automatically match ring and accent colors to the chosen illustration.',
      defaultSafeZoneLabel: 'Show circular guide by default',
      defaultSafeZoneDesc: 'Display social avatar crop guides on the studio stage.',
      profileHeading: 'Personal Identity',
      profileDesc: 'Name and gender saved locally for personalizing logos.',
      editProfileBtn: 'Edit Profile',
      savedLogosCount: 'Saved Logos',
      dataHeading: 'Backup & Storage Management',
      dataDesc: 'Export your saved logos and preferences as JSON or restore an existing backup.',
      exportBackupBtn: 'Export Backup',
      importBackupBtn: 'Import Backup',
      clearSavedBtn: 'Clear Saved Library',
      confirmClearBtn: 'Confirm Clear',
      cancelBtn: 'Cancel',
      resetSettingsBtn: 'Reset Settings to Default',
    },
    toasts: {
      profileSaved: (fullName) => `Saved profile for ${fullName}`,
      logoSaved: 'Logo saved to your library',
      pngDownloaded: (size) => `Downloaded ${size}×${size} PNG`,
      svgDownloaded: 'Vector SVG downloaded',
      svgCopied: 'SVG code copied to clipboard',
      templateLoaded: 'Template loaded with your name',
      logoLoaded: 'Logo opened in studio',
      logoDuplicated: 'Logo duplicated',
      logoDeleted: 'Logo removed from library',
      backupExported: 'Backup file downloaded',
      backupImported: 'Backup restored successfully',
      backupInvalid: 'Could not read backup file',
      savedCleared: 'Saved library cleared',
      settingsReset: 'Settings restored to defaults',
      photoAdded: 'Your photo has been added to the logo',
      photoInvalid: 'Could not read image file, please choose a valid image',
      builderApplied: 'Your custom logo is now active in the Studio',
    },
    emblemNames: {
      'prism-core': 'Geometric Prism',
      'orbit-rings': 'Triple Orbit',
      'hex-cube': 'Hex Cube',
      'diamond-cut': 'Cut Diamond',
      'twin-pillars': 'Twin Pillars',
      'arch-gate': 'Arch Gate',
      'code-brackets': 'Code Brackets',
      'circuit-node': 'Circuit Node',
      'bolt-pulse': 'Energy Bolt',
      'radar-signal': 'Broadcast Wave',
      'terminal-cursor': 'Terminal Prompt',
      'rocket-vector': 'Rocket Launch',
      'aperture-lens': 'Camera Aperture',
      'sound-wave': 'Sound Wave',
      'pen-nib': 'Design Nib',
      'play-prism': 'Play Prism',
      'mic-studio': 'Podcast Mic',
      'film-frame': 'Cinema Frame',
      'shield-crest': 'Arena Shield',
      'wolf-fang': 'Sharp Wings',
      'crosshair-pro': 'Precision Crosshair',
      'flame-spark': 'Challenge Flame',
      'controller-pad': 'Game Controller',
      'royal-crown': 'Royal Crown',
      'crescent-star': 'Crescent & Star',
      'north-star': 'North Star',
      'laurel-crest': 'Laurel Crest',
      'lotus-bloom': 'Lotus Bloom',
      'infinity-loop': 'Infinity Loop',
      'panda-face': 'Panda',
      'anime-shuriken': 'Ninja Shuriken',
      'anime-katana': 'Samurai Blades',
      'anime-kitsune-mask': 'Kitsune Mask',
      'cartoon-boom': 'Comic Burst',
      'cartoon-alien': 'Cartoon Alien',
      'celeb-aviators': 'Star Shades',
      'celeb-mic': 'Stage Mic',
      'celeb-spotlight': 'Red Carpet Star',
      'sports-cup': 'Champion Cup',
      'sports-soccer': 'Football Crest',
      'sports-basketball': 'Basketball',
      'sports-dumbbell': 'Fitness Gym',
    },
    artworkNames: {
      'anime-warrior': 'Anime Warrior',
      'anime-kitsune': 'Kitsune Spirit',
      'cartoon-panda': 'Cool Panda',
      'cartoon-lion': 'Cartoon DJ Lion',
      'celeb-redcarpet': 'Red Carpet Star',
      'celeb-popicon': 'Pop Superstar',
      'sports-football': 'Football Crest',
      'sports-basketball': 'Winged Hoops',
      'anime-cybergirl': 'Cyber Sakura',
      'anime-dragon': 'Anime Dragon',
      'cartoon-monkey': 'Astro Monkey',
      'cartoon-fox': 'Ninja Fox',
      'celeb-cinemaking': 'Cinema King',
      'celeb-dj': 'Superstar DJ',
      'sports-boxing': 'Boxing Champ',
      'sports-racing': 'Turbo Helmet',
      'sports-academy': 'Al-Manaser Academy Crest',
      'char-samurai': 'Cyber Samurai',
      'char-mage': 'Arcane Wizard',
      'char-astronaut': 'Space Explorer',
      'char-pirate': 'Pirate Captain',
      'char-knight': 'Royal Paladin',
      'char-ninja': 'Shadow Ninja',
    },
    paletteNames: {
      'obsidian-gold': 'Obsidian Gold',
      'cobalt-studio': 'Cobalt Studio',
      'alabaster-ink': 'Alabaster Ink',
      'emerald-slate': 'Deep Emerald',
      'crimson-noir': 'Crimson Noir',
      'warm-ivory': 'Warm Ivory',
      'cyber-teal': 'Tech Teal',
      'sunset-amber': 'Sunset Amber',
      'royal-plum': 'Royal Plum',
      'graphite-lime': 'Graphite Lime',
      'ocean-mist': 'Ocean Mist',
      'sand-terracotta': 'Terracotta',
    },
    templateText: {
      't-cartoon-panda': {
        title: 'Cool Panda Mascot',
        desc: 'Bold purple & yellow cartoon panda character for standout modern profiles',
      },
      't-sports-academy': {
        title: 'Al-Manaser Academy Crest',
        desc: 'Royal navy and gold football academy shield featuring an eagle and football crest',
      },
      't-char-samurai': {
        title: 'Cyber Samurai',
        desc: 'Armored cyber samurai warrior character with glowing crimson visor and gold trim',
      },
      't-char-mage': {
        title: 'Arcane Wizard',
        desc: 'Fantasy mage character in violet rune cloak with glowing crystal staff',
      },
      't-char-astronaut': {
        title: 'Cosmos Explorer',
        desc: 'Futuristic astronaut character with golden starlight-reflective visor',
      },
      't-char-pirate': {
        title: 'Pirate Captain',
        desc: 'Bold stylized sea captain character with gold-trimmed tricorn and lantern glow',
      },
      't-char-knight': {
        title: 'Royal Paladin',
        desc: 'Noble knight character in silver & gold armor with royal blue mantle',
      },
      't-char-ninja': {
        title: 'Shadow Ninja',
        desc: 'Stealth masked ninja character with glowing emerald eyes and dark mist',
      },
      't-anime-warrior': {
        title: 'Anime Energy Hero',
        desc: 'High-contrast cyan cel-shaded anime avatar for anime & gaming creators',
      },
      't-anime-kitsune': {
        title: 'Kitsune Spirit',
        desc: 'Mystical crimson & violet anime fox mask illustration with glowing rim',
      },
      't-cartoon-lion': {
        title: 'Cartoon DJ Lion',
        desc: 'Expressive cartoon lion mascot with headphones for streams & podcasts',
      },
      't-celeb-redcarpet': {
        title: 'Red Carpet Icon',
        desc: 'Editorial gold pop-art celebrity portrait under warm stage spotlights',
      },
      't-celeb-popicon': {
        title: 'Pop Superstar',
        desc: 'Vibrant neon stage portrait built for music, entertainment & star fans',
      },
      't-sports-football': {
        title: 'Football Champions',
        desc: 'Pro-league winged football crest with blazing golden speed streaks',
      },
      't-sports-basketball': {
        title: 'Blazing Hoops',
        desc: 'Fiery basketball and eagle wings crest for clubs and sports channels',
      },
      't-anime-cybergirl': {
        title: 'Cyber Sakura Heroine',
        desc: 'Futuristic neon-visor anime portrait with glowing sakura petals',
      },
      't-anime-dragon': {
        title: 'Emerald Anime Dragon',
        desc: 'Roaring cel-shaded Japanese spirit dragon emblem with cyan flames',
      },
      't-cartoon-monkey': {
        title: 'Space Monkey Mascot',
        desc: 'Cheeky purple & yellow cartoon astronaut monkey for standout profiles',
      },
      't-cartoon-fox': {
        title: 'Cartoon Ninja Fox',
        desc: 'Agile cartoon fox mascot with teal scarf and dynamic energy sparks',
      },
      't-celeb-cinemaking': {
        title: 'Cinema Spotlight Star',
        desc: 'Editorial gold pop-art portrait of a film & music icon under spotlights',
      },
      't-celeb-dj': {
        title: 'Superstar DJ Icon',
        desc: 'Neon purple & gold stage portrait for music, DJs & nightlife creators',
      },
      't-sports-boxing': {
        title: 'Boxing Champion Crest',
        desc: 'Explosive golden boxing glove shield built for combat sports profiles',
      },
      't-sports-racing': {
        title: 'Turbo Motorsport',
        desc: 'Aerodynamic racing helmet avatar with electric cyan & gold speed lines',
      },
      't-ufuq-studio': {
        title: 'Ufuq Studio',
        desc: 'Balanced geometric emblem for modern brands and studios',
      },
      't-dev-bracket': {
        title: 'Code Developer',
        desc: 'Clean technical identity for developers and tech projects',
      },
      't-podcast-wave': {
        title: 'Podcast Wave',
        desc: 'Bold audio bars that stand out in YouTube and podcast feeds',
      },
      't-camera-lens': {
        title: 'Photo Lens',
        desc: 'Sleek aperture mark for photographers and filmmakers',
      },
      't-esports-crest': {
        title: 'Esports Team',
        desc: 'Sharp high-contrast shield tailored for Discord and Twitch',
      },
      't-monogram-luxury': {
        title: 'Luxury Monogram',
        desc: 'Refined editorial serif letter inside a classic gold frame',
      },
      't-royal-crown': {
        title: 'Royal Crown',
        desc: 'Distinguished personal mark for fashion and luxury profiles',
      },
      't-minimal-arab': {
        title: 'Bold Minimal',
        desc: 'Clean bold monogram built for clarity at small avatar sizes',
      },
      't-cyber-bolt': {
        title: 'Cyber Spark',
        desc: 'Sharp lightning mark for live streamers and fast creators',
      },
      't-emerald-leaf': {
        title: 'Growth Academy',
        desc: 'Calm emerald gradient for education and startup accounts',
      },
      't-video-creator': {
        title: 'Video Creator',
        desc: 'Crisp play prism built for YouTube and TikTok channels',
      },
      't-pen-designer': {
        title: 'Graphic Designer',
        desc: 'Classic vector pen nib on a clean geometric grid',
      },
      't-emblem-pure': {
        title: 'Pure Emblem',
        desc: 'Text-free geometric icon for universal visual recognition',
      },
      't-crescent-heritage': {
        title: 'Heritage Mark',
        desc: 'Warm sand gradient with crescent and star for culture accounts',
      },
      't-rocket-launch': {
        title: 'Startup Launch',
        desc: 'Dynamic launch emblem for modern web products and labs',
      },
      't-wolf-clan': {
        title: 'Competitive Clan',
        desc: 'Symmetric high-contrast wings for gaming squads',
      },
    },
  },

  fr: {
    brandName: 'باندا لتسكوم',
    pageTitle: 'باندا لتسكوم — Créateur de Logos de Profil',
    languageLabel: 'Langue',
    appBackdropLabel: 'Fond de l’app',
    appBackdrops: {
      studio: 'Studio',
      grid: 'Grille',
      mesh: 'Dégradé',
      plain: 'Uni',
    },
    nav: {
      studio: 'Studio',
      builder: 'Créateur Libre',
      templates: 'Modèles',
      platforms: 'Plateformes',
      saved: 'Enregistrés',
      profile: 'Mon Profil',
      settings: 'Paramètres',
    },
    exportBtn: 'Exporter',
    entry: {
      gateTitle: 'Vos informations personnelles',
      profileTitle: 'Informations enregistrées',
      gateSubtitle:
        'Entrez votre prénom, nom et genre pour enregistrer vos données et préparer un logo de profil personnalisé.',
      profileSubtitle:
        'Vos données sont enregistrées localement sur votre appareil et personnalisent vos aperçus.',
      firstNameLabel: 'Prénom',
      firstNamePlaceholder: 'ex. Adam ou Sara',
      lastNameLabel: 'Nom',
      lastNamePlaceholder: 'ex. Mansour',
      genderLabel: 'Genre',
      male: 'Homme',
      female: 'Femme',
      applyToLogoLabel: 'Mettre à jour le logo actuel avec ces informations',
      errFirstName: 'Veuillez saisir votre prénom avant d’enregistrer.',
      errLastName: 'Veuillez saisir votre nom avant d’enregistrer.',
      saveAndEnter: 'Enregistrer et entrer',
      saveChanges: 'Enregistrer',
      resetData: 'Effacer',
      saveStatus: 'Statut : Enregistré localement',
      lastUpdated: 'Dernière mise à jour',
      livePreviewLabel: 'Aperçu en direct de votre logo',
      defaultFirst: 'Prénom',
      defaultLast: 'Nom',
      readyToCustomize: 'Prêt à personnaliser et exporter',
      enterSaved: 'Accéder aux enregistrés',
    },
    studio: {
      welcomePrefix: 'Bonjour,',
      quickStart: 'Modèles rapides',
      viewAll: 'Tout voir',
      undo: 'Annuler',
      redo: 'Rétablir',
      circularGuide: 'Guide circulaire',
      backdropLabel: 'Arrière-plan de scène',
      backdropChecker: 'Transparent',
      backdropLight: 'Clair',
      backdropDark: 'Sombre',
      smartRandomize: 'Aléatoire',
      saveToLibrary: 'Enregistrer',
      copySvg: 'Copier SVG',
      downloadPng: 'Télécharger PNG',
    },
    inspector: {
      tabs: {
        identity: 'Identité',
        frame: 'Forme',
        colors: 'Couleurs',
        typography: 'Texte',
        effects: 'Effets',
      },
      titleLabel: 'Nom ou Monogramme',
      titlePlaceholder: 'ex. NOVA ou A',
      subtitleLabel: 'Sous-titre (Optionnel)',
      subtitlePlaceholder: 'ex. STUDIO ou @HANDLE',
      layoutLabel: 'Composition',
      layouts: {
        'emblem-above': 'Icône + Texte',
        'emblem-only': 'Icône seule',
        'text-only': 'Texte seul',
        'emblem-backdrop': 'Fond icône',
        'monogram-frame': 'Monogramme',
      },
      emblemLibrary: 'Images & Icônes',
      graphicArtworks: 'Illustrations',
      graphicVectors: 'Icônes vectorielles',
      artworkFitLabel: 'Cadrage image',
      artworkFitCover: 'Plein cadre',
      artworkFitBadge: 'Médaillon',
      artworkOpacity: 'Opacité image',
      noArtworkLabel: 'Retirer l’image',
      uploadPhotoBtn: 'Importer une photo',
      changePhotoBtn: 'Changer',
      customPhotoActive: 'Votre photo personnalisée',
      uploadPhotoHint: 'PNG, JPG ou WebP',
      customSketchActive: 'Dessin vectoriel personnalisé actif',
      clearSketchBtn: 'Effacer',
      artworkCats: {
        all: 'Tout',
        characters: 'Personnages',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Célébrités',
        sports: 'Sports',
      },
      filled: 'Plein',
      outline: 'Contour',
      emblemCats: {
        all: 'Tout',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Célébrités',
        sports: 'Sports',
        geometric: 'Géométrique',
        tech: 'Tech',
        creative: 'Créatif',
        gaming: 'Gaming',
        luxury: 'Luxe',
      },
      emblemSize: 'Taille du symbole',
      strokeWidth: 'Épaisseur du trait',
      backdropOpacity: 'Opacité du fond',
      maskShapeLabel: 'Découpe de l’avatar',
      shapes: {
        circle: 'Cercle',
        squircle: 'Carré doux',
        hexagon: 'Hexagone',
        square: 'Carré',
      },
      innerRingLabel: 'Anneau intérieur',
      ringStyles: {
        none: 'Aucun',
        solid: 'Continu',
        accent: 'Accent',
        double: 'Double',
        dashed: 'Pointillé',
      },
      ringThickness: 'Épaisseur de l’anneau',
      cornerBadgeLabel: 'Badge d’angle',
      badges: {
        none: 'Aucun',
        dot: 'Point',
        spark: 'Étoile',
        check: 'Validé',
      },
      palettesLabel: 'Palettes harmonieuses',
      bgFillMode: 'Remplissage du fond',
      bgModes: {
        solid: 'Uni',
        linear: 'Linéaire',
        radial: 'Radial',
        split: 'Divisé',
      },
      gradientAngle: 'Angle du dégradé',
      manualColors: 'Couleurs manuelles',
      bgColor1: 'Fond 1',
      bgColor2: 'Fond 2',
      fgColor: 'Texte & Icône',
      accentColor: 'Accent',
      bgPatternLabel: 'Motif de fond',
      patterns: {
        none: 'Aucun',
        dots: 'Points',
        grid: 'Grille',
        rings: 'Cercles',
        diagonal: 'Diagonales',
      },
      patternOpacity: 'Opacité du motif',
      fontFamilyLabel: 'Police',
      fonts: {
        Cairo: 'Cairo — Moderne Bilingue',
        'Readex Pro': 'Readex Pro — Géométrique Doux',
        'Playfair Display': 'Playfair — Classique Luxe',
        Oswald: 'Oswald — Sportif Audacieux',
        'JetBrains Mono': 'JetBrains — Tech Mono',
      },
      fontSizeLabel: 'Taille du titre',
      fontWeightLabel: 'Graisse',
      letterSpacingLabel: 'Espacement',
      subtitleSizeLabel: 'Taille du sous-titre',
      effectsQuickLabel: 'Préréglages rapides',
      effectPresets: {
        clean: 'Épuré',
        softDepth: 'Ombre douce',
        popShadow: 'Ombre nette',
        crispGlow: 'Lueur vive',
        studioHalo: 'Halo studio',
      },
      shadowSectionLabel: 'Ombre portée (Drop Shadow)',
      shadowModes: {
        none: 'Aucune',
        soft: 'Douce',
        elevated: 'Profonde',
        crisp: 'Nette',
      },
      shadowBlurLabel: 'Flou de l’ombre',
      shadowOffsetLabel: 'Décalage vertical',
      shadowOpacityLabel: 'Opacité de l’ombre',
      shadowColorLabel: 'Couleur d’ombre',
      glowSectionLabel: 'Lueur et Halo (Glow)',
      glowModes: {
        none: 'Aucun',
        foreground: 'Lueur logo',
        halo: 'Halo fond',
        both: 'Les deux',
      },
      glowIntensityLabel: 'Intensité de lueur',
      glowColorLabel: 'Couleur de lueur',
      matchAccentBtn: 'Couleur d’accent',
    },
    preview: {
      title: 'Aperçu Profil en Direct',
      allPlatforms: 'Toutes les plateformes',
      clarityTest: 'Test de lisibilité miniature',
      igProfile: 'Profil Instagram',
      lightMode: 'Mode clair',
      postsCount: '128 publications',
      followersCount: '24,8K abonnés',
      followingCount: '310 suivis',
      ytDiscord: 'YouTube & Discord',
      darkMode: 'Mode sombre',
      channelMeta: 'Chaîne créative · 142K abonnés',
      subscribe: 'S’abonner',
      xHeader: 'En-tête X',
      xBio: 'Identité visuelle prête à publier',
    },
    templates: {
      heading: 'Modèles de logos prêts à l’emploi',
      subheading:
        'Choisissez un point de départ soigné puis personnalisez le texte, les couleurs et le symbole dans le studio.',
      searchPlaceholder: 'Rechercher un modèle...',
      emptyTitle: 'Aucun modèle trouvé',
      emptyDesc: 'Essayez un autre mot-clé ou affichez tous les modèles.',
      showAllBtn: 'Afficher tout',
      customizeBtn: 'Personnaliser',
      categories: {
        all: 'Tous',
        characters: 'Personnages',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Célébrités',
        sports: 'Sports',
        business: 'Business & Tech',
        creators: 'Créateurs',
        gaming: 'Gaming',
        art: 'Art & Photo',
        minimal: 'Minimal',
      },
    },
    platforms: {
      heading: 'Aperçu sur les réseaux sociaux',
      subheading:
        'Vérifiez la netteté et l’équilibre de votre logo avant de le publier comme photo de profil.',
      backToStudio: 'Retour au studio',
      download1024: 'Télécharger PNG 1024×1024',
      igBio: 'Compte officiel · Identité visuelle & créative',
      ytMeta: '215K abonnés',
      subscribe: 'S’abonner',
      discordTitlePrefix: 'Serveur',
      discordMeta: '1 420 en ligne · 8 900 membres',
      linkedinSector: 'Design & Produits Numériques',
      follow: 'Suivre +',
      tiktokMeta: '1,2M J’aime · 98K Abonnés',
    },
    saved: {
      heading: 'Mes logos enregistrés',
      subheading: 'Vos créations sont sauvegardées localement pour être modifiées à tout moment.',
      createNew: 'Nouveau logo',
      emptyTitle: 'Aucun logo enregistré',
      emptyDesc:
        'Créez votre logo dans le studio et cliquez sur « Enregistrer » pour conserver une copie modifiable.',
      openStudio: 'Ouvrir le studio',
      untitled: 'Logo sans titre',
      editBtn: 'Modifier',
      duplicateTitle: 'Dupliquer',
      deleteTitle: 'Supprimer',
    },
    builder: {
      heading: 'Créateur de Logo Sur Mesure',
      subheading:
        'Créez votre propre logo de zéro : dessinez votre symbole à main levée avec symétrie, pivotez des icônes ou importez une photo.',
      startBlankBtn: 'Nouveau logo vierge',
      importCurrentBtn: 'Importer du Studio',
      steps: {
        identity: '1. Nom & Police',
        mark: '2. Dessin & Symbole',
        style: '3. Couleurs & Cadre',
        finish: '4. Effets & Export',
      },
      autoInitialsBtn: 'Mes initiales',
      markModes: {
        sketch: 'Dessin libre',
        vector: 'Vecteurs & Rotation',
        photo: 'Photo perso',
      },
      sketchHint: 'Dessinez ici pour créer votre symbole vectoriel — activez la symétrie miroir',
      brushPrimary: 'Couleur principale',
      brushAccent: 'Couleur accent',
      symmetryLabel: 'Symétrie miroir',
      brushSizeLabel: 'Épaisseur',
      undoStrokeBtn: 'Annuler trait',
      clearSketchBtn: 'Tout effacer',
      rotationLabel: 'Rotation du symbole',
      clarityStripLabel: 'Test de lisibilité par taille',
      applyToStudioBtn: 'Ouvrir dans le Studio',
      saveLogoBtn: 'Enregistrer',
      downloadPngBtn: 'Télécharger PNG',
      downloadSvgBtn: 'Télécharger SVG',
      prevStepBtn: 'Précédent',
      nextStepBtn: 'Suivant',
    },
    exportModal: {
      title: 'Exporter le logo',
      close: 'Fermer',
      defaultName: 'Logo de profil',
      transparentHint: 'Fond transparent hors cadre · Prêt pour tous les réseaux',
      choosePngRes: 'Choisir la résolution PNG',
      fastHint: 'Avatar rapide',
      hdHint: 'HD Standard',
      ultraHint: 'Ultra HD & Print',
      preparing: 'Préparation...',
      downloadPngPrefix: 'Télécharger PNG',
      downloadSvg: 'Télécharger SVG',
      copySvg: 'Copier le code SVG',
      copiedSvg: 'Copié !',
    },
    settings: {
      heading: 'Paramètres de l’application',
      subheading: 'Gérez la langue, le fond, la résolution d’exportation par défaut et vos sauvegardes.',
      backToStudio: 'Retour au studio',
      appearanceHeading: 'Langue & Apparence',
      appearanceDesc: 'Modifiez la langue, le sens de lecture et le fond de l’espace de travail.',
      defaultStageLabel: 'Fond de scène par défaut',
      studioHeading: 'Préférences Studio & Export',
      studioDesc: 'Appliquées automatiquement lors des exports ou du choix des illustrations.',
      defaultExportSizeLabel: 'Résolution PNG par défaut',
      defaultArtworkFitLabel: 'Cadrage d’image par défaut',
      autoPersonalizeLabel: 'Appliquer votre nom aux modèles',
      autoPersonalizeDesc: 'Remplacer le titre du modèle par votre nom de profil automatiquement.',
      autoPaletteLabel: 'Synchroniser les couleurs avec l’image',
      autoPaletteDesc: 'Adapter la couleur d’accentuation à l’illustration choisie.',
      defaultSafeZoneLabel: 'Afficher le guide circulaire par défaut',
      defaultSafeZoneDesc: 'Afficher les repères de recadrage social sur la scène.',
      profileHeading: 'Identité personnelle',
      profileDesc: 'Nom, prénom et genre utilisés pour personnaliser vos logos.',
      editProfileBtn: 'Modifier le profil',
      savedLogosCount: 'Logos enregistrés',
      dataHeading: 'Sauvegarde & Données',
      dataDesc: 'Exportez vos logos et préférences en JSON ou importez une sauvegarde.',
      exportBackupBtn: 'Exporter sauvegarde',
      importBackupBtn: 'Importer',
      clearSavedBtn: 'Vider la bibliothèque',
      confirmClearBtn: 'Confirmer',
      cancelBtn: 'Annuler',
      resetSettingsBtn: 'Réinitialiser les paramètres',
    },
    toasts: {
      profileSaved: (fullName) => `Profil enregistré pour ${fullName}`,
      logoSaved: 'Logo enregistré dans votre bibliothèque',
      pngDownloaded: (size) => `PNG ${size}×${size} téléchargé`,
      svgDownloaded: 'Fichier SVG téléchargé',
      svgCopied: 'Code SVG copié',
      templateLoaded: 'Modèle chargé avec votre nom',
      logoLoaded: 'Logo ouvert dans le studio',
      logoDuplicated: 'Logo dupliqué',
      logoDeleted: 'Logo supprimé',
      backupExported: 'Sauvegarde JSON téléchargée',
      backupImported: 'Sauvegarde restaurée avec succès',
      backupInvalid: 'Fichier de sauvegarde invalide',
      savedCleared: 'Bibliothèque vidée',
      settingsReset: 'Paramètres réinitialisés',
      photoAdded: 'Votre photo a été ajoutée au logo',
      photoInvalid: 'Impossible de charger cette image',
      builderApplied: 'Votre logo personnalisé a été chargé dans le Studio',
    },
    emblemNames: {
      'prism-core': 'Prisme géométrique',
      'orbit-rings': 'Orbite triple',
      'hex-cube': 'Cube hexagonal',
      'diamond-cut': 'Diamant taillé',
      'twin-pillars': 'Piliers jumeaux',
      'arch-gate': 'Arche',
      'code-brackets': 'Crochets de code',
      'circuit-node': 'Nœud circuit',
      'bolt-pulse': 'Éclair d’énergie',
      'radar-signal': 'Onde radio',
      'terminal-cursor': 'Terminal',
      'rocket-vector': 'Fusée',
      'aperture-lens': 'Objectif photo',
      'sound-wave': 'Onde sonore',
      'pen-nib': 'Plume design',
      'play-prism': 'Bouton lecture',
      'mic-studio': 'Micro podcast',
      'film-frame': 'Cadre cinéma',
      'shield-crest': 'Bouclier arène',
      'wolf-fang': 'Ailes acérées',
      'crosshair-pro': 'Viseur précis',
      'flame-spark': 'Flamme',
      'controller-pad': 'Manette',
      'royal-crown': 'Couronne royale',
      'crescent-star': 'Croissant & Étoile',
      'north-star': 'Étoile du Nord',
      'laurel-crest': 'Couronne de laurier',
      'lotus-bloom': 'Fleur de lotus',
      'infinity-loop': 'Boucle infinie',
      'panda-face': 'Panda',
      'anime-shuriken': 'Shuriken Ninja',
      'anime-katana': 'Lames Samouraï',
      'anime-kitsune-mask': 'Masque Kitsune',
      'cartoon-boom': 'Éclat Cartoon',
      'cartoon-alien': 'Alien Cartoon',
      'celeb-aviators': 'Lunettes Star',
      'celeb-mic': 'Micro Scène',
      'celeb-spotlight': 'Étoile VIP',
      'sports-cup': 'Trophée',
      'sports-soccer': 'Football',
      'sports-basketball': 'Basketball',
      'sports-dumbbell': 'Fitness',
    },
    artworkNames: {
      'anime-warrior': 'Héros Anime',
      'anime-kitsune': 'Esprit Kitsune',
      'cartoon-panda': 'Panda Cool',
      'cartoon-lion': 'Lion DJ Cartoon',
      'celeb-redcarpet': 'Star Tapis Rouge',
      'celeb-popicon': 'Icône Pop',
      'sports-football': 'Club Football',
      'sports-basketball': 'Basket Ailé',
      'anime-cybergirl': 'Héroïne Cyber',
      'anime-dragon': 'Dragon Anime',
      'cartoon-monkey': 'Singe Spatial',
      'cartoon-fox': 'Renard Ninja',
      'celeb-cinemaking': 'Roi du Cinéma',
      'celeb-dj': 'Superstar DJ',
      'sports-boxing': 'Boxe Champion',
      'sports-racing': 'Casque Turbo',
      'sports-academy': 'Académie Al-Manaser',
      'char-samurai': 'Samouraï Cyber',
      'char-mage': 'Mage Arcane',
      'char-astronaut': 'Astronaute Cosmos',
      'char-pirate': 'Capitaine Pirate',
      'char-knight': 'Paladin Royal',
      'char-ninja': 'Ninja de l’Ombre',
    },
    paletteNames: {
      'obsidian-gold': 'Obsidienne & Or',
      'cobalt-studio': 'Studio Cobalt',
      'alabaster-ink': 'Albâtre & Encre',
      'emerald-slate': 'Émeraude Sombre',
      'crimson-noir': 'Cramoisi Noir',
      'warm-ivory': 'Ivoire Classique',
      'cyber-teal': 'Turquoise Tech',
      'sunset-amber': 'Ambre Solaire',
      'royal-plum': 'Prune Royale',
      'graphite-lime': 'Graphite Citron',
      'ocean-mist': 'Brume Océan',
      'sand-terracotta': 'Terre Cuite',
    },
    templateText: {
      't-cartoon-panda': {
        title: 'Mascotte Panda Cool',
        desc: 'Personnage panda cartoon violet et jaune pour un profil moderne affirmé',
      },
      't-sports-academy': {
        title: 'Académie Al-Manaser',
        desc: 'Blason d’académie de football bleu roi et or avec aigle et ballon officiel',
      },
      't-char-samurai': {
        title: 'Samouraï Cyber',
        desc: 'Personnage guerrier samouraï en armure sombre et visière pourpre lumineuse',
      },
      't-char-mage': {
        title: 'Mage Arcane',
        desc: 'Sorcier fantastique en cape violette runique avec bâton cristallin brillant',
      },
      't-char-astronaut': {
        title: 'Explorateur Cosmos',
        desc: 'Personnage astronaute futuriste à visière dorée reflétant la galaxie',
      },
      't-char-pirate': {
        title: 'Capitaine Pirate',
        desc: 'Capitaine pirate charismatique à tricorne doré sous lueur de lanterne',
      },
      't-char-knight': {
        title: 'Paladin Royal',
        desc: 'Chevalier noble en armure argent et or avec cape bleu roi',
      },
      't-char-ninja': {
        title: 'Ninja de l’Ombre',
        desc: 'Ninja furtif masqué aux yeux émeraude lumineux dans la brume',
      },
      't-anime-warrior': {
        title: 'Héros Anime Néon',
        desc: 'Avatar anime cyan cel-shaded très contrasté pour chaînes anime et gaming',
      },
      't-anime-kitsune': {
        title: 'Esprit Kitsune',
        desc: 'Masque de renard japonais anime entouré d’énergie pourpre et ambre',
      },
      't-cartoon-lion': {
        title: 'Lion DJ Cartoon',
        desc: 'Mascotte lion expressive avec casque audio pour podcasts et streams',
      },
      't-celeb-redcarpet': {
        title: 'Icône Tapis Rouge',
        desc: 'Portrait pop-art doré sous les projecteurs pour profils stars et cinéma',
      },
      't-celeb-popicon': {
        title: 'Superstar Pop',
        desc: 'Portrait néon vibrant pour créateurs musique, divertissement et célébrités',
      },
      't-sports-football': {
        title: 'Champions Football',
        desc: 'Blason sportif pro avec ballon ailé et traînées de vitesse dorées',
      },
      't-sports-basketball': {
        title: 'Basket Enflammé',
        desc: 'Emblème basketball ailé pour équipes, ligues et chaînes sportives',
      },
      't-anime-cybergirl': {
        title: 'Héroïne Cyber Anime',
        desc: 'Portrait anime futuriste à visière néon et pétales de sakura lumineux',
      },
      't-anime-dragon': {
        title: 'Dragon Anime Émeraude',
        desc: 'Blason dragon anime rugissant avec flammes cyan et vert émeraude',
      },
      't-cartoon-monkey': {
        title: 'Singe Astronaute Cartoon',
        desc: 'Mascotte singe spatial violet et jaune au style cartoon expressif',
      },
      't-cartoon-fox': {
        title: 'Renard Ninja Cartoon',
        desc: 'Mascotte renard ninja dynamique pour profils gaming et créateurs',
      },
      't-celeb-cinemaking': {
        title: 'Roi du Cinéma VIP',
        desc: 'Portrait pop-art doré sous les projecteurs pour icônes et célébrités',
      },
      't-celeb-dj': {
        title: 'Légende DJ Scène',
        desc: 'Portrait néon violet et or pour DJ, musiciens et créateurs spectacle',
      },
      't-sports-boxing': {
        title: 'Champion de Boxe',
        desc: 'Bouclier sportif avec gant doré explosif pour sports de combat',
      },
      't-sports-racing': {
        title: 'Turbo Motorsport',
        desc: 'Casque de pilote aérodynamique aux traînées cyan et or ultra rapides',
      },
      't-ufuq-studio': {
        title: 'Studio Ufuq',
        desc: 'Emblème géométrique équilibré pour marques et studios modernes',
      },
      't-dev-bracket': {
        title: 'Développeur',
        desc: 'Identité technique épurée pour développeurs et projets tech',
      },
      't-podcast-wave': {
        title: 'Podcast & Voix',
        desc: 'Ondes sonores nettes idéales pour YouTube et podcasts',
      },
      't-camera-lens': {
        title: 'Objectif Photo',
        desc: 'Diaphragme élégant pour photographes et vidéastes',
      },
      't-esports-crest': {
        title: 'Équipe Esports',
        desc: 'Bouclier contrasté conçu pour les profils Discord et Twitch',
      },
      't-monogram-luxury': {
        title: 'Monogramme Luxe',
        desc: 'Initiale éditoriale classique dans un cadre doré raffiné',
      },
      't-royal-crown': {
        title: 'Couronne Royale',
        desc: 'Emblème personnel prestigieux pour mode et luxe',
      },
      't-minimal-arab': {
        title: 'Minimal Audacieux',
        desc: 'Monogramme net pensé pour rester lisible en petit format',
      },
      't-cyber-bolt': {
        title: 'Étincelle Tech',
        desc: 'Éclair vif pour streamers et créateurs dynamiques',
      },
      't-emerald-leaf': {
        title: 'Académie & Croissance',
        desc: 'Dégradé émeraude apaisant pour projets éducatifs et startups',
      },
      't-video-creator': {
        title: 'Créateur Vidéo',
        desc: 'Bouton lecture contrasté pour chaînes YouTube et TikTok',
      },
      't-pen-designer': {
        title: 'Designer Graphique',
        desc: 'Plume vectorielle classique sur une grille géométrique',
      },
      't-emblem-pure': {
        title: 'Icône Pure',
        desc: 'Symbole géométrique sans texte pour une marque universelle',
      },
      't-crescent-heritage': {
        title: 'Patrimoine',
        desc: 'Dégradé sable chaleureux avec croissant et étoile',
      },
      't-rocket-launch': {
        title: 'Lancement Startup',
        desc: 'Emblème dynamique pour produits numériques modernes',
      },
      't-wolf-clan': {
        title: 'Clan Compétitif',
        desc: 'Ailes symétriques contrastées pour équipes de jeu',
      },
    },
  },

  es: {
    brandName: 'باندا لتسكوم',
    pageTitle: 'باندا لتسكوم — Creador de Logos de Perfil',
    languageLabel: 'Idioma',
    appBackdropLabel: 'Fondo de app',
    appBackdrops: {
      studio: 'Estudio',
      grid: 'Cuadrícula',
      mesh: 'Malla',
      plain: 'Liso',
    },
    nav: {
      studio: 'Estudio',
      builder: 'Creador Libre',
      templates: 'Plantillas',
      platforms: 'Plataformas',
      saved: 'Guardados',
      profile: 'Mi Perfil',
      settings: 'Ajustes',
    },
    exportBtn: 'Exportar',
    entry: {
      gateTitle: 'Tus datos personales',
      profileTitle: 'Datos guardados',
      gateSubtitle:
        'Ingresa tu nombre, apellido y género para guardar tus datos y preparar un logo de perfil personalizado.',
      profileSubtitle:
        'Tus datos se guardan localmente en tu dispositivo y personalizan las vistas previas.',
      firstNameLabel: 'Nombre',
      firstNamePlaceholder: 'ej. Adam o Sara',
      lastNameLabel: 'Apellido',
      lastNamePlaceholder: 'ej. Mansour',
      genderLabel: 'Género',
      male: 'Masculino',
      female: 'Femenino',
      applyToLogoLabel: 'Actualizar el logo actual con estos datos',
      errFirstName: 'Por favor ingresa tu nombre antes de guardar.',
      errLastName: 'Por favor ingresa tu apellido antes de guardar.',
      saveAndEnter: 'Guardar y entrar',
      saveChanges: 'Guardar cambios',
      resetData: 'Borrar datos',
      saveStatus: 'Estado: Guardado localmente',
      lastUpdated: 'Última actualización',
      livePreviewLabel: 'Vista previa en vivo de tu logo',
      defaultFirst: 'Nombre',
      defaultLast: 'Apellido',
      readyToCustomize: 'Listo para personalizar y exportar',
      enterSaved: 'Entrar a Guardados',
    },
    studio: {
      welcomePrefix: 'Hola,',
      quickStart: 'Plantillas rápidas',
      viewAll: 'Ver todo',
      undo: 'Deshacer',
      redo: 'Rehacer',
      circularGuide: 'Guía circular',
      backdropLabel: 'Fondo de escenario',
      backdropChecker: 'Transparente',
      backdropLight: 'Claro',
      backdropDark: 'Oscuro',
      smartRandomize: 'Aleatorio',
      saveToLibrary: 'Guardar',
      copySvg: 'Copiar SVG',
      downloadPng: 'Descargar PNG',
    },
    inspector: {
      tabs: {
        identity: 'Identidad',
        frame: 'Forma',
        colors: 'Colores',
        typography: 'Texto',
        effects: 'Efectos',
      },
      titleLabel: 'Nombre o Monograma',
      titlePlaceholder: 'ej. NOVA o A',
      subtitleLabel: 'Subtítulo (Opcional)',
      subtitlePlaceholder: 'ej. STUDIO o @HANDLE',
      layoutLabel: 'Composición',
      layouts: {
        'emblem-above': 'Icono + Texto',
        'emblem-only': 'Solo icono',
        'text-only': 'Solo texto',
        'emblem-backdrop': 'Icono fondo',
        'monogram-frame': 'Monograma',
      },
      emblemLibrary: 'Imágenes e Iconos',
      graphicArtworks: 'Ilustraciones',
      graphicVectors: 'Iconos vectoriales',
      artworkFitLabel: 'Encuadre imagen',
      artworkFitCover: 'Marco completo',
      artworkFitBadge: 'Medallón',
      artworkOpacity: 'Opacidad imagen',
      noArtworkLabel: 'Quitar imagen',
      uploadPhotoBtn: 'Subir tu foto',
      changePhotoBtn: 'Cambiar',
      customPhotoActive: 'Tu foto personalizada',
      uploadPhotoHint: 'PNG, JPG o WebP',
      customSketchActive: 'Dibujo manual personalizado activo',
      clearSketchBtn: 'Borrar dibujo',
      artworkCats: {
        all: 'Todo',
        characters: 'Personajes',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Famosos',
        sports: 'Deportes',
      },
      filled: 'Relleno',
      outline: 'Contorno',
      emblemCats: {
        all: 'Todo',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Famosos',
        sports: 'Deportes',
        geometric: 'Geométrico',
        tech: 'Tech',
        creative: 'Creativo',
        gaming: 'Gaming',
        luxury: 'Lujo',
      },
      emblemSize: 'Escala del símbolo',
      strokeWidth: 'Grosor del trazo',
      backdropOpacity: 'Opacidad del fondo',
      maskShapeLabel: 'Recorte del avatar',
      shapes: {
        circle: 'Círculo',
        squircle: 'Cuadrado suave',
        hexagon: 'Hexágono',
        square: 'Cuadrado',
      },
      innerRingLabel: 'Anillo interior',
      ringStyles: {
        none: 'Ninguno',
        solid: 'Sólido',
        accent: 'Acento',
        double: 'Doble',
        dashed: 'Discontinuo',
      },
      ringThickness: 'Grosor del anillo',
      cornerBadgeLabel: 'Insignia de esquina',
      badges: {
        none: 'Ninguna',
        dot: 'Punto',
        spark: 'Estrella',
        check: 'Check',
      },
      palettesLabel: 'Paletas de colores',
      bgFillMode: 'Relleno de fondo',
      bgModes: {
        solid: 'Sólido',
        linear: 'Lineal',
        radial: 'Radial',
        split: 'Dividido',
      },
      gradientAngle: 'Ángulo del degradado',
      manualColors: 'Colores manuales',
      bgColor1: 'Fondo 1',
      bgColor2: 'Fondo 2',
      fgColor: 'Texto e icono',
      accentColor: 'Acento',
      bgPatternLabel: 'Patrón de fondo',
      patterns: {
        none: 'Limpio',
        dots: 'Puntos',
        grid: 'Cuadrícula',
        rings: 'Anillos',
        diagonal: 'Diagonales',
      },
      patternOpacity: 'Opacidad del patrón',
      fontFamilyLabel: 'Tipografía',
      fonts: {
        Cairo: 'Cairo — Moderna Bilingüe',
        'Readex Pro': 'Readex Pro — Geométrica Suave',
        'Playfair Display': 'Playfair — Editorial Clásica',
        Oswald: 'Oswald — Deportiva Audaz',
        'JetBrains Mono': 'JetBrains — Técnica Mono',
      },
      fontSizeLabel: 'Tamaño del título',
      fontWeightLabel: 'Peso',
      letterSpacingLabel: 'Espaciado',
      subtitleSizeLabel: 'Tamaño del subtítulo',
      effectsQuickLabel: 'Ajustes rápidos',
      effectPresets: {
        clean: 'Limpio',
        softDepth: 'Profundidad',
        popShadow: 'Sombra pop',
        crispGlow: 'Brillo vivo',
        studioHalo: 'Halo estudio',
      },
      shadowSectionLabel: 'Sombra paralela (Drop Shadow)',
      shadowModes: {
        none: 'Ninguna',
        soft: 'Suave',
        elevated: 'Elevada',
        crisp: 'Nítida',
      },
      shadowBlurLabel: 'Desenfoque',
      shadowOffsetLabel: 'Desplazamiento',
      shadowOpacityLabel: 'Opacidad',
      shadowColorLabel: 'Color de sombra',
      glowSectionLabel: 'Brillo y Halo (Glow)',
      glowModes: {
        none: 'Ninguno',
        foreground: 'Brillo logo',
        halo: 'Halo fondo',
        both: 'Ambos',
      },
      glowIntensityLabel: 'Intensidad de brillo',
      glowColorLabel: 'Color de brillo',
      matchAccentBtn: 'Igualar acento',
    },
    preview: {
      title: 'Vista previa de perfil',
      allPlatforms: 'Todas las plataformas',
      clarityTest: 'Prueba de legibilidad pequeña',
      igProfile: 'Perfil de Instagram',
      lightMode: 'Modo claro',
      postsCount: '128 publicaciones',
      followersCount: '24,8K seguidores',
      followingCount: '310 seguidos',
      ytDiscord: 'YouTube y Discord',
      darkMode: 'Modo oscuro',
      channelMeta: 'Canal creativo · 142K suscriptores',
      subscribe: 'Suscribirse',
      xHeader: 'Cabecera de X',
      xBio: 'Identidad visual lista para publicar',
    },
    templates: {
      heading: 'Plantillas de logos listas para usar',
      subheading:
        'Elige un punto de partida cuidado y personaliza texto, colores y símbolo en el estudio.',
      searchPlaceholder: 'Buscar plantillas...',
      emptyTitle: 'No se encontraron plantillas',
      emptyDesc: 'Prueba otra palabra clave o muestra todas las plantillas.',
      showAllBtn: 'Mostrar todas',
      customizeBtn: 'Personalizar',
      categories: {
        all: 'Todas',
        characters: 'Personajes',
        anime: 'Anime',
        cartoon: 'Cartoon',
        celebrities: 'Famosos',
        sports: 'Deportes',
        business: 'Negocios y Tech',
        creators: 'Creadores',
        gaming: 'Gaming',
        art: 'Arte y Foto',
        minimal: 'Minimal',
      },
    },
    platforms: {
      heading: 'Vista previa en redes sociales',
      subheading:
        'Comprueba la claridad y el equilibrio de tu logo antes de usarlo como foto de perfil.',
      backToStudio: 'Volver al estudio',
      download1024: 'Descargar PNG 1024×1024',
      igBio: 'Cuenta oficial · Identidad visual y creativa',
      ytMeta: '215K suscriptores',
      subscribe: 'Suscribirse',
      discordTitlePrefix: 'Servidor',
      discordMeta: '1.420 en línea · 8.900 miembros',
      linkedinSector: 'Diseño y Productos Digitales',
      follow: 'Seguir +',
      tiktokMeta: '1,2M Me gusta · 98K Seguidores',
    },
    saved: {
      heading: 'Mis logos guardados',
      subheading: 'Tus diseños se guardan localmente para editarlos cuando quieras.',
      createNew: 'Nuevo logo',
      emptyTitle: 'Aún no hay logos guardados',
      emptyDesc:
        'Diseña tu logo en el estudio y haz clic en "Guardar" para conservar una copia editable.',
      openStudio: 'Abrir estudio',
      untitled: 'Logo sin título',
      editBtn: 'Editar',
      duplicateTitle: 'Duplicar',
      deleteTitle: 'Eliminar',
    },
    builder: {
      heading: 'Creador de Logo Personalizado',
      subheading:
        'Diseña tu propio logotipo desde cero: dibuja un símbolo simétrico a mano alzada, rota iconos o sube una foto.',
      startBlankBtn: 'Empezar desde cero',
      importCurrentBtn: 'Cargar del Estudio',
      steps: {
        identity: '1. Nombre y Fuente',
        mark: '2. Dibujo y Símbolo',
        style: '3. Colores y Marco',
        finish: '4. Efectos y Exportar',
      },
      autoInitialsBtn: 'Usar mis iniciales',
      markModes: {
        sketch: 'Dibujo libre',
        vector: 'Vectores y Giro',
        photo: 'Subir foto',
      },
      sketchHint: 'Dibuja aquí tu propio símbolo vectorial — el modo espejo dibuja en simetría',
      brushPrimary: 'Color principal',
      brushAccent: 'Color acento',
      symmetryLabel: 'Simetría espejo',
      brushSizeLabel: 'Grosor del trazo',
      undoStrokeBtn: 'Deshacer trazo',
      clearSketchBtn: 'Limpiar lienzo',
      rotationLabel: 'Rotación del símbolo',
      clarityStripLabel: 'Prueba de claridad por tamaño',
      applyToStudioBtn: 'Editar en Estudio',
      saveLogoBtn: 'Guardar',
      downloadPngBtn: 'Descargar PNG',
      downloadSvgBtn: 'Descargar SVG',
      prevStepBtn: 'Anterior',
      nextStepBtn: 'Siguiente',
    },
    exportModal: {
      title: 'Exportar logo de perfil',
      close: 'Cerrar',
      defaultName: 'Logo de perfil',
      transparentHint: 'Fondo transparente fuera del recorte · Listo para redes',
      choosePngRes: 'Elegir resolución PNG',
      fastHint: 'Avatar rápido',
      hdHint: 'HD Estándar',
      ultraHint: 'Ultra HD e Impresión',
      preparing: 'Preparando...',
      downloadPngPrefix: 'Descargar PNG',
      downloadSvg: 'Descargar SVG',
      copySvg: 'Copiar código SVG',
      copiedSvg: '¡Copiado!',
    },
    settings: {
      heading: 'Ajustes de la aplicación',
      subheading: 'Configura el idioma, el fondo, la resolución de exportación y tus copias de seguridad.',
      backToStudio: 'Volver al estudio',
      appearanceHeading: 'Idioma y Apariencia',
      appearanceDesc: 'Actualiza el idioma, la dirección del texto y el fondo del espacio de trabajo.',
      defaultStageLabel: 'Fondo de lienzo predeterminado',
      studioHeading: 'Preferencias de Estudio y Exportación',
      studioDesc: 'Se aplican automáticamente al exportar o elegir ilustraciones y plantillas.',
      defaultExportSizeLabel: 'Resolución PNG predeterminada',
      defaultArtworkFitLabel: 'Encuadre predeterminado',
      autoPersonalizeLabel: 'Aplicar tu nombre a las plantillas',
      autoPersonalizeDesc: 'Sustituir el título de la plantilla por tu nombre automáticamente.',
      autoPaletteLabel: 'Sincronizar colores con la imagen',
      autoPaletteDesc: 'Ajustar el color de acento según la ilustración seleccionada.',
      defaultSafeZoneLabel: 'Mostrar guía circular por defecto',
      defaultSafeZoneDesc: 'Ver los límites de recorte circular para redes sociales.',
      profileHeading: 'Identidad personal',
      profileDesc: 'Nombre, apellido y género guardados para personalizar tus logos.',
      editProfileBtn: 'Editar perfil',
      savedLogosCount: 'Logos guardados',
      dataHeading: 'Copia de seguridad y datos',
      dataDesc: 'Exporta tus logos y ajustes en JSON o restaura una copia existente.',
      exportBackupBtn: 'Exportar copia',
      importBackupBtn: 'Importar copia',
      clearSavedBtn: 'Vaciar guardados',
      confirmClearBtn: 'Confirmar',
      cancelBtn: 'Cancelar',
      resetSettingsBtn: 'Restablecer ajustes',
    },
    toasts: {
      profileSaved: (fullName) => `Perfil guardado para ${fullName}`,
      logoSaved: 'Logo guardado en tu biblioteca',
      pngDownloaded: (size) => `PNG ${size}×${size} descargado`,
      svgDownloaded: 'Archivo SVG descargado',
      svgCopied: 'Código SVG copiado',
      templateLoaded: 'Plantilla cargada con tu nombre',
      logoLoaded: 'Logo abierto en el estudio',
      logoDuplicated: 'Logo duplicado',
      logoDeleted: 'Logo eliminado',
      backupExported: 'Copia de seguridad descargada',
      backupImported: 'Copia de seguridad restaurada',
      backupInvalid: 'Archivo de copia inválido',
      savedCleared: 'Biblioteca vaciada',
      settingsReset: 'Ajustes restablecidos',
      photoAdded: 'Tu foto se ha añadido al logotipo',
      photoInvalid: 'No se pudo leer el archivo de imagen',
      builderApplied: 'Tu logotipo personalizado está activo en el Estudio',
    },
    emblemNames: {
      'prism-core': 'Prisma geométrico',
      'orbit-rings': 'Órbita triple',
      'hex-cube': 'Cubo hexagonal',
      'diamond-cut': 'Diamante tallado',
      'twin-pillars': 'Pilares gemelos',
      'arch-gate': 'Arco',
      'code-brackets': 'Corchetes de código',
      'circuit-node': 'Nodo circuito',
      'bolt-pulse': 'Rayo de energía',
      'radar-signal': 'Onda de señal',
      'terminal-cursor': 'Terminal',
      'rocket-vector': 'Cohete',
      'aperture-lens': 'Lente de cámara',
      'sound-wave': 'Onda sonora',
      'pen-nib': 'Pluma de diseño',
      'play-prism': 'Botón reproducir',
      'mic-studio': 'Micrófono podcast',
      'film-frame': 'Marco de cine',
      'shield-crest': 'Escudo arena',
      'wolf-fang': 'Alas afiladas',
      'crosshair-pro': 'Mira de precisión',
      'flame-spark': 'Llama',
      'controller-pad': 'Mando de juego',
      'royal-crown': 'Corona real',
      'crescent-star': 'Luna y estrella',
      'north-star': 'Estrella del norte',
      'laurel-crest': 'Corona de laurel',
      'lotus-bloom': 'Flor de loto',
      'infinity-loop': 'Bucle infinito',
      'panda-face': 'Panda',
      'anime-shuriken': 'Shuriken Ninja',
      'anime-katana': 'Espadas Samurái',
      'anime-kitsune-mask': 'Máscara Kitsune',
      'cartoon-boom': 'Estallido Cómic',
      'cartoon-alien': 'Alien Cartoon',
      'celeb-aviators': 'Gafas Estrella',
      'celeb-mic': 'Micrófono',
      'celeb-spotlight': 'Estrella VIP',
      'sports-cup': 'Trofeo',
      'sports-soccer': 'Fútbol',
      'sports-basketball': 'Baloncesto',
      'sports-dumbbell': 'Fitness',
    },
    artworkNames: {
      'anime-warrior': 'Héroe Anime',
      'anime-kitsune': 'Espíritu Kitsune',
      'cartoon-panda': 'Panda Cool',
      'cartoon-lion': 'León DJ Cartoon',
      'celeb-redcarpet': 'Estrella Alfombra',
      'celeb-popicon': 'Icono Pop',
      'sports-football': 'Club Fútbol',
      'sports-basketball': 'Baloncesto Alado',
      'anime-cybergirl': 'Heroína Cyber',
      'anime-dragon': 'Dragón Anime',
      'cartoon-monkey': 'Mono Espacial',
      'cartoon-fox': 'Zorro Ninja',
      'celeb-cinemaking': 'Rey del Cine',
      'celeb-dj': 'Superestrella DJ',
      'sports-boxing': 'Campeón Boxeo',
      'sports-racing': 'Casco Turbo',
      'sports-academy': 'Academia Al-Manaser',
      'char-samurai': 'Samurái Cyber',
      'char-mage': 'Mago Arcano',
      'char-astronaut': 'Explorador Espacial',
      'char-pirate': 'Capitán Pirata',
      'char-knight': 'Paladín Real',
      'char-ninja': 'Ninja Sombra',
    },
    paletteNames: {
      'obsidian-gold': 'Obsidiana y Oro',
      'cobalt-studio': 'Estudio Cobalto',
      'alabaster-ink': 'Alabastro y Tinta',
      'emerald-slate': 'Esmeralda Oscura',
      'crimson-noir': 'Carmesí Negro',
      'warm-ivory': 'Marfil Clásico',
      'cyber-teal': 'Turquesa Tech',
      'sunset-amber': 'Ámbar Cálido',
      'royal-plum': 'Ciruela Real',
      'graphite-lime': 'Grafito Lima',
      'ocean-mist': 'Brisa Océano',
      'sand-terracotta': 'Terracota',
    },
    templateText: {
      't-cartoon-panda': {
        title: 'Mascota Panda Cool',
        desc: 'Personaje panda cartoon morado y amarillo para perfiles modernos',
      },
      't-sports-academy': {
        title: 'Academia Al-Manaser',
        desc: 'Escudo de academia de fútbol azul marino y dorado con águila y balón',
      },
      't-char-samurai': {
        title: 'Samurái Cyber',
        desc: 'Personaje guerrero samurái con armadura oscura y visor carmesí',
      },
      't-char-mage': {
        title: 'Mago Arcano',
        desc: 'Hechicero fantástico con capa púrpura rúnica y báculo brillante',
      },
      't-char-astronaut': {
        title: 'Explorador Cosmos',
        desc: 'Astronauta futurista con visor dorado reflejando las estrellas',
      },
      't-char-pirate': {
        title: 'Capitán Pirata',
        desc: 'Capitán pirata carismático con tricornio dorado y luz de farol',
      },
      't-char-knight': {
        title: 'Paladín Real',
        desc: 'Caballero noble con armadura plateada y dorada y manto azul real',
      },
      't-char-ninja': {
        title: 'Ninja Sombra',
        desc: 'Ninja sigiloso enmascarado con ojos esmeralda brillantes',
      },
      't-anime-warrior': {
        title: 'Héroe Anime Neón',
        desc: 'Avatar anime cian de alto contraste ideal para canales anime y gaming',
      },
      't-anime-kitsune': {
        title: 'Espíritu Kitsune',
        desc: 'Máscara japonesa anime con energía carmesí y violeta',
      },
      't-cartoon-lion': {
        title: 'León DJ Cartoon',
        desc: 'Mascota león expresiva con auriculares para podcasts y streams',
      },
      't-celeb-redcarpet': {
        title: 'Icono Alfombra Roja',
        desc: 'Retrato pop-art dorado bajo focos para perfiles de cine y famosos',
      },
      't-celeb-popicon': {
        title: 'Superestrella Pop',
        desc: 'Retrato neón vibrante para música, espectáculo y entretenimiento',
      },
      't-sports-football': {
        title: 'Campeones Fútbol',
        desc: 'Escudo deportivo pro con balón alado y estelas doradas',
      },
      't-sports-basketball': {
        title: 'Aros en Llamas',
        desc: 'Emblema de baloncesto con alas de águila para clubes deportivos',
      },
      't-anime-cybergirl': {
        title: 'Heroína Cyber Anime',
        desc: 'Retrato anime futurista con visor neón rosa y pétalos de sakura',
      },
      't-anime-dragon': {
        title: 'Dragón Anime Esmeralda',
        desc: 'Escudo de dragón espíritu anime con llamas cian y verde esmeralda',
      },
      't-cartoon-monkey': {
        title: 'Mono Astronauta Cartoon',
        desc: 'Mascota mono espacial morado y amarillo de estilo cartoon vibrante',
      },
      't-cartoon-fox': {
        title: 'Zorro Ninja Cartoon',
        desc: 'Mascota zorro ninja ágil con chispas dinámicas para perfiles gaming',
      },
      't-celeb-cinemaking': {
        title: 'Estrella de Cine VIP',
        desc: 'Retrato pop-art dorado bajo focos para iconos de cine y famosos',
      },
      't-celeb-dj': {
        title: 'Leyenda DJ Escenario',
        desc: 'Retrato neón morado y oro para DJs, música y entretenimiento',
      },
      't-sports-boxing': {
        title: 'Campeón de Boxeo',
        desc: 'Escudo deportivo con guante dorado explosivo para deportes de combate',
      },
      't-sports-racing': {
        title: 'Turbo Automovilismo',
        desc: 'Casco de piloto aerodinámico con estelas rápidas en cian y oro',
      },
      't-ufuq-studio': {
        title: 'Estudio Ufuq',
        desc: 'Emblema geométrico equilibrado para marcas y estudios modernos',
      },
      't-dev-bracket': {
        title: 'Desarrollador',
        desc: 'Identidad técnica limpia para desarrolladores y proyectos tech',
      },
      't-podcast-wave': {
        title: 'Podcast y Voz',
        desc: 'Ondas sonoras nítidas ideales para YouTube y podcasts',
      },
      't-camera-lens': {
        title: 'Lente Fotográfico',
        desc: 'Diafragma elegante para fotógrafos y cineastas',
      },
      't-esports-crest': {
        title: 'Equipo Esports',
        desc: 'Escudo de alto contraste diseñado para Discord y Twitch',
      },
      't-monogram-luxury': {
        title: 'Monograma Lujo',
        desc: 'Inicial clásica en un marco dorado refinado',
      },
      't-royal-crown': {
        title: 'Corona Real',
        desc: 'Distintivo personal prestigioso para moda y lujo',
      },
      't-minimal-arab': {
        title: 'Minimal Audaz',
        desc: 'Monograma limpio diseñado para leerse en tamaños pequeños',
      },
      't-cyber-bolt': {
        title: 'Chispa Tech',
        desc: 'Rayo nítido para streamers y creadores dinámicos',
      },
      't-emerald-leaf': {
        title: 'Academia Verde',
        desc: 'Degradado esmeralda sereno para educación y startups',
      },
      't-video-creator': {
        title: 'Creador de Video',
        desc: 'Botón play de alto contraste para YouTube y TikTok',
      },
      't-pen-designer': {
        title: 'Diseñador Gráfico',
        desc: 'Pluma vectorial clásica sobre cuadrícula geométrica',
      },
      't-emblem-pure': {
        title: 'Icono Puro',
        desc: 'Símbolo geométrico sin texto para reconocimiento universal',
      },
      't-crescent-heritage': {
        title: 'Legado',
        desc: 'Degradado arena cálido con luna creciente y estrella',
      },
      't-rocket-launch': {
        title: 'Lanzamiento Startup',
        desc: 'Emblema dinámico para productos web modernos',
      },
      't-wolf-clan': {
        title: 'Clan Competitivo',
        desc: 'Alas simétricas de alto contraste para equipos gaming',
      },
    },
  },
};
