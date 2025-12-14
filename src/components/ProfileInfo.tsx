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
        await firebaseSignOut(auth);
        Cookies.remove("authToken");
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {}
  };

  // Helper to check if any domains are actually selected
  const hasDomains =
    profileData?.domain &&
    Object.values(profileData.domain).some((list) => list.length > 0);

  return (
    <>
      <ToastContainer />
      <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start p-4 space-y-6 relative">
        <div className="border-2 border-white mt-16 sm:mt-24 rounded-3xl backdrop-blur-[4.5px] min-h-[60vh] max-h-screen w-[90%] sm:w-[80%] md:w-[70%] flex flex-col py-12 sm:py-8 px-6 space-y-6 font-retro-gaming">
          <p className="text-2xl sm:text-3xl md:text-4xl tracking-widest text-center border-b-2 border-white/20 pb-4">
            PROFILE
          </p>

          {/* Legacy UI Code (Commented Out) */}
          {/* <div className="flex py-8 sm:py-0 flex-col items-center w-full sm:flex-row sm:items-start sm:gap-10">
            ...
          </div> */}

          <div className="flex flex-col w-full h-full gap-6 mt-4 overflow-y-auto custom-scrollbar">
            
            {/* User Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-4">
              
              {/* Username Box */}
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/30 p-4 rounded-xl flex flex-col gap-2">
                <span className="text-xs text-white/70 uppercase tracking-widest">Username</span>
                <span className="text-lg md:text-xl font-bold truncate">
                  {profileData?.username || "N/A"}
                </span>
              </div>

              {/* Email Box */}
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/30 p-4 rounded-xl flex flex-col gap-2">
                <span className="text-xs text-white/70 uppercase tracking-widest">Email Address</span>
                <span className="text-sm md:text-lg font-bold truncate" title={profileData?.email}>
                  {profileData?.email || "N/A"}
                </span>
              </div>
            </div>

            {/* Selected Domains Section*/}
            <div className="bg-white/[0.05] backdrop-blur-md border border-white/20 p-5 rounded-xl flex flex-col gap-4">
              <span className="text-sm md:text-base font-bold uppercase tracking-wider border-b border-white/10 pb-2">
                Selected Domains
              </span>
              
              <div className="space-y-4">
                {hasDomains ? (
                  // Render domains if they exist
                  Object.entries(profileData.domain).map(([key, domainList]) =>
                    domainList.length > 0 ? (
                      <div key={key} className="flex flex-col gap-2">
                        {/* Domain Category */}
                        <strong className="text-xs text-green-400 uppercase">
                          {key.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                        </strong>
                        
                        {/* Domain Badges */}
                        <div className="flex flex-wrap gap-2">
                          {domainList.map((domain, i) => {
                            // Domain name formatting logic
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
                  )
                ) : (
                  // Render "None" if no domains are selected
                  <div className="text-white/40 text-sm md:text-base italic pl-1">
                    None
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-xs tracking-wide text-white transition bg-transparent rounded-lg sm:text-lg md:text-xl hover:scale-105"
        >
          &lt; SIGN OUT &gt;
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;