/**
 * Ícones das especialidades em SVG com gradientes suaves imitando cerâmica
 * marfim acetinada e contorno champanhe, conforme o design.
 *
 * PENDÊNCIA: os ícones 3D definitivos ainda serão produzidos. Para trocar por
 * PNG, basta colocar o arquivo em public/img/icones/<id>.png — o componente
 * usa o PNG automaticamente quando `png` for true (ver PENDENCIAS.md).
 */
import type { Specialty } from "@/content/specialties";

type IconId = Specialty["icon"];

const STROKE = "#c8ae84";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-ivory`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stopColor="#fdfaf4" />
        <stop offset="0.55" stopColor="#f3ead9" />
        <stop offset="1" stopColor="#e2d3ba" />
      </linearGradient>
      <linearGradient id={`${id}-pearl`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#ecdfc9" />
      </linearGradient>
      <radialGradient id={`${id}-sheen`} cx="0.35" cy="0.25" r="0.9">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

export default function SpecialtyIcon({ icon, size = 58 }: { icon: IconId; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "implante":
      return (
        <svg {...common}>
          <Defs id="imp" />
          <path
            d="M22 8h20l-2 8H24l-2-8Z"
            fill="url(#imp-pearl)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <path
            d="M25 16h14l-1.2 6h-11.6L25 16Z"
            fill="url(#imp-ivory)"
            stroke={STROKE}
            strokeWidth="1.2"
          />
          <path
            d="M27 22h10l-3 32c-.4 2.6-3.6 2.6-4 0l-3-32Z"
            fill="url(#imp-ivory)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <path
            d="M27.6 28h8.8M28.3 34h7.4M29 40h6M29.7 46h4.6"
            stroke={STROKE}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse cx="32" cy="13" rx="9" ry="4" fill="url(#imp-sheen)" />
        </svg>
      );
    case "protese":
      return (
        <svg {...common}>
          <Defs id="pro" />
          <path
            d="M32 10c-6 0-8 3-12 3-4.5 0-8 4-8 10 0 5 3 9 8 9h24c5 0 8-4 8-9 0-6-3.5-10-8-10-4 0-6-3-12-3Z"
            fill="url(#pro-ivory)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <path
            d="M16 36c0 8 4 18 7 18 2.4 0 2-6.5 3.6-9.4.9-1.6 2.3-2.6 5.4-2.6s4.5 1 5.4 2.6C39 47.5 38.6 54 41 54c3 0 7-10 7-18"
            fill="url(#pro-pearl)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <ellipse cx="26" cy="20" rx="10" ry="6" fill="url(#pro-sheen)" />
        </svg>
      );
    case "endodontia":
      return (
        <svg {...common}>
          <Defs id="end" />
          <path
            d="M32 8c-5 0-6.5 2.4-10 2.4-4.8 0-8.5 3.8-8.5 9.6 0 9 4.2 36 8.5 36 3 0 2.6-8.4 4.6-11.8 1-1.7 3.4-1.7 4.4 0 2 3.4 1.6 11.8 4.6 11.8 4.3 0 8.9-27 8.9-36 0-5.8-3.7-9.6-8.5-9.6-3.5 0-5-2.4-10-2.4Z"
            fill="url(#end-ivory)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <path
            d="M32 18v22M32 40l-4.5 8M32 40l4.5 8"
            stroke="#c0988e"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="26" cy="16" rx="9" ry="5" fill="url(#end-sheen)" />
        </svg>
      );
    case "ortodontia":
      return (
        <svg {...common}>
          <Defs id="ort" />
          <path
            d="M32 8c-5 0-6.5 2.4-10 2.4-4.8 0-8.5 3.8-8.5 9.6 0 9 4.2 36 8.5 36 3 0 2.6-8.4 4.6-11.8 1-1.7 3.4-1.7 4.4 0 2 3.4 1.6 11.8 4.6 11.8 4.3 0 8.9-27 8.9-36 0-5.8-3.7-9.6-8.5-9.6-3.5 0-5-2.4-10-2.4Z"
            fill="url(#ort-ivory)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <path d="M14 26h36" stroke={STROKE} strokeWidth="1.6" />
          <rect x="26" y="21" width="12" height="10" rx="2.5" fill="url(#ort-pearl)" stroke={STROKE} strokeWidth="1.3" />
          <ellipse cx="26" cy="15" rx="9" ry="4.5" fill="url(#ort-sheen)" />
        </svg>
      );
    case "odontopediatria":
      return (
        <svg {...common}>
          <Defs id="ped" />
          <circle cx="32" cy="33" r="21" fill="url(#ped-ivory)" stroke={STROKE} strokeWidth="1.3" />
          <path
            d="M18 21c2-6 8-9 14-9s12 3 14 9c-4 1.5-8-1-14-1s-10 2.5-14 1Z"
            fill="url(#ped-pearl)"
            stroke={STROKE}
            strokeWidth="1.2"
          />
          <circle cx="25" cy="32" r="1.8" fill="#a9806f" />
          <circle cx="39" cy="32" r="1.8" fill="#a9806f" />
          <path d="M25 40a9 9 0 0 0 14 0" stroke="#a9806f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <ellipse cx="25" cy="24" rx="10" ry="6" fill="url(#ped-sheen)" />
        </svg>
      );
    case "prevencao":
      return (
        <svg {...common}>
          <Defs id="pre" />
          <path
            d="M32 6 10 14v14c0 14 9.5 25 22 30 12.5-5 22-16 22-30V14L32 6Z"
            fill="url(#pre-ivory)"
            stroke={STROKE}
            strokeWidth="1.3"
          />
          <path
            d="m22 32 7 7 13-14"
            fill="none"
            stroke="#9c5a5c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="25" cy="18" rx="11" ry="7" fill="url(#pre-sheen)" />
        </svg>
      );
  }
}
