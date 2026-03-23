import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    lastSeen: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  messages: defineTable({
    userId: v.string(), // clerkId or internalId? I'll use clerkId for now or internal if we link them
    conversationId: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    contextContent: v.optional(v.string()), // For context-aware chat
    createdAt: v.number(),
  }).index("by_user_id", ["userId"]),

  practice: defineTable({
    userId: v.string(),
    prompt: v.string(),
    score: v.number(), // 1-10
    feedback: v.string(),
    improvedPrompt: v.string(),
    challengeId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user_id", ["userId"]),

  progress: defineTable({
    userId: v.string(),
    lessonId: v.string(),
    status: v.union(v.literal("started"), v.literal("completed")),
    timeSpent: v.number(), // in seconds
    lastAccessed: v.number(),
  }).index("by_user_id", ["userId"]).index("by_user_lesson", ["userId", "lessonId"]),

  userActivity: defineTable({
    userId: v.string(),
    activityType: v.string(), // "chat", "practice", "lesson_complete"
    metadata: v.any(),
    createdAt: v.number(),
  }).index("by_user_id", ["userId"]),

  analytics: defineTable({
    metric: v.string(),
    value: v.number(),
    timestamp: v.number(),
    userId: v.optional(v.string()),
  }),

  lessons: defineTable({
    title: v.string(),
    description: v.string(),
    content: v.string(), // Markdown content
    slug: v.string(),
    difficulty: v.union(v.literal("Easy"), v.literal("Medium"), v.literal("Hard")),
    duration: v.string(),
    order: v.number(),
    isPublished: v.boolean(),
  }).index("by_order", ["order"]).index("by_slug", ["slug"]),

  blogPosts: defineTable({
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    slug: v.string(),
    author: v.string(),
    publishedAt: v.number(),
    coverImage: v.optional(v.string()),
  }).index("by_published_at", ["publishedAt"]).index("by_slug", ["slug"]),
});
