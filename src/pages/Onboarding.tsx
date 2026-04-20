import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { store } from '@/src/lib/store';

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<'english' | 'bilingual' | null>(null);
  const [ageGroup, setAgeGroup] = useState<'13-17' | '18+' | null>(null);

  const handleNext = () => {
    if (step === 1 && language) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3 && ageGroup) {
      store.set({ hasCompletedOnboarding: true, ageGroup, language });
      navigate('/assessment');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      {step === 1 && (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex-1 flex flex-col"
        >
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-medium mb-2 text-slate-900">Choose your language</h2>
            <p className="text-slate-500 mb-8">This experience has been culturally adapted. Do you prefer English only, or English with Hindi context alongside it?</p>

            <div className="space-y-3">
              <button
                onClick={() => setLanguage('english')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  language === 'english' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="font-medium">English only</div>
              </button>
              <button
                onClick={() => setLanguage('bilingual')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  language === 'bilingual' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="font-medium">English + Hindi (Hinglish)</div>
                <div className="text-sm mt-1 opacity-80">Culturally adapted terminology (सांस्कृतिक रूप से अनुकूलित)</div>
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
               <p className="text-xs text-slate-500 leading-relaxed italic">
                 <strong>Research Context:</strong> This dual-language format was developed via forward/back-translation and cognitive interviewing to ensure accurate tracking (DIF analysis) across diverse South Asian demographics. 
               </p>
            </div>
          </div>
          <Button disabled={!language} onClick={handleNext} size="lg" className="w-full mt-8">Continue</Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex-1 flex flex-col"
        >
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-medium mb-4 text-slate-900">Your Privacy Matters</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>Everything you share here stays securely on your device.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <span>We don't send your answers to external servers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <span>You can delete your data at any time.</span>
                </li>
              </ul>
            </div>
          </div>
          <Button onClick={handleNext} size="lg" className="w-full mt-8">I Understand</Button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex-1 flex flex-col"
        >
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-medium mb-2 text-slate-900">How old are you?</h2>
            <p className="text-slate-500 mb-8">This helps us tailor the language and resources for you.</p>

            <div className="space-y-3">
              <button
                onClick={() => setAgeGroup('13-17')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  ageGroup === '13-17' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                13 to 17 years
              </button>
              <button
                onClick={() => setAgeGroup('18+')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  ageGroup === '18+' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                18 years or older
              </button>
            </div>
            {ageGroup === '13-17' && (
              <p className="text-sm mt-4 text-emerald-700 bg-emerald-50 p-4 rounded-xl">
                Since you are under 18, we strongly encourage reviewing the results with a trusted adult or professional.
              </p>
            )}
          </div>
          <Button disabled={!ageGroup} onClick={handleNext} size="lg" className="w-full mt-8">Start Assessment</Button>
        </motion.div>
      )}
    </div>
  );
}
