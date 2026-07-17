/**
 * The hero centrepiece: a realistic chrome P-trap pipe mounted on the dark
 * background, slowly leaking water from its compression nut and from the bottom
 * of the U-bend. Everything is a single inline SVG — the chrome is built from
 * layered concentric strokes (dark edges → bright core) so the tube shading
 * reads correctly around every bend, and the water drips + ripples are driven
 * by CSS keyframes (see globals.css). No 3D engine, no runtime cost.
 */

// Pipe centreline, shared by every layered stroke.
const PIPE =
  "M 170 -40 V 300 C 170 432 350 432 350 300 V 150 C 350 66 420 40 500 40 H 700";

export function PipeDrip() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[70%] sm:block">
      <svg
        viewBox="0 0 640 640"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          {/* Irregular chrome banding for reflective metal */}
          <linearGradient
            id="cbpChrome"
            x1="0"
            y1="-40"
            x2="0"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#7d858f" />
            <stop offset="0.1" stopColor="#d3dae1" />
            <stop offset="0.22" stopColor="#a7afb9" />
            <stop offset="0.34" stopColor="#f4f7fa" />
            <stop offset="0.48" stopColor="#98a0aa" />
            <stop offset="0.6" stopColor="#c6cdd4" />
            <stop offset="0.74" stopColor="#6b727b" />
            <stop offset="0.88" stopColor="#aeb6bf" />
            <stop offset="1" stopColor="#474d55" />
          </linearGradient>

          <linearGradient id="cbpWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e4f1ff" />
            <stop offset="0.5" stopColor="#8ec6f7" />
            <stop offset="1" stopColor="#3f9bea" />
          </linearGradient>

          <radialGradient id="cbpPool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#2f8fe0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#2f8fe0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft contact shadow under the pipe */}
        <ellipse cx="215" cy="600" rx="200" ry="26" fill="#000000" opacity="0.5" />

        {/* ---- The chrome pipe: layered strokes build the tube ---- */}
        <g style={{ filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.55))" }}>
          <path d={PIPE} fill="none" stroke="#1c2129" strokeWidth="58" strokeLinecap="round" />
          <path d={PIPE} fill="none" stroke="url(#cbpChrome)" strokeWidth="50" strokeLinecap="round" />
          <path d={PIPE} fill="none" stroke="#e9eef3" strokeWidth="24" strokeLinecap="round" opacity="0.45" />
          <path d={PIPE} fill="none" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
          {/* travelling specular glint */}
          <path
            className="cbp-sheen"
            d={PIPE}
            fill="none"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>

        {/* ---- Leaking compression nut on the left riser ---- */}
        <g style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.45))" }}>
          <rect x="131" y="214" width="78" height="42" rx="9" fill="#1c2129" />
          <rect x="134" y="216" width="72" height="38" rx="8" fill="url(#cbpChrome)" />
          {/* knurled ridges */}
          {[146, 156, 166, 176, 186, 196].map((x) => (
            <line key={x} x1={x} y1="219" x2={x} y2="251" stroke="#4a5058" strokeWidth="1.4" opacity="0.7" />
          ))}
          <rect x="134" y="216" width="72" height="8" rx="4" fill="#ffffff" opacity="0.4" />
        </g>

        {/* ---- Water ---- */}
        {/* thin trickle clinging just below the nut */}
        <path d="M170 254 q -2 10 0 22" stroke="url(#cbpWater)" strokeWidth="2.4" fill="none" opacity="0.5" strokeLinecap="round" />

        {/* pool surface */}
        <ellipse cx="170" cy="586" rx="70" ry="12" fill="url(#cbpPool)" />
        <ellipse cx="262" cy="592" rx="60" ry="10" fill="url(#cbpPool)" />

        {/* ripples where the drops land */}
        <ellipse className="cbp-ripple cbp-fb" cx="170" cy="586" rx="30" ry="7" fill="none" stroke="#7cc0ff" strokeWidth="1.6" style={{ animationDelay: "0s" }} />
        <ellipse className="cbp-ripple cbp-fb" cx="170" cy="586" rx="30" ry="7" fill="none" stroke="#7cc0ff" strokeWidth="1.4" style={{ animationDelay: "1.65s" }} />
        <ellipse className="cbp-ripple cbp-fb" cx="262" cy="592" rx="26" ry="6" fill="none" stroke="#7cc0ff" strokeWidth="1.4" style={{ animationDelay: "0.9s" }} />

        {/* drips from the nut (fall ≈ 332px to the pool) */}
        <g className="cbp-drip-left cbp-fb" style={{ animationDelay: "0s" }} transform="translate(170 256)">
          <Drop />
        </g>
        <g className="cbp-drip-left cbp-fb" style={{ animationDelay: "1.65s" }} transform="translate(170 256)">
          <Drop />
        </g>

        {/* drips from the bottom of the U-bend (fall ≈ 160px) */}
        <g className="cbp-drip-u cbp-fb" style={{ animationDelay: "0.9s" }} transform="translate(262 432)">
          <Drop />
        </g>
      </svg>
    </div>
  );
}

/** A single teardrop, tail pointing up (the direction it falls from). */
function Drop() {
  return (
    <g>
      <path d="M0 -9 C 3.4 -3 4.6 1.5 0 7 C -4.6 1.5 -3.4 -3 0 -9 Z" fill="url(#cbpWater)" opacity="0.9" />
      <circle cx="-1.4" cy="1.5" r="1.3" fill="#ffffff" opacity="0.85" />
    </g>
  );
}
