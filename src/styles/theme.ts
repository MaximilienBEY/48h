import { createTheme } from "@mui/material"

export const getTheme = (mode: "dark" | "light") => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1550,
      },
    },
    palette: {
      mode,
      primary: {
        main: "#D81D27",
      },
      success: {
        main: mode === "dark" ? "#B5EDB3" : "#27ae60",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#2B3C4D",
        secondary: mode === "dark" ? "#707287" : "#959da6",
      },
      background: {
        default: mode === "dark" ? "#1C1D22" : "#FFFFFF",
        darken: mode === "dark" ? "#17181C" : "#F5F5F5",
      },
      paper: {
        default: mode === "dark" ? "#2C2D35" : "#E9E9E9",
        darken: mode === "dark" ? "#1E1F24" : "#EFEFEF",
      },
    },
  })

  theme.typography.h1 = {
    fontSize: 40,
    [theme.breakpoints.down("xl")]: { fontSize: 36 },
    [theme.breakpoints.down("lg")]: { fontSize: 32 },
    [theme.breakpoints.down("md")]: { fontSize: 28 },
  }
  theme.typography.h2 = {
    fontSize: 32,
    [theme.breakpoints.down("xl")]: { fontSize: 28 },
    [theme.breakpoints.down("lg")]: { fontSize: 24 },
    [theme.breakpoints.down("md")]: { fontSize: 20 },
  }
  theme.typography.h3 = {
    fontSize: 28,
    [theme.breakpoints.down("xl")]: { fontSize: 24 },
    [theme.breakpoints.down("lg")]: { fontSize: 20 },
    [theme.breakpoints.down("md")]: { fontSize: 18 },
  }
  theme.typography.h4 = {
    fontSize: 24,
    [theme.breakpoints.down("xl")]: { fontSize: 20 },
    [theme.breakpoints.down("lg")]: { fontSize: 18 },
    [theme.breakpoints.down("md")]: { fontSize: 16 },
  }
  theme.typography.large = {
    fontSize: 20,
    [theme.breakpoints.down("xl")]: { fontSize: 18 },
    [theme.breakpoints.down("lg")]: { fontSize: 16 },
    [theme.breakpoints.down("md")]: { fontSize: 14 },
  }
  theme.typography.medium = {
    fontSize: 18,
    [theme.breakpoints.down("xl")]: { fontSize: 16 },
    [theme.breakpoints.down("lg")]: { fontSize: 14 },
    [theme.breakpoints.down("md")]: { fontSize: 12 },
  }
  theme.typography.body = {
    fontSize: 16,
    [theme.breakpoints.down("xl")]: { fontSize: 14 },
    [theme.breakpoints.down("lg")]: { fontSize: 12 },
  }
  theme.typography.small = {
    fontSize: 14,
    [theme.breakpoints.down("xl")]: { fontSize: 12 },
    [theme.breakpoints.down("lg")]: { fontSize: 10 },
  }
  theme.typography.tiny = {
    fontSize: 12,
    [theme.breakpoints.down("xl")]: { fontSize: 10 },
    [theme.breakpoints.down("lg")]: { fontSize: 8 },
  }

  return theme
}

declare module "@mui/material/styles" {
  interface Palette {
    paper: {
      default: string
      darken: string
    }
  }
  interface PaletteOptions {
    paper: Palette["paper"]
  }
  interface TypeBackground {
    darken: string
  }
  interface TypographyVariants {
    large: React.CSSProperties
    medium: React.CSSProperties
    body: React.CSSProperties
    small: React.CSSProperties
    tiny: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    large?: React.CSSProperties
    medium?: React.CSSProperties
    body?: React.CSSProperties
    small?: React.CSSProperties
    tiny?: React.CSSProperties
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    large: true
    medium: true
    body: true
    small: true
    tiny: true
  }
}
