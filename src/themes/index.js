import { extendTheme } from "@vechaiui/react";
import { light, dark } from "./colorSchemes";

export const theme = extendTheme({
    cursor: "pointer",
    colorSchemes: {
        light,
        dark
    }
})