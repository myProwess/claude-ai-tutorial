"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { BookOpen, Search, Zap, Clock, ChevronRight, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LessonsPage() {
  const lessons = useQuery(api.content.listLessons);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredLessons = lessons?.filter(l => 
    l.title.toLowerCase().includes(search.toLowerCase()) || 
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Learning Modules</h1>
          <p className="text-lg text-muted-foreground mt-2">Master Claude AI step-by-step with our comprehensive curriculum.</p>
        </div>
        <div className="flex items-center gap-3 bg-sidebar p-1 border border-border rounded-xl">
           <button 
             onClick={() => setView("grid")}
             className={cn("p-2 rounded-lg transition-all", view === "grid" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:bg-muted")}
           >
             <LayoutGrid size={20} />
           </button>
           <button 
             onClick={() => setView("list")}
             className={cn("p-2 rounded-lg transition-all", view === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:bg-muted")}
           >
             <List size={20} />
           </button>
        </div>
      </div>

      <div className="relative group max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search lessons (e.g. 'XML', 'Prompting', 'Caching')..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-sidebar border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
        />
      </div>

      {!lessons ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1,2,3,4,5,6].map(i => (
             <div key={i} className="h-64 bg-sidebar/50 animate-pulse rounded-3xl border border-border" />
           ))}
        </div>
      ) : (
        <div className={cn(
          view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
        )}>
          {filteredLessons?.map((lesson) => (
            <Link 
              key={lesson._id} 
              href={`/lessons/${lesson.slug}`}
              className={cn(
                "group relative bg-sidebar border border-border rounded-3xl p-6 hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden",
                view === "list" ? "flex items-center justify-between py-4" : ""
              )}
            >
               {view === "grid" && (
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
                    <BookOpen size={80} />
                 </div>
               )}

               <div className={cn("space-y-4", view === "list" ? "flex-1 flex gap-6 items-center space-y-0" : "")}>
                  <div className={cn("flex flex-col", view === "list" ? "min-w-[200px]" : "")}>
                    <div className="flex items-center gap-2 mb-2">
                       <span className={cn(
                         "text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                         lesson.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                         lesson.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                       )}>
                         {lesson.difficulty}
                       </span>
                       <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 opacity-60">
                         <Clock size={10} /> {lesson.duration}
                       </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">{lesson.title}</h3>
                  </div>
                  
                  {view === "grid" && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-medium">
                      {lesson.description}
                    </p>
                  )}

                  <div className={cn("flex items-center justify-between", view === "list" ? "flex-1 ml-auto" : "pt-4 border-t border-border/50")}>
                     {view === "list" && (
                       <p className="text-sm text-muted-foreground line-clamp-1 flex-1 px-4">{lesson.description}</p>
                     )}
                     <div className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ChevronRight size={14} />
                     </div>
                  </div>
               </div>
            </Link>
          ))}
        </div>
      )}

      {lessons && filteredLessons?.length === 0 && (
        <div className="text-center py-24 bg-sidebar border border-dashed border-border rounded-3xl">
           <Zap size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
           <p className="text-muted-foreground font-medium">No lessons found matching your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
}
