import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Menu, X, LogOut, User, ChevronDown, Key, FileText } from "lucide-react";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/auth");
  };

  const navLinks = [
    { to: "/apikeys", label: "API Keys", icon: Key },
    { to: "/docs", label: "Docs", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b-2 border-ink/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px] px-6 md:px-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center rotate-[-6deg] group-hover:rotate-0 transition-transform duration-300">
              <span className="font-black-condensed text-ink text-sm leading-none">GA</span>
            </div>
            <span className="font-black-condensed text-2xl text-ink tracking-tight">GREENARCHIVE</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-body text-sm font-semibold text-muted hover:text-ink transition-colors duration-150 flex items-center gap-2"
              >
                <l.icon size={16} />
                {l.label}
              </Link>
            ))}
          </div>

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

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-ink p-1">
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-cream border-t-2 border-ink/10 px-6 pb-8 pt-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 font-black-condensed text-2xl text-ink py-3 border-b border-ink/10"
              >
                <l.icon size={20} />
                {l.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 font-black-condensed text-2xl text-ink py-3 mt-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="pt-[88px] px-6 md:px-10 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
