import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
    Cookies.remove('authToken');
    localStorage.clear();
    sessionStorage.clear();
    navigate('/landing');
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start p-4 space-y-6 relative">

      <div className="border-2 border-white mt-[15.5vh] rounded-3xl w-[90%] sm:w-[80%] md:w-[70%] flex flex-col py-8 px-6 space-y-6 mx-auto">
        <p className="text-2xl sm:text-3xl tracking-widest text-center sm:mb-8">PROFILE</p>

        
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 w-full">
  
          <div className="flex flex-col text-sm sm:text-base md:text-lg w-full space-y-10 pl-6">
            <p>
              <span className="font-bold">Username :</span> {profileData?.name}
            </p>
            <p>
              <span className="font-bold">Mobile No.:</span> {profileData?.mobile}
            </p>
            <p>
              <span className="font-bold">Mail ID:</span>{' '}
              <span className="break-all">{profileData?.email}</span>
            </p>
            <p>
              <span className="font-bold">Selected Domains:</span>
              <div className="mt-4 space-y-3">
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