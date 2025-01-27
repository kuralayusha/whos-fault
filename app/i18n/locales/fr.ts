export default {
  // Fransızca çeviriler
  home: {
    title: "Super Blamer 3000",
    subtitle: "Laissez l'IA pointer du doigt pendant que vous vous détendez 🤔",
    quote: "Blâmer les autres est un art, nous le faisons avec amour",
    description:
      "Pourquoi stresser pour trouver le coupable quand l'IA peut gérer le drame ✨",
    buttons: {
      getStarted: "Commencer",
      learnMore: "Comment ça marche",
    },
  },
  start: {
    title: "Choisissez Votre Méthode de Blâme 🎯",
    description: "Sélectionnez comment vous voulez distribuer le blâme 👇",
    options: {
      fiftyFifty: {
        title: "Roue du Destin 🎡",
        description:
          "Laissez la roue tourner et le destin décider qui est coupable ✨",
      },
      numberGuess: {
        title: "Verdict des Nombres 🎲",
        description:
          "Laissez le nombre du destin décider qui est le plus coupable ⚖️",
      },
      aiAnalysis: {
        title: "Juge IA 🤖",
        description:
          "Laissez l'IA analyser vos histoires et décider qui est coupable avec un roast 🔍",
      },
    },
    blameStats: {
      count: "{{count}} personnes blâmées avec succès 😈",
    },
  },
  fiftyFifty: {
    title: "Laissez le Destin Décider",
    description:
      "Entrez deux noms et laissez la roue du blâme prendre la décision",
    form: {
      firstPerson: "Nom de la Première Personne",
      secondPerson: "Nom de la Deuxième Personne",
      blameButton: "BLÂMER !",
      spinning: "Décision en cours...",
      goHome: "NOUVELLE MÉTHODE",
    },
    results: {
      accusations: [
        "Comment as-tu pu faire ça, {{name}} ! 😱",
        "Nous sommes tous déçus de toi, {{name}} ! 😤",
        "{{name}}, c'est inacceptable ! 😠",
        "{{name}}, j'attendais mieux de toi ! 😔",
        "{{name}}, tu devrais avoir honte ! 😡",
        "Pas cool {{name}}, vraiment pas cool ! 🙄",
        "{{name}}, tu as vraiment tout gâché cette fois ! 🤦",
        "Je n'arrive pas à y croire, {{name}} ! 😫",
        "{{name}}, à quoi pensais-tu ?! 🤔",
        "C'est entièrement ta faute, {{name}} ! 👉",
        "{{name}}, c'est à cause de toi qu'on ne peut pas avoir de belles choses ! 💔",
        "Tout le monde te regarde maintenant, {{name}} ! 👀",
        "{{name}}, tu as des explications à donner ! ⚠️",
        "Bravo {{name}}, tu as tout cassé ! 💥",
        "{{name}}, voilà pourquoi on a des problèmes de confiance ! 🔒",
      ],
    },
  },
  numberGuess: {
    title: "Le Nombre Va Juger",
    description:
      "Entrez les noms et les nombres, laissez le choix du destin décider",
    form: {
      firstPerson: "Nom de la Première Personne",
      firstNumber: "Nombre de la Première Personne (0-100)",
      secondPerson: "Nom de la Deuxième Personne",
      secondNumber: "Nombre de la Deuxième Personne (0-100)",
      targetNumber: "Nombre du Destin",
      blameButton: "RÉVÉLER LE DESTIN !",
      spinning: "Décision en cours...",
      goHome: "NOUVELLE MÉTHODE",
      middleNumberError: "Pas de triche ! Le 50 est interdit ! 😠",
      sameNumberError:
        "Les deux joueurs ne peuvent pas choisir le même nombre ! 🚫",
    },
  },
  aiAnalysis: {
    title: "L'IA Va Vous Juger",
    description:
      "Racontez votre version de l'histoire, laissez l'IA décider qui est coupable",
    form: {
      firstPerson: "Nom de la Première Personne",
      firstStory: "Racontez votre version...",
      secondPerson: "Nom de la Deuxième Personne",
      secondStory: "Racontez votre version...",
      analyzeButton: "ANALYSER & ROAST !",
      analyzing: "L'IA juge...",
      goHome: "NOUVELLE MÉTHODE",
    },
  },
  common: {
    backToMethods: "Retour aux Méthodes",
    home: "Accueil",
  },
  howItWorks: {
    title: "Comment Ça Marche ? 🤔",
    subtitle:
      "Une façon amusante de résoudre les conflits et de partager des rires",
    disclaimer: {
      title: "Juste pour Rire ! 🎭",
      description:
        "Cette application est purement destinée au divertissement. Tous les jugements, roasts et attributions de blâme sont à prendre au second degré. Nous utilisons l'humour et l'aléatoire pour détendre les situations tendues et peut-être même aider les gens à rire de leurs désaccords.",
    },
    methods: {
      title: "Nos Méthodes de Blâme 🎯",
      fiftyFifty:
        "La méthode classique 50/50 utilise une roue tournante pour sélectionner aléatoirement qui est coupable. Parfait pour ces situations où vous avez besoin d'une décision rapide et impartiale - même si elle est totalement aléatoire ! La roue ne ment jamais (ou peut-être que si ?).",
      numberGuess:
        "Les joueurs choisissent des nombres entre 0 et 100 (sauf 50, c'est interdit !). Notre système génère un 'nombre du destin', et la personne dont le nombre est le plus proche s'en sort. L'autre personne ? Eh bien, c'est elle la coupable !",
      aiAnalysis:
        "Notre méthode la plus sophistiquée (et impitoyable) ! Notre juge IA analyse les deux versions de l'histoire et délivre une analyse psychologique sans pitié. Attention : Le juge IA n'a aucune pitié et pourrait vous faire remettre en question vos choix de vie !",
    },
    purpose: {
      title: "Le Véritable Objectif 🎪",
      description:
        "Bien que nous présentions cela comme un jeu de blâme, notre véritable objectif est d'aider les gens à rire de leurs conflits et peut-être à les voir sous un angle différent. Parfois, ajouter un peu d'humour à une situation tendue peut aider tout le monde à se détendre et à trouver une vraie solution ensemble.",
    },
  },
} as const;
