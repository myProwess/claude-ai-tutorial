import { mutation } from "./_generated/server";

export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const lessons = await ctx.db.query("lessons").collect();
    const paths = await ctx.db.query("learningPaths").collect();
    
    for (const l of lessons) await ctx.db.delete(l._id);
    for (const p of paths) await ctx.db.delete(p._id);
    
    console.log(`Deleted ${lessons.length} lessons and ${paths.length} paths.`);
  },
});
