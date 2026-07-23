import { cn } from "@/shared/lib/utils";

export default async function Page() {
  return (
    <div className={cn("bg-dd-gray-lighter px-10 py-16", "tablet:bg-transparent tablet:p-0")}>
      <iframe
        src="https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNM=%EC%97%94%EC%A0%A4%EB%A1%9C%EB%B3%B4%ED%8B%B1%EC%8A%A4"
        frameBorder="0"
        className={cn(
          "mx-auto h-[930px] w-[754px] rounded-3xl bg-white p-[20px]",
          "tablet:w-full tablet:px-0 tablet:py-4",
        )}
      />
    </div>
  );
}
