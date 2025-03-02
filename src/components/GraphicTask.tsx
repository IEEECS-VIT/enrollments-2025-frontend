export default function GraphicTask() {
    return (
      <>
        <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
          {/* Graphic Task Content - Scrollable container */}
          <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
            <div className="markdown-content prose prose-invert max-w-none w-full px-2">
              <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
                🎨 Graphic Design Task
              </h1>
              {/* Easy Level */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">🔰 Easy - 3x1 Instagram Post</h3>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ Design a <strong>3x1 Instagram post</strong> (3 connected images in a row) for any real or hypothetical event.
                  </li>
                  <li className="mb-1">
                    ✅ Ensure a <strong>creative & visually appealing layout</strong>
                  </li>
                  <li className="mb-1">
                    ✅ Include **event details**: <strong>time, date, venue, and a brief event description making it informative and attractive for the audience. </strong>.
                  </li>
                </ul>
              </div>
  
              {/* Medium Level */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">⚡ Medium - 3x2 Instagram Post</h3>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ Design a <strong>3x2 Instagram post</strong> (3 columns x 2 rows) for any real or hypothetical event.
                  </li>
                  <li className="mb-1">
                    ✅ Ensure a  creative, engaging, and visually appealing layout.
                  </li>
                  <li className="mb-1">
                    ✅ Include **event details**: <strong>time, date, venue, and a brief event description making it informative and 
                    attractive for the audience.</strong>.
                  </li>
                </ul>
              </div>
  
              {/* Hard Level */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">🚀 Hard - 3x3 Instagram Post</h3>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ Design a **3x3 Instagram post** (3 columns x 3 rows) for any real or hypothetical event.
                  </li>
                  <li className="mb-1">
                    ✅ Ensure a  creative, engaging, and visually appealing layout.
                  </li>
                  <li className="mb-1">
                    ✅ Include **event details**: <strong>time, date, venue, and a brief event description making it informative and 
                    attractive for the audience.</strong>.
                  </li>
                </ul>
                <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                  💡 Extra Points:
                </p>
                <ul className="list-none pl-2 text-white">
                  <li className="mb-1">• Design a **story-driven layout** that flows across the grid.</li>
                  <li className="mb-1">• Apply **advanced effects, 3D elements, or motion graphics**.</li>
                </ul>
              </div>
  
              <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
                📍 General Guidelines
              </h2>
              <ul className="list-none pl-2 mb-4 text-white">
                <li className="mb-2">✅ <strong>Tools:</strong> Use **Adobe Photoshop, Illustrator, Figma, or Canva**.</li>
                <li className="mb-2">✅ <strong>Brand Consistency:</strong> Maintain a **coherent theme, colors, and typography**.</li>
                <li className="mb-2">✅ <strong>Creativity:</strong> Experiment with **unique design techniques**.</li>
                <li className="mb-2">✅ <strong>File Formats:</strong> Submit **PNG/JPEG for images and a Figma/PSD source file**.</li>
              </ul>
  
              <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
                📝 Submission Guidelines
              </h2>
              <ol className="list-decimal pl-6 mb-4 text-white">
                <li className="mb-2">Upload your designs to **Google Drive, Behance, or Dribbble**.</li>
                <li className="mb-2">Ensure a **high-resolution export** of the images.</li>
                <li className="mb-2">Submit your **final images & source file (Figma, PSD, AI, etc.)**.</li>
                <li className="mb-2">Include a short **design brief explaining your thought process**.</li>
              </ol>
            </div>
          </div>
        </div>
      </>
    );
  }
