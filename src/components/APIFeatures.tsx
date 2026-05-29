import { useState } from 'react'
import { Copy, CheckCheck, ChevronRight } from 'lucide-react'

const endpoints = [
  {
    method: 'GET', path: '/questions/?category=history', desc: 'Fetch Nigerian history questions',
    response: `{
  "status": "success",
  "count": 10,
  "data": [
    {
      "id": 241,
      "question": "The Berlin West Africa Conference result placed which territory under British influence?",
      "option_a": "Nigeria",
      "option_b": "Cameroon",
      "option_c": "Ghana",
      "option_d": "Sierra Leone",
      "correct_answer": "A",
      "category": "history",
      "difficulty": "hard",
      "source": "General Knowledge",
  },
  ]
}`,
  },
  {
    method: 'GET', path: '/questions/?category=current-affairs', desc: 'Latest current affairs',
    response: `{
  "status": "success",
  "generated_at": "2026-05-22T08:00:00Z",
  "data": [
    {
      "id": 231,
      "question": "Aliko Dangote's net worth has made him consistently one of the richest people in which category?",
      "option_a": "Africa",
      "option_b": "Sub-Saharan Africa only",
      "option_c": "The Arab world",
      "option_d": "The whole world",
      "correct_answer": "A",
      "category": "current_affairs",
      "difficulty": "easy",
      "source": "General Knowledge"
  },
  ]
}`,
  },
  {
    method: 'POST', path: '/generate', desc: 'AI-generate custom questions on demand',
    response: `{
  "status": "success",
  "request": {
    "topic": "Niger Delta conflict",
    "count": 5,
    "difficulty": "hard"
  },
  "data": [
    {
      "id": "ai_gen_7721",
      "question": "What year did MEND emerge as a militant group?",
      "answer": "2006",
      "ai_generated": true,
      "confidence": 0.97
    }
  ]
}`,
  },
]

function highlight(json: string) {
  return json
    .replace(/"([^"]+)":/g, '<span style="color:#a8e63d">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span style="color:#f9a8d4">"$1"</span>')
    .replace(/: (true|false)/g, ': <span style="color:#60a5fa">$1</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span style="color:#fbbf24">$1</span>')
}

const methodStyle: Record<string, string> = {
  GET: 'bg-lime text-ink',
  POST: 'bg-blue-400 text-white',
}

export default function APIFeatures() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(endpoints[active].response)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="api" className="py-24 px-6 md:px-10 bg-ink">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-cream/10 pb-12">
          <div>
            <div className="font-body text-xs font-bold tracking-[0.18em] uppercase text-lime/70 mb-4">API Features</div>
            <h2 className="font-black-condensed text-cream" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              POWERFUL ENDPOINTS.<br />
              <span className="text-lime">DEAD SIMPLE.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">

          {/* Endpoint list */}
          <div className="flex flex-col gap-3">
            {endpoints.map((ep, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`text-left rounded-2xl p-5 border transition-all duration-200 cursor-pointer ${active === i ? 'bg-lime border-lime' : 'bg-cream/5 border-cream/10 hover:border-cream/25'}`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full ${active === i ? 'bg-ink text-cream' : methodStyle[ep.method]}`}>{ep.method}</span>
                  <span className={`font-mono text-[12px] ${active === i ? 'text-ink' : 'text-cream/70'}`}>{ep.path}</span>
                  {active === i && <ChevronRight size={14} className="ml-auto text-ink" />}
                </div>
                <div className={`font-body text-[13px] ${active === i ? 'text-ink/70' : 'text-cream/40'}`}>{ep.desc}</div>
              </button>
            ))}

            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-5">
              <div className="font-body text-[10px] font-bold tracking-widest text-lime uppercase mb-3">Authentication</div>
              <div className="font-mono text-[12px] text-cream/55 bg-black/30 rounded-xl p-3 leading-loose">
                Authorization: Bearer {'<YOUR_KEY>'}<br />
                X-GreenArchive-Version: 1
              </div>
            </div>
          </div>

          {/* Code panel */}
          <div className="bg-[#0a0f08] border border-cream/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream/10">
              <div className="flex gap-1.5">
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ background: c }} className="w-3 h-3 rounded-full" />)}
              </div>
              <span className="font-mono text-[12px] text-cream/30">Response · JSON</span>
              <button onClick={copy} className={`flex items-center gap-1.5 font-body text-[12px] font-semibold transition-colors ${copied ? 'text-lime' : 'text-cream/30 hover:text-cream/60'}`}>
                {copied ? <><CheckCheck size={12} />Copied</> : <><Copy size={12} />Copy</>}
              </button>
            </div>
            <pre className="font-mono text-[12px] leading-[1.9] text-cream/70 p-6 whitespace-pre-wrap break-words max-h-[420px] m-0">
              <code dangerouslySetInnerHTML={{ __html: highlight(endpoints[active].response) }} />
            </pre>
          </div>
        </div>

        {/* Pills */}
        <div className="flex gap-3 mt-10 flex-wrap">
          {['REST API','WebSocket','Rate Limiting','Filtering','Pagination','Webhooks','SDK Support','Multiplayer Ready'].map(p => (
            <span key={p} className="bg-cream/8 border border-cream/15 rounded-full px-4 py-2 font-body text-[13px] font-semibold text-cream/60">{p}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
