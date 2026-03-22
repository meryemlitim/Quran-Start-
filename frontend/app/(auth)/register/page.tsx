"use client";
import Link from "next/link";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Baby,
  Calendar,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    childName: "",
    childAge: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to backend POST /auth/register
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">

      {/* Background blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-100 rounded-full opacity-30 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative">

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
            <h1 className="text-3xl font-black text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-500 font-semibold">Register as a parent to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Parent info divider */}
            <div className="flex items-center gap-3 mb-1">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs font-black text-gray-400 tracking-widest">PARENT INFO</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Parent Name */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Parent Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  placeholder="Ahmed Ali"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                />
              </div>
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+212 6 12 34 56 78"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 chars"
                    required
                    className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    required
                    className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Child info divider */}
            <div className="flex items-center gap-3 mt-2 mb-1">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs font-black text-gray-400 tracking-widest">CHILD INFO</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Child name + age row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Child's Name</label>
                <div className="relative">
                  <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="childName"
                    value={form.childName}
                    onChange={handleChange}
                    placeholder="Youssef"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Child's Age</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="childAge"
                    value={form.childAge}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 font-semibold text-gray-900 focus:outline-none focus:border-orange-400 focus:bg-white transition-all appearance-none"
                  >
                    <option value="">Age</option>
                    {Array.from({ length: 14 }, (_, i) => i + 3).map((age) => (
                      <option key={age} value={age}>{age} years</option>
                    ))}
                  </select>
                </div>
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
                  Create Account
                </>
              )}
            </button>

            <p className="text-center text-gray-500 font-semibold text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-black hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}