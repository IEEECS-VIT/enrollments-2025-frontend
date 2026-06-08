import { useState } from "react";
import {
  FaCheckCircle,
  FaClipboardList,
  FaDatabase,
  FaExternalLinkAlt,
  FaFigma,
  FaGithub,
  FaLayerGroup,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaTabletAlt,
  FaTasks,
  FaThLarge,
} from "react-icons/fa";

const figmaUrl =
  "https://www.figma.com/design/vI4dn2Qw94MsZFRbJgHxVc/Design-Reference?node-id=0-1&t=cyyBxWA5VMRmlQwk-1";

const referenceRepos = [
  {
    label: "Swift Github Repo",
    url: "https://github.com/IEEECS-VIT/ieeecs-swift-app-task1.git",
  },
  {
    label: "Kotlin Github Repo",
    url: "https://github.com/IEEECS-VIT/ieeecs-kotlin-app-task1.git",
  },
  {
    label: "Flutter Github Repo",
    url: "https://github.com/IEEECS-VIT/ieeecs-flutter-app-task1",
  },
  {
    label: "React Github Repo",
    url: "https://github.com/IEEECS-VIT/ieeecs-react-app-task1.git",
  },
];

const task1Levels = [
  {
    title: "Level 0: UI/UX Design",
    points: [
      "Clone and run any one of the provided repositories successfully.",
      "Redesign every screen with a fitness-oriented visual language.",
      "Improve typography, spacing, alignment, cards, inputs, and feedback states.",
      "Add empty states, loading placeholders, and toasts for convenience.",
    ],
  },
  {
    title: "Level 1: Navigation and Flow",
    points: [
      "Implement Home -> Workout List -> Workout Detail -> Start Workout.",
      "Support Home -> Profile with clear back navigation everywhere.",
      "Reflect state changes in the UI after starting or completing workouts.",
      "Add goal tracking, schedule-aware prompts, and progress visuals.",
    ],
  },
  {
    title: "Level 2: Graphs and Insights",
    points: [
      "Include at least one visual representation of fitness data.",
      "You can use bar charts, line graphs, or circular progress indicators.",
      "Show daily activity, weekly consistency, or calories burned trends.",
    ],
  },
];

const task2Choices = [
  {
    title: "1) To Do Application",
    summary:
      "A productivity app with task tracking, deadlines, reminders, and habit tracking.",
    specs: [
      "Users should be able to create, edit, delete, and manage tasks efficiently.",
      "Each task should support deadlines, priority levels, and reminder notifications.",
      "Habit Tracker should allow daily or weekly habits, streaks, and consistency tracking.",
      "UI should clearly separate tasks vs habits, with completion status visible at a glance.",
    ],
  },
  {
    title: "2) Quiz Application",
    summary:
      "A quiz platform with CRUD pages, quiz attempts, results, and an admin dashboard.",
    specs: [
      "Include all CRUD operation pages for quizzes and questions.",
      "Support multiple question types such as MCQ and True/False.",
      "Admin dashboard should manage quizzes, users, and results.",
      "Users should be able to attempt quizzes, view scores, and see a leaderboard.",
      "Implement timer-based quizzes to make the experience more interactive.",
    ],
  },
  {
    title: "3) Payment Platform Clone",
    summary:
      "A realistic payment-app UI with wallet balance, contacts, and payment flows.",
    specs: [
      "Replicate a real-world payment app experience with smooth navigation.",
      "Include send and receive money screens with contact selection.",
      "Show transaction history, payment status, wallet balance, and recent activity.",
      "Include UPI ID entry, QR code scan UI mock, and confirmation screens.",
      "No actual payment integration is required; use fixed sample balances and amounts.",
    ],
  },
  {
    title: "4) Expense Tracker",
    summary:
      "A finance tracker with analytics, summaries, and category-based reporting.",
    specs: [
      "Users should be able to add, edit, and delete expenses with amount, category, and date.",
      "Categorization such as Food, Travel, and Bills should be clearly managed.",
      "Provide day-wise and category-wise visual reports using charts or graphs.",
      "Include a monthly overview, spending insights, and simple analytics.",
      "The UI should make spending patterns easy to understand quickly.",
    ],
  },
  {
    title: "5) UNO Game Application",
    summary:
      "A playable UNO-style game with rules, turns, and special cards.",
    specs: [
      "Develop a playable version of the Uno card game with proper game rules.",
      "Include core mechanics like turn-based gameplay, card matching, draw pile, and special cards.",
      "Support a single-player or multiplayer UI flow.",
      "Show clear indicators for current turn, selected card, and game state.",
      "Use smooth animations and transitions to keep the experience engaging.",
    ],
  },
];

const mandatorySections = [
  {
    title: "Level 1: UI Development",
    points: [
      "Design and develop the complete user interface of the selected application.",
      "Ensure the app is visually appealing, intuitive, and user-friendly.",
      "Implement proper navigation flows between screens.",
      "Follow good UI/UX practices such as layout consistency, spacing, and responsiveness.",
    ],
  },
  {
    title: "Level 2: Backend Integration",
    points: [
      "Backend integration is optional but recommended.",
      "You may use Firebase, Supabase, Node.js, or any other backend stack.",
      "Implement data storage and retrieval if you want persistent data.",
      "Add authentication such as login or signup if it fits the app flow.",
      "Ensure real-time or persistent functionality where applicable.",
    ],
  },
  {
    title: "Brownie Points",
    points: [
      "Add a feature that is not seen in generic implementations of the chosen app.",
      "Use the extra feature to make your app stand out in design or functionality.",
    ],
  },
];

