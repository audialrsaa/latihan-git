'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12 overflow-hidden rounded-none shadow-lg w-full">
      
      <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-10 px-4 sm:px-8 md:px-16">
        <div className="flex-1 min-w-[280px] ml-25 text-center md:text-left">   
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight drop-shadow-lg text-balance">
            Welcome to <span className="text-white/90">MongStore!</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-white/80 text-balance">
            Find the best products tailored just for you.
          </p>
          <Link href="/login">
            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="flex-1 min-w-[220px] flex justify-center">
          <Image
            src="/image/logo.png"
            alt="Shopping"
            width={250}
            height={250}
            className="rounded-full bg-white shadow-lg object-cover max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
