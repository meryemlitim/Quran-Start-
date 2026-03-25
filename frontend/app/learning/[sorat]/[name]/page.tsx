"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeft,
    Play,
    Pause,
    RotateCcw,
    SkipBack,
    SkipForward,
    ArrowRight,
    CheckCircle,
    Volume2,
} from "lucide-react";
import { getAyats, getAudioUrl } from "@/lib/quran";
import { updateStep } from "@/lib/progress";

const REQUIRED_LISTENS = 5;

export default function ReadingPage() {
    const params = useParams();
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement>(null);

    const [ayats, setAyats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [listenCount, setListenCount] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
    const [completed, setCompleted] = useState(false);

const soratNumber = Number(Array.isArray(params.sorat) ? params.sorat[0] : params.sorat);
const soratName = decodeURIComponent(Array.isArray(params.name) ? params.name[0] : params.name as string);    const audioUrl = getAudioUrl(soratNumber);
    const completedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
  if (completed && completedRef.current) {
    completedRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}, [completed]);
    // Fetch ayats
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

    // Audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            // Highlight current ayat based on time
            if (duration > 0 && ayats.length > 0) {
                const ayatDuration = duration / ayats.length;
                const index = Math.min(
                    Math.floor(audio.currentTime / ayatDuration),
                    ayats.length - 1
                );
                setCurrentAyatIndex(index);
            }
        };

        const onDurationChange = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        const onEnded = () => {
            setIsPlaying(false);
            setCurrentAyatIndex(0);
            const newCount = listenCount + 1;
            setListenCount(newCount);
            if (newCount >= REQUIRED_LISTENS) setCompleted(true);
        };

        const onCanPlay = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("durationchange", onDurationChange);
        audio.addEventListener("canplay", onCanPlay);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("durationchange", onDurationChange);
            audio.removeEventListener("canplay", onCanPlay);
            audio.removeEventListener("ended", onEnded);
        };
    }, [listenCount, duration, ayats.length]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const restart = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
    };

    const skip = (seconds: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
    };

    const formatTime = (s: number) => {
        if (!s || isNaN(s)) return "0:00";
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * duration;
    };

    // Manual counter click
    const handleCounterClick = () => {
        if (listenCount >= REQUIRED_LISTENS) return;
        const newCount = listenCount + 1;
        setListenCount(newCount);
        if (newCount >= REQUIRED_LISTENS) setCompleted(true);
    };

    const handleContinue = async () => {
        try {
            await updateStep("memorizing");
        } catch (err) {
            console.error(err);
        }
        router.push(`/learning/${soratNumber}/${soratName}/memorizing`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <main className="min-h-screen bg-[#FAF6F0]">
            {/* Load Quran font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap"
                rel="stylesheet"
            />

            <audio
                ref={audioRef}
                src={audioUrl}
                preload="auto"
                onError={() => console.error("Audio failed to load:", audioUrl)}
            />

            {/* HEADER */}
            <div className="bg-white border-b border-orange-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-orange-500 font-black text-sm hover:underline"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>
                <div className="text-center">
                    <p className="text-xs text-orange-500 font-black tracking-widest">
                        LESSON 1: THE READING
                    </p>
                    <p className="text-2xl font-black text-gray-900"
                                    style={{ fontFamily: "'Amiri Quran', serif" }}
                    >
                        {soratName}
                    </p>
                </div>
                <div className="w-16" />
            </div>

            {/* LISTEN COUNTER BAR */}
            <div className="flex justify-center pt-6 pb-2">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-orange-100">
                    <span className="text-xs font-black text-orange-500 tracking-widest">
                        LISTEN {listenCount} OF {REQUIRED_LISTENS} TIMES
                    </span>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                </div>
            </div>

            {/* PROGRESS BAR (thin top bar like in pic) */}
            {/* <div className="mx-6 mt-2 mb-4">
                <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-100"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div> */}

            <div className="max-w-xl mx-auto px-6 pb-36">

                {/* AYAT TEXT CARD */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 mb-6">
                    <div dir="rtl" className="space-y-4">
                        {ayats.map((ayat, i) => (
                            <div
                                key={ayat.number}
                                className={`flex items-start gap-3 p-3 rounded-2xl transition-all duration-300 ${i === currentAyatIndex && isPlaying
                                        ? "bg-orange-100"
                                        : "bg-transparent"
                                    }`}
                            >
                                {/* Aya number circle */}
                                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                  ${i === currentAyatIndex && isPlaying
                                        ? "border-orange-400 bg-orange-400"
                                        : "border-gray-200 bg-transparent"
                                    }
                `}>
                                    <span className={`text-xs font-black ${i === currentAyatIndex && isPlaying ? "text-white" : "text-gray-400"
                                        }`}>
                                        {i + 1}
                                    </span>
                                </div>

                                {/* Aya text */}
                                <p
                                    className={`text-2xl leading-loose text-right flex-1 transition-all duration-300 ${i === currentAyatIndex && isPlaying
                                            ? "text-gray-900"
                                            : "text-gray-700"
                                        }`}
                                    style={{ fontFamily: "'Amiri Quran', serif" }}
                                >
                                    {ayat.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CIRCULAR COUNTER */}
                {/* <div className="flex justify-center mb-6">
                    <CircularCounter
                        count={listenCount}
                        total={REQUIRED_LISTENS}
                        onClick={handleCounterClick}
                    />
                </div> */}

                {/* AUDIO PLAYER CARD */}
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-orange-100 shadow-lg px-6 py-4">
  <div className="max-w-xl mx-auto">

    {/* Reciter info */}
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="text-sm font-black text-gray-900">Mishary Rashid Alafasy</p>
        <p className="text-xs text-gray-400 font-semibold">
          Verse {currentAyatIndex + 1} · Recitation
        </p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
        <Volume2 className="w-4 h-4 text-orange-500" />
      </div>
    </div>

    {/* Progress bar — short and clean */}
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs text-gray-400 font-semibold w-8 text-right">
        {formatTime(currentTime)}
      </span>
      <div
        className="flex-1 h-1.5 bg-orange-100 rounded-full cursor-pointer overflow-hidden"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 font-semibold w-8">
        {formatTime(duration)}
      </span>
    </div>

    {/* Controls */}
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={() => skip(-10)}
        className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-orange-50 transition-colors"
      >
        <SkipBack className="w-5 h-5 text-gray-400" />
      </button>

      <button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white fill-white" />
        )}
      </button>

      <button
        onClick={() => skip(10)}
        className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-orange-50 transition-colors"
      >
        <SkipForward className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  </div>
</div>

                {/* COMPLETED */}
                {completed && (
                    <div 
                    ref={completedRef}  
                    className="bg-white rounded-3xl p-6 border-2 border-orange-300 shadow-sm text-center mb-10">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                            Masha'Allah!
                        </h3>
                        <p className="text-gray-500 font-semibold mb-6">
                            You listened {REQUIRED_LISTENS} times! Ready to memorize?
                        </p>
                        <button
                            onClick={handleContinue}
                            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                        >
                            Continue to Memorizing
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

// ── Circular counter ──────────────────────────────────────
function CircularCounter({
    count,
    total,
    onClick,
}: {
    count: number;
    total: number;
    onClick: () => void;
}) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (count / total) * circumference;
    const done = count >= total;

    return (
        <button
            onClick={onClick}
            disabled={done}
            className="flex flex-col items-center gap-2 group"
        >
            <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                    {/* Background */}
                    <circle
                        cx="50" cy="50" r={radius}
                        fill="none"
                        stroke="#FFE4CC"
                        strokeWidth="8"
                    />
                    {/* Progress */}
                    <circle
                        cx="50" cy="50" r={radius}
                        fill="none"
                        stroke={done ? "#22c55e" : "#F97316"}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {done ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                        <>
                            <span className="text-2xl font-black text-orange-500 leading-none">
                                {count}
                            </span>
                            <span className="text-xs text-gray-400 font-semibold">
                                of {total}
                            </span>
                        </>
                    )}
                </div>
            </div>
            <span className={`text-sm font-black ${done ? "text-green-500" : "text-gray-500 group-hover:text-orange-500"} transition-colors`}>
                {done ? "Completed!" : "Tap to count"}
            </span>
        </button>
    );
}