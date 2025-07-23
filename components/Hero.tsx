'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      'h1',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.inOut' }
    )
  })

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center py-10 sm:py-10'>
      <div className='text-center mb-5'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing Learning Experience With <br /> 
        <span className='text-blue-600'>AI tools</span></h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
          Trasnform your learning methods with our AI tools.AI Voice agent ,image to  worksheet generation,enhance your learning experience
        </p>
      </div>
    </div>
 
  );
};

export default Hero;