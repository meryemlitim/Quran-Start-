"use client";
import Navbar from "@/components/Navbar"
import { useState, useEffect } from "react";
import {Search, Users, ChevronDown, ChevronUp } from "lucide-react";
import { adminDashboard } from "@/lib/progress";

async function getAdminDashboard() {
  const res = adminDashboard();
  return res;
}

type SortKey = "parentName" | "childName" | "createdAt";

export default function AdminUsers() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    getAdminDashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filtered = (data?.user ?? [])
    .filter((u: any) => {
      const q = search.toLowerCase();
      return (
        u.childName?.toLowerCase().includes(q) ||
        u.parentName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      );
    })
    .sort((a: any, b: any) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      return sortAsc
        ? av.localeCompare(bv)
        : bv.localeCompare(av);
    });

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  function initials(name: string) {
    return name
      ?.split(" ")
      .map((w: string) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "?";
  }

  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-amber-100 text-amber-600",
    "bg-rose-100 text-rose-600",
    "bg-emerald-100 text-emerald-600",
  ];

  return (
    <main className="min-h-screen bg-orange-50">
      {/* ── HEADER ─────────────────────────────────── */}
               <Navbar/>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* ── PAGE TITLE ─────────────────────────────── */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">
              All <span className="text-orange-500">Users</span>
            </h1>
            <p className="text-gray-400 font-semibold text-sm">
              {data.userNumber} registered families
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-orange-100 bg-white text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        {/* ── TABLE ──────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-orange-50 bg-orange-50/60">
            <ColHeader
              label="Child"
              span={3}
              sortKey="childName"
              active={sortKey}
              asc={sortAsc}
              onSort={toggleSort}
            />
            <ColHeader
              label="Parent"
              span={4}
              sortKey="parentName"
              active={sortKey}
              asc={sortAsc}
              onSort={toggleSort}
            />
            <div className="col-span-3 text-xs font-black text-gray-400 uppercase tracking-wide">
              Email
            </div>
            <ColHeader
              label="Joined"
              span={2}
              sortKey="createdAt"
              active={sortKey}
              asc={sortAsc}
              onSort={toggleSort}
            />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-10 h-10 text-orange-200 mx-auto mb-3" />
              <p className="text-gray-400 font-semibold">No users found</p>
            </div>
          ) : (
            <div className="divide-y divide-orange-50">
              {filtered.map((u: any, i: number) => (
                <div
                  key={u._id}
                  className="grid grid-cols-12 gap-2 px-6 py-4 items-center hover:bg-orange-50/40 transition-colors"
                >
                  {/* Child */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                        colors[i % colors.length]
                      }`}
                    >
                      {initials(u.childName)}
                    </div>
                    <span className="text-sm font-black text-gray-900 truncate">
                      {u.childName}
                    </span>
                  </div>

                  {/* Parent */}
                  <div className="col-span-4 text-sm font-semibold text-gray-600 truncate">
                    {u.parentName}
                  </div>

                  {/* Email */}
                  <div className="col-span-3 text-sm text-gray-400 font-semibold truncate">
                    {u.email}
                  </div>

                  {/* Joined */}
                  <div className="col-span-2 text-xs font-semibold text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER COUNT ───────────────────────────── */}
        <p className="text-xs text-gray-400 font-semibold mt-4 text-center">
          Showing {filtered.length} of {data.userNumber} users
        </p>
      </div>
    </main>
  );
}

function ColHeader({ label, span, sortKey, active, asc, onSort }: any) {
  const isActive = active === sortKey;
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`col-span-${span} flex items-center gap-1 text-xs font-black uppercase tracking-wide text-left transition-colors ${
        isActive ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {label}
      {isActive ? (
        asc ? (
          <ChevronUp className="w-3 h-3" />
        ) : (
          <ChevronDown className="w-3 h-3" />
        )
      ) : null}
    </button>
  );
}

function NavTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-xl text-sm font-black transition-all ${
        active ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}