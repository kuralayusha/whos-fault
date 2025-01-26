export default {
  home: {
    title: "谁的错？",
    subtitle: "为什么要自己指责别人，让我们来帮你",
    quote: "指责他人是一门艺术，我们只是让它自动化",
    description: "让AI来处理指责，你只管放轻松",
    buttons: {
      getStarted: "开始使用",
      learnMore: "了解更多",
    },
  },
  start: {
    title: "选择你的指责方式 🎯",
    description: "选择如何分配责任 👇",
    options: {
      fiftyFifty: {
        title: "命运之轮 🎡",
        description: "让命运之轮转动，决定谁该负责 ✨",
      },
      numberGuess: {
        title: "数字审判 🎲",
        description: "让命运数字决定谁更有责任 ⚖️",
      },
      aiAnalysis: {
        title: "AI法官 🤖",
        description: "让AI分析你们的故事，并以犀利的方式判定责任 🔍",
      },
    },
    blameStats: {
      count: "已成功指责 {{count}} 次 😈",
    },
  },
  fiftyFifty: {
    title: "让命运做决定",
    description: "输入两个名字，让指责之轮做出决定",
    form: {
      firstPerson: "第一个人的名字",
      secondPerson: "第二个人的名字",
      blameButton: "指责！",
      spinning: "正在决定...",
      goHome: "选择新方法",
    },
    results: {
      accusations: [
        "{{name}}，你怎么能这样做！😱",
        "{{name}}，我们都对你很失望！😤",
        "{{name}}，这太不可接受了！😠",
        "{{name}}，我对你期望更高！😔",
        "{{name}}，你应该感到羞愧！😡",
        "{{name}}，这一点都不酷！🙄",
        "{{name}}，这次你真的搞砸了！🤦",
        "我简直不敢相信，{{name}}！😫",
        "{{name}}，你在想什么？！🤔",
        "这都是你的错，{{name}}！👉",
        "{{name}}，因为你我们什么好事都没有！💔",
        "现在所有人都在看着你，{{name}}！👀",
        "{{name}}，你得解释清楚！⚠️",
        "干得好啊{{name}}，你把一切都毁了！💥",
        "{{name}}，这就是为什么我们有信任问题！🔒",
      ],
    },
  },
  numberGuess: {
    title: "数字将做出审判",
    description: "输入名字和数字，让命运的选择来决定",
    form: {
      firstPerson: "第一个人的名字",
      firstNumber: "第一个人的数字 (0-100)",
      secondPerson: "第二个人的名字",
      secondNumber: "第二个人的数字 (0-100)",
      targetNumber: "命运数字",
      blameButton: "揭示命运！",
      spinning: "正在决定...",
      goHome: "选择新方法",
      middleNumberError: "不准作弊！50是禁止的！😠",
      sameNumberError: "两个玩家不能选择相同的数字！🚫",
    },
  },
  aiAnalysis: {
    title: "AI将对你进行审判",
    description: "讲述你的故事版本，让AI决定谁该负责",
    form: {
      firstPerson: "第一个人的名字",
      firstStory: "讲述你的版本...",
      secondPerson: "第二个人的名字",
      secondStory: "讲述你的版本...",
      analyzeButton: "分析 & 吐槽！",
      analyzing: "AI正在判定...",
      goHome: "选择新方法",
    },
  },
  common: {
    backToMethods: "返回方法选择",
    home: "首页",
  },
  howItWorks: {
    title: "这是如何运作的？🤔",
    subtitle: "一种解决冲突和分享欢笑的有趣方式",
    disclaimer: {
      title: "纯属娱乐！🎭",
      description:
        "这个应用纯粹是为了娱乐。所有的判决、吐槽和责任归属都是开玩笑的。我们使用幽默和随机性来缓解紧张的情况，也许还能帮助人们对他们的分歧一笑置之。",
    },
    methods: {
      title: "我们的指责方法 🎯",
      fiftyFifty:
        "经典的50/50方法使用旋转轮盘随机选择责任人。完美适用于那些需要快速、公正决定的情况 - 即使是完全随机的！轮盘从不说谎（真的吗？）。",
      numberGuess:
        "玩家选择0-100之间的数字（50被禁止！）。我们的系统生成一个'命运数字'，数字最接近的人可以逃脱。另一个人？好吧，那就是责任人了！",
      aiAnalysis:
        "我们最复杂（也最无情）的方法！我们的AI法官分析故事的双方，并提供无情的心理分析。警告：AI法官毫不留情，可能会让你质疑人生选择！",
    },
    purpose: {
      title: "真正的目的 🎪",
      description:
        "虽然我们把这呈现为一个指责游戏，但我们真正的目标是帮助人们对他们的冲突一笑置之，也许从不同的角度看问题。有时，在紧张的情况下加入一点幽默，可以帮助每个人放松下来，共同找到真正的解决方案。",
    },
  },
} as const;
