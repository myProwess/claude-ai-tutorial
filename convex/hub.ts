import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Users
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (existing) return existing;
    return await ctx.db.insert("users", {
      ...args,
      lastSeen: Date.now(),
    });
  },
});

// Messages
export const listMessages = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
  },
});

export const sendMessage = mutation({
  args: {
    userId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    contextContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Practice
export const listPractice = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("practice")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
  },
});

export const submitPractice = mutation({
  args: {
    userId: v.string(),
    prompt: v.string(),
    score: v.number(),
    feedback: v.string(),
    improvedPrompt: v.string(),
    challengeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("practice", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Activity/Analytics
export const trackActivity = mutation({
  args: {
    userId: v.string(),
    activityType: v.string(),
    metadata: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("userActivity", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
