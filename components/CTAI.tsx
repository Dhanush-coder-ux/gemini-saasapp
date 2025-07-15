'use client'

import Lottie from 'lottie-react'
import Link from 'next/link'
import ai from '@/constants/AI CPU circuit board loading animation.json'

const CTAI = () => {
  return (
    <section className='ctai-section'>
      <div className='cta-badge'>Your AI Learning Assistant</div>

      <h2 className='text-3xl font-bold'>
        Create and Customize Your Image Companion
      </h2>

      <p className='mt-2 text-base text-white'>
        
        Engage with your AI companion through natural image-based interactions that make learning visual, intuitive, and fun.
      </p>

      <Lottie animationData={ai} className="companion-lottie" />

      <Link href='/imagecompanion/new'>
        <button className='btn-primary mt-4 flex items-center gap-2'>
          <img src="/icons/plus.svg" width={14} height={14} alt="Plus Icon" />
          <span>Build New Image Companion</span>
        </button>
      </Link>
    </section>
  )
}

export default CTAI
