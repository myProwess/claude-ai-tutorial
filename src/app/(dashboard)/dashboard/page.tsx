"use client";

import { 
  ArrowRight, 
  BookOpen, 
  FlaskConical, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Play, 
  BarChart3,
  Bot
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const RECOMMENDED_MODULES = [
  { id: "bas", title: "Basics of Claude", description: "Learn how to communicate effectively with the model.", time: "45 mins", difficulty: "Easy" },
  { id: "xml", title: "XML Tagging", description: "Master structured inputs for consistent results.", time: "1 hr", difficulty: "Medium" },
  { id: "cot", title: "Chain of Thought", description: "Unlocking logical reasoning with XML reasoning blocks.", time: "1.5 hrs", difficulty: "Hard" },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Welcome back, Master! 👋</h1>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl">
          You're currently <span className="text-primary font-bold">Level 4</span>. Complete 3 more lessons to unlock the <span className="text-amber-500 font-bold">"Prompt Architect"</span> badge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-sidebar p-8 border border-border rounded-3xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
                <Sparkles size={120} className="text-primary" />
            </div>
            <div className="relative z-10 space-y-6">
               <h2 className="text-2xl font-black flex items-center gap-2">
                 <Play className="fill-primary text-primary" size={24} />
                 Continue Learning
               </h2>
               <div className="p-6 bg-background rounded-2xl border border-border shadow-inner group hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase opacity-80">Module 4 of 12</span>
                    <span className="text-xs font-black text-primary px-2 py-1 bg-primary/10 rounded-full">IN PROGRESS</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Techniques for Long-Context Windows</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-md">Learn how to use "Context Caching" and selective attention to manage massive documents effectively.</p>
                  <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
                     <div className="w-[45%] h-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                  </div>
                  <Link href="/lessons/4" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">
                    Continue Lesson <ArrowRight size={16} />
                  </Link>
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <h2 className="text-xl font-bold flex items-center gap-2">
               <BookOpen size={24} className="text-primary" />
               Recommended for You
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RECOMMENDED_MODULES.map((module) => (
                  <div key={module.id} className="p-6 bg-sidebar border border-border rounded-2xl flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all group">
                     <div>
                        <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest opacity-60">
                           <span>{module.time}</span>
                           <span className={cn(
                             module.difficulty === "Easy" ? "text-green-500" :
                             module.difficulty === "Medium" ? "text-amber-500" : "text-red-500"
                           )}>{module.difficulty}</span>
                        </div>
                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{module.title}</h4>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{module.description}</p>
                     </div>
                     <button className="mt-4 flex items-center gap-1 text-xs font-black text-primary uppercase group-hover:translate-x-1 transition-transform">
                        Start Module <ArrowRight size={12} />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-primary border-2 border-primary/20 rounded-3xl text-primary-foreground shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-1000" />
             <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                   <Zap size={24} className="fill-white" />
                </div>
                <h3 className="text-xl font-black">Daily Prompt Challenge</h3>
                <p className="text-xs opacity-90 font-medium leading-relaxed italic">"Write a prompt that generates a regex pattern for parsing complex date formats while explaining its logic."</p>
                <Link href="/playground" className="block w-full py-3 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest text-center hover:shadow-xl transition-all active:scale-95">
                   Take Challenge
                </Link>
             </div>
          </div>

          <div className="bg-sidebar border border-border rounded-3xl p-6 space-y-6">
             <h3 className="text-lg font-bold flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Daily Insights
             </h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border/50">
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span className="text-xs font-semibold">Lessons Completed</span>
                   </div>
                   <span className="text-sm font-bold text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border/50">
                   <div className="flex items-center gap-3">
                      <Bot size={16} className="text-primary" />
                      <span className="text-xs font-semibold">Avg. Assistant Usage</span>
                   </div>
                   <span className="text-sm font-bold text-foreground">22m</span>
                </div>
             </div>
             <p className="text-[10px] text-muted-foreground text-center font-medium opacity-60">You are in the top 5% of users this week!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
