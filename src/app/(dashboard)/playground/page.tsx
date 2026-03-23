"use client";

import { useState } from "react";
import { 
  Sparkles, 
  RefreshCcw, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Zap,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";


const CHALLENGES = [
  { id: "1", title: "Extract JSON", description: "Convert a plain text receipt into structured JSON format.", difficulty: "Easy" },
  { id: "2", title: "Role-play Prompt", description: "Design a prompt that makes Claude act as a recursive debugging assistant.", difficulty: "Medium" },
  { id: "3", title: "Chain of Thought", description: "Force Claude to think step-by-step using XML tags to solve a logic puzzle.", difficulty: "Hard" },
];

export default function PlaygroundPage() {
  const userId = "guest";
  const evaluateAction = useAction(api.ai.evaluatePrompt);
  const submitPractice = useMutation(api.hub.submitPractice);

  const [prompt, setPrompt] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    feedback: string;
    improved: string;
  } | null>(null);

  const handleEvaluate = async () => {
    if (!prompt.trim() || isEvaluating) return;
    setIsEvaluating(true);
    setResult(null);

    try {
      const evaluation = await evaluateAction({
        userId,
        prompt: prompt,
      });

      setResult(evaluation);

      // Save to DB
      await submitPractice({
        userId,
        prompt: prompt,
        score: evaluation.score,
        feedback: evaluation.feedback,
        improvedPrompt: evaluation.improved,
      });
    } catch (error) {
      console.error("Evaluation failed:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Practice Playground</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Test your prompt engineering skills against our AI evaluator. Get instant feedback and learn how to communicate with Claude like a pro.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-sidebar border border-border rounded-2xl p-6 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={80} />
             </div>
            <label className="text-sm font-semibold mb-3 block text-foreground flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              Your Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here to see how Claude handles it..."
              className="w-full h-64 bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono resize-none transition-all"
            />
            <div className="mt-4 flex justify-between items-center bg-muted/50 p-2 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground font-medium px-2">
                Characters: <span className="text-foreground">{prompt.length}</span>
              </span>
              <button
                onClick={handleEvaluate}
                disabled={!prompt.trim() || isEvaluating}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                {isEvaluating ? (
                   <RefreshCcw size={18} className="animate-spin" />
                ) : (
                  <Zap size={18} />
                )}
                {isEvaluating ? "Evaluating..." : "Evaluate Prompt"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-sidebar border-2 border-primary/20 rounded-2xl p-8 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="text-green-500" size={24} />
                  Evaluation Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-background rounded-2xl border border-border shadow-inner">
                    <span className="text-4xl font-black text-primary mb-1">{result.score}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Total Score</span>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-tight">
                        <AlertCircle size={14} className="text-primary" /> 
                        Expert Feedback
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/80 font-medium">
                      {result.feedback}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-tight">
                        <Sparkles size={14} className="text-amber-500" />
                        Improved Version
                    </h3>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(result.improved);
                      }}
                      className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold group/copy"
                    >
                      <Copy size={12} className="group-hover/copy:scale-110 transition-transform" /> Copy to clipboard
                    </button>
                  </div>
                  <div className="bg-background border border-border rounded-xl p-4 font-mono text-sm text-foreground/70 shadow-sm leading-relaxed">
                    {result.improved}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="bg-sidebar border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
              <Zap size={20} className="text-amber-500" />
              Prompt Challenges
            </h2>
            <div className="space-y-4">
              {CHALLENGES.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => setPrompt(`Write a prompt to: ${challenge.description}`)}
                  className="w-full text-left p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{challenge.title}</span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                      challenge.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                      challenge.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" :
                      "bg-red-500/10 text-red-500"
                    )}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors">
                    {challenge.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
              <Sparkles size={16} />
              Pro Tip
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Claude works best when you provide <strong>examples</strong> (few-shot prompting) and use <strong>clear structure</strong> like XML tags to separate instructions from data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
