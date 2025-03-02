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
                  **Objective:** Create a **30-second motion graphics promo** that grabs attention 
                  and showcases **why students should enroll**.
                </p>
  
                <h4 className="text-md font-bold text-[#F8B95A] mb-2">
                  📌 What to Include:
                </h4>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ **Epic Opening (0-5 sec):** Bold animations and dynamic typography to hook viewers  
                    (e.g., *"Your Future Starts Here!"*).
                  </li>
                  <li className="mb-1">
                    ✅ **Highlight Reel (5-20 sec):** Animate key benefits like **events, workshops, networking**  
                    with smooth transitions and icons.
                  </li>
                  <li className="mb-1">
                    ✅ **Powerful CTA (20-30 sec):** End with an **animated button effect** like *"Apply Now!"*  
                    with upbeat music.
                  </li>
                </ul>
  
                <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                  💡 Inspiration:
                </p>
                <ul className="list-none pl-2 text-white">
                  <li className="mb-1">• Check out **motion graphic reels on Behance** for creative animation ideas.</li>
                </ul>
              </div>
  
              {/* Task 2 - Instagram Reel */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                  📱 Task 2: Reel Mastery – "A Day in the Life"
                </h3>
                <p className="text-white mb-3">
                  **Objective:** Create a **15-second Instagram Reel** that gives an **energetic,  
                  behind-the-scenes look at campus life**.
                </p>
  
                <h4 className="text-md font-bold text-[#F8B95A] mb-2">
                  📌 What to Include:
                </h4>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ **Instant Hook (0-3 sec):** Start with a **relatable or funny moment**—something  
                    that screams *"This could be you!"*.
                  </li>
                  <li className="mb-1">
                    ✅ **Fast-Paced Highlights (3-12 sec):** Quick cuts of **fun events, student interactions,  
                    and campus vibes**—sync to trending music.
                  </li>
                  <li className="mb-1">
                    ✅ **Final Push (12-15 sec):** Add a **vibrant text overlay**: *"Join the squad—Enroll now!"*.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  