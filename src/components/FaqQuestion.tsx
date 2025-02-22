import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How many domains can we select?",
    answer: "You can select 3 domains.",
  },
  {
    question: "What will be asked in the quiz?",
    answer: "Objective and descriptive questions regarding the subdomain.",
  },
  {
    question: "What will happen after the quiz?",
    answer: "We will let you all know about it.",
  },
  {
    question:
      "When will I receive further updates about the chapter and its domains?",
    answer: "Via mail and Discord.",
  },
  {
    question:
      "Can I reattempt a quiz if I accidentally close my tab or experience an internet interruption?",
    answer: "Yes, till the timer runs out.",
  },
  {
    question: "Do I need previous experience for any domains?",
    answer:
      "No, previous experience is not required, but having basic knowledge will serve as brownie points for you!",
  },
  {
    question:
      "Can I still join a domain as a second-year or third-year student?",
    answer: "Yes, we accept students from second and third year too.",
  },
];

export default function FaqQuestion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 z-20">
      {faqs.map((faq, index) => (
        <div key={index} className="w-[55vw]">
          <div
            className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
              expandedIndex === index ? "border-orange-400" : "border-white"
            }`}
          >
            <button
              className="p-4 bg-black rounded-3xl text-white w-full"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              <p className="font-press-start lg:text-[1rem] text-[10px] md:text-[13px]">
                {faq.question}
              </p>
            </button>

            <div
              className={`transition-all duration-200 ease-in-out overflow-hidden ${
                expandedIndex === index ? "max-h-[200px] p-4" : "max-h-0 p-0"
              }`}
            >
              <div
                className={`transition-all duration-300 ${
                  expandedIndex === index
                    ? "border-t-2 border-orange-400"
                    : "border-t-0"
                }`}
              ></div>

              <p className="font-press-start text-[10px] md:text-[13px] text-white text-center mt-2">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
