"use client";
import Link from "next/link";
import {
  Moon,
  Star,
  Headphones,
  ClipboardList,
  Trophy,
  BarChart2,
  Unlock,
  BookOpen,
  TrendingUp,
  Users,
  Sparkles,
  Map,
} from "lucide-react";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-orange-50 text-gray-900 overflow-x-hidden font-sans">
      {/* NAVBAR */}
      <NavBar />
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20 relative">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl text-center relative">
          <h1 className="text-6xl md:text-7xl font-black leading-tight mb-6 text-gray-900">
            Learn Quran <span className="text-orange-500">with Joy</span>
          </h1>

          <p className="text-xl text-gray-500 font-semibold max-w-xl mx-auto mb-10 leading-relaxed">
            A fun and interactive way for children to memorize the Quran — aya
            by aya, step by step.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-black hover:bg-orange-600 transition-all hover:-translate-y-1 shadow-xl shadow-orange-200"
            >
              <Sparkles className="w-5 h-5" />
              Get Started Free
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-10 py-4 rounded-full text-lg font-black hover:bg-orange-100 transition-all hover:-translate-y-1"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                value: "60",
                label: "Hizbs",
                icon: <BookOpen className="w-6 h-6 text-orange-400" />,
              },
              {
                value: "114",
                label: "Sorats",
                icon: <Moon className="w-6 h-6 text-orange-400" />,
              },
              {
                value: "6,236",
                label: "Ayas",
                icon: <Star className="w-6 h-6 text-orange-400" />,
              },
              {
                value: "10K+",
                label: "Kids Learning",
                icon: <Users className="w-6 h-6 text-orange-400" />,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-orange-500">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-4xl font-black text-gray-900">
              Why kids love Quran Start
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Headphones className="w-7 h-7 text-orange-500" />,
                title: "Listen & Repeat",
                desc: "Hear every aya clearly with a professional reciter and repeat after it at your own pace",
              },
              {
                icon: <ClipboardList className="w-7 h-7 text-orange-500" />,
                title: "Fun Quizzes",
                desc: "Test memory with audio recognition, verse ordering and fill-in-the-blank challenges",
              },
              {
                icon: <Trophy className="w-7 h-7 text-orange-500" />,
                title: "Earn Rewards",
                desc: "Collect stars, unlock badges and level up as you complete each sorat and hizb",
              },
              {
                icon: <BarChart2 className="w-7 h-7 text-orange-500" />,
                title: "Track Progress",
                desc: "Parents get a full dashboard showing completed sorats, quiz scores and time spent",
              },
              {
                icon: <Unlock className="w-7 h-7 text-orange-500" />,
                title: "Unlock Journey",
                desc: "Sorats unlock one by one — complete a quiz to unlock the next step forward",
              },
              {
                icon: <Moon className="w-7 h-7 text-orange-500" />,
                title: "Moral Lessons",
                desc: "Each sorat comes with a simple moral lesson written especially for children",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-orange-100 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-5 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 font-semibold leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-2 text-sm font-bold mb-4">
              <Map className="w-4 h-4" />
              How it works
            </div>
            <h2 className="text-4xl font-black text-gray-900">
              Start in 3 simple steps
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-center">
            {[
              {
                icon: <Users className="w-8 h-8 text-orange-500" />,
                title: "Parent creates account",
                desc: "Register with your info and your child's name and age",
              },
              {
                icon: <BookOpen className="w-8 h-8 text-orange-500" />,
                title: "Child starts learning",
                desc: "Begin with Hizb 1, listen, repeat and memorize aya by aya",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
                title: "Track together",
                desc: "Parents monitor progress, stars, badges and quiz results",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col md:flex-row items-center flex-1"
              >
                <div className="flex flex-col items-center text-center max-w-52 px-4">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center mb-4 shadow-sm">
                    {step.icon}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-black mb-4 shadow-lg shadow-orange-200">
                    {i + 1}
                  </div>
                  <h3 className="text-base font-black text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-semibold leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block flex-1 border-t-2 border-dashed border-orange-300 mb-24" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-16 text-center text-white relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-white/10 rounded-full" />
            <div className="relative">
              <div className="flex justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-black mb-4">
                Start your child's Quran journey today
              </h2>
              <p className="text-lg opacity-90 font-semibold mb-8">
                Join thousands of families helping their children learn and
                memorize the Quran
              </p>
              <Link
                href="/register"
                className="bg-white text-orange-500 px-12 py-4 rounded-full text-lg font-black hover:bg-orange-50 transition-all hover:-translate-y-1 shadow-xl inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <Footer />
    </main>
  );
}
