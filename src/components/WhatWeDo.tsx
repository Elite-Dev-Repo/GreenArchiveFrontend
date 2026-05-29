import { BookOpen, Cpu, GraduationCap, Sparkles, RefreshCw, Code2 } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

const features = [
  { icon: <BookOpen size={28} />, title: 'Nigerian History Datasets', desc: 'Curated questions spanning pre-colonial, colonial, and post-independence Nigerian history from credible academic sources.', tag: '12,000+ questions', accent: true },
  { icon: <Sparkles size={28} />, title: 'Current Affairs Engine', desc: 'AI-generated quiz questions from daily Nigerian and global news, parsed and validated in real-time every 24 hours.', tag: 'Daily updates', accent: false },
  { icon: <GraduationCap size={28} />, title: 'WAEC / JAMB Questions', desc: 'Authentic past-question bank with model answers, difficulty ratings, and year-of-exam metadata.', tag: '20+ years of data', accent: false },
  { icon: <Cpu size={28} />, title: 'AI-Generated Content', desc: 'GPT-class AI generates novel questions on demand, with factual grounding against our Nigerian knowledge base.', tag: 'On-demand generation', accent: false },
  { icon: <RefreshCw size={28} />, title: 'Realtime Quiz Updates', desc: 'Webhook-powered delivery of newly created questions to your app the moment they are validated.', tag: 'Webhook support', accent: true },
  { icon: <Code2 size={28} />, title: 'Developer API Access', desc: 'RESTful JSON API with filtering, pagination, authentication, and rate limiting built for scale from day one.', tag: 'REST + WebSocket', accent: false },
]

export default function WhatWeDo() {
  return (
    <section id="features" className="py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-ink/10 pb-12">
          <div>
            <div className="section-label mb-4">What GreenArchive Does</div>
            <h2 className="font-black-condensed text-ink" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              BUILT FOR NIGERIA.<br />
              <span className="text-lime" style={{ WebkitTextStroke: '2px #111a0e' }}>SCALED FOR ALL.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="pill-btn px-6 py-3 text-sm font-bold">See all features</button>
            <button className="arrow-btn w-12 h-12"><ArrowUpRight size={18} /></button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i}
              className={`rounded-2xl p-8 border-2 border-ink/10 group hover:border-ink/30 transition-all duration-200 cursor-default ${f.accent ? 'bg-ink text-cream' : 'bg-cream text-ink'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.accent ? 'bg-lime text-ink' : 'bg-lime text-ink'}`}>
                {f.icon}
              </div>
              <h3 className="font-black-condensed text-2xl mb-3 tracking-tight">{f.title.toUpperCase()}</h3>
              <p className={`font-body text-sm leading-relaxed mb-6 ${f.accent ? 'text-cream/65' : 'text-muted'}`}>{f.desc}</p>
              <span className={`font-body text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${f.accent ? 'bg-lime text-ink' : 'bg-ink text-cream'}`}>{f.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
