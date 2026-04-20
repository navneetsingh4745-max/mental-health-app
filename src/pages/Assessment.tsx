import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PHQ9, GAD7, CSSRS, AssessmentModule } from '@/src/data/questionnaires';
import { store } from '@/src/lib/store';
import { Button } from '@/src/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function Assessment() {
  const navigate = useNavigate();
  // Flow: PHQ9 -> GAD7 -> conditionally CSSRS
  const modules = [PHQ9, GAD7];
  
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showSafetyIntervention, setShowSafetyIntervention] = useState(false);

  const { language } = store.get();
  const showBilingual = language === 'bilingual';

  const currentModule = modules[currentModuleIndex] || CSSRS; // Fallback to CSSRS if dynamically pushed
  const currentQuestion = currentModule.questions[currentQuestionIndex];

  // Calculate generic progress
  const totalQuestions = modules.reduce((acc, mod) => acc + mod.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progressText = answeredCount < totalQuestions / 3 ? "Just starting" : answeredCount < (totalQuestions * 0.8) ? "Halfway there" : "Almost done";

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Gating mechanism: Safety Trigger (e.g. passive suicidal ideation)
    if (currentQuestion.isSafetyTrigger && value > 0) {
      setShowSafetyIntervention(true);
      return; 
    }

    advanceQuestion();
  };

  const advanceQuestion = () => {
    if (currentQuestionIndex < currentModule.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      // Next module
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Completed standard assessment. Calculate scores.
      finalizeAssessment();
    }
  };

  const finalizeAssessment = () => {
    // Basic summation for MVP
    let phq9Score = 0;
    let gad7Score = 0;
    
    PHQ9.questions.forEach(q => { if (answers[q.id] !== undefined) phq9Score += answers[q.id]; });
    GAD7.questions.forEach(q => { if (answers[q.id] !== undefined) gad7Score += answers[q.id]; });

    store.set({
      assessmentScores: {
        phq9: phq9Score,
        gad7: gad7Score,
        lastCompleted: new Date().toISOString()
      }
    });

    if (phq9Score >= 20 || answers['phq9_9'] > 0) {
      // Severe depression triggers safety route regardless
      navigate('/safety');
    } else {
      navigate('/results');
    }
  };

  const startCSSRS = () => {
    setShowSafetyIntervention(false);
    // Push CSSRS to the active flow manually
    setCurrentModuleIndex(modules.length); // Out of bounds of standard modules, falls back to CSSRS
    setCurrentQuestionIndex(0);
  };

  if (showSafetyIntervention) {
    return (
      <div className="flex-1 flex flex-col p-6 bg-rose-50 text-rose-900 justify-center">
        <h2 className="text-2xl font-medium mb-4">Pause for a moment</h2>
        <p className="mb-6 leading-relaxed">
          You just shared that you've been having some thoughts about being better off dead or hurting yourself. This is a very important signal.
        </p>
        <p className="mb-8 leading-relaxed">
          Before we continue with the regular assessment, we'd like to ask a few specific questions about your safety right now. These are standard questions that help us understand how to support you best.
        </p>
        <Button onClick={startCSSRS} className="w-full bg-rose-600 hover:bg-rose-700 text-white mb-4">
          Continue
        </Button>
        <Button variant="ghost" onClick={() => navigate('/safety')} className="w-full text-rose-800 hover:bg-rose-100">
          I need support right now
        </Button>
      </div>
    );
  }

  // Determine if it's the start of a module
  if (currentQuestionIndex === 0 && !answers[currentQuestion.id]) {
    return (
      <div className="flex-1 flex flex-col p-6 justify-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center"
        >
          <div className="w-12 h-1 bg-emerald-200 mx-auto rounded-full mb-8" />
          <h2 className="text-2xl font-medium mb-2">{currentModule.title}</h2>
          {showBilingual && currentModule.titleSecondary && (
            <h3 className="text-lg font-medium text-slate-500 mb-4">{currentModule.titleSecondary}</h3>
          )}
          
          <p className="text-slate-600 mt-4 px-4 leading-relaxed">{currentModule.description}</p>
          {showBilingual && currentModule.descriptionSecondary && (
            <p className="text-slate-500 px-4 leading-relaxed mt-2">{currentModule.descriptionSecondary}</p>
          )}

          <Button size="lg" className="w-full mt-12" onClick={() => handleAnswer(answers[currentQuestion.id] || 0)}>
            Start Section
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header with generalized progress */}
      <div className="pt-6 px-6 pb-2 flex items-center justify-between">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
           <ArrowLeft className="w-5 h-5" />
         </button>
         <div className="text-xs font-medium text-slate-400 uppercase tracking-widest">{progressText}</div>
         <div className="w-9" /> {/* spacer for balance */}
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mt-4 mb-10">
              <h3 className="text-2xl font-medium text-slate-800 leading-snug">
                {currentQuestion.text}
              </h3>
              {showBilingual && currentQuestion.textSecondary && (
                <p className="text-lg text-slate-500 mt-3 font-medium">
                  {currentQuestion.textSecondary}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-white text-left font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 transition-all active:scale-[0.98]"
                >
                  <div>{option.label}</div>
                  {showBilingual && option.labelSecondary && (
                    <div className="text-slate-500 text-sm mt-1 font-normal select-none">{option.labelSecondary}</div>
                  )}
                </button>
              ))}
            </div>
            
            {currentModule.id === 'cssrs' && (
               <p className="text-xs text-center text-slate-400 mt-8 px-4">
                 You can stop answering these at any time if you feel overwhelmed.
               </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
