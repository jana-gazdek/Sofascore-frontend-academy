import { Tokens } from "@pandacss/types"

import { radii } from "./radii"
import { spacing } from "./spacing"
import { sizes } from "./sizes"
import { fontSizes } from "./typography"

const defineTokens = <T extends Tokens>(v: T) => v

export const tokens = defineTokens({
  radii,
  spacing,
  sizes,
  fontSizes,
})
