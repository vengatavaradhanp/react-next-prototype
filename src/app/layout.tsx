"use client";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../store/provider";
import ThemeRegistry from "@/components/ThemeRegistry";
import React, { ReactNode, useState } from 'react';
import {
  AppBar,
  Backdrop,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AppHeader from "@/components/AppHeader";
import AppDrawer from "@/components/AppDrawer";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: 'Medical Assessment App',
//   description: 'Healthcare and medical assessments platform',
// };

const drawerWidth = 260;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(true);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable}`}>
        <ThemeRegistry >
          <ReduxProvider>
            <Box sx={{ display: 'flex' }}>
              <AppHeader />
              <AppDrawer />
              <Box component="main" sx={{ flexGrow: 1, p: 0, backgroundColor: '#f9fbfc', minHeight: '100vh' }}>
                <Toolbar />
                <Box sx={{ padding: 4 }}>
                  {children}
                </Box>
              </Box>
            </Box>
          </ReduxProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

