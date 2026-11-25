import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { CERTIFICATES_DATA } from './src/data/certificates.ts';
import { EDUCATION_DATA, INTERESTS_DATA, PERSONAL_INFO, SOCIAL_LINKS } from './src/data/personal.ts';
import { PROJECTS_DATA } from './src/data/projects.ts';
import { SKILLS_DATA } from './src/data/skills.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ChatRole = 'user' | 'model';
type ChatMode = 'balanced' | 'fast';

interface IncomingHistoryItem {
  role: ChatRole;
  text: string;
}

interface ChatRequestBody {
  message?: unknown;
  history?: unknown;
  mode?: unknown;
}

function buildPortfolioSystemInstruction(): string {
  const educationLines = EDUCATION_DATA.map(
    (e) => `- ${e.degree} — ${e.institution} (${e.academicStatus}${e.duration ? `, ${e.duration}` : ''})`
  ).join('\n');

  const skillsLines = SKILLS_DATA.map(
    (cat) => `- ${cat.title}: ${cat.items.join(', ')} (${cat.summary})`
  ).join('\n');

  const projectLines = PROJECTS_DATA.map(
    (p) =>
      `- ${p.name} [${p.category}]\n  Summary: ${p.shortDescription}\n  Problem & Approach: ${p.problemSolved}\n  Tech Stack: ${p.technologies.join(', ')}\n  GitHub: ${p.githubUrl ?? 'Not listed'}\n  Architecture:\n  ${p.architectureNotes.map((n) => `  * ${n}`).join('\n')}`
  ).join('\n\n');

  const certificateLines = CERTIFICATES_DATA.map(
    (c) =>
      `- [${c.category}] ${c.title} | ${c.organization}${c.date ? ` | ${c.date}` : ''} — ${c.description}`
  ).join('\n');

  const interestsLines = INTERESTS_DATA.map((i) => `- ${i.title}: ${i.focus}`).join('\n');
  const socialLines = SOCIAL_LINKS.map((s) => `- ${s.label}: ${s.handle} (${s.href})`).join('\n');

  return [
    `You are the helpful, knowledgeable AI assistant embedded in ${PERSONAL_INFO.name}'s personal portfolio website.`,
    `Your job is to answer ALL questions from visitors clearly, accurately, and concisely — both questions about ${PERSONAL_INFO.name}'s background, education, skills, projects, internship, certificates, and contact links, as well as general questions about computer science, programming, technology, AI/ML, academics, or any other topic the user asks.`,
    ``,
    `Rules for truthfulness & accuracy:`,
    `1. When answering questions about ${PERSONAL_INFO.name} specifically, rely strictly on the verified portfolio facts below. Do not invent grades, GPA, phone numbers, dates, or credentials not listed below. If a personal detail is not listed, say so plainly and suggest contacting Awlin at ${PERSONAL_INFO.email}.`,
    `2. When answering general questions (technical concepts, coding help, career/study advice, math, writing, or general knowledge), answer directly and helpfully without unnecessarily forcing the topic back to the portfolio.`,
    `3. Keep formatting clean and readable using short paragraphs or simple bullet points.`,
    ``,
    `=== PORTFOLIO PROFILE: ${PERSONAL_INFO.name.toUpperCase()} ===`,
    `Role: ${PERSONAL_INFO.roleTitle}`,
    `Headline: ${PERSONAL_INFO.heroHeadline}`,
    `Bio: ${PERSONAL_INFO.aboutParagraphs.join(' ')}`,
    `Career Focus: ${PERSONAL_INFO.careerFocus}`,
    ``,
    `Education:`,
    educationLines,
    ``,
    `Technical Skills:`,
    skillsLines,
    ``,
    `Projects:`,
    projectLines,
    ``,
    `Internships, Certificates & Achievements (${CERTIFICATES_DATA.length} total):`,
    certificateLines,
    ``,
    `Areas of Interest:`,
    interestsLines,
    ``,
    `Contact & Profiles:`,
    socialLines,
  ].join('\n');
}

const PORTFOLIO_SYSTEM_INSTRUCTION = buildPortfolioSystemInstruction();

const ALLOWED_MODELS: Record<ChatMode, string> = {
  balanced: 'gemini-4-hydrogen',
  fast: 'gemini-3.1-flash-lite',
};

