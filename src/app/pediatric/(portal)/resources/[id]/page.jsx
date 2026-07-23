import { ResourceDetailPage } from "@/features/pediatric-portal/resources/resource-detail-page";
import { fetchResourceById } from "@/features/pediatric-portal/resources/resources-api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { resource } = await fetchResourceById(id);
  return {
    title: resource?.title || "자료 열람",
  };
}

export default async function PediatricResourceDetailRoute({ params }) {
  const { id } = await params;
  const { resource } = await fetchResourceById(id, { bumpViews: true });
  return <ResourceDetailPage resource={resource} />;
}
