export default {
  home: {
    title: "Super Blamer 3000",
    subtitle: "Let AI do the finger-pointing while you sit back and relax 🤔",
    quote: "Blaming others is an art, we do it with love",
    description:
      "Why stress about who's at fault when AI can handle the drama ✨",
    buttons: {
      getStarted: "Start Blaming",
      learnMore: "How it Works",
    },
  },
  start: {
    title: "Choose Your Blame Method 🎯",
    description: "Select how you want to distribute the blame 👇",
    options: {
      fiftyFifty: {
        title: "Wheel of Fate 🎡",
        description: "Let the wheel spin and fate decide who's to blame ✨",
      },
      numberGuess: {
        title: "Number's Verdict 🎲",
        description: "Let fate's number decide who's more guilty ⚖️",
      },
      aiAnalysis: {
        title: "AI Judge 🤖",
        description:
          "Let AI analyze your stories and decide who's to blame with a roast 🔍",
      },
      snapRoast: {
        title: "Snap-Roast Master 📸",
        description:
          "Let AI judge your photo and (gently) roast you 🔍 (Not recommended)",
      },
    },
    blameStats: {
      count: "Successfully blamed {{count}} times 😈",
    },
  },
  fiftyFifty: {
    title: "Let Fate Decide",
    description: "Enter two names and let the wheel of blame decide",
    form: {
      firstPerson: "First Person's Name",
      secondPerson: "Second Person's Name",
      blameButton: "BLAME!",
      spinning: "Deciding...",
      goHome: "SELECT NEW BLAME",
      playAgain: "Spin Again!",
    },
    results: {
      accusations: [
        "How could you do this {{name}}! 😱",
        "We're all disappointed in you {{name}}! 😤",
        "{{name}}, this is unacceptable! 😠",
        "{{name}}, I expected better from you! 😔",
        "{{name}}, you should be ashamed! 😡",
        "Not cool {{name}}, not cool at all! 🙄",
        "{{name}}, you've really messed up this time! 🤦",
        "I can't believe you {{name}}! 😫",
        "{{name}}, what were you thinking?! 🤔",
        "This is all your fault {{name}}! 👉",
        "{{name}}, you're the reason we can't have nice things! 💔",
        "Everyone's looking at you now {{name}}! 👀",
        "{{name}}, you've got some explaining to do! ⚠️",
        "Way to go {{name}}, you broke it! 💥",
        "{{name}}, this is why we have trust issues! 🔒",
      ],
    },
  },
  numberGuess: {
    title: "The Number Will Judge",
    description: "Enter names and numbers, let fate's random choice decide",
    form: {
      firstPerson: "First Person's Name",
      firstNumber: "First Person's Number (0-100)",
      secondPerson: "Second Person's Name",
      secondNumber: "Second Person's Number (0-100)",
      targetNumber: "Fate's Number",
      blameButton: "REVEAL FATE!",
      spinning: "Deciding...",
      goHome: "SELECT NEW BLAME",
      middleNumberError: "No cheating! 50 is forbidden! 😠",
      sameNumberError: "Both players can't pick the same number! 🚫",
      playAgain: "Try Again!",
    },
    results: {
      accusations: [
        "How could you do this {{name}}! 😱",
        "We're all disappointed in you {{name}}! 😤",
        "{{name}}, this is unacceptable! 😠",
        "{{name}}, I expected better from you! 😔",
        "{{name}}, you should be ashamed! 😡",
        "Not cool {{name}}, not cool at all! 🙄",
        "{{name}}, you've really messed up this time! 🤦",
        "I can't believe you {{name}}! 😫",
        "{{name}}, what were you thinking?! 🤔",
        "This is all your fault {{name}}! 👉",
        "{{name}}, you're the reason we can't have nice things! 💔",
        "Everyone's looking at you now {{name}}! 👀",
        "{{name}}, you've got some explaining to do! ⚠️",
        "Way to go {{name}}, you broke it! 💥",
        "{{name}}, this is why we have trust issues! 🔒",
      ],
    },
  },
  aiAnalysis: {
    title: "AI Will Judge You",
    description: "Tell your side of the story, let AI decide who's at fault",
    form: {
      firstPerson: "First Person's Name",
      firstStory: "Tell your side of the story...",
      secondPerson: "Second Person's Name",
      secondStory: "Tell your side of the story...",
      analyzeButton: "ANALYZE & ROAST!",
      analyzing: "AI is judging...",
      goHome: "SELECT NEW BLAME",
      playAgain: "Judge Again!",
    },
  },
  selfieRoast: {
    title: "Snap-Roast Master",
    description:
      "Upload your photo and let AI prepare a special roast (Warning: May be heartbreaking!)",
    form: {
      userName: "Your Name",
      imageUpload: "Upload or Take Photo",
      analyzeButton: "Start Roasting!",
      analyzing: "AI is judging...",
      goHome: "NEW ROAST",
      imageError: "Please select a photo",
      userNameError: "Name is required",
    },
  },
  common: {
    backToMethods: "Back to Methods",
    home: "Home",
  },
  howItWorks: {
    title: "How Does It Work? 🤔",
    subtitle: "A fun way to resolve conflicts and share some laughs",
    disclaimer: {
      title: "Just For Fun! 🎭",
      description:
        "This app is purely for entertainment purposes. All judgments, roasts, and blame assignments are meant to be taken with a grain of salt. We use humor and randomness to lighten up tense situations and maybe even help people laugh at their disagreements.",
    },
    methods: {
      title: "Our Blame Methods 🎯",
      fiftyFifty:
        "The classic 50/50 method uses a spinning wheel to randomly select who's to blame. It's perfect for those situations where you just need a quick, unbiased decision - even if it's completely random! The wheel never lies (or does it?).",
      numberGuess:
        "Players pick numbers between 0-100 (except 50, that's forbidden!). Our system generates a random 'fate number', and the person whose number is closer gets off the hook. The other person? Well, they're the one to blame!",
      aiAnalysis:
        "Our most sophisticated (and brutal) method! Our AI judge analyzes both sides of the story and delivers a ruthless psychological analysis. Warning: The AI judge has no mercy and might make you question your life choices!",
    },
    purpose: {
      title: "The Real Purpose 🎪",
      description:
        "While we present this as a blame game, our real goal is to help people laugh at their conflicts and maybe see them from a different perspective. Sometimes, adding a bit of humor to a tense situation can help everyone relax and find a real solution together.",
    },
  },
  snapRoast: {
    title: "SnapRoast",
    description:
      "Upload your photo, AI will analyze it and roast you (Warning: Heartbreaking!)",
    form: {
      userName: "Your Name",
      imageUpload: "Upload or Take Photo",
      analyzeButton: "ROAST!",
      analyzing: "AI is judging...",
      imageError: "Please select a photo",
      userNameError: "Name is required",
      playAgain: "New Roast!",
      selectImage: "Select Image",
    },
  },
} as const;
