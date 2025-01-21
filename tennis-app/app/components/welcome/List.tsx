import { useRouter } from 'next/router';
import React from "react";

const List = () => {
    const router = useRouter();
    const handleSignUp = () => {
        router.push('/signup');
    }

    return (
        <section id="list" className="bg-green-50 w-full h-[576px] flex items-center justify-center">
            <div className="text-center">
                <h1 className='mb-4 text-6xl font-matemasie text-black'>Join Us</h1>
                <button onClick={handleSignUp} className='button-signup'>
                    Sign Up
                </button>
            </div>
        </section>
    );
};

export default List;