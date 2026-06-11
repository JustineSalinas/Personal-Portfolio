'use client';

import React from 'react';

export const SubtleBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      {/* Warm amber glow — top left origin */}
      <div className="absolute -top-64 -left-32 w-[700px] h-[700px] rounded-full bg-amber-800/[0.07] dark:bg-amber-700/[0.07] blur-[160px]" />

      {/* Warm glow — bottom right */}
      <div className="absolute -bottom-48 -right-24 w-[600px] h-[600px] rounded-full bg-amber-700/[0.05] dark:bg-amber-800/[0.06] blur-[140px]" />

      {/* Subtle center radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-amber-900/[0.03] dark:bg-amber-900/[0.04] blur-[180px]" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Fine amber dot grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `radial-gradient(rgba(200, 132, 58, 1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
