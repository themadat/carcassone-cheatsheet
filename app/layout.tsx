import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carcassonne Big Expansions Cheat Sheet",
  description: "A no-scroll, table-side rules reference for nine major Carcassonne expansions.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
