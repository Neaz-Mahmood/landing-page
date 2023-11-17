import React from 'react';
import blood_img from '../assets/blood_bank.jpeg';

const Hero = () => {
  return (
    <div>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          Give Blood, Save Life
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Give Someone A BEtter Tomorrow.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Find a Donation Center
          </p>

        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Locate your nearest plasma center by entering a city or a postal </p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;