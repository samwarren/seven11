// 8-bit pixel art icons rendered as inline SVGs
// Multi-color, cute, vibrant — each icon has its own palette

interface PixelIconProps {
  name: string;
  size?: number;
  className?: string;
}

const ICONS: Record<string, () => React.ReactNode> = {
  home: () => (
    <>
      <path d="M8 1L1 7h2v7h4v-4h2v4h4V7h2L8 1z" fill="#f97316" />
      <path d="M8 1L1 7h2v1h10V7h2L8 1z" fill="#fb923c" />
      <rect x="6" y="10" width="4" height="4" fill="#fef9c3" />
      <rect x="7" y="11" width="2" height="1" fill="#38bdf8" />
    </>
  ),
  heart: () => (
    <>
      <path d="M4 2C2 2 1 3.5 1 5c0 4 7 9 7 9s7-5 7-9c0-1.5-1-3-3-3-1.5 0-2.5 1-3 2H7C6 3 5 2 4 2z" fill="#f43f5e" />
      <path d="M4 3c-1 0-2 1-2 2 0 .5.1 1 .3 1.5l5.7 6 5.7-6c.2-.5.3-1 .3-1.5 0-1-1-2-2-2-.8 0-1.5.5-2 1.2L8 6l-2-1.8C5.5 3.5 4.8 3 4 3z" fill="#fb7185" />
    </>
  ),
  calendar: () => (
    <>
      <rect x="2" y="3" width="12" height="11" rx="1" fill="#8b5cf6" />
      <rect x="2" y="3" width="12" height="3" fill="#7c3aed" />
      <path d="M5 1v3M11 1v3" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="4" y="7.5" width="2" height="1.5" rx="0.3" fill="#e9d5ff" />
      <rect x="7" y="7.5" width="2" height="1.5" rx="0.3" fill="#fda4af" />
      <rect x="10" y="7.5" width="2" height="1.5" rx="0.3" fill="#e9d5ff" />
      <rect x="4" y="10.5" width="2" height="1.5" rx="0.3" fill="#e9d5ff" />
      <rect x="7" y="10.5" width="2" height="1.5" rx="0.3" fill="#e9d5ff" />
    </>
  ),
  people: () => (
    <>
      <circle cx="5" cy="4" r="2.5" fill="#fdba74" />
      <circle cx="11" cy="4" r="2.5" fill="#fdba74" />
      <path d="M1 13c0-3 2-5 4-5s4 2 4 5H1z" fill="#38bdf8" />
      <path d="M7 13c0-3 2-5 4-5s4 2 4 5H7z" fill="#f43f5e" />
      <circle cx="4.2" cy="3.8" r="0.5" fill="#0c4a6e" />
      <circle cx="5.8" cy="3.8" r="0.5" fill="#0c4a6e" />
      <circle cx="10.2" cy="3.8" r="0.5" fill="#0c4a6e" />
      <circle cx="11.8" cy="3.8" r="0.5" fill="#0c4a6e" />
    </>
  ),
  camera: () => (
    <>
      <path d="M5 3h6l1 2H4l1-2z" fill="#6d28d9" />
      <rect x="2" y="5" width="12" height="8" rx="1" fill="#8b5cf6" />
      <circle cx="8" cy="9" r="3" fill="#c084fc" />
      <circle cx="8" cy="9" r="1.8" fill="#e9d5ff" />
      <circle cx="7.2" cy="8.4" r="0.6" fill="#fff" />
      <rect x="11" y="6" width="2" height="1" rx="0.5" fill="#facc15" />
    </>
  ),
  plane: () => (
    <>
      <path d="M8 1L6 6H1l2 2-1 6h2l4-4 4 4h2l-1-6 2-2h-5L8 1z" fill="#38bdf8" />
      <path d="M8 1L7 4h2L8 1z" fill="#7dd3fc" />
      <circle cx="8" cy="6" r="1" fill="#fff" />
    </>
  ),
  mail: () => (
    <>
      <rect x="1" y="4" width="14" height="9" rx="1" fill="#f43f5e" />
      <path d="M1 4l7 5 7-5" fill="none" stroke="#fda4af" strokeWidth="1.2" />
      <path d="M1 13l5-4M15 13l-5-4" fill="none" stroke="#fb7185" strokeWidth="0.8" />
      <circle cx="12" cy="5" r="2" fill="#facc15" />
    </>
  ),
  pencil: () => (
    <>
      <path d="M11 1l4 4-9 9H2v-4l9-9z" fill="#facc15" />
      <path d="M11 1l4 4-1 1-4-4 1-1z" fill="#f97316" />
      <path d="M2 14l1-3 2 2-3 1z" fill="#fdba74" />
      <path d="M2 14h12" stroke="#a78bfa" strokeWidth="1" />
    </>
  ),
  question: () => (
    <>
      <circle cx="8" cy="8" r="7" fill="#22d3a0" />
      <circle cx="8" cy="8" r="5.5" fill="#16a37a" />
      <path d="M6 5.5c0-1.5 1-2.5 2-2.5s2 1 2 2c0 1.5-2 2-2 3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="12" r="1" fill="#fff" />
    </>
  ),
  wave: () => (
    <>
      <path d="M0 8Q2 4 4 8Q6 12 8 8Q10 4 12 8Q14 12 16 8v6H0z" fill="#38bdf8" />
      <path d="M0 10Q2 7 4 10Q6 13 8 10Q10 7 12 10Q14 13 16 10v4H0z" fill="#0ea5e9" />
      <path d="M2 7Q3 5.5 4 7" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
    </>
  ),
  surfer: () => (
    <>
      <circle cx="8" cy="3" r="2" fill="#fdba74" />
      <circle cx="7.3" cy="2.8" r="0.4" fill="#0c4a6e" />
      <circle cx="8.7" cy="2.8" r="0.4" fill="#0c4a6e" />
      <path d="M8 5v4M5 7h6M6 9l-2 5M10 9l2 5" stroke="#f97316" strokeWidth="1.2" fill="none" />
      <path d="M1 14Q4 11 8 11Q12 11 15 14" fill="none" stroke="#facc15" strokeWidth="1.5" />
      <path d="M0 15h16v1H0z" fill="#38bdf8" />
    </>
  ),
  dolphin: () => (
    <>
      <path d="M3 7Q5 3 9 4Q13 5 14 8Q13 11 9 11Q7 11 6 10L3 12V10Q2 9 3 7z" fill="#7dd3fc" />
      <path d="M3 7Q5 4 8 4.5Q6 6 5 8Q4 9 3.5 8z" fill="#bae6fd" />
      <path d="M12 5l2-1v2" fill="#38bdf8" />
      <circle cx="10" cy="7" r="0.8" fill="#0c4a6e" />
      <path d="M12 9.5q1-0.3 1.5 0" fill="none" stroke="#0c4a6e" strokeWidth="0.5" />
    </>
  ),
  sunset: () => (
    <>
      <path d="M0 12h16v3H0z" fill="#38bdf8" />
      <path d="M3 10a5 5 0 0110 0" fill="#f97316" />
      <path d="M4.5 10a3.5 3.5 0 017 0" fill="#facc15" />
      <path d="M8 2v2M3 5l1.5 1.5M13 5l-1.5 1.5M1 10h2M13 10h2" stroke="#fb923c" strokeWidth="1" />
    </>
  ),
  star: () => (
    <>
      <path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5l2-5z" fill="#facc15" />
      <path d="M8 3l1.2 3h3.2l-2.5 2 .9 3L8 9.5 5.2 11l.9-3L3.6 6h3.2L8 3z" fill="#fde047" />
    </>
  ),
  shell: () => (
    <>
      <path d="M8 2C4 2 2 6 2 9c0 3 2 5 6 5s6-2 6-5c0-3-2-7-6-7z" fill="#fda4af" />
      <path d="M5 5.5Q8 3.5 11 5.5" fill="none" stroke="#fff" strokeWidth="0.8" />
      <path d="M4 8Q8 6 12 8" fill="none" stroke="#fff" strokeWidth="0.8" />
      <path d="M5 10.5Q8 8.5 11 10.5" fill="none" stroke="#fff" strokeWidth="0.8" />
      <path d="M8 2v12" fill="none" stroke="#fb7185" strokeWidth="0.5" opacity="0.4" />
    </>
  ),
  sparkle: () => (
    <>
      <path d="M8 0l1.5 6 6.5 1-6.5 1L8 14l-1.5-6L0 7l6.5-1L8 0z" fill="#facc15" />
      <path d="M8 3l.8 3.5L12.5 7l-3.7.5L8 11l-.8-3.5L3.5 7l3.7-.5L8 3z" fill="#fef08a" />
    </>
  ),
  map: () => (
    <>
      <path d="M1 2l5 2 4-2 5 2v11l-5-2-4 2-5-2V2z" fill="#22d3a0" />
      <path d="M6 4v9" stroke="#16a37a" strokeWidth="1" />
      <path d="M10 2v9" stroke="#16a37a" strokeWidth="1" />
      <circle cx="8" cy="7" r="1.5" fill="#f43f5e" />
      <circle cx="8" cy="7" r="0.6" fill="#fff" />
    </>
  ),
  fire: () => (
    <>
      <path d="M8 1C6 4 4 6 4 9c0 2.5 2 5 4 5s4-2.5 4-5C12 6 10 4 8 1z" fill="#f97316" />
      <path d="M8 4C7 6 5.5 7 5.5 9c0 1.5 1 3 2.5 3s2.5-1.5 2.5-3C10.5 7 9 6 8 4z" fill="#fb923c" />
      <path d="M8 8c-1 1-1.5 2-1.5 3 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5C9.5 10 9 9 8 8z" fill="#facc15" />
    </>
  ),
  car: () => (
    <>
      <path d="M3 7l1.5-3h7l1.5 3" fill="#38bdf8" />
      <rect x="1" y="7" width="14" height="4" rx="1" fill="#f43f5e" />
      <circle cx="4" cy="12" r="1.5" fill="#334155" />
      <circle cx="4" cy="12" r="0.6" fill="#94a3b8" />
      <circle cx="12" cy="12" r="1.5" fill="#334155" />
      <circle cx="12" cy="12" r="0.6" fill="#94a3b8" />
      <rect x="3" y="8" width="3" height="1.5" rx="0.5" fill="#bae6fd" />
      <rect x="10" y="8" width="3" height="1.5" rx="0.5" fill="#bae6fd" />
    </>
  ),
  house: () => (
    <>
      <path d="M8 1L1 7h2v7h10V7h2L8 1z" fill="#fb923c" />
      <path d="M8 1L1 7h2v1h10V7h2L8 1z" fill="#fdba74" />
      <rect x="6" y="9" width="4" height="5" fill="#92400e" />
      <rect x="4" y="8" width="2.5" height="2" fill="#bae6fd" />
    </>
  ),
  dog: () => (
    <>
      <path d="M4 4C3 2 5 1 6 2h4c1-1 3 0 2 2v3c0 2-1 3-2 3H6c-1 0-2-1-2-3V4z" fill="#fdba74" />
      <path d="M3.5 3Q3 1 5 2" fill="none" stroke="#f97316" strokeWidth="1" />
      <path d="M12.5 3Q13 1 11 2" fill="none" stroke="#f97316" strokeWidth="1" />
      <circle cx="6" cy="5" r="0.8" fill="#0c4a6e" />
      <circle cx="10" cy="5" r="0.8" fill="#0c4a6e" />
      <ellipse cx="8" cy="6.8" rx="1" ry="0.6" fill="#0c4a6e" />
      <path d="M7 7.5Q8 8.2 9 7.5" fill="none" stroke="#f43f5e" strokeWidth="0.5" />
      <path d="M5 10h6c0 2-1.5 4-3 4s-3-2-3-4z" fill="#fdba74" />
    </>
  ),
  ring: () => (
    <>
      <circle cx="8" cy="9" r="4.5" fill="none" stroke="#facc15" strokeWidth="2.5" />
      <circle cx="8" cy="9" r="4.5" fill="none" stroke="#fde047" strokeWidth="1" />
      <path d="M6 4l2-3 2 3H6z" fill="#38bdf8" />
      <path d="M7 3l1-1.5L9 3" fill="#7dd3fc" />
      <circle cx="8" cy="3.5" r="1" fill="#c084fc" />
    </>
  ),
  party: () => (
    <>
      <path d="M4 15L8 2l4 13H4z" fill="#f43f5e" />
      <path d="M5.5 9h5" stroke="#facc15" strokeWidth="1" />
      <path d="M5 11.5h6" stroke="#22d3a0" strokeWidth="1" />
      <path d="M6.5 6.5h3" stroke="#38bdf8" strokeWidth="1" />
      <circle cx="5" cy="2" r="1" fill="#facc15" />
      <circle cx="11" cy="1" r="0.8" fill="#22d3a0" />
      <circle cx="3" cy="4" r="0.6" fill="#c084fc" />
      <circle cx="13" cy="3" r="0.7" fill="#38bdf8" />
    </>
  ),
  ceremony: () => (
    <>
      <path d="M3 5v9h10V5" fill="#e9d5ff" />
      <path d="M8 1v4M6 5h4" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="1" y="14" width="14" height="1.5" fill="#8b5cf6" />
      <path d="M7 7v4M9 7v4" stroke="#facc15" strokeWidth="0.8" />
      <path d="M6 9h4" stroke="#facc15" strokeWidth="0.8" />
      <circle cx="8" cy="1" r="1" fill="#facc15" />
    </>
  ),
  drink: () => (
    <>
      <path d="M4 2h8l-1 8H5L4 2z" fill="#c084fc" />
      <path d="M4.5 2h7l-.3 2H4.8z" fill="#e9d5ff" />
      <rect x="7" y="10" width="2" height="3" fill="#a78bfa" />
      <rect x="5" y="13" width="6" height="1" rx="0.5" fill="#8b5cf6" />
      <path d="M12 2l2.5-1" stroke="#22d3a0" strokeWidth="0.8" />
      <circle cx="14.5" cy="1" r="1.2" fill="#22d3a0" />
      <circle cx="14.5" cy="1" r="0.5" fill="#f43f5e" />
    </>
  ),
  pin: () => (
    <>
      <path d="M8 15l-4-6c-1-2-1.5-3-1.5-5C2.5 1.5 5 0 8 0s5.5 1.5 5.5 4c0 2-.5 3-1.5 5l-4 6z" fill="#f43f5e" />
      <path d="M8 14l-3-4.5C4 8 3.5 7 3.5 5.5 3.5 3 5.5 1 8 1s4.5 2 4.5 4.5c0 1.5-.5 2.5-1.5 4L8 14z" fill="#fb7185" />
      <circle cx="8" cy="5" r="2" fill="#fff" />
    </>
  ),
  hotel: () => (
    <>
      <rect x="2" y="3" width="12" height="11" fill="#f97316" />
      <rect x="2" y="3" width="12" height="2" fill="#ea580c" />
      <rect x="2" y="14" width="12" height="1.5" fill="#c2410c" />
      <rect x="4" y="6" width="2" height="2" rx="0.3" fill="#fef9c3" />
      <rect x="7" y="6" width="2" height="2" rx="0.3" fill="#fef9c3" />
      <rect x="10" y="6" width="2" height="2" rx="0.3" fill="#fef9c3" />
      <rect x="4" y="10" width="2" height="2" rx="0.3" fill="#fef9c3" />
      <rect x="10" y="10" width="2" height="2" rx="0.3" fill="#fef9c3" />
      <rect x="7" y="11" width="2" height="4.5" rx="0.3" fill="#92400e" />
    </>
  ),
  groom: () => (
    <>
      <rect x="5" y="1" width="6" height="2" rx="0.5" fill="#334155" />
      <rect x="3.5" y="2.5" width="9" height="1.5" rx="0.5" fill="#1e293b" />
      <circle cx="8" cy="6" r="3" fill="#fdba74" />
      <circle cx="6.8" cy="5.5" r="0.5" fill="#0c4a6e" />
      <circle cx="9.2" cy="5.5" r="0.5" fill="#0c4a6e" />
      <path d="M7 7.2Q8 7.8 9 7.2" fill="none" stroke="#f43f5e" strokeWidth="0.5" />
      <rect x="5.5" y="9" width="5" height="6" rx="0.5" fill="#1e293b" />
      <path d="M7.5 9v3" stroke="#fff" strokeWidth="0.8" />
      <circle cx="7.5" cy="10" r="0.4" fill="#f43f5e" />
    </>
  ),
  bride: () => (
    <>
      <path d="M5 0h6l1 3H4l1-3z" fill="#fff" />
      <path d="M4 2.5Q4 0 6 0.5" fill="none" stroke="#e9d5ff" strokeWidth="0.5" />
      <path d="M12 2.5Q12 0 10 0.5" fill="none" stroke="#e9d5ff" strokeWidth="0.5" />
      <circle cx="8" cy="5.5" r="3" fill="#fdba74" />
      <circle cx="6.8" cy="5" r="0.5" fill="#0c4a6e" />
      <circle cx="9.2" cy="5" r="0.5" fill="#0c4a6e" />
      <path d="M7 6.5Q8 7.2 9 6.5" fill="none" stroke="#f43f5e" strokeWidth="0.5" />
      <path d="M4 8.5l4 1 4-1v6l-4 1-4-1v-6z" fill="#fff" />
      <path d="M6 10h4" stroke="#e9d5ff" strokeWidth="0.5" />
      <circle cx="8" cy="9.5" r="0.5" fill="#fda4af" />
    </>
  ),
  check: () => (
    <>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#22d3a0" />
      <path d="M4 8l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  cross: () => (
    <>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#f43f5e" />
      <path d="M5 5l6 6M11 5l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  search: () => (
    <>
      <circle cx="7" cy="7" r="4.5" fill="none" stroke="#8b5cf6" strokeWidth="2" />
      <circle cx="7" cy="7" r="2.5" fill="#e9d5ff" />
      <path d="M10.5 10.5l3.5 3.5" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  book: () => (
    <>
      <path d="M3 2h10c0 0 1 0 1 1v10c0 1-1 1-1 1H3V2z" fill="#f97316" />
      <path d="M3 2h1v12H3z" fill="#ea580c" />
      <path d="M5 2v12" stroke="#c2410c" strokeWidth="0.5" />
      <rect x="6.5" y="5" width="5" height="1" rx="0.3" fill="#fef9c3" />
      <rect x="6.5" y="7.5" width="4" height="1" rx="0.3" fill="#fef9c3" />
      <rect x="6.5" y="10" width="3" height="1" rx="0.3" fill="#fef9c3" />
    </>
  ),
  gift: () => (
    <>
      <rect x="2" y="6" width="12" height="3" rx="0.5" fill="#f43f5e" />
      <rect x="3" y="9" width="10" height="5" rx="0.5" fill="#fb7185" />
      <rect x="7" y="6" width="2" height="8" fill="#facc15" />
      <path d="M5 3Q5 1 8 3" fill="none" stroke="#22d3a0" strokeWidth="1.2" />
      <path d="M11 3Q11 1 8 3" fill="none" stroke="#c084fc" strokeWidth="1.2" />
      <rect x="6.5" y="2" width="3" height="4" rx="0.5" fill="#facc15" />
      <circle cx="8" cy="3" r="1" fill="#fde047" />
    </>
  ),
  construction: () => (
    <>
      <rect x="1" y="5" width="14" height="6" fill="#facc15" />
      <path d="M1 5l2.5-2.5h2L3 5M5.5 5L8 2.5h2L7.5 5M10 5l2.5-2.5h2L12 5" fill="#0c4a6e" />
      <path d="M1 8l2-2M4.5 8l2-2M8 8l2-2M11.5 8l2-2" stroke="#0c4a6e" strokeWidth="1.5" />
    </>
  ),
  hourglass: () => (
    <>
      <rect x="4" y="0.5" width="8" height="1.5" rx="0.5" fill="#8b5cf6" />
      <rect x="4" y="14" width="8" height="1.5" rx="0.5" fill="#8b5cf6" />
      <path d="M5 2v1l3 5-3 5v1h6v-1l-3-5 3-5V2H5z" fill="#c084fc" />
      <path d="M6 3h4L8 6z" fill="#facc15" />
      <path d="M6 13h4L8 10z" fill="#fde047" opacity="0.5" />
    </>
  ),
  compass: () => (
    <>
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="#22d3a0" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="5" fill="#dcfce7" />
      <path d="M8 3l2 4-2 1-2-1 2-4z" fill="#f43f5e" />
      <path d="M8 13l-2-4 2-1 2 1-2 4z" fill="#0ea5e9" />
      <circle cx="8" cy="8" r="1" fill="#facc15" />
    </>
  ),
  sun: () => (
    <>
      <circle cx="8" cy="8" r="3" fill="#facc15" />
      <circle cx="8" cy="8" r="2" fill="#fde047" />
      <path d="M8 1v2.5M8 12.5v2.5M1 8h2.5M12.5 8h2.5M3 3l1.8 1.8M11.2 3l-1.8 1.8M3 13l1.8-1.8M11.2 13l-1.8-1.8" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  palmtree: () => (
    <>
      <rect x="7" y="7" width="2" height="8" rx="0.5" fill="#92400e" />
      <path d="M8 4Q12 1 14 4Q12 5.5 8 5" fill="#22d3a0" />
      <path d="M8 4Q4 1 2 4Q4 5.5 8 5" fill="#16a37a" />
      <path d="M8 3Q9 0 10.5 1.5" fill="none" stroke="#22d3a0" strokeWidth="1.2" />
      <circle cx="9" cy="6" r="0.6" fill="#92400e" />
      <circle cx="7" cy="6.5" r="0.5" fill="#92400e" />
    </>
  ),
  info: () => (
    <>
      <circle cx="8" cy="8" r="7" fill="#38bdf8" />
      <circle cx="8" cy="8" r="5.5" fill="#0ea5e9" />
      <circle cx="8" cy="4.5" r="1" fill="#fff" />
      <rect x="7" y="7" width="2" height="5" rx="0.5" fill="#fff" />
    </>
  ),
  email: () => (
    <>
      <rect x="1" y="4" width="14" height="9" rx="1" fill="#8b5cf6" />
      <path d="M1 4l7 5 7-5" fill="none" stroke="#e9d5ff" strokeWidth="1.2" />
      <path d="M1 13l5-4M15 13l-5-4" fill="none" stroke="#c084fc" strokeWidth="0.8" />
    </>
  ),
  beach: () => (
    <>
      <rect x="0" y="12" width="16" height="4" fill="#facc15" />
      <path d="M0 10Q4 8 8 10Q12 12 16 10v2H0z" fill="#38bdf8" />
      <rect x="10" y="3" width="1.2" height="9" fill="#92400e" />
      <path d="M11.2 2Q14 1 14 4Q12 5.5 11.2 4.5" fill="#22d3a0" />
      <path d="M11.2 3Q8 1 8 4Q10 5.5 11.2 4.5" fill="#16a37a" />
      <circle cx="4" cy="13" r="1" fill="#fda4af" />
    </>
  ),
  sad: () => (
    <>
      <circle cx="8" cy="8" r="7" fill="#38bdf8" />
      <circle cx="8" cy="8" r="5.5" fill="#7dd3fc" />
      <circle cx="6" cy="6" r="1" fill="#fff" />
      <circle cx="10" cy="6" r="1" fill="#fff" />
      <circle cx="6" cy="6.2" r="0.4" fill="#0c4a6e" />
      <circle cx="10" cy="6.2" r="0.4" fill="#0c4a6e" />
      <path d="M5.5 11Q8 9 10.5 11" fill="none" stroke="#0c4a6e" strokeWidth="1" />
    </>
  ),
  send: () => (
    <>
      <path d="M1 2l14 6-14 6V9l8-1-8-1V2z" fill="#22d3a0" />
      <path d="M1 2l14 6-14 6" fill="none" stroke="#16a37a" strokeWidth="0.5" />
      <path d="M1 8h8" stroke="#dcfce7" strokeWidth="0.8" />
    </>
  ),
  arrowRight: () => (
    <>
      <path d="M2 8h10M9 4l5 4-5 4" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  arrowLeft: () => (
    <>
      <path d="M14 8H4M7 4L2 8l5 4" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function PixelIcon({
  name,
  size = 16,
  className = '',
}: PixelIconProps) {
  const renderIcon = ICONS[name];
  if (!renderIcon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={`inline-block ${className}`}
      aria-label={name}
      role="img"
    >
      {renderIcon()}
    </svg>
  );
}
