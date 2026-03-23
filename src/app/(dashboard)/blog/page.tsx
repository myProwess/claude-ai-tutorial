"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  User, 
  Zap, 
  ArrowUpRight 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const posts = useQuery(api.content.listBlogPosts);

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Claude Insights Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl font-medium">Deep dives into prompt engineering, emerging patterns, and model behavior from our team of experts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!posts ? (
           Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="h-96 bg-sidebar/50 animate-pulse rounded-3xl border border-border" />
           ))
        ) : posts.length === 0 ? (
          <div className="col-span-full py-48 text-center bg-sidebar border border-dashed border-border rounded-3xl">
             <Sparkles size={48} className="mx-auto text-primary opacity-20 mb-4" />
             <p className="text-muted-foreground font-medium italic">New insights arriving soon!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug}`}
              className="group bg-sidebar border border-border rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all flex flex-col h-full"
            >
               <div className="relative aspect-video bg-muted overflow-hidden">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Zap size={48} className="fill-primary/10" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary">
                        New Article
                     </span>
                  </div>
               </div>
               
               <div className="p-8 flex flex-col flex-1 space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase opacity-80 tracking-widest">
                     <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                     <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                  </div>
                  <h2 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-medium flex-1 italic">
                    {post.excerpt}
                  </p>
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                     <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1">
                        Read Story <ChevronRight size={14} />
                     </span>
                     <ArrowUpRight size={18} className="text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
               </div>
            </Link>
          ))
        )}
      </div>

      <div className="p-12 bg-primary rounded-3xl text-primary-foreground shadow-2xl text-center relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mt-32" />
         <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <h2 className="text-3xl font-black">Join 10k+ Prompt Engineers</h2>
            <p className="text-sm font-medium opacity-90 leading-relaxed italic">Get weekly summaries of the best prompts and Claude updates delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/40" 
               />
               <button className="px-8 py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all shadow-lg active:scale-95">
                  Subscribe Now
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