function sanitizeHistory(raw: unknown): IncomingHistoryItem[] {
  if (!Array.isArray(raw)) return [];
  const sanitized: IncomingHistoryItem[] = [];

  for (const item of raw.slice(-30)) {
    if (!item || typeof item !== 'object') continue;
    const record = item as { role?: unknown; text?: unknown };
    if (record.role !== 'user' && record.role !== 'model') continue;
    if (typeof record.text !== 'string') continue;
    const trimmed = record.text.trim();
    if (!trimmed) continue;
    sanitized.push({
      role: record.role,
      text: trimmed.slice(0, 4000),
    });
  }

  return sanitized;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey) {
        return res.status(500).json({
          error:
            'GEMINI_API_KEY is not configured on the server. Add it in Settings -> Secrets to enable live chat responses.',
        });
      }

      const body = (req.body ?? {}) as ChatRequestBody;
      if (typeof body.message !== 'string') {
        return res.status(400).json({ error: 'A text message is required.' });
      }

      const message = body.message.trim();
      if (!message) {
        return res.status(400).json({ error: 'Message cannot be empty.' });
      }
      if (message.length > 4000) {
        return res.status(400).json({ error: 'Message is too long (maximum 4000 characters).' });
      }

      const mode: ChatMode = body.mode === 'fast' ? 'fast' : 'balanced';
      const model = ALLOWED_MODELS[mode];
      const historyItems = sanitizeHistory(body.history);

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          timeout: 12000,
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const sendWithModel = async (targetModel: string) => {
        const chat = ai.chats.create({
          model: targetModel,
          history: historyItems.map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          })),
          config: {
            systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
          },
        });
        return chat.sendMessage({ message });
      };

      const isTransientError = (err: unknown): boolean => {
        const msg = err instanceof Error ? err.message : '';
        const lower = msg.toLowerCase();
        return (
          msg.includes('503') ||
          msg.includes('UNAVAILABLE') ||
          lower.includes('high demand') ||
          lower.includes('overloaded') ||
          lower.includes('deadline') ||
          lower.includes('timeout') ||
          lower.includes('abort')
        );
      };

      const attemptModels =
        mode === 'fast'
          ? [ALLOWED_MODELS.fast, ALLOWED_MODELS.balanced]
          : [ALLOWED_MODELS.balanced, ALLOWED_MODELS.fast];

      let activeModel = model;
      let response;
      let lastError: unknown;

      for (let i = 0; i < attemptModels.length; i++) {
        activeModel = attemptModels[i];
        try {
          response = await sendWithModel(activeModel);
          lastError = undefined;
          break;
        } catch (err) {
          lastError = err;
          if (!isTransientError(err) || i === attemptModels.length - 1) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      }

      if (lastError) {
        throw lastError;
      }

      const reply = response?.text?.trim();

      if (!reply) {
        return res.status(500).json({
          error: 'The assistant returned an empty response. Please try asking again.',
        });
      }

      return res.json({ reply, model: activeModel });
    } catch (error) {
      console.error('Gemini chat error:', error);
      let errMessage = 'Unable to reach the AI service right now. Please try again.';

      if (error instanceof Error && error.message) {
        errMessage = error.message;
        try {
          const parsed = JSON.parse(error.message) as {
            error?: { message?: string };
            message?: string;
          };
          const nested = parsed?.error?.message || parsed?.message;
          if (typeof nested === 'string' && nested.trim()) {
            errMessage = nested.trim();
          }
        } catch {
          // Keep original Error message when it is not JSON-encoded.
        }
      }

      // Return 429/500 rather than 502/503 so Cloud Run/reverse proxies do not replace JSON with an HTML gateway error page.
      const statusCode =
        errMessage.includes('503') ||
        errMessage.toLowerCase().includes('high demand') ||
        errMessage.toLowerCase().includes('quota')
          ? 429
          : 500;

      return res.status(statusCode).json({
        error: errMessage,
      });
    }
  });

  app.all('/api/*', (_req: Request, res: Response) => {
    return res.status(404).json({ error: 'API endpoint not found.' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (req: Request, res: Response, next) => {
      if (req.path.startsWith('/api/')) {
        return next();
      }
      return res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
