/**
 * Ícones das especialidades: SVGs em porcelana e dourado acetinado, copiados
 * sem alteração do design "Cards Especialidades" (Claude Design — prompt em
 * referencias/design/cards-especialidades.md). Só os ids ganharam o prefixo
 * `dc-` para não colidir com outros SVGs da página.
 *
 * Os gradientes e filtros ficam em <SpecialtyIconDefs />, que deve aparecer
 * UMA única vez na página (hoje: em Specialties.tsx).
 *
 * PENDÊNCIA: se chegarem ícones 3D definitivos, substituem estes SVGs
 * (ver PENDENCIAS.md).
 */
import type { Specialty } from "@/content/specialties";

type IconId = Specialty["icon"];

/** Contorno do dente usado em Endodontia, Ortodontia, Odontopediatria e Prevenção. */
const TOOTH =
  "M30,20 C22,20 18,28 19,38 C20,48 24,56 27,66 C29,74 30,86 35,86 C40,86 40,72 43,64 C45,60 47,58 50,58 C53,58 55,60 57,64 C60,72 60,86 65,86 C70,86 71,74 73,66 C76,56 80,48 81,38 C82,28 78,20 70,20 C62,20 58,25 50,25 C42,25 38,20 30,20 Z";

/** Peça em porcelana: preenchimento radial + sombra inferior. */
function Porcelain({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="url(#dc-pc)" stroke="#C9B08C" strokeOpacity="0.45" strokeWidth="0.7" />
      <path d={d} fill="url(#dc-pcShade)" />
    </>
  );
}

/** Brilho especular do canto superior esquerdo. */
function Highlight({ cx, cy, rx = 4.5, ry = 8, angle = -20 }: { cx: number; cy: number; rx?: number; ry?: number; angle?: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      transform={`rotate(${angle} ${cx} ${cy})`}
      fill="#fff"
      opacity="0.85"
      filter="url(#dc-blur1)"
    />
  );
}

/** Estrela de brilho dourada. */
function Sparkle({ x }: { x: number }) {
  return (
    <path
      d={`M${x},12 Q${x + 1},18 ${x + 6},19 Q${x + 1},20 ${x},26 Q${x - 1},20 ${x - 6},19 Q${x - 1},18 ${x},12 Z`}
      fill="url(#dc-gd)"
    />
  );
}

export function SpecialtyIconDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="dc-pc" cx="0.38" cy="0.3" r="0.78">
          <stop offset="0" stopColor="#FFFDF9" />
          <stop offset="0.45" stopColor="#F7EFE3" />
          <stop offset="0.8" stopColor="#E8D9C3" />
          <stop offset="1" stopColor="#D3BD9D" />
        </radialGradient>
        <linearGradient id="dc-pcShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor="#C4A67F" stopOpacity="0" />
          <stop offset="1" stopColor="#B8976C" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="dc-gd" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B38F5B" />
          <stop offset="0.28" stopColor="#E7D3AC" />
          <stop offset="0.5" stopColor="#F6EAD0" />
          <stop offset="0.72" stopColor="#D1B17D" />
          <stop offset="1" stopColor="#A8854F" />
        </linearGradient>
        <linearGradient id="dc-gdV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E5C6" />
          <stop offset="0.5" stopColor="#D0B07C" />
          <stop offset="1" stopColor="#AE8B57" />
        </linearGradient>
        <radialGradient id="dc-rose" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#E3B9A8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#E9CDBE" stopOpacity="0" />
        </radialGradient>
        <filter id="dc-blur3" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="dc-blur1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id="dc-lift" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="1.6" floodColor="#7A5A3A" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
}

