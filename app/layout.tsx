import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/src/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: {
    default: "CompeteHub — Where Champions Are Made",
    template: "%s | CompeteHub",
  },
  description:
    "India's premier academic competition platform. Join thousands of students competing in Mathematics, Science, Technology, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
