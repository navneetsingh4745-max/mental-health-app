import React from 'react';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-sm relative overflow-hidden flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
