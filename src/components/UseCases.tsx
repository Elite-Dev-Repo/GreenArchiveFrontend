import { Gamepad2, Monitor, School, Lightbulb, Dices, BookMarked, ArrowUpRight } from 'lucide-react'

const cases = [
  { icon: <Gamepad2 size={32} />, title: 'Quiz Apps', desc: 'Build engaging trivia apps with thousands of questions, leaderboards, and real-time score APIs.', dark: false },
  { icon: <Monitor size={32} />, title: 'CBT Platforms', desc: 'Get authentic WAEC/JAMB-style questions with structured metadata for computer-based testing.', dark: true },
  { icon: <School size={32} />, title: 'Schools', desc: 'Auto-generate formative assessments on Nigerian curriculum topics for students at any level.', dark: false },
  { icon: <Lightbulb size={32} />, title: 'EdTech Startups', desc: 'Launch faster — skip content creation and integrate a production-ready knowledge database.', dark: false },
  { icon: <Dices size={32} />, title: 'Trivia Games', desc: 'Multiplayer-ready endpoints with real-time question delivery for social and competitive games.', dark: true },
  { icon: <BookMarked size={32} />, title: 'Learning Platforms', desc: 'Adaptive learning systems that serve questions based on difficulty progression and weak areas.', dark: false },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-6 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-ink/10 pb-12">
          <div>
            <div className="section-label mb-4">Use Cases</div>
            <h2 className="font-black-condensed text-ink" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              ONE API.<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #111a0e' }}>INFINITE USES.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="pill-btn px-6 py-3 text-sm font-bold">Start building</button>
            <button className="arrow-btn w-12 h-12"><ArrowUpRight size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <div key={i}
              className={`rounded-2xl p-8 border-2 group hover:-translate-y-1 transition-all duration-200 cursor-default ${c.dark ? 'bg-ink border-ink text-cream' : 'bg-cream border-ink/10 hover:border-ink/30 text-ink'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${c.dark ? 'bg-lime text-ink' : 'bg-lime text-ink'}`}>
                {c.icon}
              </div>
              <h3 className="font-black-condensed text-2xl mb-3">{c.title.toUpperCase()}</h3>
              <p className={`font-body text-sm leading-relaxed mb-6 ${c.dark ? 'text-cream/60' : 'text-muted'}`}>{c.desc}</p>
              <div className={`flex items-center gap-1.5 font-body text-sm font-bold group-hover:gap-3 transition-all duration-200 ${c.dark ? 'text-lime' : 'text-ink'}`}>
                Learn more <ArrowUpRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
