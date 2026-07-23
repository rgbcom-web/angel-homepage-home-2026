import {
  SubpageWrapper,
  SubpageHead,
  SubpageBody,
  Container,
  GraySection,
  Section,
} from "@/features/layout";
import {
  InquiryBanner,
  PurchaseProcess,
  ProductPurchaseLinks,
} from "@/features/pages/purchase-guid/sections";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "제품 구매 안내",
    },
    en: {
      title: "Product Purchase Guide",
    },
  };

  return metadata[lang];
}

export default async function Page() {
  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead breadcrumb={["고객지원", "구매 안내"]} title="제품 구매 안내" />
      </Container>
      <SubpageBody>
        <GraySection>
          <Container width="narrow">
            <InquiryBanner />
          </Container>
        </GraySection>
        <Container width="narrow">
          <Section>
            <PurchaseProcess />
          </Section>
          <hr />
          <Section>
            <ProductPurchaseLinks />
          </Section>
        </Container>
      </SubpageBody>
    </SubpageWrapper>
  );
}
