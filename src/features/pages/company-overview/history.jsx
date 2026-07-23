"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Section, SectionHead, SectionTitle, Container, Br } from "@/features/layout";
import { HistoryList } from "./history-list";

export function History() {
  const { langContent } = useLang();

  return (
    <Section className={cn("mt-[50px]", "tablet:mt-0")}>
      <Container width="narrow">
        <SectionHead className={cn("mb-[84px] space-y-6 text-center")}>
          <SectionTitle className={cn("text-5xl", "tablet:text-4xl", "mobile:text-2xl")}>
            {langContent({
              ko: (
                <>
                  엔젤로보틱스 <strong className={cn("text-dd-blue")}>연혁</strong>
                </>
              ),
              en: (
                <>
                  Milestones of <strong className={cn("text-dd-blue")}>Angel Robotics</strong>
                </>
              ),
            })}
          </SectionTitle>
        </SectionHead>
        <HistoryList list={langContent(historyList)} />
      </Container>
    </Section>
  );
}

const historyList = {
  ko: [
    {
      year: 2025,
      items: [
        {
          month: 11,
          contents: [<>차세대 세계일류상품 및 생산기업 선정</>],
        },
        {
          month: 9,
          contents: [<>하나금융그룹 '로봇·의료·금융 융합 서비스' 업무협약(MOU)체결</>],
        },
        {
          month: 7,
          contents: [<>엔젤렉스M20 태국, 베트남 의료기기 인증 획득</>],
        },
        {
          month: 6,
          contents: [<>엔젤슈트H10 출시</>],
        },
        {
          month: 3,
          contents: [
            <>서울 플래닛 본사 이전</>,
            <>엔젤슈트(Angel Suit), iF 디자인 어워드 2025 수상</>,
          ],
        },
        {
          month: 2,
          contents: [<>공경철 CTO, 올해의 KAIST인상 수상</>],
        },
      ],
    },
    {
      year: 2024,
      items: [
        {
          month: 12,
          contents: [<>2024 올해의 대한민국 로봇기업 수상(개인 서비스 로봇 부문)</>],
        },
        {
          month: 10,
          contents: [
            <>제3회 국제 사이보그 올림픽(Cybathlon) 전동형 외골격 종목 금메달 수상(2회 연속)</>,
          ],
        },
        {
          month: 7,
          contents: [
            <>조남민 신임대표 선임</>,
            <>
              엔젤렉스M20, '뇌성마비 아동의 웨어러블 로봇을 이용한 지상 보행 훈련' JAMA Network
              Open에 논문 게재
            </>,
            <>대전 플래닛 선행연구소 개소</>,
          ],
        },
        {
          month: 4,
          contents: [<>하남 플래닛 생산시설 개소</>],
        },
        {
          month: 3,
          contents: [<>코스닥 시장 상장</>],
        },
      ],
    },
    {
      year: 2023,
      items: [
        {
          month: 12,
          contents: [<>2023 올해의 대한민국 로봇기업 수상(개인 서비스 로봇 부문)</>],
        },
        {
          month: 9,
          contents: [<>LIG넥스원 웨어러블 로봇 실용화를 위한 MOU 체결</>],
        },
        {
          month: 8,
          contents: [<>Series C 100억 투자 유치</>],
        },
        {
          month: 2,
          contents: [<>연세대학교 재활학교와 보행 훈련 로봇공급 계약 및 업무 협약 체결</>],
        },
      ],
    },
    {
      year: 2022,
      items: [
        {
          month: 12,
          contents: [
            <>2022 올해의 대한민국 로봇기업 수상(개인 서비스 로봇 부문)</>,
            <>엔젤렉스M20 의료기기 3등급 품목허가</>,
            <>'ANGEL X' 美 FDA 등록</>,
          ],
        },
        {
          month: 10,
          contents: [<>'ANGEL X' 국방부 2022년 하반기 우수상용품 시범사용 대상 제품 선정</>],
        },
        {
          month: 8,
          contents: [
            <>근력 보조를 위한 웨어러블 슈트 'ANGEL X' 출시</>,
            <>ISO 9001:2015, ISO 13485:9001 인증(재활 치료용 로봇 및 부품의 설계, 개발 및 제조)</>,
          ],
        },
        {
          month: 5,
          contents: [
            <>
              말레이시아 의과대학 UiTM(Universiti Teknologi MARA)과 전략적 협약(MOA) 체결 및
              대한재활병원에 엔젤렉스M20 2기 보급
            </>,
          ],
        },
      ],
    },
    {
      year: 2021,
      items: [
        {
          month: 12,
          contents: [<>2021 올해의 대한민국 로봇 기업 수상(개인 서비스 로봇 부문)</>],
        },
        {
          month: 11,
          contents: [<>생산기지 설립 및 사업장 소재지 이전(성수동 아크밸리지식산업센터 14층)</>],
        },
        {
          month: 7,
          contents: [<>Series B 180억원 투자 유치</>],
        },
      ],
    },
    {
      year: 2020,
      items: [
        {
          month: 12,
          contents: [<>2020 올해의 대한민국 로봇 기업 수상(개인 서비스 로봇 부문)</>],
        },
        {
          month: 11,
          contents: [
            <>
              제2회 사이배슬론(Cybathlon, 국제 사이보그 올림픽) 웨어러블 로봇 종목 금메달, 동메달
              수상
            </>,
          ],
        },
        {
          month: 7,
          contents: [<>아기유니콘 기업 선정</>],
        },
        {
          month: 3,
          contents: [<>사업장 소재지 이전(성수동 아크밸리지식산업센터)</>],
        },
        {
          month: 1,
          contents: [<>Series A 97억원 투자 유치</>],
        },
      ],
    },
    {
      year: 2019,
      items: [
        {
          month: 12,
          contents: [<>2019 올해의 대한민국 로봇 기업 수상(개인 서비스 로봇 부문)</>],
        },
        {
          month: 9,
          contents: [<>의료기기 제조 및 품질 관리 기준 적합인정(GMP) 획득</>],
        },
      ],
    },
    {
      year: 2018,
      items: [
        {
          month: 12,
          contents: [<>2018 올해의 대한민국 로봇기업 수상(전문 서비스 로봇 부문)</>],
        },
        {
          month: 8,
          contents: [<>㈜엔젤로보틱스 사명 변경</>],
        },
        {
          month: 2,
          contents: [<>워크온슈트 – 2018 평창 패럴림픽 성화 봉송</>],
        },
      ],
    },
    {
      year: 2017,
      items: [
        {
          month: 5,
          contents: [<>LG전자 Seed 투자</>],
        },
        {
          month: 2,
          contents: [<>주식회사 SG로보틱스 설립</>],
        },
      ],
    },
  ],
  en: [
    {
      year: 2025,
      items: [
        {
          month: "Nov",
          contents: [
            <>
              Selected as a "Next-Generation <Br mobile />
              World-Class Product & Manufacturer"
            </>,
          ],
        },
        {
          month: "Sep",
          contents: [
            <>
              Signed an MOU with Hana Financial Group for robot–medical–financial convergence
              services
            </>,
          ],
        },
        {
          month: "Jul",
          contents: [
            <>
              Angel Legs M20 obtained medical device certifications in Thailand <Br mobile />
              and Vietnam
            </>,
          ],
        },
        {
          month: "Jun",
          contents: [<>Launched the Angel Suit H10</>],
        },
        {
          month: "Mar",
          contents: [
            <>Planet Seoul (HQ) relocation</>,
            <>
              Angel Suit honored with the <Br mobile />
              "iF Design Award 2025"
            </>,
          ],
        },
        ,
        {
          month: "Feb",
          contents: [
            <>
              CTO Kyungchul Kong awarded <Br mobile />
              "KAIST Person of the Year"
            </>,
          ],
        },
      ],
    },
    {
      year: 2024,
      items: [
        {
          month: "Dec",
          contents: [
            <>Awarded "Korea Robot Company of the Year 2024" (Personal Service Robot Category)</>,
          ],
        },
        {
          month: "Oct",
          contents: [
            <>
              Won gold medal in powered exoskeleton race at the 3rd Cybathlon (International Cyborg
              Olympics) - 2nd consecutive win
            </>,
          ],
        },
        {
          month: "Jul",
          contents: [
            <>Appointed Nam-min Cho as new CEO</>,
            <>
              Published research paper on "Ground Walking Training Using Wearable Robot for Children
              with Cerebral Palsy" in JAMA Network Open featuring ANGEL LEGS M20
            </>,
            <>Opened Planet Daejeon R&D Center</>,
          ],
        },
        {
          month: "Apr",
          contents: [<>Opened Planet Hanam manufacturing facility</>],
        },
        {
          month: "Mar",
          contents: [<>Listed on the KOSDAQ stock market</>],
        },
      ],
    },
    {
      year: 2023,
      items: [
        {
          month: "Dec",
          contents: [
            <>Awarded "Korea Robot Company of the Year 2023" (Personal Service Robot Category)</>,
          ],
        },
        {
          month: "Sep",
          contents: [<>Signed MOU with LIG Nex1 for practical use of wearable robots</>],
        },
        {
          month: "Aug",
          contents: [<>Raised Series C funding of KRW 10 billion</>],
        },
        {
          month: "Feb",
          contents: [
            <>
              Signed supply and business agreement with Yonsei University Rehabilitation Hospital
              for gait training robots
            </>,
          ],
        },
      ],
    },
    {
      year: 2022,
      items: [
        {
          month: "Dec",
          contents: [
            <>Awarded "Korea Robot Company of the Year 2022" (Personal Service Robot Category)</>,
            <>ANGEL LEGS M20 received Grade 3 medical device certification in Korea</>,
            <>ANGEL X registered with the U.S. FDA</>,
          ],
        },
        {
          month: "Oct",
          contents: [
            <>
              ANGEL X selected by the Ministry of National Defense for pilot use as an excellent
              commercial product
            </>,
          ],
        },
        {
          month: "Aug",
          contents: [
            <>Launched ANGEL X, Wearable Suit for Musculoskeletal Protection</>,
            <>
              Certified with ISO 9001:2015 and ISO 13485:9001 (Design, development, and
              manufacturing of rehabilitation robots and components)
            </>,
          ],
        },
        {
          month: "May",
          contents: [
            <>
              Signed strategic MOA with UiTM (Universiti Teknologi MARA, Malaysia) and supplied 2
              batches of ANGEL LEGS M20 to Daehan Rehabilitation Hospital
            </>,
          ],
        },
      ],
    },
    {
      year: 2021,
      items: [
        {
          month: "Dec",
          contents: [
            <>Awarded "Korea Robot Company of the Year 2021" (Personal Service Robot Category)</>,
          ],
        },
      ],
    },
    {
      year: 2020,
      items: [
        {
          month: "Dec",
          contents: [
            <>Awarded "Korea Robot Company of the Year 2020" (Personal Service Robot Category)</>,
          ],
        },
        {
          month: "Nov",
          contents: [
            <>
              Won gold and bronze medals in the wearable robot category at the 2nd Cybathlon
              (International Cyborg Olympics)
            </>,
          ],
        },
        {
          month: "Jul",
          contents: [<>Selected as a "Baby Unicorn" startup by the Korean government</>],
        },
      ],
    },
    {
      year: 2019,
      items: [
        {
          month: "Dec",
          contents: [
            <>Awarded "Korea Robot Company of the Year 2019" (Personal Service Robot Category)</>,
          ],
        },
        {
          month: "Sep",
          contents: [
            <>Acquired GMP certification (Good Manufacturing Practice for medical devices)</>,
          ],
        },
      ],
    },
    {
      year: 2018,
      items: [
        {
          month: "Dec",
          contents: [
            <>
              Awarded "Korea Robot Company of the Year 2018" (Professional Service Robot Category)
            </>,
          ],
        },
        {
          month: "Aug",
          contents: [<>Changed company name to Angel Robotics Co., Ltd.</>],
        },
        {
          month: "Feb",
          contents: [
            <>WalkON Suit selected for the torch relay at the 2018 PyeongChang Paralympic Games</>,
          ],
        },
      ],
    },
    {
      year: 2017,
      items: [
        {
          month: "May",
          contents: [<>Received seed investment from LG Electronics</>],
        },
        {
          month: "Feb",
          contents: [<>Angel Robotics Co., Ltd. established</>],
        },
      ],
    },
  ],
};
