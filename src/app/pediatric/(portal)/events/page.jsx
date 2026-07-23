import { EventsPage } from "@/features/pediatric-portal/events/events-page";
import { fetchEvents } from "@/features/pediatric-portal/events/events-api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "행사",
};

export default async function PediatricEventsPage() {
  const { events, source, error } = await fetchEvents();

  return <EventsPage events={events} source={source} fetchError={error} />;
}
