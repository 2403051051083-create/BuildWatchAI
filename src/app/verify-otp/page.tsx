"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Building2, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-gradient px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-2xl font-display font-bold">Verify Your Email</h1>
          <p className="text-gray-400 text-sm mt-1">Enter the 6-digit code sent to your email</p>
        </div>

        <div className="glass-card space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold input-field !px-0"
              />
            ))}
          </div>

          <Link href="/two-factor" className="btn-primary w-full">Verify</Link>

          <p className="text-center text-sm text-gray-400">
            Didn&apos;t receive the code?{" "}
            <button className="text-brand-400 hover:text-brand-300">Resend</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
