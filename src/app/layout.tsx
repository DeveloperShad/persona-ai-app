import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import "./globals.css";
import { Stack } from "@mui/system";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Psychology, Settings } from "@mui/icons-material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Persona AI App",
  description: "AI-powered persona chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack>
              <Navbar />
              {children}
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Psychology sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Persona AI
        </Typography>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
