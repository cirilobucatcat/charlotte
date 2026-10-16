import type { ReactNode } from "react";
import type { IllustrationVariant } from "@/lib/products";

type Colors = Record<string, string>;

const EDGE_PEARLS: [number, number][] = [
  [50, 180], [62, 183], [74, 185], [86, 186], [98, 187], [110, 188], [122, 188],
  [134, 188], [146, 187], [158, 186], [170, 185], [182, 183], [192, 180],
];

const DRIP =
  "M42 98 V118 Q50 128 56 116 Q62 106 68 124 Q74 136 80 118 Q88 106 94 120 Q100 130 106 116 Q114 106 120 126 Q126 138 132 118 Q140 106 146 122 Q152 132 158 116 Q166 106 172 124 Q178 134 184 118 Q190 108 198 120 V98 Z";

/** Small cake stand shared by the layer and drip cakes. */
function Stand() {
  return (
    <>
      <ellipse cx="120" cy="232" rx="76" ry="6" fill="#1C1418" opacity="0.10" />
      <ellipse cx="120" cy="228" rx="32" ry="5" fill="#FFFFFF" />
      <path d="M113 190 H127 L130 228 H110 Z" fill="#FFFFFF" />
      <ellipse cx="120" cy="191" rx="100" ry="11" fill="#E9DEE3" />
      <ellipse cx="120" cy="188" rx="100" ry="10" fill="#FFFFFF" />
    </>
  );
}

/** Strawberry (berries, rosettes, gold leaf) or lemon (slices, lavender sprig). */
function LayerCake({ c }: { c: Colors }) {
  const lemon = Boolean(c.lemon);
  return (
    <>
      <Stand />
      <path d="M42 98 V180 A78 9 0 0 0 198 180 V98 Z" fill={c.base} />
      <path d="M150 98 V187 A78 9 0 0 0 198 180 V98 Z" fill="#1C1418" opacity={lemon ? 0.06 : 0.07} />
      <path d="M42 98 V180 Q52 184 62 185 V98 Z" fill="#FFFFFF" opacity={lemon ? 0.35 : 0.3} />
      {lemon ? (
        <>
          <path d="M42 140 H198" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.7" />
          <ellipse cx="120" cy="98" rx="78" ry="11" fill={c.top} />
          <circle cx="86" cy="92" r="11" fill={c.lemon} />
          <circle cx="86" cy="92" r="7.5" fill={c.lemonInner} />
          <circle cx="154" cy="92" r="11" fill={c.lemon} />
          <circle cx="154" cy="92" r="7.5" fill={c.lemonInner} />
          <path d="M120 98 V58" stroke="#7C9A6A" strokeWidth="1.6" />
          <g fill={c.lavender}>
            <circle cx="117" cy="62" r="3.2" />
            <circle cx="123" cy="67" r="3.2" />
            <circle cx="117" cy="72" r="3.2" />
            <circle cx="123" cy="77" r="3.2" />
            <circle cx="117" cy="82" r="3.2" />
            <circle cx="120" cy="57" r="3" />
          </g>
          <circle cx="104" cy="94" r="7" fill="#FFFFFF" />
          <circle cx="136" cy="94" r="7" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <g fill="#FFFFFF" opacity="0.9">
            {EDGE_PEARLS.map(([cx, cy]) => (
              <circle key={cx} cx={cx} cy={cy} r="3" />
            ))}
          </g>
          <ellipse cx="120" cy="98" rx="78" ry="11" fill={c.top} />
          <circle cx="70" cy="93" r="9" fill="#FFFFFF" />
          <circle cx="170" cy="93" r="9" fill="#FFFFFF" />
          <circle cx="104" cy="89" r="9" fill="#FFFFFF" />
          <circle cx="136" cy="89" r="9" fill="#FFFFFF" />
          <circle cx="87" cy="95" r="8" fill={c.berry} />
          <circle cx="153" cy="95" r="8" fill={c.berry} />
          <circle cx="120" cy="83" r="10" fill={c.berry} />
          <circle cx="117" cy="80" r="2.6" fill="#FFFFFF" opacity="0.7" />
          <path d="M120 73 L125 63 L128 72 Z" fill="#D9B26A" />
        </>
      )}
    </>
  );
}

