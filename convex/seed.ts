import { v } from "convex/values";
import { mutation } from "./_generated/server";

export default mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Create the specific Learning Path
    const path = {
      title: "Content Mastery",
      description: "Master the art of creative writing, summarization, and brainstorming with Claude AI.",
      slug: "content-mastery",
      icon: "Bot",
      order: 1,
      isPublished: true,
    };

    let pathId;
    const existingPath = await ctx.db
      .query("learningPaths")
      .withIndex("by_slug", (q) => q.eq("slug", path.slug))
      .unique();
    
    if (!existingPath) {
      pathId = await ctx.db.insert("learningPaths", path);
    } else {
      pathId = existingPath._id;
      await ctx.db.patch(pathId, path);
    }

    // 2. The Scraped Content
    const lesson = {
      learningPathId: pathId,
      title: "Claude AI - For Content Creation",
      description: "Learn how to generate text, summarize documents, and brainstorm creative ideas with ease.",
      content: `# Claude AI - For Content Creation\n\nHere's how you can get started with **Claude AI** for content creation. You'll learn how to generate text, summarize documents, and brainstorm creative ideas with ease. We'll keep everything simple so you can start using Claude AI effectively right away.\n\n## Generating Articles, Stories, and Dialogues\n\nClaude AI can help you with various types of text, such as articles, stories, and dialogues.\n\n### Creating Articles\nCreating articles means writing detailed content about a topic you choose. Here's how to get started:\n\n* **Choose a Topic:** Decide what you want to write about.\n* **Provide a Prompt:** Give Claude AI a topic or idea. For example, "Write a blog post about healthy eating".\n* **Edit as Needed:** Review the article and make changes if necessary.\n\n> **Note:** Use clear and detailed instructions, and try different styles to get the best results.\n\n### Crafting Stories\nStories can be anything from short tales to longer narratives.\n\n* **Choose a Genre:** Decide what type of story you want, such as a mystery or a comedy.\n* **Provide a Prompt:** Give Claude AI a topic or idea. For example, "Write a children's story about a brave rabbit".\n* **Edit as Needed:** Review the story and make changes if necessary.\n\n### Writing Dialogues\nDialogues are conversations between two or more characters.\n\n* **Define Your Characters:** Identify who will be speaking in the dialogue.\n* **Provide a Prompt:** Give Claude AI a topic or idea. For example, "Write a conversation between a teacher and a student about homework".\n* **Edit as Needed:** Review the dialogue and make changes if necessary.\n\n> **Note:** Specify the tone and provide character details to make the conversation feel real.\n\n## Summarizing Documents and Web Pages\n\nClaude AI can help you summarize long documents and web pages. This saves time and helps you understand the main points quickly.\n\n### Summarizing Documents\nSummarizing documents means creating a brief overview of a text.\n\n* **Prepare the Document:** Have the text or file ready that you want to summarize.\n* **Upload or Paste:** Copy and paste the text into Claude AI or upload the document if the feature is available.\n* **Provide a Prompt:** Ask Claude AI to summarize the content. For example, "Summarize this report in 5 bullet points".\n* **Review the Summary:** Read through the main points to ensure they're accurate.\n\n> **Note:** Make sure the document is clear and provides all the necessary information.\n\n### Summarizing Web Pages\nSummarizing web pages involves getting the key points from a site.\n\n* **Copy the URL:** Copy the URL of the page you want to summarize.\n* **Paste the URL:** Paste the URL into Claude AI.\n* **Request a Summary:** Ask for a summary by saying, "Can you summarize this web page for me?"\n* **Review the Summary:** Claude AI will provide a concise summary of the main points.\n\n## Creative Writing & Brainstorming Ideas\n\nClaude AI can handle various types of creative writing, like poems or short stories, and help you brainstorm new ideas.\n\n### Creative Writing\n\n* **Choose Your Style:** Decide what type of creative writing you want, such as a poem or a short story.\n* **Provide a Prompt:** Give Claude AI a topic or idea. For example, "Write a poem about a sunset".\n* **Edit as Needed:** Review the writing and make changes if necessary.\n\n> **Note:** Use clear and detailed instructions, and try different styles to get the best results.\n\n### Brainstorming Ideas\nBrainstorming is all about coming up with fresh ideas and solutions.\n\n* **Define Your Needs:** Identify what you're brainstorming for, such as "Features for a new app" or "Ideas for a story".\n* **Ask for Suggestions:** Tell Claude AI what you need. For example, "What are some ideas for features in a fitness app?"\n* **Review the Ideas:** Look over the suggestions and choose the ones you like.\n\n> **Note:** Explore various ideas and use them as a starting point for your work.`,
      slug: "claude-ai-for-content-creation",
      difficulty: "Easy" as const,
      duration: "20 mins",
      order: 1,
      isPublished: true,
    };

    const existingLesson = await ctx.db
      .query("lessons")
      .withIndex("by_slug", (q) => q.eq("slug", lesson.slug))
      .unique();

    if (!existingLesson) {
      await ctx.db.insert("lessons", lesson);
    } else {
      await ctx.db.patch(existingLesson._id, lesson);
    }
  },
});
