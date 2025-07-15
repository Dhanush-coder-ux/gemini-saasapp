'use client'
import Lottie from 'lottie-react'
import robo from '../constants/AI Robot.json'
import Link from 'next/link'


const CTA = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start Learning Your Way</div>
      <h2 className='text-3xl font-bold'>
        Build and Personalize Learning Companion
      </h2>
      <p>Pick a name,Subject ,voice,& personality - and start learning 
        through voice conversation that feel natural and fun.
      </p>
      
      <Lottie animationData={robo} className="companion-lottie" />
      <button className='btn-primary'>
        <img src="/icons/plus.svg" width={12} height={12} alt="" />
        <Link href='/Learning/new' >
        <p>Build a New Learning</p>
        </Link>
      </button>
    </section>
  )
}

export default CTA
