import { IllustrationMotif } from '../types';

interface ArtworkSvgProps {
  motif: IllustrationMotif;
  className?: string;
}

export function ArtworkSvg({ motif, className = 'w-full h-full' }: ArtworkSvgProps) {
  switch (motif) {
    case 'music-box':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="24" y="44" width="96" height="58" rx="10" fill="#B99EFF" stroke="#1D1020" strokeWidth="3" />
          <path d="M24 44 L44 20 L126 20 L120 44 Z" fill="#FFD1E8" stroke="#1D1020" strokeWidth="3" strokeLinejoin="round" />
          <rect x="44" y="60" width="56" height="24" rx="5" fill="#FFF8FC" stroke="#1D1020" strokeWidth="2.5" />
          <line x1="54" y1="68" x2="90" y2="68" stroke="#1D1020" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="54" y1="76" x2="82" y2="76" stroke="#1D1020" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="132" cy="72" r="10" fill="#E9F53B" stroke="#1D1020" strokeWidth="3" />
          <path d="M120 72 H122" stroke="#1D1020" strokeWidth="3" strokeLinecap="round" />
          <path d="M74 14 C74 14 78 6 84 9 C88 11 85 17 82 18" stroke="#4A1D4D" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="31" r="4" fill="#E9F53B" stroke="#1D1020" strokeWidth="2" />
        </svg>
      );

    case 'upright-piano':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="26" y="22" width="108" height="80" rx="10" fill="#FFD1E8" stroke="#1D1020" strokeWidth="3" />
          <rect x="34" y="62" width="92" height="24" rx="4" fill="#FFFFFF" stroke="#1D1020" strokeWidth="2.5" />
          <rect x="44" y="62" width="7" height="14" rx="1.5" fill="#1D1020" />
          <rect x="57" y="62" width="7" height="14" rx="1.5" fill="#1D1020" />
          <rect x="76" y="62" width="7" height="14" rx="1.5" fill="#1D1020" />
          <rect x="89" y="62" width="7" height="14" rx="1.5" fill="#1D1020" />
          <rect x="102" y="62" width="7" height="14" rx="1.5" fill="#1D1020" />
          <rect x="50" y="34" width="60" height="18" rx="4" fill="#E9F53B" stroke="#1D1020" strokeWidth="2.5" />
          <circle cx="80" cy="43" r="4" fill="#4A1D4D" />
        </svg>
      );

    case 'candle-tour':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <ellipse cx="80" cy="98" rx="42" ry="9" fill="#B99EFF" stroke="#1D1020" strokeWidth="3" />
          <rect x="64" y="44" width="32" height="50" rx="6" fill="#FFF8FC" stroke="#1D1020" strokeWidth="3" />
          <path d="M80 18 C88 28 89 36 80 40 C71 36 72 28 80 18 Z" fill="#E9F53B" stroke="#1D1020" strokeWidth="2.5" />
          <circle cx="42" cy="40" r="5" fill="#FFD1E8" stroke="#1D1020" strokeWidth="2" />
          <circle cx="118" cy="36" r="4" fill="#E9F53B" stroke="#1D1020" strokeWidth="2" />
          <path d="M40 76 C35 70 43 65 46 72 C49 65 57 70 52 76 L46 82 Z" fill="#1D1020" />
        </svg>
      );

    case 'palette-zine':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="28" y="20" width="62" height="82" rx="8" fill="#FFD1E8" stroke="#1D1020" strokeWidth="3" />
          <rect x="70" y="20" width="62" height="82" rx="8" fill="#FFF8FC" stroke="#1D1020" strokeWidth="3" />
          <circle cx="59" cy="52" r="15" fill="#B99EFF" stroke="#1D1020" strokeWidth="2.5" />
          <rect x="82" y="36" width="38" height="14" rx="7" fill="#E9F53B" stroke="#1D1020" strokeWidth="2.5" />
          <line x1="82" y1="64" x2="118" y2="64" stroke="#1D1020" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="74" x2="112" y2="74" stroke="#1D1020" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="82" y1="84" x2="104" y2="84" stroke="#1D1020" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'cassette-mix':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="22" y="28" width="116" height="68" rx="10" fill="#FFD1E8" stroke="#1D1020" strokeWidth="3" />
          <rect x="34" y="40" width="92" height="34" rx="6" fill="#E9F53B" stroke="#1D1020" strokeWidth="2.5" />
          <circle cx="58" cy="57" r="9" fill="#FFFFFF" stroke="#1D1020" strokeWidth="2.5" />
          <circle cx="102" cy="57" r="9" fill="#FFFFFF" stroke="#1D1020" strokeWidth="2.5" />
          <circle cx="58" cy="57" r="3" fill="#1D1020" />
          <circle cx="102" cy="57" r="3" fill="#1D1020" />
          <rect x="70" y="52" width="20" height="10" rx="2" fill="#4A1D4D" />
          <path d="M44 96 L52 84 H108 L116 96" stroke="#1D1020" strokeWidth="2.5" fill="#B99EFF" />
        </svg>
      );

    case 'lavender-vinyl':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="24" y="20" width="76" height="80" rx="8" fill="#FFD1E8" stroke="#1D1020" strokeWidth="3" />
          <circle cx="96" cy="60" r="38" fill="#B99EFF" stroke="#1D1020" strokeWidth="3" />
          <circle cx="96" cy="60" r="24" stroke="#4A1D4D" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="96" cy="60" r="13" fill="#E9F53B" stroke="#1D1020" strokeWidth="2.5" />
          <circle cx="96" cy="60" r="3.5" fill="#1D1020" />
          <path d="M48 54 C44 48 52 43 55 50 C58 43 66 48 62 54 L55 62 Z" fill="#4A1D4D" />
        </svg>
      );

    case 'witch-hat':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <ellipse cx="80" cy="84" rx="54" ry="14" fill="#4A1D4D" stroke="#1D1020" strokeWidth="3" />
          <path d="M48 80 L76 22 C80 14 96 18 92 28 L108 80 Z" fill="#FF79B8" stroke="#1D1020" strokeWidth="3" strokeLinejoin="round" />
          <path d="M52 72 Q80 80 106 72" stroke="#E9F53B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="80" cy="64" r="5" fill="#E9F53B" stroke="#1D1020" strokeWidth="2" />
        </svg>
      );

    case 'potion-tea':
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="66" y="20" width="28" height="12" rx="4" fill="#E9F53B" stroke="#1D1020" strokeWidth="2.5" />
          <path d="M68 32 H92 L114 68 C119 82 110 98 94 98 H66 C50 98 41 82 46 68 Z" fill="#B99EFF" stroke="#1D1020" strokeWidth="3" />
          <path d="M52 74 Q80 68 108 74 L104 88 C100 94 60 94 56 88 Z" fill="#FFD1E8" />
          <circle cx="72" cy="62" r="4" fill="#FFF8FC" />
          <circle cx="88" cy="54" r="3" fill="#FFF8FC" />
        </svg>
      );

    case 'crescent-moon':
    default:
      return (
        <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden="true">
          <rect x="24" y="18" width="112" height="84" rx="12" fill="#4A1D4D" stroke="#1D1020" strokeWidth="3" />
          <path
            d="M86 34 C70 36 60 50 62 66 C64 81 78 90 94 87 C81 83 74 71 76 58 C77 47 81 39 86 34 Z"
            fill="#E9F53B"
            stroke="#1D1020"
            strokeWidth="2.5"
          />
          <circle cx="108" cy="44" r="4" fill="#FFD1E8" />
          <circle cx="48" cy="46" r="3" fill="#B99EFF" />
          <circle cx="114" cy="76" r="3" fill="#E9F53B" />
        </svg>
      );
  }
}
