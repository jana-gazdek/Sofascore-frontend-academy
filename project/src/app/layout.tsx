import type { Metadata } from "next/types";
import "../../styles/globals.css";
import { ThemeProvider } from "../utils/ThemeProvider"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Sofa za Sirotinju",
  description: "Football results",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
            <Header />
            <main>{children}</main> 
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
