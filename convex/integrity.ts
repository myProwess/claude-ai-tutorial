import { query } from "./_generated/server";

export const checkOrphans = query({
  args: {},
  handler: async (ctx) => {
    const lessons = await ctx.db.query("lessons").collect();
    const paths = await ctx.db.query("learningPaths").collect();
    const pathIds = new Set(paths.map(p => p._id));
    
    return lessons.map(l => ({
      title: l.title,
      pathId: l.learningPathId,
      exists: l.learningPathId ? pathIds.has(l.learningPathId) : false,
      published: l.isPublished
    }));
  },
});
