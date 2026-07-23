"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export function DDLink({ href, keepLang = true, ...props }) {
  const { lang } = useParams();

  if (keepLang) {
    if (!href.startsWith("/")) {
      href = `/${href}`;
    }
    href = `/${lang}${href}`;
  }

  return <Link href={href} {...props} />;
}
