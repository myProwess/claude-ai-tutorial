import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Lessons
export const listLessons = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("lessons")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("asc")
      .collect();
  },
});

export const getLessonBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Blog
export const listBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogPosts")
      .order("desc")
      .collect();
  },
});

export const getBlogPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Admin Mutations (For Phase 2)
export const createLesson = mutation({
  args: {
    learningPathId: v.optional(v.id("learningPaths")),
    title: v.string(),
    description: v.string(),
    content: v.string(),
    slug: v.string(),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    duration: v.string(),
    order: v.number(),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
     return await ctx.db.insert("lessons", args);
  },
});
