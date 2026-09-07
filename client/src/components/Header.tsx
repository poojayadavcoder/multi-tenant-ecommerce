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
            
            <svg
             className="w-6 h-6"
             fill="none"
             stroke="currentColor"
             strokeWidth="1.75"
             viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.386 1.447m0 0L6.75 14.25a2.25 2.25 0 002.184 1.706h7.132a2.25 2.25 0 002.184-1.706l1.258-4.967a1.125 1.125 0 00-1.091-1.408H5.109m0 0l-.385-1.447M9 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm8.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>

            {/* Notification Badge */}
            {/* {totalItems > 0 && ( */}
              {/* // <span className="absolute -top-1 -right-1 bg-[#00b574] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50 duration-200"> */}
              {/* //   {totalItems} */}
              {/* </span>
             )} */}
          </Link>
          
        </div>
        </nav>
      </div>
    </header>
  );
}
