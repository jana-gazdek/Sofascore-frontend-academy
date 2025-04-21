import { defineConfig } from "@pandacss/dev"

import { colors } from "./design-system/colors"
import { breakpoints } from "./design-system/breakpoints"
import { tokens } from "./design-system/tokens"
import { textStyles } from "./design-system/typography"

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    breakpoints,
    tokens,
    textStyles,
    semanticTokens: {
      colors,
    },
  },

  conditions: {
    dark: "[data-theme=dark] &",
  },

  // The output directory for your css system
  outdir: "styled-system",

  // This allows us to generate JSX patterns
  jsxFramework: "react",
})
