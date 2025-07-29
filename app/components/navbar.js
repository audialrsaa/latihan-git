'use client';

import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 text-2xl font-bold text-blue-500">
          MongStore
        </Link>

        <div className="hidden md:flex flex-grow justify-center px-6">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 text-sm text-blue-500 border border-blue-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-8 mr-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-500 hover:scale-105 transition-all duration-300">
            <ShoppingCart className="h-6 w-6 text-blue-500" />
          </button>

          <Link href="/login">
            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:scale-105 transition-all duration-300">
              Login
            </button>
          </Link>

          <button
            type="button"
            className="inline-flex md:hidden items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 text-sm text-blue-500 border border-blue-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
