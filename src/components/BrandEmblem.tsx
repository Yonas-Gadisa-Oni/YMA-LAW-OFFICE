import { type HTMLAttributes } from "react";
import { BRAND_SHORT, BRAND_NAME } from "@/constants";

interface BrandEmblemProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  showLabel?: boolean;
  label?: string;
  variant?: "navbar" | "footer" | "badge";
}

export default function BrandEmblem({
  size = 40,
  showLabel = false,
  label = BRAND_SHORT,
  variant = "navbar",
  className = "",
  ...props
}: BrandEmblemProps) {
  const isBadge = variant === "badge";
  const isFooter = variant === "footer";

  return (
    <div className={`flex items-center gap-3 ${className}`} {...props}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Outer ring glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.25), rgba(59,130,246,0.05) 70%)",
            filter: "blur(4px)",
          }}
        />
        {/* Main SVG Crest */}
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="{BRAND_NAME} Crest"
        >
          {/* Outer shield */}
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d2340" />
              <stop offset="100%" stopColor="#081b2d" />
            </linearGradient>
          </defs>

          {/* Shield outline */}
          <path
            d="M50 5 L88 20 L88 50 Q88 75 50 95 Q12 75 12 50 L12 20 Z"
            fill="url(#innerGrad)"
            stroke="url(#blueGrad)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Inner decorative ring */}
          <path
            d="M50 12 L82 25 L82 48 Q82 70 50 88 Q18 70 18 48 L18 25 Z"
            fill="none"
            stroke="url(#blueGrad)"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeLinejoin="round"
          />

          {/* Scales of Justice */}
          <g transform="translate(50, 38)" opacity="0.9">
            {/* Crossbar */}
            <line
              x1="-20"
              y1="0"
              x2="20"
              y2="0"
              stroke="url(#blueGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Center post */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="url(#blueGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left pan */}
            <path
              d="M-20 0 Q-20 8 -15 8 L-25 8 Q-20 8 -20 0"
              fill="none"
              stroke="url(#blueGrad)"
              strokeWidth="1.5"
            />
            {/* Right pan */}
            <path
              d="M20 0 Q20 8 15 8 L25 8 Q20 8 20 0"
              fill="none"
              stroke="url(#blueGrad)"
              strokeWidth="1.5"
            />
            {/* Left chain */}
            <line
              x1="-20"
              y1="0"
              x2="-20"
              y2="4"
              stroke="url(#blueGrad)"
              strokeWidth="0.8"
            />
            {/* Right chain */}
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="4"
              stroke="url(#blueGrad)"
              strokeWidth="0.8"
            />
          </g>

          {/* YMA Monogram */}
          <text
            x="50"
            y="75"
            textAnchor="middle"
            fill="url(#blueGrad)"
            fontFamily="serif"
            fontSize="28"
            fontWeight="bold"
            letterSpacing="2"
            style={{ fontFeatureSettings: "'liga' 0" }}
          >
            YMA
          </text>

          {/* Decorative dots */}
          <circle cx="50" cy="12" r="1.5" fill="#60a5fa" opacity="0.6" />
          <circle cx="35" cy="16" r="1" fill="#60a5fa" opacity="0.4" />
          <circle cx="65" cy="16" r="1" fill="#60a5fa" opacity="0.4" />
        </svg>

        {/* Subtle ring highlight */}
        {!isBadge && (
          <div
            className="absolute inset-0 rounded-full ring-1 ring-blue-400/30 ring-offset-1 ring-offset-slate-950 pointer-events-none"
            style={{ width: size, height: size }}
          />
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span className="text-sm font-semibold text-sky-100">
          {label}
        </span>
      )}
    </div>
  );
}