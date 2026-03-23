"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, LayoutGrid, FileText, Settings, Users, BarChart3, ChevronRight, PenTool, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"lessons" | "blog" | "users">("lessons");
  const createLesson = useMutation(api.content.createLesson);
  const lessons = useQuery(api.content.listLessons);

  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");
  const [newLessonContent, setNewLessonContent] = useState("");
  const [newLessonSlug, setNewLessonSlug] = useState("");
  const [newLessonDifficulty, setNewLessonDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [newLessonDuration, setNewLessonDuration] = useState("20 mins");
  const [newLessonOrder, setNewLessonOrder] = useState(1);
  const [newLessonPublished, setNewLessonPublished] = useState(true);

  const handleCreateLesson = async () => {
    if (!newLessonTitle || !newLessonSlug) return;
    await createLesson({
      title: newLessonTitle,
      description: newLessonDescription,
      content: newLessonContent,
      slug: newLessonSlug,
      difficulty: newLessonDifficulty,
      duration: newLessonDuration,
      order: newLessonOrder,
      isPublished: newLessonPublished,
    });
    // Reset
    setNewLessonTitle("");
    setNewLessonSlug("");
    setNewLessonDescription("");
    setNewLessonContent("");
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Admin Mastery Console</h1>
        <p className="text-lg text-muted-foreground max-w-2xl font-medium">Manage your curriculum, editorial content, and platform users from one central hub.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-2">
           {[
             { id: "lessons", label: "Curriculum", icon: BookOpen },
             { id: "blog", label: "Editorial", icon: PenTool },
             { id: "users", label: "User Access", icon: Users },
             { id: "analytics", label: "System Status", icon: BarChart3 },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={cn(
                 "w-full px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-4 transition-all group",
                 activeTab === tab.id 
                   ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20" 
                   : "bg-sidebar border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
               )}
             >
               <tab.icon size={20} className={activeTab === tab.id ? "text-white" : "group-hover:text-primary transition-colors"} />
               {tab.label}
             </button>
           ))}
        </aside>

        <div className="lg:col-span-3 space-y-12">
           {activeTab === "lessons" && (
             <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-sidebar border border-border rounded-3xl p-10 shadow-sm space-y-8">
                   <h2 className="text-2xl font-black flex items-center gap-3">
                      <Plus className="text-primary" /> 
                      Publish New Module
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Module Title</label>
                         <input 
                           type="text" 
                           placeholder="e.g. Mastering XML Tags"
                           value={newLessonTitle}
                           onChange={(e) => setNewLessonTitle(e.target.value)}
                           className="w-full px-5 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Unique Slug</label>
                         <input 
                           type="text" 
                           placeholder="mastering-xml-tags"
                           value={newLessonSlug}
                           onChange={(e) => setNewLessonSlug(e.target.value)}
                           className="w-full px-5 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm" 
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Brief Description</label>
                      <textarea 
                        rows={3}
                        placeholder="Explain the core objective of this lesson..."
                        value={newLessonDescription}
                        onChange={(e) => setNewLessonDescription(e.target.value)}
                        className="w-full px-5 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium resize-none shadow-inner" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Lesson Content (Markdown)</label>
                      <textarea 
                        rows={6}
                        placeholder="# Heading 1\n\nLesson content here..."
                        value={newLessonContent}
                        onChange={(e) => setNewLessonContent(e.target.value)}
                        className="w-full px-5 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm resize-none shadow-inner" 
                      />
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Difficulty</label>
                         <select 
                           value={newLessonDifficulty}
                           onChange={(e) => setNewLessonDifficulty(e.target.value as any)}
                           className="w-full px-4 py-3 bg-background border border-border rounded-xl font-bold text-sm"
                         >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Est. Duration</label>
                         <input 
                           type="text" 
                           value={newLessonDuration}
                           onChange={(e) => setNewLessonDuration(e.target.value)}
                           className="w-full px-4 py-3 bg-background border border-border rounded-xl font-bold text-sm" 
                         />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Display Order</label>
                        <input 
                          type="number" 
                          value={newLessonOrder}
                          onChange={(e) => setNewLessonOrder(parseInt(e.target.value))}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl font-bold text-sm" 
                        />
                      </div>
                      <div className="flex items-end pb-1.5">
                        <button 
                           onClick={handleCreateLesson}
                           className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-xl transition-all shadow-lg active:scale-95"
                        >
                           Publish
                        </button>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h2 className="text-2xl font-black">Current Content</h2>
                   <div className="space-y-3">
                      {lessons?.map(l => (
                        <div key={l._id} className="p-4 bg-sidebar border border-border rounded-2xl flex items-center justify-between group">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-black group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                 {l.order}
                              </div>
                              <div>
                                <h4 className="font-bold">{l.title}</h4>
                                <span className={cn("text-[10px] uppercase font-black tracking-widest opacity-60", l.isPublished ? "text-green-500" : "text-amber-500")}>
                                   {l.isPublished ? "Live" : "Draft"}
                                </span>
                              </div>
                           </div>
                           <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors">
                              <ChevronRight size={20} />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
