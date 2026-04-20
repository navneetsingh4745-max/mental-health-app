import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Phone, ArrowLeft, Wind } from 'lucide-react';

export function Safety() {
  const navigate = useNavigate();
  const [breathingStep, setBreathingStep] = useState(0);

  const startBreathing = () => {
    let step = 1;
    setBreathingStep(step);
    const interval = setInterval(() => {
      step = step >= 3 ? 1 : step + 1;
      setBreathingStep(step);
    }, 4000); // 4s inhale, 4s hold, 4s exhale roughly
    
    // Auto stop after a minute
    setTimeout(() => {
      clearInterval(interval);
      setBreathingStep(0);
    }, 60000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      <div className="pt-6 px-6 pb-6 border-b border-slate-100 bg-white sticky top-0 z-10 flex items-center">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-2 text-slate-400 hover:bg-slate-100 rounded-full">
           <ArrowLeft className="w-5 h-5" />
         </button>
         <h1 className="text-lg font-medium text-slate-800">Support & Safety</h1>
      </div>

      <div className="p-6 space-y-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl font-medium text-slate-800 mb-2">You are not alone.</h2>
          <p className="text-slate-600 mb-6">If you are feeling overwhelmed or unsafe, please reach out directly to professionals who can help you right now.</p>
          
          <div className="space-y-4">
            <Card className="p-4 flex items-center justify-between border-rose-100 bg-rose-50/50">
              <div>
                <p className="font-medium text-slate-900">AASRA Helpline (India)</p>
                <p className="text-sm text-slate-500">24/7 Crisis Support</p>
              </div>
              <a href="tel:+919820466726" className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 transition-transform active:scale-95">
                <Phone className="w-5 h-5 fill-current" />
              </a>
            </Card>
            
            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Vandrevala Foundation</p>
                <p className="text-sm text-slate-500">Mental Health Crisis</p>
              </div>
              <a href="tel:9999666555" className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 transition-transform active:scale-95">
                <Phone className="w-5 h-5 fill-current" />
              </a>
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Kiran</p>
                <p className="text-sm text-slate-500">National Helplines (Govt.)</p>
              </div>
              <a href="tel:18005990019" className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 transition-transform active:scale-95">
                <Phone className="w-5 h-5 fill-current" />
              </a>
            </Card>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
           <h3 className="font-medium text-slate-800 mb-4 flex items-center gap-2">
             <Wind className="w-5 h-5 text-sky-500" />
             Quick Grounding Exercise
           </h3>
           <Card className="p-6 text-center">
             {breathingStep === 0 ? (
               <>
                 <p className="text-slate-600 mb-6 text-sm">Focusing on your breath can help lower your heart rate and bring you back to the present moment.</p>
                 <Button variant="outline" onClick={startBreathing} className="w-full">
                   Start Breathing Exercise
                 </Button>
               </>
             ) : (
               <div className="py-8">
                 <motion.div
                   animate={{ 
                     scale: breathingStep === 1 ? 1.5 : breathingStep === 3 ? 1 : 1.5,
                     opacity: breathingStep === 2 ? 0.7 : 1
                   }}
                   transition={{ duration: 4, ease: "easeInOut" }}
                   className="w-24 h-24 mx-auto bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-medium"
                 >
                   {breathingStep === 1 && "Inhale"}
                   {breathingStep === 2 && "Hold"}
                   {breathingStep === 3 && "Exhale"}
                 </motion.div>
               </div>
             )}
           </Card>
           <div className="mt-8">
             <p className="text-sm text-slate-500">If you are still navigating safely, you can <button onClick={() => navigate('/dashboard')} className="text-emerald-600 underline">return to your dashboard</button>.</p>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
