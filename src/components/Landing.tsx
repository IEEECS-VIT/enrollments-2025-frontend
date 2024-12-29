
// "use server";

export default function Landing(){
    return(
        <>
            <div className="w-[100vw] h-[100vh] overflow-hidden font-press-start flex items-center justify-center flex-col gap-y-10 relative z-2">
                
                <h1 className="text-[#e8b974] xl:text-7xl lg:text-6xl text-shadow-glow hidden lg:block">IEEE-CS</h1>
                
                <img className="absolute xl:left-[15vw] lg:left-[10vw] top-[25vh] hidden lg:block" src="Coin1.svg" alt="img"/>
                <img className="absolute left-[90vw] top-[55vh] hidden lg:block" src="Coin 2.svg"  alt="img" />
                <img className="absolute left-[5vw] top-[50vh] hidden lg:block" src="magnet1.svg"  alt="img" />
                <img className="absolute left-[75vw] top-[70vh] hidden lg:block" src="magnet2.svg" alt="img"  />
                <img className="absolute left-[17vw] top-[70vh] hidden lg:block" src="lightning1.svg" alt="img"/>
                <img className="absolute xl:left-[78vw] lg:left-[83vw] top-[22vh] hidden lg:block" src="lightning2.svg" alt="img"/>
                <div>
                    <h1 className="text-[#e8b974] text-5xl text-shadow-glow lg:hidden">IEEE-CS</h1>
                </div>
                <div className="text-white">
                    <h2 className="text-center font-custom ">
                    Where innovation meets technology <br/>
                    We forge tech<br/> that transcends from ordinary <br/>
                    into realms of the unknown.
                    </h2>
                </div>
                <button className="text-white text-xl mt-[13vh] lg:hidden tracking-tighter">{'<'}Sign In with Google{'>'}</button>
                <button className="text-white text-2xl mt-[10vh] hidden lg:block">{'<'}Sign In with Google{'>'}</button>
            </div>
        </>
    )
}