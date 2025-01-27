export default {
  home: {
    title: "Super Blamer 3000",
    subtitle: "Deja que la IA señale culpables mientras te relajas 🤔",
    quote: "Culpar a otros es un arte, lo hacemos con amor",
    description:
      "¿Por qué estresarse buscando culpables cuando la IA puede manejar el drama? ✨",
    buttons: {
      getStarted: "Comenzar",
      learnMore: "Cómo funciona",
    },
  },
  start: {
    title: "Elige tu Método de Culpa 🎯",
    description: "Selecciona cómo quieres distribuir la culpa 👇",
    options: {
      fiftyFifty: {
        title: "Rueda del Destino 🎡",
        description:
          "Deja que la rueda gire y el destino decida quién tiene la culpa ✨",
      },
      numberGuess: {
        title: "Veredicto Numérico 🎲",
        description:
          "Deja que el número del destino decida quién es más culpable ⚖️",
      },
      aiAnalysis: {
        title: "Juez IA 🤖",
        description:
          "Deja que la IA analice sus historias y decida quién tiene la culpa con un roast 🔍",
      },
    },
    blameStats: {
      count: "{{count}} personas culpadas con éxito 😈",
    },
  },
  fiftyFifty: {
    title: "Deja que el Destino Decida",
    description:
      "Ingresa dos nombres y deja que la rueda de la culpa tome la decisión",
    form: {
      firstPerson: "Nombre de la Primera Persona",
      secondPerson: "Nombre de la Segunda Persona",
      blameButton: "¡CULPAR!",
      spinning: "Decidiendo...",
      goHome: "NUEVO MÉTODO",
    },
    results: {
      accusations: [
        "¡¿Cómo pudiste hacer esto, {{name}}?! 😱",
        "¡Todos estamos decepcionados de ti, {{name}}! 😤",
        "¡{{name}}, esto es inaceptable! 😠",
        "¡{{name}}, esperaba más de ti! 😔",
        "¡{{name}}, deberías estar avergonzado! 😡",
        "No está bien {{name}}, para nada bien! 🙄",
        "¡{{name}}, esta vez sí que la has liado! 🤦",
        "¡No puedo creerlo, {{name}}! 😫",
        "¡{{name}}, ¿en qué estabas pensando?! 🤔",
        "¡Todo esto es tu culpa, {{name}}! 👉",
        "¡{{name}}, por tu culpa no podemos tener cosas bonitas! 💔",
        "¡Ahora todos te están mirando, {{name}}! 👀",
        "¡{{name}}, tienes mucho que explicar! ⚠️",
        "¡Bien hecho {{name}}, lo has roto todo! 💥",
        "¡{{name}}, por esto tenemos problemas de confianza! 🔒",
      ],
    },
  },
  numberGuess: {
    title: "El Número Juzgará",
    description:
      "Ingresa nombres y números, deja que la elección del destino decida",
    form: {
      firstPerson: "Nombre de la Primera Persona",
      firstNumber: "Número de la Primera Persona (0-100)",
      secondPerson: "Nombre de la Segunda Persona",
      secondNumber: "Número de la Segunda Persona (0-100)",
      targetNumber: "Número del Destino",
      blameButton: "¡REVELAR DESTINO!",
      spinning: "Decidiendo...",
      goHome: "NUEVO MÉTODO",
      middleNumberError: "¡Sin trampas! ¡El 50 está prohibido! 😠",
      sameNumberError:
        "¡Los dos jugadores no pueden elegir el mismo número! 🚫",
    },
  },
  aiAnalysis: {
    title: "La IA te Juzgará",
    description:
      "Cuenta tu versión de la historia, deja que la IA decida quién tiene la culpa",
    form: {
      firstPerson: "Nombre de la Primera Persona",
      firstStory: "Cuenta tu versión...",
      secondPerson: "Nombre de la Segunda Persona",
      secondStory: "Cuenta tu versión...",
      analyzeButton: "¡ANALIZAR & ROAST!",
      analyzing: "La IA está juzgando...",
      goHome: "NUEVO MÉTODO",
    },
  },
  common: {
    backToMethods: "Volver a Métodos",
    home: "Inicio",
  },
  howItWorks: {
    title: "¿Cómo Funciona? 🤔",
    subtitle: "Una forma divertida de resolver conflictos y compartir risas",
    disclaimer: {
      title: "¡Solo por Diversión! 🎭",
      description:
        "Esta aplicación es puramente para entretenimiento. Todos los juicios, roasts y asignaciones de culpa son para tomarse con humor. Usamos el humor y el azar para aligerar situaciones tensas y quizás ayudar a la gente a reírse de sus desacuerdos.",
    },
    methods: {
      title: "Nuestros Métodos de Culpa 🎯",
      fiftyFifty:
        "El método clásico 50/50 usa una rueda giratoria para seleccionar aleatoriamente al culpable. Perfecto para esas situaciones donde necesitas una decisión rápida e imparcial - ¡aunque sea totalmente aleatoria! La rueda nunca miente (¿o sí?).",
      numberGuess:
        "Los jugadores eligen números entre 0-100 (¡excepto 50, está prohibido!). Nuestro sistema genera un 'número del destino', y la persona cuyo número está más cerca se salva. ¿La otra persona? Bueno, ¡es la culpable!",
      aiAnalysis:
        "¡Nuestro método más sofisticado (y despiadado)! Nuestro juez IA analiza ambos lados de la historia y entrega un análisis psicológico despiadado. Advertencia: El juez IA no tiene piedad y podría hacerte cuestionar tus decisiones de vida!",
    },
    purpose: {
      title: "El Verdadero Propósito 🎪",
      description:
        "Aunque presentamos esto como un juego de culpa, nuestro verdadero objetivo es ayudar a la gente a reírse de sus conflictos y quizás verlos desde una perspectiva diferente. A veces, añadir un poco de humor a una situación tensa puede ayudar a todos a relajarse y encontrar una solución real juntos.",
    },
  },
} as const;
