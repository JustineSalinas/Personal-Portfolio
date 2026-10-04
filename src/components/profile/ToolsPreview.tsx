import React from 'react';
import { portfolioData } from '@/data';

/**
 * Same two-column row shape as the Stack section beneath it (name on the
 * left, short descriptor on the right), so the two read as a pair.
 */
export const ToolsPreview = () => (
  <div className="divide-y divide-border">
    {portfolioData.tools.map((tool) => (
      <div key={tool.name} className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4">
        <p className="text-[15px] text-primary">{tool.name}</p>
        <p className="text-[14px] text-muted">{tool.description}</p>
      </div>
    ))}
  </div>
);
