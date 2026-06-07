"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, ArrowRight, User, Mail, Phone,
  FileText, Send, CheckCircle2, Sparkles,
} from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { submitCareerApplication } from "@/lib/api";

const positions = [
  "Driver (Local & Outstation)",
  "Tour Guide",
  "Customer Support Executive",
  "Marketing & Sales",
  "Operations Manager",
  "Other",
];

const CareersPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "Driver (Local & Outstation)",
    resume_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitCareerApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        resume_url: formData.resume_url || undefined,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Career application failed:", err);
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#010a08] transition-colors duration-500">

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-transparent border-b border-slate-100 dark:border-emerald-500/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <SectionReveal>
            <Breadcrumbs items={[{ label: "Company", href: "/about" }, { label: "Careers" }]} />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              We&apos;re Hiring
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              Join Our <span className="text-emerald-600">Team</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-emerald-100/60 font-medium mb-12">
              We are always on the lookout for talented, passionate individuals to help us revolutionize travel in Visakhapatnam.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionReveal>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-10 md:p-14 rounded-[4rem] bg-white dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-500/10 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Apply Now</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Submit your application</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1 flex items-center gap-2">
                        <User className="w-3 h-3" /> Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-14 px-6 rounded-xl bg-slate-50 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1 flex items-center gap-2">
                          <Mail className="w-3 h-3" /> Email *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 px-6 rounded-xl bg-slate-50 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1 flex items-center gap-2">
                          <Phone className="w-3 h-3" /> Phone *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-14 px-6 rounded-xl bg-slate-50 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Position */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1 flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> Position Applying For *
                      </label>
                      <select
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full h-14 px-6 rounded-xl bg-slate-50 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-slate-900 dark:text-white appearance-none"
                      >
                        {positions.map((pos) => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    </div>

                    {/* Resume URL */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Resume / LinkedIn URL (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or linkedin.com/in/..."
                        value={formData.resume_url}
                        onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                        className="w-full h-14 px-6 rounded-xl bg-slate-50 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium text-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Submit Application <Send className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-14 rounded-[4rem] bg-white dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-500/10 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Application Sent!</h3>
                  <p className="text-slate-500 dark:text-emerald-100/60 font-medium mb-12">
                    Thank you, <span className="font-black text-emerald-600">{formData.name.split(" ")[0]}</span>! We have received your application for <span className="font-bold">{formData.position}</span>. Our team will review and get back to you within 3–5 business days.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", phone: "", position: "Driver (Local & Outstation)", resume_url: "" }); }}
                      className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs hover:text-orange-500 transition-colors"
                    >
                      Submit Another Application
                    </button>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-emerald-900/20 text-slate-700 dark:text-white rounded-2xl font-black transition-all hover:bg-slate-200">
                      Contact Us <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SectionReveal>
        </div>
      </section>

    </main>
  );
};

export default CareersPage;
