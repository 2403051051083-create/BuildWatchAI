"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Building2, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notice, setNotice] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const registeredEmail = params.get("registered");
    if (registeredEmail) {
      setEmail(registeredEmail);
    }
    if (params.get("confirmation") === "required") {
      setNotice("Account created. Check your email and confirm it before signing in.");
    }
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    if (!isSupabaseConfigured) {
      setLoading(false);
      setErrors({ password: "Supabase is not configured. Check the URL and anon key in .env.local." });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      const errorMessage = error.message.toLowerCase();
      setErrors({
        password: errorMessage.includes("invalid path") || errorMessage.includes("failed to fetch")
          ? "Supabase Auth is unavailable. Verify that your Supabase project URL is active."
          : errorMessage.includes("email not confirmed")
          ? "Please confirm your email address before signing in."
          : errorMessage.includes("invalid login credentials")
          ? "Invalid Id and Password, Please Try Again!"
          : error.message,
      });
      return;
    }
    setLoading(false);
    setSuccess(true);
    const nextPath = new URLSearchParams(window.location.search).get("next");
    router.replace(nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl">BuildWatch AI</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your monitoring dashboard</p>
        </div>

        <div className="glass-card space-y-4">
          {notice && <p className="text-xs text-status-success">{notice}</p>}


          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="Email address"
                  className={cn("input-field !pl-10", errors.email && "border-status-danger/50 focus:ring-status-danger/30")}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-status-danger mt-1 pl-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="Password"
                  className={cn("input-field !pl-10 !pr-10", errors.password && "border-status-danger/50 focus:ring-status-danger/30")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-status-danger mt-1 pl-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20" /> Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={cn(
                "btn-primary w-full transition-all",
                (loading || success) && "opacity-90 cursor-not-allowed"
              )}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Verified!
                  </motion.span>
                ) : loading ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Sign In
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-brand-400 hover:text-brand-300 transition-colors">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
