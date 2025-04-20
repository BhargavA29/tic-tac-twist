'use client';

import React from 'react';

// SVG X and O Components
export const XMark: React.FC<{ color: string; className?: string }> = ({ color, className = '' }) => (
  <svg 
    width="60" 
    height="60" 
    viewBox="0 0 60 60" 
    className={className}
  >
    <line 
      x1="15" 
      y1="15" 
      x2="45" 
      y2="45" 
      stroke={color} 
      strokeWidth="8" 
      strokeLinecap="round" 
      className="draw-x"
    />
    <line 
      x1="45" 
      y1="15" 
      x2="15" 
      y2="45" 
      stroke={color} 
      strokeWidth="8" 
      strokeLinecap="round" 
      className="draw-x"
      style={{ animationDelay: '0.2s' }}
    />
  </svg>
);

export const OMark: React.FC<{ color: string; className?: string }> = ({ color, className = '' }) => (
  <svg 
    width="60" 
    height="60" 
    viewBox="0 0 60 60" 
    className={className}
  >
    <circle 
      cx="30" 
      cy="30" 
      r="20" 
      fill="none" 
      stroke={color} 
      strokeWidth="8" 
      strokeLinecap="round" 
      className="draw-o"
    />
  </svg>
); 