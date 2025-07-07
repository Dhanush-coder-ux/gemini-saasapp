import Link from "next/link"
import NavItems from "./NavItems"


const NavBar = () => {
  return (
    <nav className='navbar'>

        <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
            <img src="/images/logo.svg" width={45} height={44} alt="" />
        </div>
        </Link>

        <div >
            <NavItems/>
        </div>

    </nav>
  )
}

export default NavBar
