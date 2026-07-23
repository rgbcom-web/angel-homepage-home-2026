import { SubpageWrapper } from "@/features/layout";
import { RecruitNoticeView } from "@/features/board/recruit-notice/view";
import { getItemById } from "@/features/board/ir-default";

export default async function Page({ params, searchParams }) {
  const { lang, id } = await params;
  const queryString = await searchParams;
  const tableName = `recruit_notice_${lang}`;

  const { data, prevData, nextData } = await getItemById(tableName, id, queryString);

  return (
    <SubpageWrapper>
      <RecruitNoticeView data={data} prevData={prevData} nextData={nextData} />
    </SubpageWrapper>
  );
}
