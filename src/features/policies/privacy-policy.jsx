import { useLang } from "@/shared/context/lang-provider";
import {
  PolicyDocument,
  PolicyDl,
  PolicyDt,
  PolicyDd,
  PolicyCircleOrderList,
  PolicyOrderList,
  PolicyUnorderedList,
} from "./policy-layout";

export function PrivacyPolicy({ className }) {
  const { langContent } = useLang();

  return langContent({
    ko: <DocKorean />,
    en: <DocEnglish />,
  });
}

function DocKorean({ className }) {
  return (
    <PolicyDocument className={className}>
      <p>
        ㈜엔젤로보틱스(이하 &apos;회사&apos;라 한다)는 개인정보 보호법 제30조에 따라 정보주체의
        개인정보를 보호하고 이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과
        같이 개인정보 처리지침을 수립ㆍ공개합니다.
      </p>
      <PolicyDl>
        <PolicyDt>제1조(개인정보의 처리목적)</PolicyDt>
        <PolicyDd>
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적
          이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에
          따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          <PolicyCircleOrderList
            items={[
              <>홈페이지 고객문의에 대한 답변 제공 및 상담</>,
              <>홈페이지 내 자료 제공 및 현황관리</>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제2조(개인정보의 처리 및 보유기간)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                회사는 법령에 따른 개인정보 보유 이용기간 또는 정보주체로부터 개인정보를 수집시에
                동의받은 개인정보 보유 이용기간내에서 개인정보를 처리 보유합니다.
              </>,
              <>
                처리 및 보유기간은 다음과 같습니다.
                <PolicyOrderList
                  items={[
                    <>홈페이지 고객문의 접수일로부터 1년이내</>,
                    <>홈페이지 내 이력서 접수는 채용완료일로부터 일주일 이내</>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제3조(개인정보의 제3자 제공) 해당내용 없음</PolicyDt>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제4조(개인정보처리의 위탁) 해당내용 없음</PolicyDt>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제5조(정보주체의 권리 의무 및 행사방법)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
                있습니다.
                <PolicyOrderList
                  items={[
                    <>개인정보 열람 요구</>,
                    <>오류 등이 있을 경우 정정 요구</>,
                    <>삭제 요구</>,
                    <>처리정지 요구</>,
                  ]}
                />
              </>,
              <>
                제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편을 통해 하실 수 있으며
                회사는 이에 대해 지체없이 조치하겠습니다.
              </>,
              <>
                정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정
                또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
              </>,
              <>
                제1항에 따른 권리행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여
                하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별치 제11호 서식에 따른 위임장을
                제출하셔야 합니다.
              </>,
              <>
                정보주체는 개인정보 보호법 등 관계법령을 위반하여 회사가 처리하고 있는 정보주체
                본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니됩니다.
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>
          제6조 (처리하는 개인정보 항목) 회사는 다음의 개인정보 항목을 처리하고 있습니다.
        </PolicyDt>
        <PolicyDd>
          <PolicyOrderList
            items={[
              <>
                홈페이지 고객문의에 대한 답변 제공 및 현황관리
                <PolicyUnorderedList
                  items={[
                    <>필수항목: 성명, 회사명(회사 URL 포함), 연락처(전화번호, 이메일 주소)</>,
                    <>선택항목: 거주지, 나이</>,
                  ]}
                />
              </>,
              <>
                홈페이지 내 이력서 접수
                <PolicyUnorderedList
                  items={[<>사진, 성명, 전화번호, 이메일 주소, 입사지원서 서류상 기재정보</>]}
                />
              </>,
              <>
                인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수
                있습니다.
                <PolicyUnorderedList
                  items={[<>IP 주소, 쿠키, MAC 주소, 서비스 이용기록, 방문기록, 불량이용기록 등</>]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제7조(개인정보의 파기)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을
                때에는 지체없이 해당 개인정보를 파기합니다
              </>,
              <>
                개인정보 파기의 절차 및 방법은 다음과 같습니다.
                <PolicyOrderList
                  items={[
                    <>
                      파기절차 <br />
                      회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의
                      승인을 받아 개인정보를 파기합니다.
                    </>,
                    <>
                      파기방법 <br />
                      회사는 전자적파일형태로 기록, 저장된 개인정보는 재생할 수 없도록 파기하며
                      로우레밸포뱃(Low Level Format)등의 방법을 이용하여 파기하며, 종이 문서에 기록,
                      저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제8조(개인정보의 안전성 확보조치)</PolicyDt>
        <PolicyDd>
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
          <PolicyOrderList
            items={[
              <>관리적 조치: 내부관리계획 수립, 시행, 정기적 직원교육 등</>,
              <>기술적 조치: 개인정보처리시스템 등의 접근권한 관리</>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제9조(개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로
                불러오는 &apos;쿠키(cookie)&apos;를 사용합니다.
              </>,
              <>
                쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게
                보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
                <PolicyOrderList
                  items={[
                    <>
                      쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹사이트들에 대한 방문 및
                      이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된
                      정보제공을 위해 사용됩니다.
                    </>,
                    <>
                      쿠키의 설치, 운영 및 거부: 웹브라우저 상단의 도구 〉 인터넷옵션 〉 개인정보
                      메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
                    </>,
                    <>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제10조(개인정보 보호책임자)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
                지정하고 있습니다.
                <span className="mt-3 block font-semibold">개인정보 보호책임자</span>
                <PolicyUnorderedList
                  items={[
                    <>성명: 조남민</>,
                    <>직책: 대표이사</>,
                    <>
                      연락처: <br />
                      전화) 02-6376-5923 <br />
                      E-mail) contact@angel-robotics.com <br />
                      FAX) 02-6094-0166
                    </>,
                  ]}
                />
                <span className="mt-3 block font-semibold">개인정보 보호 담당부서</span>
                <PolicyUnorderedList
                  items={[
                    <>부서명: 마케팅팀</>,
                    <>담당자: 전선</>,
                    <>
                      연락처: <br />
                      전화) 02-6376-5923 <br />
                      E-mail) sun.jeon@angel-robotics.com <br />
                      FAX) 02-6094-0166
                    </>,
                  ]}
                />
              </>,
              <>
                정보주체는 회사의 서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보 보호 관련
                문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실
                수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제11조(개인정보 열람청구)</PolicyDt>
        <PolicyDd>
          정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수
          있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
          <span className="mt-3 block font-semibold">개인정보열람청구 접수 처리 부서</span>
          <PolicyUnorderedList
            items={[
              <>부서명: 마케팅팀</>,
              <>담당자: 전선</>,
              <>
                연락처: <br />
                전화) 02-6376-5923 <br />
                E-mail) sun.jeon@angel-robotics.com <br />
                FAX) 02-6094-0166
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제12조(권익침해 구제방법)</PolicyDt>
        <PolicyDd>
          정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수
          있습니다. <br />
          (아래의 기관은 회사와는 별개의 기관으로서, 회사의 자체적인 개인정보 불만처리, 피해구제
          결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다)
          <span className="mt-3 block font-semibold">
            개인정보침해신고센터(한국인터넷진흥원 운영)
          </span>
          <PolicyUnorderedList
            items={[
              <>소관업무: 개인정보 침해사실 신고, 상담 신청</>,
              <>홈페이지: privacy.kisa.or.kr</>,
              <>전화: (국번없이)118</>,
              <>주소: (58324) 전남 나주시 진흥길 9 (빛가람동 301-2) 3층 개인정보침해신고센터</>,
            ]}
          />
          <span className="mt-3 block font-semibold">개인정보 분쟁조정위원회</span>
          <PolicyUnorderedList
            items={[
              <>소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</>,
              <>홈페이지: www.kopico.go.kr</>,
              <>전화: (국번없이) 1833 – 6972</>,
              <>주소: (03171)서울특별시 종로구 세종대로 209 정부서울청사 4층</>,
            ]}
          />
          <span className="mt-3 block font-semibold">대검찰청 사이버범죄수사단</span>
          <PolicyUnorderedList items={[<>전화: 02-3480-3573</>, <>홈페이지: www.spo.go.kr</>]} />
          <span className="mt-3 block font-semibold">경찰청 사이버안전국</span>
          <PolicyUnorderedList items={[<>전화: 182</>, <>홈페이지: cyberbureau.police.go.kr</>]} />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>제13조(개인정보 처리방침 변경)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[<>이 개인정보 처리방침은 2025.03.11일부터 적용됩니다.</>]}
          />
        </PolicyDd>
      </PolicyDl>
    </PolicyDocument>
  );
}

function DocEnglish({ className }) {
  return (
    <PolicyDocument className={className}>
      <p>
        Angel Robotics Co., Ltd. (hereinafter referred to as the &quot;Company&quot;) is established
        and disclosed to protect the personal information of data subjects in accordance with
        Article 30 of the Personal Information Protection Act and to promptly and smoothly handle
        related complaints. The following is the privacy policy:
      </p>
      <PolicyDl>
        <PolicyDt>Article 1 (Purpose of Personal Information Processing)</PolicyDt>
        <PolicyDd>
          The Company processes personal information for the following purposes. The processed
          personal information will not be used for any other purposes than the following, and if
          the purpose of use is changed, separate consent will be obtained in accordance with
          Article 18 of the Personal Information Protection Act.
          <PolicyCircleOrderList
            items={[
              <>Providing answers and managing inquiries from customers on the website</>,
              <>Accepting resumes on the website</>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 2 (Processing and Retention Period of Personal Information)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                The Company processes and retains personal information within the period specified
                by law or within the period of consent obtained from the data subject at the time of
                collection.
              </>,
              <>
                The processing and retention periods are as follows:
                <PolicyOrderList
                  items={[
                    <>Within 1 year from the date of customer inquiry on the website</>,
                    <>
                      Within 1 week from the date of completion of recruitment for resumes submitted
                      on the website
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 3 (Provision of Personal Information to Third Parties)</PolicyDt>
        <PolicyDd>Not applicable</PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 4 (Outsourcing of Personal Information Processing)</PolicyDt>
        <PolicyDd>Not applicable</PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>
          Article 5 (Rights and Obligations of Data Subjects and Methods of Exercise)
        </PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                Data subjects may exercise the following personal information protection rights with
                respect to the Company at any time:
                <PolicyOrderList
                  items={[
                    <>Request for access to personal information</>,
                    <>Request for correction in case of errors</>,
                    <>Request for deletion</>,
                    <>Request for suspension of processing</>,
                  ]}
                />
              </>,
              <>
                The exercise of rights under paragraph 1 may be made to the Company in writing, by
                telephone, or by email, and the Company will take necessary measures to respond
                promptly.
              </>,
              <>
                If a data subject requests correction or deletion of personal information due to
                errors, the Company will not use or provide the personal information until the
                correction or deletion is completed.
              </>,
              <>
                The rights under paragraph 1 may be exercised through a legal representative or an
                authorized agent of the data subject. In this case, the data subject must submit a
                power of attorney according to the format specified in Annex 11 of the Enforcement
                Rules of the Personal Information Protection Act.
              </>,
              <>
                The data subject must not infringe upon the personal information and privacy of
                oneself or others in violation of the Personal Information Protection Act and other
                relevant laws and regulations.
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 6 (Personal Information Items Processed by the Company)</PolicyDt>
        <PolicyDd>
          The Company processes the following personal information items:
          <PolicyOrderList
            items={[
              <>
                Providing answers and managing inquiries from customers on the website
                <PolicyUnorderedList
                  items={[
                    <>
                      Required items: Name, company name (including company URL), contact
                      information (phone number, email address)
                    </>,
                    <>Optional items: Place of residence, age</>,
                  ]}
                />
              </>,
              <>
                Accepting resumes on the website
                <PolicyUnorderedList
                  items={[
                    <>
                      Photo, name, phone number, email address, information provided on the job
                      application form
                    </>,
                  ]}
                />
              </>,
              <>
                The following personal information items may be automatically generated and
                collected during the process of using internet services:
                <PolicyUnorderedList
                  items={[
                    <>
                      IP address, cookies, MAC address, service usage records, visit records,
                      records of improper use, etc.
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 7 (Destruction of Personal Information)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                The Company promptly destroys personal information when it becomes unnecessary due
                to the expiration of the retention period or the achievement of the processing
                purpose
              </>,
              <>
                The procedures and methods of personal information destruction are as follows:
                <PolicyOrderList
                  items={[
                    <>
                      Destruction procedures <br />
                      The Company selects personal information that has become the subject of
                      destruction, obtains approval from the Company&apos;s personal information
                      protection manager, and destroys the personal information.
                    </>,
                    <>
                      Destruction methods <br />
                      Personal information recorded and stored in electronic file format is
                      destroyed to prevent regeneration, using methods such as low-level formatting.
                      Personal information recorded and stored on paper documents is shredded or
                      incinerated.
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 8 (Security Measures for Personal Information Protection)</PolicyDt>
        <PolicyDd>
          The Company takes the following measures to secure the safety of personal information:
          <PolicyOrderList
            items={[
              <>
                Administrative measures: Establishment and implementation of internal management
                plans, regular employee education, etc.
              </>,
              <>
                Technical measures: Access control to personal information processing systems, etc.
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>
          Article 9 (Installation, Operation, and Rejection of Automatic Collection Devices for
          Personal Information)
        </PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                The Company uses &apos;cookies&apos; to store and retrieve usage information in
                order to provide individualized customized services to users.
              </>,
              <>
                Cookies are small pieces of information sent by the server (http) operating the
                website to the user&apos;s computer browser and may be stored on the hard disk of
                the user&apos;s PC computer.
                <PolicyOrderList
                  items={[
                    <>
                      Purpose of using cookies: Cookies are used to track and provide optimized
                      information to users regarding their visits and usage patterns on various
                      services and websites they have visited.
                    </>,
                    <>
                      Installation, operation, and rejection of cookies: Users can refuse to save
                      cookies by setting options in the Tools {">"} Internet Options {">"} Privacy
                      menu of their web browser.
                    </>,
                    <>
                      However, if cookies are rejected, it may cause difficulties in using
                      customized services.
                    </>,
                  ]}
                />
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 10 (Personal Information Protection Officer)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[
              <>
                The Company designates and operates a personal information protection officer to be
                responsible for overall management of personal information processing and to handle
                complaints and remedy related to personal information processing. The following is
                the contact information of the personal information protection officer and the
                department in charge:
                <span className="mt-3 block font-semibold">
                  Personal Information Protection Officer
                </span>
                <PolicyUnorderedList
                  items={[
                    <>Name: Julian Cho</>,
                    <>Position: CEO</>,
                    <>
                      Contact: <br />
                      Phone) 02-6376-5923 <br />
                      E-mail) concact@angel-robotics.com <br />
                      FAX) 02-6094-0166
                    </>,
                  ]}
                />
                <span className="mt-3 block font-semibold">
                  Department in Charge of Personal Information Protection
                </span>
                <PolicyUnorderedList
                  items={[
                    <>Department: Marketing Team</>,
                    <>Person in Charge: Sun Jeon</>,
                    <>
                      Contact: <br />
                      Phone) 02-6376-5931 <br />
                      E-mail) sun.jeon@angel-robotics.com <br />
                      FAX) 02-6094-0166
                    </>,
                  ]}
                />
              </>,
              <>
                Data subjects can contact the personal information protection officer and the
                department in charge for any inquiries, complaints, or remedies regarding personal
                information protection related to the Company&apos;s services (or business). The
                Company will respond and handle the inquiries promptly.
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 11 (Request for Access to Personal Information)</PolicyDt>
        <PolicyDd>
          Data subjects may request access to personal information in accordance with Article 35 of
          the Personal Information Protection Act. Data subjects can make such requests to the
          following department. The Company will make efforts to promptly process data
          subjects&apos; requests for access to personal information.
          <span className="mt-3 block font-semibold">
            Department for Receiving and Processing Requests for Access to Personal Information
          </span>
          <PolicyUnorderedList
            items={[
              <>Department: Marketing Team</>,
              <>Person in Charge: Sun Jeon</>,
              <>
                Contact: <br />
                Phone) 02-6376-5931 <br />
                E-mail) sun.jeon@angel-robotics.com <br />
                FAX) 02-6094-0166
              </>,
            ]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>
          Article 12 (Methods of Remedies for Infringement of Rights and Interests)
        </PolicyDt>
        <PolicyDd>
          Data subjects can contact the following organizations for remedies, consultations, etc.
          regarding personal information infringements:
          <span className="mt-3 block font-semibold">
            Personal Information Infringement Report Center (operated by the Korea Internet &
            Security Agency)
          </span>
          <PolicyUnorderedList
            items={[
              <>
                Jurisdiction: Report of personal information infringement, request for consultation
              </>,
              <>Website: privacy.kisa.or.kr</>,
              <>Phone: 118 (without area code)</>,
              <>
                Address: 3rd Floor, 301-2 Bitgaram-dong, Naju-si, Jeollanam-do, Republic of Korea,
                Postal Code: 58324
              </>,
            ]}
          />
          <span className="mt-3 block font-semibold">
            Personal Information Dispute Mediation Committee
          </span>
          <PolicyUnorderedList
            items={[
              <>
                Jurisdiction: Application for personal information dispute mediation, group dispute
                resolution (civil resolution)
              </>,
              <>Website: www.kopico.go.kr</>,
              <>Phone: 1833 - 6972 (without area code)</>,
              <>
                Address: 4th Floor, Government Seoul Building, 209 Sejong-daero, Jongno-gu, Seoul,
                Republic of Korea, Postal Code: 03171
              </>,
            ]}
          />
          <span className="mt-3 block font-semibold">
            Cyber Crime Investigation Unit, Supreme Prosecutors&apos; Office
          </span>
          <PolicyUnorderedList items={[<>Phone: +82-2-3480-3573</>, <>Website: www.spo.go.kr</>]} />
          <span className="mt-3 block font-semibold">
            Cyber Safety Bureau, National Police Agency
          </span>
          <PolicyUnorderedList
            items={[<>Phone: 182(korea)</>, <>Website: cyberbureau.police.go.kr</>]}
          />
        </PolicyDd>
      </PolicyDl>
      <PolicyDl>
        <PolicyDt>Article 13 (Changes to the Privacy Policy)</PolicyDt>
        <PolicyDd>
          <PolicyCircleOrderList
            items={[<>This privacy policy is effective from April 14, 2025</>]}
          />
        </PolicyDd>
      </PolicyDl>
    </PolicyDocument>
  );
}
