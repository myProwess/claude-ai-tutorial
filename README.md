# 🏆 Claude AI Mastery Hub

Claude AI Mastery Hub is a premium, high-fidelity learning platform designed to take users from absolute beginners to expert prompt engineers and AI developers. Built with a state-of-the-art tech stack and human-centric design, the hub offers curated learning paths, expert methodology guides, and an interactive AI-assisted playground for real-world mastery.

---

## 🏗️ Architecture Overview

The application follows a modern, performance-first architecture:

- **Frontend**: **Next.js 16** with **App Router** for optimized server-side rendering and dynamic routing.
- **Backend-as-a-Service**: **Convex** for a reactive database, real-time sync, and edge-native mutations/queries.
- **Styling**: **Tailwind CSS** for a premium "Glassmorphism" UI with dark-mode first design tokens.
- **Animations**: **Framer Motion** for smooth, responsive micro-animations and transitions.
- **Content Engine**: Custom **Markdown Rendering** system using `react-markdown` and `@tailwindcss/typography` to deliver expert curriculum with high-fidelity formatting.
- **AI Core**: Integration with **Anthropic's Claude 3.5 API** via Convex Actions for real-time assistance and playground capability.

---

## 🖼️ Visual Experience

### 🚀 Curriculum Dashboard
![Dashboard Placeholder](/public/screenshots/dashboard.png)
*A centralized hub for tracking progress across Fundamentals, Prompt Engineering, and Development paths.*

### 📚 Expert Methodology
![Lesson Detail Placeholder](/public/screenshots/lesson-detail.png)
*High-fidelity Markdown rendering for learning modules, including XML tagging strategies and code debugging workflows.*

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v19+ recommended)
- [Convex Account](https://www.convex.dev/)
- [Vercel CLI](https://vercel.com/download) (optional, for deployment)

### 2. Initial Setup
Clone the repository and install dependencies:
```bash
git clone https://github.com/myProwess/claude-ai-tutorial.git
cd claude-ai-tutorial
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
# Required for Frontend
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud

# Required for AI Features
ANTHROPIC_API_KEY=your_key_here
```

### 4. Running Locally
Launch the Convex development server and then the Next.js frontend:
```bash
# In terminal 1
npx convex dev

# In terminal 2
npm run dev
```

### 5. Seeding the Database
To populate the hub with the full Tutorialspoint curriculum:
```bash
npx convex run seed:default
```

---

## 📂 Directory Structure

```text
├── .agents/             # Agent skills and workflows
├── convex/              # Backend schema, mutations, queries, and AI actions
│   ├── schema.ts        # Database structure
│   ├── seed.ts          # Core curriculum seed data
│   └── learningPaths.ts # Path-based API functions
├── src/
│   ├── app/             # Next.js Routes & Pages (Dashboard, Paths, Lessons)
│   ├── components/      # UI components (Sidebar, AIAssistant, Markdown engine)
│   └── lib/             # Utility functions and Tailwind merging
├── public/              # Static assets and screenshots
└── tailwind.config.ts   # Design system and typography configuration
```

---

## 🚀 Usage Examples

### Fetching Modules for a Path (Convex Query)
```typescript
const modules = useQuery(api.learningPaths.getModulesByPath, { pathId: "..." });
```

### Interacting with Claude AI Assistant
```typescript
const chatAction = useAction(api.ai.chat);
const response = await chatAction({ 
  userId: "user_123", 
  content: "Explain XML tagging." 
});
```

---

## 🤝 Contribution & License

### Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

---
Built with ❤️ by the **Claude AI Mastery Hub** team using Next.js & Convex.
