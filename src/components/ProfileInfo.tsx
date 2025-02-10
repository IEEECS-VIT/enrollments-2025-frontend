import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { showToastSuccess } from "../Toast";

interface ProfileData {
  name: string;
  mobile: string;
  email: string;
  domain: { [key: string]: string[] };
}

interface ProfileInfoProps {
  profileData: ProfileData;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      Cookies.remove("authToken");
    } catch (error) {
      console.error("Error during sign out:", error);
    } 
    showToastSuccess("Signed out successfully");
    navigate("/landing"); 
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start p-4 space-y-6 relative">
      <div className="border-2 border-white mt-[15.5vh] rounded-3xl w-[90%] sm:w-[80%] md:w-[70%] flex flex-col py-8 px-6 space-y-6 mx-auto font-retro-gaming">
        <p className="text-2xl sm:text-4xl tracking-widest text-center sm:mb-8">PROFILE</p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 w-full text-5xl">
          <div className="flex flex-col text-sm sm:text-base md:text-2xl w-full space-y-10 pl-6">
            <p><span className="font-bold">Username : </span> {profileData?.name}</p>
            <p><span className="font-bold">Mobile No. : </span> {profileData?.mobile}</p>
            <p><span className="font-bold">Mail ID : </span> <span className="break-all">{profileData?.email}</span></p>
            <p><span className="font-bold">Selected Domains : </span>
              <div className="mt-4 space-y-3">
                {profileData?.domain &&
                  Object.entries(profileData.domain).map(
                    ([key, domainList], index) =>
                      domainList.length > 0 && (
                        <div key={key}>
                          <strong>{key} : </strong> 
                          {domainList.map((domain, i) => (
                            <span key={i}>
                              {domain}{i < domainList.length - 1 && ", "}
                            </span>
                          ))}
                          {index < Object.keys(profileData.domain).length - 1 && <br />}
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
        className="text-white px-6 py-2 rounded-lg tracking-wide text-sm sm:text-xl"
      >
        &lt;Sign Out&gt;
      </button>
    </div>
  );
};

export default ProfileInfo;
