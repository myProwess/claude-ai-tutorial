import { v } from "convex/values";
import { mutation } from "./_generated/server";

export default mutation({
  args: {},
  handler: async (ctx) => {
    const paths = [
      {
        title: "Claude Fundamentals",
        description: "Start here: Learn what Claude is, how to set up your account, and navigate the basics of the interface.",
        slug: "claude-basics",
        icon: "Sparkles",
        order: 1,
        isPublished: true,
      },
      {
        title: "Mastering Prompt Engineering",
        description: "The definitive guide to communicating with Claude, from basic conversations to advanced XML structures.",
        slug: "prompt-engineering",
        icon: "Terminal",
        order: 2,
        isPublished: true,
      },
      {
        title: "Claude for Developers",
        description: "Technical integration, code generation, debugging, and building with the Anthropic API.",
        slug: "claude-dev",
        icon: "Code",
        order: 3,
        isPublished: true,
      },
      {
        title: "Claude for Content & Creativity",
        description: "Unlock Claude's full potential for high-quality writing, summarization, and creative brainstorming.",
        slug: "content-creation",
        icon: "Bot",
        order: 4,
        isPublished: true,
      }
    ];

    const pathIds: Record<string, any> = {};
    for (const path of paths) {
      const existing = await ctx.db
        .query("learningPaths")
        .withIndex("by_slug", (q) => q.eq("slug", path.slug))
        .unique();
      if (!existing) {
        const id = await ctx.db.insert("learningPaths", path);
        pathIds[path.slug] = id;
        console.log(`Inserted path: ${path.title} with ID: ${id}`);
      } else {
        pathIds[path.slug] = existing._id;
        await ctx.db.patch(existing._id, { 
          title: path.title, 
          description: path.description, 
          icon: path.icon, 
          order: path.order, 
          isPublished: path.isPublished 
        });
        console.log(`Patched path: ${path.title} with ID: ${existing._id}`);
      }
    }

    const lessons = [
      // FUNDAMENTALS PATH
      {
        learningPathId: pathIds["claude-basics"],
        title: "Claude AI - Home",
        description: "An overview of Claude AI's mission and its professional assistance capabilities.",
        content: `# Claude AI - Home\n\nClaude AI is an advanced artificial intelligence developed by Anthropic to assist with various tasks such as answering questions, offering recommendations, and supporting professional projects. It features a straightforward design for ease of use.\n\n## Prerequisites\nTo get the most out of Claude, you should have:\n- A basic technical understanding.\n- An active Anthropic account.\n- Familiarity with API documentation (for advanced developer use).`,
        slug: "claude-ai-home",
        difficulty: "Easy" as const,
        duration: "10 mins",
        order: 1,
        isPublished: true,
      },
      {
        learningPathId: pathIds["claude-basics"],
        title: "Claude AI - Introduction",
        description: "Learn about model types (Opus, Sonnet, Haiku) and Constitutional AI.",
        content: `# Claude AI - Introduction\n\nAn overview of Claude's capabilities and its focus on reliability and security through 'Constitutional AI'.\n\n## The Claude 3.5 Model Family\n- **Claude 3.5 Sonnet**: The latest and most balanced model for speed and intelligence.\n- **Claude 3 Opus**: The most powerful model for complex reasoning.\n- **Claude 3 Haiku**: Optimized for near-instant responses.\n\n## Key Features\n- **Massive Context Window**: Process up to 200,000 tokens.\n- **Advanced Reasoning**: Exceptional logic and multilingual support.\n- **Visual Input**: State-of-the-art analysis of charts and images.`,
        slug: "claude-ai-introduction",
        difficulty: "Easy" as const,
        duration: "15 mins",
        order: 2,
        isPublished: true,
      },
      {
        learningPathId: pathIds["claude-basics"],
        title: "Claude AI - Setup",
        description: "A step-by-step guide to setting up your Anthropic account and navigating the UI.",
        content: `# Claude AI - Setup\n\nSimple steps to begin your journey with Claude.\n\n## Registration Process\n1. Go to **claude.ai**.\n2. Sign up via email or social login (Google/Apple).\n3. Verify your identity via the OTP sent to your email.\n\n## Navigation Guide\n- **Chat Window**: Your primary interaction space.\n- **Chat History**: Sidebar access to all previous conversations.\n- **System Settings**: Adjust themes, view API usage, and manage your plan.`,
        slug: "claude-ai-setup",
        difficulty: "Easy" as const,
        duration: "10 mins",
        order: 3,
        isPublished: true,
      },

      // PROMPT ENGINEERING PATH
      {
        learningPathId: pathIds["prompt-engineering"],
        title: "Claude AI - Conversations",
        description: "Mastering logical dialogue, clarity, and the core principles of prompting.",
        content: `# Claude AI - Conversations\n\nMastering the art of chatting with Claude requires understanding three core pillars: **Clarity, Context, and Specification**.\n\n## Core Principles\n- **Clarity**: Be direct. Use simple, unambiguous language.\n- **Context**: Provide the background Claude needs to understand your request.\n- **Specification**: Define the exact format (bullets, tables, essays) you want.\n\n## Advanced Techniques\n- **Follow-up Questions**: Don't stop at the first answer; ask Claude to refine or go deeper.\n- **Example-based Prompts**: Provide a few examples of the desired output to guide the model's tone and style.`,
        slug: "claude-ai-conversations",
        difficulty: "Medium" as const,
        duration: "25 mins",
        order: 1,
        isPublished: true,
      },
      {
        learningPathId: pathIds["prompt-engineering"],
        title: "XML Tagging Mastery",
        description: "Using tags to isolate instructions and data for 100% consistency.",
        content: `# XML Tagging Mastery\n\nClaude is uniquely optimized for XML tags. This technique is essential for complex prompts.\n\n### Correct Usage\n\`\`\`xml\n<instructions>\nExtract the names from the document below.\n</instructions>\n\n<document>\n[Insert text]\n</document>\n\`\`\``,
        slug: "xml-tagging-deep-dive",
        difficulty: "Hard" as const,
        duration: "30 mins",
        order: 2,
        isPublished: true,
      },

      // CONTENT CREATION PATH
      {
        learningPathId: pathIds["content-creation"],
        title: "Claude AI - Content Creation",
        description: "Writing articles, summarizing docs, and brainstorming marketing ideas.",
        content: `# Claude AI - Content Creation\n\nClaude is your creative partner for high-output writing and ideation.\n\n## Core Workflows\n- **Writing**: Draft blog posts, scripts, or email campaigns by defining your target audience.\n- **Summarization**: Condense 50-page reports into 5 key bullet points instantly.\n- **Brainstorming**: Generate product names, marketing slogans, or travel itineraries.\n\n## PRO Tip\nAsk Claude to "think from the perspective of a [Role]" to instantly change its writing style and depth.`,
        slug: "claude-ai-content-creation",
        difficulty: "Medium" as const,
        duration: "30 mins",
        order: 1,
        isPublished: true,
      },

      // DEVELOPER PATH
      {
        learningPathId: pathIds["claude-dev"],
        title: "Claude AI - Code Generation",
        description: "Generating boilerplate, logic, and full functions in multiple languages.",
        content: `# Claude AI - Code Generation\n\nWriting and translating code across multiple languages including **Python, JavaScript, SQL, and C++**.\n\n## What Claude can do:\n- **Boilerplate**: Generate the scaffolding for a new API or Web app.\n- **Translation**: Convert a Java class into a Rust struct.\n- **Explanations**: Ask Claude to explain how a complex regex or algorithm works in plain English.`,
        slug: "claude-ai-code-generation",
        difficulty: "Medium" as const,
        duration: "40 mins",
        order: 1,
        isPublished: true,
      },
      {
        learningPathId: pathIds["claude-dev"],
        title: "Claude AI - Code Debugging",
        description: "Troubleshooting syntax and logical errors using the AI's step-by-step reasoning.",
        content: `# Claude AI - Code Debugging\n\nTroubleshooting code efficiently with Claude's help.\n\n## The Workflow\n1. **Provide the Code**: Use XML tags like \`<code>\`.\n2. **Paste the Error**: Include the full trace/error message.\n3. **Request a Fix**: Claude will identify the bug, explain the 'why', and provide the 'how' with corrected code.`,
        slug: "claude-ai-code-debugging",
        difficulty: "Hard" as const,
        duration: "45 mins",
        order: 2,
        isPublished: true,
      },
      {
        learningPathId: pathIds["claude-dev"],
        title: "Claude AI - Integrating into Applications",
        description: "Connecting to the API, managing OIDC tokens, and production deployment.",
        content: `# Claude AI - Integrating into Applications\n\nBuilding professional-grade software with the Anthropic API.\n\n## API Essentials\n- **Console**: Get your API key from the Anthropic Console.\n- **Endpoint**: POST to \`/v1/messages\`.\n- **Payload**: Include the model (e.g., \`claude-3-5-sonnet\`), message history, and token limits.\n\n## Best Practices\nEnsure you implement **rate limiting** and **error handling** to provide a smooth user experience.`,
        slug: "claude-ai-integrating-apps",
        difficulty: "Hard" as const,
        duration: "1 hr",
        order: 3,
        isPublished: true,
      }
    ];

    for (const lesson of lessons) {
      const existing = await ctx.db
        .query("lessons")
        .withIndex("by_slug", (q) => q.eq("slug", lesson.slug))
        .unique();
      if (!existing) {
        await ctx.db.insert("lessons", lesson);
      } else {
        await ctx.db.patch(existing._id, { 
          learningPathId: lesson.learningPathId,
          content: lesson.content,
          description: lesson.description,
          title: lesson.title,
          difficulty: lesson.difficulty,
          duration: lesson.duration,
          order: lesson.order,
          isPublished: lesson.isPublished
        });
      }
    }

    const blogPosts = [
      {
        title: "The Future of Prompt Engineering",
        excerpt: "Why structured formats like XML are winning the battle for consistency.",
        content: "Prompt engineering is evolving from trial-and-error to a more structured engineering discipline. By using techniques like XML tagging and Chain of Thought, developers can build more robust AI-powered applications...",
        slug: "future-of-prompting",
        author: "Claude Master",
        publishedAt: Date.now(),
      }
    ];

    for (const post of blogPosts) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", post.slug))
        .unique();
      if (!existing) {
        await ctx.db.insert("blogPosts", post);
      }
    }
  },
});
