import { cn } from "@/shared/lib/utils";

const themes = {
  blue: cn(
    "[&_tr]:border-b [&_tr]:border-[rgb(175,175,175,0.5)] [&_tr:last-child]:border-0",
    "[&_th]:text-dd-blue [&_th]:bg-black/5",
  ),
  mint: cn(
    "border-dd-mint",
    "[&_tr]:border-b [&_tr]:border-[rgb(175,175,175,0.5)] [&_tr:last-child]:border-0",
    "[&_th]:text-dd-mint [&_th]:bg-black/5",
  ),
};

export function SpecTableContainer({ children, className }) {
  return <div className={cn("mx-auto w-full max-w-[860px] space-y-3", className)}>{children}</div>;
}

export function SpecTable({ children, className, colgroup, theme = "blue", fixMobile = false }) {
  return (
    <table
      className={cn(
        "w-full table-fixed",
        "border-y border-dd-blue text-lg",
        "text-center",
        "[&_th]:px-[1.5em] [&_th]:py-[0.8em] [&_th]:text-left",
        "[&_td]:px-[1.5em] [&_td]:py-[0.8em]",
        "tablet:text-base",
        "tablet:[&_th]:px-[1em] tablet:[&_th]:py-[0.6em]",
        "tablet:[&_td]:px-[1em] tablet:[&_td]:py-[0.6em]",
        !fixMobile &&
          "mobile:block mobile:text-left mobile:[&_tbody]:block mobile:[&_td]:block mobile:[&_th]:block mobile:[&_tr]:block",
        !fixMobile &&
          "mobile:[&_td]:p-0 mobile:[&_th]:bg-transparent mobile:[&_th]:p-0 mobile:[&_tr]:space-y-1 mobile:[&_tr]:py-[0.8em]",
        themes[theme],
        className,
      )}>
      {colgroup ? (
        <colgroup>{colgroup}</colgroup>
      ) : (
        <colgroup>
          <col className={cn("w-[210px]", "tablet:w-[170px]")} />
        </colgroup>
      )}
      {children}
    </table>
  );
}

export function SpecTableHeader({ children, className, ...props }) {
  return (
    <thead className={cn(className)} {...props}>
      {children}
    </thead>
  );
}

export function SpecTableBody({ children, className, ...props }) {
  return (
    <tbody className={cn(className)} {...props}>
      {children}
    </tbody>
  );
}

export function SpecTableRow({ children, className, ...props }) {
  return (
    <tr className={cn(className)} {...props}>
      {children}
    </tr>
  );
}

export function SpecTableCell({ children, className, ...props }) {
  return (
    <td className={cn(className)} {...props}>
      {children}
    </td>
  );
}

export function SpecTableCellHeader({ children, className, ...props }) {
  return (
    <th className={cn(className)} {...props}>
      {children}
    </th>
  );
}

export function SpecTableNotice({ children, className, ...props }) {
  return (
    <p className={cn("text-right text-black/60", "mobile:text-sm", className)} {...props}>
      {children}
    </p>
  );
}
