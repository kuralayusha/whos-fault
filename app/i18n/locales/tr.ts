export default {
  home: {
    title: "Kimin Suçu?",
    subtitle: "İnsanları suçlamak size düşmez, bırakın biz yapalım",
    quote: "Başkalarını suçlamak bir sanattır, biz sadece otomatikleştiriyoruz",
    description: "Parmakla gösterme işini yapay zekaya bırakın, siz rahatlayın",
    buttons: {
      getStarted: "Başla",
      learnMore: "Detaylar",
    },
  },
  start: {
    title: "Suçlama Yöntemini Seç 🎯",
    description: "Suçu nasıl dağıtmak istediğini seç 👇",
    options: {
      fiftyFifty: {
        title: "Kader Çarkı 🎡",
        description: "Çark dönsün, kader suçluyu seçsin ✨",
      },
      numberGuess: {
        title: "Sayıların Hükmü 🎲",
        description: "Kader sayısı kimin daha suçlu olduğuna karar versin ⚖️",
      },
      aiAnalysis: {
        title: "Yapay Zeka Yargıcı 🤖",
        description:
          "Yapay zeka hikayelerinizi analiz edip suçluyu belirlesin ve dalga geçsin 🔍",
      },
    },
    blameStats: {
      count: "{{count}} kez başarıyla suçlanıldı 😈",
    },
  },
  fiftyFifty: {
    title: "Kader Karar Versin",
    description: "İki isim gir ve suçlama çarkının karar vermesini bekle",
    form: {
      firstPerson: "Birinci Kişinin Adı",
      secondPerson: "İkinci Kişinin Adı",
      blameButton: "SUÇLA!",
      spinning: "Karar veriliyor...",
      goHome: "YENİ SUÇLAMA SEÇ",
    },
    results: {
      accusations: [
        "Nasıl yaparsın bunu {{name}}! 😱",
        "Hepimiz senden utanıyoruz {{name}}! 😤",
        "{{name}}, bu kabul edilemez! 😠",
        "{{name}}, bütün hayallerimizi yıktın! 💔",
        "Artık hiçbir şey eskisi gibi olmayacak {{name}}! 😢",
        "{{name}}, sen bizim güvenimizi hak etmiyorsun! 💔",
        "Sana nasıl güvenebiliriz bundan sonra {{name}}?! 😫",
        "{{name}}, sen ekibin kara koyunusun! 🐑",
        "Tarihe kara bir leke olarak geçtin {{name}}! 📜",
        "{{name}}, senin yüzünden her şey mahvoldu! 💥",
        "Bu felaketin tek sorumlusu sensin {{name}}! ⚡",
        "Tebrikler {{name}}, yılın fiyaskosu ödülünü kazandın! 🏆",
        "{{name}}, bu nasıl bir başyapıt böyle! 👏",
        "Harika iş {{name}}, her şeyi berbat ettin! 🌟",
        "{{name}}, keşke biraz düşünseydin... 🤔",
        "Bunu bilerek yaptığını düşünmek istiyorum {{name}}... 🙄",
        "{{name}}, senin bu 'yeteneklerin' bizi şaşırtmaya devam ediyor! ✨",
        "{{name}}, bütün ekibin moralini bozdun! 👥",
        "Herkes senin yüzünden üzgün {{name}}! 😢",
        "{{name}}, ekip ruhumuzu mahvettin! 🤝",
        "{{name}}, bu profesyonellikten çok uzak! 👔",
        "Kariyerinde kara bir leke {{name}}! 📊",
        "{{name}}, bu kabul edilemez bir performans! 📈",
        "{{name}}, bunun sonuçlarına katlanacaksın! ⏳",
        "Bu yaptığın unutulmayacak {{name}}! 📝",
        "{{name}}, artık hiçbir şey eskisi gibi olmayacak! 🔮",
        "{{name}}, sen bir felakete sebep oldun! 🌋",
        "Tarihi bir hata yaptın {{name}}! ⚔️",
        "{{name}}, bu resmen bir kaos! 🌪️",
        "{{name}}, bizi hayal kırıklığına uğrattın!",
        "Sana güvenmiştik {{name}}! 🤦",
        "{{name}}, bizi nasıl bu duruma düşürürsün! 😫",
      ],
    },
  },
  numberGuess: {
    title: "Sayı Karar Verecek",
    description: "İsimleri ve sayıları gir, kaderin seçimi belirlesin",
    form: {
      firstPerson: "Birinci Kişinin Adı",
      firstNumber: "Birinci Kişinin Sayısı (0-100)",
      secondPerson: "İkinci Kişinin Adı",
      secondNumber: "İkinci Kişinin Sayısı (0-100)",
      targetNumber: "Kader Sayısı",
      blameButton: "KADERİ GÖSTER!",
      spinning: "Karar veriliyor...",
      goHome: "YENİ SUÇLAMA SEÇ",
      middleNumberError: "Hile yapmaya çalışma! 50 sayısı yasak! 😠",
      sameNumberError: "İki kişi aynı sayıyı seçemez! 🚫",
    },
  },
  aiAnalysis: {
    title: "Yapay Zeka Sizi Yargılayacak",
    description: "Hikayeni anlat, yapay zeka kimin suçlu olduğuna karar versin",
    form: {
      firstPerson: "Birinci Kişinin Adı",
      firstStory: "Olayı kendi açından anlat...",
      secondPerson: "İkinci Kişinin Adı",
      secondStory: "Olayı kendi açından anlat...",
      analyzeButton: "ANALİZ ET & DALGA GEÇ!",
      analyzing: "Yapay zeka yargılıyor...",
      goHome: "YENİ SUÇLAMA SEÇ",
    },
  },
  common: {
    backToMethods: "Yöntemlere Dön",
    home: "Ana Sayfa",
  },
  howItWorks: {
    title: "Nasıl Çalışır? 🤔",
    subtitle:
      "Anlaşmazlıkları çözmenin ve birlikte gülmenin eğlenceli bir yolu",
    disclaimer: {
      title: "Sadece Eğlence! 🎭",
      description:
        "Bu uygulama tamamen eğlence amaçlıdır. Tüm yargılar, taşlamalar ve suçlamalar şaka amaçlıdır. Gergin durumları hafifletmek ve belki de insanların anlaşmazlıklarına gülmelerine yardımcı olmak için mizah ve rastgelelik kullanıyoruz.",
    },
    methods: {
      title: "Suçlama Yöntemlerimiz 🎯",
      fiftyFifty:
        "Klasik 50/50 yöntemi, kimin suçlu olduğunu rastgele seçmek için dönen bir çark kullanır. Hızlı ve tarafsız bir karara ihtiyacınız olan durumlar için mükemmel - tamamen rastgele olsa bile! Çark asla yalan söylemez (yoksa söyler mi?).",
      numberGuess:
        "Oyuncular 0-100 arası bir sayı seçer (50 yasak!). Sistemimiz rastgele bir 'kader sayısı' üretir ve sayısı buna en yakın olan kişi kurtulur. Diğer kişi? Eh, suçlu o oluyor!",
      aiAnalysis:
        "En sofistike (ve acımasız) yöntemimiz! Yapay zeka yargıcımız hikayenin her iki tarafını analiz eder ve acımasız bir psikolojik analiz sunar. Uyarı: Yapay zeka yargıcının merhameti yoktur ve hayat tercihlerinizi sorgulamanıza neden olabilir!",
    },
    purpose: {
      title: "Asıl Amaç 🎪",
      description:
        "Bunu bir suçlama oyunu olarak sunsak da, asıl amacımız insanların çatışmalarına gülmelerine ve belki de onları farklı bir açıdan görmelerine yardımcı olmak. Bazen gergin bir duruma biraz mizah katmak, herkesin rahatlamasına ve birlikte gerçek bir çözüm bulmasına yardımcı olabilir.",
    },
  },
} as const;
