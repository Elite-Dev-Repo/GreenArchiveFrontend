import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-24 pb-16 overflow-hidden">

      {/* Background decorative dots */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle, #a8e63d 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Floating accent shapes */}
     
     
      <div className="hidden lg:block absolute bottom-[26%] left-[5%] animate-float-c">
        <div className="bg-ink text-cream rounded-2xl p-4 shadow-xl">
          <div className="font-body text-[11px] font-bold text-lime/70 uppercase tracking-widest mb-1">Weekly Update</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-body text-sm font-bold">New questions</span>
          </div>
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-[24%] right-[6%] animate-float-a" style={{ animationDelay: '2s' }}>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-[1100px] mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-ink text-lime rounded-full px-4 py-2 mb-10 text-xs font-bold tracking-widest uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
          Nigeria's First Educational Knowledge API
        </div>

        {/* Giant headline */}
        <h1 className="font-black-condensed text-ink leading-none mb-0" style={{ fontSize: 'clamp(64px, 13vw, 130px)', lineHeight: '0.88', letterSpacing: '-0.02em' }}>
          GREEN
          <span className="relative inline-block mx-3 align-middle" style={{ fontSize: '0.55em', verticalAlign: 'middle' }}>
            <span className="bg-lime rounded-xl inline-flex items-center justify-center px-3 py-2" style={{ transform: 'rotate(-4deg)', display: 'inline-block' }}>
              <ArrowUpRight className="text-ink" style={{ width: '1em', height: '1em' }} strokeWidth={3} />
            </span>
          </span>
          ARCHIVE
        </h1>

        {/* Sub headline */}
        <div className="font-black-condensed text-ink/25 mt-3 mb-8" style={{ fontSize: 'clamp(20px, 4vw, 38px)', letterSpacing: '0.04em' }}>
          THE NIGERIAN KNOWLEDGE INFRASTRUCTURE
        </div>

        <p className="font-body text-muted text-lg font-medium max-w-[560px] mx-auto mb-12 leading-relaxed">
          AI-powered Nigerian history and current affairs API for quiz apps, CBT platforms, schools, and educational games.
        </p>

        {/* CTA row */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <button onClick={() => navigate('/auth')} className="pill-btn px-8 py-4 text-base font-bold">Explore the API</button>
            <button onClick={() => navigate('/auth')} className="arrow-btn w-14 h-14"><ArrowUpRight size={22} /></button>
          </div>
          <button onClick={() => navigate('/docs')} className="font-body text-base font-bold text-ink border-2 border-ink/20 rounded-full px-8 py-4 hover:border-ink/50 hover:bg-ink/5 transition-all duration-200">
            View Docs
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-10 justify-center mt-16 flex-wrap">
          {[
            { val: '50K+', label: 'Questions' },
            { val: '9', label: 'Categories' },
            { val: '90%', label: 'Accuracy' },
            { val: 'Weekly', label: 'AI Updates' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-black-condensed text-ink text-5xl leading-none mb-1">{s.val}</div>
              <div className="font-body text-xs font-semibold text-muted uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
