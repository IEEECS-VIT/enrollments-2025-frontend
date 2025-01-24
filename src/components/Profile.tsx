import Treecloud from "./Treecloud";
import ProfileInfo from "./ProfileInfo";
import { useEffect, useState } from "react";
import { LoadProfile } from "../api/user";

interface ProfileData {
  name: string;
  mobile: string;
  email: string;
  domain: { [key: string]: string[] }; 
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data: ProfileData = await LoadProfile();
        console.log('data ', data);
        setProfileData(data);
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    };

    if (!profileData) { 
      fetchProfileData();
    }
  }, [profileData]); 

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>
      <div className="absolute w-full z-10 pointer-events-auto">
        {profileData ? (
          <ProfileInfo profileData={profileData} />
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
