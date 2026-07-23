import { SurveyDetailPage } from "@/features/pediatric-portal/surveys/survey-detail-page";
import { fetchSurveyById } from "@/features/pediatric-portal/surveys/surveys-api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { survey } = await fetchSurveyById(id);
  return { title: survey?.title || "설문 상세" };
}

export default async function PediatricSurveyDetailRoute({ params }) {
  const { id } = await params;
  const { survey } = await fetchSurveyById(id);
  return <SurveyDetailPage survey={survey} />;
}
