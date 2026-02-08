'use client';

import { useEffect, useState } from 'react';

/* ─── Whimsical animated tide pool creatures ─── */

function Starfish({ x, y, size, rot, color, dur }: { x: number; y: number; size: number; rot: number; color: string; dur?: number }) {
  const d = dur || 30;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${size / 20})`}>
      <path
        d="M0,-10 L2.9,-3.1 L10,-3.1 L4.5,1.5 L6.2,9 L0,5 L-6.2,9 L-4.5,1.5 L-10,-3.1 L-2.9,-3.1Z"
        fill={color}
        stroke="#c44"
        strokeWidth="0.8"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur={`${d}s`}
          repeatCount="indefinite"
        />
      </path>
      {/* bumpy texture dots */}
      <circle cx="0" cy="-5" r="1" fill="#fff" opacity="0.5" />
      <circle cx="3.5" cy="1" r="0.8" fill="#fff" opacity="0.4" />
      <circle cx="-3.5" cy="1" r="0.9" fill="#fff" opacity="0.45" />
      <circle cx="-1" cy="4" r="0.7" fill="#fff" opacity="0.35" />
      <circle cx="1.5" cy="-2" r="0.6" fill="#fff" opacity="0.4" />
      {/* pulsing glow */}
      <circle cx="0" cy="0" r="12" fill={color} opacity="0">
        <animate attributeName="opacity" values="0;0.08;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="r" values="12;16;12" dur="4s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function SeaAnemone({ x, y, color, size }: { x: number; y: number; color: string; size?: number }) {
  const s = size || 1;
  const tentacleCount = 9;
  const tentacles = Array.from({ length: tentacleCount }, (_, i) => {
    const angle = (i / tentacleCount) * Math.PI - Math.PI / 2;
    const spread = 8 * s;
    return {
      cx: Math.cos(angle) * spread,
      cy: Math.sin(angle) * spread - 3,
      delay: i * 0.25,
    };
  });

  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* base/stem */}
      <ellipse cx="0" cy="6" rx="8" ry="4" fill="#4a8a5a" stroke="#3a6a4a" strokeWidth="0.6" />
      <ellipse cx="0" cy="4" rx="6" ry="3" fill="#5a9a6a" />
      {/* tentacles with flowing animation */}
      {tentacles.map((t, i) => (
        <g key={i}>
          <path
            d={`M0,2 Q${t.cx * 0.5},${t.cy * 0.5} ${t.cx},${t.cy - 5}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          >
            <animate
              attributeName="d"
              values={`M0,2 Q${t.cx * 0.5},${t.cy * 0.5} ${t.cx},${t.cy - 5};M0,2 Q${t.cx * 0.5 + 3},${t.cy * 0.5 - 2} ${t.cx + 2},${t.cy - 7};M0,2 Q${t.cx * 0.5 - 2},${t.cy * 0.5 + 1} ${t.cx - 1},${t.cy - 4};M0,2 Q${t.cx * 0.5},${t.cy * 0.5} ${t.cx},${t.cy - 5}`}
              dur={`${2.5 + t.delay * 0.3}s`}
              repeatCount="indefinite"
            />
          </path>
          {/* glowing tips */}
          <circle cx={t.cx} cy={t.cy - 5} r="2" fill={color} opacity="0.7">
            <animate
              attributeName="cx"
              values={`${t.cx};${t.cx + 2};${t.cx - 1};${t.cx}`}
              dur={`${2.5 + t.delay * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${t.cy - 5};${t.cy - 7};${t.cy - 4};${t.cy - 5}`}
              dur={`${2.5 + t.delay * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;1;0.5;0.7"
              dur={`${3 + t.delay * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </g>
  );
}

