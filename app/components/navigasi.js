'use client';

import { useState } from 'react';
import { Search, ShoppingCart, User, Bell } from 'lucide-react';
import Link from 'next/link';

export default function Navigasi() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-500 whitespace-nowrap">
          MongStore
        </Link>

        {/* Search bar (Desktop) */}
        <div className="hidden md:block md:flex-grow max-w-md px-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-blue-500">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search…"
              className="w-full pl-10 pr-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-full focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Right icons + hamburger */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <Link href="/cart">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
            </button>
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
            <Bell className="w-6 h-6 text-blue-500" />
          </button>
          <Link href="/profile">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-100 transition">
              <User className="w-6 h-6 text-blue-500" />
            </button>
          </Link>
          {/* Hamburger button for mobile */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg md:hidden hover:bg-blue-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu (Mobile) */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`}>
          {/* Search Mobile */}
          <div className="relative mb-4 px-2">
            <span className="absolute inset-y-0 left-3 flex items-center text-blue-500">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search…"
              className="w-full pl-10 pr-4 py-2 text-sm text-blue-500 bg-blue-50 rounded-full focus:outline-none"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-3 px-4 pb-4">
            <li>
              <Link href="#category" className="block py-2 text-blue-700">
                Category
              </Link>
            </li>
            <li>
              <Link href="#foryou" className="block py-2 text-blue-600 hover:text-blue-700">
                For You
              </Link>
            </li>
            <li>
              <Link href="#contact" className="block py-2 text-blue-600 hover:text-blue-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
