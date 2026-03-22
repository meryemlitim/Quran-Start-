"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to backend POST /auth/login
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">

      {/* Background blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100 rounded-full opacity-30 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black text-gray-900">
            Quran <span className="text-orange-500">Start</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-orange-100 border border-orange-100 p-8">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-500 font-semibold">Login to continue your child's journey</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ahmed@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              {/* <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-black text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-sm text-orange-500 font-bold hover:underline">
                  Forgot password?
                </Link>
              </div> */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Login
                </>
              )}
            </button>

            <p className="text-center text-gray-500 font-semibold text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-orange-500 font-black hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}