import { useState, useEffect } from "react";
import { Menu, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api";
import { login } from "../lib/data";

interface Section {
  id: string;
  title: string;
  endpoints: Endpoint[];
}

interface Endpoint {
  method: "GET" | "POST";
  path: string;
  auth: string;
  desc: string;
  reqBody?: string;
  resBody: string;
  tryIt?: () => Promise<unknown>;
}

const SECTIONS: Section[] = [
  {
    id: "authentication",
    title: "Authentication",
    endpoints: [
      {
        method: "POST", path: "/token/", auth: "—",
        desc: "Login — returns a JWT access/refresh token pair.",
        reqBody: JSON.stringify({ email: "user@example.com", password: "••••••••" }, null, 2),
        resBody: JSON.stringify({ access: "eyJ...", refresh: "eyJ..." }, null, 2),
        tryIt: async () => {
          const { access, refresh } = await login({ username: "demo", password: "demo1234" });
          return { access, refresh };
        },
      },
      {
        method: "POST", path: "/token/refresh/", auth: "—",
        desc: "Refresh an expired access token using a valid refresh token.",
        reqBody: JSON.stringify({ refresh: "eyJ..." }, null, 2),
        resBody: JSON.stringify({ access: "eyJ..." }, null, 2),
      },
    ],
  },
  {
    id: "questions",
    title: "Questions",
    endpoints: [
      {
        method: "GET", path: "/questions/?category=&difficulty=", auth: "Api-Key <key>",
        desc: "List questions. Filter by category (history, politics, sports, culture, government, current_affairs) and/or difficulty (easy, medium, hard). Both parameters are optional and can be combined — e.g. /questions/?category=history&difficulty=hard.",
        resBody: JSON.stringify([
          {
            id: 1,
            question: "What is the primary greenhouse gas responsible for global warming?",
            option_a: "Oxygen",
            option_b: "Carbon dioxide",
            option_c: "Nitrogen",
            option_d: "Hydrogen",
            correct_answer: "B",
            category: "current_affairs",
            difficulty: "easy",
            source: "EPA.gov",
            created_at: "2026-05-29T16:10:19.716967Z"
          }
        ], null, 2),
        tryIt: async () => {
          const key = prompt("Enter your API key:");
          if (!key) throw new Error("API key required");
          const { data } = await api.get("/questions/", { headers: { Authorization: `Api-Key ${key}` } });
          return data;
        },
      },
    ],
  },
  // {
  //   id: "news",
  //   title: "News",
  //   endpoints: [
  //     {
  //       method: "GET", path: "/news/", auth: "Api-Key <key>",
  //       desc: "List environmental news articles.",
  //       resBody: JSON.stringify([{ id: 1, title: "...", url: "...", source: "..." }], null, 2),
  //       tryIt: async () => {
  //         const key = prompt("Enter your API key:");
  //         if (!key) throw new Error("API key required");
  //         const { data } = await api.get("/news/", { headers: { Authorization: `Api-Key ${key}` } });
  //         return data;
  //       },
  //     },
  //   ],
  // },
];

function MethodBadge({ method }: { method: "GET" | "POST" }) {
  const colors = { GET: "bg-emerald-100 text-emerald-700", POST: "bg-amber-100 text-amber-700" };
  return (
    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${colors[method]}`}>
      {method}
    </span>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trying, setTrying] = useState<string | null>(null);
  const [liveResult, setLiveResult] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTryIt = async (id: string, endpoint: Endpoint) => {
    if (!endpoint.tryIt) return;
    setTrying(id);
    setLiveResult(null);
    try {
      const data = await endpoint.tryIt();
      setLiveResult(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      const msg = (err as Error).message || "Request failed";
      toast.error(msg);
      setLiveResult(msg);
    } finally {
      setTrying(null);
    }
  };

  return (
    <div className="flex gap-8 relative">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-12 h-12 bg-lime rounded-full flex items-center justify-center shadow-lg"
      >
        <Menu size={22} className="text-ink" />
      </button>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-cream border-r-2 border-ink/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black-condensed text-xl text-ink">DOCS</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-ink p-1">
                <X size={22} />
              </button>
            </div>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setSidebarOpen(false); }}
                className={`block w-full text-left font-body text-sm py-2.5 px-3 rounded-lg transition-colors ${activeSection === s.id ? "bg-lime font-bold text-ink" : "text-muted hover:text-ink"}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <aside className="hidden md:block w-56 shrink-0 sticky top-[88px] self-start">
        <nav className="space-y-1">
          <h3 className="font-black-condensed text-lg text-ink mb-4">DOCS</h3>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`block w-full text-left font-body text-sm py-2 px-3 rounded-lg transition-colors ${activeSection === s.id ? "bg-lime font-bold text-ink" : "text-muted hover:text-ink"}`}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        {SECTIONS.filter((s) => s.id === activeSection).map((section) => (
          <div key={section.id}>
            <h2 className="font-black-condensed text-display text-ink mb-2">{section.title}</h2>
            <p className="font-body text-muted mb-8">
              {section.id === "authentication" && "How to authenticate with the GreenArchive API."}
              {section.id === "questions" && "Retrieve environmental questions with optional category and difficulty filters."}
              {section.id === "news" && "Fetch the latest environmental news articles."}
              {section.id === "api-keys" && "Manage your API keys programmatically."}
            </p>



            <div className="space-y-8">
              {section.endpoints.map((ep, i) => {
                const id = `${section.id}-${i}`;
                return (
                  <div key={i} className="card-outline p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MethodBadge method={ep.method} />
                      <code className="font-mono text-sm text-ink font-medium break-all">{ep.path}</code>
                    </div>
                    <p className="font-body text-sm text-muted mb-4">{ep.desc}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-body text-xs font-bold text-muted uppercase tracking-wider">Auth:</span>
                      <code className="font-mono text-xs bg-ink/5 px-2 py-0.5 rounded text-muted">{ep.auth}</code>
                    </div>

                    {ep.reqBody && (
                      <div className="mb-4">
                        <h4 className="font-body text-xs font-bold text-muted uppercase tracking-wider mb-2">Request Body</h4>
                        <pre className="bg-ink text-lime-mid rounded-xl p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                          {ep.reqBody}
                        </pre>
                      </div>
                    )}

                    <div>
                      <h4 className="font-body text-xs font-bold text-muted uppercase tracking-wider mb-2">Response</h4>
                      <pre className="bg-ink text-lime-mid rounded-xl p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                        {ep.resBody}
                      </pre>
                    </div>

                    {ep.tryIt && (
                      <div className="mt-4">
                        <button
                          onClick={() => handleTryIt(id, ep)}
                          disabled={trying === id}
                          className="pill-btn px-5 py-2.5 text-sm flex items-center gap-2 disabled:opacity-50"
                        >
                          {trying === id ? <Loader2 size={16} className="animate-spin" /> : null}
                          Try it out
                        </button>
                        {liveResult && trying !== id && (
                          <pre className="mt-3 bg-ink text-lime-mid rounded-xl p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                            {liveResult}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
