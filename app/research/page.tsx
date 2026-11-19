

"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

const Scene3D = dynamic(

  () => import("../components/Scene3D"),

  { ssr: false }

);

const lessons = [

  {

    title: "Les salutations",

    subtitle: "Everyday French conversations",

    setting: "The Paris Café",

    photo:

      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&fit=crop",

    research:

      "Dialogue-based activities can be used to explore student participation and communicative practice.",

    example: "Bonjour ! Comment ça va ?",

  },

  {

    title: "L'alphabet",

    subtitle: "French letters and pronunciation",

    setting: "The Language Studio",

    photo:

      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&fit=crop",

    research:

      "Audio-supported letter recognition provides an example of combining visual and spoken information.",

    example: "A, B, C, D, E",

  },

  {

    title: "Les nombres de 1 à 30",

    subtitle: "Numbers in practical situations",

    setting: "The Train Station",

    photo:

      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&fit=crop",

    research:

      "Number recognition games provide opportunities to examine vocabulary recall and immediate feedback.",

    example: "vingt et un, vingt-deux, vingt-trois",

  },

  {

    title: "Ma famille et moi",

    subtitle: "Family and personal identity",

    setting: "The Family Album",

    photo:

      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&fit=crop",

    research:

      "Visual family relationships can support contextual vocabulary practice and spoken descriptions.",

    example: "Voici ma mère et mon frère.",

  },

  {

    title: "La météo",

    subtitle: "Weather and spoken forecasts",

    setting: "The Weather Studio",

    photo:

      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&fit=crop",

    research:

      "Simulated weather reporting provides a setting for applying vocabulary to meaningful communication.",

    example: "À Paris, il pleut aujourd'hui.",

  },

  {

    title: "Les vêtements",

    subtitle: "Clothing and shopping expressions",

    setting: "The Paris Boutique",

    photo:

      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&fit=crop",

    research:

      "Shopping simulations offer contextual practice with clothing vocabulary and polite requests.",

    example: "Je voudrais une chemise, s'il vous plaît.",

  },

  {

    title: "Les saisons",

    subtitle: "Seasons and everyday activities",

    setting: "The Holiday Planner",

    photo:

      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&fit=crop",

    research:

      "Seasonal environments provide visual cues that can be connected to vocabulary and sentence construction.",

    example: "En été, je vais à la plage.",

  },

  {

    title: "Les jours de la semaine",

    subtitle: "Daily routines and schedules",

    setting: "The Weekly Planner",

    photo:

      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&fit=crop",

    research:

      "Interactive scheduling activities demonstrate how vocabulary can be connected to familiar routines.",

    example: "Lundi, j'ai cours de français.",

  },

  {

    title: "Les mois de l'année",

    subtitle: "Dates, months and events",

    setting: "The Events Calendar",

    photo:

      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&fit=crop",

    research:

      "Calendar-based interactions support repeated practice of month names and their sequence.",

    example: "Nous sommes en novembre.",

  },

  {

    title: "Mon anniversaire",

    subtitle: "Birthdays and invitations",

    setting: "The Birthday Celebration",

    photo:

      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&fit=crop",

    research:

      "Personalised birthday invitations offer an example of applying dates and expressions in a communicative task.",

    example: "Mon anniversaire, c'est le quinze mai.",

  },

];

const questions = [

  {

    title: "Engagement and learning challenges",

    text:

      "What challenges affect student engagement, vocabulary retention and communicative competence in French learning?",

  },

  {

    title: "Gamification",

    text:

      "How does gamification influence student motivation, interest and vocabulary retention?",

  },

  {

    title: "Visual simulations",

    text:

      "What role do visual simulations play in comprehension, pronunciation and the application of French?",

  },

  {

    title: "Combined ICT approaches",

    text:

      "How might gamification and visual simulations work together to support student engagement and learning outcomes?",

  },

];

