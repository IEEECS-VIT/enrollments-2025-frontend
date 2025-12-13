import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut as firebaseSignOut } from "firebase/auth";
import { showToastSuccess } from "../Toast";
import { ToastContainer } from "react-toastify";

interface ProfileData {
  username: string;
  mobile: string;
  email: string;
  domain: { [key: string]: string[] };
}

interface ProfileInfoProps {
  profileData: ProfileData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!profileData.username) {
      navigate("/username");
    }
  }, [profileData.username, navigate]);
  const handleSignOut = async () => {
    try {
      showToastSuccess("Signed out successfully.");

      setTimeout(async () => {
        // Make the callback function async
        await firebaseSignOut(auth);
        Cookies.remove("authToken");
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start p-4 space-y-6 relative">
        <div className="border-2 border-white mt-16 sm:mt-24 rounded-3xl backdrop-blur-[4.5px] min-h-[60vh] max-h-screen w-[90%] sm:w-[80%] md:w-[70%] flex flex-col py-12 sm:py-8 px-6 space-y-6 font-retro-gaming">
          <p className="text-2xl sm:text-3xl md:text-4xl tracking-widest text-center border-b-2 border-white/20 pb-4">
            PROFILE
          </p>

          {/* --------------------------------------------------
            OLD UI CODE (Commented out as requested)
            --------------------------------------------------
          */}
          {/* <div className="flex py-8 sm:py-0 flex-col items-center w-full sm:flex-row sm:items-start sm:gap-10">
            <div className="flex flex-col text-base sm:text-lg md:text-2xl w-full space-y-[5vh] sm:space-y-12">
              <p>
                <span className="font-bold">Username : </span>{" "}
                {profileData?.username}
              </p>
              
              <p>
                <span className="font-bold">Mail ID : </span>{" "}
                <span className="break-all">{profileData?.email}</span>
              </p>
              {profileData?.domain && (
                <div>
                  <span className="font-bold">Selected Domains : </span>
                  <div className="mt-2 space-y-2">
                    {Object.entries(profileData.domain).map(([key, domainList]) =>
                      domainList.length > 0 ? (
                        <div key={key} className="text-sm sm:text-2xl">
                          <strong>
                            {key.toLowerCase().replace(/\b\w/g, (char) =>
                              char.toUpperCase()
                            )}
                            :
                          </strong>
                          {domainList.map((domain, i) => {
                            const formattedDomain =
                              ["AI/ML", "UI/UX", "RND", "PNM", "IOT", "CC"].includes(domain)
                                ? domain
                                : domain.toLowerCase().replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  );

                            return (
                              <span key={i}>
                                {formattedDomain}
                                {i < domainList.length - 1 && ", "}
                              </span>
                            );
                          })}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )} </div>
          </div> */}

          {/* --------------------------------------------------
            NEW REDESIGNED UI
            --------------------------------------------------
          */}
          <div className="flex flex-col w-full h-full gap-6 mt-4 overflow-y-auto custom-scrollbar">
            
            {/* Top section: User details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Username Box - changed bg to lower opacity and added backdrop-blur for glassy look */}
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/30 p-4 rounded-xl flex flex-col gap-2">
                <span className="text-xs text-white/70 uppercase tracking-widest">Username</span>
                <span className="text-lg md:text-xl font-bold truncate">
                  {profileData?.username || "N/A"}
                </span>
              </div>

              {/* Email Box - same glassy treatment */}
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/30 p-4 rounded-xl flex flex-col gap-2">
                <span className="text-xs text-white/70 uppercase tracking-widest">Email Address</span>
                <span className="text-sm md:text-lg font-bold truncate" title={profileData?.email}>
                  {profileData?.email || "N/A"}
                </span>
              </div>
            </div>

            {/* Domain Section container - also made glassy */}
            {profileData?.domain && (
              <div className="bg-white/[0.05] backdrop-blur-md border border-white/20 p-5 rounded-xl flex flex-col gap-4">
                <span className="text-sm md:text-base font-bold uppercase tracking-wider border-b border-white/10 pb-2">
                  Selected Domains
                </span>
                
                <div className="space-y-4">
                  {Object.entries(profileData.domain).map(([key, domainList]) =>
                    domainList.length > 0 ? (
                      <div key={key} className="flex flex-col gap-2">
                        {/* Domain Category Label */}
                        <strong className="text-xs text-green-400 uppercase">
                          {key.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                        </strong>
                        
                        {/* Domain Badges - updated chips to be glassy as well */}
                        <div className="flex flex-wrap gap-2">
                          {domainList.map((domain, i) => {
                             // keeping your existing formatting logic
                            const formattedDomain =
                              ["AI/ML", "UI/UX", "RND", "PNM", "IOT", "CC"].includes(domain)
                                ? domain
                                : domain.toLowerCase().replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  );

                            return (
                              <span 
                                key={i} 
                                className="px-3 py-1 text-xs md:text-sm bg-white/[0.07] backdrop-blur-sm border border-white/30 rounded-md hover:bg-white/20 transition-colors"
                              >
                                {formattedDomain}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-xs tracking-wide text-white transition bg-transparent rounded-lg sm:text-lg md:text-xl hover:text-red-400 hover:scale-105"
        >
          &lt; SIGN OUT &gt;
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;