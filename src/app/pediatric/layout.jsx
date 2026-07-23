import { LangProvider } from "@/shared/context/lang-provider";
import {
  PEDIATRIC_SITE_DESCRIPTION,
  PEDIATRIC_SITE_NAME,
} from "@/features/pediatric-portal/site";

export const metadata = {
  title: {
    default: PEDIATRIC_SITE_NAME,
    template: `%s | ${PEDIATRIC_SITE_NAME}`,
  },
  description: PEDIATRIC_SITE_DESCRIPTION,
};

export default function PediatricRootLayout({ children }) {
  return <LangProvider lang="ko">{children}</LangProvider>;
}
