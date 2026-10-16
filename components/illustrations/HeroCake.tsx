import { useId } from "react";
import type { HeroColors } from "@/lib/products";

const PEARLS: [number, number][] = [
  [58, 258], [70, 261], [82, 263], [94, 265], [106, 266], [118, 267], [130, 268], [142, 268],
  [154, 268], [166, 268], [178, 267], [190, 266], [202, 265], [214, 263], [226, 261], [238, 258],
];

const ROSETTES: [number, number][] = [
  [78, 122], [222, 122], [122, 116], [178, 116],
];

/** Pedestal cake from the desktop hero (viewBox 300×340). */
export function HeroCake({ colors, className }: { colors: HeroColors; className?: string }) {
  const id = useId();
  const sideId = `${id}side`;
  const standId = `${id}stand`;

  return (
    <svg viewBox="0 0 300 340" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={sideId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={colors.light} />
          <stop offset="0.55" stopColor={colors.base} />
          <stop offset="1" stopColor={colors.shade} />
        </linearGradient>
        <linearGradient id={standId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E9E0E4" />
        </linearGradient>
      </defs>

      {/* Stand */}
      <ellipse cx="150" cy="330" rx="96" ry="8" fill="#1C1418" opacity="0.14" />
      <ellipse cx="150" cy="326" rx="48" ry="7" fill={`url(#${standId})`} />
      <path d="M140 270 H160 L164 326 H136 Z" fill={`url(#${standId})`} />
      <ellipse cx="150" cy="272" rx="134" ry="15" fill="#E3D8DD" />
      <ellipse cx="150" cy="268" rx="134" ry="13" fill="#FFFFFF" />

      {/* Body */}
      <path d="M50 128 V258 A100 12 0 0 0 250 258 V128 Z" fill={`url(#${sideId})`} />
      <path d="M50 222 H250" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
      <path d="M50 176 H250" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />

      {/* Pearl edging */}
      <g fill="#FFFFFF" opacity="0.92">
        {PEARLS.map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="4" />
        ))}
      </g>

      {/* Top */}
      <ellipse cx="150" cy="128" rx="100" ry="14" fill={colors.top} />
      <g>
        {ROSETTES.map(([cx, cy]) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r="12" fill="#FFFFFF" />
            <path
              d={`M${cx} ${cy - 6} a6 6 0 1 1 -5 8 a3 3 0 1 1 5 -3`}
              stroke="#EADDE3"
              strokeWidth="1.6"
              fill="none"
            />
          </g>
        ))}
        <circle cx="100" cy="126" r="9.5" fill={colors.berry} />
        <circle cx="97" cy="123" r="2.6" fill="#FFFFFF" opacity="0.7" />
        <circle cx="200" cy="126" r="9.5" fill={colors.berry} />
        <circle cx="197" cy="123" r="2.6" fill="#FFFFFF" opacity="0.7" />
        <circle cx="150" cy="110" r="13" fill={colors.berry} />
        <circle cx="146" cy="106" r="3.2" fill="#FFFFFF" opacity="0.7" />
        <path d="M150 97 L156 84 L160 96 Z" fill="#D9B26A" />
        <path d="M138 100 L142 90 L146 99 Z" fill="#E7C98A" />
      </g>
    </svg>
  );
}
