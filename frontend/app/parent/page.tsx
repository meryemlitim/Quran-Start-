"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Star,
  Trophy,
  Target,
  ChevronLeft,
  User,
  ChevronRight,
  CheckCircle,
  Lock,
  TrendingUp,
} from "lucide-react";
import { getMe } from "@/lib/auth";
import { getDashboard } from "@/lib/progress";
import Navbar from "@/components/Navbar";

export default function ParentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, dashboardData] = await Promise.all([
          getMe(),
          getDashboard(),
        ]);
        setUser(userData);
        setDashboard(dashboardData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const overallProgress = Math.round(
    ((dashboard?.totalCompleted || 0) / 114) * 100
  );

  return (
    <main className="min-h-screen bg-orange-50">

      {/* ── NAVBAR ─────────────────────────────────────── */}
       <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ── WELCOME ────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            Welcome, <span className="text-orange-500">{user?.parentName}</span>!
          </h1>
          <p className="text-gray-500 font-semibold">
            Here is <span className="font-black text-gray-700">{user?.childName}</span>'s progress
          </p>
        </div>

        {/* ── STATS ROW ──────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-orange-500" />}
            label="Sorats Completed"
            value={dashboard?.totalCompleted || 0}
          />
          <StatCard
            icon={<Target className="w-5 h-5 text-orange-500" />}
            label="Current Hizb"
            value={dashboard?.currentHizb || 1}
          />
          <StatCard
            icon={<Star className="w-5 h-5 text-orange-500 fill-orange-500" />}
            label="Total Stars"
            value={dashboard?.totalStars || 0}
          />
        </div>

        {/* ── OVERALL PROGRESS ───────────────────────────── */}
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-gray-900">Overall Progress</h2>
              <p className="text-sm text-gray-400 font-semibold">
                {dashboard?.totalCompleted || 0} of 114 sorats completed
              </p>
            </div>
            <div className="text-3xl font-black text-orange-500">
              {overallProgress}%
            </div>
          </div>
          <div className="h-3 bg-orange-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Current step badge */}
          <div className="flex items-center gap-2 mt-4">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-gray-500">
              Currently on{" "}
              <span className="font-black text-gray-900 capitalize">
                {dashboard?.step || "reading"}
              </span>{" "}
              step — Hizb {dashboard?.currentHizb}, Sorat  {"       "} 
               <span className="font-black text-gray-900 capitalize">
                {dashboard?.currentSorahName}
              </span>
            </span>
          </div>
        </div>

        {/* ── COMPLETED SORATS ───────────────────────────── */}
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm mb-6">
          <h2 className="text-lg font-black text-gray-900 mb-4">Sorat Progress</h2>

          {dashboard?.completedSorats?.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-10 h-10 text-orange-200 mx-auto mb-3" />
              <p className="text-gray-400 font-semibold">No sorats completed yet</p>
              <p className="text-sm text-gray-300 font-semibold">Keep learning!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {dashboard?.completedSorats?.map((soratNum: number) => (
                <div
                  key={soratNum}
                  className="flex items-center justify-between p-3 bg-orange-50 rounded-2xl border border-orange-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-black text-gray-900">
                      Sorat {soratNum}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                </div>
              ))}

              {/* Current sorat in progress */}
              {dashboard?.currentSorat && !dashboard?.completedSorats?.includes(dashboard?.currentSorat) && (
                <div className="flex items-center justify-between p-3 bg-white rounded-2xl border-2 border-orange-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-sm font-black text-gray-900">
                      Sorat {dashboard?.currentSorat}
                    </span>
                  </div>
                  <span className="text-xs font-black text-orange-500 bg-orange-100 px-2 py-1 rounded-full capitalize">
                    {dashboard?.step}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-sm text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-black text-orange-500 mb-1">{value}</div>
      <div className="text-xs text-gray-400 font-semibold">{label}</div>
    </div>
  );
}