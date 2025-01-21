import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-200 p-4 text-black w-full snap-start">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <span className='text-center text-l mb-4 lg:mb-0'>Quoc Le</span>
        <div className='flex space-x-4'>
          <a href="https://github.com/Quoctynoob"><img src="/icons/github.svg" className="w-6 h-6" alt="GitHub" /></a>
          <a href="https://www.instagram.com/tilburgquoc/"><img src="/icons/instagram.svg" className="w-6 h-6" alt="Instagram" /></a>
          <a href="https://www.linkedin.com/in/quoc-van-tilburg-le-293333294/"><img src="/icons/linkedin.svg" className="w-6 h-6" alt="Linkedin" /></a>
          <a href="mailto:tilburgquoc34@gmail.com"><img src="/icons/mail.svg" className="w-6 h-6" alt="Mail" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
