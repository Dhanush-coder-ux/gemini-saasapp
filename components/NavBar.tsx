import Link from "next/link"
import NavItems from "./NavItems"
import { SignInButton,SignedIn,SignedOut,UserButton } from '@clerk/nextjs';


const NavBar = () => {
  return (
    <nav className='navbar'>

        <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
            <img src="/images/logos.png" width={55} height={55} alt="" />
        </div>
        </Link>

        <div  className="flex items-center gap-8">
            <NavItems/>
            <SignedOut>
               
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
               
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>

    </nav>
  )
}

export default NavBar
