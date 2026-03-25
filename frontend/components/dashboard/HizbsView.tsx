"use client";
import { BookOpen, Lock, ChevronLeft } from "lucide-react";

interface Progress {
  currentHizb: number;
  unlockedHizbs: number[];
}

interface Props {
  hizbs: any[];
  progress: Progress;
  onBack: () => void;
  onSelectHizb: (hizbId: number) => void;
}

export default function HizbsView({ hizbs, progress, onBack, onSelectHizb }: Props) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-orange-500 font-black hover:underline text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-gray-300">/</span>
          <h2 className="text-xl font-black text-gray-900">All Hizbs</h2>
        </div>
        <span className="text-sm text-gray-400 font-semibold">
          {progress.unlockedHizbs.length} / 60 unlocked
        </span>
      </div>

      {/* Hizb grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {hizbs.map((hizb) => {
          const unlocked = progress.unlockedHizbs.includes(hizb.hizb);
          const isCurrent = hizb.hizb === progress.currentHizb;

          return (
            <button
              key={hizb.hizb}
              disabled={!unlocked}
              onClick={() => unlocked && onSelectHizb(hizb.hizb)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center gap-1
                transition-all duration-200 border-2
                ${unlocked
                  ? isCurrent
                    ? "bg-white border-orange-400 text-orange-500 shadow-lg shadow-orange-100 hover:-translate-y-0.5"
                    : "bg-white border-orange-200 text-orange-500 hover:border-orange-400 hover:-translate-y-0.5"
                  : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                }
              `}
            >
              {unlocked ? (
                <BookOpen className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span className="text-xs font-black">{hizb.hizb}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}