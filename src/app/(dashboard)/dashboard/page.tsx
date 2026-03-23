"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { 
  ArrowRight, 
  BookOpen, 
  FlaskConical, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Play, 
  BarChart3,
  Bot,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardHomePage() {
  const paths = useQuery(api.learningPaths.listPaths);
  const lessons = useQuery(api.content.listLessons);

  // Simple logic to find an "in progress" lesson or just the first one
  const currentLesson = lessons?.[0];

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Welcome back, Master! 👋</h1>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl">
          You're currently <span className="text-primary font-bold">Level 4</span>. Complete 3 more lessons to unlock the <span className="text-amber-500 font-bold">"Prompt Architect"</span> badge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-12">
          {currentLesson && (
            <div className="bg-sidebar p-8 border border-border rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
                  <Sparkles size={120} className="text-primary" />
              </div>
              <div className="relative z-10 space-y-6">
                 <h2 className="text-2xl font-black flex items-center gap-2">
                   <Play className="fill-primary text-primary" size={24} />
                   Continue Learning
                 </h2>
                 <div className="p-8 bg-background/50 backdrop-blur-sm rounded-3xl border border-border shadow-inner group hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-muted-foreground uppercase opacity-80 tracking-widest">In Progress</span>
                      <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full tracking-widest uppercase">Chapter 1</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{currentLesson.title}</h3>
                    <p className="text-sm text-muted-foreground mb-8 max-w-md font-medium leading-relaxed">{currentLesson.description}</p>
                    <div className="w-full bg-muted h-2.5 rounded-full mb-10 overflow-hidden p-0.5">
                       <div className="w-[45%] h-full bg-primary rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)] animate-pulse" />
                    </div>
                    <Link href={`/lessons/${currentLesson.slug}`} className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all active:scale-95 group/btn">
                      Continue Lesson <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                 </div>
              </div>
            </div>
          )}

          <div className="space-y-8">
             <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <BookOpen size={28} className="text-primary" />
                  Learning Paths
                </h2>
                <Link href="/learning-paths" className="text-xs font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1 group">
                   View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
             
             {!paths ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {[1,2].map(i => <div key={i} className="h-48 bg-sidebar/50 animate-pulse rounded-3xl border border-border" />)}
                </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {paths.map((path: any) => (
                     <Link key={path._id} href={`/learning-paths/${path.slug}`} className="p-8 bg-sidebar border border-border rounded-[2rem] flex flex-col justify-between hover:border-primary/50 hover:shadow-2xl transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110">
                           <BookOpen size={80} />
                        </div>
                        <div className="relative z-10">
                           <h4 className="text-xl font-extrabold group-hover:text-primary transition-colors mb-3 leading-tight">{path.title}</h4>
                           <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">{path.description}</p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform relative z-10">
                           Explore Path <ArrowRight size={14} />
                        </div>
                     </Link>
                   ))}
                </div>
             )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-10 bg-primary border border-white/10 rounded-[2.5rem] text-primary-foreground shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                   <Zap size={32} className="fill-white" />
                </div>
                <h3 className="text-2xl font-black leading-tight">Daily Prompt Challenge</h3>
                <p className="text-sm opacity-90 font-medium leading-relaxed italic border-l-2 border-white/30 pl-4 py-1">"Write a prompt that generates a regex pattern for parsing complex date formats while explaining its logic."</p>
                <Link href="/playground" className="block w-full py-5 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-widest text-center hover:shadow-2xl transition-all active:scale-95 hover:-translate-y-1">
                   Take Challenge
                </Link>
             </div>
          </div>

          <div className="bg-sidebar border border-border rounded-[2.5rem] p-8 space-y-8">
             <h3 className="text-xl font-bold flex items-center gap-3">
                <BarChart3 size={24} className="text-primary" />
                Daily Insights
             </h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border/50">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                         <CheckCircle2 size={20} className="text-green-500" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lessons Done</span>
                   </div>
                   <span className="text-xl font-black text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border/50">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                         <Bot size={20} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Avg. Usage</span>
                   </div>
                   <span className="text-xl font-black text-foreground">22m</span>
                </div>
             </div>
             <div className="pt-6 border-t border-border/50">
                <p className="text-[10px] text-muted-foreground text-center font-bold tracking-widest uppercase opacity-60">Master Rank: Apprentice III</p>
                <div className="mt-3 w-full bg-muted h-1.5 rounded-full overflow-hidden">
                   <div className="w-[75%] h-full bg-amber-500" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
