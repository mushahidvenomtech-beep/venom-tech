import React from "react";

interface AsteriskIconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * 8-pronged radial outlined asterisk matching the CREAT brand design.
 * Features 8 rounded-tip loop prongs with an open circular center.
 */
export default function AsteriskIcon({
  className = "w-6 h-6",
  size,
  color = "currentColor",
  strokeWidth = 3.2,
}: AsteriskIconProps) {
  // Rotations for the 8 arms: 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°
  const rotations = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <g
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {rotations.map((deg) => (
          <path
            key={deg}
            d="M 45 36.5 L 45 12 A 5 5 0 0 1 55 12 L 55 36.5"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}

