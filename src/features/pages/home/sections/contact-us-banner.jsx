"use client";

import { cn } from "@/shared/lib/utils";
import { useLang } from "@/shared/context/lang-provider";
import { Container } from "@/features/layout/container";
import { SectionTitle } from "../components";
import { DDLink } from "@/shared/components/link";
import { ArrowRight } from "@/shared/svgs";

export function ContactUsBanner() {
  const { isEng, langContent } = useLang();

  return (
    <section className={cn("bg-dd-blue")}>
      <Container
        className={cn(
          "grid grid-cols-3",
          "tablet:grid-cols-2",
          "mobile:max-w-full mobile:grid-cols-1",
          "mobile:divide-y",
          isEng && "items-center",
        )}>
        <SectionTitle className={cn("pt-[30px] text-white/45", "tablet:hidden", isEng && "pt-0")}>
          Contact Us
        </SectionTitle>
        <Item
          tag="Online Inquiry"
          title={langContent({
            ko: "온라인 문의",
            en: "Online Inquiry",
          })}
          bgImage="/images/home/contact-bg-inquiry.jpg"
          href="/support/contact"
        />
        {!isEng && (
          <Item
            tag="FAQs"
            title="자주 묻는 질문"
            bgImage="/images/home/contact-bg-faq.jpg"
            href="/support/faq"
          />
        )}
      </Container>
    </section>
  );
}

function Item({ tag, title, bgImage, href = "" }) {
  const { isEng, langContent } = useLang();

  return (
    <article
      className={cn(
        "group relative overflow-hidden border-l border-white/20 text-white last:border-r",
        "mobile:border-x-0",
        isEng && "col-start-3 tablet:col-span-2 tablet:col-start-1",
      )}>
      <img
        src={bgImage}
        alt=""
        className={cn(
          "absolute left-0 top-0 h-full w-full object-cover",
          "opacity-0",
          "transition-opacity duration-300",
          "group-hover:opacity-60",
          "tablet:!opacity-10",
        )}
      />
      <DDLink
        href={href}
        className={cn(
          "relative z-10 flex flex-col px-[33px] pb-[38px] pt-[50px]",
          "tablet:py-8",
          "mobile:flex-row mobile:items-end mobile:px-[15px] mobile:py-10",
          isEng && "min-h-[200px] flex-row !items-center py-[50px] mobile:min-h-[150px]",
        )}>
        <h3>
          {!isEng && (
            <span
              className={cn(
                "mb-[0.3em] block text-[20px] font-medium leading-[1.3] opacity-45",
                "transition-[opacity, transform] origin-top-left duration-300",
                "group-hover:opacity-100 group-hover:[transform:translateY(-1em)_scale(3)]",
                "tablet:!scale-100 tablet:!opacity-45",
              )}>
              {tag}
            </span>
          )}
          <span
            className={cn(
              "text-[33px] font-bold leading-[1.3]",
              "transition-opacity duration-300",
              "group-hover:opacity-0",
              "tablet:text-3xl",
              "tablet:!opacity-100",
              isEng && "!opacity-100",
            )}>
            {title}
          </span>
        </h3>
        <ArrowRight
          className={cn(
            "ml-auto mt-[45px] size-[25px]",
            "transition-transform duration-300",
            "group-hover:scale-[1.5]",
            "tablet:!scale-100",
            isEng && "mt-0",
          )}
        />
      </DDLink>
    </article>
  );
}
