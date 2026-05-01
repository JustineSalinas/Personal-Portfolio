'use client';

import React from 'react';
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

// Convert tech stack into radar chart data
// We'll give a simulated "score" for the categories based on the number of items or arbitrary values
const data = Object.keys(portfolioData.techStack).map((key) => {
  const items = portfolioData.techStack[key as keyof typeof portfolioData.techStack];
  return {
    subject: key,
    // Just an arbitrary score based on array length + base value to make the chart look full
    A: Math.min(100, items.length * 15 + 40), 
    fullMark: 100,
  };
});

export const TechRadar = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || !theme;
  
  const textColor = isDark ? '#a0a0a0' : '#4b5563';
  const gridColor = isDark ? '#333333' : '#e5e7eb';
  const accentColor = '#3b82f6';

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: textColor, fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              borderColor: isDark ? '#333333' : '#e5e7eb',
              color: isDark ? '#ffffff' : '#000000',
              borderRadius: '8px'
            }}
            formatter={(value: number) => [`Proficiency Level`, 'Skill']}
          />
          <Radar
            name="Tech Stack"
            dataKey="A"
            stroke={accentColor}
            fill={accentColor}
            fillOpacity={isDark ? 0.4 : 0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
