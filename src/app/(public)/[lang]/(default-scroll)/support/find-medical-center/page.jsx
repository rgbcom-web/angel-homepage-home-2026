import { cn } from "@/shared/lib/utils";
import { SubpageWrapper, SubpageHead, SubpageBody, Container, Br } from "@/features/layout";
import {
  FindMedicalCenterProvider,
  FindMedicalCenterFilter,
  FindMedicalCenterList,
  FindMedicalCenterMap,
  getList,
  getProducts,
} from "@/features/board/find-medical-center";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "병원 찾기",
    },
    en: {
      title: "Find a Medical Center",
    },
  };

  return metadata[lang];
}

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `medical_center_${lang}`,
    categoriesTableName: `medical_center_products`,
  };

  const { products } = await getProducts(configs.categoriesTableName);
  const { data, count } = await getList(configs.tableName, queryString);

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={["고객지원", "병원 찾기"]}
          title="도입 병원 찾기"
          description={
            <>
              엔젤로보틱스의 웨어러블 로봇을 만나볼 수 있는 <Br mobile />
              병&middot;의원을 찾아보세요
            </>
          }
        />
      </Container>
      <Container width="narrow">
        <SubpageBody>
          <FindMedicalCenterProvider list={data}>
            <div className={cn("space-y-20", "tablet:space-y-10")}>
              <FindMedicalCenterFilter products={products} />
              <div
                className={cn(
                  "flex h-[665px] items-start gap-5",
                  "tablet:h-auto tablet:flex-col-reverse",
                )}>
                <div className={cn("h-full w-full", "tablet:h-[450px]")}>
                  <FindMedicalCenterList list={data} />
                </div>
                <div className={cn("h-full w-full", "tablet:h-[250px]")}>
                  <FindMedicalCenterMap />
                </div>
              </div>
            </div>
          </FindMedicalCenterProvider>
        </SubpageBody>
      </Container>
    </SubpageWrapper>
  );
}
