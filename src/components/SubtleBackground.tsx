'use client';

import React from 'react';

export const SubtleBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid overlay for a premium minimal feel */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
};
