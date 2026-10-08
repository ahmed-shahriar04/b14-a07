import { Hind_Siliguri, Inter, Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const notoBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["bengali"],
  variable: "--font-num",
  display: "swap"
});

export const metadata = {
  title: "বাজার দর - নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য ট্র্যাকার",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable} ${notoBengali.variable}`}>
      <head>
        <link rel="icon" href="/logo-icon.png" sizes="any" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-screen bg-[#F0F5F0] text-[#1D271F] font-sans antialiased flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1D271F",
                color: "#FAFCFA",
                fontFamily: "var(--font-hind), sans-serif",
                fontSize: "14px",
                borderRadius: "10px",
                padding: "10px 16px"
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
