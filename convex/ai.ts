import { action } from "./_generated/server";
import { v } from "convex/values";
import Anthropic from "@anthropic-ai/sdk";

// Helper to get client (will need ANTHROPIC_API_KEY env var)
const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set.");
  return new Anthropic({ apiKey });
};

export const chat = action({
  args: {
    userId: v.string(),
    content: v.string(),
    contextContent: v.optional(v.string()), // Added context
  },
  handler: async (ctx, args) => {
    const anthropic = getAnthropicClient();
    const { content, contextContent } = args;

    const systemPrompt = `You are "Claude AI Mastery Hub" assistant. Help the user master Claude AI.
    ${contextContent ? `CURRENT CONTEXT: ${contextContent}` : ""}
    Be technical, helpful, and concise.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content }],
    });

    const assistantContent = response.content[0].type === 'text' ? response.content[0].text : "";
    return assistantContent;
  },
});

export const evaluatePrompt = action({
  args: {
    userId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const anthropic = getAnthropicClient();
    const { prompt } = args;

    const systemPrompt = `You are a prompt engineering expert. Evaluate the user's prompt based on structure, clarity, and effectiveness.
    Return a JSON with:
    - score (1-10)
    - feedback (short, actionable)
    - improvedPrompt (a better version of the same prompt)`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: `Evaluate this prompt: ${prompt}` }],
    });

    const assistantContent = response.content[0].type === 'text' ? response.content[0].text : "";
    
    // Attempt to parse JSON (basic cleanup)
    try {
      const jsonStart = assistantContent.indexOf("{");
      const jsonEnd = assistantContent.lastIndexOf("}") + 1;
      const jsonStr = assistantContent.substring(jsonStart, jsonEnd);
      return JSON.parse(jsonStr);
    } catch (e) {
      return {
        score: 5,
        feedback: "Could not evaluate automatically. Check prompt structure.",
        improvedPrompt: prompt,
      };
    }
  },
});
