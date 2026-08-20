"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function TwoFactorPage() {
  const [code, setCode] = useState("");
  const [method, setMethod] = useState<"app" | "sms">("app");

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-2xl font-display font-bold">Two-Factor Authentication</h1>
          <p className="text-gray-400 text-sm mt-1">Enter the code from your authenticator app</p>
        </div>

        <div className="glass-card space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setMethod("app")}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${method === "app" ? "bg-brand-600/20 text-brand-400" : "text-gray-400 hover:bg-white/5"}`}
            >
              Authenticator App
            </button>
            <button
              onClick={() => setMethod("sms")}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${method === "sms" ? "bg-brand-600/20 text-brand-400" : "text-gray-400 hover:bg-white/5"}`}
            >
              SMS Code
            </button>
          </div>

          {method === "app" ? (
            <div className="text-center py-4">
              <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-4">
                <div className="w-24 h-24 bg-surface-elevated rounded-lg flex items-center justify-center">
                  <Shield className="w-12 h-12 text-brand-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Scan with Google Authenticator or Authy</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 glass-card-sm">
              <Smartphone className="w-5 h-5 text-brand-400" />
              <p className="text-sm text-gray-400">Code sent to +1 (***) ***-4567</p>
            </div>
          )}

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="input-field text-center text-xl tracking-[0.5em] font-bold"
            maxLength={6}
          />

          <Link href="/dashboard" className="btn-primary w-full">Verify & Continue</Link>
        </div>
      </motion.div>
    </div>
  );
}
