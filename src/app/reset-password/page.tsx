"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 6 || password !== confirmation) {
      setError(password.length < 6 ? "Password must be at least 6 characters." : "Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6"><div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow"><Building2 className="w-5 h-5" /></div><span className="font-display font-bold text-xl">BuildWatch AI</span></Link>
          <h1 className="text-2xl font-display font-bold">Create a new password</h1>
          <p className="text-gray-400 text-sm mt-1">Choose a strong password for your account</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card space-y-4">
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" /><input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="New password" className="input-field !pl-10" /></div>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" /><input required type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Confirm new password" className="input-field !pl-10" /></div>
          {error && <p className="text-xs text-status-danger">{error}</p>}
          {saved && <p className="text-xs text-status-success">Password updated. Redirecting...</p>}
          <button disabled={loading || saved} className="btn-primary w-full disabled:opacity-50">{loading ? "Updating..." : "Update Password"}</button>
        </form>
      </motion.div>
    </div>
  );
}