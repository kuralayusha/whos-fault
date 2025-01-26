export default {
  // Japonca çeviriler
  home: {
    title: "誰が悪いの？",
    subtitle: "人を責めるのは私たちに任せてください",
    quote: "人を責めるのは芸術です。私たちはそれを自動化するだけです",
    description: "AIに責任追及を任せて、リラックスしましょう",
    buttons: {
      getStarted: "始める",
      learnMore: "詳しく見る",
    },
  },
  start: {
    title: "責任追及の方法を選ぼう 🎯",
    description: "責任の分配方法を選んでください 👇",
    options: {
      fiftyFifty: {
        title: "運命の輪 🎡",
        description: "輪を回して運命に決めてもらいましょう ✨",
      },
      numberGuess: {
        title: "数字の裁き 🎲",
        description: "運命の数字が誰がより悪いか決めます ⚖️",
      },
      aiAnalysis: {
        title: "AI裁判官 🤖",
        description:
          "AIがあなたの話を分析し、辛辣な評価とともに判断を下します 🔍",
      },
    },
    blameStats: {
      count: "これまでに{{count}}回の責任追及に成功 😈",
    },
  },
  fiftyFifty: {
    title: "運命に任せましょう",
    description: "二人の名前を入力して、責任の輪に決めてもらいましょう",
    form: {
      firstPerson: "一人目の名前",
      secondPerson: "二人目の名前",
      blameButton: "責める！",
      spinning: "判断中...",
      goHome: "新しい方法を選ぶ",
    },
    results: {
      accusations: [
        "{{name}}さん、よくそんなことができましたね！😱",
        "みんな{{name}}さんに失望しています！😤",
        "{{name}}さん、これは許されません！😠",
        "{{name}}さん、もっと期待していたのに！😔",
        "{{name}}さん、恥ずかしく思うべきです！😡",
        "ダメですよ{{name}}さん、全然カッコよくありません！🙄",
        "{{name}}さん、今回は本当にやってしまいましたね！🤦",
        "信じられません、{{name}}さん！😫",
        "{{name}}さん、一体何を考えていたんですか？！🤔",
        "これは全部{{name}}さんの責任です！👉",
        "{{name}}さんのせいで、いいことなんて何もありません！💔",
        "今みんなが{{name}}さんを見ています！👀",
        "{{name}}さん、説明する必要がありますよ！⚠️",
        "よくやりました{{name}}さん、全部台無しですよ！💥",
        "{{name}}さん、これだから信頼関係が築けないんです！🔒",
      ],
    },
  },
  numberGuess: {
    title: "数字が裁きます",
    description: "名前と数字を入力して、運命の選択に任せましょう",
    form: {
      firstPerson: "一人目の名前",
      firstNumber: "一人目の数字 (0-100)",
      secondPerson: "二人目の名前",
      secondNumber: "二人目の数字 (0-100)",
      targetNumber: "運命の数字",
      blameButton: "運命を明かせ！",
      spinning: "判断中...",
      goHome: "新しい方法を選ぶ",
      middleNumberError: "ズルはダメです！50は禁止です！😠",
      sameNumberError: "二人が同じ数字を選ぶことはできません！🚫",
    },
  },
  aiAnalysis: {
    title: "AIが裁きます",
    description: "あなたの話を聞かせてください、AIが誰が悪いか決めます",
    form: {
      firstPerson: "一人目の名前",
      firstStory: "あなたの話を聞かせてください...",
      secondPerson: "二人目の名前",
      secondStory: "あなたの話を聞かせてください...",
      analyzeButton: "分析 & 批評！",
      analyzing: "AI判断中...",
      goHome: "新しい方法を選ぶ",
    },
  },
  common: {
    backToMethods: "方法選択に戻る",
    home: "ホーム",
  },
  howItWorks: {
    title: "どのように機能するの？🤔",
    subtitle: "対立を解決し、笑いを共有する楽しい方法",
    disclaimer: {
      title: "これは純粋に娯楽です！🎭",
      description:
        "このアプリは純粋にエンターテインメント目的です。すべての判断、批評、責任追及はユーモアとして受け取ってください。私たちはユーモアとランダム性を使って緊張した状況を和らげ、人々が意見の相違を笑って見られるようにサポートします。",
    },
    methods: {
      title: "私たちの責任追及方法 🎯",
      fiftyFifty:
        "古典的な50/50方式は回転する輪を使ってランダムに責任者を選びます。迅速で公平な決定が必要な状況に最適です - 完全にランダムであっても！輪は決して嘘をつきません（本当でしょうか？）。",
      numberGuess:
        "プレイヤーは0-100の間で数字を選びます（50は禁止！）。システムが'運命の数字'を生成し、最も近い数字を選んだ人が逃れられます。もう一人は？そう、その人が責任者です！",
      aiAnalysis:
        "私たちの最も洗練された（そして最も容赦ない）方法です！AI裁判官が両者の話を分析し、容赦ない心理分析を提供します。警告：AI裁判官は慈悲を知らず、あなたの人生の選択を疑問視させる可能性があります！",
    },
    purpose: {
      title: "本当の目的 🎪",
      description:
        "これを責任追及ゲームとして紹介していますが、私たちの本当の目的は、人々が対立を笑って見られるようにし、異なる視点から見られるようにすることです。時には緊張した状況に少しユーモアを加えることで、皆がリラックスして一緒に本当の解決策を見つけることができます。",
    },
  },
} as const;
