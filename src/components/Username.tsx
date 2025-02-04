import { useState, useRef } from "react";
import { SubmitUsername } from "../api/user";
import { useNavigate } from "react-router-dom";

const UsernameForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await SubmitUsername(username);
    if (response.status == 200) {
      navigate("/domain");
    } else if (response.status == 201) {
      setMessage(`${username} already taken. Try again`);
    }
    setUsername("");
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 3;
    const submitButtonIndex = totalButtons;

    if (event.key === "ArrowLeft") {
      const prevIndex =
        (hoveredIndex === null ? 0 : hoveredIndex - 1 + totalButtons) %
        totalButtons;
      setHoveredIndex(prevIndex);
    } else if (event.key === "ArrowRight") {
      const nextIndex =
        (hoveredIndex === null ? 0 : hoveredIndex + 1) % totalButtons;
      setHoveredIndex(nextIndex);
    } else if (event.key === "ArrowDown") {
      setHoveredIndex(submitButtonIndex);
    } else if (event.key === "ArrowUp") {
      if (hoveredIndex === submitButtonIndex) {
        setHoveredIndex(0);
      }
    } else if (event.key === "Enter") {
      if (hoveredIndex !== null) {
        if (hoveredIndex === submitButtonIndex) {
          //   handleSubmit();
        } else {
          //   handleClick(hoveredIndex);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
        ref={containerRef}
        onKeyDown={handleKeyNavigation}
        tabIndex={0}
      >
        <div className="border-2 mt-[15vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center  justify-center gap-y-16 py-8">
          <div className="text-center mt-[6vh] sm:mt-[vh]">
            <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold sm:leading-[5rem]">
              ENTER
            </p>
            <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold leading-[0.5rem] sm:leading-[5rem]">
              USERNAME
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              className="bg-black border-white border rounded-lg p-2 text-center h-20 w-72 text-xl font-retro-gaming"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-red-700 text-center mt-2">{message}</p>
          </div>
        </div>

        <button
          type="submit"
          tabIndex={0}
          className={`ring-2 ring-[#F8B95A] tracking-wider rounded-md text-[2.5vh] shadow-red-glow text-white h-[5vh] w-[20vw] bg-[#F8B95A] bg-opacity-50 mt-8 transform transition-transform duration-300 ${
            hoveredIndex === 3 ? "scale-110 bg-opacity-70" : "scale-100"
          } ${hoveredIndex === 3 ? "animate-blink" : ""}`}
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default UsernameForm;

// export default function Username() {

//     /* try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/domain/submit`, allSelectedData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Response:', response.data);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//     }*/
//     localStorage.clear();
//   };

//   return (
//     <div
//       className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
//       ref={containerRef}
//       onKeyDown={handleKeyNavigation}
//       tabIndex={0}
//     >
//       <div className="border-2 mt-[15vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center  justify-center gap-y-16 py-8">
//         <div className="text-center mt-[6vh] sm:mt-[vh]">
//           <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold sm:leading-[5rem]">
//             ENTER
//           </p>
//           <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold leading-[0.5rem] sm:leading-[5rem]">
//             USERNAME
//           </p>
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Enter Username"
//             className="bg-black border-white border rounded-lg p-2 text-center h-20 w-72 text-xl font-retro-gaming"
//           />
//           <p className="text-red-700 text-center mt-2">
//             *Username already exists
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         tabIndex={0}
//         className={`ring-2 ring-[#F8B95A] tracking-wider rounded-md text-[2.5vh] shadow-red-glow text-white h-[5vh] w-[20vw] bg-[#F8B95A] bg-opacity-50 mt-8 transform transition-transform duration-300 ${
//           hoveredIndex === 3 ? "scale-110 bg-opacity-70" : "scale-100"
//         } ${hoveredIndex === 3 ? "animate-blink" : ""}`}
//         onMouseEnter={() => setHoveredIndex(3)}
//         onMouseLeave={() => setHoveredIndex(null)}
//       >
//         SUBMIT
//       </button>
//     </div>
//   );
// }
