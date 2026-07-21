'use client';

import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { portfolioData } from '@/data';
import { useTheme } from 'next-themes';

const data = Object.keys(portfolioData.techStack).map((key) => {
  const items = portfolioData.techStack[key as keyof typeof portfolioData.techStack];
  return {
    subject: key,
    A: Math.min(100, items.length * 15 + 40), 
    fullMark: 100,
  };
});

export const TechRadar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [colors, setColors] = useState({
    text: '#a0a0a0',
    grid: '#333333',
    accent: '#3b82f6',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateColors = () => {
      const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
      
      const computedStyles = getComputedStyle(document.documentElement);
      const accentVar = computedStyles.getPropertyValue('--accent').trim();
      const borderVar = computedStyles.getPropertyValue('--border').trim();

      setColors({
        text: isDark ? 'rgba(255, 255, 255, 0.45)' : '#555555',
        grid: borderVar || (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)'),
        accent: accentVar || (isDark ? '#e0e0e0' : '#1a1a1a'),
      });
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [theme, mounted]);

  if (!mounted) {
    return <div className="w-full h-[320px] bg-surface/10 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="w-full h-[320px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={colors.grid} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: colors.text, fontSize: 10, fontWeight: 500, fontFamily: 'var(--font-outfit), sans-serif' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-outfit), sans-serif',
              fontSize: '11px',
              borderRadius: '12px'
            }}
            formatter={(value: number) => [`Proficiency Level`, 'Skill']}
          />
          <Radar
            name="Tech Stack"
            dataKey="A"
            stroke={colors.accent}
            fill={colors.accent}
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
