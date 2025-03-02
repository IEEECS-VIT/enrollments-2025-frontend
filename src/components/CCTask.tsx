export default function CCTask() {
  return (
    <div className="relative w-full h-full bg-transparent max-h-[65vh] md:max-h-[75vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
      {/* Competitive Coding Task Content - Now with a scroll container */}
      <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh] md:max-h-[75vh]">
        <div className="w-full px-2 prose markdown-content prose-invert max-w-none md:px-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-2 md:mb-4">
            🧠 Competitive Coding Task
          </h1>

          <p className="mb-3 text-sm text-white md:mb-4 md:text-base">
            Attempt these tasks in a language of your choice. Make sure to
            demonstrate all possible use-cases and mention time/space
            complexities of various operations. Provide screenshots of the
            usage.
          </p>

          {/* Task Levels Section */}
          <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-4 md:mt-6 mb-2 md:mb-3">
            📌 Task Levels
          </h2>
          <p className="mb-2 text-sm md:text-base">
            The challenge is divided into three levels of increasing complexity.
          </p>

          {/* Level 1 */}
          <div className="bg-[#232334] bg-opacity-50 p-3 md:p-4 rounded-lg border-l-4 border-[#F8B95A] mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2">
              🔰 Level 1: Custom Data Structure Implementation
            </h3>
            <p className="mb-2 text-sm text-white md:text-base">
              Design a stack that supports the following operations in{" "}
              <strong>O(1) time and O(n) space</strong>:
            </p>
            <ul className="pl-2 mb-2 text-sm text-white list-none md:text-base">
              <li className="mb-1">
                • <strong>push(x):</strong> Pushes element x onto the stack.
              </li>
              <li className="mb-1">
                • <strong>pop():</strong> Removes the top element of the stack.
              </li>
              <li className="mb-1">
                • <strong>top():</strong> Returns the top element without
                removing it.
              </li>
              <li className="mb-1">
                • <strong>getMin():</strong> Returns the smallest element in the
                stack.
              </li>
              <li className="mb-1">
                • <strong>getMax():</strong> Returns the largest element in the
                stack.
              </li>
            </ul>
          </div>

          {/* Level 2 */}
          <div className="bg-[#232334] bg-opacity-50 p-3 md:p-4 rounded-lg border-l-4 border-[#F8B95A] mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2">
              ⚡ Level 2: Composite Data Structure Implementation
            </h3>
            <p className="mb-2 text-sm text-white md:text-base">
              Interval Merger: Maintain a set of non-overlapping intervals and
              efficiently merge them when new intervals are added.
            </p>
            <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
              Operations:
            </h4>
            <ul className="pl-2 mb-2 text-sm text-white list-none md:text-base">
              <li className="mb-1">
                ✅ <strong>addInterval(start, end):</strong> Adds a new interval
                and merges if necessary.
              </li>
              <li className="mb-1">
                ✅ <strong>getIntervals():</strong> Returns the current set of
                non-overlapping, merged intervals.
              </li>
            </ul>

            <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
              Time Complexity:
            </h4>
            <ul className="pl-2 text-sm text-white list-none md:text-base">
              <li className="mb-1">
                • <strong>addInterval():</strong> O(log n)
              </li>
              <li className="mb-1">
                • <strong>getIntervals():</strong> O(n)
              </li>
            </ul>

            <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
              Example:
            </h4>
            <p className="mb-2 text-sm text-white md:text-base">
              addInterval(1, 5)
              <br />
              addInterval(6, 8)
              <br />
              addInterval(4, 7)
              <br />
              getIntervals() ➞ [[1, 8]]
            </p>
          </div>

          {/* Level 3 */}
          <div className="bg-[#232334] bg-opacity-50 p-3 md:p-4 rounded-lg border-l-4 border-[#F8B95A] mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2">
              🚀 Level 3: Cache with Expiry (Time-Based Cache)
            </h3>
            <p className="mb-2 text-sm text-white md:text-base">
              Design a cache that supports expiration and fast lookups:
            </p>
            <ul className="pl-2 mb-2 text-sm text-white list-none md:text-base">
              <li className="mb-1">
                ✅ <strong>set(key, value, expiryTime):</strong> Stores a
                key-value pair with expiration.
              </li>
              <li className="mb-1">
                ✅ <strong>get(key):</strong> Retrieves the value if it's not
                expired.
              </li>
              <li className="mb-1">
                ✅ <strong>Automatic Expiry:</strong> Removes expired keys when
                accessed.
              </li>
            </ul>

            <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
              Time Complexity:
            </h4>
            <ul className="pl-2 text-sm text-white list-none md:text-base">
              <li className="mb-1">
                • <strong>set():</strong> O(log n) (heap insertion).
              </li>
              <li className="mb-1">
                • <strong>get():</strong> O(log n) (removes expired keys).
              </li>
            </ul>

            <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
              Space Complexity:
            </h4>
            <p className="mb-2 text-sm text-white md:text-base">
              O(n) (number of active keys).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
