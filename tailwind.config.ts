import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fredoka)', 'sans-serif'],
        body:    ['var(--font-nunito)', 'sans-serif'],
        premium: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        /* ── Official Adventures of Sia™ Brand Palette ── */
        brand: {
          /* Primary */
          cloud:      '#FFF9F5',
          dreamblue:  '#D8EDFF',
          lavender:   '#DCCEFF',
          blush:      '#FFD7E5',
          sunshine:   '#FFE9A8',
          /* Secondary */
          mint:       '#DDF7E4',
          peach:      '#FFE2D3',
          skyblue:    '#B8E7FF',
          lilac:      '#E8DCFF',
          softpurple: '#B6A3F8',
          /* CTA */
          violet:     '#A88CFF',
          'violet-hover': '#9375F2',
          pink:       '#FF9DC4',
          'pink-hover': '#FF86B5',
          /* Background */
          bg:         '#FAFBFF',
          border:     '#ECE8F5',
          white:      '#FFFFFF',
        },
        /* Typography */
        text: {
          deep: '#57506A',
          mid:  '#8B86A0',
          soft: '#B9B4C9',
        },
        /* Character accent colours kept for theming */
        logo: {
          blue:   '#2448A8',
          yellow: '#FFD040',
          pink:   '#FF7090',
        },
        flower: {
          lavender: '#DCCEFF',
          mint:     '#DDF7E4',
          yellow:   '#FFE9A8',
          blue:     '#B8E7FF',
          pink:     '#FFD7E5',
        },
        sia: {
          fur:    '#FFFDF9',
          cheek:  '#FFBFD3',
          eye:    '#8B78D8',
          blue:   '#BFDFFF',
          yellow: '#FFF2C4',
        },
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(135deg, #FFF9F5 0%, #D8EDFF 45%, #FFD7E5 100%)',
        'magic-gradient':  'linear-gradient(135deg, #DCCEFF 0%, #FFD7E5 50%, #FFE9A8 100%)',
        'cta-gradient':    'linear-gradient(135deg, #A88CFF 0%, #FF9DC4 100%)',
        'sky-gradient':    'linear-gradient(180deg, #FFF9F5 0%, #D8EDFF 40%, #DCCEFF 70%, #C8D8AC 88%, #A8C490 100%)',
        'violet-gradient': 'linear-gradient(135deg, #A88CFF 0%, #FF9DC4 100%)',
        'meadow-gradient': 'linear-gradient(180deg, #DDF7E4 0%, #C8ECD4 45%, #E8F5E0 100%)',
        'family-gradient': 'linear-gradient(160deg, #EBE4FF 0%, #D8EDFF 100%)',
        'night-gradient':  'linear-gradient(180deg, #211840 0%, #130E28 100%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'pom-bob':     'pomBob 3s ease-in-out infinite',
        'pom-bob-alt': 'pomBob 3.8s ease-in-out infinite 1.5s',
        'twinkle':     'twinkle 2.5s ease-in-out infinite',
        'moon-glow':   'moonGlow 6s ease-in-out infinite',
        'sun-pulse':   'sunPulse 4s ease-in-out infinite',
        'spin-slow':   'spin 20s linear infinite',
        'sparkle-out': 'sparkleOut 0.85s ease-out forwards',
        'grain':       'grain 8s steps(1) infinite',
        'ring-spin':   'ringSpin 8s linear infinite',
        'card-glow':   'cardGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        pomBob:   { '0%,100%': { transform: 'translateY(0) rotate(-3deg)' }, '50%': { transform: 'translateY(-9px) rotate(3deg)' } },
        twinkle:  { '0%,100%': { opacity: '0.25', transform: 'scale(0.7)' }, '50%': { opacity: '1', transform: 'scale(1.3)' } },
        moonGlow: {
          '0%,100%': { filter: 'drop-shadow(0 0 8px rgba(168,140,255,0.35))' },
          '50%':     { filter: 'drop-shadow(0 0 22px rgba(168,140,255,0.7))' },
        },
        sunPulse: {
          '0%,100%': { transform: 'scale(1)',    filter: 'drop-shadow(0 0 14px rgba(255,233,168,0.5))' },
          '50%':     { transform: 'scale(1.07)', filter: 'drop-shadow(0 0 28px rgba(255,233,168,0.75))' },
        },
        sparkleOut: {
          '0%':   { transform: 'translate(0,0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--tx), var(--ty)) scale(0)', opacity: '0' },
        },
        grain: {
          '0%,100%': { backgroundPosition: '0% 0%' },
          '10%':     { backgroundPosition: '-5% -10%' },
          '20%':     { backgroundPosition: '-15% 5%' },
          '30%':     { backgroundPosition: '7% -25%' },
          '40%':     { backgroundPosition: '20% 25%' },
          '50%':     { backgroundPosition: '-25% 10%' },
          '60%':     { backgroundPosition: '15% 5%' },
          '70%':     { backgroundPosition: '0% 15%' },
          '80%':     { backgroundPosition: '25% 35%' },
          '90%':     { backgroundPosition: '-10% 10%' },
        },
        ringSpin:  { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        cardGlow:  {
          '0%,100%': { boxShadow: '0 0 20px rgba(168,140,255,0.15)' },
          '50%':     { boxShadow: '0 0 40px rgba(168,140,255,0.3)' },
        },
      },
      boxShadow: {
        'sia':   '0 24px 64px rgba(168,140,255,0.18), 0 8px 24px rgba(216,237,255,0.25)',
        'glass': '0 8px 32px rgba(168,140,255,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
        'house': '0 48px 120px rgba(90,140,90,0.28), 0 16px 40px rgba(0,0,0,0.08)',
        'cta':   '0 8px 28px rgba(168,140,255,0.4)',
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
}

export default config
