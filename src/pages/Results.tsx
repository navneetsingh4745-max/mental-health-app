import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { store } from '@/src/lib/store';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Heart, Activity, ArrowRight } from 'lucide-react';

export function Results() {
  const navigate = useNavigate();
  const state = store.get();
  const scores = state.assessmentScores;

  if (!scores) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>No assessment found. <button onClick={() => navigate('/')} className="text-emerald-600 underline">Start over</button></p>
      </div>
    );
  }

  // Nuanced, non-pathologizing result interpretation
  const getMoodLevel = (score: number) => {
    if (score <= 4) return { label: "Stable mood baseline", color: "text-emerald-600", bg: "bg-emerald-50", desc: "Your responses suggest you are experiencing a typical range of emotions without significant prolonged burden." };
    if (score <= 9) return { label: "Mild mood fluctuations", color: "text-amber-600", bg: "bg-amber-50", desc: "You are experiencing some signs of emotional weight. It might be helpful to focus on restorative activities." };
    if (score <= 14) return { label: "Elevated signs of distress", color: "text-orange-600", bg: "bg-orange-50", desc: "Your responses indicate you are carrying a substantial emotional load. This is a good time to consider seeking structured support." };
    return { label: "Significant distress patterns", color: "text-rose-600", bg: "bg-rose-50", desc: "You are experiencing a high level of distress. It is highly recommended to speak with a professional who can help you navigate this." };
  };

  const getAnxietyLevel = (score: number) => {
    if (score <= 4) return { label: "Low anxiety patterns", desc: "You seem to be managing stress well right now." };
    if (score <= 9) return { label: "Noticeable tension", desc: "You are experiencing periods of worry or restlessness." };
    if (score <= 14) return { label: "Elevated worry patterns", desc: "Anxiety seems to be actively interfering with your daily ease." };
    return { label: "High anxiety burden", desc: "You are facing overwhelming levels of tension and worry." };
  };

  const phq = getMoodLevel(scores.phq9 || 0);
  const gad = getAnxietyLevel(scores.gad7 || 0);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      <div className="bg-emerald-600 text-white pt-12 pb-24 px-6 rounded-b-[2rem]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-medium mb-2">Your Assessment Summary</h1>
          <p className="opacity-90 max-w-sm">
            Thank you for sharing honestly. Here is a summary of the patterns you reported over the last two weeks.
          </p>
        </motion.div>
      </div>

      <div className="-mt-16 px-6 space-y-4 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-5">
             <div className="flex items-center gap-3 mb-4">
               <div className={`p-2 rounded-lg ${phq.bg}`}>
                 <Heart className={`w-5 h-5 ${phq.color}`} />
               </div>
               <h2 className="font-medium text-slate-800">Current State</h2>
             </div>
             <p className={`font-medium ${phq.color} mb-2`}>{phq.label}</p>
             <p className="text-sm text-slate-600 leading-relaxed">{phq.desc}</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-5">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 rounded-lg bg-sky-50">
                 <Activity className="w-5 h-5 text-sky-600" />
               </div>
               <h2 className="font-medium text-slate-800">Anxiety Patterns</h2>
             </div>
             <p className="font-medium text-sky-700 mb-2">{gad.label}</p>
             <p className="text-sm text-slate-600 leading-relaxed">{gad.desc}</p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-6">
           <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 px-1">Next Steps</h3>
           <Card className="p-1">
             <button onClick={() => navigate('/dashboard')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
               <div className="text-left">
                 <p className="font-medium text-slate-800">Continue to Dashboard</p>
                 <p className="text-sm text-slate-500">Track your daily patterns</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                 <ArrowRight className="w-4 h-4 text-emerald-600" />
               </div>
             </button>
             
             <div className="h-px bg-slate-100 mx-4" />
             
             <button onClick={() => navigate('/safety')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
               <div className="text-left">
                 <p className="font-medium text-slate-800">I need support resources</p>
                 <p className="text-sm text-slate-500">Helplines and grounding tools</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                 <ArrowRight className="w-4 h-4 text-slate-400" />
               </div>
             </button>
           </Card>
        </motion.div>
      </div>
    </div>
  );
}
