import { v } from "convex/values";
import { query } from "./_generated/server";

export const listPaths = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("learningPaths")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});

export const getPathBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("learningPaths")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getModulesByPath = query({
  args: { pathId: v.id("learningPaths") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_path_order", (q) => q.eq("learningPathId", args.pathId))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});
