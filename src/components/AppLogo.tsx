import React from 'react';

interface AppLogoProps {
  id?: string;
  className?: string;
  size?: number | string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  id = 'logo-app',
  className = '',
  size = 250,
}) => {
  return (
    <svg
      id={id}
      className={className}
      viewBox="0 0 500 500"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Radial Background Gradient */}
        <radialGradient id="logoBgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#142B48" />
          <stop offset="70%" stopColor="#0B1A2C" />
          <stop offset="100%" stopColor="#050E18" />
        </radialGradient>

        {/* Outer Gold Gradient */}
        <linearGradient id="logoGoldRing" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#996D07" />
          <stop offset="20%" stopColor="#F5E08E" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="75%" stopColor="#FFF2C6" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>

        {/* Accent Gold Gradient */}
        <linearGradient id="logoGoldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4CF" />
          <stop offset="30%" stopColor="#E5C158" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6308" />
        </linearGradient>

        {/* Sun Glow */}
        <radialGradient id="logoSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFECA0" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>

        {/* Path Gradient */}
        <linearGradient id="logoPathGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F8F4E8" />
          <stop offset="80%" stopColor="#EFE5CD" />
          <stop offset="100%" stopColor="#DFD2B1" />
        </linearGradient>

        {/* Leaf Gradients */}
        <linearGradient id="leafGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DAE99" />
          <stop offset="100%" stopColor="#436F5F" />
        </linearGradient>
        <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3CBB9" />
          <stop offset="100%" stopColor="#5E8E7C" />
        </linearGradient>

        {/* Filters */}
        <filter id="logoGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="logoDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* 1. Base Shadow */}
      <circle cx="250" cy="250" r="236" fill="#000000" opacity="0.4" filter="url(#logoDropShadow)" />

      {/* 2. Outer Ring Gold Bevel */}
      <circle cx="250" cy="250" r="232" fill="url(#logoGoldRing)" stroke="#8C6308" strokeWidth="2" />
      <circle cx="250" cy="250" r="222" fill="#0B1A2C" />
      <circle cx="250" cy="250" r="220" fill="url(#logoBgGrad)" stroke="url(#logoGoldAccent)" strokeWidth="2.5" />

      {/* 3. Golden Sun Rays behind the horizon */}
      <g opacity="0.9">
        <line x1="250" y1="262" x2="250" y2="152" stroke="url(#logoGoldAccent)" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="250" y1="262" x2="216" y2="162" stroke="url(#logoGoldAccent)" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="250" y1="262" x2="284" y2="162" stroke="url(#logoGoldAccent)" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="250" y1="262" x2="186" y2="178" stroke="url(#logoGoldAccent)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="250" y1="262" x2="314" y2="178" stroke="url(#logoGoldAccent)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="250" y1="262" x2="160" y2="202" stroke="url(#logoGoldAccent)" strokeWidth="2" strokeLinecap="round" />
        <line x1="250" y1="262" x2="340" y2="202" stroke="url(#logoGoldAccent)" strokeWidth="2" strokeLinecap="round" />
        <line x1="250" y1="262" x2="138" y2="232" stroke="url(#logoGoldAccent)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="250" y1="262" x2="362" y2="232" stroke="url(#logoGoldAccent)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="250" y1="262" x2="126" y2="262" stroke="url(#logoGoldAccent)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="250" y1="262" x2="374" y2="262" stroke="url(#logoGoldAccent)" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* 4. Rising Sun & Horizon Glow */}
      <circle cx="250" cy="262" r="42" fill="url(#logoSunGlow)" opacity="0.75" />
      <path d="M 228 262 A 22 22 0 0 1 272 262 Z" fill="#FFFFFF" filter="url(#logoGlowEffect)" />
      <path d="M 224 262 A 26 26 0 0 1 276 262 Z" fill="none" stroke="url(#logoGoldAccent)" strokeWidth="2" />

      {/* 5. Ascending Winding Path (Voie de l'Insertion et de l'Avenir) */}
      <path
        d="M 248 262 
           C 255 282, 235 298, 240 324 
           C 245 352, 210 378, 142 432 
           A 220 220 0 0 0 358 432 
           C 290 378, 255 352, 260 324 
           C 265 298, 245 282, 252 262 Z"
        fill="url(#logoPathGrad)"
        stroke="url(#logoGoldAccent)"
        strokeWidth="3.5"
      />

      {/* Path Horizontal Steps / Progression Lines */}
      <path d="M 246 270 Q 250 271 254 270" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 244 280 Q 250 282 256 280" stroke="#D4AF37" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 241 292 Q 250 295 259 292" stroke="#D4AF37" strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M 239 308 Q 250 312 262 308" stroke="#D4AF37" strokeWidth="1.6" fill="none" opacity="0.75" />
      <path d="M 233 328 Q 250 334 269 328" stroke="#D4AF37" strokeWidth="1.8" fill="none" opacity="0.8" />
      <path d="M 221 352 Q 250 362 281 352" stroke="#D4AF37" strokeWidth="2.2" fill="none" opacity="0.85" />
      <path d="M 200 382 Q 250 396 303 382" stroke="#D4AF37" strokeWidth="2.4" fill="none" opacity="0.9" />
      <path d="M 172 414 Q 250 430 330 414" stroke="#D4AF37" strokeWidth="2.8" fill="none" opacity="0.95" />

      {/* 6. Left Botanical Foliage & Flowers */}
      <g id="leftBotanical">
        <path d="M 118 402 Q 126 348 146 285" fill="none" stroke="url(#logoGoldAccent)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 118 382 C 98 376, 88 356, 98 346 C 111 352, 118 368, 121 380 Z" fill="url(#leafGradDark)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 127 362 C 137 342, 157 338, 157 352 C 147 362, 137 366, 128 363 Z" fill="url(#leafGradLight)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 132 332 C 112 322, 107 302, 117 292 C 130 299, 134 315, 134 329 Z" fill="url(#leafGradDark)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 142 308 C 152 288, 172 288, 170 302 C 160 310, 150 310, 142 308 Z" fill="url(#leafGradLight)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 146 285 C 136 265, 146 250, 156 255 C 159 265, 153 278, 146 285 Z" fill="url(#leafGradLight)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />

        {/* Large White Flower */}
        <g transform="translate(160, 312)">
          <circle cx="0" cy="-12" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="0" cy="0" r="5" fill="url(#logoGoldAccent)" />
        </g>

        {/* Small White Flower */}
        <g transform="translate(190, 342) scale(0.68)">
          <circle cx="0" cy="-12" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="0" cy="0" r="5" fill="url(#logoGoldAccent)" />
        </g>
      </g>

      {/* 7. Right Botanical Foliage & Flowers (Symmetric) */}
      <g id="rightBotanical">
        <path d="M 382 402 Q 374 348 354 285" fill="none" stroke="url(#logoGoldAccent)" strokeWidth="3" strokeLinecap="round" />
        <path d="M 382 382 C 402 376, 412 356, 402 346 C 389 352, 382 368, 379 380 Z" fill="url(#leafGradDark)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 373 362 C 363 342, 343 338, 343 352 C 353 362, 363 366, 372 363 Z" fill="url(#leafGradLight)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 368 332 C 388 322, 393 302, 383 292 C 370 299, 366 315, 366 329 Z" fill="url(#leafGradDark)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 358 308 C 348 288, 328 288, 330 302 C 340 310, 350 310, 358 308 Z" fill="url(#leafGradLight)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
        <path d="M 354 285 C 364 265, 354 250, 344 255 C 341 265, 347 278, 354 285 Z" fill="url(#leafGradLight)" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />

        {/* Large White Flower */}
        <g transform="translate(340, 312)">
          <circle cx="0" cy="-12" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="0" cy="0" r="5" fill="url(#logoGoldAccent)" />
        </g>

        {/* Small White Flower */}
        <g transform="translate(310, 342) scale(0.68)">
          <circle cx="0" cy="-12" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-7" cy="10" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="-11" cy="-4" r="7" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.3" />
          <circle cx="0" cy="0" r="5" fill="url(#logoGoldAccent)" />
        </g>
      </g>

      {/* 8. Protective Sheltering Hands in Gold (Mains d'Accompagnement) */}
      {/* Left Hand */}
      <path
        d="M 108 240 
           C 138 220, 164 175, 208 135 
           C 228 118, 244 96, 247 90
           C 249 86, 251 88, 249 94
           C 241 114, 212 145, 178 180
           C 152 205, 128 230, 108 240 Z"
        fill="#0B1A2C"
        stroke="url(#logoGoldAccent)"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#logoGlowEffect)"
      />
      <path
        d="M 158 208 
           C 188 174, 218 138, 242 118
           C 245 116, 246 120, 242 124
           C 218 148, 182 188, 148 226"
        fill="none"
        stroke="url(#logoGoldAccent)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Right Hand */}
      <path
        d="M 392 240 
           C 362 220, 336 175, 292 135 
           C 272 118, 256 96, 253 90
           C 251 86, 249 88, 251 94
           C 259 114, 288 145, 322 180
           C 348 205, 372 230, 392 240 Z"
        fill="#0B1A2C"
        stroke="url(#logoGoldAccent)"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#logoGlowEffect)"
      />
      <path
        d="M 342 208 
           C 312 174, 282 138, 258 118
           C 255 116, 254 120, 258 124
           C 282 148, 318 188, 352 226"
        fill="none"
        stroke="url(#logoGoldAccent)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Apex Golden Light Point */}
      <circle cx="250" cy="88" r="3.5" fill="#FFFFFF" stroke="url(#logoGoldAccent)" strokeWidth="1.5" />
    </svg>
  );
};
