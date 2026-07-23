import Image from "next/image";
import { Container } from "@/features/layout";
import { cn } from "@/shared/lib/utils";

export function RecruitImageHero({
  src,
  caption,
  className,
  width = 1920,
  height = 609,
  alt = "",
  ...props
}) {
  if (caption) {
    return (
      <figure className={className?.figure}>
        <ImageComp
          src={src}
          className={className?.img}
          width={width}
          height={height}
          alt={alt}
          {...props}
        />
        <figcaption
          className={cn(
            "mt-5 text-right",
            "tablet:mt-3 tablet:text-center",
            className?.figCaption,
          )}>
          <Container width="narrow" className={className?.container}>
            <span className={cn("block text-sm leading-[1.5] text-[#cdcdcd]", className?.text)}>
              {caption}
            </span>
          </Container>
        </figcaption>
      </figure>
    );
  }

  return (
    <ImageComp
      src={src}
      className={className?.img}
      width={width}
      height={height}
      alt={alt}
      {...props}
    />
  );
}

function ImageComp({ src, className, width, height, alt, ...props }) {
  return (
    <Image
      src={src}
      className={cn(
        "mx-auto w-full object-cover",
        "tablet:h-[425px]",
        "mobile:h-[220px]",
        className,
      )}
      width={width}
      height={height}
      alt={alt}
      {...props}
    />
  );
}
