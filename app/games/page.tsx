

"use client";

import { useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import Link from "next/link";

const Scene3D = dynamic(

  () => import("../components/Scene3D"),

  { ssr: false }

);

type Word = {

  fr: string;

  en: string;

};

type Task =

  | {

      kind: "choice";

      title: string;

      prompt: string;

      options: string[];

      correct: string;

      explanation: string;

      audio?: string;

    }

  | {

      kind: "type";

      title: string;

      prompt: string;

      correct: string;

      accepted?: string[];

      explanation: string;

      audio?: string;

    }

  | {

      kind: "order";

      title: string;

      prompt: string;

      tokens: string[];

      correct: string;

      explanation: string;

      audio?: string;

    };

type Mission = {

  title: string;

  subtitle: string;

  location: string;

  description: string;

  image: string;

  words: Word[];

  tasks: Task[];

};

const missions: Mission[] = [

  {

    title: "Les salutations",

    subtitle: "Greetings",

    location: "Le café parisien",

    description:

      "Meet a friend at a café, greet the waiter and introduce yourself in French.",

    image:

      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&fit=crop",

    words: [

      { fr: "Bonjour", en: "Hello / Good morning" },

      { fr: "Bonsoir", en: "Good evening" },

      { fr: "Au revoir", en: "Goodbye" },

      { fr: "Merci", en: "Thank you" },

      { fr: "Comment ça va ?", en: "How are you?" },

      { fr: "Je vais bien", en: "I am well" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "At the café",

        prompt: "It is 10 a.m. You enter a café. What do you say?",

        options: [

          "Bonsoir",

          "Bonjour",

          "Bonne nuit",

          "Au revoir",

        ],

        correct: "Bonjour",

        explanation:

          "Bonjour is used during the morning and daytime.",

      },

      {

        kind: "order",

        title: "Make a greeting",

        prompt: "Arrange the words to say: Hello, how are you?",

        tokens: ["ça", "Bonjour,", "va", "comment", "?"],

        correct: "Bonjour, comment ça va ?",

        explanation:

          "Bonjour, comment ça va ? is an informal greeting.",

      },

      {

        kind: "type",

        title: "Reply to a friend",

        prompt: "Type the French for: I am well",

        correct: "Je vais bien",

        explanation:

          "Je vais bien is a natural response to Comment ça va ?",

      },

    ],

  },

  {

    title: "L'alphabet",

    subtitle: "The alphabet",

    location: "Le studio des langues",

    description:

      "Hear French letter names and practise spelling simple words.",

    image:

      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&fit=crop",

    words: [

      { fr: "A", en: "Letter A" },

      { fr: "B", en: "Letter B" },

      { fr: "C", en: "Letter C" },

      { fr: "G", en: "Letter G" },

      { fr: "J", en: "Letter J" },

      { fr: "R", en: "Letter R" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Letter recognition",

        prompt: "Which letter comes immediately after F?",

        options: ["H", "G", "E", "J"],

        correct: "G",

        explanation: "G follows F.",

      },

      {

        kind: "order",

        title: "Alphabet sequence",

        prompt: "Put these letters in alphabetical order.",

        tokens: ["D", "F", "C", "E"],

        correct: "C D E F",

        explanation:

          "The correct sequence is C, D, E, F.",

      },

      {

        kind: "type",

        title: "Spell a French word",

        prompt:

          "Type the French word for 'hello' (seven letters).",

        correct: "bonjour",

        explanation:

          "Bonjour is spelled B-O-N-J-O-U-R.",

      },

    ],

  },

  {

    title: "Les nombres de 1 à 30",

    subtitle: "Numbers 1–30",

    location: "La gare",

    description:

      "Read train tickets, identify platform numbers and count in French.",

    image:

      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1400&fit=crop",

    words: [

      { fr: "trois", en: "3" },

      { fr: "sept", en: "7" },

      { fr: "douze", en: "12" },

      { fr: "quinze", en: "15" },

      { fr: "vingt", en: "20" },

      { fr: "trente", en: "30" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Find your platform",

        prompt:

          "The sign says 'voie vingt-trois'. Which platform?",

        options: ["13", "23", "30", "3"],

        correct: "23",

        explanation: "Vingt-trois means 23.",

        audio: "voie vingt-trois",

      },

      {

        kind: "type",

        title: "Write the number",

        prompt: "Write 15 in French.",

        correct: "quinze",

        explanation: "15 is quinze.",

      },

      {

        kind: "order",

        title: "Count in sequence",

        prompt:

          "Arrange these numbers from smallest to largest.",

        tokens: ["trente", "dix", "vingt", "cinq"],

        correct: "cinq dix vingt trente",

        explanation:

          "5, 10, 20, 30 is the correct ascending order.",

      },

    ],

  },

  {

    title: "Ma famille et moi",

    subtitle: "My family and me",

    location: "L'album de famille",

    description:

      "Introduce relatives and build short sentences about your family.",

    image:

      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&fit=crop",

    words: [

      { fr: "ma mère", en: "my mother" },

      { fr: "mon père", en: "my father" },

      { fr: "ma sœur", en: "my sister" },

      { fr: "mon frère", en: "my brother" },

      { fr: "ma grand-mère", en: "my grandmother" },

      { fr: "mon grand-père", en: "my grandfather" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Meet the family",

        prompt: "How do you say 'my sister'?",

        options: [

          "mon frère",

          "ma sœur",

          "ma mère",

          "mon père",

        ],

        correct: "ma sœur",

        explanation: "Sœur means sister.",

      },

      {

        kind: "order",

        title: "Introduce someone",

        prompt: "Build the sentence: This is my mother.",

        tokens: ["mère.", "Voici", "ma"],

        correct: "Voici ma mère.",

        explanation:

          "Voici ma mère means This is my mother.",

      },

      {

        kind: "type",

        title: "Family vocabulary",

        prompt: "Type the French for 'my father'.",

        correct: "mon père",

        explanation: "Mon père means my father.",

      },

    ],

  },

  {

    title: "La météo",

    subtitle: "The weather",

    location: "Le studio météo",

    description:

      "Become a weather presenter and report weather conditions in French.",

    image:

      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&fit=crop",

    words: [

      { fr: "Il pleut", en: "It is raining" },

      { fr: "Il neige", en: "It is snowing" },

      { fr: "Il fait chaud", en: "It is hot" },

      { fr: "Il fait froid", en: "It is cold" },

      { fr: "Il fait beau", en: "The weather is nice" },

      { fr: "Il y a du vent", en: "It is windy" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Today's forecast",

        prompt:

          "Rain is falling in Paris. Which forecast is correct?",

        options: [

          "Il neige",

          "Il pleut",

          "Il fait chaud",

          "Il fait beau",

        ],

        correct: "Il pleut",

        explanation: "Il pleut means it is raining.",

      },

      {

        kind: "order",

        title: "Present the weather",

        prompt: "Build the forecast: It is cold in Paris.",

        tokens: [

          "froid",

          "À Paris,",

          "il",

          "fait",

          ".",

        ],

        correct: "À Paris, il fait froid .",

        explanation:

          "À Paris, il fait froid means It is cold in Paris.",

        audio: "À Paris, il fait froid.",

      },

      {

        kind: "type",

        title: "Weather report",

        prompt: "Type the French for 'It is snowing'.",

        correct: "Il neige",

        explanation: "Il neige means It is snowing.",

      },

    ],

  },

  {

    title: "Les vêtements",

    subtitle: "Clothing",

    location: "La boutique parisienne",

    description:

      "Browse a fashion boutique and practise clothing vocabulary and polite shopping requests.",

    image:

      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&fit=crop",

    words: [

      { fr: "une robe", en: "a dress" },

      { fr: "une chemise", en: "a shirt" },

      { fr: "un pantalon", en: "trousers" },

      { fr: "une jupe", en: "a skirt" },

      { fr: "des chaussures", en: "shoes" },

      { fr: "un chapeau", en: "a hat" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Choose the item",

        prompt:

          "You need a dress. What do you ask for?",

        options: [

          "un chapeau",

          "une robe",

          "un pantalon",

          "des chaussures",

        ],

        correct: "une robe",

        explanation: "Une robe is a dress.",

      },

      {

        kind: "order",

        title: "Speak to the shopkeeper",

        prompt:

          "Arrange a polite request for a shirt.",

        tokens: [

          "chemise,",

          "Je",

          "une",

          "voudrais",

          "s'il vous plaît.",

        ],

        correct:

          "Je voudrais une chemise, s'il vous plaît.",

        explanation:

          "Je voudrais ... s'il vous plaît is a polite shopping request.",

      },

      {

        kind: "type",

        title: "Find the shoes",

        prompt: "Type the French for 'shoes'.",

        correct: "des chaussures",

        accepted: ["chaussures"],

        explanation: "Des chaussures means shoes.",

      },

    ],

  },

  {

    title: "Les saisons",

    subtitle: "The seasons",

    location: "Le parc des saisons",

    description:

      "Explore seasonal landscapes and talk about activities in each season.",

    image:

      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&fit=crop",

    words: [

      { fr: "le printemps", en: "spring" },

      { fr: "l'été", en: "summer" },

      { fr: "l'automne", en: "autumn" },

      { fr: "l'hiver", en: "winter" },

      { fr: "en été", en: "in summer" },

      { fr: "en hiver", en: "in winter" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Choose a season",

        prompt: "Which season is 'l'hiver'?",

        options: [

          "spring",

          "summer",

          "winter",

          "autumn",

        ],

        correct: "winter",

        explanation: "L'hiver means winter.",

      },

      {

        kind: "order",

        title: "Talk about summer",

        prompt: "Build: In summer, it is hot.",

        tokens: [

          "chaud.",

          "été,",

          "En",

          "il",

          "fait",

        ],

        correct: "En été, il fait chaud.",

        explanation:

          "En été, il fait chaud means In summer, it is hot.",

      },

      {

        kind: "type",

        title: "Name the season",

        prompt:

          "Type the French for 'spring' (include the article).",

        correct: "le printemps",

        accepted: ["printemps"],

        explanation: "Le printemps means spring.",

      },

    ],

  },

  {

    title: "Les jours de la semaine",

    subtitle: "Days of the week",

    location: "L'emploi du temps",

    description:

      "Organise your weekly timetable and discuss school routines in French.",

    image:

      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&fit=crop",

    words: [

      { fr: "lundi", en: "Monday" },

      { fr: "mardi", en: "Tuesday" },

      { fr: "mercredi", en: "Wednesday" },

      { fr: "jeudi", en: "Thursday" },

      { fr: "vendredi", en: "Friday" },

      { fr: "samedi", en: "Saturday" },

      { fr: "dimanche", en: "Sunday" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Plan your week",

        prompt: "Which day follows lundi?",

        options: [

          "jeudi",

          "mardi",

          "dimanche",

          "vendredi",

        ],

        correct: "mardi",

        explanation: "Mardi is Tuesday.",

      },

      {

        kind: "order",

        title: "Put the days in order",

        prompt:

          "Arrange the first four days of the French school week.",

        tokens: [

          "jeudi",

          "mardi",

          "lundi",

          "mercredi",

        ],

        correct: "lundi mardi mercredi jeudi",

        explanation:

          "Lundi, mardi, mercredi, jeudi is the correct order.",

      },

      {

        kind: "type",

        title: "Weekly timetable",

        prompt: "Type the French for 'Friday'.",

        correct: "vendredi",

        explanation: "Vendredi means Friday.",

      },

    ],

  },

  {

    title: "Les mois de l'année",

    subtitle: "Months of the year",

    location: "Le calendrier",

    description:

      "Explore a calendar, identify months and schedule events.",

    image:

      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&fit=crop",

    words: [

      { fr: "janvier", en: "January" },

      { fr: "février", en: "February" },

      { fr: "mars", en: "March" },

      { fr: "avril", en: "April" },

      { fr: "mai", en: "May" },

      { fr: "juin", en: "June" },

      { fr: "juillet", en: "July" },

      { fr: "août", en: "August" },

      { fr: "septembre", en: "September" },

      { fr: "octobre", en: "October" },

      { fr: "novembre", en: "November" },

      { fr: "décembre", en: "December" },

    ],

    tasks: [

      {

        kind: "choice",

        title: "Calendar challenge",

        prompt: "Which month follows mars?",

        options: [

          "mai",

          "février",

          "avril",

          "juin",

        ],

        correct: "avril",

        explanation: "Avril is April.",

      },

      {

        kind: "order",

        title: "Organise the months",

        prompt:

          "Arrange these four months chronologically.",

        tokens: [

          "avril",

          "février",

          "mars",

          "janvier",

        ],

        correct: "janvier février mars avril",

        explanation:

          "January, February, March, April.",

      },

      {

        kind: "type",

        title: "Plan an event",

        prompt: "Type the French for 'August'.",

        correct: "août",

        explanation: "Août means August.",

      },

    ],

  },

  {

    title: "Mon anniversaire",

    subtitle: "My birthday",

    location: "La fête d'anniversaire",

    description:

      "Plan a birthday celebration, invite friends and talk about dates and presents.",

    image:

      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&fit=crop",

    words: [

      { fr: "mon anniversaire", en: "my birthday" },

      { fr: "un gâteau", en: "a cake" },

      { fr: "un cadeau", en: "a present" },

      { fr: "une fête", en: "a party" },

      {

        fr: "Joyeux anniversaire !",

        en: "Happy birthday!",

      },

      {

        fr: "Tu es invité(e)",

        en: "You are invited",

      },

    ],

    tasks: [

      {

        kind: "choice",

        title: "At the party",

        prompt:

          "What do you say to someone on their birthday?",

        options: [

          "Bonne nuit !",

          "Joyeux anniversaire !",

          "Bon voyage !",

          "À demain !",

        ],

        correct: "Joyeux anniversaire !",

        explanation:

          "Joyeux anniversaire means Happy birthday!",

      },

      {

        kind: "order",

        title: "Tell someone your birthday",

        prompt:

          "Arrange: My birthday is on 15 May.",

        tokens: [

          "le",

          "Mon anniversaire,",

          "mai.",

          "c'est",

          "quinze",

        ],

        correct:

          "Mon anniversaire, c'est le quinze mai.",

        explanation:

          "This is a natural way to state a birthday date.",

      },

      {

        kind: "type",

        title: "Party shopping",

        prompt: "Type the French for 'a cake'.",

        correct: "un gâteau",

        accepted: ["gâteau"],

        explanation: "Un gâteau means a cake.",

      },

    ],

  },

];

function normalize(value: string) {

  return value

    .trim()

    .toLocaleLowerCase("fr")

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .replace(/[’']/g, "'")

    .replace(/[.!?\s]+$/g, "")

    .replace(/\s+/g, " ");

}

function shuffled<T>(array: T[]) {

  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [

      result[j],

      result[i],

    ];

  }

  return result;

}

function speak(text: string) {

  if (

    typeof window === "undefined" ||

    !("speechSynthesis" in window)

  ) {

    return;

  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "fr-FR";

  utterance.rate = 0.82;

  const frenchVoice = window.speechSynthesis

    .getVoices()

    .find((voice) =>

      voice.lang.toLowerCase().startsWith("fr")

    );

  if (frenchVoice) {

    utterance.voice = frenchVoice;

  }

  window.speechSynthesis.speak(utterance);

}

type Stage = "learn" | "match" | "tasks" | "done";

export default function GamesPage() {

  const [missionIndex, setMissionIndex] = useState(0);

  const [stage, setStage] = useState<Stage>("learn");

  const [englishOrder, setEnglishOrder] = useState<number[]>([]);

  const [selectedFrench, setSelectedFrench] =

    useState<number | null>(null);

  const [matched, setMatched] = useState<number[]>([]);

  const [feedback, setFeedback] = useState("");

  const [taskIndex, setTaskIndex] = useState(0);

  const [choice, setChoice] = useState<string | null>(null);

  const [typed, setTyped] = useState("");

  const [ordered, setOrdered] = useState<number[]>([]);

  const [checked, setChecked] = useState(false);

  const [correct, setCorrect] = useState(false);

  const [points, setPoints] = useState(0);

  const [best, setBest] = useState<Record<number, number>>({});

  const [showCertificate, setShowCertificate] = useState(false);

  const mission = missions[missionIndex];

  const task = mission.tasks[taskIndex];

  const total = useMemo(

    () =>

      Object.values(best).reduce(

        (a, b) => a + b,

        0

      ),

    [best]

  );

  const completed = Object.keys(best).length;

  useEffect(() => {

    const param = Number(

      new URLSearchParams(window.location.search).get(

        "mission"

      )

    );

    if (

      Number.isInteger(param) &&

      param >= 1 &&

      param <= missions.length

    ) {

      setMissionIndex(param - 1);

    }

    try {

      const stored = localStorage.getItem(

        "mission-paris-progress-v2"

      );

      if (stored) {

        const parsed = JSON.parse(stored);

        if (

          parsed &&

          typeof parsed === "object" &&

          !Array.isArray(parsed)

        ) {

          setBest(parsed);

        }

      }

    } catch {

      // Browser storage is optional.

    }

  }, []);

  function openMission(index: number) {

    setMissionIndex(index);

    setStage("learn");

    setSelectedFrench(null);

    setMatched([]);

    setFeedback("");

    setTaskIndex(0);

    setChoice(null);

    setTyped("");

    setOrdered([]);

    setChecked(false);

    setCorrect(false);

    setPoints(0);

    setShowCertificate(false);

    if (typeof window !== "undefined") {

      window.speechSynthesis?.cancel();

      window.history.replaceState(

        null,

        "",

        `/games?mission=${index + 1}`

      );

      document

        .getElementById("play")

        ?.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

    }

  }

  function beginMatching() {

    setEnglishOrder(

      shuffled(

        mission.words

          .slice(0, 6)

          .map((_, index) => index)

      )

    );

    setSelectedFrench(null);

    setMatched([]);

    setFeedback("");

    setStage("match");

  }

  function matchEnglish(index: number) {

    if (

      selectedFrench === null ||

      matched.includes(index)

    ) {

      return;

    }

    if (selectedFrench === index) {

      const next = [...matched, index];

      setMatched(next);

      setPoints((p) => p + 50);

      setFeedback(

        next.length === 6

          ? "All six matches complete. Continue to the challenges."

          : "Correct match. +50 points."

      );

    } else {

      setFeedback(

        "Not quite. Select a French word and try again."

      );

    }

    setSelectedFrench(null);

  }

  function checkTask() {

    if (checked) return;

    let isRight = false;

    if (task.kind === "choice") {

      isRight = choice === task.correct;

    }

    if (task.kind === "type") {

      isRight = [

        task.correct,

        ...(task.accepted ?? []),

      ].some(

        (answer) =>

          normalize(answer) === normalize(typed)

      );

    }

    if (task.kind === "order") {

      isRight =

        normalize(

          ordered

            .map((index) => task.tokens[index])

            .join(" ")

        ) === normalize(task.correct);

    }

    setCorrect(isRight);

    setChecked(true);

    if (isRight) {

      setPoints((p) => p + 100);

    }

  }

  function nextTask() {

    if (!checked) return;

    if (taskIndex < mission.tasks.length - 1) {

      setTaskIndex((index) => index + 1);

      setChoice(null);

      setTyped("");

      setOrdered([]);

      setChecked(false);

      setCorrect(false);

    } else {

      const nextBest = {

        ...best,

        [missionIndex]: Math.max(

          best[missionIndex] ?? 0,

          points

        ),

      };

      setBest(nextBest);

      try {

        localStorage.setItem(

          "mission-paris-progress-v2",

          JSON.stringify(nextBest)

        );

      } catch {

        // Browser storage is optional.

      }

      setStage("done");

    }

  }

  function advance() {

    if (missionIndex === missions.length - 1) {

      setShowCertificate(true);

    } else {

      openMission(missionIndex + 1);

    }

  }

  const maxPoints = 600;

  return (

    <main className="min-h-screen bg-[#f8f6f2] text-[#243137]">

      {/* NAVIGATION */}

      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">

        <nav className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-10">

          <Link href="/games" className="font-black">

            <span className="block text-xs uppercase tracking-[0.25em] text-[#a47558]">

              Mission Paris

            </span>

            <span className="mt-1 block text-lg">

              French Learning Arcade

            </span>

          </Link>

          <div className="flex flex-wrap gap-3 text-sm font-bold">

            <Link

              href="/research"

              className="rounded-full border border-stone-300 px-5 py-3 hover:bg-stone-100"

            >

              Research Presentation

            </Link>

            <Link

              href="/"

              className="rounded-full bg-[#283e46] px-5 py-3 text-white"

            >

              Shopping Simulation

            </Link>

          </div>

        </nav>

      </header>

      {/* MAIN HERO */}

      <section className="relative overflow-hidden bg-[#142328] text-white">

        <img

          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&fit=crop"

          alt="Parisian streets"

          className="absolute inset-0 h-full w-full object-cover opacity-45"

        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#142328]/95 via-[#142328]/75 to-transparent" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#e8c3a6]">

            Interactive French learning with Mme Zoya Graham

          </p>

          <h1 className="mt-5 text-5xl font-black md:text-7xl">

            Mission Paris

          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-stone-200">

            Explore real-world situations, interact with

            3D models, hear French pronunciation, match

            vocabulary and solve language challenges

            across ten missions.

          </p>

          <div className="mt-9 flex flex-wrap gap-3 text-sm font-bold">

            <span className="rounded-full border border-white/40 px-5 py-3">

              {completed} / 10 completed

            </span>

            <span className="rounded-full border border-white/40 px-5 py-3">

              {total} points

            </span>

            <span className="rounded-full border border-white/40 px-5 py-3">

              {Math.round((completed / 10) * 100)}% progress

            </span>

          </div>

        </div>

      </section>

      {/* MISSION GALLERY */}

      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10">

        <p className="text-sm font-bold uppercase tracking-widest text-[#a47558]">

          Choose your destination

        </p>

        <h2 className="mt-3 text-3xl font-black md:text-5xl">

          Ten French learning missions

        </h2>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {missions.map((item, index) => (

            <button

              key={item.title}

              onClick={() => openMission(index)}

              className={`overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 hover:shadow-xl ${

                missionIndex === index

                  ? "border-[#283e46] bg-[#283e46] text-white shadow-lg"

                  : "border-stone-200 bg-white"

              }`}

            >

              <div className="relative h-36">

                <img

                  src={item.image}

                  alt={item.location}

                  className="h-full w-full object-cover"

                />

                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-[#283e46]">

                  {String(index + 1).padStart(2, "0")}

                </span>

              </div>

              <div className="p-4">

                <h3 className="font-black">

                  {item.title}

                </h3>

                <p className="mt-2 text-sm opacity-75">

                  {item.subtitle}

                </p>

                {best[index] !== undefined && (

                  <p className="mt-3 text-xs font-bold">

                    Completed · {best[index]} points

                  </p>

                )}

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* FULL-WIDTH LEARNING ENVIRONMENT */}

      <section

        className="scroll-mt-24 bg-[#ebe5dc] px-5 py-16 md:px-10"

        id="play"

      >

        <div className="mx-auto max-w-[1500px]">

          <p className="text-sm font-bold uppercase tracking-widest text-[#9b6c51]">

            Mission {missionIndex + 1} · {mission.subtitle}

          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">

            {mission.title}

          </h2>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-stone-600">

            {mission.description}

          </p>

          {/* REAL PHOTO AND 3D SIDE BY SIDE */}

          <div className="mt-9 grid gap-6 lg:grid-cols-2">

            <div className="overflow-hidden rounded-[28px] bg-white shadow-lg">

              <img

                src={mission.image}

                alt={mission.location}

                className="h-[340px] w-full object-cover md:h-[400px]"

              />

              <div className="p-7">

                <p className="text-xs font-bold uppercase tracking-widest text-[#a47558]">

                  Your learning destination

                </p>

                <h3 className="mt-2 text-2xl font-black">

                  {mission.location}

                </h3>

              </div>

            </div>

            <div className="rounded-[28px] bg-white p-7 shadow-lg">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <h3 className="text-2xl font-black">

                  Interactive 3D

                </h3>

                <span className="rounded-full bg-[#eee8df] px-4 py-2 text-xs font-bold">

                  Drag to rotate

                </span>

              </div>

              <p className="mt-3 text-sm leading-7 text-stone-600">

                Use your mouse or finger to explore the

                model from different angles.

              </p>

              <div className="mt-4">

                <Scene3D

                  topic={missionIndex}

                  height={350}

                />

              </div>

            </div>

          </div>

          {/* FULL-WIDTH GAME */}

          <div className="mt-8 rounded-[28px] bg-white p-6 shadow-lg md:p-10 lg:p-14">

            <div className="mb-9 flex flex-wrap items-center justify-between gap-4">

              <div className="flex flex-wrap gap-2">

                {[

                  ["learn", "01 Learn"],

                  ["match", "02 Match"],

                  ["tasks", "03 Challenges"],

                ].map(([value, label]) => (

                  <span

                    key={value}

                    className={`rounded-full px-5 py-3 text-sm font-bold ${

                      stage === value

                        ? "bg-[#283e46] text-white"

                        : "bg-[#f2ece5] text-stone-500"

                    }`}

                  >

                    {label}

                  </span>

                ))}

              </div>

              <p className="rounded-full bg-[#f2ece5] px-5 py-3 font-black">

                {points} points

              </p>

            </div>

            {/* STAGE ONE: VOCABULARY */}

            {stage === "learn" && (

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#a47558]">

                  Stage one · Vocabulary

                </p>

                <h3 className="mt-3 text-3xl font-black">

                  Discover the French

                </h3>

                <p className="mt-4 leading-8 text-stone-600">

                  Select a vocabulary card to hear its

                  French pronunciation. Practise the words

                  before starting the games.

                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {mission.words.map((word) => (

                    <button

                      key={word.fr}

                      onClick={() => speak(word.fr)}

                      className="min-h-36 rounded-2xl border border-stone-200 bg-[#f8f6f2] p-6 text-left transition hover:border-[#a47558] hover:bg-[#f2ece5]"

                    >

                      <p className="text-xl font-black text-[#283e46]">

                        {word.fr}

                      </p>

                      <p className="mt-3 text-stone-600">

                        {word.en}

                      </p>

                      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#9b6c51]">

                        Listen to French

                      </p>

                    </button>

                  ))}

                </div>

                <button

                  onClick={beginMatching}

                  className="mt-9 rounded-2xl bg-[#283e46] px-8 py-5 text-lg font-bold text-white"

                >

                  Start the matching game

                </button>

              </div>

            )}

            {/* STAGE TWO: MATCHING */}

            {stage === "match" && (

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#a47558]">

                  Stage two · Vocabulary matching

                </p>

                <h3 className="mt-3 text-3xl font-black">

                  Match the French and English

                </h3>

                <p className="mt-4 leading-8 text-stone-600">

                  Select a French expression, then its

                  English meaning. Each correct pair earns

                  50 points.

                </p>

                <p className="mt-5 font-bold">

                  {matched.length} / 6 pairs matched

                </p>

                <div className="mt-7 grid grid-cols-2 gap-4 md:gap-8">

                  <div className="space-y-3">

                    <p className="text-sm font-bold uppercase tracking-widest text-stone-500">

                      French

                    </p>

                    {mission.words

                      .slice(0, 6)

                      .map((word, index) => (

                        <button

                          key={word.fr}

                          disabled={matched.includes(index)}

                          onClick={() => {

                            setSelectedFrench(index);

                            setFeedback("");

                            speak(word.fr);

                          }}

                          className={`min-h-20 w-full rounded-xl border p-4 text-left font-bold transition ${

                            matched.includes(index)

                              ? "border-green-200 bg-green-50 text-green-900"

                              : selectedFrench === index

                              ? "border-[#283e46] bg-[#283e46] text-white"

                              : "border-stone-200 bg-[#f8f6f2] hover:border-[#a47558]"

                          }`}

                        >

                          {matched.includes(index)

                            ? "Matched"

                            : word.fr}

                        </button>

                      ))}

                  </div>

                  <div className="space-y-3">

                    <p className="text-sm font-bold uppercase tracking-widest text-stone-500">

                      English

                    </p>

                    {englishOrder.map((index) => (

                      <button

                        key={index}

                        disabled={matched.includes(index)}

                        onClick={() => matchEnglish(index)}

                        className={`min-h-20 w-full rounded-xl border p-4 text-left font-semibold transition ${

                          matched.includes(index)

                            ? "border-green-200 bg-green-50 text-green-900"

                            : "border-stone-200 bg-[#f8f6f2] hover:border-[#a47558]"

                        }`}

                      >

                        {matched.includes(index)

                          ? "Matched"

                          : mission.words[index].en}

                      </button>

                    ))}

                  </div>

                </div>

                {feedback && (

                  <p

                    aria-live="polite"

                    className="mt-6 rounded-xl bg-[#f2ece5] p-4 font-semibold"

                  >

                    {feedback}

                  </p>

                )}

                {matched.length === 6 && (

                  <button

                    onClick={() => {

                      setStage("tasks");

                      setTaskIndex(0);

                      setChecked(false);

                    }}

                    className="mt-8 rounded-2xl bg-[#283e46] px-8 py-5 font-bold text-white"

                  >

                    Continue to the challenges

                  </button>

                )}

              </div>

            )}

            {/* STAGE THREE: INTERACTIVE CHALLENGES */}

            {stage === "tasks" && (

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#a47558]">

                  Stage three · Interactive challenges

                </p>

                <h3 className="mt-3 text-3xl font-black">

                  {task.title}

                </h3>

                <p className="mt-4 text-sm font-bold text-stone-500">

                  Challenge {taskIndex + 1} of{" "}

                  {mission.tasks.length}

                </p>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200">

                  <div

                    className="h-full rounded-full bg-[#a47558] transition-all"

                    style={{

                      width: `${

                        ((taskIndex + 1) /

                          mission.tasks.length) *

                        100

                      }%`,

                    }}

                  />

                </div>

                <p className="mt-8 text-2xl font-bold leading-9">

                  {task.prompt}

                </p>

                {task.audio && (

                  <button

                    onClick={() => speak(task.audio!)}

                    className="mt-4 rounded-full border border-stone-300 px-5 py-3 font-bold"

                  >

                    Listen to the prompt

                  </button>

                )}

                {/* MULTIPLE CHOICE */}

                {task.kind === "choice" && (

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">

                    {task.options.map((option, index) => (

                      <button

                        key={option}

                        disabled={checked}

                        onClick={() => setChoice(option)}

                        className={`min-h-20 rounded-2xl border p-5 text-left font-bold transition ${

                          checked &&

                          option === task.correct

                            ? "border-green-500 bg-green-50"

                            : checked &&

                              choice === option &&

                              !correct

                            ? "border-red-400 bg-red-50"

                            : choice === option

                            ? "border-[#283e46] bg-[#e6eeed]"

                            : "border-stone-200 bg-[#f8f6f2] hover:border-[#a47558]"

                        }`}

                      >

                        <span className="mr-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white">

                          {String.fromCharCode(65 + index)}

                        </span>

                        {option}

                      </button>

                    ))}

                  </div>

                )}

                {/* TYPING */}

                {task.kind === "type" && (

                  <div className="mt-8">

                    <label

                      htmlFor="french-answer"

                      className="block font-bold"

                    >

                      Your French answer

                    </label>

                    <input

                      id="french-answer"

                      value={typed}

                      onChange={(event) =>

                        setTyped(event.target.value)

                      }

                      disabled={checked}

                      onKeyDown={(event) => {

                        if (

                          event.key === "Enter" &&

                          typed.trim() &&

                          !checked

                        ) {

                          checkTask();

                        }

                      }}

                      placeholder="Type your answer in French"

                      className="mt-3 w-full rounded-2xl border border-stone-300 bg-[#f8f6f2] px-6 py-5 text-lg outline-none focus:border-[#a47558]"

                    />

                    <p className="mt-3 text-sm text-stone-500">

                      Accents are encouraged. Answers

                      are checked without penalising

                      missing accents.

                    </p>

                  </div>

                )}

                {/* SENTENCE ORDERING */}

                {task.kind === "order" && (

                  <div className="mt-8">

                    <p className="font-bold">

                      Your sentence

                    </p>

                    <div className="mt-3 flex min-h-24 flex-wrap items-center gap-3 rounded-2xl border-2 border-dashed border-stone-300 bg-[#f8f6f2] p-4">

                      {ordered.length === 0 && (

                        <span className="text-stone-400">

                          Select words below to build

                          your sentence.

                        </span>

                      )}

                      {ordered.map((index) => (

                        <button

                          key={index}

                          disabled={checked}

                          onClick={() =>

                            setOrdered((current) =>

                              current.filter(

                                (item) => item !== index

                              )

                            )

                          }

                          className="rounded-xl bg-[#283e46] px-4 py-3 font-bold text-white"

                        >

                          {task.tokens[index]}

                        </button>

                      ))}

                    </div>

                    <p className="mt-6 font-bold">

                      Available words

                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">

                      {task.tokens.map((token, index) => (

                        <button

                          key={index}

                          disabled={

                            checked ||

                            ordered.includes(index)

                          }

                          onClick={() =>

                            setOrdered((current) => [

                              ...current,

                              index,

                            ])

                          }

                          className="rounded-xl border border-stone-300 bg-white px-5 py-3 font-bold disabled:opacity-30"

                        >

                          {token}

                        </button>

                      ))}

                    </div>

                    {!checked && (

                      <button

                        onClick={() => setOrdered([])}

                        className="mt-5 text-sm font-bold underline"

                      >

                        Clear sentence

                      </button>

                    )}

                  </div>

                )}

                {/* CHECK ANSWER */}

                {!checked && (

                  <button

                    disabled={

                      (task.kind === "choice" &&

                        choice === null) ||

                      (task.kind === "type" &&

                        !typed.trim()) ||

                      (task.kind === "order" &&

                        ordered.length !==

                          task.tokens.length)

                    }

                    onClick={checkTask}

                    className="mt-9 rounded-2xl bg-[#283e46] px-9 py-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"

                  >

                    Check my answer

                  </button>

                )}

                {/* FEEDBACK */}

                {checked && (

                  <div

                    aria-live="polite"

                    className={`mt-8 rounded-2xl border p-6 ${

                      correct

                        ? "border-green-200 bg-green-50"

                        : "border-amber-200 bg-amber-50"

                    }`}

                  >

                    <p className="text-xl font-black">

                      {correct

                        ? "Correct! +100 points"

                        : "Good effort. Here is the correct answer."}

                    </p>

                    <p className="mt-3 leading-8">

                      {task.explanation}

                    </p>

                    <p className="mt-2 font-bold">

                      Correct answer: {task.correct}

                    </p>

                    <button

                      onClick={() =>

                        speak(task.audio || task.correct)

                      }

                      className="mt-5 rounded-xl border border-stone-300 bg-white px-5 py-3 font-bold"

                    >

                      Hear the correct answer

                    </button>

                    <button

                      onClick={nextTask}

                      className="mt-5 block w-full rounded-xl bg-[#283e46] px-6 py-4 font-bold text-white"

                    >

                      {taskIndex ===

                      mission.tasks.length - 1

                        ? "Finish mission"

                        : "Next challenge"}

                    </button>

                  </div>

                )}

              </div>

            )}

            {/* COMPLETION */}

            {stage === "done" && (

              <div className="py-12 text-center">

                <p className="text-sm font-bold uppercase tracking-widest text-[#a47558]">

                  Mission complete

                </p>

                <h3 className="mt-4 text-5xl font-black">

                  Félicitations !

                </h3>

                <p className="mt-5 text-lg text-stone-600">

                  You completed {mission.title}.

                </p>

                <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#f2ece5] p-9">

                  <p className="font-bold">

                    Your mission score

                  </p>

                  <p className="mt-3 text-6xl font-black">

                    {points}

                  </p>

                  <p className="mt-2 text-stone-600">

                    out of {maxPoints} points

                  </p>

                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">

                  <button

                    onClick={advance}

                    className="rounded-full bg-[#283e46] px-8 py-4 font-bold text-white"

                  >

                    {missionIndex === 9

                      ? "View achievement"

                      : "Next mission"}

                  </button>

                  <button

                    onClick={() =>

                      openMission(missionIndex)

                    }

                    className="rounded-full border border-stone-300 px-8 py-4 font-bold"

                  >

                    Play again

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </section>

      {/* PROGRESS */}

      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10">

        <h2 className="text-3xl font-black md:text-4xl">

          Your learning progress

        </h2>

        <div className="mt-7 h-4 overflow-hidden rounded-full bg-stone-200">

          <div

            className="h-full rounded-full bg-[#a47558]"

            style={{

              width: `${(completed / 10) * 100}%`,

            }}

          />

        </div>

        <p className="mt-4 text-stone-600">

          {completed} of 10 missions completed ·{" "}

          {total} best-score points

        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

          {missions.map((item, index) => (

            <button

              key={item.title}

              onClick={() => openMission(index)}

              className="rounded-2xl border border-stone-200 bg-white p-5 text-left hover:shadow-md"

            >

              <p className="text-xs font-bold uppercase tracking-widest text-[#a47558]">

                Mission {index + 1}

              </p>

              <h3 className="mt-2 font-black">

                {item.title}

              </h3>

              <p className="mt-3 text-sm text-stone-600">

                {best[index] === undefined

                  ? "Not yet completed"

                  : `Completed · ${best[index]} points`}

              </p>

            </button>

          ))}

        </div>

        {completed === 10 && (

          <button

            onClick={() => setShowCertificate(true)}

            className="mt-9 rounded-full bg-[#283e46] px-8 py-4 font-bold text-white"

          >

            View achievement certificate

          </button>

        )}

      </section>

      {/* CERTIFICATE */}

      {showCertificate && (

        <section className="bg-[#ebe5dc] px-5 py-16">

          <div className="mx-auto max-w-4xl rounded-3xl border-8 border-[#d4b393] bg-white p-10 text-center shadow-xl">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#a47558]">

              Mission Paris · Mme Zoya Graham

            </p>

            <h2 className="mt-6 text-4xl font-black">

              Certificate of Achievement

            </h2>

            <p className="mt-7 text-lg">

              Awarded for completing ten interactive

              French learning missions.

            </p>

            <p className="mt-8 text-2xl font-black">

              Best score: {total} / 6000

            </p>

            <p className="mt-4 text-sm text-stone-500">

              This recognises completion of website

              activities, not an academic qualification.

            </p>

            <button

              onClick={() => window.print()}

              className="mt-8 rounded-full bg-[#283e46] px-8 py-4 font-bold text-white"

            >

              Print certificate

            </button>

          </div>

        </section>

      )}

      {/* FOOTER */}

      <footer className="bg-[#192a2e] px-6 py-12 text-center text-white">

        <p className="text-2xl font-black">

          Mission Paris

        </p>

        <p className="mt-3 text-[#e8c3a6]">

          Mme Zoya Graham

        </p>

        <p className="mt-4 text-stone-300">

          Real-world French practice through interactive

          learning.

        </p>

        <Link

          href="/research"

          className="mt-6 inline-block font-bold underline"

        >

          Return to the research presentation

        </Link>

      </footer>

    </main>

  );

}