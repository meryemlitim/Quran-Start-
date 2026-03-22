import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-8 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black">
                Quran <span className="text-orange-500">Start</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed font-semibold">
              Helping children discover the beauty of the Quran, one aya at a
              time.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div>
              <div className="text-sm font-black mb-4">Product</div>
              {["Features", "How it works", "Preview"].map((l) => (
                <div key={l} className="mb-3">
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors font-semibold"
                  >
                    {l}
                  </a>
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-black mb-4">Account</div>
              {["Login", "Register", "Parent Space"].map((l) => (
                <div key={l} className="mb-3">
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors font-semibold"
                  >
                    {l}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500 font-semibold">
            © 2026 Quran Start. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
