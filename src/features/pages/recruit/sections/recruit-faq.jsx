import { Anchor } from "@/features/global-ui";
import { SectionHead, SectionTitle } from "@/features/layout";
import { FaqList, getList } from "@/features/board/faq";

export async function RecruitFaq({ lang }) {
  const tableName = `recruit_faq_${lang}`;
  const { data, count } = await getList(tableName);

  return (
    <>
      <Anchor id="faq" />
      <SectionHead>
        <SectionTitle>FAQs</SectionTitle>
      </SectionHead>
      <FaqList list={data} />
    </>
  );
}