const submissionItems = [
  "Source code submitted through GitHub or an equivalent repository.",
  "Screenshots or a screen recording of the app.",
  "A brief explanation of the idea and the features implemented.",
  "Clear instructions on how to run the application.",
];

function TaskOne() {
  return (
    <>
      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaPalette /> Task 1: UI/UX redesign and frontend flow
        </h2>
        <p className="mb-3 text-sm md:text-base text-gray-300">
          Participants must customize, redesign, and enhance a pre-built mobile
          fitness application provided through a GitHub repository. The focus is
          on UI/UX quality, detail, and a strong front-end app flow. 
          
          You are free to pick any one of the languages based on your preferred tech stack. 
        </p>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
              <FaThLarge className="text-[#F8B95A]" /> Base project
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Pre-configured project setup and basic screen structure.
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Placeholder fitness data such as workouts and stats.
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Limited or no navigation between screens.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
              <FaTasks className="text-[#F8B95A]" /> Core screens
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Home or Dashboard for activity, goals, and stats.
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Workout List and Workout Detail or Start Workout screens.
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Profile or Progress with optional onboarding and insights.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaClipboardList /> Task 1 references
        </h2>
        <p className="mb-3 text-sm md:text-base text-gray-300">
          These are the reference repositories and design link for Task 1. The
          GitHub repo links are intentionally kept here under Task 1.
        </p>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <FaGithub className="text-[#F8B95A]" /> Reference repositories
            </h3>
            <div className="space-y-3">
              {referenceRepos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 break-all text-sm text-[#F8B95A] underline underline-offset-4 hover:text-[#f8d79b]"
                >
                  <FaExternalLinkAlt className="shrink-0 text-xs" />
                  {repo.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <FaFigma className="text-[#F8B95A]" /> Design reference
            </h3>
            <a
              href={figmaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 break-all text-sm text-[#F8B95A] underline underline-offset-4 hover:text-[#f8d79b]"
            >
              <FaExternalLinkAlt className="shrink-0 text-xs" />
              {figmaUrl}
            </a>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaLayerGroup /> Task 1 level breakdown
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {task1Levels.map((level) => (
            <div
              key={level.title}
              className="rounded-xl border-l-4 border-[#F8B95A] bg-black/20 p-4"
            >
              <h3 className="mb-2 text-sm font-bold text-[#F8B95A]">
                {level.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {level.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function TaskTwo() {
  return (
    <>
      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaClipboardList /> Task 2: App choices with specifications
        </h2>
        <p className="mb-4 text-sm md:text-base text-gray-300">
          Pick any one of the following application domains and implement the
          full UI flow for that app.
        </p>

        <div className="grid gap-4">
          {task2Choices.map((choice) => (
            <article
              key={choice.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white">
                    {choice.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">{choice.summary}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F8B95A]/40 bg-[#F8B95A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F8B95A]">
                  <FaTabletAlt />
                  Mobile UI
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {choice.specs.map((spec) => (
                  <li key={spec} className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaLayerGroup /> Mandatory and optional levels
        </h2>

        <div className="grid gap-4 lg:grid-cols-3">
          {mandatorySections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border-l-4 border-[#F8B95A] bg-black/20 p-4"
            >
              <h3 className="mb-2 text-sm font-bold text-[#F8B95A]">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-[#232334]/80 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaTasks /> Submission expectations
        </h2>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <FaRocket className="text-[#F8B95A]" /> What to submit
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {submissionItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <FaDatabase className="text-[#F8B95A]" /> Suggested delivery
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                A clean, complete UI with clear navigation between screens.
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                A README that explains the chosen app, features, and run
                instructions.
              </li>
              <li className="flex gap-2">
                <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                Optional backend integration if you want persistence or
                authentication.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
          <FaExternalLinkAlt /> Guidance
        </h2>
        <p className="text-sm text-gray-300">
          The interface on this page is the live APP task brief. Use it to
          decide which application domain you want to build, then implement the
          screens and flows that match the selected specification.
        </p>
      </section>

      <p className="mb-2 flex items-center gap-2 text-sm md:text-base text-white">
        <FaMobileAlt className="text-[#F8B95A]" />
        The specification for each app choice is included above, so the task
        instructions stay visible and easy to follow.
      </p>
    </>
  );
}

export default function AppTask() {
  const [activeTask, setActiveTask] = useState<"task1" | "task2">("task1");

  return (
    <div className="relative w-full h-full max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none">
      <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
        <div className="w-full px-4 md:px-2 prose prose-invert max-w-none break-words">
          <h1 className="mb-4 flex items-center gap-3 text-xl md:text-2xl font-bold text-[#F8B95A]">
            <FaMobileAlt className="text-2xl" />
            App Enrollment Task
          </h1>

          <p className="mb-4 text-sm md:text-base text-gray-200">
            For App Domain, Round 1 and Round 2 are part of a continuous process. Participants will not be eliminated in Round 1, and no submission is required during Round 1. Only the submissions at the end of round 2 will be evaluated
            <br></br>
            <br></br>
            Participants must complete one of the two tasks offered as part of the competition. However, if they prefer, they are welcome to take on both tasks, though this remains entirely voluntary.
          </p>

          <div className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
            <button
              type="button"
              onClick={() => setActiveTask("task1")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTask === "task1"
                  ? "bg-[#F8B95A] text-black"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Task 1
            </button>
            <button
              type="button"
              onClick={() => setActiveTask("task2")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTask === "task2"
                  ? "bg-[#F8B95A] text-black"
                  : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Task 2
            </button>
          </div>

          {activeTask === "task1" ? <TaskOne /> : <TaskTwo />}
        </div>
      </div>
    </div>
  );
}
