"use client";

import { createContext, use } from "react";
import { langContent as langContentConverter } from "@/shared/lib/utils";

const LangContext = createContext();

export function LangProvider({ lang, children }) {
  const isEng = lang === "en";
  const langContent = (content) => langContentConverter(lang, content);

  return <LangContext value={{ lang, langContent, isEng }}>{children}</LangContext>;
}

export function useLang() {
  return use(LangContext);
}
