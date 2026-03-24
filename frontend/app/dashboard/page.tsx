"use client";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Star,
  Trophy,
  Lock,
  ChevronRight,
  CheckCircle,
  Target,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getMe } from "@/lib/auth";
import { getMyProgress } from "@/lib/progress";

type Step = "reading" | "memorizing" | "quiz";

interface Progress {
  currentHizb: number;
  currentSorat: number;
  currentAya: number;
  step: Step;
  unlockedHizbs: number[];
  unlockedSorats: number[];
  completedSorats: number[];
  stars: number;
  badges: string[];
}

interface Sorat {
  id: number;
  nameAr: string;
  nameEn: string;
  ayatCount: number;
}

const HIZBS = Array.from({ length: 60 }, (_, i) => ({ id: i + 1 }));

const SORATS_BY_HIZB: Record<number, Sorat[]> = {
  1: [
    { id: 1, nameAr: "الفاتحة", nameEn: "Al-Fatiha", ayatCount: 7 },
    { id: 2, nameAr: "البقرة", nameEn: "Al-Baqara", ayatCount: 286 },
  ],
  2: [
    { id: 3, nameAr: "آل عمران", nameEn: "Al-Imran", ayatCount: 200 },
    { id: 4, nameAr: "النساء", nameEn: "An-Nisa", ayatCount: 176 },
  ],
};

const MOCK_PROGRESS: Progress = {
  currentHizb: 1,
  currentSorat: 1,
  currentAya: 3,
  step: "memorizing",
  unlockedHizbs: [1, 2],
  unlockedSorats: [1, 2],
  completedSorats: [1],
  stars: 45,
  badges: ["first-sorat", "perfect-quiz"],
};

const STEP_COLORS: Record<Step, string> = {
  reading: "bg-blue-100 text-blue-600",
  memorizing: "bg-orange-100 text-orange-600",
  quiz: "bg-green-100 text-green-600",
};

