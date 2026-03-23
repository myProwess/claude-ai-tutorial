"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { 
  ChevronLeft, 
  ArrowRight, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Bot
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function LessonDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = useQuery(api.content.getLessonBySlug, { slug });

  if (lesson === undefined) {
    return (
      <div className="flex items-center justify-center py-48">
        <Zap size={48} className="animate-pulse text-primary opacity-20" />
      </div>
    );
  }

  if (lesson === null) {
    return (
      <div className="text-center py-48">
        <h1 className="text-2xl font-bold">Lesson not found.</h1>
        <Link href="/lessons" className="text-primary hover:underline mt-4 inline-block">Back to curriculum</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      <Link href="/lessons" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Curriculum
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
           <header className="space-y-6">
              <div className="flex items-center gap-3">
                 <span className={cn(
                   "text-xs px-2.5 py-1 rounded-full font-black uppercase tracking-widest",
                   lesson.difficulty === "Easy" ? "bg-green-500/10 text-green-500 border border-green-500/20" :
                   lesson.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                 )}>
                   {lesson.difficulty}
                 </span>
                 <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 opacity-60">
                   <Clock size={12} /> {lesson.duration}
                 </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">{lesson.title}</h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                 {lesson.description}
              </p>
           </header>

            <div className="bg-sidebar/50 border border-border rounded-3xl p-8 shadow-sm overflow-hidden">
               <div className="flex items-center gap-2 mb-8 text-primary">
                  <BookOpen size={24} />
                  <span className="font-black uppercase tracking-[2px] text-xs">Expert Methodology</span>
               </div>
               <div className="prose prose-lg prose-invert max-w-none 
                 prose-headings:text-foreground prose-headings:font-black prose-headings:tracking-tighter
                 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-medium
                 prose-strong:text-foreground prose-strong:font-black
                 prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-6
                 prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                 prose-ul:list-disc prose-ul:pl-6 prose-li:text-muted-foreground
                 prose-blockquote:border-l-4 prose-blockquote:border-r-4 prose-blockquote:border-primary/40 prose-blockquote:bg-primary/5 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-lg prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:font-bold prose-blockquote:my-8 prose-blockquote:shadow-inner">
                  <ReactMarkdown>{lesson.content}</ReactMarkdown>
               </div>
            </div>

           <div className="flex items-center justify-between p-8 bg-primary rounded-3xl text-primary-foreground shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all">
                  <Sparkles size={120} />
              </div>
              <div className="relative z-10 space-y-4">
                 <h2 className="text-2xl font-black">Ready to test this technique?</h2>
                 <p className="text-sm font-medium opacity-90 max-w-lg">Jump into the practice playground and see how Claude handles your prompts using {lesson.title}.</p>
                 <Link href="/playground" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all active:scale-95">
                    Open Playground <ArrowRight size={16} />
                 </Link>
              </div>
           </div>
        </div>

        <aside className="lg:col-span-1 space-y-8">
           <div className="bg-sidebar border border-border rounded-3xl p-6 sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                 <CheckCircle2 size={16} className="text-primary" />
                 Key Takeaways
              </h3>
              <ul className="space-y-4">
                 {[1,2,3].map(i => (
                   <li key={i} className="flex gap-3 text-xs font-semibold leading-relaxed group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform" />
                      <span>Actionable strategy for {lesson.title} number {i}.</span>
                   </li>
                 ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-border/50">
                 <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                    <p className="text-[10px] text-primary font-black uppercase mb-2">In This Module</p>
                    <div className="flex items-center gap-3">
                       <Bot size={24} className="text-primary" />
                       <span className="text-xs font-bold leading-tight">Included real-world examples from production apps.</span>
                    </div>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
