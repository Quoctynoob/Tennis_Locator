import React from "react";
import { useRouter } from "next/router";

const About = () => {
    const router = useRouter();
    const SignUpButton = () => {
        router.push('/signup');
    };

    return (
        <section id="about" className="text-black bg-green-50 w-full h-screen p-8 snap-start flex flex-col lg:flex-row justify-between items-center">
            
            <div className="w-1/2 p-11">
                <div className=" text-black text-7xl font-bold font-sans">About Us</div>
                <div className=" text-black text-2xl font-normal font-['Kameron']">
                    Hi there! Welcome to my Website, a passion project dedicated to helping tennis 
                    players find the best courts in their area. As a tennis lover myself, I know how important 
                    it is to have a great place to play, and that's why I created this website.
                </div>
                <button onClick={SignUpButton} className="bg-lime-300 rounded-md w-full lg:w-[131px] h-8 text-center">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default About;
