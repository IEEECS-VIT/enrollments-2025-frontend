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
    <div className="flex flex-col gap-8 z-20">
      {/* <div className="border-2 border-white mt-[5vh] rounded-3xl w-[80%] lg:w-[50vw] sm:h-[10vh] h-[20vh] flex flex-col items-center p-4 md:p-8 justify-center"> */}
      {faqs.map((faq, index) => (
        <div key={index} className="w-[55vw]">
          <div
            className={`rounded-3xl ${
              expandedIndex === index
                ? "border-2 border-orange-400 text-center"
                : "border-2 border-white text-center"
            } p-0.5`}
          >
            <button
              className="text-center p-4 bg-black rounded-3xl text-white"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              <p className="font-press-start lg:text-[1.5rem] text-[10px] md:text-[13px]">
                {faq.question}
              </p>
            </button>
            {expandedIndex === index && (
              <div className="bg-black p-4 border-t-2 border-orange-400 rounded-b-3xl">
                <p className="font-press-start text-[10px] md:text-[13px] text-white text-center ">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      {/* </div> */}
    </div>
  );
}
