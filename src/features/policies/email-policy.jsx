import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Br } from "@/features/layout";

// 공통 클래스 상수화
const STYLES = {
  listItem: "flex items-start gap-[0.5em]",
  numberBadge:
    "flex aspect-square w-[1.5em] flex-shrink-0 items-center justify-center rounded-full bg-dd-blue leading-[1] text-white",
  textContent: "leading-[1.5]",
  sectionTitle: "text-lg text-dd-navy",
  sectionContainer: "space-y-2",
};

// 재사용 가능한 컴포넌트
function NumberedItem({ number, children }) {
  return (
    <li className={STYLES.listItem}>
      <span className={STYLES.numberBadge}>{number}</span>
      <span className={STYLES.textContent}>{children}</span>
    </li>
  );
}

function SectionTitle({ children }) {
  return <h3 className={STYLES.sectionTitle}>{children}</h3>;
}

export function EmailPolicy() {
  const { langContent, isEng } = useLang();

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-4 text-balance border p-8 text-center mobile:p-4 mobile:py-6 mobile:text-base">
        <p>
          {langContent({
            ko: "엔젤로보틱스 회원에게 무차별적으로 보내지는 타사의 메일을 차단하기 위해, 본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.",
            en: "To block unsolicited emails from third parties that are indiscriminately sent to Angel Robotics members, please note that the email addresses posted on this website are protected against unauthorized collection through email collection programs or other technical devices. Violation of this policy may result in criminal penalties under the Information and Communication Network Act.",
          })}
        </p>
        <strong>
          {langContent({
            ko: "게시일: 2023년 09월 07일",
            en: "Date of Posting: September 7, 2023",
          })}
        </strong>
      </div>

      <div className="flex flex-col gap-4 space-y-2">
        <h2 className="border-b pb-[0.5em] text-xl font-bold text-dd-navy">
          {langContent({
            ko: "정보통신망 이용촉진 및 정보보호 등에 관한 법률",
            en: "Act on Promotion of Information and Communications Network Utilization and Information Protection, etc.",
          })}
        </h2>

        <div>
          <ul className="space-y-6">
            {/* 제48조 섹션 */}
            <li className={STYLES.sectionContainer}>
              <SectionTitle>
                <b>{langContent({ ko: "제48조", en: "Article 48" })}</b>
                {isEng && <br />}
                {langContent({
                  ko: "(정보통신망 침해행위 등의 금지)",
                  en: "(Prohibition of Infringements on Information and Communications Networks, etc.)",
                })}
              </SectionTitle>

              <ol className="space-y-1">
                <NumberedItem number="1">
                  {langContent({
                    ko: "누구든지 정당한 접근권한 없이 또는 허용된 접근권한을 넘어 정보통신망에 침입하여서는 아니 된다.",
                    en: "No one shall intrude into an information and communications network without legitimate access rights or beyond the permitted access rights.",
                  })}
                </NumberedItem>

                <NumberedItem number="2">
                  {langContent({
                    ko: "누구든지 정당한 사유 없이 정보통신시스템, 데이터 또는 프로그램 등을 훼손ㆍ멸실ㆍ변경ㆍ위조하거나 그 운용을 방해할 수 있는 프로그램(이하 '악성프로그램'이라 한다)을 전달 또는 유포하여서는 아니 된다.",
                    en: 'No one shall transmit or distribute a program that can damage, destroy, alter, forge an information and communications system, data, or program, or interfere with its operation (hereinafter referred to as "malicious program") without a legitimate reason.',
                  })}
                </NumberedItem>

                <NumberedItem number="3">
                  {langContent({
                    ko: "누구든지 정보통신망의 안정적 운영을 방해할 목적으로 대량의 신호 또는 데이터를 보내거나 부정한 명령을 처리하도록 하는 등의 방법으로 정보통신망에 장애가 발생하게 하여서는 아니 된다.",
                    en: "No one shall cause a malfunction in an information and communications network by sending a large amount of signals or data, processing illegal commands, or any other means with the purpose of disrupting the stable operation of the information and communications network.",
                  })}
                </NumberedItem>
              </ol>
            </li>

            {/* 제65조 섹션 */}
            <li className={STYLES.sectionContainer}>
              <SectionTitle>
                <b>{langContent({ ko: "제65조", en: "Article 65" })}</b>{" "}
                {langContent({ ko: "(벌칙)", en: "(Penalties)" })}
              </SectionTitle>

              <ol className="space-y-1">
                <NumberedItem number="1">
                  {langContent({
                    ko: "다음 각 호의 어느 하나에 해당하는 자는 5년 이하의 징역 또는 5천만원 이하의 벌금에 처한다.",
                    en: "A person who falls under any of the following subparagraphs shall be punished by imprisonment for not more than five years or by a fine not exceeding 50 million won.",
                  })}
                </NumberedItem>

                <NumberedItem number="2">
                  {langContent({
                    ko: "제1항제9호의 미수범은 처벌한다.",
                    en: "An attempted crime under subparagraph 9 of paragraph 1 shall be punished.",
                  })}
                </NumberedItem>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