function Crab({ x, y, flip, size }: { x: number; y: number; flip?: boolean; size?: number }) {
  const dir = flip ? -1 : 1;
  const s = size || 1;
  return (
    <g transform={`translate(${x},${y}) scale(${dir * s},${s})`}>
      {/* body */}
      <ellipse cx="0" cy="0" rx="9" ry="6" fill="#e86830" stroke="#a84420" strokeWidth="0.7" />
      <ellipse cx="0" cy="-1" rx="7" ry="4" fill="#f08050" />
      {/* shell pattern */}
      <path d="M-3,-3 Q0,-5 3,-3" fill="none" stroke="#d06020" strokeWidth="0.5" />
      <path d="M-5,-1 Q0,-3 5,-1" fill="none" stroke="#d06020" strokeWidth="0.4" />
      {/* eyes on stalks */}
      <line x1="-3" y1="-6" x2="-4.5" y2="-10" stroke="#a84420" strokeWidth="1.2">
        <animate attributeName="y2" values="-10;-11;-9;-10" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="3" y1="-6" x2="4.5" y2="-10" stroke="#a84420" strokeWidth="1.2">
        <animate attributeName="y2" values="-10;-9;-11;-10" dur="2s" repeatCount="indefinite" />
      </line>
      <circle cx="-4.5" cy="-10.5" r="1.8" fill="#222">
        <animate attributeName="cy" values="-10.5;-11.5;-9.5;-10.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="4.5" cy="-10.5" r="1.8" fill="#222">
        <animate attributeName="cy" values="-10.5;-9.5;-11.5;-10.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="-4" cy="-11" r="0.7" fill="#fff">
        <animate attributeName="cy" values="-11;-12;-10;-11" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="5" cy="-11" r="0.7" fill="#fff">
        <animate attributeName="cy" values="-11;-10;-12;-11" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* left claw - snapping */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 -9 0;-15 -9 0;0 -9 0;8 -9 0;0 -9 0"
          dur="2.5s"
          repeatCount="indefinite"
        />
        <path d="M-9,0 L-14,-3 L-17,-7 L-13,-4 Z" fill="#e86830" stroke="#a84420" strokeWidth="0.5" />
        <path d="M-9,0 L-14,1 L-16,-2 L-13,-1 Z" fill="#f08050" stroke="#a84420" strokeWidth="0.5" />
      </g>
      {/* right claw */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 9 0;15 9 0;0 9 0;-8 9 0;0 9 0"
          dur="2.8s"
          repeatCount="indefinite"
        />
        <path d="M9,0 L14,-3 L17,-7 L13,-4 Z" fill="#e86830" stroke="#a84420" strokeWidth="0.5" />
        <path d="M9,0 L14,1 L16,-2 L13,-1 Z" fill="#f08050" stroke="#a84420" strokeWidth="0.5" />
      </g>
      {/* legs with walking motion */}
      {[-6, -3, 0, 3].map((ly, i) => (
        <g key={i}>
          <line x1="-8" y1={ly} x2="-13" y2={ly + 4} stroke="#a84420" strokeWidth="1">
            <animate
              attributeName="x2"
              values={`${-13};${-15};${-11};${-13}`}
              dur={`${1.2 + i * 0.15}s`}
              repeatCount="indefinite"
            />
          </line>
          <line x1="8" y1={ly} x2="13" y2={ly + 4} stroke="#a84420" strokeWidth="1">
            <animate
              attributeName="x2"
              values={`${13};${11};${15};${13}`}
              dur={`${1.2 + i * 0.15}s`}
              repeatCount="indefinite"
            />
          </line>
        </g>
      ))}
      {/* bubble from mouth */}
      <circle cx="0" cy="-4" r="1" fill="none" stroke="#8ad4ff" strokeWidth="0.3" opacity="0">
        <animate attributeName="cy" values="-4;-20;-35" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* sideways scuttle */}
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`${x},${y};${x + dir * 12},${y - 2};${x + dir * 6},${y};${x - dir * 5},${y + 1};${x},${y}`}
        dur="10s"
        repeatCount="indefinite"
      />
    </g>
  );
}

