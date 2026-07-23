"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect, createContext, use } from "react";
import { ListEmpty } from "@/features/board/ui";
import CKContent from "@/shared/components/ck-editor/ck-content";

const FaqContext = createContext();

function FaqProvider({ children, list }) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(list.length / pageSize);
  const isEnd = currentPage >= totalPage;

  const [faqList, setFaqList] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    setFaqList(list.slice(0, pageSize));
    setCurrentPage(1);
    setOpenId(null);
  }, [list]);

  const handleLoadMore = () => {
    if (isEnd) return;

    const nextPage = currentPage + 1;

    setFaqList((prevFaqList) => [
      ...prevFaqList,
      ...list.slice(currentPage * pageSize, nextPage * pageSize),
    ]);

    setCurrentPage(nextPage);
  };

  return (
    <FaqContext
      value={{
        faqList,
        setFaqList,
        openId,
        setOpenId,
        currentPage,
        setCurrentPage,
        handleLoadMore,
        isEnd,
        totalPage,
      }}>
      {children}
    </FaqContext>
  );
}

function useFaq() {
  return use(FaqContext);
}

export function FaqList({ list }) {
  return (
    <FaqProvider list={list}>
      <List />
    </FaqProvider>
  );
}

function List() {
  const { faqList } = useFaq();

  return (
    <FaqListRoot>
      {faqList?.map((item) => (
        <li key={item.id}>
          <FaqItem item={item} />
        </li>
      ))}
      {faqList.length === 0 && <ListEmpty />}
      {faqList.length > 0 && (
        <li>
          <LoadButton />
        </li>
      )}
    </FaqListRoot>
  );
}

export function FaqListRoot({ children }) {
  return (
    <ul className={cn("divide-y divide-dd-gray-light/50 border-b border-t border-black")}>
      {children}
    </ul>
  );
}

const itemClassNames = {
  container: "",
  grid: cn(
    "grid grid-cols-[85px_1fr_55px] w-full items-center gap-5",
    "tablet:grid-cols-[40px_1fr_40px] tablet:gap-2",
    "mobile:grid-cols-1",
  ),
  question: cn(
    "py-6 text-xl font-semibold bg-white",
    "tablet:py-4 tablet:text-base",
    "mobile:py-4 mobile:text-base",
  ),
  answer: cn("pt-8 pb-10 bg-dd-gray-lighter text-lg", "tablet:pt-6 tablet:pb-8 tablet:text-base"),
};

const categoryThemes = {
  MEDI: "text-dd-blue",
  SUIT: "text-dd-mint",
  GEAR: "text-dd-orange",
  KIT: "text-dd-gray-light",
};

export function FaqItem({ item }) {
  const { openId, setOpenId } = useFaq();
  const isOpen = openId === item.id;

  const handleClick = () => {
    setOpenId(isOpen ? null : item.id);
  };

  return (
    <div className={cn(itemClassNames.container)}>
      <button className={cn(itemClassNames.grid, itemClassNames.question)} onClick={handleClick}>
        <span className={cn("text-center text-dd-gray", "mobile:hidden")}>Q</span>
        <div className={cn("flex w-3/4 items-start gap-4 text-left", "mobile:w-full")}>
          {item.category_1_name && (
            <span className={cn("uppercase", categoryThemes[item.category_1_name])}>
              {item.category_1_name}
            </span>
          )}
          {item.category_2_name && (
            <span className={cn("text-dd-gray")}>{item.category_2_name}</span>
          )}
          <span className={cn("text-black", !isOpen && "line-clamp-1")}>{item.question}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className={cn("mobile:hidden")}>
          <line x2="18" transform="translate(0 9)" fill="none" stroke="#000" strokeWidth="2" />
          <line
            className={cn(isOpen && "hidden")}
            x2="18"
            transform="translate(9) rotate(90)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={cn(itemClassNames.grid, itemClassNames.answer)}>
          <div
            className={cn(
              "col-span-2 col-start-2 break-all pr-8",
              "tablet:pr-6",
              "mobile:col-span-1 mobile:col-start-1 mobile:!px-4",
            )}>
            <CKContent content={item.answer} />
          </div>
        </div>
      )}
    </div>
  );
}

function LoadButton() {
  const { langContent } = useLang();
  const { handleLoadMore, currentPage, totalPage } = useFaq();

  const handleClick = () => {
    handleLoadMore();
  };

  if (totalPage === 1) return null;

  return (
    <button
      className={cn(
        "flex w-full items-center justify-center gap-4 bg-white py-5 text-center text-xl font-medium text-dd-gray hover:text-dd-blue",
        "tablet:gap-3 tablet:py-4 tablet:text-base",
        "mobile:py-3 mobile:text-sm",
        currentPage === totalPage && "pointer-events-none opacity-50",
      )}
      onClick={handleClick}>
      <span>
        {langContent({
          ko: "질문 더보기",
          en: "View more",
        })}{" "}
        ({currentPage}/{totalPage})
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13.414"
        height="8.121"
        viewBox="0 0 13.414 8.121">
        <path
          d="M1554.049,547.218l6,6,6-6"
          transform="translate(-1553.342 -546.511)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
