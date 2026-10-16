import type { HeroColors } from "@/lib/products";

/*
 * Extra product-page views, ported from the gallery thumbnails in the
 * product reference and tinted with the product's palette.
 */

/** Simple front view used on the first gallery thumbnail. */
export function FrontThumb({ colors, className }: { colors: HeroColors; className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false">
      <path d="M42 80 V170 A78 9 0 0 0 198 170 V80 Z" fill={colors.base} />
      <ellipse cx="120" cy="80" rx="78" ry="11" fill={colors.top} />
      <circle cx="120" cy="64" r="16" fill={colors.berry} />
    </svg>
  );
}

/** A cut slice showing the layers. */
export function SliceView({ colors, className }: { colors: HeroColors; className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <path d="M10 66 L110 30 L110 82 L10 92 Z" fill="#FFF7F2" />
      <path d="M10 66 L110 30 L110 40 L10 74 Z" fill={colors.base} />
      <path d="M10 82 L110 62" stroke={colors.base} strokeWidth="6" />
      <circle cx="86" cy="28" r="9" fill={colors.berry} />
    </svg>
  );
}

/** The cake seen from above. */
export function TopView({ colors, className }: { colors: HeroColors; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="50" fill={colors.base} />
      <circle cx="60" cy="60" r="34" fill={colors.top} />
      <circle cx="60" cy="38" r="9" fill={colors.berry} />
      <circle cx="40" cy="70" r="9" fill={colors.berry} />
      <circle cx="80" cy="70" r="9" fill={colors.berry} />
      <circle cx="60" cy="62" r="8" fill="#FFFFFF" />
    </svg>
  );
}

/** The ribboned gift box every order leaves in. */
export function BoxView({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <rect x="20" y="40" width="80" height="62" fill="#FBE6F2" />
      <rect x="14" y="30" width="92" height="16" fill="#ED96D7" />
      <rect x="56" y="30" width="8" height="72" fill="#1C1418" />
      <path d="M60 30 Q46 12 40 22 Q38 30 60 30 Q82 30 80 22 Q74 12 60 30 Z" fill="#1C1418" />
    </svg>
  );
}
