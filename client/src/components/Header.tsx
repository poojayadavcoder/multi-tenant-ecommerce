

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
            href="#" 
            className="text-neutral-500 hover:text-neutral-950 font-medium text-sm transition-colors duration-200"
          >
            Catalog
          </Link>
          <Link 
            href="#" 
            className="text-neutral-500 hover:text-neutral-950 font-medium text-sm transition-colors duration-200"
          >
            Collections
          </Link>
          <Link 
            href="#" 
            className="text-neutral-500 hover:text-neutral-950 font-medium text-sm transition-colors duration-200"
          >
            Archive
          </Link>
        </nav>
      </div>
    </header>
  );
}
