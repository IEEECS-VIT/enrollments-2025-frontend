import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut as firebaseSignOut } from "firebase/auth";
import { showToastSuccess } from "../Toast";

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
  console.log(profileData);
  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      Cookies.remove("authToken");
      showToastSuccess("Signed out successfully");

      // Redirect to landing page after sign out
      navigate("/landing");
      window.location.reload(); // Ensure auth state resets
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start p-4 space-y-6 relative">
      <div className="border-2 border-white mt-16 sm:mt-24 rounded-3xl min-h-[60vh] max-h-screen w-[90%] sm:w-[80%] md:w-[70%] flex flex-col py-8 px-6 space-y-6 font-retro-gaming">
        <p className="text-xl sm:text-3xl md:text-4xl tracking-widest text-center">
          PROFILE
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 w-full">
          <div className="flex flex-col text-base sm:text-lg md:text-2xl w-full space-y-[9vh] sm:space-y-12">
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
            <p>
              <span className="font-bold">Selected Domains : </span>
              <div className="mt-2 space-y-2">
                {profileData?.domain &&
                  Object.entries(profileData.domain).map(
                    ([key, domainList]) =>
                      domainList.length > 0 && (
                        <div key={key} className="text-sm sm:text-2xl">
                          <strong>{key} : </strong>
                          {domainList.map((domain, i) => (
                            <span key={i}>
                              {domain}
                              {i < domainList.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      )
                  )}
              </div>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="text-white bg-transparent px-4 py-2 rounded-lg tracking-wide text-xs sm:text-lg md:text-xl transition"
      >
        &lt;Sign Out&gt;
      </button>
    </div>
  );
};

export default ProfileInfo;
