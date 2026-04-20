import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/src/components/Layout';
import { Welcome } from '@/src/pages/Welcome';
import { Onboarding } from '@/src/pages/Onboarding';
import { Assessment } from '@/src/pages/Assessment';
import { Results } from '@/src/pages/Results';
import { Safety } from '@/src/pages/Safety';
import { Dashboard } from '@/src/pages/Dashboard';
import { CheckIn } from '@/src/pages/CheckIn';
import { store } from '@/src/lib/store';

function RootRouter() {
  const state = store.get();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            !state.hasCompletedOnboarding ? <Welcome /> : 
            !state.assessmentScores ? <Navigate to="/assessment" replace /> :
            <Navigate to="/dashboard" replace />
          } />
          
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="results" element={<Results />} />
          <Route path="safety" element={<Safety />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="checkin" element={<CheckIn />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return <RootRouter />;
}
