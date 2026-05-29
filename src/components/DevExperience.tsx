import { Terminal, Shield, Gauge, RefreshCw, Book, Globe } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

const devFeatures = [
  { icon: <Terminal size={22} />, title: 'Simple REST API', desc: 'Clean, predictable JSON endpoints with full error codes and status responses.' },
  { icon: <Shield size={22} />, title: 'Secure by Default', desc: 'Bearer token auth, HTTPS-only, per-key rate limiting out of the box.' },
  { icon: <Gauge size={22} />, title: 'Sub-100ms Responses', desc: 'Edge-cached responses globally ensure your users never wait.' },
  { icon: <RefreshCw size={22} />, title: 'Webhook Events', desc: 'Subscribe to new-question events and refresh content without polling.' },
  { icon: <Book size={22} />, title: 'Rich Documentation', desc: 'Interactive API explorer, code examples in 6 languages, and guides.' },
  { icon: <Globe size={22} />, title: 'SDK Support', desc: 'Official SDKs for JavaScript, Python, and PHP with TypeScript types.' },
]

const code = `// JavaScript SDK
import GreenArchive from '@greenarchive/sdk'

const ga = new GreenArchive({
  apiKey: process.env.GA_API_KEY
})

// Fetch 10 WAEC history questions
const questions = await ga.questions.list({
  category: 'history',
  difficulty: 'medium',
  limit: 10,
  exam_type: 'WAEC',
})

// Stream daily current affairs
ga.events.on('new_questions', (batch) => {
  console.log(\`New: \${batch.count} questions!\`)
  db.questions.insertMany(batch.data)
})`

function highlight(c: string) {
  return c
    .replace(/(\/\/.+)/g, '<span style="color:#a8e63d80">$1</span>')
    .replace(/\b(import|from|const|await|new|process)\b/g, '<span style="color:#a8e63d">$1</span>')
    .replace(/\b(async|on)\b/g, '<span style="color:#c084fc">$1</span>')
    .replace(/('[^']*')/g, '<span style="color:#f9a8d4">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#fbbf24">$1</span>')
}

export default function DevExperience() {
  return (
    <section id="developers" className="py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-ink/10 pb-12">
          <div>
            <div className="section-label mb-4">Developer Experience</div>
            <h2 className="font-black-condensed text-ink" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              BUILT FOR DEVS<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #111a0e' }}>WHO SHIP FAST.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="pill-btn px-6 py-3 text-sm font-bold">Read the docs</button>
            <button className="arrow-btn w-12 h-12"><ArrowUpRight size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {devFeatures.map((f, i) => (
              <div key={i} className="flex gap-4 items-start p-5 rounded-2xl border-2 border-ink/8 hover:border-ink/20 hover:bg-ink/3 transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-lime flex items-center justify-center text-ink flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="font-black-condensed text-ink text-lg mb-1">{f.title.toUpperCase()}</div>
                  <div className="font-body text-xs text-muted leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — code panel */}
          <div className="bg-ink rounded-2xl overflow-hidden border-2 border-ink">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream/10">
              <div className="flex gap-2">
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ background: c }} className="w-3 h-3 rounded-full" />
                ))}
              </div>
              <span className="font-mono text-[12px] text-cream/30">index.ts</span>
              <div className="w-16" />
            </div>
            <pre className="font-mono text-[12.5px] leading-[1.9] text-cream/70 p-6 overflow-x-auto m-0 max-h-[420px]">
              <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
            </pre>
          </div>

        </div>
      </div>
    </section>
  )
}
