/** Two-tier white cake with gold bands and cascading flowers (Atelier section). */
export function WeddingCake({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 360" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="150" cy="350" rx="110" ry="8" fill="#1C1418" opacity="0.18" />
      <ellipse cx="150" cy="344" rx="120" ry="12" fill="#FFFFFF" />

      {/* Lower tier */}
      <path d="M50 240 V336 A100 11 0 0 0 250 336 V240 Z" fill="#FFFAF7" />
      <path d="M190 240 V344 A100 11 0 0 0 250 336 V240 Z" fill="#1C1418" opacity="0.05" />
      <path d="M50 318 A100 11 0 0 0 250 318" stroke="#D9B26A" strokeWidth="3" fill="none" />
      <ellipse cx="150" cy="240" rx="100" ry="12" fill="#FFFFFF" />

      {/* Upper tier */}
      <path d="M85 140 V232 A65 9 0 0 0 215 232 V140 Z" fill="#FFFAF7" />
      <path d="M175 140 V240 A65 9 0 0 0 215 232 V140 Z" fill="#1C1418" opacity="0.05" />
      <path d="M85 216 A65 9 0 0 0 215 216" stroke="#D9B26A" strokeWidth="3" fill="none" />
      <ellipse cx="150" cy="140" rx="65" ry="9" fill="#FFFFFF" />

      {/* Flowers */}
      <g>
        <circle cx="196" cy="150" r="16" fill="#F7C6E6" />
        <circle cx="196" cy="150" r="7" fill="#E07FBE" />
        <circle cx="214" cy="176" r="12" fill="#FBE3F3" />
        <circle cx="214" cy="176" r="5" fill="#ED96D7" />
        <circle cx="174" cy="134" r="12" fill="#FFFFFF" />
        <circle cx="174" cy="134" r="5" fill="#F7C6E6" />
        <circle cx="226" cy="220" r="14" fill="#F7C6E6" />
        <circle cx="226" cy="220" r="6" fill="#E07FBE" />
        <circle cx="238" cy="252" r="11" fill="#FBE3F3" />
        <circle cx="238" cy="252" r="4.5" fill="#ED96D7" />
        <circle cx="246" cy="284" r="13" fill="#F7C6E6" />
        <circle cx="246" cy="284" r="5.5" fill="#E07FBE" />
        <path
          d="M206 160 Q218 156 222 164 Q214 170 206 160 Z M232 232 Q244 230 246 238 Q238 242 232 232 Z M186 124 Q196 116 202 122 Q194 130 186 124 Z"
          fill="#9DB58A"
        />
      </g>
    </svg>
  );
}
