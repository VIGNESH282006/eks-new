import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Phenomenon Studio - Product Design & Development Agency",
  description: "Empowering startups to launch, scale, and succeed faster. Your reliable partner in UI/UX design and development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