export default function SpecialtyIcon({ icon, className }: { icon: IconId; className?: string }) {
  const common = {
    viewBox: "0 0 100 100",
    className,
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (icon) {
    case "implante":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="92" rx="16" ry="3" fill="#9C7B55" opacity="0.25" filter="url(#dc-blur3)" />
          <g filter="url(#dc-lift)">
            <path d="M40,47 L60,47 L58,80 Q54,89 50,89 Q46,89 42,80 Z" fill="url(#dc-gd)" />
            <path
              d="M40.4,54.5 L59.6,51.5 M40.7,60.5 L59.3,57.5 M41.1,66.5 L58.9,63.5 M41.5,72.5 L58.5,69.5 M41.8,78.5 L58.2,75.5"
              stroke="#9A7746"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.7"
              fill="none"
            />
            <path
              d="M40.6,55.8 L59.4,52.8 M40.9,61.8 L59.1,58.8 M41.3,67.8 L58.7,64.8 M41.7,73.8 L58.3,70.8"
              stroke="#F7ECD5"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.8"
              fill="none"
            />
            <rect x="41" y="40" width="18" height="8" rx="2" fill="url(#dc-gd)" />
            <Porcelain d="M34,13 C27,13 24,19 25,27 C26,35 30,40 36,41 L64,41 C70,40 74,35 75,27 C76,19 73,13 66,13 C60,13 56,17 50,17 C44,17 40,13 34,13 Z" />
          </g>
          <Highlight cx={35} cy={23} rx={4} ry={6} angle={-25} />
        </svg>
      );

    case "protese":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="84" rx="26" ry="3.5" fill="#9C7B55" opacity="0.22" filter="url(#dc-blur3)" />
          <path d="M10,46 A40,11 0 0 1 90,46" transform="rotate(-12 50 46)" fill="none" stroke="#C8A874" strokeWidth="1" opacity="0.55" />
          <g filter="url(#dc-lift)">
            <ellipse cx="50" cy="72" rx="26" ry="5.5" fill="url(#dc-gd)" />
            <ellipse cx="50" cy="70.6" rx="24" ry="4.2" fill="#F1E3C6" opacity="0.7" />
            <Porcelain d="M30,24 C22,24 19,32 20,42 C21,54 26,64 34,67 L66,67 C74,64 79,54 80,42 C81,32 78,24 70,24 C62,24 58,29 50,29 C42,29 38,24 30,24 Z" />
            <path d="M36,31 C41,34 45,36 50,36 C55,36 59,34 64,31" fill="none" stroke="#D6C2A2" strokeWidth="0.9" opacity="0.6" />
          </g>
          <Highlight cx={31} cy={36} />
          <path d="M10,46 A40,11 0 0 0 90,46" transform="rotate(-12 50 46)" fill="none" stroke="url(#dc-gd)" strokeWidth="1.3" />
          <circle cx="52.3" cy="56.8" r="2" fill="url(#dc-gd)" stroke="#A8854F" strokeWidth="0.4" />
          <circle cx="51.8" cy="56.2" r="0.7" fill="#fff" opacity="0.9" />
        </svg>
      );

    case "endodontia":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="91" rx="24" ry="3" fill="#9C7B55" opacity="0.22" filter="url(#dc-blur3)" />
          <g filter="url(#dc-lift)">
            <Porcelain d={TOOTH} />
          </g>
          <path d="M38,38 C38,32 43,31 50,33 C57,31 62,32 62,38 C62,45 57,50 50,50 C43,50 38,45 38,38 Z" fill="url(#dc-rose)" />
          <path
            d="M44,45 C41,57 37,69 35.5,80 M56,45 C59,57 63,69 64.5,80"
            fill="none"
            stroke="#C6A26B"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M44.6,45 C41.8,56 38.4,67 36.6,77 M56.6,45 C59.6,56 62.6,66 63.8,75"
            fill="none"
            stroke="#F6EAD2"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <Highlight cx={30} cy={32} />
        </svg>
      );

    case "ortodontia":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="91" rx="24" ry="3" fill="#9C7B55" opacity="0.22" filter="url(#dc-blur3)" />
          <g filter="url(#dc-lift)">
            <Porcelain d={TOOTH} />
          </g>
          <Highlight cx={30} cy={32} />
          <path d="M6,45 Q50,40 94,45" fill="none" stroke="#B9996A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6,44.4 Q50,39.4 94,44.4" fill="none" stroke="#F4E8CF" strokeWidth="0.6" strokeLinecap="round" opacity="0.9" />
          <g filter="url(#dc-lift)">
            <rect x="39" y="34" width="22" height="17" rx="3.5" fill="url(#dc-gd)" />
            <rect x="39" y="40.8" width="22" height="3" fill="#9E7C49" opacity="0.45" />
            <rect x="41.5" y="35.5" width="17" height="2.6" rx="1.3" fill="#fff" opacity="0.55" />
          </g>
        </svg>
      );

    case "odontopediatria":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="88" rx="20" ry="2.8" fill="#9C7B55" opacity="0.22" filter="url(#dc-blur3)" />
          <g transform="translate(50 56) scale(0.86) translate(-50 -56)">
            <g filter="url(#dc-lift)">
              <Porcelain d={TOOTH} />
            </g>
            <circle cx="36" cy="47" r="3.5" fill="#E4B6A6" opacity="0.35" filter="url(#dc-blur1)" />
            <circle cx="64" cy="47" r="3.5" fill="#E4B6A6" opacity="0.35" filter="url(#dc-blur1)" />
            <circle cx="42" cy="41" r="1.6" fill="#8E6457" opacity="0.7" />
            <circle cx="58" cy="41" r="1.6" fill="#8E6457" opacity="0.7" />
            <path d="M45,47.5 Q50,51.5 55,47.5" fill="none" stroke="#8E6457" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
            <Highlight cx={30} cy={32} />
          </g>
          <Sparkle x={82} />
        </svg>
      );

    case "prevencao":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="91" rx="24" ry="3" fill="#9C7B55" opacity="0.22" filter="url(#dc-blur3)" />
          <path d="M17,34 A36,36 0 0 0 62,89" fill="none" stroke="#C8A874" strokeWidth="1" opacity="0.5" transform="translate(1.2 -1.2)" />
          <g transform="translate(52 53) scale(0.8) translate(-50 -53)">
            <g filter="url(#dc-lift)">
              <Porcelain d={TOOTH} />
            </g>
            <Highlight cx={30} cy={32} />
          </g>
          <g filter="url(#dc-lift)">
            <path d="M16,32 A37,37 0 0 0 63,90" fill="none" stroke="url(#dc-gdV)" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M16.6,33.5 A36,36 0 0 0 58,88" fill="none" stroke="#F7ECD5" strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />
          </g>
          <Sparkle x={80} />
          <circle cx="87" cy="30" r="1.3" fill="url(#dc-gd)" />
        </svg>
      );
  }
}
