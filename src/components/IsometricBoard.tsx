'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Constants for Isometric Grid
const W = 80;
const H = 40;
const D = 25; // Adjusted depth to match the chunky board in the picture
const startX = 200;
const startY = 120;

interface CubeProps {
  cx: number;
  cy: number;
  w: number;
  h: number;
  d: number;
  isDark: boolean;
}

const Cube = ({ cx, cy, w, h, d, isDark }: CubeProps) => {
  const topFace = `M${cx},${cy} L${cx + w/2},${cy + h/2} L${cx},${cy + h} L${cx - w/2},${cy + h/2} Z`;
  const leftFace = `M${cx - w/2},${cy + h/2} L${cx},${cy + h} L${cx},${cy + h + d} L${cx - w/2},${cy + h/2 + d} Z`;
  const rightFace = `M${cx},${cy + h} L${cx + w/2},${cy + h/2} L${cx + w/2},${cy + h/2 + d} L${cx},${cy + h + d} Z`;

  // Colors matching the user's reference picture
  const topColor = isDark ? "#121212" : "#e3d8c8";
  const leftColor = isDark ? "#1d1f23" : "#f0e6d6";
  const rightColor = isDark ? "#08090a" : "#8b8377";

  return (
    <g>
      <path d={topFace} fill={topColor} className="transition-colors duration-500" />
      <path d={leftFace} fill={leftColor} className="transition-colors duration-500" />
      <path d={rightFace} fill={rightColor} className="transition-colors duration-500" />
    </g>
  );
};

const AnimatedKnight = () => {
  // Center position (r: 1, c: 1)
  const targetCx = startX + (1 - 1) * (W / 2);
  const targetCy = startY + (1 + 1) * (H / 2);

  return (
    <motion.g
      initial={{ x: targetCx, y: targetCy }}
      animate={{ x: targetCx, y: targetCy }}
    >
      <motion.g 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          x="-35" 
          y="-68" 
          width="70"
          height="70"
          viewBox="0 0 256 256"
          className="drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
        >
          <defs>
            {/* Dark brown glossy material matching the picture */}
            <linearGradient id="realGloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a3a32" />
              <stop offset="25%" stopColor="#261d18" />
              <stop offset="50%" stopColor="#140f0c" />
              <stop offset="80%" stopColor="#080605" />
              <stop offset="100%" stopColor="#1a1310" />
            </linearGradient>
            <radialGradient id="realHighlight" cx="35%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <path 
            d="M216,200H196.22C191,154.68,172.59,122.3,143.43,101.4l14.12-14.12a8,8,0,0,0-1.29-12.43c-33.89-21.18-72.2-18.42-106.84-24.39A8,8,0,0,0,40,58.37l0,38a8,8,0,0,0,4.8,7.33c24,10.67,31,43.46,31,76.31,0,10.15,2.15,19.34,6.41,27.31L81.09,210.4a8,8,0,0,0,7,11.6H168a8,8,0,0,0,0-16H98.67l3.63-3.63c.24-.24.47-.49.71-.74a68.42,68.42,0,0,0,11-13.63H168a8,8,0,0,0,0-16H119.86l4.13-12.4a8,8,0,0,0-15.18-5.06l-6,18.06c-3.83-8.8-5.78-19.14-5.78-31,0-30.73-6-61.54-25-72.4V64.84c30.29,6.23,63.15,7.74,93.41,25.8l-15,15a8,8,0,0,0,1,12.56c31.13,22.75,50,56.76,54.58,98.81L196.22,216H216a8,8,0,0,0,0-16Z" 
            fill="url(#realGloss)" 
          />
          <path 
            d="M216,200H196.22C191,154.68,172.59,122.3,143.43,101.4l14.12-14.12a8,8,0,0,0-1.29-12.43c-33.89-21.18-72.2-18.42-106.84-24.39A8,8,0,0,0,40,58.37l0,38a8,8,0,0,0,4.8,7.33c24,10.67,31,43.46,31,76.31,0,10.15,2.15,19.34,6.41,27.31L81.09,210.4a8,8,0,0,0,7,11.6H168a8,8,0,0,0,0-16H98.67l3.63-3.63c.24-.24.47-.49.71-.74a68.42,68.42,0,0,0,11-13.63H168a8,8,0,0,0,0-16H119.86l4.13-12.4a8,8,0,0,0-15.18-5.06l-6,18.06c-3.83-8.8-5.78-19.14-5.78-31,0-30.73-6-61.54-25-72.4V64.84c30.29,6.23,63.15,7.74,93.41,25.8l-15,15a8,8,0,0,0,1,12.56c31.13,22.75,50,56.76,54.58,98.81L196.22,216H216a8,8,0,0,0,0-16Z" 
            fill="url(#realHighlight)" 
          />
          {/* Base of the knight to make it stand better */}
          <ellipse cx="128" cy="205" rx="45" ry="12" fill="url(#realGloss)" />
          {/* Eye */}
          <circle cx="108" cy="92" r="5" fill="#ffffff" opacity="0.9" />
        </svg>
      </motion.g>
    </motion.g>
  );
};

export const IsometricBoard = ({ className }: { className?: string }) => {
  const cubes = [];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const cx = startX + (c - r) * (W / 2);
      const cy = startY + (c + r) * (H / 2);
      const isDark = (r + c) % 2 === 0;
      
      cubes.push(
        <Cube
          key={`${r}-${c}`}
          cx={cx}
          cy={cy}
          w={W}
          h={H}
          d={D}
          isDark={isDark}
        />
      );
    }
  }

  return (
    <div className={cn("w-full h-full flex items-center justify-center pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]", className)}>
      <svg width="400" height="350" viewBox="0 0 400 350" className="overflow-visible">
        {cubes}
        <AnimatedKnight />
      </svg>
    </div>
  );
};
