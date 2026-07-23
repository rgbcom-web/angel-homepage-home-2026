import { cn } from "@/shared/lib/utils";
import {
  SubpageWrapper,
  SubpageHead,
  SubpageBody,
  Container,
  Br,
  BulletList,
} from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import { langContent } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "기술 지원",
    },
    en: {
      title: "Technical Support",
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
            ko: ["고객지원", "기술지원"],
            en: ["Customer Support", "Technical Support"],
          })}
          title={langContent(lang, {
            ko: "기술 지원",
            en: "Technical Support",
          })}></SubpageHead>
      </Container>
      <SubpageBody>
        <div className={cn("relative")}>
          <Container
            className={cn(
              "relative z-10 flex justify-end py-[120px]",
              "tablet:py-20",
              "mobile:py-0 mobile:pb-8",
            )}>
            <div className={cn("text-white", "tablet:w-2/3", "mobile:w-full mobile:text-inherit")}>
              <p
                className={cn(
                  "text-xl/[1.8] font-bold",
                  "tablet:text-lg",
                  "mobile:text-center mobile:text-base",
                )}>
                Angel Robotics is committed to providing exceptional technical support <Br pc />
                to ensure the best experience with our products. Our dedicated customers <Br pc />
                support team is available to assist you with any inquiries related to product{" "}
                <Br pc />
                usage, troubleshooting, maintenance, and technical issues.
              </p>
            </div>
          </Container>
          <Image
            src="/images/support/technical-support-banner-bg.jpg"
            alt=""
            width={1920}
            height={363}
            className={cn("absolute inset-0 h-full w-full object-cover", "mobile:hidden")}
          />
          <Image
            src="/images/support/technical-support-banner-bg-mo.jpg"
            alt=""
            width={796}
            height={431}
            className={cn("hidden w-full", "mobile:block")}
          />
        </div>
        <Container width="narrow" className={cn("mt-[100px]", "tablet:mt-20", "mobile:mt-10")}>
          <h3
            className={cn(
              "mb-[1em] text-[38px]/[1.3] font-bold",
              "tablet:text-3xl/[1.3]",
              "mobile:text-2xl/[1.3]",
            )}>
            How We Can Help
          </h3>
          <ol>
            <HelpRow num="1" title="Troubleshooting guide">
              <p>
                Receive guidance on resolving technical issues and optimizing performance, <Br pc />
                provided within 24 hours of service request submission to ensure prompt assistance.
              </p>
            </HelpRow>
            <HelpRow num="2" title="Comprehensive Service Training">
              <BulletList
                items={[
                  <>
                    <b className={cn("text-dd-navy")}>Periodic service training</b> conducted in
                    Korea
                  </>,
                  <>
                    <b className={cn("text-dd-navy")}>Proactive customer engagement</b>,
                    incorporating feedback to enhance service quality
                  </>,
                  <>
                    <b className={cn("text-dd-navy")}>Flexible training options</b>, including
                    online and on-site service or clinical training, tailored to customer needs
                  </>,
                  <>
                    <b className={cn("text-dd-navy")}>Self-learning video resources</b> designed to
                    empower distributor engineers
                  </>,
                ]}
              />
            </HelpRow>
            <HelpRow num="3" title="Software & Updates">
              <p>Stay informed about the latest firmware and software updates.</p>
            </HelpRow>
          </ol>
          <div className={cn("mt-[20px] space-y-4 text-right")}>
            <p>For any inquiries or additional information, please contact us at</p>
            <Button asChild variant="gray-dark" className={cn("gap-[0.5em] text-xl")}>
              <Link href="mailto:global@angelrobotics.com">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27.182"
                  height="20.386"
                  viewBox="0 0 27.182 20.386">
                  <path
                    id="envelope-regular"
                    d="M3.4,66.548a.852.852,0,0,0-.849.849v1.173l9.158,7.517a2.97,2.97,0,0,0,3.775,0l9.153-7.517V67.4a.852.852,0,0,0-.849-.849Zm-.849,5.32v9.121a.852.852,0,0,0,.849.849H23.784a.852.852,0,0,0,.849-.849V71.868l-7.539,6.19a5.521,5.521,0,0,1-7.008,0ZM0,67.4A3.4,3.4,0,0,1,3.4,64H23.784a3.4,3.4,0,0,1,3.4,3.4V80.989a3.4,3.4,0,0,1-3.4,3.4H3.4a3.4,3.4,0,0,1-3.4-3.4Z"
                    transform="translate(0 -64)"
                    fill="#fff"
                  />
                </svg>
                <span>global@angel-robotics.com</span>
              </Link>
            </Button>
          </div>
        </Container>
      </SubpageBody>
    </SubpageWrapper>
  );
}

function HelpRow({ num, title, children }) {
  return (
    <li
      className={cn(
        "grid grid-cols-[310px_1fr] gap-[47px] border-b border-[#BEBEBE] py-[32px] first:pt-0",
        "tablet:grid-cols-[1fr] tablet:gap-[10px]",
        "mobile:gap-[5px] mobile:py-[25px]",
      )}>
      <h4
        className={cn(
          "flex gap-[0.3em] text-[26px]/[1.3] font-bold text-[#000047]",
          "tablet:text-xl",
          "mobile:text-lg",
        )}>
        <span>{num}.</span>
        {title}
      </h4>
      <div>{children}</div>
    </li>
  );
}
