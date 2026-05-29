import { Newspaper, Clock, Tag, ArrowUpRight } from 'lucide-react'

const questions = [
  { q: 'Which Nigerian fintech startup raised the largest Series B in West Africa during Q1 2026?', category: 'Business', difficulty: 'Hard', source: 'Techpoint Africa', time: '2h ago', diffClass: 'bg-red-100 text-red-700' },
  { q: 'What was the outcome of the 2026 Kano governorship election rerun?', category: 'Politics', difficulty: 'Medium', source: 'Channels TV', time: '5h ago', diffClass: 'bg-yellow-100 text-yellow-700' },
  { q: "Nigeria's National Grid restored power to how many states after the May 2026 outage?", category: 'Current Affairs', difficulty: 'Easy', source: 'Vanguard', time: '8h ago', diffClass: 'bg-lime text-ink' },
  { q: 'Which Super Eagles player was named in the FIFA Best XI for 2025?', category: 'Sports', difficulty: 'Easy', source: 'SportsBrief', time: '12h ago', diffClass: 'bg-lime text-ink' },
  { q: 'What bill did the Nigerian Senate pass on digital assets taxation in 2026?', category: 'Government', difficulty: 'Hard', source: 'BusinessDay', time: '1d ago', diffClass: 'bg-red-100 text-red-700' },
  { q: 'The CBN reduced the MPR to what percentage in its May 2026 MPC meeting?', category: 'Economics', difficulty: 'Medium', source: 'NAN', time: '1d ago', diffClass: 'bg-yellow-100 text-yellow-700' },
]

export default function DailyFeed() {
  return (
    <section className="py-24 px-6 md:px-10 bg-ink">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-cream/10 pb-12">
          <div>
            <div className="flex items-center gap-2 font-body text-xs font-bold tracking-[0.18em] uppercase text-lime/70 mb-4">
              <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              Live Daily Feed
            </div>
            <h2 className="font-black-condensed text-cream" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              TODAY'S NEWS.<br />
              <span className="text-lime">ALREADY QUIZZABLE.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="pill-btn px-6 py-3 text-sm font-bold">View all</button>
            <button className="arrow-btn w-12 h-12"><ArrowUpRight size={18} /></button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q, i) => (
            <div key={i} className="bg-cream/5 border border-cream/10 rounded-2xl p-6 hover:bg-cream/8 hover:border-cream/20 transition-all duration-200 cursor-default group">
              {/* Meta */}
              <div className="flex items-center gap-2 mb-4">
                <Newspaper size={13} className="text-lime flex-shrink-0" />
                <span className="font-body text-[11px] font-semibold text-cream/40">{q.source}</span>
                <div className="ml-auto flex items-center gap-1 font-body text-[11px] text-cream/30">
                  <Clock size={10} />{q.time}
                </div>
              </div>

              {/* Question */}
              <p className="font-body text-sm text-cream/85 leading-relaxed mb-5 font-medium">{q.q}</p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="flex items-center gap-1 bg-lime/10 text-lime rounded-lg px-2.5 py-1 font-body text-[11px] font-bold">
                  <Tag size={9} />{q.category}
                </span>
                <span className={`rounded-lg px-2.5 py-1 font-body text-[11px] font-bold ${q.diffClass}`}>
                  {q.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
