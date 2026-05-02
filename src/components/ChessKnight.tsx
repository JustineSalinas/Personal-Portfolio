'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

interface ChessKnightProps {
  className?: string;
  size?: number;
}

export const ChessKnight = ({ className, size = 120 }: ChessKnightProps) => {
  const controls = useAnimation();
  const [isJumping, setIsJumping] = useState(false);

  // L-Jump pattern: [dx, dy]
  const lJumps = [
    [100, 50], [100, -50], [-100, 50], [-100, -50],
    [50, 100], [50, -100], [-50, 100], [-50, -100]
  ];

  const performLJump = async () => {
    if (isJumping) return;
    setIsJumping(true);

    const jump = lJumps[Math.floor(Math.random() * lJumps.length)];
    
    // Animate the L-jump
    await controls.start({
      x: jump[0],
      y: jump[1],
      rotate: [0, 15, -15, 0],
      transition: { 
        duration: 0.6, 
        ease: "easeInOut",
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    });

    // Stay for a bit then return
    setTimeout(async () => {
      await controls.start({
        x: 0,
        y: 0,
        transition: { duration: 1, ease: "anticipate" }
      });
      setIsJumping(false);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isJumping && Math.random() > 0.7) {
        performLJump();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isJumping]);

  return (
    <div className={cn("relative cursor-pointer", className)} onClick={performLJump}>
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={800}
        scale={1.1}
        transitionSpeed={1500}
      >
        <motion.div
          animate={controls}
          initial={{ x: 0, y: 0 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          {/* Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/10 blur-md rounded-full" />
          
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 256"
            className="text-primary drop-shadow-2xl filter"
            fill="currentColor"
          >
            <path d="M216,200H196.22C191,154.68,172.59,122.3,143.43,101.4l14.12-14.12a8,8,0,0,0-1.29-12.43c-33.89-21.18-72.2-18.42-106.84-24.39A8,8,0,0,0,40,58.37l0,38a8,8,0,0,0,4.8,7.33c24,10.67,31,43.46,31,76.31,0,10.15,2.15,19.34,6.41,27.31L81.09,210.4a8,8,0,0,0,7,11.6H168a8,8,0,0,0,0-16H98.67l3.63-3.63c.24-.24.47-.49.71-.74a68.42,68.42,0,0,0,11-13.63H168a8,8,0,0,0,0-16H119.86l4.13-12.4a8,8,0,0,0-15.18-5.06l-6,18.06c-3.83-8.8-5.78-19.14-5.78-31,0-30.73-6-61.54-25-72.4V64.84c30.29,6.23,63.15,7.74,93.41,25.8l-15,15a8,8,0,0,0,1,12.56c31.13,22.75,50,56.76,54.58,98.81L196.22,216H216a8,8,0,0,0,0-16Z" />
          </svg>
          
          {/* Eye glow effect */}
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-[32%] left-[28%] w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]" 
          />
        </motion.div>
      </Tilt>
    </div>
  );
};
