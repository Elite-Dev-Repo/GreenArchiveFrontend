  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import toast from "react-hot-toast";
  import { Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
  import { login, signup } from "../lib/data";
  import GoogleAuthButton from "../components/GoogleAuthButton";
  import { GoogleOAuthProvider } from '@react-oauth/google';


  type Mode = "login" | "signup";

  interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
    const [form, setForm] = useState<FormData>({ username: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const navigate = useNavigate();

    const update = (field: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = (): boolean => {
      const e: Partial<FormData> = {};
      if (!form.username.trim()) e.username = "Username is required";
      if (!form.password || form.password.length < 8) e.password = "At least 8 characters";
      if (mode === "signup") {
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
        if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
      }
      setErrors(e);
      return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setLoading(true);
      try {
        if (mode === "login") {
          await login({ username: form.username, password: form.password });
        } else {
          await signup({ username: form.username, email: form.email, password: form.password });
        }
        toast.success(mode === "login" ? "Welcome back!" : "Account created!");
        navigate("/apikeys");
      } catch (err: unknown) {
        const error = err as { response?: { data?: { detail?: string; message?: string } } };
        toast.error(error.response?.data?.detail || error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const switchMode = () => {
      setMode(mode === "login" ? "signup" : "login");
      setErrors({});
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    };

    return (
      <div className="min-h-screen bg-cream flex">
        <div className="hidden md:flex w-1/2 bg-lime/20 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-lime rounded-2xl flex items-center justify-center mx-auto rotate-[-6deg] mb-6">
              <span className="font-black-condensed text-ink text-3xl">GA</span>
            </div>
            <h2 className="font-black-condensed text-display text-ink leading-none">GREENARCHIVE</h2>
            <p className="font-body text-muted mt-4 text-lg">
              Your gateway to structured environmental data — questions, news, and insights at your fingertips.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <h1 className="font-black-condensed text-heading text-ink">
              {mode === "login" ? "SIGN IN" : "SIGN UP"}
            </h1>
            <p className="font-body text-muted mt-2 mb-8">
              {mode === "login" ? "Welcome back to GreenArchive" : "Create your GreenArchive account"}
            </p>

            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleAuthButton mode={mode} />
            </GoogleOAuthProvider>


            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ink/10" /></div>
              <div className="relative flex justify-center"><span className="bg-cream px-4 font-body text-xs text-muted">OR</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-xs font-bold text-muted uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                  className="w-full mt-1.5 px-4 py-3 bg-white border-2 border-ink/10 rounded-xl font-body text-ink placeholder:text-muted/50 focus:outline-none focus:border-lime transition-colors"
                  placeholder="Your username"
                />
                {errors.username && <p className="font-body text-xs text-red-500 mt-1">{errors.username}</p>}
              </div>

              {mode === "signup" && (
                <div>
                  <label className="font-body text-xs font-bold text-muted uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 bg-white border-2 border-ink/10 rounded-xl font-body text-ink placeholder:text-muted/50 focus:outline-none focus:border-lime transition-colors"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              )}

              <div>
                <label className="font-body text-xs font-bold text-muted uppercase tracking-wider">Password</label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-white border-2 border-ink/10 rounded-xl font-body text-ink placeholder:text-muted/50 focus:outline-none focus:border-lime transition-colors"
                    placeholder="Min. 8 characters"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="font-body text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              {mode === "signup" && (
                <div>
                  <label className="font-body text-xs font-bold text-muted uppercase tracking-wider">Confirm Password</label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 bg-white border-2 border-ink/10 rounded-xl font-body text-ink placeholder:text-muted/50 focus:outline-none focus:border-lime transition-colors"
                    placeholder="Repeat password"
                  />
                  {errors.confirmPassword && <p className="font-body text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full pill-btn py-3.5 font-body font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="font-body text-sm text-muted text-center mt-6">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={switchMode} className="font-bold text-ink underline hover:text-lime-dark transition-colors">
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
