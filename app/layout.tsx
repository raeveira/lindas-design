import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linda\'s Design",
  description: "Linda's Design is a fashion design studio based in Reuver, Netherlands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' w-screen h-screen overflow-x-hidden'}>
      <Navigation />
        <main className="pt-[150px] pb-[100px] min-w-full min-h-full flex">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
