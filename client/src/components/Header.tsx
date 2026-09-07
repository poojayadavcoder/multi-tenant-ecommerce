import Link from 'next/link';

function Logo() {
  return (
    <Link href="/dashboard/customer" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
      <svg
        className="w-7 h-7"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 17 L28 23 L16 29 L4 23 Z"
          fill="#059669"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 11 L28 17 L16 23 L4 17 Z"
          fill="#10B981"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 5 L28 11 L16 17 L4 11 Z"
          fill="#34D399"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex items-center text-lg font-bold tracking-wider text-[#48D7A6]">
        Zoka
      </span>
    </Link>
  );
}


export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-16 py-4 flex items-center justify-between border-b border-neutral-100">
      <Logo />
      
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/dashboard/customer/order" 
            className="text-neutral-500 hover:text-neutral-950 font-medium text-sm transition-colors duration-200"
          >
            Orders
          </Link>
           <div className="flex items-center gap-6">
          
          <Link href="/dashboard/customer/cart" className="relative p-2 text-neutral-600 hover:text-emerald-600 transition-colors">
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

            {/* Notification Badge */}
            {/* {totalItems > 0 && ( */}
              <span className="absolute -top-1 -right-1 bg-[#00b574] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50 duration-200">
                {/* {totalItems}6 */}
              </span>
            {/* )} */}
          </Link>
          
        </div>
        </nav>
      </div>
    </header>
  );
}
