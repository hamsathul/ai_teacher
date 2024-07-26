import { Roboto, Noto_Kufi_Arabic  } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "700"],
	variable: "--font-roboto",
  });
  
  export const notoKufiAR = Noto_Kufi_Arabic({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-noto-kufi-arabic",
	
  });

export const metadata = {
  title: "3D AI Arabic Teacher",
  description: "Learn Arabic with a 3D AI teacher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${notoKufiAR.variable}`}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
