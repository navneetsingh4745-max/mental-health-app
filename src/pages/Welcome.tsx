import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[2rem] mx-auto flex items-center justify-center mb-8">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-slate-900">
          Welcome to Sahaay
        </h1>
        <p className="text-slate-500 text-base max-w-[260px] mx-auto leading-relaxed">
          A safe space to understand your feelings, build resilience, and find support.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="w-full max-w-sm mt-12 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left"
      >
        <h3 className="text-sm font-medium text-slate-800 mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Important Note
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          This app provides structured insights based on clinical scales, but it is <strong>not a medical diagnosis</strong>. It is a tool to help you understand your experiences.
        </p>
      </motion.div>

      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.6, duration: 0.5 }}
         className="w-full mt-auto pt-8"
      >
        <Button onClick={() => navigate('/onboarding')} size="lg" className="w-full">
          Get Started
        </Button>
      </motion.div>
    </div>
  );
}
