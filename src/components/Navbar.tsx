import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Features', 'API', 'Categories', 'Pricing', 'Docs']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 ${scrolled ? 'bg-cream/95 backdrop-blur-md border-b-2 border-ink/8' : ''}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px]">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center rotate-[-6deg] group-hover:rotate-0 transition-transform duration-300">
            <span className="font-black-condensed text-ink text-sm leading-none">GA</span>
          </div>
          <span className="font-black-condensed text-2xl text-ink tracking-tight">GREENARCHIVE</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => {
            if (l === 'Docs') {
              return (
                <button key={l} onClick={() => navigate('/docs')}
                  className="font-body text-sm font-semibold text-muted hover:text-ink transition-colors duration-150">
                  {l}
                </button>
              )
            }
            return (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="font-body text-sm font-semibold text-muted hover:text-ink transition-colors duration-150">
                {l}
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => navigate('/auth')} className="font-body text-sm font-semibold text-muted hover:text-ink transition-colors">Sign in</button>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate('/auth')} className="pill-btn px-5 py-2.5 text-sm">Get API Key</button>
            <button onClick={() => navigate('/auth')} className="arrow-btn w-10 h-10"><ArrowUpRight size={18} /></button>
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-ink p-1">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t-2 border-ink/10 px-6 pb-8 pt-4">
          {links.map(l => {
            if (l === 'Docs') {
              return (
                <button key={l} onClick={() => { setOpen(false); navigate('/docs') }}
                  className="block font-black-condensed text-2xl text-ink py-3 border-b border-ink/10 w-full text-left">
                  {l}
                </button>
              )
            }
            return (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="block font-black-condensed text-2xl text-ink py-3 border-b border-ink/10">
                {l}
              </a>
            )
          })}
          <button onClick={() => { setOpen(false); navigate('/auth') }} className="pill-btn w-full py-4 text-base mt-6">Get API Key →</button>
        </div>
      )}
    </nav>
  )
}
