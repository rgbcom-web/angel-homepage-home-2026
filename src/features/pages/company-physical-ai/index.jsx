import { ChevronRight } from "lucide-react";
import Image from "next/image";

import { ArrowButton } from "@/features/global-ui";
import { Br, Container } from "@/features/layout";
import { cn, langContent } from "@/shared/lib/utils";

const ASSET_PATH = "/images/company/physical-ai-platform";

const platformContent = {
  ko: {
    breadcrumb: ["회사소개", "Physical AI Platform"],
    heroTitle: "기술을 넘어, 로봇의 완성으로",
    heroDescription: (
      <>
        엔젤로보틱스가 웨어러블 로봇에서 축적한 구동 · 제어 기술을,
        <br className="mobile:hidden" /> 누구나 Physical AI 로봇을 만들 수 있는 제품으로 담았습니다.
      </>
    ),
    heroSubDescription: (
      <>
        <strong className="text-white">
          phact 액추에이터와 phorce 제어 엔진, phai-x1 웨어러블 연구 플랫폼으로
        </strong>
        <br className="mobile:hidden" /> 원하는 로봇을 완성하세요.
      </>
    ),
    products: [
      {
        number: "01",
        name: "phact",
        image: `${ASSET_PATH}/phact.png`,
        imageAlt: "phact 액추에이터",
        description: (
          <>
            <strong>phact(physics-ready actuator)</strong>는 로봇의 관절 힘을 만드는 동시에 읽는
            액추에이터입니다. 마치 이어폰의 액티브 노이즈 캔슬링처럼 마찰력을 실시간으로 능동
            상쇄하는 <strong>AFC(Active Friction Canceling)</strong> 기능이 내장되어 있으며, ‘물리
            법칙을 직접 설정’할 수 있습니다.
          </>
        ),
      },
      {
        number: "02",
        name: "phorce",
        image: `${ASSET_PATH}/phorce.png`,
        imageAlt: "phorce 로봇 코어 플랫폼",
        reverse: true,
        description: (
          <>
            <strong>phorce(physics-ready onboard robot control engine)</strong>는 마치 누구나 쉽게
            3D 게임을 만들 수 있게 해준 ‘게임 엔진’처럼, Physical AI 로봇 개발의 진입 장벽을 허무는{" "}
            <strong>‘로봇 하드웨어 엔진’</strong>입니다. phact 구동모듈로 원하는 로봇을 쌓아 올리고
            PCM과 NPU로 로봇의 지능을 완성하세요.
          </>
        ),
      },
    ],
    wearable: {
      number: "01",
      name: "phai-x1",
      image: `${ASSET_PATH}/phai-x1.jpg`,
      imageAlt: "phai-x1 웨어러블 로봇 플랫폼",
      description: (
        <>
          <strong>phai-x1</strong>은 임상 검증을 마친 Medical-grade 웨어러블 로봇을 기반으로 한{" "}
          <strong>Physical AI 연구개발 전용 플랫폼</strong>입니다. 연구자, 의료 전문가, 학생 등
          누구든 신뢰할 수 있는 하드웨어 위에서 자신만의 제어 알고리즘을 자유롭게 개발하고 실험할 수
          있도록 설계되었습니다.
        </>
      ),
    },
    bannerTitle: (
      <>
        로봇 기술과 AI를 연결해 <Br mobile />
        Physical AI 구현을 <Br pc tablet />
        지원하는 통합 플랫폼, <Br mobile />
        <span className="text-white">onephai</span>
      </>
    ),
    bannerButton: "onephai 홈페이지",
  },
  en: {
    breadcrumb: ["About Us", "Physical AI Platform"],
    heroTitle: "Beyond technology, complete your robot",
    heroDescription: (
      <>
        Angel Robotics has transformed the actuation and control expertise built through wearable
        robotics
        <br className="tablet:hidden" /> into products that empower anyone to build a Physical AI
        robot.
      </>
    ),
    heroSubDescription: (
      <>
        Complete the robot you envision with the <strong>phact</strong> actuator,
        <strong> phorce</strong> control engine,
        <br className="tablet:hidden" /> and <strong>phai-x1</strong> wearable research platform.
      </>
    ),
    products: [
      {
        number: "01",
        name: "phact",
        image: `${ASSET_PATH}/phact.png`,
        imageAlt: "phact actuator",
        description: (
          <>
            <strong>phact (physics-ready actuator)</strong> is an actuator that both generates and
            reads a robot’s joint force. Like active noise cancellation in earphones, its built-in
            <strong> AFC (Active Friction Canceling)</strong> actively cancels friction in real
            time, allowing you to “set the laws of physics directly.”
          </>
        ),
      },
      {
        number: "02",
        name: "phorce",
        image: `${ASSET_PATH}/phorce.png`,
        imageAlt: "phorce robot core platform",
        reverse: true,
        description: (
          <>
            <strong>phorce (physics-ready onboard robot control engine)</strong> is a “robot
            hardware engine” that lowers the barriers to Physical AI robot development—just as game
            engines made 3D game creation accessible. Stack the robot you want with phact drive
            modules, then complete its intelligence with a PCM and NPU.
          </>
        ),
      },
    ],
    wearable: {
      number: "01",
      name: "phai-x1",
      image: `${ASSET_PATH}/phai-x1.jpg`,
      imageAlt: "phai-x1 wearable robot platform",
      description: (
        <>
          <strong>phai-x1</strong> is a <strong>Physical AI research platform</strong> built on a
          clinically validated, medical-grade wearable robot. It enables researchers, medical
          professionals, and students to freely develop and test their own control algorithms on
          reliable hardware.
        </>
      ),
    },
    bannerTitle: (
      <>
        <span className="text-white">onephai</span>, an integrated platform connecting{" "}
        <Br pc tablet />
        robotics and AI to bring Physical AI to life
      </>
    ),
    bannerButton: "Visit onephai",
  },
};

