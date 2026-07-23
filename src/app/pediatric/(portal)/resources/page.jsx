import { ResourcesPage } from "@/features/pediatric-portal/resources/resources-page";
import { fetchResources } from "@/features/pediatric-portal/resources/resources-api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "자료실",
};

export default async function PediatricResourcesPage() {
  const { resources, source, error } = await fetchResources();
  return <ResourcesPage resources={resources} source={source} fetchError={error} />;
}
