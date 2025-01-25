import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
  const handleSignOut = () => {
    Cookies.remove("authToken");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/landing");
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start">
      <div className="border-2 border-white mt-[10vh] rounded-3xl w-[80%] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-8">
        <p className="text-2xl mb-8 md:text-left text-center">
          PROFILE DETAILS
        </p>
        <div className="flex-col justify-start items-start leading-[2rem] md:leading-[3rem] text-[0.6rem] md:text-xl p-2">
          <p className="mb-4">
            Character Name:{" "}
            <span className="block md:inline">{profileData?.name}</span>
          </p>
          <p className="mb-4">
            Mobile No.:{" "}
            <span className="block md:inline">{profileData?.mobile}</span>
          </p>
          <p className="mb-4">
            Email id:{" "}
            <span className="block md:inline">{profileData?.email}</span>
          </p>
          <p className="mb-4">
            Selected domain:
            <span className="block md:inline">
              {profileData?.domain &&
                Object.entries(profileData.domain).map(
                  ([key, domainList], index) =>
                    domainList.length > 0 && (
                      <div key={key}>
                        <strong>{key}:</strong>{" "}
                        {domainList.map((domain, i) => (
                          <span key={i}>
                            {domain}
                            {i < domainList.length - 1 && ", "}
                          </span>
                        ))}
                        {index < Object.keys(profileData.domain).length - 1 && (
                          <br />
                        )}
                      </div>
                    )
                )}
            </span>
          </p>
          <div className="flex flex-col w-full items-center">
            <img
              src="/character.svg"
              alt="character"
              className="w-14 md:w-14 class "
            />
            <p className="text-[0.6rem] md:text-xl">Character created!</p>
          </div>
        </div>
      </div>
      <p
        className="text-white text-[0.6rem] md:text-xl absolute md:bottom-10 bottom-5"
        onClick={handleSignOut}
      >
        Sign out
      </p>
    </div>
  );
};

export default ProfileInfo;
