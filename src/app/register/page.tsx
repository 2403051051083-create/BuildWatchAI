"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("Project Manager");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName || !email || password.length < 6 || !company || !accepted) {
      setError("Please complete all fields and accept the Terms of Service.");
      return;
    }

    setError("");
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, company, role } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (!signInError) {
      router.replace("/dashboard");
      return;
    }

    setLoading(false);
    setError("Account created, but direct login is disabled. In Supabase, open Authentication > Providers > Email and turn off Confirm email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl">BuildWatch AI</span>
          </Link>
          <h1 className="text-2xl font-display font-bold">Create your account</h1>
          <p className="text-gray-400 text-sm mt-1">Start monitoring your construction sites</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary !py-2.5 text-sm">Google</button>
            <button className="btn-secondary !py-2.5 text-sm">Microsoft</button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-surface-card px-2 text-gray-500">or register with email</span></div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Full Name" className="input-field !pl-10" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="input-field !pl-10" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password (6+ characters)" className="input-field !pl-10 !pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <input type="text" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company name" className="input-field" />
            <select value={role} onChange={(event) => setRole(event.target.value)} className="input-field">
              <option>Project Manager</option>
              <option>Site Engineer</option>
              <option>Safety Officer</option>
              <option>Viewer</option>
            </select>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-400">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="rounded border-white/20 mt-1" />
            I agree to the Terms of Service and Privacy Policy
          </label>

          {error && <p className="text-xs text-status-danger">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-400 hover:text-brand-300">Sign In</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
