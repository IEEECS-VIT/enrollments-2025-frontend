export default function ProfileInfo(){
    return(
        <>
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start">
      <div className="border-2 border-white mt-[10vh] rounded-3xl w-[80%] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-8">
        <p className="text-2xl mb-8 md:text-left text-center">PROFILE DETAILS</p>
        <div className="flex-col justify-start items-start leading-[2rem] md:leading-[3rem] text-[0.6rem] md:text-xl p-2">
        <p className="mb-4">Character Name: <span className="block md:inline">Aniruddha Neema</span> </p>
        <p className="mb-4">Mobile No.: <span className="block md:inline">8770762787</span></p>
        <p className="mb-4">Email id: <span className="block md:inline">aniruddhaneema@gmail.com</span></p>
        <p className="mb-4">Selected Domains:<span className="block md:inline">Technical, Management, Design</span> </p>
        </div>
        <img src="/character.svg" alt="character" className="w-14 md:w-28"/>
        <p className="text-[0.6rem] md:text-xl">Character created!</p>
    </div>
    <p className="text-white text-[0.6rem] md:text-xl absolute md:bottom-10 bottom-5">Sign out</p>
    </div>
        </>
    )
}