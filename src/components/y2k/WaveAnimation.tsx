export function WaveAnimation({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block h-[30px] w-full"
      >
        <path
          d="M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30 L1200 60 L0 60Z"
          fill="#0ea5e9"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            values="
              M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30 L1200 60 L0 60Z;
              M0 30 Q150 60 300 30 Q450 0 600 30 Q750 60 900 30 Q1050 0 1200 30 L1200 60 L0 60Z;
              M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30 L1200 60 L0 60Z
            "
          />
        </path>
        <path
          d="M0 35 Q150 10 300 35 Q450 60 600 35 Q750 10 900 35 Q1050 60 1200 35 L1200 60 L0 60Z"
          fill="#0ea5e9"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="
              M0 35 Q150 10 300 35 Q450 60 600 35 Q750 10 900 35 Q1050 60 1200 35 L1200 60 L0 60Z;
              M0 35 Q150 60 300 35 Q450 10 600 35 Q750 60 900 35 Q1050 10 1200 35 L1200 60 L0 60Z;
              M0 35 Q150 10 300 35 Q450 60 600 35 Q750 10 900 35 Q1050 60 1200 35 L1200 60 L0 60Z
            "
          />
        </path>
        <path
          d="M0 40 Q150 20 300 40 Q450 60 600 40 Q750 20 900 40 Q1050 60 1200 40 L1200 60 L0 60Z"
          fill="#0ea5e9"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            dur="2.5s"
            repeatCount="indefinite"
            values="
              M0 40 Q150 20 300 40 Q450 60 600 40 Q750 20 900 40 Q1050 60 1200 40 L1200 60 L0 60Z;
              M0 40 Q150 55 300 40 Q450 25 600 40 Q750 55 900 40 Q1050 25 1200 40 L1200 60 L0 60Z;
              M0 40 Q150 20 300 40 Q450 60 600 40 Q750 20 900 40 Q1050 60 1200 40 L1200 60 L0 60Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