function Breadcrumb({ items }) {
  return (
    <div className="flex items-center justify-center gap-2 text-base font-bold text-white tablet:text-sm mobile:text-xs">
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={item}>
          {item}
          {index < items.length - 1 && <ChevronRight className="h-[1em] w-[1em]" />}
        </span>
      ))}
    </div>
  );
}

function ProductRow({ product }) {
  return (
    <article
      className={cn(
        "grid items-center gap-[62px]",
        product.reverse ? "grid-cols-[612px_560px]" : "grid-cols-[560px_612px]",
        "tablet:grid-cols-2 tablet:gap-10",
        "mobile:grid-cols-1 mobile:gap-7",
      )}>
      <div
        className={cn(
          "relative h-[400px] w-[560px] overflow-hidden rounded-[13px] bg-[#202126]",
          product.reverse && "order-2",
          "tablet:h-auto tablet:w-full tablet:aspect-[7/5]",
          "mobile:order-1",
        )}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div
        className={cn(
          "h-full border-t border-[#707070] pt-[80px]",
          product.reverse && "order-1",
          "tablet:pt-12",
          "mobile:order-2 mobile:h-auto mobile:pt-8",
        )}>
        <p className="text-[20px] font-semibold text-[#427DFF] mobile:text-base">
          {product.number}
        </p>
        <h3 className="mt-[16px] text-[36px] font-bold tracking-[-0.03em] mobile:mt-3 mobile:text-3xl">
          {product.name}
        </h3>
        <p className="mt-5 text-[20px]/[1.75] font-light text-[#BFBFBF] tablet:text-lg/[1.7] mobile:mt-4 mobile:text-base/[1.7] [&_strong]:text-[#427DFF]">
          {product.description}
        </p>
      </div>
    </article>
  );
}

