import { langContent } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils";
import {
  SubpageWrapper,
  SubpageHead,
  SubpageBody,
  Container,
  Anchor,
  Br,
  LinkBanner,
} from "@/features/layout";
import { ListHeader, ListCategories, SearchBar } from "@/features/board/ui";
import { FaqList, getList, getCategories } from "@/features/board/faq";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "FAQs",
    },
    en: {
      title: "FAQs",
    },
  };

  return metadata[lang];
}

const categoryThemes = {
  MEDI: "blue",
  SUIT: "mint",
  GEAR: "orange",
  KIT: "gray-light",
};

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `faq_${lang}`,
    categoriesTableName: `faq_category`,
  };

  const { categoryData } = await getCategories(configs.categoriesTableName);
  const { data, count } = await getList(configs.tableName, queryString);

  const list = data.map((item) => ({
    ...item,
    category_1_name: categoryData.depth1.find((category) => category.id === item.category_1)?.[
      `name_${lang}`
    ],
    category_2_name: categoryData.depth2.find((category) => category.id === item.category_2)?.[
      `name_${lang}`
    ],
  }));

  const categories = categoryData.depth1.map((category) => ({
    value: category.id,
    label: category[`name_${lang}`],
    theme: categoryThemes[category.name_ko],
  }));

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={langContent(lang, {
            ko: ["고객지원", "FAQs"],
            en: ["Customer Support", "FAQs"],
          })}
          title={langContent(lang, {
            ko: "자주 묻는 질문",
            en: "Frequently Asked Questions",
          })}>
          <div className={cn("pt-[40px]", "tablet:pt-8", "mobile:pt-6")}>
            <LinkBanner
              backgroundImage="/images/support/faq-link-banner-bg.jpg"
              description={langContent(lang, {
                ko: (
                  <>
                    자주 묻는 질문을 확인해보시고, <Br pc tablet />더 궁금한 점은 온라인 문의를 통해
                    문의해 주세요.
                  </>
                ),
                en: (
                  <>
                    Please check the Frequently Asked Questions (FAQ), <Br pc tablet />
                    and if you have any further inquiries, feel free to contact us
                  </>
                ),
              })}
              link="./contact"
              linkText={langContent(lang, {
                ko: "온라인 문의",
                en: "Contact Us",
              })}
            />
          </div>
        </SubpageHead>
      </Container>
      <Container width="narrow">
        <SubpageBody>
          <Anchor id="listHead" />
          <ListHeader className={cn("mobile:gap-y-6")}>
            <ListCategories paramKey="category" items={categories} useAll />
            <SearchBar className={{ input: "w-[280px]" }} />
          </ListHeader>
          <FaqList list={list} />
        </SubpageBody>
      </Container>
    </SubpageWrapper>
  );
}
