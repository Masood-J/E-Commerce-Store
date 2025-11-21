import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import CartWrapper from "@/components/ui/CartWrapper";
import Cart from "@/context/CartContext";
import ScrollTop from "@/components/ui/ScrollTop";
import ThemeProviderWrapper from "@/components/ui/ThemeWrapper";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Urban Aura",
    description: "Implementation Of An Online E-Commerace Store",
};

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >

        <ScrollTop></ScrollTop>
        <div id="scroll-container" className={`h-screen scrollbar-thin overflow-y-scroll scrollbar-track-transparent`}>
            <Cart>
                <ThemeProviderWrapper>
                    <CartWrapper>
                        {children}
                        <Footer></Footer>
                    </CartWrapper>
                </ThemeProviderWrapper>
            </Cart>
        </div>

        </body>
        </html>
    );
}
