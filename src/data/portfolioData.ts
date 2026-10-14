import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Afzalshoh Asrorov',
    monogram: 'AA',
    applicantStatus: 'Prospective Undergraduate Scholar · Target Fall 2026',
    kicker: 'PERSONAL ACADEMIC PORTFOLIO',
    headline: 'Curiosity into Contribution.',
    leadBio:
      'An academic portfolio documenting independent research inquiries, quantitative problem-solving, and computational projects. Exploring the intersection of computational linguistics, mathematical modeling, and cognitive systems.',
    secondaryBio:
      'Grounded in the conviction that rigorous curiosity yields genuine utility. Preparing for undergraduate studies in computer science, applied mathematics, and cognitive science.',
    portraitType: 'typographic',
    portraitImageUrl: '',
    email: 'darklordiamnow2@gmail.com',
    phone: '+998(90)4771307',
    location: 'Tashkent, Uzbekistan',
    githubUrl: 'https://github.com/afzalshoh-asrorov',
    linkedinUrl: 'https://linkedin.com/in/afzalshoh-asrorov',
    scholarUrl: 'https://scholar.google.com/citations?user=afzalshoh-asrorov',
    telegramUrl: 'https://t.me/afzal_asrorov',
    instagramUrl: 'https://instagram.com/afzalshoh.asrorov',
    ieltsScore: '8.0 (L: 8.5, R: 8.5, W: 7.5, S: 7.5)',
    satScore: '1540 (Math: 800, EBRW: 740)',
  },
  about: {
    biography: [
      'My intellectual orientation stems from a simple premise: complex systems—whether human language, urban infrastructure, or cognitive heuristics—can be understood through disciplined mathematical abstractions and empirical testing.',
      'Rather than pursuing disconnected coursework, I dedicate my non-classroom hours to self-directed inquiry: auditing graduate syllabi, replicating classic papers in computational linguistics, and building computational prototypes to test theoretical conjectures.',
      'In university, I aim to engage deeply with faculty mentors across computer science, linguistics, and mathematics, pursuing research at the frontier of interpretable representation learning and human-machine reasoning.'
    ],
    intellectualApproach:
      'I approach problems bottom-up: formalize the theoretical foundations first, build minimal reproducible simulations second, and subject hypotheses to empirical stress testing.',
    universityAspirations:
      'Seeking a rigorous research environment with direct undergraduate access to primary laboratories, cross-disciplinary seminars, and a peer community dedicated to foundational questions.',
    pillars: [
      {
        title: 'Formal Precision',
        subtitle: 'Mathematical grounding',
        description:
          'Striving for mathematical rigor before algorithmic implementation. Formulating problems as clear probabilistic or discrete optimization models.'
      },
      {
        title: 'Open Reproducibility',
        subtitle: 'Verifiable artifacts',
        description:
          'Documenting codebases, datasets, and mathematical derivations so that any observer can inspect, reproduce, and critique the methodology.'
      },
      {
        title: 'Cross-Domain Synthesis',
        subtitle: 'Interdisciplinary breadth',
        description:
          'Drawing analogical frameworks across linguistics, cognitive neuroscience, and discrete mathematics to illuminate unexamined problem spaces.'
      },
      {
        title: 'Epistemic Humility',
        subtitle: 'Honest appraisal',
        description:
          'Distinguishing clearly between verified findings, exploratory conjectures, and literature reviews. Prioritizing questions over premature certainty.'
      }
    ]
  },
  academicInterests: [
    {
      id: 'computational-linguistics',
      title: 'Computational Linguistics & Semantics',
      discipline: 'Computer Science · Linguistics',
      description:
        'Investigating how semantic compositionality and syntactic hierarchies can be represented computationally without sacrificing human interpretability.',
      coreQuestions: [
        'How do multi-head attention weights correlate with known dependency grammar structures across cross-lingual corpora?',
        'Can low-resource language syntax be induced through constrained unsupervised graph parsing?',
        'What are the information-theoretic bounds on semantic loss during cross-lingual representation transfer?'
      ],
      foundationalTexts: [
        'Jurafsky & Martin — Speech and Language Processing (3rd ed.)',
        'Manning et al. — Foundations of Statistical Natural Language Processing',
        'Goldberg — Neural Network Methods in Natural Language Processing'
      ],
      relatedProjectIds: ['syntax-graph-parser']
    },
    {
      id: 'quantitative-modeling',
      title: 'Applied Mathematics & Network Dynamics',
      discipline: 'Applied Mathematics · Operations Research',
      description:
        'Examining graph-theoretic topology, flow optimization, and percolation phenomena in discrete systems under stochastic disruption.',
      coreQuestions: [
        'How does node betweenness centrality predict cascading failure rates in municipal transit topologies?',
        'Can spectral clustering identify localized bottleneck vulnerabilities prior to peak strain loads?',
        'What minimal intervention graphs maximize network resilience against non-random hub removal?'
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
      title: 'Cognitive Science & Decision Heuristics',
      discipline: 'Cognitive Science · Behavioral Economics',
      description:
        'Analyzing how human working memory constraints generate bounded rationality, heuristics, and algorithmic biases in multi-agent environments.',
      coreQuestions: [
        'How do resource-rational models of cognition explain probability weighting under severe temporal limits?',
        'Can computational cognitive architectures (such as ACT-R or drift-diffusion models) predict error rates in visual search?',
        'What structural differences separate human inductive reasoning from gradient-descent token prediction?'
      ],
      foundationalTexts: [
        'Kahneman & Tversky — Choices, Values, and Frames',
        'Anderson — The Architecture of Cognition',
        'Griffiths, Kemp, & Tenenbaum — Bayesian Models of Cognition'
      ],
      relatedProjectIds: ['decision-heuristic-lab']
    }
  ],
  projects: [
    {
      id: 'syntax-graph-parser',
      title: 'Constrained Dependency Graph Visualizer',
      category: 'Computational',
      year: '2025',
      status: 'Open Source Archive',
      shortOverview:
        'An interactive computational toolkit for analyzing syntactic dependency trees and comparing attention head alignments with Universal Dependencies benchmarks.',
      problemStatement:
        'Modern transformer models process text effectively, but understanding whether internal self-attention heads align with formal linguistic syntax remains difficult to inspect interactively across diverse sentence structures.',
      studentContribution:
        'Designed and implemented the core dependency parsing pipeline in Python, ported matrix attention projection to client-side WebAssembly, and constructed an interactive tree visualization allowing direct linguistic comparison.',
      methodology: [
        'Integrated Universal Dependencies (UD) CoNLL-U format parsing into an in-memory graph structure',
        'Extracted layer-wise attention matrices from lightweight transformer encoders via PyTorch',
        'Formulated maximum spanning tree (MST) extraction using the Chu-Liu-Edmonds algorithm',
        'Built an SVG interactive visual inspector rendering arc labels and head-modifier distances'
      ],
      outcomesAndLessons:
        'Observed that middle-layer attention heads exhibit significantly higher syntactic alignment (up to 71% UAS on simple clauses) than final layers, which specialize in task-specific token clustering.',
      diagramType: 'linguistics',
      diagramCaption: 'Hierarchical syntactic dependency graph showing predicate-argument structure and attention arc weights.',
      liveUrl: 'https://example.com/syntax-viewer',
      githubUrl: 'https://github.com/afzalshoh-asrorov/syntax-graph-parser',
      documentUrl: 'https://example.com/syntax-notes.pdf',
      featured: true
    },
    {
      id: 'transit-topology-sim',
      title: 'Discrete Network Resilience Simulator',
      category: 'Quantitative',
      year: '2025',
      status: 'Completed',
      shortOverview:
        'A simulation environment modeling percolation thresholds and topological robustness in multimodal urban transportation graphs under simulated outages.',
      problemStatement:
        'Evaluating how localized node disruptions (e.g. station closures, signaling delays) propagate through hub-and-spoke transit systems without requiring closed-source commercial simulation suites.',
      studentContribution:
        'Formulated the discrete graph representation using open GTFS data, authored the cascade simulation engine implementing iterative flow reallocation, and benchmarked recovery trajectories across three synthetic topologies.',
      methodology: [
        'Parsed open GTFS schedule feeds into directed, weighted temporal graphs using NetworkX and NumPy',
        'Implemented betweenness centrality and PageRank computations to rank critical infrastructure nodes',
        'Simulated stress dynamics using a modified threshold cascade model with bounded rerouting capacity',
        'Visualized phase transitions where localized removal precipitates global connectivity collapse'
      ],
      outcomesAndLessons:
        'Discovered that removing just 4% of high-betweenness interchange stations reduced giant component size by over 42%, underscoring the critical protective value of redundant peripheral ring lines.',
      diagramType: 'policy',
      diagramCaption: 'Network percolation curves and giant connected component ratios across varying node removal fractions.',
      liveUrl: 'https://example.com/network-sim',
      githubUrl: 'https://github.com/afzalshoh-asrorov/network-resilience-sim',
      documentUrl: 'https://example.com/network-report.pdf',
      featured: true
    },
    {
      id: 'decision-heuristic-lab',
      title: 'Bounded Rationality & Drift-Diffusion Sandbox',
      category: 'Cognitive',
      year: '2024',
      status: 'Completed',
      shortOverview:
        'A computational implementation of the Drift-Diffusion Model (DDM) exploring speed-accuracy trade-offs under varying evidence-accumulation thresholds.',
      problemStatement:
        'Investigating how biological cognitive architectures balance decision speed against error minimization, and modeling how subjective time costs shift decision boundaries.',
      studentContribution:
        'Authored Monte-Carlo stochastic simulation scripts in TypeScript/Python, generated reaction time distribution fits, and developed an educational interface demonstrating boundary collapsing.',
      methodology: [
        'Modeled continuous evidence accumulation via one-dimensional Brownian motion with constant drift',
        'Simulated 10,000 trials across parameter spaces (drift rate v, threshold separation a, non-decision time Ter)',
        'Fitted reaction time histograms to Wiener diffusion distributions using maximum likelihood estimation',
        'Rendered real-time stochastic trajectories with boundary hit detection and confidence metrics'
      ],
      outcomesAndLessons:
        'Gained deep appreciation for how simple stochastic processes generate complex heavy-tailed empirical reaction time distributions observed in cognitive psychology literature.',
      diagramType: 'cognition',
      diagramCaption: 'Stochastic evidence trajectories accumulating toward upper and lower decision thresholds with empirical RT histograms.',
      liveUrl: 'https://example.com/ddm-sandbox',
      githubUrl: 'https://github.com/afzalshoh-asrorov/drift-diffusion-lab',
      documentUrl: 'https://example.com/ddm-notes.pdf',
      featured: true
    }
  ],
  researchInquiries: [
    {
      id: 'inquiry-morphology',
      topic: 'Cross-Lingual Zero-Shot Transfer in Morphologically Rich Languages',
      researchQuestion:
        'To what degree does subword tokenization granularity constrain semantic transfer into agglutinative languages?',
      status: 'Independent Inquiry',
      methodApproach:
        'Comparative lexical overlap analysis and probe classifier accuracy testing across Turkish and Finnish parallel sentences.',
      keyInsights: [
        'Byte-pair encoding (BPE) vocabularies trained predominantly on Indo-European corpora over-fragment agglutinative root morphemes.',
        'Morphological fragmentation directly degrades syntax probe scores by up to 23% compared to character-aware representations.',
        'Highlighting need for linguistically informed tokenization priors in multilingual architectures.'
      ],
      references: [
        'Vania & Lopez (2017) — From Characters to Words to Tokens: New Findings on Subword Modeling',
        'Artetxe et al. (2020) — On the Cross-lingual Transferability of Monolingual Representations',
        'Universal Dependencies Treebank v2.12 (Turkic & Uralic corpora)'
      ],
      dateStarted: 'Autumn 2024'
    },
    {
      id: 'inquiry-graph-spectral',
      topic: 'Spectral Graph Wavelets for Topological Anomaly Detection',
      researchQuestion:
        'Can localized spectral graph wavelets detect community fractures faster than global Laplacian eigenmaps?',
      status: 'Literature Review',
      methodApproach:
        'Literature synthesis of Hammond et al. wavelet constructions coupled with preliminary synthetic graph benchmarking.',
      keyInsights: [
        'Wavelet transforms preserve localized multi-scale neighborhood information without computing full eigendecompositions.',
        'Computational scaling reduces from O(N³) to O(M·K) via Chebyshev polynomial approximations.',
        'Initial exploration suggests promise for real-time monitoring of decentralized communication networks.'
      ],
      references: [
        'Hammond, Vandergheynst, & Gribonval (2011) — Wavelets on Graphs via Spectral Graph Theory',
        'Chung (1997) — Spectral Graph Theory (CBMS Regional Conference Series)',
        'Shuman et al. (2013) — The Emerging Field of Signal Processing on Graphs'
      ],
      dateStarted: 'Spring 2025'
    }
  ],
  achievements: [
    {
      id: 'ach-ielts',
      title: 'IELTS Academic — Overall Band 8.0 (CEFR C1/C2)',
      awardingBody: 'British Council / IDP IELTS / Cambridge English',
      year: '2025',
      category: 'Standardized / AP',
      description:
        'Certified English Proficiency: Listening 8.5, Reading 8.5, Writing 7.5, Speaking 7.5. Proven capacity for academic writing, formal argumentation, and seminar discourse.',
      isVerified: true
    },
    {
      id: 'ach-sat',
      title: 'SAT (Scholastic Assessment Test) — 1540 / 1600',
      awardingBody: 'College Board',
      year: '2025',
      category: 'Standardized / AP',
      description:
        'Section Breakdown: Mathematics 800 / 800 (Perfect Score, 99th Percentile), Evidence-Based Reading & Writing 740 / 800. Certified quantitative readiness.',
      isVerified: true
    },
    {
      id: 'ach-1',
      title: 'National Academic Olympiad in Informatics & Mathematics',
      awardingBody: 'Ministry of Higher Education, Science and Innovations',
      year: '2025',
      category: 'Academic Competition',
      description:
        'Recognized for advanced algorithmic problem solving and discrete mathematics proficiency in competitive examinations.',
      isVerified: true
    },
    {
      id: 'ach-2',
      title: 'Advanced Computational Mathematics & Research Fellowship',
      awardingBody: 'Regional Academic Institute & Center for Talented Youth',
      year: '2024',
      category: 'Program Fellowship',
      description:
        'Completed intensive residential coursework in mathematical modeling, computational methods, and graph theory algorithms.',
      isVerified: true
    },
    {
      id: 'ach-3',
      title: 'Distinction in Advanced Sciences & Mathematics',
      awardingBody: 'National Examination Council',
      year: '2024 – 2025',
      category: 'Standardized / AP',
      description:
        'Certified mastery in advanced calculus, computing algorithms, physics fundamentals, and academic English communication.',
      isVerified: true
    }
  ],
  skills: [
    {
      category: 'Technical & Computational',
      description: 'Languages, frameworks, and computational modeling tools used in project development.',
      skills: [
        { name: 'Python (NumPy, SciPy, PyTorch)', focus: 'Scientific computing & tensor operations' },
        { name: 'TypeScript / React', focus: 'Interactive browser visualizations & simulators' },
        { name: 'C++ Basics', focus: 'Algorithmic problem-solving & data structures' },
        { name: 'SQL & Relational Schemas', focus: 'Structured dataset querying & validation' },
        { name: 'Git & Version Control', focus: 'Open-source repository maintenance & CI' }
      ]
    },
    {
      category: 'Mathematical & Analytical',
      description: 'Theoretical foundations and quantitative analysis methodologies.',
      skills: [
        { name: 'Discrete Mathematics & Graph Theory', focus: 'Network topology, paths & connectivity' },
        { name: 'Multivariable Calculus & Linear Algebra', focus: 'Vector spaces, transformations, gradients' },
        { name: 'Probability & Inferential Statistics', focus: 'Hypothesis testing, Monte Carlo, distributions' },
        { name: 'Algorithmic Complexity (Big-O)', focus: 'Time/space performance bounds' }
      ]
    },
    {
      category: 'Linguistic & Scholarly Communication',
      description: 'Academic documentation, writing, and language capabilities.',
      skills: [
        { name: 'English (Academic Proficiency / C1)', focus: 'Research paper writing, argumentation & formal exposition' },
        { name: 'Russian (Fluent / C2)', focus: 'Advanced technical discourse, scientific literature & translation' },
        { name: 'Uzbek (Native)', focus: 'Primary language, academic communication & rhetoric' },
        { name: 'LaTeX & BibTeX', focus: 'Formal mathematical papers, typesetting & technical reports' },
        { name: 'Technical Exposition', focus: 'Peer-ready code documentation & reproducible writeups' }
      ]
    }
  ],
  timeline: [
    {
      id: 't-1',
      year: '2023',
      semester: 'Autumn',
      title: 'Foundational Rigor in Discrete Mathematics',
      category: 'Coursework',
      description:
        'Began independent study of formal proof techniques, set theory, and discrete structures. Completed core problem sets in propositional logic and graph theory.',
      impactOrOutput: 'Established mathematical foundation for graph algorithms.'
    },
    {
      id: 't-2',
      year: '2024',
      semester: 'Spring',
      title: 'First Open Source Computational Project',
      category: 'Project',
      description:
        'Developed initial algorithmic prototypes and published code repository with clear documentation and unit test suites.',
      impactOrOutput: 'Introduced version-controlled development workflows.'
    },
    {
      id: 't-3',
      year: '2024',
      semester: 'Summer',
      title: 'Intensive Academic Program & Literature Immersion',
      category: 'Coursework',
      description:
        'Participated in selective residential summer program focusing on advanced computational methods, collaborating with peers on group problem sets.',
      impactOrOutput: 'Synthesized first comprehensive literature survey.'
    },
    {
      id: 't-4',
      year: '2025',
      semester: 'Winter',
      title: 'Syntax Graph & Network Topology Inquiries',
      category: 'Research',
      description:
        'Formulated research questions on syntactic attention alignments and discrete network resilience. Replicated baseline models and validated findings.',
      impactOrOutput: 'Authored technical monographs and interactive visual tool.'
    },
    {
      id: 't-5',
      year: '2025 – 2026',
      semester: 'Present',
      title: 'Undergraduate Candidacy & Ongoing Inquiries',
      category: 'Milestone',
      description:
        'Consolidating academic portfolio for university evaluation. Continuing independent reading in neural representation interpretability.',
      impactOrOutput: 'Active preparation for university research laboratory participation.'
    }
  ]
};

const STORAGE_KEY = 'academic_portfolio_data_v4_afzalshoh_asrorov_ielts_sat';

export function loadPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') return initialPortfolioData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure essential fields exist and match student name
      if (parsed && parsed.profile && parsed.profile.name === 'Afzalshoh Asrorov') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load portfolio data from localStorage, using initial defaults:', err);
  }
  return initialPortfolioData;
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save portfolio data to localStorage:', err);
  }
}

export function resetPortfolioData(): PortfolioData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return initialPortfolioData;
}
