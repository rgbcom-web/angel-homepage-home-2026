import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { SVG_Logo, SVG_YoutubeCircle, SVG_LinkedInCircle } from "@/shared/svgs";
import { DDLink } from "@/shared/components/link";
import { YOUTUBE_CHANNEL_URL, LINKEDIN_URL } from "@/app/app-constants";

export function Footer() {
  return (
    <footer className={cn("border-t bg-black py-10 text-white", "tablet:text-sm")}>
      <Container className={cn("flex items-start gap-8", "tablet:flex-col tablet:gap-4")}>
        <SVG_Logo
          theme="color-white"
          className={{ svg: cn("h-auto w-[180px] flex-shrink-0", "tablet:w-[120px]") }}
        />
        <div className={cn("tablet:space-y-2")}>
          <b
            className={cn("mb-[0.4em] ml-[-0.1em] block text-xl text-dd-blue", "tablet:text-base")}>
            (주)엔젤로보틱스 (Angel Robotics Co., Ltd.)
          </b>
          <ul className={cn("flex flex-col flex-wrap gap-x-4", "tablet:gap-y-2")}>
            <li className={cn("flex gap-2")}>
              <b>TEL</b>
              <span className={cn("opacity-80")}>+82-2-6376-5923</span>
            </li>
            <li className={cn("flex gap-2")}>
              <b>E-MAIL</b>
              <span className={cn("opacity-80")}>
                contact@angel-robotics.com / global@angel-robotics.com
              </span>
            </li>
          </ul>
        </div>
        <nav className={cn("ml-auto flex gap-[0.8em]", "tablet:ml-auto")}>
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
      </Container>
    </footer>
  );
}
