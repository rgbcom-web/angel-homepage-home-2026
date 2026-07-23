import { cn } from "@/shared/lib/utils";
import { SubpageWrapper, SubpageHead, SubpageBody, Container, Section } from "@/features/layout";
import { RecruitImageHero } from "@/features/pages/recruit/sections";
import { Pagination } from "@/features/board/ui";
import { List, getList } from "@/features/board/recruit-notice";
import { ListHeader, ListCounterNotification } from "@/features/board/ui";
import { langContent } from "@/shared/lib/utils";

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `recruit_notice_${lang}`,
    itemsPerPage: 10,
    pagesPerBlock: 5,
  };

  const { data, count } = await getList(configs.tableName, queryString, configs.itemsPerPage);

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={["채용안내", "채용 중 공고"]}
          title={"채용 중 공고"}
          description="현재 채용중인 공고를 확인하고 지원하세요."
        />
      </Container>
      <SubpageBody>
        <RecruitImageHero
          src="/images/recruit/notice-image-hero.jpg"
          caption="* 위 이미지는 엔젤로보틱스 대전플래닛(선행연구소)에서 촬영되었습니다."
        />
        <Container width="narrow">
          <Section>
            <ListHeader className={cn("mobile:items-start mobile:text-left")}>
              <ListCounterNotification>
                {langContent(lang, {
                  ko: (
                    <>
                      총 <strong className={cn("font-semibold text-dd-blue")}>{count}</strong>건의
                      공고가 진행중입니다.
                    </>
                  ),
                })}
              </ListCounterNotification>
            </ListHeader>
            <List list={data} />
            <Pagination
              itemsPerPage={configs.itemsPerPage}
              pagesPerBlock={configs.pagesPerBlock}
              listCount={count}
            />
          </Section>
        </Container>
      </SubpageBody>
    </SubpageWrapper>
  );
}
