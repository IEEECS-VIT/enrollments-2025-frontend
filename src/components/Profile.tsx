import { useLocation } from "react-router-dom";
import Treecloud from "./Treecloud";
import ProfileInfo from "./ProfileInfo";
import { useEffect, useState } from "react";
import { loadProfile } from "../api/user";

interface ProfileData {
    name: string;
    mobile: string;
    email: string;
    domain: string[];
}

interface LocationState {
    profileData?: ProfileData;
}

export default function Profile() {
    const location = useLocation();
    const [profileData, setProfileData] = useState<ProfileData | null>(
        (location.state as LocationState)?.profileData || null
    );

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!profileData) {
                try {
                    const data: ProfileData = await loadProfile(); 
                    setProfileData(data);
                } catch (error) {
                    console.error("Failed to load profile data:", error);
                }
            }
        };

        fetchProfileData();
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