export default function ChildDashboard() {
  const [selectedHizb, setSelectedHizb] = useState<number | null>(null);
  const [user, setUser] = useState<{
    parentName: string;
    childName: string;
  } | null>(null);

  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [userData, progressData] = await Promise.all([
        getMe(),
        getMyProgress(),
      ]);

      setUser(userData);
      setProgress(progressData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading || !progress) {
  return <div>Loading...</div>;
}

  const isHizbUnlocked = (hizbId: number) =>
    progress.unlockedHizbs.includes(hizbId);
  const isHizbCompleted = (hizbId: number) => {
    const sorats = SORATS_BY_HIZB[hizbId] || [];
    return sorats.every((s) => progress.completedSorats.includes(s.id));
  };
  const isSoratUnlocked = (soratId: number) =>
    progress.unlockedSorats.includes(soratId);
  const isSoratCompleted = (soratId: number) =>
    progress.completedSorats.includes(soratId);

  const overallProgress = Math.round(
    (progress.completedSorats.length / 114) * 100,
  );
  const hizbProgress = selectedHizb
    ? Math.round(
        ((SORATS_BY_HIZB[selectedHizb] || []).filter((s) =>
          progress.completedSorats.includes(s.id),
        ).length /
          ((SORATS_BY_HIZB[selectedHizb] || []).length || 1)) *
          100,
      )
    : 0;

  return (
    <main className="min-h-screen bg-orange-50">
      {/* NAVBAR */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* GREETING */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            Assalamu Alaikum,{" "}
            <span className="text-orange-500">
              {user?.childName || "Explorer"}
            </span>
            ! 👋
          </h1>
          <p className="text-gray-500 font-semibold">
            Ready to learn today? Keep going!
          </p>
        </div>

        {/* TOP CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Current status card */}
          <div className="md:col-span-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-4 w-40 h-40 bg-white/10 rounded-full" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/70 font-semibold text-sm mb-1">
                    Currently Learning
                  </p>
                  <h2 className="text-2xl font-black">
                    Hizb {progress.currentHizb} — Sorat {progress.currentSorat}
                  </h2>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-full text-sm font-black capitalize ${STEP_COLORS[progress.step]} bg-white/20 text-white`}
                >
                  {progress.step}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-white/70 font-semibold mb-1.5">
                  <span>Overall Progress</span>
                  <span>{overallProgress}%</span>
                </div>
                <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/80 font-semibold">
                <Target className="w-4 h-4" />
                <span>
                  Aya {progress.currentAya} — {progress.completedSorats.length}{" "}
                  sorats completed
                </span>
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm flex flex-col justify-between">
            <p className="text-sm font-black text-gray-400 mb-4">Your Stats</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    Stars
                  </span>
                </div>
                <span className="text-xl font-black text-orange-500">
                  {progress.stars}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    Badges
                  </span>
                </div>
                <span className="text-xl font-black text-orange-500">
                  {progress.badges.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    Sorats
                  </span>
                </div>
                <span className="text-xl font-black text-orange-500">
                  {progress.completedSorats.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HIZB GRID or SORAT LIST */}
        {selectedHizb === null ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-gray-900">Your Hizbs</h2>
              <span className="text-sm text-gray-400 font-semibold">
                {progress.unlockedHizbs.length} / 60 unlocked
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {HIZBS.map((hizb) => {
                const unlocked = isHizbUnlocked(hizb.id);
                const completed = isHizbCompleted(hizb.id);
                const isCurrent = hizb.id === progress.currentHizb;

                return (
                  <button
                    key={hizb.id}
                    disabled={!unlocked}
                    onClick={() => unlocked && setSelectedHizb(hizb.id)}
                    className={`
                      aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border-2
                      ${
                        completed
                          ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
                          : unlocked
                            ? isCurrent
                              ? "bg-white border-orange-400 text-orange-500 shadow-lg shadow-orange-100 hover:-translate-y-0.5"
                              : "bg-white border-orange-200 text-orange-500 hover:border-orange-400 hover:-translate-y-0.5"
                            : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                      }
                    `}
                  >
                    {completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : unlocked ? (
                      <BookOpen className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    <span className="text-xs font-black">{hizb.id}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* SORAT LIST */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSelectedHizb(null)}
                className="flex items-center gap-2 text-orange-500 font-black hover:underline"
              >
                ← Back to Hizbs
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-black">
                Hizb {selectedHizb}
              </span>
            </div>

            {/* Hizb progress bar */}
            <div className="bg-white rounded-2xl p-5 border border-orange-100 mb-6">
              <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2">
                <span>Hizb {selectedHizb} Progress</span>
                <span>{hizbProgress}%</span>
              </div>
              <div className="h-2.5 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${hizbProgress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {(SORATS_BY_HIZB[selectedHizb] || []).map((sorat) => {
                const unlocked = isSoratUnlocked(sorat.id);
                const completed = isSoratCompleted(sorat.id);
                const isCurrent = sorat.id === progress.currentSorat;

                return (
                  <div
                    key={sorat.id}
                    className={`
                      bg-white rounded-2xl p-5 border-2 flex items-center justify-between transition-all duration-200
                      ${
                        completed
                          ? "border-orange-200 bg-orange-50"
                          : unlocked
                            ? isCurrent
                              ? "border-orange-400 shadow-md shadow-orange-100"
                              : "border-gray-100 hover:border-orange-200"
                            : "border-gray-100 opacity-60"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      {/* Status icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0
                        ${completed ? "bg-orange-500" : unlocked ? "bg-orange-100" : "bg-gray-100"}`}
                      >
                        {completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : unlocked ? (
                          <BookOpen className="w-6 h-6 text-orange-500" />
                        ) : (
                          <Lock className="w-6 h-6 text-gray-300" />
                        )}
                      </div>

                      {/* Sorat info */}
                      <div>
                        <p
                          className="text-lg font-black text-gray-900"
                          style={{ fontFamily: "serif" }}
                        >
                          {sorat.nameAr}
                        </p>
                        <p className="text-sm text-gray-500 font-semibold">
                          {sorat.nameEn} — {sorat.ayatCount} Ayas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {completed && (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className="w-4 h-4 text-orange-400 fill-orange-400"
                            />
                          ))}
                        </div>
                      )}
                      {isCurrent && (
                        <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1 rounded-full capitalize">
                          {progress.step}
                        </span>
                      )}
                      {unlocked && !completed && (
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
