export default function CCTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] md:max-h-[75vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* Competitive Coding Task Content - Now with scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh] md:max-h-[75vh]">
          <div className="markdown-content prose prose-invert max-w-none w-full px-2 md:px-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-2 md:mb-4">
              🧠 Competitive Coding Task
            </h1>

            <p className="mb-3 md:mb-4 text-white text-sm md:text-base">
              Attempt these tasks in a language of your choice. Make sure to
              demonstrate all possible use-cases and mention time/space
              complexities of various operations. Provide screenshots of the
              usage.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-4 md:mt-6 mb-2 md:mb-3">
              📌 Task Levels
            </h2>
            <p className="mb-2 text-sm md:text-base">
              The challenge is divided into three levels of increasing
              complexity.
            </p>
            {/* Level 1 */}
            <div className="bg-[#232334] bg-opacity-50 p-3 md:p-4 rounded-lg border-l-4 border-[#F8B95A] mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2">
                🔰 Level 1: Custom Data Structure Implementation
              </h3>
              <p className="mb-2 text-white text-sm md:text-base">
                Design a stack that supports the following operations in{" "}
                <strong>O(1) time and O(n) space</strong>:
              </p>
              <ul className="list-none pl-1 md:pl-2 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  • <strong>push(x):</strong> Pushes element x onto the stack.
                </li>
                <li className="mb-1">
                  • <strong>pop():</strong> Removes the top element of the
                  stack.
                </li>
                <li className="mb-1">
                  • <strong>top():</strong> Returns the top element without
                  removing it.
                </li>
                <li className="mb-1">
                  • <strong>getMin():</strong> Returns the smallest element in
                  the stack.
                </li>
                <li className="mb-1">
                  • <strong>getMax():</strong> Returns the largest element in
                  the stack.
                </li>
              </ul>
            </div>

            {/* Level 2 */}
            <div className="bg-[#232334] bg-opacity-50 p-3 md:p-4 rounded-lg border-l-4 border-[#F8B95A] mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2">
                ⚡ Level 2: Composite Data Structure Implementation
              </h3>
              <p className="mb-2 text-white text-sm md:text-base">
                Interval Merger: Maintain a set of non-overlapping intervals and
                efficiently merge them when new intervals are added.
              </p>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Operations:
              </h4>
              <ul className="list-none pl-1 md:pl-2 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  ✅ <strong>addInterval(start, end):</strong> Adds a new
                  interval [start, end]. If it overlaps with existing intervals,
                  merge them into one. Ensures the set of intervals remains
                  non-overlapping and sorted.
                </li>
                <li className="mb-1">
                  ✅ <strong>getIntervals():</strong> Returns the current set of
                  non-overlapping, merged intervals in ascending order.
                </li>
              </ul>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Time Complexity:
              </h4>
              <ul className="list-none pl-1 md:pl-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  • <strong>addInterval():</strong> O(log n) for insertion and
                  merging using balanced trees or sorted lists.
                </li>
                <li className="mb-1">
                  • <strong>getIntervals():</strong> O(n) for retrieval.
                </li>
              </ul>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Space Complexity:
              </h4>
              <p className="mb-2 text-white text-sm md:text-base">
                O(n) (number of non-overlapping intervals).
              </p>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Example:
              </h4>
              <p className="mb-2 text-white text-sm md:text-base">
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
                🚀 Level 3: Composite Data Structure Implementation
              </h3>
              <p className="mb-2 text-white text-sm md:text-base">
                Design a Cache with Expiry (Time-Based Cache) that supports the
                following operations efficiently:
              </p>
              <ul className="list-none pl-1 md:pl-2 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  ✅ <strong>set(key, value, expiryTime):</strong> Stores the
                  key-value pair with an expiration timestamp. If the key
                  already exists, updates its value and expiry time.
                </li>
                <li className="mb-1">
                  ✅ <strong>get(key):</strong> Retrieves the value associated
                  with the key if it exists and hasn't expired. Returns None if
                  the key doesn't exist or has expired.
                </li>
                <li className="mb-1">
                  ✅ <strong>Automatic Expiry:</strong> Expired keys should be
                  removed automatically when{" "}
                  <code className="text-xs md:text-sm">get()</code> or{" "}
                  <code className="text-xs md:text-sm">set()</code> is called.
                </li>
              </ul>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Constraints:
              </h4>
              <p className="mb-2 text-white text-sm md:text-base">
                All operations should be optimized for fast lookups and
                efficient expiry handling.
              </p>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Time Complexity:
              </h4>
              <ul className="list-none pl-1 md:pl-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  • <strong>set(key, value, expiryTime):</strong> O(log n) (heap
                  insertion).
                </li>
                <li className="mb-1">
                  • <strong>get(key):</strong> O(log n) (worst case, due to
                  cleaning expired keys).
                </li>
              </ul>
              <h4 className="text-base md:text-lg font-bold text-[#F8B95A] mt-3 md:mt-4">
                Space Complexity:
              </h4>
              <p className="mb-2 text-white text-sm md:text-base">
                O(n) (number of active keys).
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
