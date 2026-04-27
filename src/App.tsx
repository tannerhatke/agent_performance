/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  Target, 
  Zap, 
  Trophy, 
  Share2, 
  Star, 
  PhoneCall, 
  ShieldCheck,
  ChevronRight,
  LayoutDashboard,
  Award,
  Bell,
  Search,
  Settings,
  Flame,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { getAgentInsights } from './services/geminiService';

// --- Mock Data Generator ---
const GENERATED_CHART_DATA = Array.from({ length: 12 }, (_, i) => ({
  time: `${i + 8}:00`,
  csat: Math.floor(Math.random() * 15) + 80,
  aht: Math.floor(Math.random() * 50) + 280,
}));

const INITIAL_KUDOS = [
  { id: '1', from: 'Sarah J.', message: 'Amazing handling of that complex refund case! 🚀', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '2', from: 'Mike T.', message: 'Tanner is a literal knowledge base. Thanks for the help!', avatar: 'https://i.pravatar.cc/150?u=mike' },
  { id: '3', from: 'Elena V.', message: 'Great vibes on the floor today, Tanner!', avatar: 'https://i.pravatar.cc/150?u=elena' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Elena V.', score: 98 },
  { rank: 2, name: 'Tanner Hatke', score: 96, isSelf: true },
  { rank: 3, name: 'Sarah J.', score: 92 },
  { rank: 4, name: 'Marcus L.', score: 89 },
  { rank: 5, name: 'Jessica K.', score: 87 },
];

// --- Components ---

const StatCard = ({ label, value, unit, goal, trend, icon: Icon, colorClass = "border-cyan-500" }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl relative overflow-hidden backdrop-blur-sm border-l-2"
    style={{ borderLeftColor: colorClass.includes('emerald') ? '#10b981' : colorClass.includes('amber') ? '#f59e0b' : '#06b6d4' }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-950/50 rounded-xl">
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      {trend === 'up' ? (
        <span className="text-cyan-400 text-[10px] font-mono font-bold tracking-tighter flex items-center bg-cyan-400/10 px-2 py-1 rounded-full">
          <ArrowUpRight className="w-3 h-3 mr-1" /> +2.4%
        </span>
      ) : (
        <span className="text-rose-400 text-[10px] font-mono font-bold tracking-tighter flex items-center bg-rose-400/10 px-2 py-1 rounded-full">
          <ArrowDownRight className="w-3 h-3 mr-1" /> -1.2%
        </span>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{label}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-3xl font-bold text-white tracking-tight leading-none">{value}</h3>
        <span className="text-slate-500 text-sm font-mono">{unit}</span>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
      <div className="flex-1 mr-4">
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(Number(value) / goal) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.4)] rounded-full"
          />
        </div>
      </div>
      <span className="text-slate-500 text-[10px] font-mono whitespace-nowrap uppercase tracking-tighter">Target: {goal}{unit}</span>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [insights, setInsights] = useState<string[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [kudos, setKudos] = useState(INITIAL_KUDOS);

  useEffect(() => {
    async function loadInsights() {
      const data = await getAgentInsights({
        csat: 96,
        aht: 312,
        fcr: 88,
        quality: 94
      });
      setInsights(data);
      setLoadingInsights(false);
    }
    loadInsights();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Main Content Area */}
      <main className="min-h-screen">
        {/* Top Header - Immersive UI Style */}
        <header className="h-24 border-b border-slate-700/50 px-10 flex items-center justify-between sticky top-0 bg-slate-900/50 backdrop-blur-md z-40 m-4 rounded-2xl border">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <Zap className="w-6 h-6 text-white fill-white shadow-glow" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Tanner Hatke</h1>
              <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]"></span>
                Level 14 • Elite Guardian
              </p>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="text-center hidden md:block">
              <div className="text-[10px] text-slate-400 uppercase tracking-tighter mb-1 font-bold">Shift Duration</div>
              <div className="text-xl font-mono text-cyan-400 tabular-nums">06:42:15</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-slate-400 uppercase tracking-tighter mb-1 font-bold">Today's XP</div>
              <div className="text-xl font-mono text-amber-400 text-shadow-glow">2,450 XP</div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div className="h-full w-[85%] bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">85% To Rank 15</span>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Main Performance Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Stats */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-bold tracking-tighter text-white mb-2">Live Performance.</h2>
                  <p className="text-slate-400 text-sm font-medium tracking-tight">Mission efficiency is at record highs today.</p>
                </div>
                <div className="flex gap-2 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
                  {['24H', '7D', '30D'].map(t => (
                    <button key={t} className={cn(
                      "px-5 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all",
                      t === '24H' ? "bg-cyan-600 text-white shadow-glow" : "text-slate-500 hover:text-slate-300"
                    )}>{t}</button>
                  ))}
                </div>
              </div>

              {/* KPI Matrix - Immersive Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard icon={Star} label="CSAT Score" value={4.92} unit="/5" goal={5} trend="up" />
                <StatCard icon={Clock} label="Avg Handle Time" value="4m 12s" unit="" goal={320} trend="down" colorClass="border-amber-500" />
                <StatCard icon={ShieldCheck} label="Resolution Rate" value={94.2} unit="%" goal={95} trend="up" colorClass="border-emerald-500" />
                <StatCard icon={TrendingUp} label="Core Quality" value={98} unit="%" goal={100} trend="neutral" />
              </div>

              {/* Mission Progress: Quotas View */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden flex flex-col shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] min-h-[360px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
                <h2 className="text-xs font-bold text-slate-400 uppercase mb-12 text-center tracking-widest mt-2">Active Mission Quotas</h2>
                
                <div className="flex-grow flex flex-col md:flex-row items-center justify-around gap-12">
                  <CircularProgress value={75} label="RESOLVED" color="#06b6d4" />
                  <CircularProgress value={20} label="UPSELLS" color="#10b981" />
                  
                  <div className="grid grid-cols-1 gap-6 w-full md:w-64">
                    <div className="text-center border-t border-slate-800 pt-6 font-mono">
                      <div className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">NEXT MILESTONE</div>
                      <div className="text-cyan-400 font-bold uppercase tracking-tight">10 Success Streaks</div>
                    </div>
                    <div className="text-center border-t border-slate-800 pt-6 font-mono">
                      <div className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">XP REWARD</div>
                      <div className="text-amber-400 font-bold text-shadow-glow uppercase tracking-tight">+500 Bonus gold</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Insights & Social */}
            <div className="lg:col-span-4 space-y-6">
              {/* Actionable Insights Panel */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                <h2 className="text-[10px] font-bold text-slate-400 uppercase mb-6 tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]"></span>
                  Tactical Insights
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-xs leading-relaxed text-blue-300">
                      Homeowners in <b className="text-white">high-risk zones</b> are inquiring about policy renewals. Emphasize fire-safety bundles for a 15% discount.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="text-xs leading-relaxed text-amber-300">
                      Life insurance apps for <b className="text-white">young professionals</b> have spiked. Pivot to Term-Life benefits for families to increase conversion.
                    </p>
                  </div>
                  <button className="w-full mt-2 py-3 bg-slate-950/50 hover:bg-slate-950 border border-slate-700/50 text-slate-400 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all">
                    View Full Analysis
                  </button>
                </div>
              </div>

              {/* Peer Kudos Widget */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase">Peer Recognition</h3>
                  <span className="text-[10px] text-emerald-400 font-bold font-mono">+3 NEW</span>
                </div>
                
                <div className="space-y-4">
                  {kudos.slice(0, 2).map((k) => (
                    <div key={k.id} className="bg-slate-950/80 border border-slate-700/50 p-3 rounded-xl flex items-center gap-4 group cursor-default hover:bg-slate-950 transition-colors">
                      <div className="w-10 h-10 rounded-full border border-slate-600 p-0.5 overflow-hidden">
                        <img src={k.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">{k.from} sent <span className="text-amber-400 italic">Core Hero</span></div>
                        <div className="text-[10px] text-slate-500 italic leading-tight mt-1 line-clamp-1">"{k.message}"</div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2.5 text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:underline transition-all">
                    Open Social Feed
                  </button>
                </div>
              </div>

              {/* Squad Leaderboard Widget */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-6 tracking-widest text-center">Squad Leaderboard</h3>
                <div className="space-y-3">
                  {LEADERBOARD.map((entry) => (
                    <div 
                      key={entry.rank} 
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border transition-all",
                        entry.isSelf 
                          ? "bg-cyan-600/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                          : "bg-slate-800/40 border-slate-700/30"
                      )}
                    >
                      <span className={cn(
                        "w-5 text-center font-bold font-mono text-sm italic shrink-0",
                        entry.rank === 1 ? "text-amber-500" : entry.rank === 2 ? "text-slate-400" : "text-slate-600"
                      )}>{entry.rank.toString().padStart(2, '0')}</span>
                      <div className={cn(
                        "w-7 h-7 rounded-full shrink-0",
                        entry.isSelf ? "bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-[8px] font-bold" : "bg-slate-700"
                      )}>
                        {entry.isSelf && "TH"}
                      </div>
                      <div className={cn("flex-grow text-xs font-semibold truncate", entry.isSelf ? "text-white" : "text-slate-300")}>{entry.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 font-bold">{(entry.score/10).toFixed(1)}k</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                  <div className="text-[9px] text-slate-500 tracking-widest uppercase mb-1 font-bold">CURRENT STREAK</div>
                  <div className="text-2xl font-bold text-emerald-400 shadow-glow">5 🔥</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

function CircularProgress({ value, label, color }: { value: number, label: string, color: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
        <motion.circle 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          cx="80" cy="80" r={radius} stroke={color} strokeWidth="8" fill="transparent" 
          strokeDasharray={circumference} className="shadow-glow"
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white tabular-nums">{value}%</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

