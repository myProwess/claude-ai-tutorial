"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { BookOpen, Search, Zap, Clock, ChevronRight, LayoutGrid, List, Terminal, Code } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  Terminal: Terminal,
  Code: Code,
};

export default function LearningPathsPage() {
  const paths = useQuery(api.learningPaths.listPaths);
  const [search, setSearch] = useState("");

  const filteredPaths = paths?.filter((p: any) => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Learning Paths</h1>
          <p className="text-lg text-muted-foreground mt-2">Curated journeys to master specific Claude AI skillsets.</p>
        </div>
      </div>

      <div className="relative group max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search paths..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-sidebar border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
        />
      </div>

      {!paths ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[1,2].map(i => (
             <div key={i} className="h-64 bg-sidebar/50 animate-pulse rounded-3xl border border-border" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPaths?.map((path: any) => {
            const Icon = iconMap[path.icon] || BookOpen;
            return (
              <Link 
                key={path._id} 
                href={`/learning-paths/${path.slug}`}
                className="group relative bg-sidebar border border-border rounded-3xl p-8 hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110">
                    <Icon size={120} />
                 </div>

                 <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                       <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors">{path.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {path.description}
                    </p>
                 </div>

                 <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                       View Modules <ChevronRight size={16} />
                    </span>
                 </div>
              </Link>
            );
          })}
        </div>
      )}

      {paths && filteredPaths?.length === 0 && (
        <div className="text-center py-24 bg-sidebar border border-dashed border-border rounded-3xl">
           <Zap size={48} className="mx-auto text-muted-foreground opacity-20 mb-4" />
           <p className="text-muted-foreground font-medium">No paths found matching your search.</p>
        </div>
      )}
    </div>
  );
}
