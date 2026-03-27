"use client";
import { useState, useEffect } from "react";
import { BookOpen, Star, Trophy, Users} from "lucide-react";
import { adminDashboard } from "@/lib/progress";
import Navbar from "@/components/Navbar";

async function getAdminDashboard() {
  const res = adminDashboard();
  return res;
}

export default function AdminStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50">
      {/* ── HEADER ─────────────────────────────────── */}
      <Navbar/>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* ── PAGE TITLE ─────────────────────────────── */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            Platform <span className="text-orange-500">Overview</span>
          </h1>
          <p className="text-gray-400 font-semibold text-sm">
            Real-time stats across all learners
          </p>
        </div>

        {/* ── STATS GRID ─────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <BigStatCard
            icon={<Users className="w-5 h-5 text-orange-500" />}
            label="Total Users"
            value={data.userNumber}
            bg="bg-white"
          />
          <BigStatCard
            icon={<BookOpen className="w-5 h-5 text-orange-500" />}
            label="Sorats Completed"
            value={data.TotalSoratsCompleted.toLocaleString()}
            bg="bg-white"
          />
          <BigStatCard
            icon={<Star className="w-5 h-5 text-orange-500 fill-orange-500" />}
            label="Total Stars Earned"
            value={data.TotalStars.toLocaleString()}
            bg="bg-white"
          />
        </div>

        {/* ── HIGHLIGHT ROW ──────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* Top Learner */}
          <div className="bg-orange-500 rounded-3xl p-6 text-white flex items-center justify-between">
            <div>
              <p className="text-orange-100 font-semibold text-sm mb-1">
                🏆 Top Learner
              </p>
              <p className="text-2xl font-black">{data.TopLearner}</p>
              <p className="text-orange-200 text-xs font-semibold mt-1">
                Highest stars this period
              </p>
            </div>
            <Trophy className="w-12 h-12 text-orange-300 opacity-60" />
          </div>


        </div>  
      </div>
    </main>
  );
}

function BigStatCard({ icon, label, value, bg }) {
  return (
    <div
      className={`${bg} rounded-2xl p-5 border border-orange-100 shadow-sm text-center`}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-black text-orange-500 mb-1">{value}</div>
      <div className="text-xs text-gray-400 font-semibold">{label}</div>
    </div>
  );
}

