import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle, Br } from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import { ArrowRight } from "@/shared/svgs";
import { KAKAO_CHANNEL_URL } from "@/app/app-constants";

export function InquiryBanner() {
  return (
    <section
      className={cn("grid grid-cols-[320px_1fr] gap-10", "tablet:grid-cols-[1fr] tablet:gap-6")}>
      <SectionHead className={cn("!mb-0 mobile:text-center")}>
        <SectionTitle className={cn("text-4xl")}>제품 구매 문의</SectionTitle>
      </SectionHead>
      <div className={cn("space-y-10", "tablet:space-y-6", "mobile:space-y-2")}>
        <ContactInfo
          tel="02-6376-5923"
          telLink="+82-2-6376-5923"
          emails="contact@angel-robotics.com"
        />
        <div
          className={cn(
            "grid grid-cols-2 gap-[30px]",
            "tablet:gap-4",
            "mobile:grid-cols-1 mobile:gap-2",
          )}>
          <LinkCard
            href="/ko/support/contact"
            tag="Online Inquiry"
            title="온라인 문의"
            image="/images/support/purchase-guide-inquiry-link-banner-1.jpg"
          />
          <LinkCard
            href="/ko/support/faq"
            tag="FAQs"
            title="자주 묻는 질문"
            image="/images/support/purchase-guide-inquiry-link-banner-2.jpg"
          />
        </div>
        <div
          className={cn(
            "flex items-start justify-between gap-4",
            "mobile:flex-col mobile:items-center mobile:text-center",
          )}>
          <p className={cn("text-xl/[1.6] font-bold", "tablet:text-base", "mobile:text-sm")}>
            제품 사용에 대한 기술지원 문의는 <Br /> &apos;엔젤로보틱스&apos; 카카오톡 채널을 통해
            상담받을 수 있습니다.
          </p>
          <Button
            asChild
            className={cn(
              "flex-shrink-0 gap-6 bg-white py-0 text-dd-gray-dark",
              "bg-black text-[#FDDB00]",
              "hover:bg-[#FDDB00] hover:text-black",
            )}>
            <Link href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              카카오톡 채널 바로가기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32.729"
                height="34.614"
                viewBox="0 0 32.729 34.614"
                className={cn("!h-[1.5em] !w-[1.5em] flex-shrink-0")}>
                <path
                  d="M16.365,0C7.326,0,0,6.776,0,15.136c0,6.174,2.586,9.121,6.128,11.809l.017.008V34.2a.416.416,0,0,0,.665.333l6.205-4.609.134.058a17.71,17.71,0,0,0,3.217.293c9.038,0,16.364-6.777,16.364-15.137S25.4,0,16.365,0M10.879,18.972a3.419,3.419,0,0,0,3.389-2.443H16.64a5.677,5.677,0,0,1-5.761,4.726,6.017,6.017,0,0,1-6.166-6.135,6.017,6.017,0,0,1,6.166-6.135A5.684,5.684,0,0,1,16.658,13.8H14.292a3.375,3.375,0,0,0-3.413-2.563,3.7,3.7,0,0,0-3.851,3.885,3.8,3.8,0,0,0,3.851,3.853m15.633,2.047H24.339V16.114a1.562,1.562,0,0,0-1.669-1.736c-1.13,0-1.854.691-1.854,2.09v4.552H18.64v-12h2.175v4.512a2.787,2.787,0,0,1,2.511-1.179,2.984,2.984,0,0,1,2.275.927,3.5,3.5,0,0,1,.911,2.562Z"
                  fill="currentColor"
                />
                <rect width="32.729" height="34.614" fill="none" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const contactInfoClassNames = {
  container: cn(
    "space-y-2",
    "tablet:space-y-1.5",
    "mobile:space-y-3 mobile:p-4 mobile:border mobile:border-dd-gray-light/50 mobile:bg-white/50 mobile:rounded-2xl mobile:pb-6",
  ),
  row: cn(
    "grid grid-cols-[80px_1fr] text-lg",
    "tablet:text-base",
    "mobile:text-sm mobile:grid-cols-1 mobile:text-center",
  ),
  label: cn("font-bold text-dd-blue", "mobile:mb-1"),
  valueGroup: cn(
    "flex items-center gap-2 flex-wrap",
    "tablet:gap-4",
    "mobile:gap-1 mobile:flex-col",
  ),
  valueGroupItem: cn(
    "rounded-full bg-white px-[1em]",
    "tablet:px-0 tablet:py-0 tablet:rounded-none tablet:border-none tablet:bg-transparent",
  ),
};

function ContactInfo({ tel, telLink, emails }) {
  return (
    <ul className={cn(contactInfoClassNames.container)}>
      <li className={cn(contactInfoClassNames.row)}>
        <b className={cn(contactInfoClassNames.label)}>TEL</b>
        <a href={`tel:${telLink}`}>{tel}</a>
      </li>
      <li className={cn(contactInfoClassNames.row)}>
        <b className={cn(contactInfoClassNames.label)}>E-MAIL</b>
        <a href={`mailto:${emails}`}>{emails}</a>
      </li>
    </ul>
  );
}

const linkCardClassNames = {
  container: cn(
    "group block relative overflow-hidden rounded-2xl",
    "hover:translate-y-[-10px] transition duration-300",
    "tablet:hover:translate-y-0",
  ),
  background: cn("absolute inset-0 w-full h-full z-0 object-cover"),
  content: cn(
    "relative z-10 text-white pt-[34px] pb-[20px] pl-[30px] pr-[30px] flex flex-col h-[216px]",
    "group-hover:bg-dd-blue/70 transition duration-300",
    "tablet:group-hover:bg-transparent tablet:pt-[20px] tablet:pb-[20px] tablet:pl-[20px] tablet:pr-[20px] tablet:h-[150px]",
    "mobile:h-[130px]",
  ),
  tag: cn(
    "text-white text-xl/[1.1] font-bold opacity-45 block mb-[0.3em]",
    "tablet:text-base/[1.1]",
    "mobile:text-sm/[1.1]",
  ),
  title: cn(
    "text-white text-lg font-bold block text-[34px]/[1.3] mb-5",
    "tablet:text-2xl tablet:mb-3",
    "mobile:text-xl mobile:mb-2",
  ),
  icon: cn("text-white mt-auto ml-auto"),
  iconSVG: cn("text-4xl", "tablet:text-3xl", "mobile:text-2xl"),
};

function LinkCard({ href, tag, title, image }) {
  return (
    <Link href={href} className={cn(linkCardClassNames.container)}>
      <img src={image} alt="" className={cn(linkCardClassNames.background)} />
      <div className={cn(linkCardClassNames.content)}>
        <span className={cn(linkCardClassNames.tag)}>{tag}</span>
        <span className={cn(linkCardClassNames.title)}>{title}</span>
        <div className={cn(linkCardClassNames.icon)}>
          <ArrowRight className={cn(linkCardClassNames.iconSVG)} />
        </div>
      </div>
    </Link>
  );
}
