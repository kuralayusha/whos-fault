export default {
  // Korece çeviriler
  home: {
    title: "Super Blamer 3000",
    subtitle: "AI가 책임을 찾는 동안 편하게 쉬세요 🤔",
    quote: "다른 사람을 비난하는 것은 예술입니다, 우리는 사랑으로 합니다",
    description:
      "누구의 잘못인지 스트레스 받지 마세요, AI가 드라마를 처리합니다 ✨",
    buttons: {
      getStarted: "시작하기",
      learnMore: "작동 방식",
    },
  },
  start: {
    title: "비난 방법 선택하기 🎯",
    description: "책임을 분배할 방법을 선택하세요 👇",
    options: {
      fiftyFifty: {
        title: "운명의 바퀴 🎡",
        description: "바퀴를 돌려 운명이 누구의 잘못인지 결정하게 하세요 ✨",
      },
      numberGuess: {
        title: "숫자의 심판 🎲",
        description: "운명의 숫자가 누가 더 잘못했는지 결정하게 하세요 ⚖️",
      },
      aiAnalysis: {
        title: "AI 판사 🤖",
        description:
          "AI가 이야기를 분석하고 날카로운 평가와 함께 판단을 내립니다 🔍",
      },
    },
    blameStats: {
      count: "지금까지 {{count}}번의 성공적인 비난 😈",
    },
  },
  fiftyFifty: {
    title: "운명의 결정",
    description: "두 사람의 이름을 입력하고 비난의 바퀴가 결정하게 하세요",
    form: {
      firstPerson: "첫 번째 사람 이름",
      secondPerson: "두 번째 사람 이름",
      blameButton: "비난하기!",
      spinning: "결정 중...",
      goHome: "새로운 방법 선택",
    },
    results: {
      accusations: [
        "{{name}}, 어떻게 이럴 수 있어! 😱",
        "우리 모두 {{name}} 때문에 실망했어! 😤",
        "{{name}}, 이건 용납할 수 없어! 😠",
        "{{name}}, 난 네가 더 잘할 줄 알았는데! 😔",
        "{{name}}, 부끄러워해야 해! 😡",
        "정말 별로야 {{name}}, 전혀 멋지지 않아! 🙄",
        "{{name}}, 이번엔 정말 망쳤구나! 🤦",
        "믿을 수가 없어, {{name}}! 😫",
        "{{name}}, 대체 뭘 생각한 거야?! 🤔",
        "이건 전부 {{name}} 네 잘못이야! 👉",
        "{{name}} 때문에 우리는 좋은 것을 가질 수 없어! 💔",
        "이제 모두가 널 보고 있어, {{name}}! 👀",
        "{{name}}, 설명해야 할 게 많겠는데! ⚠️",
        "잘했어 {{name}}, 다 망쳐놨네! 💥",
        "{{name}}, 이래서 우리가 신뢰 문제가 있는 거야! 🔒",
      ],
    },
  },
  numberGuess: {
    title: "숫자가 심판합니다",
    description: "이름과 숫자를 입력하면 운명이 선택합니다",
    form: {
      firstPerson: "첫 번째 사람 이름",
      firstNumber: "첫 번째 사람의 숫자 (0-100)",
      secondPerson: "두 번째 사람 이름",
      secondNumber: "두 번째 사람의 숫자 (0-100)",
      targetNumber: "운명의 숫자",
      blameButton: "운명 공개!",
      spinning: "결정 중...",
      goHome: "새로운 방법 선택",
      middleNumberError: "속임수 안 돼요! 50은 금지됐어요! 😠",
      sameNumberError: "두 플레이어가 같은 숫자를 선택할 수 없어요! 🚫",
    },
  },
  aiAnalysis: {
    title: "AI가 심판합니다",
    description: "당신의 이야기를 들려주세요, AI가 누구의 잘못인지 결정합니다",
    form: {
      firstPerson: "첫 번째 사람 이름",
      firstStory: "당신의 이야기를 들려주세요...",
      secondPerson: "두 번째 사람 이름",
      secondStory: "당신의 이야기를 들려주세요...",
      analyzeButton: "분석 & 평가하기!",
      analyzing: "AI가 판단 중...",
      goHome: "새로운 방법 선택",
    },
  },
  common: {
    backToMethods: "방법 선택으로 돌아가기",
    home: "홈",
  },
  howItWorks: {
    title: "어떻게 작동하나요? 🤔",
    subtitle: "갈등을 해결하고 웃음을 나누는 재미있는 방법",
    disclaimer: {
      title: "순전히 재미를 위한 것입니다! 🎭",
      description:
        "이 앱은 순수하게 엔터테인먼트 목적입니다. 모든 판단, 평가, 비난은 유머러스하게 받아들여야 합니다. 우리는 유머와 무작위성을 사용하여 긴장된 상황을 완화하고 사람들이 그들의 의견 차이를 웃으며 바라볼 수 있게 돕습니다.",
    },
    methods: {
      title: "우리의 비난 방법들 🎯",
      fiftyFifty:
        "고전적인 50/50 방식은 회전하는 바퀴를 사용하여 무작위로 잘못한 사람을 선택합니다. 빠르고 공정한 결정이 필요한 상황에 완벽합니다 - 완전히 무작위라도요! 바퀴는 절대 거짓말을 하지 않습니다 (정말로요?).",
      numberGuess:
        "플레이어들이 0-100 사이의 숫자를 선택합니다 (50은 금지!). 우리 시스템이 '운명의 숫자'를 생성하고, 가장 가까운 숫자를 선택한 사람이 벗어납니다. 다른 사람은? 글쎄요, 그 사람이 잘못한 거죠!",
      aiAnalysis:
        "우리의 가장 정교한 (그리고 가장 무자비한) 방법입니다! AI 판사가 양쪽의 이야기를 분석하고 무자비한 심리 분석을 제공합니다. 경고: AI 판사는 자비를 모르며 당신의 인생 선택을 의심하게 만들 수 있습니다!",
    },
    purpose: {
      title: "진정한 목적 🎪",
      description:
        "이것을 비난 게임으로 소개하지만, 우리의 진정한 목적은 사람들이 그들의 갈등을 웃으며 바라보고 다른 관점에서 볼 수 있도록 돕는 것입니다. 때로는 긴장된 상황에 약간의 유머를 더하는 것이 모두가 긴장을 풀고 함께 진정한 해결책을 찾는 데 도움이 될 수 있습니다.",
    },
  },
} as const;