/** Chocolate cake with ganache drips and cherries. */
function DripCake({ c }: { c: Colors }) {
  return (
    <>
      <Stand />
      <path d="M42 98 V180 A78 9 0 0 0 198 180 V98 Z" fill={c.base} />
      <path d="M150 98 V187 A78 9 0 0 0 198 180 V98 Z" fill="#000000" opacity="0.14" />
      <path d="M42 98 V180 Q52 184 62 185 V98 Z" fill="#FFFFFF" opacity="0.12" />
      <path d={DRIP} fill={c.drip} />
      <ellipse cx="120" cy="98" rx="78" ry="11" fill={c.top} />
      <path
        d="M88 88 Q90 72 100 66 M120 82 Q122 66 132 60 M152 88 Q154 72 164 66"
        stroke={c.drip}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="88" cy="92" r="9" fill={c.cherry} />
      <circle cx="120" cy="86" r="10" fill={c.cherry} />
      <circle cx="152" cy="92" r="9" fill={c.cherry} />
      <circle cx="85" cy="89" r="2.4" fill="#FFFFFF" opacity="0.6" />
      <circle cx="117" cy="83" r="2.6" fill="#FFFFFF" opacity="0.6" />
      <circle cx="149" cy="89" r="2.4" fill="#FFFFFF" opacity="0.6" />
      <path d="M104 96 L108 88 L111 95 Z M134 96 L139 89 L141 96 Z" fill="#D9B26A" />
    </>
  );
}

function Cupcake({
  x,
  y = 0,
  liner,
  stripeOpacity,
  tiers,
  children,
}: {
  x: number;
  y?: number;
  liner: string;
  stripeOpacity: number;
  tiers: [string, string, string];
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-26 164 L-20 222 H20 L26 164 Z" fill={liner} />
      <path
        d="M-14 164 L-11 222 M-4 164 L-3 222 M6 164 L5 222 M16 164 L13 222"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity={stripeOpacity}
      />
      <ellipse cx="0" cy="160" rx="30" ry="12" fill={tiers[0]} />
      <ellipse cx="0" cy="146" rx="23" ry="11" fill={tiers[1]} />
      <ellipse cx="0" cy="134" rx="15" ry="9" fill={tiers[2]} />
      {children}
    </g>
  );
}

/** Three petits gâteaux with piped frosting. */
function Petits({ c }: { c: Colors }) {
  const green: [string, string, string] = [c.frosting, "#D9E7C5", "#E3EDD3"];
  const pink: [string, string, string] = [c.frostingAlt, "#FCEAF6", "#FFF2FA"];
  return (
    <>
      <ellipse cx="120" cy="226" rx="104" ry="7" fill="#1C1418" opacity="0.10" />
      <Cupcake x={64} liner={c.liner} stripeOpacity={0.5} tiers={green}>
        <circle cx="0" cy="124" r="6" fill={c.rose} />
      </Cupcake>
      <Cupcake x={120} y={-14} liner={c.linerAlt} stripeOpacity={0.2} tiers={pink}>
        <path d="M0 122 L4 114 L6 122 Z" fill="#D9B26A" />
      </Cupcake>
      <Cupcake x={176} liner={c.liner} stripeOpacity={0.5} tiers={green}>
        <circle cx="0" cy="124" r="6" fill={c.rose} />
      </Cupcake>
    </>
  );
}

/** Card-sized cake illustrations (viewBox 240×240) for arches on product tints. */
export function CardCake({
  variant,
  colors,
  className,
}: {
  variant: IllustrationVariant;
  colors: Colors;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" focusable="false">
      {variant === "layer" && <LayerCake c={colors} />}
      {variant === "drip" && <DripCake c={colors} />}
      {variant === "petits" && <Petits c={colors} />}
    </svg>
  );
}

/** Simplified mini cake used for bag thumbnails (from the mobile bag reference). */
export function MiniCake({
  body,
  top,
  accent,
  className,
}: {
  body: string;
  top: string;
  accent: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="196" rx="100" ry="12" fill="#FFFFFF" />
      <path d="M42 98 V184 A78 9 0 0 0 198 184 V98 Z" fill={body} />
      <path d="M150 98 V191 A78 9 0 0 0 198 184 V98 Z" fill="#1C1418" opacity="0.08" />
      <ellipse cx="120" cy="98" rx="78" ry="11" fill={top} />
      <circle cx="86" cy="90" r="10" fill="#FFFFFF" />
      <circle cx="154" cy="90" r="10" fill="#FFFFFF" />
      <circle cx="120" cy="82" r="14" fill={accent} />
    </svg>
  );
}
