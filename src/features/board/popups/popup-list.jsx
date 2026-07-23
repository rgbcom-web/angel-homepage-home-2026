import { getPopupList } from "./get";
import { cn } from "@/shared/lib/utils";
import { PopupItem } from "./popup-item";

export async function PopupList({ tableName }) {
  const { data, error } = await getPopupList({ tableName });

  if (error || !data || data.length <= 0) {
    return null;
  }

  return (
    <div className={cn("absolute left-0 top-0 z-50 h-0 w-full")}>
      {data?.map((popup) => (
        <PopupItem key={`popup-${popup.id}`} data={popup} />
      ))}
    </div>
  );
}
