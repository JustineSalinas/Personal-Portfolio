'use client';

import React from 'react';

export const SubtleBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle blurred blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] animate-drift-slow" />
      <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/5 blur-[100px] animate-drift-slower" />
      <div className="absolute top-[40%] right-[15%] w-[25%] h-[25%] rounded-full bg-accent/3 blur-[80px] animate-drift-slowest" />
      
      {/* Grid overlay for a premium tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
};
