"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatsView from "@/components/dashboard/StatsView";
import HizbsView from "@/components/dashboard/HizbsView";
import SoratsView from "@/components/dashboard/SoratsView";
import { getMe } from "@/lib/auth";
import { getMyProgress } from "@/lib/progress";
import { getHizbs, getSorats } from "@/lib/quran";

export type View = "stats" | "hizbs" | "sorats";

export default function ChildDashboard() {
  const [view, setView] = useState<View>("stats");
  const [selectedHizb, setSelectedHizb] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [hizbs, setHizbs] = useState<any[]>([]);
  const [sorats, setSorats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [soratsLoading, setSoratsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, progressData, hizbsData] = await Promise.all([
          getMe(),
          getMyProgress(),
          getHizbs(),
        ]);
        setUser(userData);
        setProgress(progressData);
        setHizbs(hizbsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedHizb) return;
    const fetchSorats = async () => {
      setSoratsLoading(true);
      try {
        const data = await getSorats(selectedHizb);
        setSorats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setSoratsLoading(false);
      }
    };
    fetchSorats();
  }, [selectedHizb]);

  if (loading || !progress) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-1">
            Assalamu Alaikum,{" "}
            <span className="text-orange-500">{user?.childName || "Explorer"}</span>!
          </h1>
          <p className="text-gray-500 font-semibold">Ready to learn today? Keep going!</p>
        </div>

        {/* Views */}
        {view === "stats" && (
          <StatsView
            progress={progress}
            onViewHizbs={() => setView("hizbs")}
          />
        )}
        {view === "hizbs" && (
          <HizbsView
            hizbs={hizbs}
            progress={progress}
            onBack={() => setView("stats")}
            onSelectHizb={(hizbId) => {
              setSelectedHizb(hizbId);
              setView("sorats");
            }}
          />
        )}
        {view === "sorats" && (
          <SoratsView
            sorats={sorats}
            progress={progress}
            selectedHizb={selectedHizb!}
            soratsLoading={soratsLoading}
            onBack={() => setView("hizbs")}
          />
        )}
      </div>
    </main>
  );
}