"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Calendar,
  Activity,
  Award,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const { user } = useUser();
  const userData = useQuery(api.hub.getMe);
  const practiceHistory = useQuery(api.hub.listPractice, { userId: user?.id ?? "" });

  const stats = [
    { label: "Lessons Completed", value: "0 / 18", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Time Spent", value: "0 hrs", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Prompts Tested", value: practiceHistory?.length.toString() || "0", icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Avg. Prompt Score", value: practiceHistory?.length ? (practiceHistory.reduce((acc: number, curr: any) => acc + curr.score, 0) / practiceHistory.length).toFixed(1) : "0", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const RECENT_ACTIVITY = [
    { id: "1", type: "Chat", action: "Asked about XML tagging", time: "2 hours ago", status: "completed" },
    { id: "2", type: "Practice", action: "Submitted JSON Extraction prompt", time: "4 hours ago", status: "8.5/10" },
    { id: "3", type: "Lesson", action: "Finished 'Basics of Prompting'", time: "Yesterday", status: "completed" },
    { id: "4", type: "Chat", action: "Debugged a Python script", time: "Yesterday", status: "completed" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Personal Analytics</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Track your journey to becoming a Claude Master. Analyze your performance across all modules and practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-sidebar border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group pointer-events-none">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-sidebar border border-border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <TrendingUp size={24} className="text-primary" />
                Skill Progression
              </h2>
              <div className="flex gap-2">
                 <button className="px-3 py-1 text-xs font-bold rounded-lg bg-primary text-primary-foreground">Last 7 Days</button>
                 <button className="px-3 py-1 text-xs font-bold rounded-lg hover:bg-muted text-muted-foreground">Last 30 Days</button>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {[60, 45, 80, 55, 90, 70, 85].map((height, i) => (
                <div key={i} className="flex-1 group relative">
                  <div 
                    className="w-full bg-primary/20 rounded-t-xl group-hover:bg-primary/40 transition-all duration-500 ease-out relative"
                    style={{ height: `${height}%` }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-t-xl transition-all duration-700 ease-out delay-75 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                      style={{ height: `${height * 0.7}%` }}
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                       Score: {(height / 10).toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-4 text-center text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                    Day {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-sidebar border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <Activity size={24} className="text-primary" />
              Activity Heatmap
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square rounded-md border border-border hover:border-primary transition-colors cursor-pointer",
                    Math.random() > 0.5 ? "bg-primary/20" : "bg-muted/50",
                    Math.random() > 0.8 ? "bg-primary/60" : ""
                  )} 
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] text-muted-foreground font-bold tracking-widest uppercase opacity-60">
               <span>Last Month</span>
               <div className="flex items-center gap-2">
                 <span>Less</span>
                 <div className="flex gap-1">
                   <div className="w-2 h-2 rounded bg-muted/50" />
                   <div className="w-2 h-2 rounded bg-primary/20" />
                   <div className="w-2 h-2 rounded bg-primary/60" />
                   <div className="w-2 h-2 rounded bg-primary" />
                 </div>
                 <span>More</span>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-sidebar border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-foreground">
              <Clock size={20} className="text-primary" />
              Recent Activity
            </h2>
            <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity, idx) => (
                <div key={activity.id} className="relative pl-6 group">
                   {idx !== RECENT_ACTIVITY.length - 1 && (
                     <div className="absolute left-1.5 top-6 bottom-[-24px] w-px bg-border group-hover:bg-primary/30 transition-colors" />
                   )}
                   <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background z-10 scale-100 group-hover:scale-125 group-hover:bg-primary transition-all" />
                   <div className="space-y-1">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-bold text-muted-foreground uppercase">{activity.type}</span>
                         <span className="text-[10px] font-medium text-muted-foreground opacity-60">{activity.time}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{activity.action}</p>
                      <span className={cn(
                        "inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                        activity.status === "completed" ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary"
                      )}>
                        {activity.status}
                      </span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary border border-primary/20 rounded-2xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
            <div className="relative z-10 space-y-4">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Mastery Badge</p>
                 <h3 className="text-2xl font-black">Level 4 Architect</h3>
               </div>
               <p className="text-xs opacity-80 font-medium leading-relaxed">
                 You've mastered the basics and are now using recursive prompt techniques. 120 more points to Level 5.
               </p>
               <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
               </div>
               <button className="w-full py-3 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg active:scale-95">
                  View Achievements
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
