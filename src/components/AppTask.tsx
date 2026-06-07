import {
  FaCheckCircle,
  FaClipboardList,
  FaExternalLinkAlt,
  FaFigma,
  FaGithub,
  FaLayerGroup,
  FaMobileAlt,
  FaPalette,
  FaRocket,
  FaTasks,
  FaThLarge,
} from "react-icons/fa";

const figmaUrl =
  "https://www.figma.com/design/vI4dn2Qw94MsZFRbJgHxVc/Design-Reference?node-id=0-1&t=cyyBxWA5VMRmlQwk-1";

const referenceRepos = [
  {
    label: "React Native Github Repo",
    url: "https://github.com/gk-dev10/ieeecs-app-task1",
  },
  {
    label: "Flutter Github Repo",
    url: "https://github.com/bhargavmahanta/ieeecs-flutter-app-task1",
  },
];

const appChoices = [
  "To Do Application with deadlines, reminders, and Habit Tracker",
  "Quiz Application with CRUD pages and admin dashboard",
  "Payment Platform Clone with wallet, transactions, and UPI flow",
  "Expense Tracker with day-wise and category-wise reports",
  "UNO Game Application with proper rules and turn-based gameplay",
];

const fitnessLevels = [
  {
    title: "Level 0: UI/UX Design",
    points: [
      "Clone and run the provided repository successfully",
      "Redesign every screen with a fitness-oriented visual language",
      "Improve typography, spacing, alignment, cards, inputs, and feedback states",
      "Add empty states, loading placeholders, and toasts for convenience",
    ],
  },
  {
    title: "Level 1: Navigation and Flow",
    points: [
      "Implement Home -> Workout List -> Workout Detail -> Start Workout",
      "Support Home -> Profile with clear back navigation everywhere",
      "Reflect state changes in the UI after starting or completing workouts",
      "Add goal tracking, schedule-aware prompts, and progress visuals",
    ],
  },
  {
    title: "Level 1: Graphs and Insights",
    points: [
      "Include at least one visual representation of fitness data",
      "You can use bar charts, line graphs, or circular progress indicators",
      "Show daily activity, weekly consistency, or calories burned trends",
    ],
  },
];

export default function AppTask() {
  return (
    <div className="relative w-full h-full max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none">
      <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
        <div className="w-full px-4 md:px-2 prose prose-invert max-w-none break-words">
          <h1 className="mb-4 flex items-center gap-3 text-xl md:text-2xl font-bold text-[#F8B95A]">
            <FaMobileAlt className="text-2xl" />
            App Enrollment Task
          </h1>

          <p className="mb-4 text-sm md:text-base text-gray-200">
            For the APP domain in this branch, there is no quiz. The round-2
            task is live directly, and participants are expected to submit the
            completed app work using the task submission flow.
          </p>

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
              <FaPalette /> Task 1: UI/UX Redesign and Frontend Flow
            </h2>
            <p className="mb-3 text-sm md:text-base text-gray-300">
              Participants must customize, redesign, and enhance a pre-built
              mobile fitness application provided through a GitHub repository.
              The focus is on UI/UX quality, detail, and a strong front-end app
              flow.
            </p>
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
                  <FaThLarge className="text-[#F8B95A]" /> Base project
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Pre-configured project setup and basic screen structure
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Placeholder fitness data such as workouts and stats
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Limited or no navigation between screens
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
                    Home or Dashboard for activity, goals, and stats
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Workout List and Workout Detail or Start Workout screens
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Profile or Progress with optional onboarding and insights
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
              <FaLayerGroup /> Level breakdown
            </h2>

            <div className="grid gap-4 lg:grid-cols-3">
              {fitnessLevels.map((level) => (
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

          <section className="mb-6 rounded-2xl border border-white/10 bg-[#232334]/80 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
              <FaClipboardList /> Task 2: App enrollment choices
            </h2>
            <p className="mb-3 text-sm md:text-base text-gray-300">
              Participants can pick any one mobile application from the list
              below. UI development is mandatory for all choices, while backend
              integration is optional but recommended.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {appChoices.map((choice) => (
                <div
                  key={choice}
                  className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white"
                >
                  <div className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    <span>{choice}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
              <FaRocket /> Submission and references
            </h2>
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
                  <FaClipboardList className="text-[#F8B95A]" /> Submission flow
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Use the <strong>SUBMIT TASK</strong> button on the task
                    page.
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Submit your public GitHub repository link and any supporting
                    live/demo links.
                  </li>
                  <li className="flex gap-2">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Include screenshots or a screen recording in your README or
                    submission notes if available.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base md:text-lg font-bold text-[#F8B95A]">
              <FaFigma /> Reference design
            </h2>
            <p className="text-sm text-gray-300">
              Use the provided Figma design reference while implementing the UI.
            </p>
            <a
              href={figmaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 break-all text-sm text-[#F8B95A] underline underline-offset-4 hover:text-[#f8d79b]"
            >
              <FaExternalLinkAlt className="shrink-0 text-xs" />
              {figmaUrl}
            </a>
          </section>

          <p className="mb-2 flex items-center gap-2 text-sm md:text-base text-white">
            <FaMobileAlt className="text-[#F8B95A]" />
            The submission flow is already wired in the top-right of the task
            page, so this screen is the live round-2 brief for APP.
          </p>
        </div>
      </div>
    </div>
  );
}
