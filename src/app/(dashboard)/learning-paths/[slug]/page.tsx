"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { BookOpen, Search, Zap, Clock, ChevronRight, LayoutGrid, List, Terminal, Code, ArrowLeft, Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  Terminal: Terminal,
  Code: Code,
  Bot: Bot,
  Sparkles: Sparkles,
};

export default function LearningPathDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const path = useQuery(api.learningPaths.getPathBySlug, { slug: slug as string });
  const modules = useQuery(api.learningPaths.getModulesByPath, path ? { pathId: path._id } : "skip");

  const Icon = path ? (iconMap[path.icon] || BookOpen) : BookOpen;

  return (
    <div className="space-y-12 pb-24">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm tracking-widest uppercase mb-4"
      >
        <ArrowLeft size={16} /> Back to Paths
      </button>

      {!path ? (
        <div className="space-y-4">
           <div className="h-10 w-64 bg-sidebar/50 animate-pulse rounded-lg" />
           <div className="h-6 w-full max-w-2xl bg-sidebar/50 animate-pulse rounded-lg" />
        </div>
      ) : (
        <div className="relative group p-8 rounded-[40px] bg-sidebar border border-border overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150">
             <Icon size={300} />
          </div>
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
              <Icon size={32} />
            </div>
            <h1 className="text-5xl font-black text-foreground">{path.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">{path.description}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-foreground px-2">Path Modules</h2>
        
        {!modules ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1,2,3].map(i => (
               <div key={i} className="h-64 bg-sidebar/50 animate-pulse rounded-3xl border border-border" />
             ))}
          </div>
        ) : modules.length === 0 ? (
          <div className="text-center py-24 bg-sidebar border border-dashed border-border rounded-3xl">
             <Zap size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
             <p className="text-muted-foreground font-medium">No modules found in this path yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module: any) => (
              <Link 
                key={module._id} 
                href={`/lessons/${module.slug}`}
                className="group relative bg-sidebar border border-border rounded-3xl p-6 hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
                    <BookOpen size={80} />
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={cn(
                         "text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                         module.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                         module.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                       )}>
                         {module.difficulty}
                       </span>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 opacity-60">
                         <Clock size={10} /> {module.duration}
                       </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">{module.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-medium">
                      {module.description}
                    </p>
                    
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                       <div className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Start Learning <ChevronRight size={14} />
                       </div>
                    </div>
                 </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
