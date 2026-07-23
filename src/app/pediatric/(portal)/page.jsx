import { PortalHomeDashboard } from "@/features/pediatric-portal/home-dashboard";
import { fetchEvents } from "@/features/pediatric-portal/events/events-api";

export const dynamic = "force-dynamic";

export default async function PediatricHomePage() {
  const { events } = await fetchEvents();
  return <PortalHomeDashboard events={events} />;
}
