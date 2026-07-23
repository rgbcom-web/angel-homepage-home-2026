import { SurveysPage } from "@/features/pediatric-portal/surveys/surveys-page";
import { fetchSurveys } from "@/features/pediatric-portal/surveys/surveys-api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "설문",
};

export default async function PediatricSurveysPage() {
  const { surveys, source, error } = await fetchSurveys();
  return <SurveysPage surveys={surveys} source={source} fetchError={error} />;
}
