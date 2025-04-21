import { defineTextStyles } from "@pandacss/dev"
import { Tokens } from "@pandacss/types"

export const fontSizes: Tokens["fontSizes"] = {
  "2xs": { value: "0.625rem" }, // 10px
  xs: { value: "0.75rem" }, // 12px
  sm: { value: "0.875rem" }, // 14px
  md: { value: "1rem" }, // 16px
  lg: { value: "1.125rem" }, // 18px
  xl: { value: "1.25rem" }, // 20px
  "2xl": { value: "1.75rem" }, // 28px
}

export const textStyles = defineTextStyles({
  display: {
    extraLarge: {
      value: {
        fontSize: "2xl",
        fontWeight: 700,
        lineHeight: 1.14,
        letterSpacing: "-0.14px",
      },
    },
    large: {
      value: {
        fontSize: "lg",
        fontWeight: 700,
        lineHeight: 1.33,
        letterSpacing: "-0.036px",
      },
    },
    medium: {
      value: {
        fontSize: "md",
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: "-0.032px",
      },
    },
    small: {
      value: {
        fontSize: "sm",
        fontWeight: 700,
        lineHeight: 1.14,
        letterSpacing: "-0.028px",
      },
    },
    micro: {
      value: {
        fontSize: "xs",
        fontWeight: 700,
        lineHeight: 1.16,
        letterSpacing: "-0.012px",
      },
    },
  },
  body: {
    large: {
      value: {
        fontSize: "md",
        fontWeight: 400,
        lineHeight: 1.25,
        letterSpacing: "-0.016px",
      },
    },
    medium: {
      value: {
        fontSize: "sm",
        fontWeight: 400,
        lineHeight: 1.14,
        letterSpacing: "-0.028px",
      },
    },
    mediumParagraph: {
      value: {
        fontSize: "sm",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "-0.028px",
      },
    },
    small: {
      value: {
        fontSize: "xs",
        fontWeight: 400,
        lineHeight: 1.3333333,
        letterSpacing: "-0.024px",
      },
    },
  },
  assistive: {
    default: {
      value: {
        fontSize: "xs",
        fontWeight: 500,
        lineHeight: 1.33,
        letterSpacing: "-0.012px",
      },
    },
    micro: {
      value: {
        fontSize: "2xs",
        fontWeight: 500,
        lineHeight: 1.2,
      },
    },
  },
})
