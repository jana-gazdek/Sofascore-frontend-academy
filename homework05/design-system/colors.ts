import { SemanticTokens } from "@pandacss/dev"

export const colors: SemanticTokens["colors"] = {
  primary: {
    default: { value: { base: "#E3350D", _dark: "#7A84FF" } },
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
  colors: {
    normal: { value: { base: "#A8A878", _dark: "#8A8A60" } },
    fire: { value: { base: "#F08030", _dark: "#E06630" } },
    grass: { value: { base: '#78C850', _dark: "#5CA941" } },
    water: { value: { base: "#6890F0", _dark: "#5079D4" } },
    electric: { value: { base: "#F8D030", _dark: "#D6B020" } },
    ice: { value: { base: "#98D8D8", _dark: "#78C8C8" } },
    fighting: { value: { base: "#C03028", _dark: "#A02020" } },
    ground: { value: { base: "#E0C068", _dark: "#C0A050" } },
    poison: { value: { base: "#A040A0", _dark: "#803080" } },
    flying: { value: { base: "#A890F0", _dark: "#8670D0" } },
    psychic: { value: { base: "#F85888", _dark: "#D84070" } },
    ghost: { value: { base: "#705898", _dark: "#564278" } },
    steel: { value: { base: "#B8B8D0", _dark: "#9A9AB4" } },
    fairy: { value: { base: "#F0B6BC", _dark: "#D098A0" } },
    bug: { value: { base: "#A8B820", _dark: "#8A9C18" } },
    rock: { value: { base: "#B8A038", _dark: "#9C8630" } },
    dragon: { value: { base: "#7038F8", _dark: "#5028D0" } },
    dark: { value: { base: "#705848", _dark: "#564438" } },
  }
 
}
