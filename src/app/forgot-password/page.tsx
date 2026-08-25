"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!isSupabaseConfigured) {
      setLoading(false);
      setError("Supabase is not configured. Add the Supabase URL and anon key first.");
      return;
    }

    if (method === "email") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(identifier, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) {
        setError(resetError.message);
      } else {
        setSent(true);
      }
    } else if (!code) {
      const { error: otpError } = await supabase.auth.signInWithOtp({ phone: identifier });
      if (otpError) {
        setError(otpError.message);
      } else {
        setSent(true);
      }
    } else {
      const { error: verifyError } = await supabase.auth.verifyOtp({ phone: identifier, token: code, type: "sms" });
      if (verifyError) {
        setError(verifyError.message);
      } else {
        setVerified(true);
        window.location.assign("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Building2 className="w-5 h-5" />
            </div>
          </Link>
          <h1 className="text-2xl font-display font-bold">Reset Password</h1>
          <p className="text-gray-400 text-sm mt-1">
            {verified ? "Phone verified" : sent && method === "email" ? "Check your email for reset instructions" : sent ? "Enter the code sent to your phone" : "Recover access with your email or phone"}
          </p>
        </div>

        <div className="glass-card space-y-4">
          {!sent && !verified ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setMethod("email"); setSent(false); }} className={`py-2 rounded-lg text-sm ${method === "email" ? "bg-brand-600/20 text-brand-400" : "text-gray-400"}`}>Email</button>
                <button type="button" onClick={() => { setMethod("phone"); setSent(false); }} className={`py-2 rounded-lg text-sm ${method === "phone" ? "bg-brand-600/20 text-brand-400" : "text-gray-400"}`}>Phone</button>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input required type={method === "email" ? "email" : "tel"} value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder={method === "email" ? "Email address" : "+1 555 123 4567"} className="input-field !pl-10" />
              </div>
              {error && <p className="text-xs text-status-danger">{error}</p>}
              <button disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? "Sending..." : method === "email" ? "Send Reset Email" : "Send SMS Code"}</button>
            </form>
          ) : sent && method === "phone" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="6-digit SMS code" className="input-field text-center tracking-[0.4em]" />
              {error && <p className="text-xs text-status-danger">{error}</p>}
              <button disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? "Verifying..." : "Verify Code"}</button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-status-success/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-status-success" />
              </div>
              <p className="text-sm text-gray-400">We&apos;ve sent password reset instructions to your email.</p>
            </div>
          )}
          <Link href="/login" className="btn-ghost w-full !justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
