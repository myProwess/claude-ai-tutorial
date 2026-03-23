import { query } from "./_generated/server";

export const testQueries = query({
  args: {},
  handler: async (ctx) => {
    const paths = await ctx.db.query("learningPaths").collect();
    const results: Record<string, any> = {};
    
    for (const path of paths) {
      const lessons = await ctx.db
        .query("lessons")
        .withIndex("by_path_order", (q) => q.eq("learningPathId", path._id))
        .collect();
      results[path.title] = {
        id: path._id,
        slug: path.slug,
        lessonCount: lessons.length,
        lessonTitles: lessons.map(l => l.title)
      };
    }
    
    return results;
  },
});
