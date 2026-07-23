"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { DDLink } from "@/shared/components/link";
import { Container, Br } from "@/features/layout";
import { SVG_Logo, SVG_YoutubeCircle, SVG_LinkedInCircle } from "@/shared/svgs";
import { MENU_TREE } from "../header/menu-tree";
import { PrivacyPolicyDialog, EmailPolicyDialog } from "./policy-dialog";
import { YOUTUBE_CHANNEL_URL, LINKEDIN_URL } from "@/app/app-constants";

export function Footer() {
  const { isEng } = useLang();

  return (
    <footer className={cn("relative overflow-hidden bg-black text-sm font-medium text-[#aaa]")}>
      <Container
        className={cn(
          "grid grid-cols-[2.3fr_3fr] gap-6 py-[70px]",
          "tablet:flex tablet:flex-col-reverse tablet:gap-14",
          "mobile:flex-col mobile:gap-10",
        )}>
        <div className={cn("flex flex-col justify-between gap-[2em]", "tablet:gap-6")}>
          <div className={cn("flex items-end gap-3", "tablet:gap-2")}>
            <SVG_Logo
              theme="color-white"
              className={{ svg: cn("h-auto w-[230px]", "tablet:w-[140px]") }}
            />
            {!isEng && (
              <span className={cn("text-lg/[1.2] font-semibold text-white", "tablet:text-sm/[1]")}>
                ㈜엔젤로보틱스
              </span>
            )}
          </div>
          <div className={cn("pl-[75px]", "tablet:pl-0")}>
            <Info />
          </div>
          <div className={cn("mt-auto pl-[75px]", "tablet:pl-0", "mobile:hidden")}>
            <Copyright />
          </div>
        </div>
        <div>
          <Sitemap />
        </div>
        <div className={cn("hidden", "mobile:block")}>
          <Copyright />
        </div>
      </Container>
    </footer>
  );
}

function Info() {
  const { isEng, langContent } = useLang();

  return (
    <div className={cn("space-y-[0.6em]")}>
      <span className={cn("tracking-[-0.04em]")}>
        {langContent({
          ko: "서울 광진구 광나루로56길 85 (구의동, 테크노마트) 12층 1호",
          en: (
            <>12F #1, 85, Gwangnaru-ro 56-gil, Gwangjin-gu, Seoul, Korea (Guui-dong, Techno Mart)</>
          ),
        })}
      </span>
      <ul className={cn("flex flex-wrap gap-x-[3em] gap-y-1", "tablet:gap-x-4", "mobile:flex-col")}>
        {[
          {
            key: "TEL",
            value: langContent({ ko: "02-6376-5923", en: "+82-2-6376-5923" }),
          },
          {
            key: "FAX",
            value: langContent({ ko: "02-6094-0166", en: "+82-2-6094-0166" }),
          },
          {
            key: "MAIL",
            value: langContent({
              ko: "contact@angel-robotics.com",
              en: "global@angel-robotics.com",
            }),
          },
        ].map(({ key, value }) => (
          <li key={key} className={cn("flex gap-[1em]", "tablet:gap-2")}>
            <span className={cn("min-w-[2.4em] font-bold text-dd-blue")}>{key}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Copyright() {
  const { langContent } = useLang();

  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4",
        "tablet:items-center",
        "mobile:flex-col-reverse mobile:items-start",
      )}>
      <div className={cn("space-y-2")}>
        <nav className={cn("")}>
          <PrivacyPolicyDialog
            dialogTrigger={
              <button
                type="button"
                className={cn(
                  "relative px-[0.8em] text-base font-bold leading-[1.1] first:pl-0 last:pr-0",
                  "after:absolute after:right-0 after:top-1/2 after:h-[0.8em] after:w-[1px] after:-translate-y-1/2 after:translate-x-1/2 after:bg-white/20 after:content-['']",
                  "hover:text-white",
                  "tablet:text-sm",
                )}>
                {langContent({
                  ko: "개인정보처리방침",
                  en: "Privacy Policy",
                })}
              </button>
            }
          />
          <EmailPolicyDialog
            dialogTrigger={
              <button
                type="button"
                className={cn(
                  "relative px-[0.8em] text-base font-bold leading-[1.1] first:pl-0 last:pr-0",
                  "after:absolute after:right-0 after:top-1/2 after:h-[0.8em] after:w-[1px] after:-translate-y-1/2 after:translate-x-1/2 after:bg-white/20 after:content-['']",
                  "hover:text-white",
                  "tablet:text-sm",
                )}>
                {langContent({
                  ko: "이메일 무단수집 거부",
                  en: "E-mail policy",
                })}
              </button>
            }
          />
        </nav>
        <p className={cn("text-sm tracking-[-0.04em] text-[#707070]")}>
          Copyright &copy; ANGEL ROBOTICS. All right reserved.
        </p>
      </div>
      <nav className={cn("flex gap-[0.8em]")}>
        {[
          {
            key: "youtube",
            href: YOUTUBE_CHANNEL_URL,
            icon: <SVG_YoutubeCircle />,
          },
          {
            key: "linkedin",
            href: LINKEDIN_URL,
            icon: <SVG_LinkedInCircle />,
          },
        ].map(({ key, href, icon }) => (
          <DDLink
            key={key}
            href={href}
            keepLang={false}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("hover:text-white")}>
            {icon}
          </DDLink>
        ))}
      </nav>
    </div>
  );
}

function Sitemap() {
  const { lang, langContent } = useLang();
  const menuTree = langContent(MENU_TREE);

  return (
    <ul
      className={cn(
        "flex divide-x divide-white/5 border-x border-white/5 text-center tracking-[-0.02em]",
        "tablet:border-x-0",
        "mobile:block mobile:space-y-4 mobile:text-left",
        "mobile:divide-x-0 mobile:divide-y mobile:divide-white/10",
        "mobile:border-y mobile:border-white/10 mobile:py-4",
      )}>
      {menuTree.map((menu, i) => (
        <li
          key={menu.title}
          className={cn(
            "w-full",
            "mobile:grid mobile:grid-cols-5 mobile:gap-2",
            "mobile:pt-4 mobile:first:pt-0",
          )}>
          <DDLink
            href={menu.href}
            className={cn(
              "mb-2 block text-lg font-semibold text-dd-blue",
              "mobile:col-span-2 mobile:mb-0 mobile:text-sm",
            )}>
            {menu.title}
          </DDLink>
          {menu.childs.length > 0 && (
            <ul className={cn("mobile:col-span-3 mobile:grid mobile:grid-cols-2 mobile:gap-2")}>
              {menu.childs.map((child) => (
                <li
                  key={child.title}
                  className={cn("group/menu-child", child.childs && "mb-1 last:mb-0")}>
                  <DDLink
                    href={child.href}
                    className={cn(
                      "block py-[0.3em] font-normal hover:text-white",
                      child.childs && "font-bold text-white hover:text-dd-blue",
                      "mobile:py-0",
                    )}>
                    {child.title}
                  </DDLink>
                  {child.childs && child.childs.length > 0 && (
                    <ul className={cn("mobile:flex mobile:flex-col mobile:gap-1 mobile:pt-1.5")}>
                      {child.childs.map((grandChild) => (
                        <li key={grandChild.title}>
                          <DDLink
                            href={grandChild.href}
                            className={cn(
                              "block py-[0.2em] font-normal",
                              "hover:text-white",
                              "mobile:py-0",
                            )}>
                            {grandChild.title}
                          </DDLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
