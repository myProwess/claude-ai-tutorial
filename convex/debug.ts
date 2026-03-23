import { query } from "./_generated/server";

export const getAllPathsDetailed = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("learningPaths").collect();
  },
});

export const getAllLessonsDetailed = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lessons").collect();
  },
});
