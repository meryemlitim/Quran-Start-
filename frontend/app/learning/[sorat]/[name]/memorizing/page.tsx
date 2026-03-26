"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Play,
  Pause,
  CheckCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { getAyats, getAyatAudioUrl } from "@/lib/quran";
import { completeSorah, nextAya, updateStep } from "@/lib/progress";

const REQUIRED_REPEATS = 1;

export default function MemorizingPage() {
  const params = useParams();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  const soratNumber = Number(
    Array.isArray(params.sorat) ? params.sorat[0] : params.sorat,
  );
  const soratName = decodeURIComponent(
    Array.isArray(params.name) ? params.name[0] : (params.name as string),
  );

  const [ayats, setAyats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAyaIndex, setCurrentAyaIndex] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const completedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAyats = async () => {
      try {
        const data = await getAyats(soratNumber);
        setAyats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAyats();
  }, [soratNumber]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    if (completed && completedRef.current) {
      completedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [completed]);

  const currentAya = ayats[currentAyaIndex];
  const previousAya = currentAyaIndex > 0 ? ayats[currentAyaIndex - 1] : null;
  const audioUrl = currentAya
    ? getAyatAudioUrl(soratNumber, currentAyaIndex + 1)
    : "";

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.src = audioUrl;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restartAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = audioUrl;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const handleRepeatClick = async () => {
    if (transitioning) return;

    const newCount = repeatCount + 1;
    setRepeatCount(newCount);

    if (newCount >= REQUIRED_REPEATS) {
      setTransitioning(true);

      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }

      if (currentAyaIndex >= ayats.length - 1) {
        try {
          await completeSorah();
        } catch (err) {
          console.error(err);
        }
        setCompleted(true);
        setTransitioning(false);
        return;
      }

      try {
        await nextAya();
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        setCurrentAyaIndex((prev) => prev + 1);
        setRepeatCount(0);
        setTransitioning(false);
      }, 400);
    }
  };

  const handleContinueToQuiz = () => {
    router.push(`/dashboard`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F0]">
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap"
        rel="stylesheet"
      />

      <audio ref={audioRef} preload="none" />

      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-orange-500 font-black text-sm hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center">
          <p className="text-xs text-orange-500 font-black tracking-widest">
            MEMORIZING MODE
          </p>
          <p className="text-base font-black text-gray-900">{soratName}</p>
        </div>

        <div className="bg-orange-100 text-orange-600 rounded-full px-3 py-1">
          <span className="text-xs font-black">
            Aya {currentAyaIndex + 1} of {ayats.length}
          </span>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-6 pb-10">
        {/* ── MAIN CARD (previous + current aya + audio) ─── */}
        <div className="bg-white rounded-3xl border-2 border-orange-300 shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-orange-500 font-black tracking-widest">
              CURRENT AYA
            </span>
            <div className="bg-orange-100 text-orange-600 rounded-full px-3 py-1 text-xs font-black">
              Aya {currentAyaIndex + 1}
            </div>
          </div>

          <div dir="rtl" className="space-y-4 mb-5">
            {/* All previous ayas — muted, on top */}
            {ayats.slice(0, currentAyaIndex).map((aya, i) => (
              <div key={aya.number} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-black text-orange-400">
                    {i + 1}
                  </span>
                </div>
                <p
                  className="text-xl leading-loose text-right flex-1 text-gray-400"
                  style={{ fontFamily: "'Amiri Quran', serif" }}
                >
                  {aya.text}
                </p>
              </div>
            ))}

            {/* Divider between previous ayas and current */}
            {currentAyaIndex > 0 && (
              <div className="border-t border-orange-100" />
            )}

            {/* Current aya — prominent, at bottom */}
            {currentAya && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-black text-orange-500">
                    {currentAyaIndex + 1}
                  </span>
                </div>
                <p
                  className="text-3xl leading-loose text-right flex-1 text-gray-900"
                  style={{ fontFamily: "'Amiri Quran', serif" }}
                >
                  {currentAya.text}
                </p>
              </div>
            )}
          </div>

          {/* Audio controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-orange-600 transition-all shadow-md shadow-orange-200"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> Listen
                </>
              )}
            </button>

            <button
              onClick={restartAudio}
              className="flex items-center gap-2 bg-orange-50 text-orange-500 border border-orange-200 px-4 py-2.5 rounded-full font-black text-sm hover:bg-orange-100 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Repeat
            </button>
          </div>
        </div>

        {/* ── CIRCULAR REPEAT COUNTER ────────────────────── */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-sm text-gray-400 font-semibold mb-4">
            Tap the circle each time you repeat the aya
          </p>
          <CircularCounter
            count={repeatCount}
            total={REQUIRED_REPEATS}
            onClick={handleRepeatClick}
            disabled={transitioning || completed}
          />
        </div>

        {/* ── COMPLETED CARD ─────────────────────────────── */}
        {completed && (
          <div
            ref={completedRef}
            className="bg-white rounded-3xl p-6 border-2 border-orange-300 shadow-sm text-center"
          >
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Masha'Allah! 
            </h3>
            <p className="text-gray-500 font-semibold mb-6">
              You memorized all {ayats.length} ayas! Ready for the next surah?
            </p>
            <button
              onClick={handleContinueToQuiz}
              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
            >
              Back to surah list
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

// ── Circular Counter ──────────────────────────────────────
function CircularCounter({
  count,
  total,
  onClick,
  disabled,
}: {
  count: number;
  total: number;
  onClick: () => void;
  disabled?: boolean;
}) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (count / total) * circumference;
  const done = count >= total;

  return (
    <button
      onClick={onClick}
      disabled={disabled || done}
      className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
    >
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#FFE4CC"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={done ? "#22c55e" : "#F97316"}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <CheckCircle className="w-9 h-9 text-green-500" />
          ) : (
            <>
              <span className="text-3xl font-black text-orange-500 leading-none">
                {count}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                of {total}
              </span>
            </>
          )}
        </div>
      </div>
      <span
        className={`text-sm font-black transition-colors ${
          done
            ? "text-green-500"
            : disabled
              ? "text-gray-300"
              : "text-gray-500 group-hover:text-orange-500"
        }`}
      >
        {done ? "Moving to next aya..." : "Tap each time you repeat"}
      </span>
    </button>
  );
}
