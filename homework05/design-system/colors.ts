import { SemanticTokens } from "@pandacss/dev"

export const colors: SemanticTokens["colors"] = {
  primary: {
    default: { value: { base: "#374df5", _dark: "#7A84FF" } },
    variant: { value: { base: "#2c3ec4", _dark: "#272C32" } },
  },
  secondary: {
    default: { value: { base: "#0bb32a", _dark: "#46C252" } },
    variant: { value: { base: "#08861f", _dark: "#15781F" } },
  },
  surface: {
    s0: { value: { base: "#edf1f6", _dark: "#000000" } },
    s1: { value: { base: "#ffffff", _dark: "#171C1F" } },
    s2: {
      value: { base: "rgba(229, 233, 239, 0.5)", _dark: "rgba(0, 0, 0, 0.5)" },
    },
    sp: { value: { base: "#ffffff", _dark: "#272C32" } },
    t: { value: { base: "#222226", _dark: "#ECEDEF" } },
  },
  neutrals: {
    nLv1: { value: { base: "#222226", _dark: "#ECEDEF" } },
    nLv2: {
      value: {
        base: "rgba(34, 34, 38, 0.7)",
        _dark: "rgba(255, 255, 255, 0.75)",
      },
    },
    nLv3: {
      value: {
        base: "rgba(34, 34, 38, 0.45)",
        _dark: "rgba(255, 255, 255, 0.5)",
      },
    },
    nLv4: {
      value: {
        base: "rgba(34, 34, 38, 0.15)",
        _dark: "rgba(255, 255, 255, 0.15)",
      },
    },
    nLv5: {
      value: {
        base: "rgba(34, 34, 38, 0.06)",
        _dark: "rgba(255, 255, 255, 0.08)",
      },
    },
  },
}
