import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { store } from '@/src/lib/store';
import { ArrowLeft } from 'lucide-react';

export function CheckIn() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [stress, setStress] = useState(3);

  const handleFinish = () => {
    store.addCheckIn({
      date: new Date().toISOString(),
      mood,
      energy,
      stress
    });
    navigate('/dashboard');
  };

  const getLabel = (val: number, type: 'mood'|'energy'|'stress') => {
    if (type === 'mood') return ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'][val - 1];
    if (type === 'energy') return ['Exhausted', 'Tired', 'Okay', 'Energetic', 'Restless'][val - 1];
    if (type === 'stress') return ['Very Relaxed', 'Calm', 'Neutral', 'Tense', 'Overwhelmed'][val - 1];
    return '';
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="pt-6 px-6 pb-2 flex items-center">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 mr-4 text-slate-400 hover:bg-slate-100 rounded-full">
           <ArrowLeft className="w-5 h-5" />
         </button>
         <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
           <motion.div 
             className="h-full bg-emerald-500" 
             initial={{ width: 0 }} 
             animate={{ width: `${(step / 3) * 100}%` }} 
           />
         </div>
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center pb-20">
        <motion.div
           key={step}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           className="w-full text-center"
        >
          {step === 1 && (
            <>
              <h2 className="text-2xl font-medium text-slate-800 mb-12">How is your overall mood right now?</h2>
              <p className="text-emerald-600 font-medium text-lg mb-8">{getLabel(mood, 'mood')}</p>
              <input 
                type="range" min="1" max="5" value={mood} 
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium px-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-medium text-slate-800 mb-12">How are your energy levels?</h2>
              <p className="text-emerald-600 font-medium text-lg mb-8">{getLabel(energy, 'energy')}</p>
              <input 
                type="range" min="1" max="5" value={energy} 
                onChange={(e) => setEnergy(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium px-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-medium text-slate-800 mb-12">How much tension or stress do you feel?</h2>
              <p className="text-emerald-600 font-medium text-lg mb-8">{getLabel(stress, 'stress')}</p>
              <input 
                type="range" min="1" max="5" value={stress} 
                onChange={(e) => setStress(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-3 text-xs text-slate-400 font-medium px-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="p-6">
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} size="lg" className="w-full">Next</Button>
        ) : (
          <Button onClick={handleFinish} size="lg" className="w-full">Log Check-in</Button>
        )}
      </div>
    </div>
  );
}
