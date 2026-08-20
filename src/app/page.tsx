"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, ArrowRight, Play, Video, Box, Brain, Shield,
  Truck, Package, ChevronDown, Star, Check, Mail, Phone, MapPin,
} from "lucide-react";
import {
  landingFeatures, pricingPlans, testimonials, faqs,
} from "@/lib/mock-data";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video, Box, Brain, Shield, Truck, Package,
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="site-nav">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-glow">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg">BuildWatch AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#digital-twin" className="hover:text-white transition-colors">3D Twin</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">Login</Link>
            <Link href="/register" className="btn-primary !py-2 !px-4 text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-30"
            poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-and-workers-4993-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay" />
          <div className="absolute inset-0 mesh-gradient opacity-60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 glass-card-sm !py-1.5 !px-4 mb-8 text-sm text-brand-400">
              <span className="live-indicator" />
              AI-Powered Construction Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-balance">
              Build the Future with{" "}
              <span className="gradient-text">AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-balance">
              Monitor every brick, every worker, every machine, and every milestone from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="btn-primary text-base !px-8 !py-4">
                <Play className="w-5 h-5" /> Live Demo
              </Link>
              <Link href="/register" className="btn-secondary text-base !px-8 !py-4">
                Start Monitoring <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: "500+", label: "Projects Monitored" },
              { value: "99.7%", label: "Uptime SLA" },
              { value: "40%", label: "Safety Improvement" },
              { value: "24/7", label: "AI Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card-sm text-center">
                <p className="text-2xl font-display font-bold text-brand-400">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="section-title mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to monitor, manage, and optimize your construction projects in one intelligent platform.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingFeatures.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              return (
                <motion.div
                  key={feature.title}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-600/10 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-24 px-6 bg-surface-elevated/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h2 className="section-title mb-6">AI That Sees Everything</h2>
            <p className="text-gray-400 mb-8">
              Powered by YOLOv11, OpenCV, and TensorFlow, our AI engine automatically detects progress, safety violations, and anomalies across your entire construction site.
            </p>
            <div className="space-y-4">
              {[
                "Automatic progress detection from drone photos",
                "PPE compliance monitoring (helmet, jacket, gloves, boots)",
                "Face recognition and attendance tracking",
                "Crack detection and structural analysis",
                "Equipment failure prediction",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-status-success/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-status-success" />
                  </div>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="glass-card !p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h4 className="font-medium mb-1">AI Progress Detection</h4>
              <p className="text-xs text-gray-500">Daily drone comparison analysis</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Wall Completion", yesterday: 48, today: 55 },
                { label: "Column Completion", yesterday: 60, today: 65 },
                { label: "Slab Completion", yesterday: 50, today: 58 },
                { label: "Beam Completion", yesterday: 55, today: 62 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span>
                      <span className="text-gray-500">{item.yesterday}%</span>
                      <ArrowRight className="w-3 h-3 inline mx-1" />
                      <span className="text-status-success font-medium">{item.today}%</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-border">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-status-success" style={{ width: `${item.today}%` }} />
                  </div>
                </div>
              ))}
              <div className="glass-card-sm !bg-status-success/10 text-center mt-4">
                <p className="text-2xl font-display font-bold text-status-success">+6%</p>
                <p className="text-xs text-gray-400">Overall progress today</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Digital Twin */}
      <section id="digital-twin" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="section-title mb-4">Interactive 3D Digital Twin</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore your building floor-by-floor with BIM-style visualization, timeline animation, and real-time progress tracking.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="glass-card !p-2 max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl bg-surface-elevated flex items-center justify-center relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop"
                alt="3D Digital Twin Preview"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Link href="/dashboard/digital-twin" className="btn-primary !px-8 !py-4">
                  <Box className="w-5 h-5" /> Explore 3D Twin
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-surface-elevated/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="section-title mb-4">Trusted by Industry Leaders</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-status-warning text-status-warning" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-600/20 flex items-center justify-center text-sm font-medium text-brand-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="section-title mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400">Choose the plan that fits your project scale.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className={`glass-card relative ${plan.popular ? "border-brand-500/30 shadow-glow" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-info !text-xs">Most Popular</span>
                )}
                <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
                <div className="my-4">
                  <span className="text-4xl font-display font-bold">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-status-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-surface-elevated/30">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className="glass-card group cursor-pointer"
              >
                <summary className="font-medium flex items-center justify-between list-none">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-sm text-gray-400 mt-3 pt-3 border-t border-white/5">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <motion.div {...fadeUp}>
            <h2 className="section-title mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8">Ready to transform your construction monitoring? Contact our team for a personalized demo.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-brand-400" /> contact@buildwatch.ai
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-brand-400" /> +1 (800) 555-BUILD
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-brand-400" /> San Francisco, CA
              </div>
            </div>
          </motion.div>
          <motion.form {...fadeUp} className="glass-card space-y-4">
            <input type="text" placeholder="Full Name" className="input-field" />
            <input type="email" placeholder="Email Address" className="input-field" />
            <input type="text" placeholder="Company" className="input-field" />
            <textarea placeholder="Message" rows={4} className="input-field resize-none" />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-display font-bold">BuildWatch AI</span>
          </div>
          <p className="text-sm text-gray-500">&copy; 2026 BuildWatch AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
