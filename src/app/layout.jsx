import { cn } from "@/shared/lib/utils";
import { pretendard } from "../fonts";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { ANGEL_ROBOTICS_HOMEPAGE_LABEL, ANGEL_ROBOTICS_HOMEPAGE_DESCRIPTION, ANGEL_ROBOTICS_HOMEPAGE_GOOGLE_VERIFICATION } from "@/features/pediatric-portal/site";

export const metadata = {
  title: {
    default: ANGEL_ROBOTICS_HOMEPAGE_LABEL,
    template: `%s | ${ANGEL_ROBOTICS_HOMEPAGE_LABEL}`,
  },
  description: ANGEL_ROBOTICS_HOMEPAGE_DESCRIPTION,
  verification: {
    google: ANGEL_ROBOTICS_HOMEPAGE_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={cn(pretendard.variable)}>
      <GoogleTagManager gtmId="G-4F6SMDDVYZ" />
      <body className={cn("!w-screen !overflow-x-hidden")}>{children}</body>
      <GoogleAnalytics gaId="G-4F6SMDDVYZ" />
    </html>
  );
}
