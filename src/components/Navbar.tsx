import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, LogOut, User, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    setLoggedIn(false)
    navigate('/auth')
  }

  const links = ['Features', 'API', 'Categories', 'Pricing', 'Docs']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 ${loggedIn || scrolled ? 'bg-cream/95 backdrop-blur-md border-b-2 border-ink/8' : ''}`}>
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

        {/* Right side: user dropdown when logged in, sign in/CTA when logged out */}
        {loggedIn ? (
          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 font-body text-sm font-semibold text-ink bg-lime px-4 py-2 rounded-full hover:bg-lime-mid transition-colors"
            >
              <User size={16} />
              <ChevronDown size={14} />
            </button>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-cream border-2 border-ink/10 rounded-xl shadow-lg z-20 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 font-body text-sm text-ink hover:bg-lime/30 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/auth')} className="font-body text-sm font-semibold text-muted hover:text-ink transition-colors">Sign in</button>
            <div className="flex items-center gap-1">
              <button onClick={() => navigate('/auth')} className="pill-btn px-5 py-2.5 text-sm">Get API Key</button>
              <button onClick={() => navigate('/auth')} className="arrow-btn w-10 h-10"><ArrowUpRight size={18} /></button>
            </div>
          </div>
        )}

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
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 font-black-condensed text-2xl text-ink py-3 mt-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          ) : (
            <button onClick={() => { setOpen(false); navigate('/auth') }} className="pill-btn w-full py-4 text-base mt-6">Get API Key →</button>
          )}
        </div>
      )}
    </nav>
  )
}
