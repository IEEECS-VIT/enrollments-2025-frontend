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
          <p className="text-2xl sm:text-3xl md:text-4xl tracking-widest text-center">
            PROFILE
          </p>
          <div className="flex py-8 sm:py-0 flex-col items-center w-full sm:flex-row sm:items-start sm:gap-10">
            <div className="flex flex-col text-base sm:text-lg md:text-2xl w-full space-y-[5vh] sm:space-y-12">
              <p>
                <span className="font-bold">Username : </span>{" "}
                {profileData?.username}
              </p>
              <p>
                <span className="font-bold">Mobile No. : </span>{" "}
                {profileData?.mobile}
              </p>
              <p>
                <span className="font-bold">Mail ID : </span>{" "}
                <span className="break-all">{profileData?.email}</span>
              </p>
              <div>
                <span className="font-bold">Selected Domains : </span>
                <div className="mt-2 space-y-2">
                  {profileData?.domain &&
                    Object.entries(profileData.domain).map(
                      ([key, domainList]) =>
                        domainList.length > 0 && (
                          <div key={key} className="text-sm sm:text-2xl">
                            <strong >{key.toLowerCase().replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                      )} : </strong>
                            {domainList.map((domain, i) => {
                              // Keep "AI/ML" and "UI/UX" fully uppercase
                              const formattedDomain =
                                domain === "AI/ML" ||
                                domain === "UI/UX" ||
                                domain === "RND" ||
                                domain === "PNM" ||
                                domain === "IOT" ||
                                domain === "CC"
                                  ? domain
                                  : domain
                                      .toLowerCase()
                                      .replace(/\b\w/g, (char) =>
                                        char.toUpperCase()
                                      ); // Capitalize first letter of other domains

                              return (
                                <span key={i}>
                                  {formattedDomain}
                                  {i < domainList.length - 1 && ", "}
                                </span>
                              );
                            })}
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-xs tracking-wide text-white transition bg-transparent rounded-lg sm:text-lg md:text-xl"
        >
          &lt; SIGN OUT &gt;
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;