function SeaUrchin({ x, y, size }: { x: number; y: number; size?: number }) {
  const s = size || 1;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="6" fill="#2a1a3a" stroke="#1a0a2a" strokeWidth="0.6" />
      <circle cx="0" cy="0" r="4" fill="#3b2b4b" />
      <circle cx="-1" cy="-1" r="2" fill="#4a3a5a" opacity="0.5" />
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const len = 8 + (i % 3) * 2;
        return (
          <line
            key={i}
            x1={Math.cos(angle) * 5}
            y1={Math.sin(angle) * 5}
            x2={Math.cos(angle) * len}
            y2={Math.sin(angle) * len}
            stroke={i % 2 === 0 ? '#5a4a6a' : '#4a3a5a'}
            strokeWidth="0.7"
            strokeLinecap="round"
          >
            <animate
              attributeName="x2"
              values={`${Math.cos(angle) * len};${Math.cos(angle) * (len + 1.5)};${Math.cos(angle) * (len - 1)};${Math.cos(angle) * len}`}
              dur={`${2.5 + (i % 4) * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values={`${Math.sin(angle) * len};${Math.sin(angle) * (len + 1.5)};${Math.sin(angle) * (len - 1)};${Math.sin(angle) * len}`}
              dur={`${2.5 + (i % 4) * 0.4}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}
    </g>
  );
}

function SmallShell({ x, y, rot, color }: { x: number; y: number; rot: number; color?: string }) {
  const fill = color || '#f0c8a8';
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <path
        d="M0,-5 Q5,-4 5,1 Q4,5 0,6 Q-4,5 -5,1 Q-5,-4 0,-5Z"
        fill={fill}
        stroke="#c09878"
        strokeWidth="0.6"
      />
      <path d="M0,-5 Q1,0 0,6" fill="none" stroke="#c09878" strokeWidth="0.4" />
      <path d="M-4,-1 Q0,0 4,-1" fill="none" stroke="#c09878" strokeWidth="0.3" />
      <path d="M-4,2 Q0,3 4,2" fill="none" stroke="#c09878" strokeWidth="0.3" />
      {/* shimmer */}
      <ellipse cx="-1" cy="-1" rx="1.5" ry="2" fill="#fff" opacity="0">
        <animate attributeName="opacity" values="0;0.25;0" dur="5s" repeatCount="indefinite" />
      </ellipse>
    </g>
  );
}

function SpiralShell({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <path d="M0,0 Q5,-2 4,-6 Q2,-9 -2,-8 Q-5,-6 -4,-2 Q-3,1 0,3 Q4,5 7,3 Q10,0 9,-5 Q7,-10 2,-12" fill="none" stroke="#dab090" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0,0 Q5,-2 4,-6 Q2,-9 -2,-8" fill="#f0d0b0" stroke="#c89878" strokeWidth="0.5" opacity="0.6" />
      <circle cx="0" cy="0" r="1.5" fill="#e8c0a0" />
    </g>
  );
}

