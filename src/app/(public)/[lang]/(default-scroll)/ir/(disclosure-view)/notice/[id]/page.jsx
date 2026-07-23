import { SubpageWrapper } from "@/features/layout";
import { BoardView } from "@/features/board/ui";
import { getItemById } from "@/features/board/ir-default";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "공시 및 공고사항",
    },
    en: {
      title: "Notice and Announcement",
    },
  };

  return metadata[lang];
}

export default async function Page({ params, searchParams }) {
  const { lang, id } = await params;
  const queryString = await searchParams;
  const tableName = `ir_notice_${lang}`;

  const { data, prevData, nextData } = await getItemById(tableName, id, queryString);

  return (
    <SubpageWrapper>
      <BoardView data={data} prevData={prevData} nextData={nextData} />
    </SubpageWrapper>
  );
}
