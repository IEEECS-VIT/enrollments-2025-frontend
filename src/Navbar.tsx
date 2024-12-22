import logo from '/IEEECS white.png'
import discordLogo from './assets/images/discordLogo.png'

const Navbar=()=>{
    return(
        <div className='flex flex-row justify-around items-center p-4 relative'>
            <div className='flex-shrink-0 '>
                <img src={logo} className='h-10 w-auto' alt="logo"/>
            </div>
                <div className="flex flex-row gap-12 text-3xl text-white p-10 font-custom ">
                    <div><h1 className='hover:text-orange-500 hover:underline cursor-pointer'>HOME</h1></div>
                    <div><h1 className='hover:text-orange-500 hover:underline cursor-pointer'>FAQs</h1></div>
                    <div><h1 className='hover:text-orange-500 hover:underline cursor-pointer'>PROFILE</h1></div>
            </div>
            <div className='flex'>
                <button className=' text-white'>
                    <div className='ring-2 ring-[#F8B95A] rounded-md shadow-red-glow'>
                        <h4 className= 'bg-brownish bg-opacity-50 px-4 font-press-start flex flex-row justify-center items-center flex-wrap gap-2'>Join
                        <img src={discordLogo} alt="join Discord" className="bg-brownish bg-opacity-0  h-10 w-10"/>
                        </h4>
                    </div>
                    
                </button>
            </div>
            
        </div>
    );

};

export default Navbar