function Seaweed({ x, y, height, color, strands }: { x: number; y: number; height: number; color: string; strands?: number }) {
  const n = strands || 3;
  return (
    <g transform={`translate(${x},${y})`}>
      {Array.from({ length: n }, (_, i) => {
        const offsetX = (i - Math.floor(n / 2)) * 4;
        const h = height - i * 6;
        const delay = i * 0.5;
        return (
          <g key={i}>
            <path
              d={`M${offsetX},0 Q${offsetX + 5},${-h * 0.3} ${offsetX},${-h * 0.5} Q${offsetX - 5},${-h * 0.7} ${offsetX},${-h}`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            >
              <animate
                attributeName="d"
                values={`M${offsetX},0 Q${offsetX + 6},${-h * 0.3} ${offsetX},${-h * 0.5} Q${offsetX - 6},${-h * 0.7} ${offsetX},${-h};M${offsetX},0 Q${offsetX - 4},${-h * 0.25} ${offsetX + 2},${-h * 0.5} Q${offsetX + 7},${-h * 0.75} ${offsetX + 1},${-h};M${offsetX},0 Q${offsetX + 6},${-h * 0.3} ${offsetX},${-h * 0.5} Q${offsetX - 6},${-h * 0.7} ${offsetX},${-h}`}
                dur={`${3 + delay}s`}
                repeatCount="indefinite"
              />
            </path>
            {/* leaf-like bulges */}
            {[0.3, 0.5, 0.7].map((frac, j) => (
              <ellipse
                key={j}
                cx={offsetX + (j % 2 === 0 ? 3 : -3)}
                cy={-h * frac}
                rx="3"
                ry="1.5"
                fill={color}
                opacity="0.4"
                transform={`rotate(${j % 2 === 0 ? 20 : -20} ${offsetX + (j % 2 === 0 ? 3 : -3)} ${-h * frac})`}
              >
                <animate
                  attributeName="cx"
                  values={`${offsetX + (j % 2 === 0 ? 3 : -3)};${offsetX + (j % 2 === 0 ? 5 : -5)};${offsetX + (j % 2 === 0 ? 3 : -3)}`}
                  dur={`${3 + delay}s`}
                  repeatCount="indefinite"
                />
              </ellipse>
            ))}
          </g>
        );
      })}
    </g>
  );
}

function Bubbles({ x, y, count }: { x: number; y: number; count?: number }) {
  const n = count || 6;
  return (
    <g transform={`translate(${x},${y})`}>
      {Array.from({ length: n }, (_, i) => {
        const cx = (i - n / 2) * 4 + Math.sin(i * 1.5) * 3;
        const r = 1 + (i % 3) * 0.8;
        const dur = 3 + i * 0.6;
        return (
          <circle
            key={i}
            cx={cx}
            cy={0}
            r={r}
            fill="none"
            stroke="#8ad4ff"
            strokeWidth="0.5"
            opacity="0"
          >
            <animate attributeName="cy" values={`0;${-30 - i * 8};${-60 - i * 12}`} dur={`${dur}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0.4;0" dur={`${dur}s`} repeatCount="indefinite" />
            <animate attributeName="r" values={`${r};${r + 0.5};${r + 1}`} dur={`${dur}s`} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${cx};${cx + 2};${cx - 1};${cx + 1}`} dur={`${dur * 0.7}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </g>
  );
}

function Jellyfish({ x, y, color, size }: { x: number; y: number; color: string; size?: number }) {
  const s = size || 1;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* bell */}
      <path d="M-8,0 Q-8,-10 0,-12 Q8,-10 8,0 Z" fill={color} opacity="0.6" stroke={color} strokeWidth="0.5">
        <animate attributeName="d" values="M-8,0 Q-8,-10 0,-12 Q8,-10 8,0 Z;M-7,0 Q-7,-11 0,-13 Q7,-11 7,0 Z;M-8,0 Q-8,-10 0,-12 Q8,-10 8,0 Z" dur="2.5s" repeatCount="indefinite" />
      </path>
      {/* inner glow */}
      <path d="M-5,-1 Q-5,-8 0,-9 Q5,-8 5,-1 Z" fill="#fff" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2.5s" repeatCount="indefinite" />
      </path>
      {/* tentacles */}
      {[-5, -2, 1, 4].map((tx, i) => (
        <path
          key={i}
          d={`M${tx},0 Q${tx + 2},8 ${tx},16 Q${tx - 2},22 ${tx},28`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            values={`M${tx},0 Q${tx + 2},8 ${tx},16 Q${tx - 2},22 ${tx},28;M${tx},0 Q${tx - 3},10 ${tx + 1},18 Q${tx + 3},24 ${tx - 1},30;M${tx},0 Q${tx + 2},8 ${tx},16 Q${tx - 2},22 ${tx},28`}
            dur={`${3 + i * 0.4}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
      {/* floating up and down */}
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`${x},${y};${x + 3},${y - 15};${x - 2},${y - 5};${x + 1},${y + 5};${x},${y}`}
        dur="12s"
        repeatCount="indefinite"
      />
    </g>
  );
}

function TinyFish({ x, y, color, dir }: { x: number; y: number; color: string; dir?: number }) {
  const d = dir || 1;
  return (
    <g transform={`translate(${x},${y}) scale(${d},1)`}>
      {/* body */}
      <ellipse cx="0" cy="0" rx="5" ry="2.5" fill={color} />
      {/* tail */}
      <path d="M-5,0 L-9,-3 L-9,3 Z" fill={color} opacity="0.8">
        <animate attributeName="d" values="M-5,0 L-9,-3 L-9,3 Z;M-5,0 L-8,-4 L-8,4 Z;M-5,0 L-9,-3 L-9,3 Z" dur="0.6s" repeatCount="indefinite" />
      </path>
      {/* eye */}
      <circle cx="3" cy="-0.5" r="1" fill="#fff" />
      <circle cx="3.3" cy="-0.5" r="0.5" fill="#222" />
      {/* fin */}
      <path d="M-1,-2.5 L0,-5 L2,-2.5" fill={color} opacity="0.6">
        <animate attributeName="d" values="M-1,-2.5 L0,-5 L2,-2.5;M-1,-2.5 L0,-4 L2,-2.5;M-1,-2.5 L0,-5 L2,-2.5" dur="1s" repeatCount="indefinite" />
      </path>
      {/* swimming path */}
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`${x},${y};${x + d * 20},${y - 5};${x + d * 35},${y + 3};${x + d * 15},${y - 2};${x},${y}`}
        dur="15s"
        repeatCount="indefinite"
      />
    </g>
  );
}

function Coral({ x, y, color, type }: { x: number; y: number; color: string; type?: 'branch' | 'brain' | 'fan' }) {
  const t = type || 'branch';
  if (t === 'brain') {
    return (
      <g transform={`translate(${x},${y})`}>
        <ellipse cx="0" cy="0" rx="12" ry="8" fill={color} opacity="0.8" />
        <path d="M-8,0 Q-4,-3 0,0 Q4,3 8,0" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <path d="M-6,-3 Q-2,-6 2,-3 Q6,0 8,-2" fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.25" />
        <path d="M-7,3 Q-3,0 1,3 Q5,6 7,3" fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.25" />
        <animate attributeName="opacity" values="0.8;0.9;0.8" dur="6s" repeatCount="indefinite" />
      </g>
    );
  }
  if (t === 'fan') {
    return (
      <g transform={`translate(${x},${y})`}>
        <line x1="0" y1="0" x2="0" y2="15" stroke="#7a5a3a" strokeWidth="2" />
        {Array.from({ length: 7 }, (_, i) => {
          const angle = (i / 6) * Math.PI - Math.PI / 2;
          const r = 14;
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * r}
              y2={Math.sin(angle) * r}
              stroke={color}
              strokeWidth="1.2"
              opacity="0.7"
            >
              <animate
                attributeName="x2"
                values={`${Math.cos(angle) * r};${Math.cos(angle) * r + 2};${Math.cos(angle) * r - 1};${Math.cos(angle) * r}`}
                dur={`${3 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
        {/* mesh between rays */}
        <path d={`M${Math.cos(-Math.PI/2)*14},${Math.sin(-Math.PI/2)*14} Q0,-8 ${Math.cos(Math.PI/2)*14},${Math.sin(Math.PI/2)*14}`} fill={color} opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.35;0.2" dur="4s" repeatCount="indefinite" />
        </path>
      </g>
    );
  }
  // branch coral
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="0" y1="0" x2="0" y2="-15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="0" y1="-6" x2="-7" y2="-14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="-9" x2="6" y2="-16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="-7" y1="-14" x2="-10" y2="-18" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="y2" values="-18;-20;-17;-18" dur="4s" repeatCount="indefinite" />
      </line>
      <line x1="6" y1="-16" x2="9" y2="-20" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="y2" values="-20;-18;-21;-20" dur="4.5s" repeatCount="indefinite" />
      </line>
      <line x1="0" y1="-15" x2="0" y2="-20" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <animate attributeName="y2" values="-20;-22;-19;-20" dur="3.8s" repeatCount="indefinite" />
      </line>
      {/* tiny polyps at tips */}
      {[[-10, -18], [9, -20], [0, -20]].map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r="1.5" fill={color} opacity="0.6">
          <animate attributeName="r" values="1.5;2.5;1.5" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  );
}

function Hermitcrab({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  const d = flip ? -1 : 1;
  return (
    <g transform={`translate(${x},${y}) scale(${d},1)`}>
      {/* spiral shell */}
      <ellipse cx="2" cy="-2" rx="6" ry="5" fill="#d4a87a" stroke="#a08060" strokeWidth="0.7" />
      <path d="M5,-2 Q5,-6 2,-7 Q-1,-6 -1,-3 Q0,0 3,0" fill="none" stroke="#c09060" strokeWidth="0.8" />
      <circle cx="3" cy="-3" r="1.5" fill="#c09060" opacity="0.5" />
      {/* body poking out */}
      <ellipse cx="-5" cy="1" rx="4" ry="3" fill="#e88060" />
      {/* eyes */}
      <line x1="-7" y1="-1" x2="-9" y2="-4" stroke="#c06040" strokeWidth="0.8" />
      <line x1="-5" y1="-1" x2="-6" y2="-4" stroke="#c06040" strokeWidth="0.8" />
      <circle cx="-9" cy="-4.5" r="1" fill="#222" />
      <circle cx="-6" cy="-4.5" r="1" fill="#222" />
      {/* legs */}
      <line x1="-6" y1="3" x2="-9" y2="6" stroke="#c06040" strokeWidth="0.7">
        <animate attributeName="x2" values="-9;-10;-8;-9" dur="1.5s" repeatCount="indefinite" />
      </line>
      <line x1="-4" y1="3" x2="-6" y2="6" stroke="#c06040" strokeWidth="0.7">
        <animate attributeName="x2" values="-6;-5;-7;-6" dur="1.3s" repeatCount="indefinite" />
      </line>
      {/* slow crawl */}
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`${x},${y};${x + d * 6},${y};${x + d * 10},${y};${x + d * 6},${y};${x},${y}`}
        dur="20s"
        repeatCount="indefinite"
      />
    </g>
  );
}

function LightCaustics({ width }: { width: number }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const cx = (width * (i + 0.5)) / 6;
        const cy = 80 + i * 140;
        const r = 20 + (i % 3) * 15;
        return (
          <ellipse
            key={i}
            cx={cx % width}
            cy={cy}
            rx={r}
            ry={r * 0.6}
            fill="#38bdf8"
            opacity="0"
            transform={`rotate(${i * 25} ${cx % width} ${cy})`}
          >
            <animate attributeName="opacity" values="0;0.06;0.12;0.04;0" dur={`${5 + (i % 4)}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="rx" values={`${r};${r + 8};${r - 3};${r}`} dur={`${6 + (i % 3)}s`} repeatCount="indefinite" />
          </ellipse>
        );
      })}
    </g>
  );
}

/* ─── Main tide pool scene ─── */

function TidePoolScene({ width, side }: { width: number; side: 'left' | 'right' }) {
  const flip = side === 'right';
  const w = width;

  return (
    <svg
      width={w}
      height="100%"
      viewBox={`0 0 ${w} 1600`}
      preserveAspectRatio="xMidYMin slice"
      className="h-full w-full"
      style={{ minHeight: '100vh' }}
    >
      <defs>
        <linearGradient id={`pool-bg-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#071e2e" stopOpacity="0.97" />
          <stop offset="20%" stopColor="#0a3050" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#0c4a6e" stopOpacity="0.92" />
          <stop offset="80%" stopColor="#0e5a82" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#106a98" stopOpacity="0.88" />
        </linearGradient>
        <radialGradient id={`caustic-${side}`}>
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0a3d5c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* deep ocean background */}
      <rect width={w} height="1600" fill={`url(#pool-bg-${side})`} />

      {/* animated light caustics */}
      <LightCaustics width={w} />

      {/* water surface ripples */}
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={`ripple-${i}`}
          d={`M0,${i * 115} Q${w / 2},${i * 115 - 6} ${w},${i * 115}`}
          fill="none"
          stroke="#7ec8e3"
          strokeWidth="0.6"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            values={`M0,${i * 115} Q${w / 2},${i * 115 - 6} ${w},${i * 115};M0,${i * 115} Q${w / 2},${i * 115 + 6} ${w},${i * 115};M0,${i * 115} Q${w / 2},${i * 115 - 6} ${w},${i * 115}`}
            dur={`${3 + (i % 4)}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}

      {/* ═══ rocky surfaces ═══ */}
      {[120, 320, 550, 780, 1000, 1200, 1430].map((cy, i) => (
        <ellipse key={`rock-${i}`} cx={w * (0.3 + (i % 3) * 0.2)} cy={cy} rx={20 + (i % 2) * 10} ry={6 + (i % 3) * 2} fill="#1a3a2e" opacity={0.4 + (i % 3) * 0.1} />
      ))}

      {/* ═══ ZONE 1: Surface (0-300) ═══ */}
      <Seaweed x={w * 0.15} y={130} height={70} color="#2a9a4a" strands={4} />
      <Starfish x={w * 0.7} y={60} size={20} rot={15} color="#ff5858" dur={25} />
      <Bubbles x={w * 0.5} y={80} count={8} />
      <TinyFish x={w * 0.3} y={50} color="#68b8ff" dir={flip ? -1 : 1} />
      <SmallShell x={w * 0.8} y={140} rot={-20} color="#ffd0b0" />
      <Coral x={w * 0.6} y={180} color="#ff6080" type="branch" />

      {/* ═══ ZONE 2: Upper reef (300-550) ═══ */}
      <SeaAnemone x={w * 0.3} y={320} color="#ff60b0" size={1.3} />
      <Crab x={w * 0.75} y={370} flip={flip} size={1.2} />
      <Jellyfish x={w * 0.5} y={280} color="#c080ff" size={0.8} />
      <Seaweed x={w * 0.85} y={420} height={60} color="#3aaa5a" strands={3} />
      <Starfish x={w * 0.15} y={400} size={15} rot={-40} color="#ffaa30" dur={35} />
      <SmallShell x={w * 0.55} y={350} rot={65} color="#e8c8d8" />
      <SpiralShell x={w * 0.2} y={450} rot={30} />
      <Coral x={w * 0.65} y={500} color="#ff8848" type="fan" />
      <Bubbles x={w * 0.4} y={480} count={5} />
      <TinyFish x={w * 0.7} y={320} color="#ff9868" dir={flip ? 1 : -1} />

      {/* ═══ ZONE 3: Mid reef (550-800) ═══ */}
      <SeaUrchin x={w * 0.5} y={580} size={1.3} />
      <SeaAnemone x={w * 0.8} y={620} color="#60e0a0" size={1.1} />
      <Crab x={w * 0.2} y={680} flip={!flip} size={1} />
      <Seaweed x={w * 0.6} y={720} height={55} color="#2a8a5a" strands={5} />
      <Starfish x={w * 0.4} y={650} size={22} rot={80} color="#e87088" dur={30} />
      <Hermitcrab x={w * 0.7} y={750} flip={flip} />
      <Coral x={w * 0.15} y={700} color="#ff5070" type="brain" />
      <Jellyfish x={w * 0.35} y={560} color="#80d0ff" size={0.6} />
      <SmallShell x={w * 0.85} y={770} rot={-70} />
      <Bubbles x={w * 0.25} y={690} count={7} />

      {/* ═══ ZONE 4: Deep reef (800-1050) ═══ */}
      <SeaAnemone x={w * 0.5} y={850} color="#d080e0" size={1.4} />
      <Seaweed x={w * 0.1} y={920} height={65} color="#2aa06a" strands={4} />
      <Crab x={w * 0.6} y={950} flip={flip} size={0.9} />
      <SeaUrchin x={w * 0.8} y={880} size={1} />
      <Starfish x={w * 0.25} y={1000} size={17} rot={-15} color="#ff6060" dur={28} />
      <TinyFish x={w * 0.45} y={830} color="#aae060" dir={flip ? -1 : 1} />
      <Coral x={w * 0.7} y={1020} color="#ffa058" type="branch" />
      <SpiralShell x={w * 0.3} y={970} rot={-45} />
      <Jellyfish x={w * 0.8} y={810} color="#ff80c0" size={0.7} />
      <Bubbles x={w * 0.55} y={940} count={6} />

      {/* ═══ ZONE 5: Deep floor (1050-1300) ═══ */}
      <Hermitcrab x={w * 0.4} y={1080} flip={!flip} />
      <SeaAnemone x={w * 0.15} y={1130} color="#70c8e0" size={1.2} />
      <Seaweed x={w * 0.75} y={1200} height={70} color="#3a9a4a" strands={4} />
      <Crab x={w * 0.5} y={1180} flip={flip} size={1.1} />
      <Coral x={w * 0.3} y={1250} color="#e06090" type="fan" />
      <Starfish x={w * 0.65} y={1100} size={19} rot={45} color="#ffcc40" dur={32} />
      <SeaUrchin x={w * 0.2} y={1220} size={0.9} />
      <TinyFish x={w * 0.6} y={1060} color="#68d8a8" dir={flip ? 1 : -1} />
      <SmallShell x={w * 0.85} y={1280} rot={130} color="#d8b8c8" />
      <Bubbles x={w * 0.4} y={1150} count={8} />

      {/* ═══ ZONE 6: Abyss (1300-1600) ═══ */}
      <Jellyfish x={w * 0.3} y={1320} color="#a060ff" size={0.9} />
      <Seaweed x={w * 0.55} y={1450} height={60} color="#2a7a4a" strands={3} />
      <SeaAnemone x={w * 0.75} y={1400} color="#e05080" size={1} />
      <Starfish x={w * 0.2} y={1480} size={16} rot={-60} color="#ff7888" dur={26} />
      <Crab x={w * 0.45} y={1520} flip={!flip} size={0.8} />
      <Hermitcrab x={w * 0.8} y={1560} flip={flip} />
      <Coral x={w * 0.1} y={1500} color="#ff9070" type="brain" />
      <SeaUrchin x={w * 0.6} y={1380} size={1.1} />
      <Bubbles x={w * 0.7} y={1440} count={5} />
      <TinyFish x={w * 0.35} y={1350} color="#ffa868" dir={flip ? -1 : 1} />
      <SmallShell x={w * 0.5} y={1570} rot={-30} />
    </svg>
  );
}

export function TidePoolMargins() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1200);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Left tide pool margin — 160px wide */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-10 h-full"
        style={{ width: '160px' }}
      >
        <TidePoolScene width={160} side="left" />
      </div>

      {/* Right tide pool margin — 160px wide */}
      <div
        className="pointer-events-none fixed right-0 top-0 z-10 h-full"
        style={{ width: '160px' }}
      >
        <TidePoolScene width={160} side="right" />
      </div>
    </>
  );
}
