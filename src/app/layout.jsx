import { cn } from "@/shared/lib/utils";
import { pretendard } from "../fonts";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={cn(pretendard.variable)}>
      <GoogleTagManager gtmId="G-4F6SMDDVYZ" />
      <body className={cn("!w-screen !overflow-x-hidden")}>{children}</body>
      <GoogleAnalytics gaId="G-4F6SMDDVYZ" />
    </html>
  );
}
