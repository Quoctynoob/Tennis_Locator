import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import SideNavbar from "./navbarlogin";

import Home from "./Home";
import Map from "./Map";
import Favorite from "./Favorite";
import AddCourts from "./AddCourts";

const DashboardContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [note, setNote] = useState<string>("");
  const [view, setView] = useState<string>('home');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Fetch user-specific data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setNote(userDoc.data().note || "");
        }
      } 
      else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);


  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const renderContent = () => {
    switch(view) {
      case 'map':
        return <Map/>
      case 'favorite':
        return <Favorite/>
      case 'addcourts':
        return <AddCourts/>
      default:
        return <Home/>
    }
  }
  return (
    <div className="flex">
      <SideNavbar setView={setView} /> {/* Add the Sidebar component */}
      <div className="flex-1 min-h-screen bg-gray-100 p-6 ml-64">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
          {user ? (
            userData ? (
              <div>
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <p className="text-xl mb-4">Welcome, {userData.email}</p>
                {renderContent()}
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mt-2">
                  Logout
                </button>
              </div>
            ) : (
              <p>Loading user data...</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default DashboardContent;