const theories = [

  {

    title: "Constructivism",

    description:

      "Students actively construct understanding through participation, exploration and learning experiences.",

    connection:

      "The interactive missions allow learners to make choices, test understanding and receive feedback.",

  },

  {

    title: "Vygotsky's Social Constructivism",

    description:

      "Learning develops through social interaction, guidance and collaborative activity.",

    connection:

      "Dialogue simulations can be used alongside teacher support, peer discussion and classroom role-play.",

  },

  {

    title: "Krashen's Affective Filter",

    description:

      "Anxiety, confidence and motivation can influence language acquisition.",

    connection:

      "Supportive practice and opportunities to repeat activities may encourage students to participate with less pressure.",

  },

  {

    title: "Mayer's Multimedia Learning",

    description:

      "Learning can be supported when appropriate visual and verbal information are meaningfully combined.",

    connection:

      "The missions combine images, interactive objects, written French and spoken pronunciation.",

  },

];

const methodology = [

  {

    number: "01",

    title: "Research approach",

    description:

      "A mixed-methods action research design exploring ICT integration in French-language pedagogy.",

  },

  {

    number: "02",

    title: "Participants",

    description:

      "One Grade 8 class comprising 40 students at a secondary school in western Jamaica.",

  },

  {

    number: "03",

    title: "Achievement assessment",

    description:

      "A 20-item pre-test and post-test consisting of 10 vocabulary multiple-choice questions and 10 matching items involving French phrases.",

  },

  {

    number: "04",

    title: "Student feedback",

    description:

      "A 10-item survey using a five-point Likert scale, together with two open-ended questions.",

  },

  {

    number: "05",

    title: "Observation",

    description:

      "A structured classroom observation checklist organised around five engagement indicators.",

  },

];

