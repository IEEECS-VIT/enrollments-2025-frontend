// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import QuestionNumber from "./QuestionNumber.tsx";
// import { SubmitAnswers } from "../api/user.ts";
// import axios from "axios";

export default function TaskQuestions() {
  return (
    <>
      <div className="relative flex flex-col justify-start items-center p-2 h-full max-w-[100%] font-retro-gaming">
        <div id="taskBox" className="p-4 w-full rounded-xl">
          <div className="flex gap-x-12 justify-center">
            <button className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow flex flex-wrap text-white lg:text-lg text-xs pl-2 pr-2 gap-x-4 lg:h-10 lg:w-28 h-[2vh] border border-solid border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 items-center justify-center relative left-[7vw] lg:left-[0vw]">
              EASY
            </button>
            <button className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow flex flex-wrap text-white lg:text-lg text-xs pl-2 pr-2 gap-x-4 lg:h-10 lg:w-28 h-[2vh] border border-solid border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 items-center justify-center relative left-[7vw] lg:left-[0vw]">
              MEDIUM
            </button>
            <button className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow flex flex-wrap text-white lg:text-lg text-xs pl-2 pr-2 gap-x-4 lg:h-10 lg:w-28 h-[2vh] border border-solid border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 items-center justify-center relative left-[7vw] lg:left-[0vw]">
              HARD
            </button>
          </div>

          <div className="border border-white rounded-3xl mt-8 w-full min-h-28 p-4 flex flex-col justify-center items-center">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab amet
              unde ducimus sint! Hic perspiciatis error suscipit temporibus
              iste. Consequatur recusandae omnis quis tempora ipsum delectus,
              debitis possimus ipsa laudantium.
            </p>
          </div>
          <div className="border border-white rounded-3xl mt-8 w-full min-h-10 p-4 flex flex-col justify-center items-center">
            <p>Github Link</p>
          </div>
          <div className="border border-white rounded-3xl mt-8 w-full min-h-10 p-4 flex flex-col justify-center items-center">
            <p>Other links</p>
          </div>
        </div>
      </div>
    </>
  );
}
