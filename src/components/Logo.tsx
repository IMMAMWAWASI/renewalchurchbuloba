import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: "dark" | "light" | "gold";
  variant?: "horizontal" | "vertical" | "iconOnly";
}

export default function Logo({
  className = "",
  size = 48,
  showText = true,
  textColor = "dark",
  variant = "horizontal",
}: LogoProps) {
  // Brand Colors
  const darkBrown = "#3B1F0F";
  const gold = "#F4B400";

  // SVG representation of the cross integrated with "R"
  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:rotate-3"
      id="renewal-church-logo-svg"
    >
      {/* Background Outer Ring */}
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke={darkBrown}
        strokeWidth="11"
        fill="white"
      />

      {/* Styled letter "R" in Gold */}
      <path
        d="M 94 65 
           L 132 65 
           C 152 65, 162 75, 162 90 
           C 162 105, 150 115, 132 115 
           L 94 115 
           M 125 115 
           L 158 152"
        stroke={gold}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Gold inner line accent for premium 3D feeling */}
      <path
        d="M 94 65 
           L 132 65 
           C 152 65, 162 75, 162 90 
           C 162 105, 150 115, 132 115 
           L 94 115 
           M 125 115 
           L 158 152"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />

      {/* Distinctive Cross in Dark Brown */}
      {/* Horizontal beam */}
      <path
        d="M 52 92 L 126 92"
        stroke={darkBrown}
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {/* Vertical beam */}
      <path
        d="M 86 48 L 86 156"
        stroke={darkBrown}
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cross inner gold accent line */}
      <path
        d="M 52 92 L 126 92"
        stroke={gold}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 86 48 L 86 156"
        stroke={gold}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  const textClass =
    textColor === "dark"
      ? "text-brand-brown"
      : textColor === "light"
      ? "text-brand-cream"
      : "text-brand-gold";

  if (variant === "iconOnly" || !showText) {
    return (
      <div className={`flex items-center justify-center ${className}`} id="church-logo-icon">
        {svgContent}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`} id="church-logo-vert">
        {svgContent}
        <div className="mt-3">
          <span className={`block font-display text-2xl font-extrabold tracking-wider leading-none uppercase ${textClass}`}>
            Renewal Church
          </span>
          <span className={`block font-display text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mt-1.5 ${
            textColor === "light" ? "text-brand-gold" : "text-brand-brown-light"
          }`}>
            Buloba
          </span>
        </div>
      </div>
    );
  }

  // Standard horizontal layout
  return (
    <div className={`flex items-center gap-3.5 ${className}`} id="church-logo-horiz">
      {svgContent}
      <div className="flex flex-col">
        <span className={`font-display text-xl sm:text-2xl font-black tracking-wide leading-tight uppercase ${textClass}`}>
          Renewal Church
        </span>
        <span className={`font-display text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase leading-none ${
          textColor === "light" ? "text-brand-gold" : "text-brand-brown-light"
        }`}>
          Buloba
        </span>
      </div>
    </div>
  );
}