function speakFrench(text: string) {

  if (

    typeof window === "undefined" ||

    !("speechSynthesis" in window)

  ) {

    return;

  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "fr-FR";

  speech.rate = 0.82;

  const voice = window.speechSynthesis

    .getVoices()

    .find((item) =>

      item.lang.toLowerCase().startsWith("fr")

    );

  if (voice) {

    speech.voice = voice;

  }

  window.speechSynthesis.speak(speech);

}

export default function ResearchPage() {

  const [activeQuestion, setActiveQuestion] = useState(0);

  const [activeTheory, setActiveTheory] = useState(0);

  const [activeLesson, setActiveLesson] = useState(0);

  const selectedLesson = lessons[activeLesson];

  return (

    <main className="min-h-screen bg-[#f8f6f2] text-[#25282b]">

      {/* NAVIGATION */}

      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">

        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

          <a href="/research" className="leading-tight">

            <span className="block text-xs font-bold uppercase tracking-[0.25em] text-[#a47558]">

              Mission Paris

            </span>

            <span className="mt-1 block text-lg font-black">

              ICT & French Pedagogy

            </span>

          </a>

          <div className="flex flex-wrap items-center gap-4 text-sm font-bold">

            <a

              href="#overview"

              className="hover:text-[#a47558]"

            >

              Overview

            </a>

            <a

              href="#questions"

              className="hover:text-[#a47558]"

            >

              Research Questions

            </a>

            <a

              href="#methodology"

              className="hover:text-[#a47558]"

            >

              Methodology

            </a>

            <a

              href="#demonstrations"

              className="hover:text-[#a47558]"

            >

              Demonstrations

            </a>

            <a

              href="/games"

              className="rounded-full bg-[#283e46] px-5 py-3 text-white transition hover:bg-[#41616b]"

            >

              French Learning Arcade

            </a>

          </div>

        </nav>

      </header>

      {/* HERO */}

      <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#18282c] text-white">

        <img

          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&fit=crop"

          alt="Parisian architecture and city streets"

          className="absolute inset-0 h-full w-full object-cover opacity-55"

        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#142328]/95 via-[#142328]/70 to-[#142328]/20" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#e8c3a6]">

            An Interactive Research Presentation

          </p>

          <h1 className="mt-7 max-w-5xl text-4xl font-black leading-tight md:text-6xl">

            Exploring the Integration of ICT in Enhancing

            the Delivery of the French Pedagogy

          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-9 text-stone-200">

            An exploration of gamification, visual

            simulations and their potential contributions

            to engagement, vocabulary retention and

            communicative competence in French education.

          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <a

              href="#overview"

              className="rounded-full bg-[#e4bda0] px-8 py-4 font-bold text-[#243139] transition hover:bg-[#f2d3ba]"

            >

              Explore the Research

            </a>

            <a

              href="#demonstrations"

              className="rounded-full border border-white/70 px-8 py-4 font-bold text-white transition hover:bg-white/10"

            >

              View Interactive Demonstrations

            </a>

          </div>

          <div className="mt-14 flex flex-wrap gap-8 border-t border-white/25 pt-7">

            <div>

              <p className="text-3xl font-black">40</p>

              <p className="mt-1 text-sm text-stone-300">

                Grade 8 participants

              </p>

            </div>

            <div>

              <p className="text-3xl font-black">10</p>

              <p className="mt-1 text-sm text-stone-300">

                French learning topics

              </p>

            </div>

            <div>

              <p className="text-3xl font-black">4</p>

              <p className="mt-1 text-sm text-stone-300">

                Research questions

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* OVERVIEW */}

      <section

        id="overview"

        className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24"

      >

        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b6c51]">

              Research Overview

            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight md:text-5xl">

              French learning beyond the textbook

            </h2>

            <p className="mt-7 text-lg leading-9 text-stone-600">

              The research explores the integration of

              information and communication technology into

              French pedagogy in a Jamaican secondary school

              context.

            </p>

            <p className="mt-5 leading-9 text-stone-600">

              It considers the challenges students may

              encounter in vocabulary retention, classroom

              engagement and communicative competence,

              while examining how gamification and visual

              simulations may contribute to the learning

              experience.

            </p>

            <p className="mt-5 leading-9 text-stone-600">

              This digital presentation brings the research

              framework together with interactive teaching

              demonstrations that illustrate possible

              applications of ICT in French-language learning.

            </p>

          </div>

          <div className="relative">

            <img

              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1300&fit=crop"

              alt="Learning environment with educational materials"

              className="h-[480px] w-full rounded-[32px] object-cover shadow-xl"

            />

            <div className="absolute -bottom-6 left-5 right-5 rounded-2xl bg-white p-6 shadow-lg md:left-10 md:right-10">

              <p className="text-xs font-bold uppercase tracking-widest text-[#9b6c51]">

                Central focus

              </p>

              <p className="mt-2 text-lg font-bold leading-7">

                Gamification, visual simulations and

                French-language pedagogy

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* RESEARCH QUESTIONS */}

      <section

        id="questions"

        className="scroll-mt-28 bg-[#ebe5dc] px-6 py-24"

      >

        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b6c51]">

            Research Direction

          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">

            Four research questions

          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-stone-600">

            Select a question to explore the central

            concerns guiding the study.

          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

            <div className="space-y-3">

              {questions.map((question, index) => (

                <button

                  key={question.title}

                  onClick={() => setActiveQuestion(index)}

                  className={`w-full rounded-2xl border px-6 py-5 text-left transition ${

                    activeQuestion === index

                      ? "border-[#283e46] bg-[#283e46] text-white"

                      : "border-stone-200 bg-white hover:border-[#a47558]"

                  }`}

                >

                  <span className="block text-xs font-bold uppercase tracking-widest opacity-70">

                    Question {index + 1}

                  </span>

                  <span className="mt-2 block text-lg font-bold">

                    {question.title}

                  </span>

                </button>

              ))}

            </div>

            <div className="flex min-h-[340px] flex-col justify-center rounded-[30px] bg-white p-9 shadow-sm md:p-12">

              <p className="text-sm font-bold uppercase tracking-widest text-[#a47558]">

                Research Question {activeQuestion + 1}

              </p>

              <h3 className="mt-6 text-2xl font-black leading-relaxed md:text-3xl">

                {questions[activeQuestion].text}

              </h3>

              <p className="mt-7 leading-8 text-stone-600">

                This question provides a point of reference

                for discussing the design of interactive

                teaching activities and the research

                instruments.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* THEORETICAL FRAMEWORK */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b6c51]">

          Theoretical Framework

        </p>

        <h2 className="mt-4 text-4xl font-black md:text-5xl">

          Theories informing the research

        </h2>

        <p className="mt-5 max-w-3xl leading-8 text-stone-600">

          These perspectives provide ways of understanding

          participation, interaction, confidence and

          multimedia learning.

        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">

          <div className="grid gap-4">

            {theories.map((theory, index) => (

              <button

                key={theory.title}

                onClick={() => setActiveTheory(index)}

                className={`rounded-2xl border p-6 text-left transition ${

                  activeTheory === index

                    ? "border-[#283e46] bg-[#283e46] text-white"

                    : "border-stone-200 bg-white hover:border-[#a47558]"

                }`}

              >

                <span className="text-lg font-bold">

                  {theory.title}

                </span>

              </button>

            ))}

          </div>

          <div className="rounded-[30px] bg-[#eee8df] p-9 md:p-12">

            <p className="text-xs font-bold uppercase tracking-widest text-[#a47558]">

              Theoretical Perspective

            </p>

            <h3 className="mt-5 text-3xl font-black">

              {theories[activeTheory].title}

            </h3>

            <p className="mt-6 text-lg leading-9 text-stone-700">

              {theories[activeTheory].description}

            </p>

            <div className="mt-8 border-t border-stone-300 pt-7">

              <p className="text-sm font-bold uppercase tracking-widest text-[#9b6c51]">

                Connection to the Demonstrations

              </p>

              <p className="mt-4 leading-8 text-stone-700">

                {theories[activeTheory].connection}

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* METHODOLOGY */}

      <section

        id="methodology"

        className="scroll-mt-28 bg-[#24383e] px-6 py-24 text-white"

      >

        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e0b99c]">

            Research Methodology

          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">

            Research design and instruments

          </h2>

          <p className="mt-6 max-w-3xl leading-9 text-stone-200">

            The study adopts a mixed-methods action

            research approach, incorporating achievement

            assessment, student feedback and classroom

            observation.

          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {methodology.map((item) => (

              <article

                key={item.number}

                className="rounded-[26px] border border-white/15 bg-white/10 p-8"

              >

                <span className="text-sm font-bold text-[#e0b99c]">

                  {item.number}

                </span>

                <h3 className="mt-6 text-xl font-black">

                  {item.title}

                </h3>

                <p className="mt-5 leading-8 text-stone-200">

                  {item.description}

                </p>

              </article>

            ))}

          </div>

          <p className="mt-9 max-w-4xl text-sm leading-7 text-stone-300">

            The information presented here describes the

            research design and instruments. No student

            results or empirical findings are represented

            by the demonstration activities on this website.

          </p>

        </div>

      </section>

      {/* INTERACTIVE DEMONSTRATIONS */}

      <section

        id="demonstrations"

        className="mx-auto max-w-7xl scroll-mt-28 px-6 py-24"

      >

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b6c51]">

          Interactive Teaching Exhibition

        </p>

        <h2 className="mt-4 text-4xl font-black md:text-5xl">

          Explore ten French learning environments

        </h2>

        <p className="mt-6 max-w-4xl leading-9 text-stone-600">

          Each environment illustrates a possible use of

          digital tools in French-language teaching.

          Select a lesson to explore its visual setting,

          rotate a three-dimensional model, hear French

          pronunciation and open the associated learning

          mission.

        </p>

        <div className="mt-12 grid gap-9 lg:grid-cols-[0.75fr_1.25fr]">

          {/* LESSON SELECTION */}

          <div className="grid grid-cols-2 gap-3">

            {lessons.map((lesson, index) => (

              <button

                key={lesson.title}

                onClick={() => setActiveLesson(index)}

                className={`rounded-2xl border p-5 text-left transition ${

                  activeLesson === index

                    ? "border-[#283e46] bg-[#283e46] text-white shadow-lg"

                    : "border-stone-200 bg-white hover:border-[#a47558]"

                }`}

              >

                <span className="block text-xs font-bold uppercase tracking-widest opacity-70">

                  Lesson {String(index + 1).padStart(2, "0")}

                </span>

                <span className="mt-3 block text-base font-black">

                  {lesson.title}

                </span>

              </button>

            ))}

          </div>

          {/* SELECTED LESSON */}

          <div className="overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-lg">

            <div className="relative h-72 overflow-hidden">

              <img

                key={selectedLesson.photo}

                src={selectedLesson.photo}

                alt={selectedLesson.setting}

                className="h-full w-full object-cover"

              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">

                <p className="text-xs font-bold uppercase tracking-widest text-[#f0d1b5]">

                  {selectedLesson.setting}

                </p>

                <h3 className="mt-2 text-3xl font-black">

                  {selectedLesson.title}

                </h3>

                <p className="mt-2 text-stone-200">

                  {selectedLesson.subtitle}

                </p>

              </div>

            </div>

            <div className="space-y-7 p-6">

              <div>

                <h4 className="mb-4 text-xl font-black">

                  Interactive 3D Learning Model

                </h4>

                <Scene3D

                  topic={activeLesson}

                  height={330}

                />

              </div>

              <div className="rounded-2xl bg-[#f2ece5] p-6">

                <p className="text-xs font-bold uppercase tracking-widest text-[#9b6c51]">

                  French Language Example

                </p>

                <p className="mt-3 text-xl font-bold">

                  {selectedLesson.example}

                </p>

                <button

                  onClick={() =>

                    speakFrench(selectedLesson.example)

                  }

                  className="mt-5 rounded-xl bg-[#283e46] px-6 py-3 font-bold text-white transition hover:bg-[#42616b]"

                >

                  Listen to the French Pronunciation

                </button>

              </div>

              <div className="rounded-2xl border border-stone-200 p-6">

                <p className="text-xs font-bold uppercase tracking-widest text-[#9b6c51]">

                  Research Connection

                </p>

                <p className="mt-3 leading-8 text-stone-700">

                  {selectedLesson.research}

                </p>

              </div>

              <a

                href={`/games?mission=${activeLesson + 1}`}

                className="block rounded-2xl bg-[#283e46] px-7 py-4 text-center font-bold text-white transition hover:bg-[#42616b]"

              >

                Open the Interactive Learning Mission

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* DIGITAL PEDAGOGY */}

      <section className="bg-[#ebe5dc] px-6 py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9b6c51]">

              Digital Pedagogy

            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">

              Connecting visual experiences with

              language learning

            </h2>

            <p className="mt-7 leading-9 text-stone-700">

              The French Learning Arcade illustrates how

              interactive scenes, spoken language, choices

              and immediate feedback can be incorporated

              into French-language activities.

            </p>

            <p className="mt-5 leading-9 text-stone-700">

              The activities can be examined in relation

              to the study's research questions, particularly

              those concerning motivation, vocabulary

              retention, pronunciation and communicative

              competence.

            </p>

            <p className="mt-5 leading-9 text-stone-700">

              These digital examples are teaching

              demonstrations. Their presence does not

              establish improved learning outcomes without

              supporting classroom evidence.

            </p>

            <a

              href="/games"

              className="mt-8 inline-block rounded-full bg-[#283e46] px-8 py-4 font-bold text-white transition hover:bg-[#42616b]"

            >

              Enter the French Learning Arcade

            </a>

          </div>

          <div className="overflow-hidden rounded-[32px] shadow-xl">

            <img

              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1300&fit=crop"

              alt="Books and educational learning materials"

              className="h-[500px] w-full object-cover"

            />

          </div>

        </div>

      </section>

      {/* FINAL SECTION */}

      <section className="bg-[#192a2e] px-6 py-20 text-center text-white">

        <div className="mx-auto max-w-4xl">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#e0b99c]">

            Mission Paris

          </p>

          <h2 className="mt-5 text-4xl font-black md:text-5xl">

            Explore. Interact. Communicate.

          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-9 text-stone-200">

            An interactive presentation connecting

            research on ICT integration with illustrative

            digital activities for French-language

            teaching and learning.

          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <a

              href="/games"

              className="rounded-full bg-[#e4bda0] px-8 py-4 font-bold text-[#243139]"

            >

              Explore All Ten French Games

            </a>

            <a

              href="#overview"

              className="rounded-full border border-white/60 px-8 py-4 font-bold text-white"

            >

              Return to the Research

            </a>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#111e22] px-6 py-9 text-center text-sm text-stone-300">

        <p className="font-bold text-white">

          Mission Paris · ICT and French Pedagogy

        </p>

        <p className="mt-3">

          Interactive research presentation and illustrative

          French teaching demonstrations

        </p>

      </footer>

    </main>

  );

}