"use client";

import Link from "next/link";
import { MoveRight, Sparkles, Shield, Zap, BookOpen, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-6 h-20 flex items-center justify-between border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl">C</div>
          <span className="font-bold text-xl tracking-tight">Claude Mastery</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Curriculum</Link>
          <Link href="/dashboard" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2">
            Get Started <MoveRight size={16} />
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20"
            >
              <Sparkles size={14} /> NEW: Claude 3.5 Sonnet Integration
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
            >
              Master the Art of <span className="text-primary italic">AI Prompting.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              The most comprehensive hub to learn, practice, and master Claude AI. Build better prompts, understand model behavior, and unlock 10x productivity.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                Start Learning Now <MoveRight />
              </Link>
              <Link href="/playground" className="w-full sm:w-auto px-8 py-4 bg-muted text-foreground rounded-2xl font-black text-lg hover:bg-muted/80 transition-all flex items-center justify-center gap-3">
                Try Playground <Zap size={20} className="text-amber-500" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Info Grid */}
        <section id="features" className="py-24 px-6 bg-sidebar/50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-background rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all group">
               <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <Bot size={32} />
               </div>
               <h3 className="text-2xl font-bold">Smart Assistant</h3>
               <p className="text-muted-foreground leading-relaxed">Context-aware Claude assistant that helps you debug prompts and explain complex concepts in real-time.</p>
            </div>
            <div className="space-y-4 p-8 bg-background rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all group">
               <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={32} />
               </div>
               <h3 className="text-2xl font-bold">Practice Lab</h3>
               <p className="text-muted-foreground leading-relaxed">Interactive playground with prompt challenges and automated AI evaluation to perfect your skills.</p>
            </div>
            <div className="space-y-4 p-8 bg-background rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all group">
               <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={32} />
               </div>
               <h3 className="text-2xl font-bold">Analytics</h3>
               <p className="text-muted-foreground leading-relaxed">Detailed insights into your learning progress and prompt performance scores over time.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-8">
           <div className="flex items-center gap-2 grayscale group hover:grayscale-0 transition-all">
             <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-black text-[10px]">C</div>
             <span className="font-bold text-sm tracking-tight text-muted-foreground group-hover:text-foreground">Claude AI Mastery Hub</span>
           </div>
           <div className="text-xs text-muted-foreground font-medium">
             © 2024 Built with Next.js, Convex & Claude API.
           </div>
        </div>
      </footer>
    </div>
  );
}
