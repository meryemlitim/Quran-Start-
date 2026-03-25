"use client";
import { Star, Trophy, BookOpen, Target, ArrowRight } from "lucide-react";

type Step = "reading" | "memorizing" | "quiz";

interface Progress {
  currentHizb: number;
  currentSorat: number;
  currentAya: number;
  step: Step;
  unlockedHizbs: number[];
  completedSorats: number[];
  stars: number;
  badges: string[];
}

interface Props {
  progress: Progress;
  onViewHizbs: () => void;
}

export default function StatsView({ progress, onViewHizbs }: Props) {
  const overallProgress = Math.round(
    (progress.completedSorats.length / 114) * 100
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

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
              <div className="px-3 py-1.5 rounded-full text-sm font-black capitalize bg-white/20 text-white">
                {progress.step}
              </div>
            </div>

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
                Aya {progress.currentAya} — {progress.completedSorats.length} sorats completed
              </span>
            </div>
          </div>
        </div>

        {/* Stats card */}
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm flex flex-col justify-between">
          <p className="text-sm font-black text-gray-400 mb-4">Your Stats</p>
          <div className="flex flex-col gap-4">
            <StatRow
              icon={<Star className="w-4 h-4 text-orange-500 fill-orange-500" />}
              label="Stars"
              value={progress.stars}
            />
            <StatRow
              icon={<Trophy className="w-4 h-4 text-orange-500" />}
              label="Badges"
              value={progress.badges.length}
            />
            <StatRow
              icon={<BookOpen className="w-4 h-4 text-orange-500" />}
              label="Sorats"
              value={progress.completedSorats.length}
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Continue learning */}
        <button className="bg-orange-500 text-white rounded-3xl p-6 flex items-center justify-between hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200">
          <div className="text-left">
            <p className="text-white/70 text-sm font-semibold mb-1">
              Continue where you left off
            </p>
            <p className="text-xl font-black">
              Hizb {progress.currentHizb} — Sorat {progress.currentSorat}
            </p>
            <p className="text-white/80 text-sm font-semibold mt-1 capitalize">
              Step: {progress.step}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </button>

        {/* See all hizbs */}
        <button
          onClick={onViewHizbs}
          className="bg-white border-2 border-orange-200 text-gray-900 rounded-3xl p-6 flex items-center justify-between hover:border-orange-400 transition-all hover:-translate-y-0.5 shadow-sm"
        >
          <div className="text-left">
            <p className="text-gray-400 text-sm font-semibold mb-1">
              Explore your journey
            </p>
            <p className="text-xl font-black text-gray-900">All Hizbs</p>
            <p className="text-gray-400 text-sm font-semibold mt-1">
              {progress.unlockedHizbs.length} / 60 unlocked
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-orange-500" />
          </div>
        </button>
      </div>
    </>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-semibold text-gray-600">{label}</span>
      </div>
      <span className="text-xl font-black text-orange-500">{value}</span>
    </div>
  );
}