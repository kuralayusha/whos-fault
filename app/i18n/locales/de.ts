export default {
  // Almanca çeviriler
  home: {
    title: "Super Blamer 3000",
    subtitle:
      "Überlassen Sie das Beschuldigen der KI, lehnen Sie sich zurück 🤔",
    quote: "Andere zu beschuldigen ist eine Kunst, wir machen es mit Liebe",
    description:
      "Warum sich über Schuld streiten, wenn KI das Drama übernehmen kann ✨",
    buttons: {
      getStarted: "Loslegen",
      learnMore: "Wie es funktioniert",
    },
  },
  start: {
    title: "Wählen Sie Ihre Schuldzuweisungsmethode 🎯",
    description: "Wählen Sie, wie Sie die Schuld verteilen möchten 👇",
    options: {
      fiftyFifty: {
        title: "Schicksalsrad 🎡",
        description:
          "Lassen Sie das Rad drehen und das Schicksal entscheiden ✨",
      },
      numberGuess: {
        title: "Zahlenurteil 🎲",
        description:
          "Lassen Sie die Schicksalszahl entscheiden, wer schuldiger ist ⚖️",
      },
      aiAnalysis: {
        title: "KI-Richter 🤖",
        description:
          "Lassen Sie KI Ihre Geschichten analysieren und mit einem Roast entscheiden 🔍",
      },
    },
    blameStats: {
      count: "Erfolgreich {{count}} Mal beschuldigt 😈",
    },
  },
  fiftyFifty: {
    title: "Lassen Sie das Schicksal entscheiden",
    description:
      "Geben Sie zwei Namen ein und lassen Sie das Schuld-Rad entscheiden",
    form: {
      firstPerson: "Name der ersten Person",
      secondPerson: "Name der zweiten Person",
      blameButton: "BESCHULDIGEN!",
      spinning: "Entscheidung läuft...",
      goHome: "NEUE METHODE WÄHLEN",
    },
    results: {
      accusations: [
        "Wie konntest du das tun, {{name}}! 😱",
        "Wir sind alle von dir enttäuscht, {{name}}! 😤",
        "{{name}}, das ist inakzeptabel! 😠",
        "{{name}}, ich hätte Besseres von dir erwartet! 😔",
        "{{name}}, du solltest dich schämen! 😡",
        "Nicht cool {{name}}, überhaupt nicht cool! 🙄",
        "{{name}}, diesmal hast du es wirklich vermasselt! 🤦",
        "Ich kann es nicht glauben, {{name}}! 😫",
        "{{name}}, was hast du dir dabei gedacht?! 🤔",
        "Das ist alles deine Schuld, {{name}}! 👉",
        "{{name}}, deinetwegen können wir keine schönen Dinge haben! 💔",
        "Jetzt schauen alle auf dich, {{name}}! 👀",
        "{{name}}, du hast einiges zu erklären! ⚠️",
        "Toll gemacht {{name}}, du hast es kaputt gemacht! 💥",
        "{{name}}, deshalb haben wir Vertrauensprobleme! 🔒",
      ],
    },
  },
  numberGuess: {
    title: "Die Zahl wird urteilen",
    description:
      "Geben Sie Namen und Zahlen ein, lassen Sie das Schicksal entscheiden",
    form: {
      firstPerson: "Name der ersten Person",
      firstNumber: "Zahl der ersten Person (0-100)",
      secondPerson: "Name der zweiten Person",
      secondNumber: "Zahl der zweiten Person (0-100)",
      targetNumber: "Schicksalszahl",
      blameButton: "SCHICKSAL ENTHÜLLEN!",
      spinning: "Entscheidung läuft...",
      goHome: "NEUE METHODE WÄHLEN",
      middleNumberError: "Kein Schummeln! 50 ist verboten! 😠",
      sameNumberError: "Beide Spieler können nicht die gleiche Zahl wählen! 🚫",
    },
  },
  aiAnalysis: {
    title: "KI wird Sie beurteilen",
    description:
      "Erzählen Sie Ihre Version der Geschichte, lassen Sie KI entscheiden",
    form: {
      firstPerson: "Name der ersten Person",
      firstStory: "Erzählen Sie Ihre Version...",
      secondPerson: "Name der zweiten Person",
      secondStory: "Erzählen Sie Ihre Version...",
      analyzeButton: "ANALYSIEREN & ROASTEN!",
      analyzing: "KI urteilt...",
      goHome: "NEUE METHODE WÄHLEN",
    },
  },
  common: {
    backToMethods: "Zurück zu Methoden",
    home: "Startseite",
  },
  howItWorks: {
    title: "Wie funktioniert es? 🤔",
    subtitle:
      "Ein unterhaltsamer Weg, Konflikte zu lösen und gemeinsam zu lachen",
    disclaimer: {
      title: "Nur zum Spaß! 🎭",
      description:
        "Diese App dient rein der Unterhaltung. Alle Urteile, Roasts und Schuldzuweisungen sind mit Humor zu nehmen. Wir nutzen Humor und Zufall, um angespannte Situationen aufzulockern und Menschen zum Lachen zu bringen.",
    },
    methods: {
      title: "Unsere Schuldzuweisungsmethoden 🎯",
      fiftyFifty:
        "Die klassische 50/50-Methode verwendet ein Glücksrad, um zufällig den Schuldigen auszuwählen. Perfekt für Situationen, in denen Sie eine schnelle, unparteiische Entscheidung brauchen - auch wenn sie völlig zufällig ist! Das Rad lügt nie (oder doch?).",
      numberGuess:
        "Spieler wählen Zahlen zwischen 0-100 (50 ist verboten!). Unser System generiert eine zufällige 'Schicksalszahl', und die Person, deren Zahl näher dran ist, kommt davon. Die andere Person? Tja, die ist schuld!",
      aiAnalysis:
        "Unsere raffinierteste (und gnadenloseste) Methode! Unser KI-Richter analysiert beide Seiten der Geschichte und liefert eine schonungslose psychologische Analyse. Warnung: Der KI-Richter kennt keine Gnade und könnte Sie Ihre Lebensentscheidungen hinterfragen lassen!",
    },
    purpose: {
      title: "Der wahre Zweck 🎪",
      description:
        "Auch wenn wir dies als Schuldzuweisungsspiel präsentieren, ist unser eigentliches Ziel, Menschen zum Lachen zu bringen und Konflikte aus einer anderen Perspektive zu betrachten. Manchmal kann ein bisschen Humor in einer angespannten Situation allen helfen, sich zu entspannen und gemeinsam eine echte Lösung zu finden.",
    },
  },
} as const;
