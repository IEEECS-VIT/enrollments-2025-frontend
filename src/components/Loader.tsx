// import styled from "styled-components";

// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="loader"></div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .loader {
//     width: 120px;
//     height: 20px;
//     -webkit-mask: linear-gradient(90deg, #000 70%, #0000 0) 0/20%;
//     background: linear-gradient(#000 0 0) 0/0% no-repeat #ddd;
//     animation: l4 2s infinite steps(6);
//   }
//   @keyframes l4 {
//     100% {
//       background-size: 120%;
//     }
//   }
// `;

// export default Loader;

import { useState, useEffect } from "react";

const Loader = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 12);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 h-8 bg-black border-2 border-[#F8B95A] p-1">
      <div className="h-full w-full flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              backgroundColor:
                i >= position && i < position + 3 ? "#f8770f" : "#fef08a20",
              imageRendering: "pixelated",
              transition: "background-color 0.1s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
