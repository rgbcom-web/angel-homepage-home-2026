import { cn } from "@/shared/lib/utils";
import {
  SubpageWrapper,
  SubpageHead,
  SubpageBody,
  Container,
  LinkBanner,
  Br,
} from "@/features/layout";
import { langContent } from "@/shared/lib/utils";
import { ContactForm } from "@/features/form/contact/form";
import Image from "next/image";

function ExternalLinkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      fill="none"
      aria-hidden="true"
      className={className}>
      <g transform="translate(-1501.122 -602.797)">
        <path
          d="M7.989,1.891,1.053,8.859a.708.708,0,0,1-.415.176.517.517,0,0,1-.432-.179A.552.552,0,0,1,.2,8L7.866.321A1.171,1.171,0,0,1,8.2.081.924.924,0,0,1,8.592,0a.909.909,0,0,1,.389.081,1.183,1.183,0,0,1,.331.239L16.777,7.8a.61.61,0,0,1,.184.408.587.587,0,0,1-.184.446.622.622,0,0,1-.432.2.541.541,0,0,1-.407-.2L9.189,1.891V18.853a.6.6,0,1,1-1.2,0Z"
          transform="translate(1518.128 598.797) rotate(45)"
          fill="currentColor"
        />
        <path
          d="M-5170.273-14620.55h-7.139v16.742h16.742v-7.277"
          transform="translate(6681 15229.28)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3"
        />
      </g>
    </svg>
  );
}

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "온라인 문의",
    },
    en: {
      title: "Contact Us",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={langContent(lang, {
            ko: ["고객지원", "온라인 문의"],
            en: ["Customer Support", "Contact Us"],
          })}
          title={langContent(lang, {
            ko: "고객 문의",
            en: "Contact Us",
          })}>
          <div className={cn("space-y-5 pt-[40px]", "tablet:pt-8", "mobile:space-y-4 mobile:pt-6")}>
            <LinkBanner
              backgroundImage="/images/support/contact-link-banner-bg.jpg"
              description={langContent(lang, {
                ko: (
                  <>
                    자주 묻는 질문은
                    <Br pc tablet mobile />
                    FAQs 에서 확인해보세요.
                  </>
                ),
                en: (
                  <>
                    Check out the FAQs <Br />
                    for frequently asked questions.
                  </>
                ),
              })}
              link="./faq"
              linkText="FAQs"
            />
            <a
              href="https://onephai.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex min-h-[134px] items-center justify-between overflow-hidden rounded-[20px] px-[60px] py-8 text-left",
                "tablet:px-8",
                "mobile:min-h-[180px] mobile:flex-col mobile:justify-center mobile:gap-5 mobile:px-6 mobile:text-center",
              )}>
              <div className="absolute inset-0 -z-[2] bg-gradient-to-br from-[#f3f4f6] to-[#dce0e7]" />
              <Image
                src="/images/support/contact-physical-ai-banner.png"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 1200px"
                className="-z-[1] object-cover mobile:opacity-35"
              />
              <p
                className={cn(
                  "relative z-10 text-2xl/[1.6] font-bold text-[#427DFF]",
                  "tablet:text-lg",
                  "mobile:text-lg",
                )}>
                {langContent(lang, {
                  ko: (
                    <>
                      Physical AI 플랫폼 및 제품 문의는
                      <Br pc tablet mobile /> 공식 사이트 onephai.com에서 확인해주세요.
                    </>
                  ),
                  en: (
                    <>
                      For Physical AI platform and product inquiries,
                      <Br pc tablet mobile /> please visit our official website, onephai.com.
                    </>
                  ),
                })}
              </p>
              <span className="relative z-10 inline-flex shrink-0 items-center gap-2 text-[27px] font-bold text-dd-blue transition-colors group-hover:text-[#155cc8] tablet:text-xl mobile:text-lg">
                onephai
                <ExternalLinkIcon className="h-[25px] w-[25px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 tablet:h-[1em] tablet:w-[1em]" />
              </span>
            </a>
          </div>
        </SubpageHead>
      </Container>
      <Container width="narrow">
        <SubpageBody>
          <ContactForm />
        </SubpageBody>
      </Container>
    </SubpageWrapper>
  );
}
