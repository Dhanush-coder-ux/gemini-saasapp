'use client'
import Link from "next/link"
import NavItems from "./NavItems"
import { SignInButton,SignedIn,SignedOut,UserButton } from '@clerk/nextjs';

import { useEffect, useState } from "react";

const navItem =[
    {label:"Home",href:'/',img:"/images/home.svg"},
    {label:"Learning Vault",href:'/Learning',img:"/images/profile.svg"},
    {label:"My Journey",href:'/my-journey',img:"/images/vault.svg"},
    {label:"Image Companion",href:'/imagecompanion',img:"/images/vault.svg"},
    
]

const NavBar = () => {
  const [visible,setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }


    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [visible]);

  
  return (
    <nav className='navbar'>

        <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
            <img src="/images/logo.png" width={65} height={65} alt="" />
        </div>
        </Link>
    
        <div className="flex items-center gap-6 ">
             <div className="hidden lg:flex rounded-lg p-4 bg-accent">
                <NavItems/>
          
            </div>
        </div>

        <div  className="flex items-center gap-8 ">
        
              <SignedOut>
               
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
               
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <img src="/images/burger.svg" className="w-10 sm:hidden" onClick={()=>setVisible(true)} alt="" />
        </div>

              {visible && (
                    <div
                      className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-[90]"
                      onClick={() => setVisible(false)} 
                    ></div>
                  )}

                <div className={`fixed top-0 left-0 h-full duration-400 z-[100] bg-white shadow-lg transition-all ${visible ? 'w-[70%] max-w-xs p-6' : 'w-0 overflow-hidden'}`}>
                    <div className="flex flex-col gap-4">
                      {navItem.map((item, index) => (
                        <Link
                          href={item.href}
                          key={index}
                          onClick={() => setVisible(false)}
                          className="text-lg  text-gray-800 flex gap-2 p-2  hover:bg-gray-300 transition-colors"
                        >
                          <img src={item.img} width={18} height={18} alt="" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>



    </nav>
  )
}

export default NavBar
