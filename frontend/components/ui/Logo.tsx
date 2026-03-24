import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-black text-gray-900">
        Quran <span className="text-orange-500">Start</span>
      </span>
    </div>
  );
}