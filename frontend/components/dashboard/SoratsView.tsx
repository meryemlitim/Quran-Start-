"use client";
import { BookOpen, Lock, ChevronRight, CheckCircle, Star, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Progress {
  currentSorat: number;
  step: string;
  unlockedSorats: number[];
  completedSorats: number[];
}

interface Props {
  sorats: any[];
  progress: Progress;
  selectedHizb: number;
  soratsLoading: boolean;
  onBack: () => void;
}

export default function SoratsView({
  sorats,
  progress,
  selectedHizb,
  soratsLoading,
  onBack,
}: Props) {
  const hizbProgress =
    sorats.length > 0
      ? Math.round(
          (sorats.filter((s) => progress.completedSorats.includes(s.number))
            .length /
            sorats.length) *
            100
        )
      : 0;

  const isSoratUnlocked = (n: number) => progress.unlockedSorats.includes(n);
  const isSoratCompleted = (n: number) => progress.completedSorats.includes(n);
    const router = useRouter();

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-orange-500 font-black hover:underline text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Hizbs
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-black">Hizb {selectedHizb}</span>
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

      {/* Sorat list */}
      <div className="flex flex-col gap-3">
        {soratsLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          sorats.map((sorat) => {
            const unlocked = isSoratUnlocked(sorat.number);
            const completed = isSoratCompleted(sorat.number);
            const isCurrent = sorat.number === progress.currentSorat;

            return (
              <div
                key={sorat.number}
onClick={() => unlocked && router.push(`/learning/${sorat.number}/${encodeURIComponent(sorat.name)}`)}
                className={`
                  bg-white rounded-2xl p-5 border-2 flex items-center justify-between transition-all duration-200
                  ${completed
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

                  <div>
                    <p
                      className="text-lg font-black text-gray-900"
                      style={{ fontFamily: "serif" }}
                    >
                      {sorat.name}
                    </p>
                    <p className="text-sm text-gray-500 font-semibold">
                      {sorat.englishName} — {sorat.numberOfAyahs} Ayas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {completed && (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((s) => (
                        <Star key={s} className="w-4 h-4 text-orange-400 fill-orange-400" />
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
          })
        )}
      </div>
    </>
  );
}