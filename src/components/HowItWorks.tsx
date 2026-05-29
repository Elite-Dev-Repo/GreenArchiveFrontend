import { Rss, Cpu, ShieldCheck, Zap, Smartphone } from 'lucide-react'

const steps = [
  { icon: <Rss size={28} />, num: '01', label: 'News Sources', desc: 'Nigerian outlets, government sites & academic publishers feed our data pipeline.' },
  { icon: <Cpu size={28} />, num: '02', label: 'AI Processing', desc: 'LLMs extract facts, generate questions and candidate answers at scale.' },
  { icon: <ShieldCheck size={28} />, num: '03', label: 'Validation', desc: 'Human + automated fact-checking against our verified knowledge base.' },
  { icon: <Zap size={28} />, num: '04', label: 'Quiz API', desc: 'Served via REST endpoints with sub-100ms response times globally.' },
  { icon: <Smartphone size={28} />, num: '05', label: 'Apps & Schools', desc: 'Your quiz app, CBT platform, or educational game ships to users.' },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-10 bg-lime">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b-2 border-ink/20 pb-12">
          <div>
            <div className="font-body text-xs font-bold tracking-[0.18em] uppercase text-ink/50 mb-4">How It Works</div>
            <h2 className="font-black-condensed text-ink" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              NEWS TO QUIZ<br />IN MINUTES.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+8px)] w-4 h-0.5 bg-ink/25 z-10" />
              )}
              <div className="bg-ink rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform duration-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-lime">{s.icon}</div>
                  <span className="font-black-condensed text-lime/30 text-4xl leading-none">{s.num}</span>
                </div>
                <div className="font-black-condensed text-cream text-xl mb-3">{s.label.toUpperCase()}</div>
                <p className="font-body text-sm text-cream/55 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
