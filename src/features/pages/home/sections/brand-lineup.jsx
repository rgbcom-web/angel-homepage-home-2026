"use client";

import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { DDLink as Link } from "@/shared/components/link";
import { motion, useTransform, useScroll } from "framer-motion";
import { Container } from "@/features/layout/container";
import { ArrowRight } from "@/shared/svgs";
import Image from "next/image";

export function BrandLineup() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.4], ["100%", "0%"]);

  const cardY = [
    useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100]),
    useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-100, 0, 0, 100]),
    useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100]),
    useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-100, 0, 0, 100]),
  ];

  return (
    <div ref={containerRef} className={cn("relative h-[200vh]", "tablet:h-auto")}>
      <motion.section
        style={{ y: sectionY }}
        className={cn(
          "sticky top-0 flex min-h-screen flex-col justify-center pb-[120px] pt-[210px]",
          "tablet:relative tablet:min-h-0 tablet:justify-start tablet:pb-28 tablet:pt-10",
          "tablet:!translate-y-0",
        )}>
        <Container className={cn("mb-[70px] overflow-hidden", "labtop:mb-10", "mobile:mb-6")}>
          <motion.h2
            style={{ y: titleY }}
            className={cn(
              "text-center text-[70px] font-bold leading-[1.1]",
              "labtop:text-5xl",
              "mobile:!translate-y-0 mobile:text-3xl",
            )}>
            Brand Line-up
          </motion.h2>
        </Container>
        <Container className={cn("tablet:w-[1000px] tablet:max-w-[calc(100%-100px)]")}>
          <ul
            className={cn(
              "grid grid-cols-4 gap-[23px]",
              "labtop:px-20",
              "tablet:grid-cols-4 tablet:px-0",
              "mobile:grid-cols-1",
            )}>
            <LineupCard
              cardY={cardY[0]}
              logo="/images/home/lineup-logo-medi.svg"
              title="MEDI"
              bg="/images/home/lineup-thumb-medi-1.jpg"
              bgMobile="/images/home/lineup-thumb-medi-1-mo.jpg"
              thumb="/images/home/lineup-thumb-medi-2.png"
              href="/products/angel-medi/brand"
              bgColor="bg-dd-blue"
              arrowColor="text-dd-blue"
            />
            <LineupCard
              cardY={cardY[1]}
              logo="/images/home/lineup-logo-suit.svg"
              title="SUIT"
              bg="/images/home/lineup-thumb-suit-1.jpg"
              bgMobile="/images/home/lineup-thumb-suit-1-mo.jpg"
              thumb="/images/home/lineup-thumb-suit-2.png"
              href="/products/angel-suit/brand"
              bgColor="bg-dd-mint"
              arrowColor="text-dd-mint"
            />
            <LineupCard
              cardY={cardY[2]}
              logo="/images/home/lineup-logo-gear.svg"
              title="GEAR"
              bg="/images/home/lineup-thumb-gear-1.jpg"
              bgMobile="/images/home/lineup-thumb-gear-1-mo.jpg"
              thumb="/images/home/lineup-thumb-gear-2.png"
              href="/products/angel-gear/brand"
              bgColor="bg-dd-orange"
              arrowColor="text-dd-orange"
            />
            <LineupCard
              cardY={cardY[3]}
              logo="/images/home/lineup-logo-kit.svg"
              title="KIT"
              bg="/images/home/lineup-thumb-kit-1.jpg"
              bgMobile="/images/home/lineup-thumb-kit-1-mo.jpg"
              thumb="/images/home/lineup-thumb-kit-2.png"
              href="/products/angel-kit/brand"
              bgColor="bg-dd-gray-light"
              arrowColor="text-dd-gray-light"
            />
          </ul>
        </Container>
      </motion.section>
    </div>
  );
}

function LineupCard({ cardY, logo, title, bg, bgMobile, thumb, href, bgColor, arrowColor }) {
  return (
    <motion.li style={{ y: cardY }} className={cn("group", "mobile:!translate-x-0")}>
      <Link
        href={href}
        className={cn(
          "relative block overflow-hidden rounded-[10px] transition-transform ease-timing-pop",
          "duration-300 group-hover:translate-y-[-30px]",
          "mobile:!translate-y-0",
          bgColor,
        )}>
        <Image
          src={bg}
          alt=""
          className={cn(
            "relative left-0 top-0 z-[0] w-full transition-opacity duration-300 ease-timing-pop",
            "group-hover:opacity-0",
            "tablet:!opacity-100",
            "mobile:hidden",
          )}
          width={333}
          height={470}
        />
        <Image
          src={bgMobile}
          alt=""
          className={cn("relative left-0 top-0 z-[0] w-full", "hidden w-full mobile:block")}
          width={644}
          height={413}
        />
        <Image
          src={thumb}
          alt={`${title}`}
          className={cn(
            "absolute left-0 top-0 z-[3] h-full w-full translate-y-[-30px] opacity-0 transition-all duration-300 ease-timing-pop",
            "group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300",
            "tablet:hidden",
          )}
          width={333}
          height={470}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 flex w-full items-center justify-between px-6 py-4",
            "mobile:bottom-0 mobile:h-full mobile:flex-col mobile:items-start",
            "mobile:p-6",
          )}>
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "transition-left duration-300 ease-timing-pop",
              "group-hover:left-[30px] group-hover:translate-x-0",
              "tablet:!left-1/2 tablet:!-translate-x-1/2 tablet:!-translate-y-1/2",
              "mobile:static mobile:!translate-x-0 mobile:!translate-y-0",
            )}>
            <img
              src={logo}
              alt={`${title}`}
              className={cn("mx-auto mb-[0.5em] transition-transform duration-300")}
            />
          </div>
          <span
            className={cn(
              "ml-auto scale-50 opacity-0 transition-[opacity,transform] duration-300 ease-timing-pop",
              "group-hover:scale-100 group-hover:opacity-100",
              "flex aspect-square w-[50px] items-center justify-center rounded-full bg-white/100",
              "tablet:!opacity-0",
              "mobile:ml-0 mobile:!scale-100 mobile:!opacity-100",
            )}>
            <ArrowRight className={cn("size-5", arrowColor, "mobile:!text-dd-gray")} />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
