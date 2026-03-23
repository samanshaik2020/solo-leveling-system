/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useSystemStore } from './store/useSystemStore';
import { InitializationScreen } from './components/InitializationScreen';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const isInitialized = useSystemStore((state) => state.isInitialized);
  const resetDaily = useSystemStore((state) => state.resetDaily);

  useEffect(() => {
    // Reset local storage once if requested
    if (!localStorage.getItem('system-reset-v2')) {
      localStorage.clear();
      localStorage.setItem('system-reset-v2', 'true');
      window.location.reload();
    }

    // Check for daily reset on mount
    const lastReset = localStorage.getItem('last-system-reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      resetDaily();
      localStorage.setItem('last-system-reset', today);
    }
  }, [resetDaily]);

  return (
    <div className="relative min-h-screen selection:bg-system-primary/30 selection:text-system-primary system-flicker">
      {/* Background Scanline Effect */}
      <div className="scanline" />
      
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Main Content */}
      <main className="relative z-10">
        {!isInitialized ? (
          <InitializationScreen />
        ) : (
          <Dashboard />
        )}
      </main>

      {/* Global Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
