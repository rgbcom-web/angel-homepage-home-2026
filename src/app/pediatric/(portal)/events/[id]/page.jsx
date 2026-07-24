import { EventDetailPage } from "@/features/pediatric-portal/events/event-detail-page";
import { fetchEventById } from "@/features/pediatric-portal/events/events-api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { event } = await fetchEventById(id);
  return { title: event?.title || "행사 상세" };
}

export default async function PediatricEventDetailRoute({ params }) {
  const { id } = await params;
  const { event } = await fetchEventById(id, { recordView: true });
  return <EventDetailPage event={event} />;
}
