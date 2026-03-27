"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Users, LogOut, ChevronLeft, User, Baby } from "lucide-react";
import Logo from "./ui/Logo";
import { logout } from "@/lib/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isParent = pathname.startsWith("/parent");
const isAdmin = pathname === "/admin";
const isAdminUser = pathname.startsWith("/admin/user");
  const isAuth =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  //  no navbar for Auth pages (login and register pages)
  if (isAuth) return null;

  //  Dashboard navbar
  if (isDashboard) {
    return (
      <nav className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Logo />
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/parent")}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-black hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200"
          >
            <Users className="w-4 h-4" />
            Parent Space
          </button>
          {/* <button
            onClick={logout}
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button> */}
        </div>
      </nav>
    );
  }

  if (isAdmin) {
    return (
      <nav className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <NavTab label="Stats" active />
            <NavTab label="Users" />
          </nav>
          {/* Profile button */}
          <button
            onClick={() => router.push("/parent/profile")}
            className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-black hover:bg-orange-100 transition-all"
          >
            <User className="w-4 h-4" />
            Profile
          </button>
           <button
            onClick={logout}
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>
       
      </nav>
    );
  }
  if (isAdminUser) {
    return (
      <nav className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <NavTab label="Stats"/>
            <NavTab label="Users" active/>
          </nav>
          {/* Profile button */}
          <button
            onClick={() => router.push("/parent/profile")}
            className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-black hover:bg-orange-100 transition-all"
          >
            <User className="w-4 h-4" />
            Profile
          </button>
           <button
            onClick={logout}
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>
       
      </nav>
    );
  }
  if (isParent) {
    return (
      <nav className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Logo />
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-black hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200"
          >
            <Baby className="w-4 h-4" />            Your Child Space
          </button>
          {/* Profile button */}
          <button
            onClick={() => router.push("/parent/profile")}
            className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-black hover:bg-orange-100 transition-all"
          >
            <User className="w-4 h-4" />
            Profile
          </button>
           <button
            onClick={logout}
            className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </nav>
    );
  }
  //  Landing navbar
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm">
        <Logo />
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
            className="bg-orange-500 text-white px-4 py-2.5 rounded-full font-bold hover:bg-orange-600 transition-all hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

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

function NavTab({ label, active = false }: { label: string; active?: boolean }) {
  const router = useRouter();
  return (
    <button onClick={() => label === "Stats" ?router.push("/admin") :router.push("/admin/user")}
      className={`px-4 py-1.5 rounded-xl text-sm font-black transition-all ${
        active
          ? "bg-orange-500 text-white"
          : "text-gray-400 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}