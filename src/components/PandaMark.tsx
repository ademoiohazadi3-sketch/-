import React from 'react';

interface PandaMarkProps {
  className?: string;
}

export const PandaMark: React.FC<PandaMarkProps> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      {/* Ears */}
      <circle cx="16" cy="17" r="9" fill="#0F172A" />
      <circle cx="48" cy="17" r="9" fill="#0F172A" />
      {/* Head */}
      <circle
        cx="32"
        cy="34"
        r="22"
        fill="#FFFFFF"
        stroke="#0F172A"
        strokeWidth="3.2"
      />
      {/* Eye Patches */}
      <ellipse
        cx="22.5"
        cy="31"
        rx="5.6"
        ry="7"
        transform="rotate(-16 22.5 31)"
        fill="#0F172A"
      />
      <ellipse
        cx="41.5"
        cy="31"
        rx="5.6"
        ry="7"
        transform="rotate(16 41.5 31)"
        fill="#0F172A"
      />
      {/* Eyes */}
      <circle cx="23.2" cy="30" r="2" fill="#FFFFFF" />
      <circle cx="40.8" cy="30" r="2" fill="#FFFFFF" />
      {/* Nose */}
      <ellipse cx="32" cy="39.5" rx="4" ry="2.6" fill="#0F172A" />
      {/* Smile */}
      <path
        d="M 27 44 Q 32 48 37 44"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
};