function PlatformSection({ title, children }) {
  return (
    <section>
      <h2 className="text-center text-[50px]/[1.2] font-bold tablet:text-[42px] mobile:text-[28px]/[1.3]">
        {title}
      </h2>
      <div className="mt-[120px] space-y-[120px] tablet:mt-16 tablet:space-y-24 mobile:mt-10 mobile:space-y-20">
        {children}
      </div>
    </section>
  );
}

export function PhysicalAIPlatform({ lang }) {
  const content = langContent(lang, platformContent);

  return (
    <div className="overflow-hidden bg-[#171717] text-white">
      <section className="relative h-screen min-h-[760px] w-full overflow-hidden mobile:h-auto mobile:min-h-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${ASSET_PATH}/hero-poster.jpg`}>
          <source src={`${ASSET_PATH}/hero.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.14)_40%,rgba(0,0,0,0.82)_100%)] mobile:bg-[linear-gradient(to_top,#171717,rgb(0,0,0,0)_50%)]" />

        <Container className="relative z-10 flex h-full flex-col justify-end pb-[5vh] pt-[140px] tablet:pb-12 mobile:h-auto mobile:pb-[50px] mobile:pt-[330px]">
          <div className="mx-auto w-full max-w-[1280px] text-center">
            <Breadcrumb items={content.breadcrumb} />
            <p className="mt-12 text-[30px] font-bold tracking-[-0.02em] opacity-[0.47] tablet:mt-8 tablet:text-2xl mobile:mt-10 mobile:text-xl/[1.3]">
              Physical AI Platform
            </p>
            <h1 className="mt-5 text-[64px]/[1.16] font-bold tracking-[-0.04em] labtop:text-[56px] tablet:text-[48px] mobile:mt-4 mobile:text-3xl/[1.3]">
              {content.heroTitle}
            </h1>
            <div className="mt-14 grid grid-rows-2 gap-9 text-[23px]/[1.75] text-[#8F8F8F] tablet:gap-8 tablet:text-lg/[1.7] mobile:mt-4 mobile:grid-cols-1 mobile:gap-5 mobile:text-base/[1.7]">
              <p>{content.heroDescription}</p>
              <p>{content.heroSubDescription}</p>
            </div>
          </div>
        </Container>
      </section>

      <div className="py-[150px] tablet:py-[120px] mobile:py-[90px]">
        <Container width="narrow" className="w-[1234px]">
          <PlatformSection
            title={
              <>
                <span className="text-[#427DFF]">TECHNOLOGY</span> PLATFORM
              </>
            }>
            {content.products.map((product) => (
              <ProductRow key={product.name} product={product} />
            ))}
          </PlatformSection>

          <div className="pb-[120px] pt-[240px] tablet:pb-20 tablet:pt-[120px] mobile:pb-10 mobile:pt-[100px]">
            <PlatformSection
              title={
                <>
                  <span className="text-[#427DFF]">WEARABLE ROBOT</span> PLATFORM
                </>
              }>
              <ProductRow product={content.wearable} />
            </PlatformSection>
          </div>
        </Container>
      </div>

      <section className="relative min-h-[320px] overflow-hidden">
        <Image
          src={`${ASSET_PATH}/onephai-banner.png`}
          alt="onephai robot core platform"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Container
          width="narrow"
          className="relative z-10 flex min-h-[320px] items-center justify-between gap-12 tablet:flex-col tablet:items-start tablet:justify-center tablet:gap-8 tablet:py-16 mobile:min-h-[360px] mobile:py-14">
          <h2 className="text-4xl/[1.45] font-semibold tracking-[-0.025em] text-[#BFBFBF] tablet:text-3xl mobile:text-[22px]/[1.45]">
            {content.bannerTitle}
          </h2>
          <ArrowButton
            href="https://onephai.com"
            keepLang={false}
            target="_blank"
            rel="noopener noreferrer"
            bgColor="white"
            hoverTextColor="white"
            dimmerColor="blue"
            size="lg"
            className="shrink-0 text-black">
            {content.bannerButton}
          </ArrowButton>
        </Container>
      </section>
    </div>
  );
}
