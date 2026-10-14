import { PortfolioData } from '../types/portfolio';
import { Language } from '../context/LanguageContext';

export function getLocalizedPortfolioData(base: PortfolioData, lang: Language): PortfolioData {
  if (lang === 'en') {
    return base;
  }

  if (lang === 'uz') {
    return {
      ...base,
      profile: {
        ...base.profile,
        applicantStatus: 'Bakalavriat Nomzodi · Maqsad: 2026-yil Kuzi',
        kicker: 'SHAXSIY ILMIY PORTFOLIO',
        headline: 'Qiziqishdan Jamiyatga Foydali Hissaga.',
        leadBio:
          'Mustaqil ilmiy izlanishlar, miqdoriy tahlillar va dasturiy loyihalarni jamlagan akademik portfolio. Kompyuter lingvistikasi, matematik modellashtirish va kognitiv tizimlar kesishmasini o‘rganishga bag‘ishlangan.',
        secondaryBio:
          'Qat‘iy ilmiy qiziqish jamiyatga real naf keltiradi degan e‘tiqoddaman. Kompyuter fanlari (Computer Science), amaliy matematika va kognitiv fanlar bo‘yicha bakalavriat ta‘limiga tayyorgarlik ko‘rmoqdaman.',
        location: 'Toshkent, O‘zbekiston',
        ieltsScore: 'IELTS 8.0 (Eshitish: 8.5, O‘qish: 8.5, Yozish: 7.5, So‘zlashish: 7.5)',
        satScore: 'SAT 1540 (Matematika: 800, O‘qish va Yozish: 740)',
      },
      about: {
        ...base.about,
        biography: [
          'Mening intellektual yo‘nalishim oddiy haqiqatga tayanadi: inson tili, shahar infratuzilmasi yoki qaror qabul qilish mexanizmlari kabi murakkab tizimlarni qat‘iy matematik modellar va empirik sinovlar orqali tushunish mumkin.',
          'Darslardan tashqari bo‘sh vaqtimni mustaqil ilmiy izlanishlarga bag‘ishlayman: yetakchi universitetlar o‘quv dasturlarini o‘rganish, kompyuter lingvistikasidagi klassik ilmiy maqolalarni qayta tekshirish va nazariy gipotezalarni sinash uchun hisoblash modellarini yaratish bilan shug‘ullanaman.',
          'Universitetda kompyuter fanlari, tilshunoslik va matematika bo‘yicha yetakchi professorlar bilan birga talqin qilinuvchi sun‘iy intellekt va inson-mashina mantiqiy fikrlashi sohasida chuqur ilmiy tadqiqotlar olib borishni maqsad qilganman.'
        ],
        intellectualApproach:
          'Muammolarga poydevordan yondashaman: avval nazariy asoslarni shakllantiraman, so‘ng minimal takrorlanuvchi simulyatsiyalar quraman va gipotezalarni empirik ma‘lumotlarda sinovdan o‘tkazaman.',
        universityAspirations:
          'Birinchi kursdanoq ilg‘or ilmiy laboratoriyalarda ishlash imkoniyatiga ega, fanlararo seminarlar o‘tkaziladigan va fundamental savollarga javob izlaydigan iqtidorli jamoani qidirmoqdaman.',
        pillars: [
          {
            title: 'Formal Qat‘iyat',
            subtitle: 'Matematik asos',
            description: 'Dasturiy kod yozishdan oldin matematik aniqlik. Muammolarni aniq ehtimollik yoki optimallashtirish modellari sifatida shakllantirish.'
          },
          {
            title: 'Ochiq Takrorlanuvchanlik',
            subtitle: 'Tekshiriluvchi artefaktlar',
            description: 'Kodlar, ma‘lumotlar to‘plami va matematik hisob-kitoblarni har qanday kuzatuvchi tekshirishi va takrorlashi uchun ochiq hujjatlashtirish.'
          },
          {
            title: 'Fanlararo Sintez',
            subtitle: 'Keng ilmiy qamrov',
            description: 'Yangi muammolarni yoritish uchun tilshunoslik, kognitiv nevrologiya va diskret matematika usullarini birlashtirish.'
          },
          {
            title: 'Epistemik Kamtarlik',
            subtitle: 'Halol ilmiy baholash',
            description: 'Tasdiqlangan ilmiy xulosalar, dastlabki taxminlar va adabiyotlar tahlilini aniq farqlash. Shoshilinch xulosalardan ko‘ra teran savollarni ustun qo‘yish.'
          }
        ]
      },
      academicInterests: [
        {
          id: 'computational-linguistics',
          title: 'Kompyuter Lingvistikasi va Semantika',
          discipline: 'Kompyuter Fanlari · Tilshunoslik',
          description:
            'Semantik kompozitsionlik va sintaktik ierarxiyalarni inson tushunadigan shaklda qanday ifodalash mumkinligini hisoblash usullari orqali tadqiq qilish.',
          coreQuestions: [
            'Diqqat (Attention) mexanizmi og‘irliklari turli tillardagi tobelik grammatikasi bilan qanday mos keladi?',
            'Kam resursli tillar sintaksisini nazoratsiz graf tahlili orqali tiklash mumkinmi?',
            'Tillalararo tasvirlarni o‘tkazishda semantik yo‘qotishning axborot-nazariy chegaralari nimalardan iborat?'
          ],
          foundationalTexts: [
            'Jurafsky & Martin — Speech and Language Processing (3-nashr)',
            'Manning et al. — Foundations of Statistical Natural Language Processing',
            'Goldberg — Neural Network Methods in Natural Language Processing'
          ],
          relatedProjectIds: ['syntax-graph-parser']
        },
        {
          id: 'quantitative-modeling',
          title: 'Amaliy Matematika va Tarmoq Dinamikasi',
          discipline: 'Amaliy Matematika · Amallarni Tadqiq Qilish',
          description:
            'Graf nazariyasi topologiyasi, oqimlarni optimallashtirish va tizimlarning tasodifiy uzilishlarga chidamliligini o‘rganish.',
          coreQuestions: [
            'Tugunlarning markaziylik ko‘rsatkichlari transport tarmog‘idagi kaskadli nosozliklarni qanday bashorat qiladi?',
            'Spektral klasterlash eng yuqori yuklanishdan oldin to‘siqlarni aniqlay oladimi?',
            'Tarmoq chidamliligini oshirish uchun qanday minimal qo‘shimcha bog‘lamlar zarur?'
          ],
          foundationalTexts: [
            'Newman — Networks: An Introduction (Oxford University Press)',
            'Strogatz — Nonlinear Dynamics and Chaos',
            'Boyd & Vandenberghe — Convex Optimization'
          ],
          relatedProjectIds: ['transit-topology-sim']
        },
        {
          id: 'cognitive-systems',
          title: 'Kognitiv Fanlar va Qaror Qabul Qilish',
          discipline: 'Kognitiv Fanlar · Xulq-atvor Iqtisodiyoti',
          description:
            'Cheklangan ratsionallik, noaniqlik ostida ma‘lumot yig‘ish va kognitiv og‘ishlarni hisoblash modellari orqali tahlil qilish.',
          coreQuestions: [
            'Diffuziya-drift modellari vaqt bosimi ostidagi inson qarorlarini qanday tushuntiradi?',
            'Tezkor evristikalar murakkab optimallashtirish algoritmlaridan qaysi hollarda ustun keladi?',
            'Kognitiv yuklanish ehtimollik baholashlariga qanday ta‘sir ko‘rsatadi?'
          ],
          foundationalTexts: [
            'Kahneman — Thinking, Fast and Slow',
            'Gigerenzer et al. — Simple Heuristics That Make Us Smart',
            'Ratcliff & McKoon — The Diffusion Decision Model'
          ],
          relatedProjectIds: ['decision-heuristic-lab']
        }
      ],
      projects: base.projects.map((p) => {
        if (p.id === 'syntax-graph-parser') {
          return {
            ...p,
            title: 'Sintaktik Bog‘liqlik Grafi Tahlilchisi',
            shortOverview: 'Murakkab jumlalarni daraxt va graf shaklida tahlil qiluvchi interaktiv vosita.',
            problemStatement: 'Standart tabiiy til modellarida sintaktik tobelik munosabatlarini vizual tushunish murakkab. Ushbu vosita tobelik grammatikasini to‘g‘ridan-to‘g‘ri vizual tekshirish imkonini beradi.',
            studentContribution: 'Formal tobelik grammatikasi algoritmini mustaqil ishlab chiqdim, interaktiv SVG vizualizatsiyasini yaratdim.',
          };
        }
        if (p.id === 'transit-topology-sim') {
          return {
            ...p,
            title: 'Tarmoq Chidamliligi va Perkolatsiya Simulyatori',
            shortOverview: 'Markaziy tugunlar ishdan chiqqanda tarmoq parchalanuvini hisoblovchi interaktiv model.',
            problemStatement: 'Infratuzilma tarmoqlarida markaziy bog‘lamlar uzilganda kaskadli halokat yuz beradi. Ushbu model kritik chegarani (pc) oldindan hisoblab beradi.',
            studentContribution: 'Perkolatsiya egri chizig‘i tenglamalarini dasturladim, real vaqtda interaktiv sinov vositasini yaratdim.',
          };
        }
        if (p.id === 'decision-heuristic-lab') {
          return {
            ...p,
            title: 'Drift-Diffuziya Kognitiv Qarorlar Laboratoriyasi',
            shortOverview: 'Inson miyasining noaniqlik ostida dalillarni to‘plash va xulosa chiqarish jarayonini simulyatsiya qiluvchi tizim.',
            problemStatement: 'Qaror qabul qilish tezligi va aniqligi o‘rtasidagi kompromissni stoxastik diffuziya modellari orqali tushuntirish.',
            studentContribution: 'Viner stoxastik jarayonini diskret vaqt bo‘yicha amalga oshirdim, real vaqtda trayektoriyalarni chizuvchi SVG modellarini qurdik.',
          };
        }
        return p;
      }),
      achievements: [
        {
          id: 'ach-ielts',
          title: 'IELTS Academic — Umumiy Ball 8.0 (CEFR C1/C2)',
          awardingBody: 'British Council / IDP IELTS / Cambridge English',
          year: '2025',
          category: 'Standardized / AP',
          description:
            'Tasdiqlangan Ingliz Tili Mahorati: Eshitish 8.5, O‘qish 8.5, Yozish 7.5, So‘zlashish 7.5. Xalqaro akademik ilmiy maqolalar yozish va ilmiy muhokamalarda erkin ishtirok etish darajasi.',
          isVerified: true
        },
        {
          id: 'ach-sat',
          title: 'SAT (Scholastic Assessment Test) — 1540 / 1600',
          awardingBody: 'College Board',
          year: '2025',
          category: 'Standardized / AP',
          description:
            'Bo‘limlar: Matematika 800 / 800 (Mutlaq Maksimal Ball, 99-persentil), Matn Tahlili va Yozish 740 / 800. Kuchli analitik va miqdoriy tayyorgarlik tasdig‘i.',
          isVerified: true
        },
        {
          id: 'ach-1',
          title: 'Informatika va Matematika Bo‘yicha Respublika Fan Olimpiadasi',
          awardingBody: 'Oliy Ta‘lim, Fan va Innovatsiyalar Vazirligi',
          year: '2025',
          category: 'Academic Competition',
          description:
            'Murakkab algoritmlarni loyihalash va diskret matematika masalalarini yechish bo‘yicha yuqori natijalar uchun e‘tirof etilgan.',
          isVerified: true
        },
        {
          id: 'ach-2',
          title: 'Ilg‘or Hisoblash Matematikasi Ilmiy Dasturi Ishtirokchisi',
          awardingBody: 'Mintaqaviy Ilmiy Institut va Iqtidorli Yoshlar Markazi',
          year: '2024',
          category: 'Program Fellowship',
          description:
            'Matematik modellashtirish, hisoblash usullari va graf nazariyasi algoritmlari bo‘yicha chuqurlashtirilgan o‘quv kursini muvaffaqiyatli tamomlagan.',
          isVerified: true
        },
        {
          id: 'ach-3',
          title: 'Aniq Fanlar va Matematika Bo‘yicha Maxsus Diplom',
          awardingBody: 'Milliy Imtihon Kengashi',
          year: '2024 – 2025',
          category: 'Standardized / AP',
          description:
            'Oliy matematika, kompyuter algoritmlari, fundamental fizika va akademik ingliz tili bo‘yicha yuqori tayyorgarlik sertifikati.',
          isVerified: true
        }
      ],
      skills: [
        {
          category: 'Texnik va Dasturiy Vositalar',
          description: 'Ilmiy tadqiqotlar va hisoblash modellarida qo‘llaniladigan dasturlash tillari va kutubxonalar.',
          skills: [
            { name: 'Python (NumPy, SciPy, PyTorch)', focus: 'Ilmiy hisoblashlar va neyron tarmoqlar' },
            { name: 'TypeScript / React', focus: 'Interaktiv brauzer simulyatsiyalari va vizual modellar' },
            { name: 'C++ Asoslari', focus: 'Algoritmik masalalar va samarali ma‘lumotlar tuzilmalari' },
            { name: 'SQL va Relyatsion Baza', focus: 'Tuzilmali ma‘lumotlarni filtrlash va so‘rovlar' },
            { name: 'Git & GitHub', focus: 'Kod versiyalarini boshqarish va ochiq manbali loyihalar' }
          ]
        },
        {
          category: 'Matematik va Nazariy Tahlil',
          description: 'Nazariy poydevor va miqdoriy tahlil metodologiyasi.',
          skills: [
            { name: 'Diskret Matematika va Graf Nazariyasi', focus: 'Tarmoq topologiyasi, yo‘llar va bog‘liqlik' },
            { name: 'Chiziqli Algebra va Differensial Hisob', focus: 'Vektor fazolari, matritsalar, gradientlar' },
            { name: 'Ehtimollar Nazariyasi va Statistika', focus: 'Tasodifiy o‘zgaruvchilar, gipotezalarni tekshirish' },
            { name: 'Algoritmlar Murakkabligi', focus: 'Katta-O asimptotik tahlili va optimallashtirish' }
          ]
        },
        {
          category: 'Til va Akademik Muloqot',
          description: 'Ilmiy hujjatlashtirish, tahliliy yozuv va tillarni bilish darajasi.',
          skills: [
            { name: 'Ingliz Tili (IELTS 8.0 / C1-C2)', focus: 'Ilmiy maqolalar, formal bahs va akademik nutq' },
            { name: 'O‘zbek Tili (Ona Tili)', focus: 'Mukammal yozma va og‘zaki adabiy mahorat' },
            { name: 'Rus Tili (Erkin / C1-C2)', focus: 'Texnik va ilmiy adabiyotlarni to‘liq tushunish' },
            { name: 'LaTeX & BibTeX', focus: 'Matematik maqolalar va ilmiy hisobotlar formati' }
          ]
        }
      ]
    };
  }

  // Russian translations
  return {
    ...base,
    profile: {
      ...base.profile,
      applicantStatus: 'Кандидат на поступление в бакалавриат · Осень 2026',
      kicker: 'ПЕРСОНАЛЬНОЕ АКАДЕМИЧЕСКОЕ ПОРТФОЛИО',
      headline: 'От любознательности к созиданию.',
      leadBio:
        'Академическое портфолио, документирующее самостоятельные исследования, количественные методы и программные разработки на стыке компьютерной лингвистики, математического моделирования и когнитивных наук.',
      secondaryBio:
        'Основано на убеждении, что строгая любознательность приносит реальную пользу обществу. Подготовка к поступлению на программы Computer Science, прикладной математики и когнитивных наук.',
      location: 'Ташкент, Узбекистан',
      ieltsScore: 'IELTS 8.0 (Аудирование: 8.5, Чтение: 8.5, Письмо: 7.5, Говорение: 7.5)',
      satScore: 'SAT 1540 (Математика: 800, Чтение и Письмо: 740)',
    },
    about: {
      ...base.about,
      biography: [
        'Моя интеллектуальная ориентация исходит из простого тезиса: сложные системы — будь то человеческий язык, транспортные сети или когнитивные механизмы — познаваемы через математическую строгость и эмпирическую проверку.',
        'Свободное время я посвящаю самостоятельному поиску: освоению университетских программ, воспроизведению классических статей по компьютерной лингвистике и созданию вычислительных прототипов для проверки теоретических гипотез.',
        'В университете я стремлюсь работать с ведущими профессорами в области информатики, математики и лингвистики над проблемами интерпретируемого машинного обучения и человеко-машинного рассуждения.'
      ],
      intellectualApproach:
        'Я подхожу к задачам фундаментально: сначала строгая теоретическая модель, затем минимальная воспроизводимая симуляция и тщательное эмпирическое стресс-тестирование.',
      universityAspirations:
        'Ищу сильную исследовательскую среду с прямым доступом к лабораториям с первого курса, междисциплинарными семинарами и увлеченным научным сообществом.',
      pillars: [
        {
          title: 'Формальная строгость',
          subtitle: 'Математический фундамент',
          description: 'Приоритет математической ясности перед написанием кода. Формулирование задач как четких вероятностных или оптимизационных моделей.'
        },
        {
          title: 'Открытая воспроизводимость',
          subtitle: 'Проверяемые артефакты',
          description: 'Документирование кодовых баз, наборов данных и вычислений для легкой независимой проверки и критики коллегами.'
        },
        {
          title: 'Междисциплинарный синтез',
          subtitle: 'Широта охвата',
          description: 'Использование методов лингвистики, когнитивной нейронауки и дискретной математики для решения новых задач.'
        },
        {
          title: 'Эпистемическая скромность',
          subtitle: 'Честная научная оценка',
          description: 'Четкое разделение подтвержденных фактов, гипотез и обзоров литературы. Глубокие вопросы важнее поспешной уверенности.'
        }
      ]
    },
    academicInterests: [
      {
        id: 'computational-linguistics',
        title: 'Компьютерная лингвистика и семантика',
        discipline: 'Компьютерные науки · Лингвистика',
        description:
          'Исследование вычислительного представления семантической композициональности и синтаксических иерархий с сохранением человеческой интерпретируемости.',
        coreQuestions: [
          'Как веса внимания (Attention) соотносятся со структурами грамматики зависимостей в многоязычных корпусах?',
          'Возможно ли восстанавливать синтаксис малоресурсных языков с помощью графового анализа без учителя?',
          'Каковы информационно-теоретические пределы потери семантики при переносе представлений между языками?'
        ],
        foundationalTexts: [
          'Jurafsky & Martin — Speech and Language Processing (3-е изд.)',
          'Manning et al. — Foundations of Statistical Natural Language Processing',
          'Goldberg — Neural Network Methods in Natural Language Processing'
        ],
        relatedProjectIds: ['syntax-graph-parser']
      },
      {
        id: 'quantitative-modeling',
        title: 'Прикладная математика и динамика сетей',
        discipline: 'Прикладная математика · Исследование операций',
        description:
          'Анализ топологии теории графов, оптимизация потоков и перколяционные процессы в дискретных системах при случайных сбоях.',
        coreQuestions: [
          'Как показатели центральности узлов предсказывают каскадные сбои в транспортных сетях?',
          'Способна ли спектральная кластеризация выявлять узкие места до наступления пиковых нагрузок?',
          'Каковы минимальные топологические дополнения для максимизации устойчивости сети к отказам узлов?'
        ],
        foundationalTexts: [
          'Newman — Networks: An Introduction (Oxford University Press)',
          'Strogatz — Nonlinear Dynamics and Chaos',
          'Boyd & Vandenberghe — Convex Optimization'
        ],
        relatedProjectIds: ['transit-topology-sim']
      },
      {
        id: 'cognitive-systems',
        title: 'Когнитивные науки и эвристики решений',
        discipline: 'Когнитивные науки · Поведенческая экономика',
        description:
          'Исследование ограниченной рациональности, накопления информации в условиях неопределенности и вычислительных моделей когнитивных искажений.',
        coreQuestions: [
          'Как диффузионные модели объясняют компромисс скорости и точности человеческих решений?',
          'В каких условиях быстрые эвристики превосходят сложные алгоритмы оптимизации?',
          'Как когнитивная нагрузка искажает вероятностные оценки исходов?'
        ],
        foundationalTexts: [
          'Kahneman — Thinking, Fast and Slow',
          'Gigerenzer et al. — Simple Heuristics That Make Us Smart',
          'Ratcliff & McKoon — The Diffusion Decision Model'
        ],
        relatedProjectIds: ['decision-heuristic-lab']
      }
    ],
    projects: base.projects.map((p) => {
      if (p.id === 'syntax-graph-parser') {
        return {
          ...p,
          title: 'Синтаксический графовый парсер зависимостей',
          shortOverview: 'Интерактивный анализатор синтаксических деревьев и иерархических структур предложений.',
          problemStatement: 'В стандартных языковых моделях синтаксические взаимосвязи скрыты. Данный инструмент делает синтаксические деревья зависимостей наглядными и проверяемыми.',
          studentContribution: 'Разработал алгоритм построения дерева зависимостей и создал интерактивный SVG-интерфейс визуализации.',
        };
      }
      if (p.id === 'transit-topology-sim') {
        return {
          ...p,
          title: 'Симулятор устойчивости сетей и перколяции',
          shortOverview: 'Модель фрагментации сети при отказе ключевых узлов и оценка критического порога.',
          problemStatement: 'При отказе центральных хабов в инфраструктуре возникает лавинообразный сбой. Модель рассчитывает порог связности (pc).',
          studentContribution: 'Запрограммировал перколяционные уравнения и создал интерактивный график для исследования устойчивости в реальном времени.',
        };
      }
      if (p.id === 'decision-heuristic-lab') {
        return {
          ...p,
          title: 'Когнитивная лаборатория дрейф-диффузионных решений',
          shortOverview: 'Симуляция процесса накопления свидетельств и принятия решений в условиях стохастического шума.',
          problemStatement: 'Объяснение компромисса между скоростью и точностью принятия решений при помощи стохастических диффузионных уравнений.',
          studentContribution: 'Реализовал винеровский стохастический процесс и построил интерактивную визуализацию траекторий.',
        };
      }
      return p;
    }),
    achievements: [
      {
        id: 'ach-ielts',
        title: 'IELTS Academic — Общий балл 8.0 (CEFR C1/C2)',
        awardingBody: 'British Council / IDP IELTS / Cambridge English',
        year: '2025',
        category: 'Standardized / AP',
        description:
          'Подтвержденное владение академическим английским: Аудирование 8.5, Чтение 8.5, Письмо 7.5, Говорение 7.5. Полная готовность к научной работе и публикациям на международном уровне.',
        isVerified: true
      },
      {
        id: 'ach-sat',
        title: 'SAT (Scholastic Assessment Test) — 1540 / 1600',
        awardingBody: 'College Board',
        year: '2025',
        category: 'Standardized / AP',
        description:
          'Результаты по секциям: Математика 800 / 800 (Абсолютный максимум, 99-й процентиль), Чтение и Письмо 740 / 800. Подтвержденная количественная и логическая готовность.',
        isVerified: true
      },
      {
        id: 'ach-1',
        title: 'Республиканская олимпиада по информатике и математике',
        awardingBody: 'Министерство высшего образования, науки и инноваций',
        year: '2025',
        category: 'Academic Competition',
        description:
          'Отмечен за высокое мастерство в олимпиадном программировании, структурах данных и дискретной математике.',
        isVerified: true
      },
      {
        id: 'ach-2',
        title: 'Стипендия программы углубленной вычислительной математики',
        awardingBody: 'Региональный научный институт и Центр для одаренной молодежи',
        year: '2024',
        category: 'Program Fellowship',
        description:
          'Успешно завершил интенсивную программу по математическому моделированию, численным методам и графовым алгоритмам.',
        isVerified: true
      },
      {
        id: 'ach-3',
        title: 'Диплом с отличием по точным наукам и математике',
        awardingBody: 'Национальный экзаменационный совет',
        year: '2024 – 2025',
        category: 'Standardized / AP',
        description:
          'Сертифицированное превосходство в высшей математике, компьютерных алгоритмах, физике и академическом английском.',
        isVerified: true
      }
    ],
    skills: [
      {
        category: 'Технические и программные инструменты',
        description: 'Языки программирования, библиотеки и среды, применяемые в вычислительных проектах.',
        skills: [
          { name: 'Python (NumPy, SciPy, PyTorch)', focus: 'Научные вычисления, анализ данных и тензоры' },
          { name: 'TypeScript / React', focus: 'Интерактивные браузерные симуляторы и визуализации' },
          { name: 'Основы C++', focus: 'Олимпиадные алгоритмы и эффективные структуры данных' },
          { name: 'SQL и реляционные схемы', focus: 'Структурированные запросы и валидация данных' },
          { name: 'Git & GitHub', focus: 'Контроль версий, CI/CD и поддержка открытых репозиториев' }
        ]
      },
      {
        category: 'Математический и аналитический аппарат',
        description: 'Теоретический фундамент и методология количественного анализа.',
        skills: [
          { name: 'Дискретная математика и теория графов', focus: 'Топология сетей, пути, связность' },
          { name: 'Линейная алгебра и математический анализ', focus: 'Векторные пространства, матрицы, градиенты' },
          { name: 'Теория вероятностей и статистика', focus: 'Случайные процессы, проверка статистических гипотез' },
          { name: 'Сложность алгоритмов', focus: 'О-символика, вычислительная асимптотика и оптимизация' }
        ]
      },
      {
        category: 'Языки и академическая коммуникация',
        description: 'Академическая документация, научное письмо и уровень владения языками.',
        skills: [
          { name: 'Английский язык (IELTS 8.0 / C1-C2)', focus: 'Написание научных статей, формальная аргументация' },
          { name: 'Узбекский язык (Родной)', focus: 'Свободное академическое и литературное владение' },
          { name: 'Русский язык (Свободно / C1-C2)', focus: 'Научно-техническая литература и исследования' },
          { name: 'LaTeX & BibTeX', focus: 'Оформление математических статей и научных отчетов' }
        ]
      }
    ]
  };
}
