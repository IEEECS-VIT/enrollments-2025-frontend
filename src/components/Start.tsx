// "use server";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Start(){
    const navigate = useNavigate();

    useEffect(()=>{
        const handleKeyDown = (event: KeyboardEvent)=>{
            if(event.code ==="Space"){
                navigate('/landing');
            }
        };
        window.addEventListener('keydown',handleKeyDown);
    },[navigate]);

    return(
        <>
            <div className="w-[100vw] h-[100vh] overflow-hidden font-press-start flex items-center justify-center flex-col gap-y-10 relative z-2">
                <h1 className="text-[#e8b974] xl:text-7xl lg:text-6xl text-shadow-glow hidden lg:block">ENROLLMENTS</h1>
                <h1 className="text-[#e8b974] xl:text-6xl lg:text-5xl text-shadow-glow hidden lg:block">BEGIN</h1>
                <img className="absolute xl:left-[15vw] lg:left-[10vw] top-[25vh] hidden lg:block" src="Coin1.svg"/>
                <img className="absolute left-[90vw] top-[55vh] hidden lg:block" src="Coin 2.svg" />
                <img className="absolute left-[5vw] top-[50vh] hidden lg:block" src="magnet1.svg" />
                <img className="absolute left-[75vw] top-[70vh] hidden lg:block" src="magnet2.svg" />
                <img className="absolute left-[17vw] top-[70vh] hidden lg:block" src="lightning1.svg" />
                <img className="absolute xl:left-[78vw] lg:left-[83vw] top-[22vh] hidden lg:block" src="lightning2.svg" />
                <img className="lg:hidden h-[13vh] relative bottom-10" src="logo.svg" />
                <h1 className="text-[#e8b974] text-5xl text-shadow-glow lg:hidden">IEEE-CS</h1>
                <button className="text-white text-xl mt-[13vh] lg:hidden tracking-tighter">{'<'}LOADING...{'>'}</button>
                <img className="lg:hidden h-[5vh]" src="loading bar.svg" />
                <button className="text-white text-2xl mt-[10vh] hidden lg:block">{'<'}Press space to start{'>'}</button>
            </div>
        </>
    )
}