// eslint-disable-next-line camelcase
import { Ubuntu, Open_Sans } from "@next/font/google";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import LogoOrBackButton from "../components/LogoOrBackButton";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
});

const openSans = Open_Sans({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${openSans.variable} font-sans h-full scrollbar`}
    >
      <body className="bg-greyscale px-5 text-white overflow-hidden font-ubuntu antialiased h-full xm:px-[60px] xm:overflow-auto lg:px-[130px] scrollbar">
        <LogoOrBackButton />
        <Sidebar />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
