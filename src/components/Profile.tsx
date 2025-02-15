import Treecloud from "./Treecloud";
import ProfileInfo from "./ProfileInfo";
import { useEffect, useState } from "react";
import { LoadProfile } from "../api/user";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  username: string;
  name: string;
  mobile: string;
  email: string;
  domain: { [key: string]: string[] };
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data: ProfileData = await LoadProfile();
        setProfileData(data);
      } catch (error: any) {
        console.error("Failed to load profile data:", error);

        // Check if the error is a 404 and redirect
        if (error.response && error.response.status === 401) {
          navigate("/landing");
        }
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    if (!profileData) {
      fetchProfileData();
    }
  }, [profileData, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
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
