// app/components/SignupForm.tsx
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import CompleteProfileForm from "./CompleteProfileForm";

const SignupForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        email: user.email,
        createdAt: new Date(),
      });

      router.push("/dashboard");
    }
    catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (user) {
    return <CompleteProfileForm user={user} />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Signup</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Signup
          </button>
        </form>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        >
          Signup with Google
        </button>
        <button
          onClick={handleGithubSignup}
          className="w-full bg-gray-800 text-white p-2 rounded"
        >
          Signup with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignupForm;