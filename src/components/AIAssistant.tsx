"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, User, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAction, useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";


interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const userId = "guest";
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  // Actually we should pull history from Convex
  const history = useQuery(api.hub.listMessages, { userId });
  const sendMessage = useMutation(api.hub.sendMessage);
  const chatAction = useAction(api.ai.chat);
  
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = history?.map(m => ({
    id: m._id,
    role: m.role,
    content: m.content
  })).reverse() || [
    { id: "1", role: "assistant", content: "Hello! I'm your Claude Mastery Hub assistant. How can I help you today?" }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userContent = input;
    setInput("");
    setIsLoading(true);

    try {
      // 1. Save user message to DB
      await sendMessage({
        userId,
        role: "user",
        content: userContent
      });

      // 2. Call Claude API via Convex Action
      const response = await chatAction({
        userId,
        content: userContent
      });

      // 3. Save assistant response to DB
      await sendMessage({
        userId,
        role: "assistant",
        content: response
      });
    } catch (error) {
       console.error("Chat failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-50 group"
      >
        <Bot size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className="fixed inset-y-0 right-0 w-[400px] bg-background border-l border-border shadow-2xl z-50 flex flex-col m-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-sidebar flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Claude AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-muted-foreground">Always Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === "user" ? "bg-muted" : "bg-primary/10"
                  )}>
                    {msg.role === "user" ? <User size={16} /> : <Sparkles size={16} className="text-primary" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot size={16} className="text-primary animate-pulse" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-medium">Claude is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border bg-sidebar">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything about Claude AI..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm placeholder:text-muted-foreground/60"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1.5 w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-center text-muted-foreground/60">
                Powered by Claude 3.5 Sonnet
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
