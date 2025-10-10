
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartWrapper from "@/components/ui/CartWrapper";
import Cart from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clothing Store",
  description: "Implementation Of An Online E-Commerace Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Cart>
<CartWrapper>
    {children}
</CartWrapper>
      </Cart>
      </body>
    </html>
  );
}
