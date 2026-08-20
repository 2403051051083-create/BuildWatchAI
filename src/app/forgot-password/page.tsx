"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

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
            {sent ? "Check your email for reset instructions" : "Enter your email to receive a reset link"}
          </p>
        </div>

        <div className="glass-card space-y-4">
          {!sent ? (
            <>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" placeholder="Email address" className="input-field !pl-10" />
              </div>
              <button onClick={() => setSent(true)} className="btn-primary w-full">Send Reset Link</button>
            </>
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
