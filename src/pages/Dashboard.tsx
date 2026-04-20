import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { store } from '@/src/lib/store';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Plus, ListTodo, Shield, Home } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const state = store.get();
  const checkIns = state.checkIns || [];

  // Sort and prep data for the chart
  const chartData = checkIns
    .slice(-7) // Last 7 entries
    .map((c, i) => ({
      name: i.toString(),
      mood: c.mood,
      stress: c.stress
    }));

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="pt-8 px-6 pb-6 bg-emerald-600 text-white rounded-b-[2rem]">
         <div className="flex justify-between items-start mb-6">
           <div>
             <p className="text-emerald-100 text-sm mb-1">Welcome back</p>
             <h1 className="text-2xl font-medium">Your Dashboard</h1>
           </div>
         </div>
         
         <Card className="bg-white/10 border-none backdrop-blur-sm p-4 text-white">
           <div className="flex justify-between items-center">
             <div>
               <p className="text-sm text-emerald-50 mb-1">Daily Check-in</p>
               <p className="font-medium">How are you feeling right now?</p>
             </div>
             <button onClick={() => navigate('/checkin')} className="w-12 h-12 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
               <Plus className="w-6 h-6" />
             </button>
           </div>
         </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Insights / Trends */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-800">Recent Patterns</h2>
          </div>
          
          <Card className="p-5 h-64 flex flex-col">
            {chartData.length >= 2 ? (
              <>
                <div className="flex items-center gap-4 mb-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Mood</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-400" /> Stress</div>
                </div>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <YAxis domain={[1, 5]} hide />
                      <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 0, fill: '#10b981'}} />
                      <Line type="monotone" dataKey="stress" stroke="#fb7185" strokeWidth={3} dot={{r: 4, strokeWidth: 0, fill: '#fb7185'}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">Based on your recent checks</p>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <ListTodo className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500 max-w-[200px]">Complete more daily check-ins to unlock your pattern graphs.</p>
              </div>
            )}
          </Card>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-lg font-medium text-slate-800 mb-4">Tools & Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card onClick={() => navigate('/results')} className="p-4 cursor-pointer hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <ListTodo className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="font-medium text-slate-800 text-sm">Review Assessment</p>
            </Card>
            <Card onClick={() => navigate('/safety')} className="p-4 cursor-pointer hover:border-rose-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-rose-600" />
              </div>
              <p className="font-medium text-slate-800 text-sm">Safety & Support</p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
