/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#ffffff",
        black: "#101828",

        /* Brand */
        brand: {
          25: "#f2f7ff",
          50: "#ecf3ff",
          100: "#dde9ff",
          200: "#c2d6ff",
          300: "#9cb9ff",
          400: "#7592ff",
          500: "#465fff",
          600: "#3641f5",
          700: "#2a31d8",
          800: "#252dae",
          900: "#262e89",
          950: "#161950",
        },

        /* Blue Light */
        "blue-light": {
          25: "#f5fbff",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e6fe",
          300: "#7cd4fd",
          400: "#36bffa",
          500: "#0ba5ec",
          600: "#0086c9",
          700: "#026aa2",
          800: "#065986",
          900: "#0b4a6f",
          950: "#062c41",
        },

        /* Gray */
        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#e4e7ec",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828",
          950: "#0c111d",
          dark: "#1a2231",
        },

        /* Orange */
        orange: {
          25: "#fffaf5",
          50: "#fff6ed",
          100: "#ffead5",
          200: "#fddcab",
          300: "#feb273",
          400: "#fd853a",
          500: "#fb6514",
          600: "#ec4a0a",
          700: "#c4320a",
          800: "#9c2a10",
          900: "#7e2410",
          950: "#511c10",
        },

        /* Success */
        success: {
          25: "#f6fef9",
          50: "#ecfdf3",
          100: "#d1fadf",
          200: "#a6f4c5",
          300: "#6ce9a6",
          400: "#32d583",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
          800: "#05603a",
          900: "#054f31",
          950: "#053321",
        },

        /* Error */
        error: {
          25: "#fffbfa",
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdca",
          300: "#fda29b",
          400: "#f97066",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
          800: "#912018",
          900: "#7a271a",
          950: "#55160c",
        },

        /* Warning */
        warning: {
          25: "#fffcf5",
          50: "#fffaeb",
          100: "#fef0c7",
          200: "#fedf89",
          300: "#fec84b",
          400: "#fdb022",
          500: "#f79009",
          600: "#dc6803",
          700: "#b54708",
          800: "#93370d",
          900: "#7a2e0e",
          950: "#4e1d09",
        },

        /* Extra Theme Colors */
        "pink": {
          500: "#ee46bc",
        },
        "theme-purple": {
          500: "#7a5af8",
        },
      },
      // colors: {
      //   brand: {
      //     50: "#eef2ff",
      //     100: "#e0e7ff",
      //     200: "#c7d2fe",
      //     300: "#a5b4fc",
      //     400: "#818cf8",
      //     500: "#6366f1",
      //     600: "#4f46e5",
      //     700: "#4338ca",
      //     800: "#3730a3",
      //     900: "#312e81",
      //   },

      //   gray: {
      //     50: "#f9fafb",
      //     100: "#f3f4f6",
      //     200: "#e5e7eb",
      //     300: "#d1d5db",
      //     400: "#9ca3af",
      //     500: "#6b7280",
      //     600: "#4b5563",
      //     700: "#374151",
      //     800: "#1f2937",
      //     900: "#111827",
      //   },

      //   success: {
      //     500: "#22c55e",
      //   },

      //   warning: {
      //     500: "#f59e0b",
      //   },

      //   danger: {
      //     500: "#ef4444",
      //   }
      // },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },

      fontSize: {
        "title-2xl": ["72px", { lineHeight: "90px" }],
        "title-xl": ["60px", { lineHeight: "72px" }],
        "title-lg": ["48px", { lineHeight: "60px" }],
        "title-md": ["36px", { lineHeight: "44px" }],
        "title-sm": ["30px", { lineHeight: "38px" }],

        "theme-xl": ["20px", { lineHeight: "30px" }],
        "theme-sm": ["14px", { lineHeight: "20px" }],
        "theme-xs": ["12px", { lineHeight: "18px" }],
      },

      screens: {
        "2xsm": "375px",
        xsm: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "2000px",
      },

      boxShadow: {
        "theme-md": "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        "theme-lg": "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        "theme-sm": "0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        "theme-xs": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "theme-xl": "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",

        datepicker: "-5px 0 0 #262d3c, 5px 0 0 #262d3c",
        "focus-ring": "0px 0px 0px 4px rgba(70, 95, 255, 0.12)",
        "slider-navigation":
          "0px 1px 2px 0px rgba(16, 24, 40, 0.1), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
        tooltip:
          "0px 4px 6px -2px rgba(16, 24, 40, 0.05), -8px 0px 20px 8px rgba(16, 24, 40, 0.05)",

        "4xl": "0 35px 35px rgba(0,0,0,0.25), 0 45px 65px rgba(0,0,0,0.15)",
      },

      /* -------------------------------------------- */
      /* Z-index                                      */
      /* -------------------------------------------- */
      zIndex: {
        1: 1,
        9: 9,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
        999999: 999999,
      },
      // fontSize: {
      //   "title-2xl": ["72px", "90px"],
      //   "title-xl": ["60px", "72px"],
      //   "title-lg": ["48px", "60px"],
      //   "title-md": ["36px", "44px"],
      //   "title-sm": ["30px", "36px"],
      //   "title-xs": ["24px", "32px"],

      //   "theme-sm": ["14px", "20px"],
      //   "theme-xs": ["12px", "18px"],
      //   "theme-2xs": ["10px", "16px"],
      // },

      // boxShadow: {
      //   sm: "0 1px 2px rgba(0,0,0,0.05)",
      //   md: "0 4px 6px rgba(0,0,0,0.08)",
      //   lg: "0 10px 15px rgba(0,0,0,0.1)",
      //   xl: "0 20px 25px rgba(0,0,0,0.1)",
      //   soft: "0 2px 8px rgba(0,0,0,0.06)",
      // },

      // dropShadow: {
      //   soft: "0 2px 4px rgba(0,0,0,0.08)",
      // },

      dropShadow: {
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
      },

      spacing: {
        sidebar: "260px",
        "sidebar-collapsed": "80px",
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
       theme: {
          pink: { 500: "#ee46bc" },
          purple: { 500: "#7a5af8" },
        },

      // zIndex: {
      //   60: "60",
      //   70: "70",
      //   80: "80",
      //   90: "90",
      //   100: "100",
      // },
    },
  },
  plugins: [
    function ({addBase, addUtilities }) {

      addBase({
        "*, ::after, ::before, ::backdrop, ::file-selector-button": {
          borderColor: "var(--color-gray-200, currentColor)",
        },
        "button:not(:disabled), [role='button']:not(:disabled)": {
          cursor: "pointer",
        },
        "body": {
          position: "relative",            // @apply relative
          fontWeight: "400",               // font-normal
          fontFamily: "Outfit, sans-serif",// font-outfit
          zIndex: "1",                     // z-1
          backgroundColor: "#ffffff",      // bg-gray-50
        },
      });

    const newUtilities = {
      /* --- MENU ITEM --- */
      ".menu-item": {
        "@apply relative flex items-center w-full gap-3 px-3 py-2  rounded-lg text-theme-sm": {},
      },
      ".menu-item-active": {
        "@apply bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400": {},
      },
      ".menu-item-inactive": {
        "@apply text-gray-500 hover:bg-gray-100 group-hover:text-gray-500 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300": {},
      },

      /* --- ICON --- */
      ".menu-item-icon": {
        "@apply text-gray-500 group-hover:text-gray-700 dark:text-gray-400": {},
      },
      ".menu-item-icon-active": {
        "@apply text-brand-500 dark:text-brand-400": {},
      },
      ".menu-item-icon-size ": {
        "& svg":{
        "@apply !size-5":{},
      },
      },
      ".menu-item-icon-inactive": {
        "@apply text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300": {},
      },

      /* --- ARROW --- */
      ".menu-item-arrow": {
        "@apply relative": {},
      },
      ".menu-item-arrow-active": {
        "@apply rotate-180 text-brand-500 dark:text-brand-400": {},
      },
      ".menu-item-arrow-inactive": {
        "@apply text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300": {},
      },

      /* --- DROPDOWN ITEM --- */
      ".menu-dropdown-item": {
        "@apply relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-theme-sm font-medium": {},
      },
      ".menu-dropdown-item-active": {
        "@apply bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400": {},
      },
      ".menu-dropdown-item-inactive": {
        "@apply text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5": {},
      },

      /* --- DROPDOWN BADGE --- */
      ".menu-dropdown-badge": {
        "@apply block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase text-brand-500 dark:text-brand-400": {},
      },
      ".menu-dropdown-badge-active": {
        "@apply bg-brand-100 dark:bg-brand-500/20": {},
      },
      ".menu-dropdown-badge-inactive": {
        "@apply bg-brand-50 group-hover:bg-brand-100 dark:bg-brand-500/15 dark:group-hover:bg-brand-500/20": {},
      },

      /* --- NO SCROLLBAR --- */
      ".no-scrollbar::-webkit-scrollbar": {
        display: "none",
      },
      ".no-scrollbar": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },

      /* --- CUSTOM SCROLLBAR --- */
      ".custom-scrollbar::-webkit-scrollbar": {
        "@apply size-1.5": {},
      },
      ".custom-scrollbar::-webkit-scrollbar-track": {
        "@apply rounded-full": {},
      },
      ".custom-scrollbar::-webkit-scrollbar-thumb": {
        "@apply bg-gray-200 rounded-full dark:bg-gray-700": {},
      },
      ".dark .custom-scrollbar::-webkit-scrollbar-thumb": {
        backgroundColor: "#344054",
      },
      ".tableCheckbox:checked ~ span span": {
        opacity: "1",
      },
      ".tableCheckbox:checked ~ span": {
        "border-color": "var(--tw-brand-500)",
        "background-color": "var(--tw-brand-500)",
      },

      /* ApexCharts */
      ".apexcharts-legend-text": {
        "padding-left": "1.25rem !important",
        color: "rgb(55 65 81 / 1) !important",
      },
      ".dark .apexcharts-legend-text": {
        color: "rgb(156 163 175 / 0.4) !important",
      },

      ".apexcharts-text": {
        fill: "rgb(55 65 81 / 1) !important",
      },
      ".dark .apexcharts-text": {
        fill: "rgb(156 163 175 / 0.4) !important",
      },

      ".apexcharts-tooltip.apexcharts-theme-light": {
        gap: "0.25rem",
        "border-radius": "0.5rem !important",
        border: "1px solid rgb(229 231 235 / 1) !important",
        padding: "0.75rem",
        "box-shadow": "var(--tw-shadow-theme-sm) !important",
      },
      ".dark .apexcharts-tooltip.apexcharts-theme-light": {
        border: "1px solid rgb(31 41 55 / 1) !important",
        "background-color": "rgb(17 24 39 / 1) !important",
      },

      ".apexcharts-tooltip-marker": {
        "margin-right": "6px",
        height: "6px",
        width: "6px",
      },

      ".apexcharts-tooltip-series-group": { padding: "0 !important" },
      ".apexcharts-tooltip-y-group": { padding: "0 !important" },

      ".apexcharts-tooltip-title": {
        margin: "0 !important",
        "border-bottom": "0 !important",
        background: "transparent !important",
        padding: "0 !important",
        "font-size": "10px !important",
        "line-height": "1rem !important",
        color: "rgb(31 41 55 / 1) !important",
      },
      ".dark .apexcharts-tooltip-title": {
        color: "rgb(255 255 255 / 0.9) !important",
      },

      ".apexcharts-tooltip-text": {
        "font-size": "var(--theme-xs) !important",
        color: "rgb(55 65 81 / 1) !important",
      },
      ".dark .apexcharts-tooltip-text": {
        color: "rgb(255 255 255 / 0.9) !important",
      },

      ".apexcharts-tooltip-text-y-value": {
        "font-weight": "600 !important",
      },

      ".apexcharts-gridline": {
        stroke: "rgb(243 244 246 / 1) !important",
      },
      ".dark .apexcharts-gridline": {
        stroke: "rgb(31 41 55 / 1) !important",
      },

      "#chartTwo .apexcharts-datalabels-group": {
        transform: "translateY(-96px) !important",
      },
      "#chartTwo .apexcharts-datalabels-group .apexcharts-text": {
        fill: "rgb(31 41 55 / 1) !important",
        "font-weight": "600 !important",
      },
      ".dark #chartTwo .apexcharts-datalabels-group .apexcharts-text": {
        fill: "rgb(255 255 255 / 0.9) !important",
      },

      "#chartDarkStyle .apexcharts-datalabels-group .apexcharts-text": {
        fill: "rgb(31 41 55 / 1) !important",
        "font-weight": "600 !important",
      },
      ".dark #chartDarkStyle .apexcharts-datalabels-group .apexcharts-text": {
        fill: "rgb(255 255 255 / 0.9) !important",
      },

      "#chartSixteen .apexcharts-legend": {
        padding: "0 !important",
        "padding-left": "1.5rem !important",
      },

      /* JVECTOR MAP */
      ".jvectormap-container": {
        "background-color": "rgb(249 250 251 / 1) !important",
      },
      ".dark .jvectormap-container": {
        "background-color": "rgb(17 24 39 / 1) !important",
      },

      ".jvectormap-region.jvectormap-element": {
        fill: "rgb(209 213 219 / 1) !important",
      },
      ".jvectormap-region.jvectormap-element:hover": {
        fill: "var(--tw-brand-500) !important",
      },
      ".dark .jvectormap-region.jvectormap-element": {
        fill: "rgb(55 65 81 / 1) !important",
      },
      ".dark .jvectormap-region.jvectormap-element:hover": {
        fill: "var(--tw-brand-500) !important",
      },

      ".jvectormap-marker.jvectormap-element": {
        stroke: "rgb(229 231 235 / 1) !important",
      },
      ".dark .jvectormap-marker.jvectormap-element": {
        stroke: "rgb(31 41 55 / 1) !important",
      },

      ".jvectormap-tip": {
        "background-color": "var(--tw-brand-500) !important",
        padding: "0.25rem 0.5rem !important",
        border: "none !important",
      },

      ".jvectormap-zoomin, .jvectormap-zoomout": {
        display: "none !important",
      },

      /* Swiper arrows */
      ".stocks-slider-outer .swiper-button-next:after, .stocks-slider-outer .swiper-button-prev:after": {
        display: "none",
      },

      ".stocks-slider-outer .swiper-button-next, .stocks-slider-outer .swiper-button-prev": {
        position: "static !important",
        marginTop: "0",
        height: "2rem",
        width: "2.25rem",
        "border-radius": "9999px",
        border: "1px solid rgb(229 231 235 / 1)",
        color: "rgb(55 65 81 / 1) !important",
        transition: "all .2s",
        "background-color": "rgb(31 41 55 / 1)",
      },

      ".stocks-slider-outer .swiper-button-next.swiper-button-disabled, .stocks-slider-outer .swiper-button-prev.swiper-button-disabled": {
        "background-color": "white",
        opacity: "0.5",
      },

      ".stocks-slider-outer .swiper-button-next svg, .stocks-slider-outer .swiper-button-prev svg": {
        height: "auto !important",
        width: "auto !important",
      },

      /* Flatpickr */
      ".flatpickr-wrapper": {
        width: "100%",
      },

      ".flatpickr-calendar": {
        marginTop: "0.5rem",
        // top:"230px !important",
        "background-color": "white !important",
        padding: "1.25rem !important",
        border: "1px solid rgb(229 231 235 / 1) !important",
        "border-radius": "0.75rem !important",
        color: "rgb(107 114 128 / 1) !important",
      },
      ".dark .flatpickr-calendar": {
        "background-color": "rgb(55 65 81 / 1) !important",
        border: "1px solid rgb(55 65 81 / 1) !important",
        color: "rgb(156 163 175 / 1) !important",
      },
      ".flatpickr-months .flatpickr-prev-month:hover svg, .flatpickr-months .flatpickr-next-month:hover svg": {
      stroke: "var(--tw-colors-brand-500)",
    },

    ".flatpickr-calendar.arrowTop:before, .flatpickr-calendar.arrowTop:after": {
      "display": "none",
    },

    ".flatpickr-current-month": {
      "padding": "0 !important",
    },

    ".flatpickr-current-month .cur-month, .flatpickr-current-month input.cur-year": {
      "height": "auto !important",
      "padding-top": "0 !important",
      "font-size": "1.125rem !important",
      "font-weight": "500 !important",
      "color": "rgb(31 41 55) !important",
    },

    ".dark .flatpickr-current-month .cur-month, .dark .flatpickr-current-month input.cur-year": {
      "color": "rgb(255 255 255 / 0.9) !important",
    },

    ".flatpickr-prev-month, .flatpickr-next-month": {
      "padding": "0 !important",
    },

    ".flatpickr-weekdays": {
      "height": "auto",
      "margin-top": "1.5rem",
      "margin-bottom": "1rem",
      "background": "transparent !important",
    },

    ".flatpickr-weekday": {
      "font-size": "0.75rem !important",
      "font-weight": "500 !important",
      "color": "rgb(107 114 128) !important",
      "background": "transparent !important",
    },

    ".dark .flatpickr-weekday": {
      "color": "rgb(156 163 175) !important",
    },

    ".flatpickr-day": {
      "display": "flex !important",
      "align-items": "center !important",
      "font-size": "0.75rem !important",
      "font-weight": "500 !important",
      "color": "rgb(31 41 55) !important",
    },

    ".dark .flatpickr-day": {
      "color": "rgb(255 255 255 / 0.9) !important",
    },

    ".flatpickr-day.nextMonthDay, .flatpickr-day.prevMonthDay": {
      "color": "rgb(156 163 175) !important",
    },

    ".flatpickr-days": {
      "border": "0 !important",
    },

    "span.flatpickr-weekday, .flatpickr-months .flatpickr-month": {
      "background": "none !important",
      "color": "inherit !important",
    },

    ".dark span.flatpickr-weekday, .dark .flatpickr-months .flatpickr-month": {
      "color": "white !important",
    },

    ".flatpickr-innerContainer": {
      "border-bottom": "0 !important",
    },

    ".flatpickr-day.inRange": {
      "box-shadow": "-5px 0 0 #f9fafb, 5px 0 0 #f9fafb !important",
    },

    ".dark .flatpickr-day.inRange": {
      "box-shadow": "var(--tw-shadow-datepicker) !important",
    },

    ".flatpickr-day:hover, .flatpickr-day:focus, .flatpickr-day.inRange, .flatpickr-day.today.inRange": {
      "border": "1px solid rgb(249 250 251) !important",
      "background": "rgb(249 250 251) !important",
    },

    ".dark .flatpickr-day:hover, .dark .flatpickr-day:focus, .dark .flatpickr-day.inRange, .dark .flatpickr-day.today.inRange": {
      "background": "rgb(255 255 255 / 0.05) !important",
      "border": "0 !important",
    },

    ".flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange": {
      "background": "#465fff !important",
      "border-color": "#465fff !important",
      "color": "white !important",
    },

    ".flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1))": {
      "box-shadow": "-10px 0 0 #465fff !important",
    },

    ".flatpickr-months .flatpickr-prev-month svg, .flatpickr-months .flatpickr-next-month svg, .flatpickr-months .flatpickr-prev-month, .flatpickr-months .flatpickr-next-month": {
      "transition": "all 0.2s ease",
    },

    ".flatpickr-months .flatpickr-prev-month:hover svg, .flatpickr-months .flatpickr-next-month:hover svg": {
      "fill": "none !important",
    },

    ".flatpickr-calendar.static": {
      "right": "0 !important",
    },

    };

    addUtilities(newUtilities);
  },
  ],
});
