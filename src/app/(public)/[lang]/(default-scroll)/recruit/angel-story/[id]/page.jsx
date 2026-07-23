import { SubpageWrapper } from "@/features/layout";
import { AngelStoryView, getItemById } from "@/features/board/recruit-angel-story";

export default async function Page({ params, searchParams }) {
  const { lang, id } = await params;
  const queryString = await searchParams;
  const tableName = `recruit_angel_story_${lang}`;

  const { data, prevData, nextData } = await getItemById(tableName, id, queryString);

  return (
    <SubpageWrapper>
      <AngelStoryView data={data} prevData={prevData} nextData={nextData} />
    </SubpageWrapper>
  );
}
