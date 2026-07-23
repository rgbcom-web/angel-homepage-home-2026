import { cn } from "@/shared/lib/utils";

export function PolicyDocument({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "space-y-8 break-normal text-base/[1.8] text-[#707070]",
        "tablet:text-base/[1.8]",
        "mobile:text-sm",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

export function PolicyDl({ children, className, ...props }) {
  return (
    <dl className={cn("", className)} {...props}>
      {children}
    </dl>
  );
}

export function PolicyDt({ children, className, ...props }) {
  return (
    <dt className={cn("mb-1.5 font-bold", className)} {...props}>
      {children}
    </dt>
  );
}

export function PolicyDd({ children, className, ...props }) {
  return (
    <dd className={cn("", className)} {...props}>
      {children}
    </dd>
  );
}

export function PolicyCircleOrderList({ items, className, ...props }) {
  const circleNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

  return (
    <ol className={cn("my-1 space-y-1", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className={cn("flex gap-[0.5em] leading-[1.5]")}>
          <span>{circleNumbers[index]}</span>
          <div>{item}</div>
        </li>
      ))}
    </ol>
  );
}

export function PolicyOrderList({ items, className, ...props }) {
  return (
    <ol className={cn("my-1 space-y-1", className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className={cn("flex gap-[0.5em] leading-[1.5]")}>
          <span className={cn("")}>{index + 1}.</span>
          <div>{item}</div>
        </li>
      ))}
    </ol>
  );
}

export function PolicyUnorderedList({ items, className, ...props }) {
  return (
    <ul className={cn("my-1 space-y-1", className)} {...props}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(
            "relative pl-[1em] leading-[1.5]",
            "before:absolute before:left-0 before:top-[0.75em] before:h-[0.3em] before:w-[0.3em] before:-translate-y-1/2 before:rounded-full before:bg-dd-gray-darker",
          )}>
          {item}
        </li>
      ))}
    </ul>
  );
}
