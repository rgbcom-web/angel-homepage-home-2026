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
          <div className={cn("pt-[40px]", "tablet:pt-8", "mobile:pt-6")}>
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
