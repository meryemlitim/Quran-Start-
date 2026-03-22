"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900">
            Quran <span className="text-orange-500">Start</span>
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-500 font-semibold hover:text-orange-500 transition-colors"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-gray-500 font-semibold hover:text-orange-500 transition-colors"
          >
            How it works
          </a>
          <Link
            href="/login"
            className="text-gray-500 font-semibold hover:text-orange-500 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-orange-500 text-white px-4 py-2.5 rounded-full font-bold hover:bg-orange-600 transition-all hover:-translate-y-0.5 "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg px-8 py-6 flex flex-col gap-4 md:hidden">
          <a
            href="#features"
            className="text-gray-700 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how"
            className="text-gray-700 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            How it works
          </a>
          <a
            href="#preview"
            className="text-gray-700 font-semibold"
            onClick={() => setMenuOpen(false)}
          >
            Preview
          </a>
          <Link href="/login" className="text-gray-700 font-semibold">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}
