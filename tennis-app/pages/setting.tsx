import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getInitials } from "@/app/components/utilites/getInitials";

const Setting: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        };
        fetchUserData();
    }, []);

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfilePicture(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            if (newPassword !== confirmPassword) {
                alert("New password and confirm password do not match.");
                return;
            }
            
            try {
                // Update Firestore
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    firstName: firstName || userData.firstName,
                    lastName: lastName || userData.lastName,
                    username: username || userData.username,
                });

                // Update Auth profile
                await updateProfile(user, {
                    displayName: `${firstName || userData.firstName} ${lastName || userData.lastName}`,
                });

                // Update Password
                if (newPassword) {
                    await updatePassword(user, newPassword);
                }

                setSuccessMessage("Profile updated successfully — view your profile.");
                setTimeout(() => setSuccessMessage(null), 5000);
            } catch (error) {
                console.error("Error updating profile: ", error);
                alert("Error updating profile.");
            }
        }
    };

    const initials = getInitials(userData?.firstName || '', userData?.lastName || '');

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            {successMessage && (
                <div className="bg-green-500 text-white w-full p-4 rounded mb-6">
                    {successMessage} <a href="/dashboard" className="underline">view your profile</a>.
                </div>
            )}
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                <span className="text-2xl text-white">{initials}</span>
                            </div>
                        )}
                    </div>
                    <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                </div>
                
                <form onSubmit={handleSaveChanges}>
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder={userData?.firstName || ""}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder={userData?.lastName || ""}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder={userData?.username || ""}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Old Password</label>
                        <input 
                            type="password" 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input 
                            type="password" 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input 
                            type="password" 
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-green-500 text-white p-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Setting;
