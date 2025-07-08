"use client" 
import clsx from "clsx";
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems =[
    {label:"Home",href:'/'},
    {label:"Learning Vault",href:'/Learning'},
    {label:"My Journey",href:'/my-journey'},
    
]

const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className='flex items-center gap-4'>
      {/* hidden lg:flex items-center gap-4 */}
      {navItems.map(({ label, href })=>(
      <Link
          href={href}
          key={label}
          className={clsx(
            "group relative nav-link",
            pathname === href && "text-blue-400 font-semibold"
          )}
        >
          <span>
            {label}
            <span className="underline" />
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default NavItems
