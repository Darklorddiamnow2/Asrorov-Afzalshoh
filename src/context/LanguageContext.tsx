import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'uz' | 'ru';

export interface Translations {
  nav: {
    about: string;
    interests: string;
    projects: string;
    research: string;
    achievements: string;
    skills: string;
    timeline: string;
    contact: string;
    viewResume: string;
    editData: string;
    portfolioTitle: string;
  };
  hero: {
    kicker: string;
    candidateSubtitle: string;
    headline: string;
    exploreWork: string;
    viewResume: string;
    editPlaceholders: string;
    focusTitle: string;
    focusVal: string;
    methodTitle: string;
    methodVal: string;
    inquiriesTitle: string;
    inquiriesVal: string;
    targetTitle: string;
    targetVal: string;
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    learningApproachTitle: string;
    uniObjectivesTitle: string;
    standardTitle: string;
    standardText: string;
    principlesTitle: string;
  };
  interests: {
    kicker: string;
    title: string;
    subtitle: string;
    coreTexts: string;
    inspectPrototype: string;
    coreInquiriesTitle: string;
    hypothesesBadge: string;
    statusActive: string;
    statusLevel: string;
  };
  projects: {
    kicker: string;
    title: string;
    searchPlaceholder: string;
    showingText: (count: number, total: number) => string;
    clearSearch: string;
    examineMethodology: string;
    coreProblem: string;
    contribution: string;
    all: string;
    computational: string;
    quantitative: string;
    cognitive: string;
  };
  research: {
    kicker: string;
    title: string;
    subtitle: string;
    integrityNote: string;
    centralQuestion: string;
    methodFramework: string;
    keyInsights: string;
    primarySources: string;
    copyCitation: string;
    copied: string;
  };
  achievements: {
    kicker: string;
    title: string;
    previewEmpty: string;
    showPlaceholders: string;
    editHonors: string;
    verifiedRecord: string;
    emptyTitle: string;
    emptyText: string;
    addAchievement: string;
  };
  skills: {
    kicker: string;
    title: string;
    subtitle: string;
    copySummary: string;
    copied: string;
    verifiable: string;
  };
  timeline: {
    kicker: string;
    title: string;
    step: string;
    output: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    directChannels: string;
    channelsDesc: string;
    primaryEmail: string;
    telephone: string;
    copy: string;
    copied: string;
    reposTitle: string;
    draftTitle: string;
    draftDesc: string;
    inquiryPurpose: string;
    yourName: string;
    institution: string;
    message: string;
    sendEmail: string;
    copyDraft: string;
    draftCopied: string;
  };
  footer: {
    desc: string;
    motto: string;
    sections: string;
    backToTop: string;
    rights: string;
    partNotice: string;
  };
  resume: {
    title: string;
    subtitle: string;
    downloadTxt: string;
    downloadHtml: string;
    copyPlain: string;
    copied: string;
    printPdf: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      interests: 'Academic Interests',
      projects: 'Projects',
      research: 'Research',
      achievements: 'Achievements',
      skills: 'Skills',
      timeline: 'Timeline',
      contact: 'Contact',
      viewResume: 'View Resume',
      editData: 'Edit Data',
      portfolioTitle: 'Academic Portfolio',
    },
    hero: {
      kicker: 'PERSONAL ACADEMIC PORTFOLIO',
      candidateSubtitle: 'Prospective Undergraduate Scholar · Target Fall 2026',
      headline: 'Curiosity into Contribution.',
      exploreWork: 'Explore My Work',
      viewResume: 'View Resume',
      editPlaceholders: 'Edit candidate placeholders',
      focusTitle: 'Primary Focus',
      focusVal: 'Computational & Quantitative',
      methodTitle: 'Methodology',
      methodVal: 'Formal Modeling & Simulation',
      inquiriesTitle: 'Inquiry Dossiers',
      inquiriesVal: '3 Disciplines · 2 Explorations',
      targetTitle: 'Admissions Target',
      targetVal: 'Fall 2026 Undergraduate',
    },
    about: {
      kicker: '01. STATEMENT OF ORIENTATION',
      title: 'About My Intellectual Development',
      subtitle: 'Philosophy · Approach · Aims',
      learningApproachTitle: 'Approach to Learning',
      uniObjectivesTitle: 'University Objectives',
      standardTitle: 'Independent Inquiry Standard',
      standardText:
        'Independent projects are treated not as extracurricular embellishments, but as self-assigned laboratory problems subject to peer-style critique, version control, and reproducible writeups.',
      principlesTitle: 'Guiding Principles of Inquiry',
    },
    interests: {
      kicker: '02. INTELLECTUAL HORIZONS',
      title: 'Areas of Academic Interest',
      subtitle: 'Disciplinary domains and core questions proposed for undergraduate research',
      coreTexts: 'Core Reference Texts',
      inspectPrototype: 'Inspect linked computational prototype',
      coreInquiriesTitle: 'Core Inquiries Under Investigation',
      hypothesesBadge: 'Hypotheses',
      statusActive: 'STATUS: ACTIVE READING & REPLICATION',
      statusLevel: 'UNDERGRADUATE LEVEL INQUIRY',
    },
    projects: {
      kicker: '03. SELECTED ARTIFACTS',
      title: 'Featured Projects & Codebases',
      searchPlaceholder: 'Search methods, tools, topics...',
      showingText: (count, total) => `Showing ${count} of ${total} artifacts`,
      clearSearch: 'Clear',
      examineMethodology: 'Examine Methodology',
      coreProblem: 'Core Problem Addressed:',
      contribution: 'Individual Contribution:',
      all: 'All',
      computational: 'Computational',
      quantitative: 'Quantitative',
      cognitive: 'Cognitive',
    },
    research: {
      kicker: '04. SCHOLARLY INQUIRY',
      title: 'Independent Learning & Research Dossiers',
      subtitle: 'Self-directed reading syllabi, exploratory experiments, and literature surveys',
      integrityNote:
        'Academic Integrity Note: The dossiers below document self-directed pre-collegiate inquiries, critical literature syntheses, and computational experiments. In accordance with university admissions standards, these are clearly demarcated as independent exploratory studies, not formal peer-reviewed faculty publications.',
      centralQuestion: 'Central Research Question',
      methodFramework: 'Methodological Framework & Approach',
      keyInsights: 'Key Preliminary Findings / Insights',
      primarySources: 'Primary Sources & References',
      copyCitation: 'Copy citation',
      copied: 'Copied',
    },
    achievements: {
      kicker: '05. VERIFIED RECORD',
      title: 'Honors, Competitions & Credentials',
      previewEmpty: 'Preview Empty State',
      showPlaceholders: 'Show Sample Placeholders',
      editHonors: 'Edit Honors',
      verifiedRecord: 'VERIFIED RECORD',
      emptyTitle: 'Verified Achievements Pending Input',
      emptyText:
        'In strict adherence to academic integrity guidelines, zero fabricated Olympiad medals or test percentiles are displayed. When official qualifying results or honors are certified, they appear in this ledger.',
      addAchievement: 'Add Verified Achievement',
    },
    skills: {
      kicker: '06. METHODOLOGICAL APPARATUS',
      title: 'Skills & Analytical Tools',
      subtitle: 'Disciplinary competencies documented through applied project work (no arbitrary proficiency percentages)',
      copySummary: 'Copy Skills Summary',
      copied: 'Skills Copied',
      verifiable: 'VERIFIABLE VIA CODE REPO',
    },
    timeline: {
      kicker: '07. INTELLECTUAL TRAJECTORY',
      title: 'Development Timeline',
      step: 'Step',
      output: 'Documented Output:',
    },
    contact: {
      kicker: '08. CORRESPONDENCE',
      title: 'Connect & Academic Inquiries',
      subtitle: 'Open to discussions with university admissions officers, faculty investigators, and student researchers',
      directChannels: 'Direct Channels',
      channelsDesc: 'I welcome dialogue regarding my computational projects, research questions, or potential laboratory alignment in university.',
      primaryEmail: 'Primary Email',
      telephone: 'Direct Telephone / Mobile',
      copy: 'Copy',
      copied: 'Copied',
      reposTitle: 'Scholarly & Code Repositories',
      draftTitle: 'Draft Academic Inquiry',
      draftDesc: 'Sends directly via your preferred email client',
      inquiryPurpose: 'Inquiry Purpose',
      yourName: 'Your Name',
      institution: 'Institution / University',
      message: 'Message / Inquiries',
      sendEmail: 'Send via Email Client',
      copyDraft: 'Copy Draft',
      draftCopied: 'Draft Copied',
    },
    footer: {
      desc: 'Personal academic portfolio documenting intellectual trajectory, independent investigations, and computational projects for university evaluation.',
      motto: 'Curiosity into Contribution · Anno MMXXVI',
      sections: 'Portfolio Navigation',
      backToTop: 'Back to Top',
      rights: 'All original code, writing, and research models licensed under MIT / CC BY 4.0.',
      partNotice: 'Undergraduate Academic Portfolio · Part 1 of 2 (Identity & Academic Inquiries)',
    },
    resume: {
      title: 'Curriculum Vitae',
      subtitle: '· Academic Monograph Format',
      downloadTxt: 'Download .txt',
      downloadHtml: 'Download .html',
      copyPlain: 'Copy',
      copied: 'Copied',
      printPdf: 'Print / PDF',
      close: 'Close',
    },
  },
  uz: {
    nav: {
      about: 'Haqida',
      interests: 'Ilmiy Qiziqishlar',
      projects: 'Loyihalar',
      research: 'Tadqiqotlar',
      achievements: 'Yutuqlar',
      skills: 'Ko‘nikmalar',
      timeline: 'Xronologiya',
      contact: 'Aloqa',
      viewResume: 'Rezyumeni Ko‘rish',
      editData: 'Tahrirlash',
      portfolioTitle: 'Ilmiy Portfolio',
    },
    hero: {
      kicker: 'SHAXSIY ILMIY PORTFOLIO',
      candidateSubtitle: 'Bakalavriat Nomzodi · Maqsad: 2026-yil Kuzi',
      headline: 'Qiziqishdan Jamiyatga Foydali Hissaga.',
      exploreWork: 'Ishlarimni Ko‘ring',
      viewResume: 'Rezyumeni Ko‘rish',
      editPlaceholders: 'Ma‘lumotlarni o‘zgartirish',
      focusTitle: 'Asosiy Yo‘nalish',
      focusVal: 'Hisoblash & Miqdoriy Tahlil',
      methodTitle: 'Metodologiya',
      methodVal: 'Formal Modellashtirish & Simulyatsiya',
      inquiriesTitle: 'Tadqiqot Fayllari',
      inquiriesVal: '3 Fan Sohasi · 2 Izlanish',
      targetTitle: 'Qabul Maqsadi',
      targetVal: '2026-yil Bakalavriat',
    },
    about: {
      kicker: '01. INTELLEKTUAL YO‘NALISH',
      title: 'Mening Ilmiy Rivojlanishim Haqida',
      subtitle: 'Falsafa · Yondashuv · Maqsadlar',
      learningApproachTitle: 'O‘rganishga Yondashuv',
      uniObjectivesTitle: 'Universitetdagi Maqsadlar',
      standardTitle: 'Mustaqil Izlanish Standarti',
      standardText:
        'Mustaqil loyihalar shunchaki qo‘shimcha mashg‘ulot emas, balki qat‘iy tanqid, versiya nazorati va takrorlanuvchi hisobotlarga asoslangan mustaqil laboratoriya masalalari sifatida bajariladi.',
      principlesTitle: 'Izlanishning Asosiy Tamoyillari',
    },
    interests: {
      kicker: '02. ILMIY UFQLAR',
      title: 'Ilmiy Qiziqish Sohalari',
      subtitle: 'Bakalavriat tadqiqotlari uchun taklif qilingan sohalar va asosiy savollar',
      coreTexts: 'Asosiy Manba va Adabiyotlar',
      inspectPrototype: 'Bog‘langan hisoblash prototipini ko‘rish',
      coreInquiriesTitle: 'O‘rganilayotgan Asosiy Ilmiy Savollar',
      hypothesesBadge: 'Gipotezalar',
      statusActive: 'HOLAT: FAOQ O‘RGANISH VA TAKRORLASH',
      statusLevel: 'BAKALAVRIAT DARAJASIDAGI IZLANISH',
    },
    projects: {
      kicker: '03. SARALANGAN ISHLAR',
      title: 'Loyiha va Kod Bazaslari',
      searchPlaceholder: 'Metod, vosita yoki mavzu qidirish...',
      showingText: (count, total) => `${total} tadan ${count} ta artefakt ko‘rsatilmoqda`,
      clearSearch: 'Tozalash',
      examineMethodology: 'Metodologiyani Ko‘rish',
      coreProblem: 'Hal Qilingan Asosiy Muammo:',
      contribution: 'Shaxsiy Hissa:',
      all: 'Barchasi',
      computational: 'Hisoblash',
      quantitative: 'Miqdoriy',
      cognitive: 'Kognitiv',
    },
    research: {
      kicker: '04. ILMIY IZLANISHLAR',
      title: 'Mustaqil O‘rganish va Tadqiqot Fayllari',
      subtitle: 'Mustaqil o‘qish rejalari, sinov tajribalari va adabiyotlar tahlili',
      integrityNote:
        'Ilmiy Halollik Eslatmasi: Ushbu hujjatlar oliygohga qabul qilinishdan oldingi mustaqil izlanishlar va hisoblash tajribalarini aks ettiradi. Ular rasmiy taqrizdan o‘tgan jurnal nashrlari emas, mustaqil o‘rganish natijalaridir.',
      centralQuestion: 'Asosiy Tadqiqot Savoli',
      methodFramework: 'Metodologik Yondashuv',
      keyInsights: 'Dastlabki Asosiy Xulosalar',
      primarySources: 'Birlamchi Manbalar va Havolalar',
      copyCitation: 'Havolani nusxalash',
      copied: 'Nusxalandi',
    },
    achievements: {
      kicker: '05. TASDIQLANGAN NATIJALAR',
      title: 'Mukofotlar, Olimpiadalar va Sertifikatlar',
      previewEmpty: 'Bo‘sh Holatni Ko‘rish',
      showPlaceholders: 'Namunani Ko‘rsatish',
      editHonors: 'Tahrirlash',
      verifiedRecord: 'TASDIQLANGAN QAYD',
      emptyTitle: 'Tasdiqlangan Natijalar Kiritilmoqda',
      emptyText:
        'Akademik halollik mezonlariga qat‘iy rioya qilingan holda soxta sertifikat yoki ballar qo‘yilmaydi. Rasmiy natijalar tasdiqlangach ushbu ro‘yxatda aks etadi.',
      addAchievement: 'Yangi Natija Qo‘shish',
    },
    skills: {
      kicker: '06. METODOLOGIK ASBOBLAR',
      title: 'Ko‘nikmalar va Tahliliy Vositalar',
      subtitle: 'Amaliy loyihalarda tasdiqlangan ko‘nikmalar (asossiz foizlarsiz)',
      copySummary: 'Ko‘nikmalarni Nusxalash',
      copied: 'Nusxalandi',
      verifiable: 'KOD ORQALI TEKSHIRILUVCHI',
    },
    timeline: {
      kicker: '07. INTELLEKTUAL BOSHQICH',
      title: 'Rivojlanish Xronologiyasi',
      step: 'Bosqich',
      output: 'Hujjatlashtirilgan Natija:',
    },
    contact: {
      kicker: '08. BOG‘LANISH VA ALOQA',
      title: 'Ilmiy Muloqot va Takliflar',
      subtitle: 'Qabul komissiyasi a‘zolari, professor-o‘qituvchilar va talaba tadqiqotchilar bilan muloqotga ochiq',
      directChannels: 'To‘g‘ridan-to‘g‘ri Aloqa',
      channelsDesc: 'Hisoblash loyihalarim, tadqiqot savollarim yoki universitet laboratoriyalarida hamkorlik bo‘yicha muloqotni mamnuniyat bilan qabul qilaman.',
      primaryEmail: 'Asosiy Elektron Pochta',
      telephone: 'To‘g‘ridan-to‘g‘ri Telefon',
      copy: 'Nusxalash',
      copied: 'Nusxalandi',
      reposTitle: 'Ilmiy va Kod Repozitoriylari',
      draftTitle: 'Ilmiy Xat Qoralamasi',
      draftDesc: 'Sizning qulay emailingiz orqali yuboriladi',
      inquiryPurpose: 'Murojaat Maqsadi',
      yourName: 'Ismingiz',
      institution: 'Tashkilot / Universitet',
      message: 'Xabar / Savollar',
      sendEmail: 'Email Orqali Yuborish',
      copyDraft: 'Qoralamani Nusxalash',
      draftCopied: 'Qoralama Nusxalandi',
    },
    footer: {
      desc: 'Universitetga qabul uchun intellektual yo‘nalish, mustaqil tadqiqotlar va hisoblash loyihalarini hujjatlashtiruvchi shaxsiy ilmiy portfolio.',
      motto: 'Qiziqishdan Jamiyatga Foydali Hissaga · Anno MMXXVI',
      sections: 'Portfolio Bo‘limlari',
      backToTop: 'Yuqoriga',
      rights: 'Barcha mualliflik kodlari va ilmiy yozuvlar MIT / CC BY 4.0 litsenziyasi ostida.',
      partNotice: 'Bakalavriat Ilmiy Portfoliosi · 1-qism (Shaxsiyat va Ilmiy Izlanishlar)',
    },
    resume: {
      title: 'O‘quv Rezyumesi (CV)',
      subtitle: '· Akademik Monografiya Formati',
      downloadTxt: '.txt Yuklab Olish',
      downloadHtml: '.html Yuklab Olish',
      copyPlain: 'Nusxalash',
      copied: 'Nusxalandi',
      printPdf: 'Chop Etish / PDF',
      close: 'Yopish',
    },
  },
  ru: {
    nav: {
      about: 'Обо мне',
      interests: 'Научные интересы',
      projects: 'Проекты',
      research: 'Исследования',
      achievements: 'Достижения',
      skills: 'Навыки',
      timeline: 'Хронология',
      contact: 'Контакты',
      viewResume: 'Резюме',
      editData: 'Редактировать',
      portfolioTitle: 'Академическое портфолио',
    },
    hero: {
      kicker: 'ПЕРСОНАЛЬНОЕ АКАДЕМИЧЕСКОЕ ПОРТФОЛИО',
      candidateSubtitle: 'Кандидат на поступление в бакалавриат · Осень 2026',
      headline: 'От любознательности к созиданию.',
      exploreWork: 'Исследовать работы',
      viewResume: 'Посмотреть резюме',
      editPlaceholders: 'Редактировать профиль',
      focusTitle: 'Основной фокус',
      focusVal: 'Вычислительные и количественные методы',
      methodTitle: 'Методология',
      methodVal: 'Формальное моделирование и симуляции',
      inquiriesTitle: 'Исследовательские досье',
      inquiriesVal: '3 дисциплины · 2 изыскания',
      targetTitle: 'Цель поступления',
      targetVal: 'Бакалавриат 2026 года',
    },
    about: {
      kicker: '01. НАУЧНАЯ ОРИЕНТАЦИЯ',
      title: 'О моем интеллектуальном развитии',
      subtitle: 'Философия · Подход · Цели',
      learningApproachTitle: 'Подход к обучению',
      uniObjectivesTitle: 'Цели в университете',
      standardTitle: 'Стандарт самостоятельных исследований',
      standardText:
        'Самостоятельные проекты рассматриваются не как внеклассные украшения, а как полноценные лабораторные задачи с версионным контролем, воспроизводимыми отчетами и строгой критикой.',
      principlesTitle: 'Руководящие принципы исследований',
    },
    interests: {
      kicker: '02. НАУЧНЫЕ ГОРИЗОНТЫ',
      title: 'Области академических интересов',
      subtitle: 'Дисциплинарные области и ключевые вопросы для университетских исследований',
      coreTexts: 'Ключевые источники и литература',
      inspectPrototype: 'Открыть связанный вычислительный прототип',
      coreInquiriesTitle: 'Исследуемые научные гипотезы',
      hypothesesBadge: 'Гипотезы',
      statusActive: 'СТАТУС: АКТИВНОЕ ИЗУЧЕНИЕ И ВОСПРОИЗВЕДЕНИЕ',
      statusLevel: 'ИССЛЕДОВАНИЯ БАКАЛАВРСКОГО УРОВНЯ',
    },
    projects: {
      kicker: '03. ИЗБРАННЫЕ АРТЕФАКТЫ',
      title: 'Проекты и кодовые базы',
      searchPlaceholder: 'Поиск по методам, инструментам, темам...',
      showingText: (count, total) => `Показано ${count} из ${total} артефактов`,
      clearSearch: 'Сброс',
      examineMethodology: 'Изучить методологию',
      coreProblem: 'Решаемая проблема:',
      contribution: 'Личный вклад:',
      all: 'Все',
      computational: 'Вычислительные',
      quantitative: 'Количественные',
      cognitive: 'Когнитивные',
    },
    research: {
      kicker: '04. АКАДЕМИЧЕСКИЙ ПОИСК',
      title: 'Самостоятельные исследования и досье',
      subtitle: 'Программы чтения, разведочные эксперименты и обзоры литературы',
      integrityNote:
        'Академическая честность: представленные материалы отражают самостоятельные довузовские исследования и вычислительные эксперименты, а не рецензируемые статьи в научных журналах.',
      centralQuestion: 'Главный исследовательский вопрос',
      methodFramework: 'Методологическая основа',
      keyInsights: 'Предварительные ключевые выводы',
      primarySources: 'Первоисточники и ссылки',
      copyCitation: 'Копировать цитату',
      copied: 'Скопировано',
    },
    achievements: {
      kicker: '05. ПОДТВЕРЖДЕННЫЕ ДОСТИЖЕНИЯ',
      title: 'Олимпиады, награды и сертификаты',
      previewEmpty: 'Предпросмотр пустого состояния',
      showPlaceholders: 'Показать образцы',
      editHonors: 'Редактировать',
      verifiedRecord: 'ПОДТВЕРЖДЕННАЯ ЗАПИСЬ',
      emptyTitle: 'Ожидается ввод подтвержденных наград',
      emptyText:
        'В соответствии с академической честностью вымышленные медали и баллы не отображаются. Официально подтвержденные результаты отображаются здесь.',
      addAchievement: 'Добавить достижение',
    },
    skills: {
      kicker: '06. МЕТОДОЛОГИЧЕСКИЙ АППАРАТ',
      title: 'Навыки и аналитические инструменты',
      subtitle: 'Компетенции, подтвержденные реальными проектами (без произвольных процентов)',
      copySummary: 'Копировать резюме навыков',
      copied: 'Скопировано',
      verifiable: 'ПРОВЕРЯЕМО В РЕПОЗИТОРИИ',
    },
    timeline: {
      kicker: '07. ИНТЕЛЛЕКТУАЛЬНАЯ ТРАЕКТОРИЯ',
      title: 'Хронология развития',
      step: 'Шаг',
      output: 'Зафиксированный результат:',
    },
    contact: {
      kicker: '08. КОРРЕСПОНДЕНЦИЯ',
      title: 'Контакты и научный диалог',
      subtitle: 'Открыт к диалогу с сотрудниками приемных комиссий, профессорами и студентами-исследователями',
      directChannels: 'Прямые каналы связи',
      channelsDesc: 'Буду рад обсудить мои вычислительные проекты, исследовательские гипотезы и возможное участие в лабораториях.',
      primaryEmail: 'Основной Email',
      telephone: 'Телефон / Мобильный',
      copy: 'Копировать',
      copied: 'Скопировано',
      reposTitle: 'Научные и кодовые репозитории',
      draftTitle: 'Черновик научного обращения',
      draftDesc: 'Отправляется через ваш почтовый клиент',
      inquiryPurpose: 'Цель обращения',
      yourName: 'Ваше имя',
      institution: 'Учреждение / Университет',
      message: 'Сообщение / Вопросы',
      sendEmail: 'Отправить через Email',
      copyDraft: 'Копировать черновик',
      draftCopied: 'Черновик скопирован',
    },
    footer: {
      desc: 'Персональное академическое портфолио, документирующее интеллектуальный путь, самостоятельные исследования и проекты для университетской оценки.',
      motto: 'От любознательности к созиданию · Anno MMXXVI',
      sections: 'Разделы портфолио',
      backToTop: 'Наверх',
      rights: 'Все оригинальные кодовые базы и тексты лицензированы под MIT / CC BY 4.0.',
      partNotice: 'Академическое портфолио бакалавра · Часть 1 из 2 (Личность и научный поиск)',
    },
    resume: {
      title: 'Учебное резюме (CV)',
      subtitle: '· Формат академической монографии',
      downloadTxt: 'Скачать .txt',
      downloadHtml: 'Скачать .html',
      copyPlain: 'Копировать',
      copied: 'Скопировано',
      printPdf: 'Печать / PDF',
      close: 'Закрыть',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const stored = localStorage.getItem('academic_portfolio_language') as Language;
      if (stored === 'en' || stored === 'uz' || stored === 'ru') return stored;
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('academic_portfolio_language', lang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
