import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowUp, Zap, GitBranch, MessageCircle, Link2 } from 'lucide-react'

const footerCols = [
  { title: 'Product', links: [
    { label: 'Features', href: '#features' },
    { label: 'API Reference', href: '#api' },
    { label: 'Categories', href: '#categories' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
  ]},
  { title: 'Developers', links: [
    { label: 'Documentation', href: '/docs' },
    { label: 'SDK', href: '#' },
    { label: 'API Status', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Examples', href: '#' },
  ]},
  { title: 'Company', links: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ]},
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-ink text-cream px-6 md:px-10 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto">

        {/* CTA Banner */}
        <div className="bg-lime rounded-2xl md:rounded-3xl px-8 md:px-14 py-14 md:py-20 mb-20 relative overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #111a0e 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="font-body text-xs font-bold tracking-[0.18em] uppercase text-ink/50 mb-4">Ready to build?</div>
              <h2 className="font-black-condensed text-ink mb-4" style={{ fontSize: 'clamp(40px,5.5vw,72px)', lineHeight: '0.92' }}>
                BUILD WITH NIGERIAN<br />INTELLIGENCE.
              </h2>
              <p className="font-body text-ink/60 text-base font-medium leading-relaxed">
                Join 500+ developers already building the future of Nigerian education.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/apikeys')} className="bg-ink text-cream rounded-full px-7 py-4 font-body text-sm font-bold hover:bg-ink/80 transition-colors duration-200">
                  Get your API key
                </button>
                <button onClick={() => navigate('/apikeys')} className="w-14 h-14 bg-ink text-cream rounded-full flex items-center justify-center hover:bg-ink/80 transition-colors duration-200">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <button onClick={() => navigate('/docs')} className="font-body text-sm font-bold text-ink/60 border-2 border-ink/20 rounded-full px-7 py-4 hover:border-ink/40 transition-colors duration-200">
                Read the docs
              </button>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-lime rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-ink" />
              </div>
              <span className="font-black-condensed text-2xl text-cream tracking-tight">GREENARCHIVE</span>
            </div>
            <p className="font-body text-sm text-cream/45 leading-relaxed max-w-[260px] mb-8">
              Nigeria's premier educational knowledge API. Powering quizzes, CBT platforms, and learning apps across Africa.
            </p>
            <div className="flex gap-3">
              {[<GitBranch size={16} />, <MessageCircle size={16} />, <Link2 size={16} />].map((icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 rounded-xl bg-cream/8 border border-cream/10 flex items-center justify-center text-cream/40 hover:text-lime hover:border-lime/30 transition-all duration-200">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {footerCols.map(col => (
            <div key={col.title}>
              <div className="font-black-condensed text-cream/40 text-sm tracking-widest mb-5">{col.title.toUpperCase()}</div>
              <div className="space-y-1">
                {col.links.map(l => (
                  l.href.startsWith('/')
                    ? <button key={l.label} onClick={() => navigate(l.href)}
                        className="block font-body text-sm text-cream/50 py-1.5 hover:text-cream transition-colors duration-150 font-medium">
                        {l.label}
                      </button>
                    : <a key={l.label} href={l.href}
                        className="block font-body text-sm text-cream/50 py-1.5 hover:text-cream transition-colors duration-150 font-medium">
                        {l.label}
                      </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-cream/10">
          <div className="font-body text-sm text-cream/30 font-medium">
            © 2026 GreenArchive. Built in Nigeria 🇳🇬
          </div>
          <div className="font-black-condensed text-cream/20 tracking-widest text-sm">
            POWERED BY AFRICAN INTELLIGENCE
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center text-ink hover:scale-110 transition-transform duration-200">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
