import { useState } from 'react'
import { Check, Zap, Building2, Sparkles, ArrowUpRight } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    icon: <Zap size={24} />,
    price: '₦0',
    period: 'forever',
    desc: 'For developers exploring the API.',
    dark: false,
    cta: 'Start for free',
    features: ['100 requests / day', '3 categories', 'History & Current Affairs', 'Basic filtering', 'JSON responses', 'Community support'],
  },
  {
    name: 'Pro',
    icon: <Sparkles size={24} />,
    price: '₦15,000',
    period: 'per month',
    desc: 'For serious apps and startups.',
    dark: true,
    cta: 'Get started',
    badge: 'POPULAR',
    features: ['Unlimited requests', 'All 9 categories', 'Daily AI-generated questions', 'Advanced filtering & sorting', 'Webhook support', 'Analytics dashboard', 'Priority support', 'SDK access'],
  },
  {
    name: 'School',
    icon: <Building2 size={24} />,
    price: 'Custom',
    period: 'pricing',
    desc: 'For institutions and bulk deployments.',
    dark: false,
    cta: 'Contact sales',
    features: ['Bulk content access', 'CBT integration kit', 'WAEC / JAMB full archive', 'White-label support', 'Dedicated infrastructure', '99.9% SLA guarantee', 'Onboarding assistance'],
  },
]

export default function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="pricing" className="py-24 px-6 md:px-10 bg-lime">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-ink/20 pb-12">
          <div>
            <div className="font-body text-xs font-bold tracking-[0.18em] uppercase text-ink/50 mb-4">Pricing</div>
            <h2 className="font-black-condensed text-ink" style={{ fontSize: 'clamp(48px,6vw,80px)', lineHeight: '0.92' }}>
              START FREE.<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #111a0e' }}>SCALE WHEN READY.</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map((p, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`rounded-2xl p-8 border-2 relative overflow-hidden transition-all duration-200 ${
                p.dark
                  ? 'bg-ink border-ink text-cream'
                  : 'bg-cream border-ink/15 text-ink hover:border-ink/40'
              } ${hovered === i && !p.dark ? '-translate-y-1' : ''}`}>

              {p.badge && (
                <div className="absolute top-6 right-6 bg-lime text-ink font-black-condensed text-sm px-3 py-1 rounded-full">
                  {p.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${p.dark ? 'bg-lime text-ink' : 'bg-ink text-cream'}`}>
                {p.icon}
              </div>

              <div className="font-black-condensed text-2xl mb-1">{p.name.toUpperCase()}</div>
              <div className={`font-body text-sm mb-6 ${p.dark ? 'text-cream/55' : 'text-muted'}`}>{p.desc}</div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-black-condensed text-5xl leading-none">{p.price}</span>
                <span className={`font-body text-sm ${p.dark ? 'text-cream/45' : 'text-muted'}`}>/ {p.period}</span>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-0">
                {p.features.map((f, j) => (
                  <div key={j} className={`flex items-center gap-3 py-2.5 border-b last:border-0 ${p.dark ? 'border-cream/10' : 'border-ink/8'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${p.dark ? 'bg-lime' : 'bg-ink'}`}>
                      <Check size={11} strokeWidth={3} className={p.dark ? 'text-ink' : 'text-cream'} />
                    </div>
                    <span className={`font-body text-sm ${p.dark ? 'text-cream/75' : 'text-muted'}`}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2">
                <button className={`flex-1 rounded-full py-3.5 font-body text-sm font-bold transition-all duration-200 ${
                  p.dark ? 'bg-lime text-ink hover:bg-lime-mid' : 'bg-ink text-cream hover:bg-ink/80'
                }`}>
                  {p.cta}
                </button>
                <button className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  p.dark ? 'bg-lime text-ink hover:bg-lime-mid' : 'bg-ink text-cream hover:bg-ink/80'
                }`}>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-center text-sm text-ink/50 mt-8 font-medium">
          All prices in Nigerian Naira (₦). Annual billing saves 20%.
        </p>
      </div>
    </section>
  )
}
