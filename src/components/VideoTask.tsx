export default function VideoTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* Video Task Content - Scrollable container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
          <div className="markdown-content prose prose-invert max-w-none w-full px-2">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              Attempt any One
            </h1>

            {/* Task 1 - Motion Graphics */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🎥 Task 1: Motion Graphics Challenge – "Why Join Us?"
              </h3>
              <p className="text-white mb-3">
                <strong>Objective:</strong> Create a{" "}
                <strong>30-second motion graphics promo</strong> that grabs
                attention and showcases{" "}
                <strong>why students should enroll</strong>.
              </p>

              <h4 className="text-md font-bold text-[#F8B95A] mb-2">
                📌 What to Include:
              </h4>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ <strong>Epic Opening (0-5 sec):</strong> Bold animations
                  and dynamic typography to hook viewers (e.g.,{" "}
                  <em>"Your Future Starts Here!"</em>).
                </li>
                <li className="mb-1">
                  ✅ <strong>Highlight Reel (5-20 sec):</strong> Animate key
                  benefits like <strong>events, workshops, networking</strong>
                  with smooth transitions and icons.
                </li>
                <li className="mb-1">
                  ✅ <strong>Powerful CTA (20-30 sec):</strong> End with an{" "}
                  <strong>animated button effect</strong> like{" "}
                  <em>"Apply Now!"</em>
                  with upbeat music.
                </li>
              </ul>

              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Inspiration:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Check out <strong>motion graphic reels on Behance</strong>{" "}
                  for creative animation ideas.
                </li>
              </ul>
            </div>

            {/* Task 2 - Instagram Reel */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                📱 Task 2: Reel Mastery – "A Day in the Life"
              </h3>
              <p className="text-white mb-3">
                <strong>Objective:</strong> Create a{" "}
                <strong>15-second Instagram Reel</strong> that gives an{" "}
                <strong>
                  energetic, behind-the-scenes look at campus life
                </strong>
                .
              </p>

              <h4 className="text-md font-bold text-[#F8B95A] mb-2">
                📌 What to Include:
              </h4>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ <strong>Instant Hook (0-3 sec):</strong> Start with a{" "}
                  <strong>relatable or funny moment</strong>—something that
                  screams <em>"This could be you!"</em>.
                </li>
                <li className="mb-1">
                  ✅ <strong>Fast-Paced Highlights (3-12 sec):</strong> Quick
                  cuts of{" "}
                  <strong>
                    fun events, student interactions, and campus vibes
                  </strong>
                  —sync to trending music.
                </li>
                <li className="mb-1">
                  ✅ <strong>Final Push (12-15 sec):</strong> Add a{" "}
                  <strong>vibrant text overlay</strong>:{" "}
                  <em>"Join the squad—Enroll now!"</em>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
