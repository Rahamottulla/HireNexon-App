// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },

      colors: {

        /* ── Brand — Indigo ─────────────────────────────────────────
           Primary actions, active states, CTAs, links, focus rings.
           The identity color of HireNexon.
        ─────────────────────────────────────────────────────────── */
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",   // ← primary CTA buttons
          600: "#4f46e5",   // ← hover state
          700: "#4338ca",   // ← pressed / active
          800: "#3730a3",
          900: "#312e81",
        },

        /* ── Navy — Deep Blue-Grey ──────────────────────────────────
           Sidebar background, dark surfaces, dark cards.
           Warmer than pure black — feels luxurious, not harsh.
        ─────────────────────────────────────────────────────────── */
        navy: {
          950: "#060b18",   // deepest dark (sidebar footer)
          900: "#0d1425",   // sidebar main bg
          850: "#111c30",   // sidebar hover bg
          800: "#1a2640",   // elevated dark card
          700: "#243354",   // border on dark surfaces
          600: "#3a4f72",   // muted icon on dark
          500: "#546080",   // secondary text on dark
          400: "#7a8fad",   // tertiary text on dark
          300: "#a8b8d0",   // placeholder on dark
        },

        /* ── Slate — Neutral Blue-Grey ──────────────────────────────
           Navbar, body text, form labels, dividers.
           Replaces generic grey — has a subtle cool tint.
        ─────────────────────────────────────────────────────────── */
        slate: {
          25:  "#fafbfc",   // near-white (useful for subtle bg)
          50:  "#f8fafc",
          100: "#f1f5f9",
          150: "#eaeff5",   // extra step — between 100 and 200
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },

        /* ── Surface — Page & Panel Backgrounds ─────────────────────
           Content areas, cards, overlays, inset panels.
           These are NOT pure whites — subtle tint keeps depth.
        ─────────────────────────────────────────────────────────── */
        surface: {
          page:    "#eef1f8",   // layout outer bg — cool blue-grey
          base:    "#f4f6fb",   // secondary panel bg
          card:    "#ffffff",   // content card, main white
          overlay: "#f8fafd",   // modal / popover bg
          raised:  "#ffffff",   // elevated float elements
          sunken:  "#e9ecf4",   // inset / input bg / code blocks
          tinted:  "#f0f2ff",   // brand-tinted surface (banners)
        },

        /* ── Border ─────────────────────────────────────────────────
           Dividers, card outlines, input borders, separators.
        ─────────────────────────────────────────────────────────── */
        border: {
          subtle:  "#e4e8f0",   // lightest — dividers inside cards
          base:    "#d0d5e4",   // default card / panel border
          strong:  "#adb5cc",   // emphasized, form input borders
          focus:   "#6366f1",   // focused input ring
          brand:   "#c7d2fe",   // brand-tinted border
          dark:    "#243354",   // borders on navy/dark bg
        },

        /* ── Accent — Amber ─────────────────────────────────────────
           Contests, leaderboards, premium badges, warnings.
           Gold tone = achievement, competition.
        ─────────────────────────────────────────────────────────── */
        amber: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",   // ← primary amber
          600: "#d97706",
          700: "#b45309",
        },

        /* ── Accent — Emerald ───────────────────────────────────────
           Offer letters, verified badges, success states, hired.
           Green = positive outcome.
        ─────────────────────────────────────────────────────────── */
        emerald: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",   // ← primary emerald
          600: "#059669",
          700: "#047857",
        },

        /* ── Accent — Rose ──────────────────────────────────────────
           Errors, danger actions, notification badges, rejected.
        ─────────────────────────────────────────────────────────── */
        rose: {
          50:  "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",   // ← primary rose
          600: "#e11d48",
          700: "#be123c",
        },

        /* ── Accent — Sky ───────────────────────────────────────────
           Remote jobs, visa guides, info banners, external links.
        ─────────────────────────────────────────────────────────── */
        sky: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",   // ← primary sky
          600: "#0284c7",
          700: "#0369a1",
        },

        /* ── Accent — Violet ────────────────────────────────────────
           AI features, Nexon CV, premium plan badges, roadmaps.
           Distinct from brand-indigo — reserved for AI/magic UX.
        ─────────────────────────────────────────────────────────── */
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",   // ← primary violet
          600: "#7c3aed",
          700: "#6d28d9",
        },

        /* ── Text — Semantic ────────────────────────────────────────
           Use these aliases instead of raw slate values in JSX.
           Makes global theme changes a one-line edit.
        ─────────────────────────────────────────────────────────── */
        text: {
          primary:   "#0d1425",   // headings, strong labels
          secondary: "#334155",   // body copy, descriptions
          muted:     "#64748b",   // captions, meta, timestamps
          disabled:  "#94a3b8",   // disabled form fields
          inverse:   "#ffffff",   // text on dark/brand bg
          brand:     "#6366f1",   // brand-colored inline text
          success:   "#059669",   // positive status labels
          warning:   "#d97706",   // caution labels
          danger:    "#e11d48",   // error / rejected labels
        },

      },

      /* ── Spacing extras ─────────────────────────────────────────── */
      spacing: {
        "4.5": "1.125rem",
        "13":  "3.25rem",
        "15":  "3.75rem",
        "18":  "4.5rem",
      },

      /* ── Border radius ──────────────────────────────────────────── */
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      /* ── Fine-grained font sizes ─────────────────────────────────── */
      fontSize: {
        "2xs": ["0.65rem",   { lineHeight: "1rem"   }],
        "xs":  ["0.75rem",   { lineHeight: "1.1rem" }],
        "sm":  ["0.8125rem", { lineHeight: "1.25rem"}],
        "base":["0.875rem",  { lineHeight: "1.5rem" }],
      },

      /* ── Backdrop blur ──────────────────────────────────────────── */
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
