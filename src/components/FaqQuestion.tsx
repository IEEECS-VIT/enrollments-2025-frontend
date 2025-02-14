import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Lorem ipsum dolor sit amet,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    question: "Lorem ipsum dolor sit amet,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    question: "Lorem ipsum dolor sit amet,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    question: "Lorem ipsum dolor sit amet,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    question: "Lorem ipsum dolor sit amet,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  },
  {
    question: "Lorem ipsum dolor sit amet,",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
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
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <p className="font-press-start lg:text-[1.5rem] text-[10px] md:text-[13px]">
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
                  expandedIndex === index ? "border-t-2 border-orange-400" : "border-t-0"
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
