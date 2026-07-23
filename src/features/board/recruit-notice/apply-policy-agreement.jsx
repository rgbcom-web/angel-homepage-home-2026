"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Br } from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/shadcn/ui/dialog";
import { ScrollArea } from "@/shared/shadcn/ui/scroll-area";
import { RadioGroup, FormRadioGroupItem } from "@/shared/shadcn/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

export function PolicyAgreement() {
  const form = useFormContext();
  const form_required = form.watch("privacy_required");

  const [required, setRequired] = useState(false);
  const [optional, setOptional] = useState(false);
  const [sensitive, setSensitive] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!form_required ? (
          <Button variant="gray-darker" size="lg" className={cn("font-normal")}>
            <b className={cn("font-bold")}>개인정보 수집 · 이용 · 제공 동의</b> [자세히 보기]
          </Button>
        ) : (
          <RadioGroup value={1} className={cn("tablet:ml-auto", "mobile:mx-auto")}>
            <FormRadioGroupItem
              className={cn("text-xl")}
              value={1}
              label={
                <span className={cn("text-dd-blue")}>
                  <b className={cn("font-bold")}>개인정보 수집 · 이용 · 제공 동의</b> [자세히 보기]
                </span>
              }
            />
          </RadioGroup>
        )}
      </DialogTrigger>
      <DialogContent
        className={{ container: cn("max-w-[600px]"), content: cn("space-y-0") }}
        closeButton={<CloseButton required={required} optional={optional} sensitive={sensitive} />}>
        <DialogHeader>
          <DialogTitle className={cn("text-2xl/[1.3]")}>
            개인정보 수집 · 이용 · 제공 동의
          </DialogTitle>
        </DialogHeader>
        <div className={cn("border-b border-b-[#959595] text-[15px]/[1.5] text-dd-gray-dark")}>
          <ScrollArea
            className={{
              root: cn("h-[430px] rounded-none border-none"),
              viewport: cn("py-6 pr-4"),
              scrollbar: cn("mr-0"),
            }}>
            <p>
              ㈜엔젤로보틱스(이하 “회사”)의 채용절차와 관련하여 다음과 같이 입사지원자의 개인정보의
              수집·이용에 동의를 받고자 합니다. 귀하는 동의를 거부할 권리가 있으며, 입사 및 근로계약
              등에 필요한 최소한의 개인정보 수집이 불가능할 경우에는 정상적인 절차가 진행되기
              어려움을 유념해 주십시오.
            </p>
            <br />
            <OrderBlock number="1" title="개인정보 수집 및 이용 목적">
              <p>회사는 다음과 같은 목적을 위해 입사지원자의 개인정보를 수집하고 있습니다.</p>
              <div className={cn("space-y-10")}>
                <div className={cn("space-y-3")}>
                  <b>① 필수 사항</b>
                  <DocTable>
                    <DocTableHeader>
                      <DocTableRow>
                        <DocTableHeaderCell>수집 항목</DocTableHeaderCell>
                        <DocTableHeaderCell>수집·이용 목적</DocTableHeaderCell>
                        <DocTableHeaderCell>보유기간</DocTableHeaderCell>
                      </DocTableRow>
                    </DocTableHeader>
                    <DocTableBody>
                      <DocTableRow>
                        <DocTableCell>성명, 연락처, 이메일</DocTableCell>
                        <DocTableCell>
                          본인 확인 및 식별, 채용 관련 <Br pc tablet />
                          고지사항 전달 및 결과 안내
                        </DocTableCell>
                        <DocTableCell>3년</DocTableCell>
                      </DocTableRow>
                    </DocTableBody>
                  </DocTable>
                  <DocNotice className={cn("text-[#E20000]")}>
                    필수 사항을 입력하지 않으시는 경우 입사 절차에 제한이 있을 수 있습니다.
                  </DocNotice>
                  <DocRadioGroup onChange={setRequired} value={required} />
                </div>
                <div className={cn("space-y-3")}>
                  <b>② 선택 사항</b>
                  <DocTable>
                    <DocTableHeader>
                      <DocTableRow>
                        <DocTableHeaderCell>수집 항목</DocTableHeaderCell>
                        <DocTableHeaderCell>수집·이용 목적</DocTableHeaderCell>
                        <DocTableHeaderCell>보유기간</DocTableHeaderCell>
                      </DocTableRow>
                    </DocTableHeader>
                    <DocTableBody>
                      <DocTableRow>
                        <DocTableCell>
                          학력, 경력사항, 외국어능력, <Br pc tablet />
                          PC활용능력 자격사항, <Br pc tablet />
                          해외체류 경험 등
                        </DocTableCell>
                        <DocTableCell>
                          채용 적합성 판단 및 <Br pc tablet />
                          서류 심사/면접 등의 <Br pc tablet />
                          근거 자료로 활용
                        </DocTableCell>
                        <DocTableCell>3년</DocTableCell>
                      </DocTableRow>
                    </DocTableBody>
                  </DocTable>
                  <DocNotice>
                    선택 사항 수집에 동의하지 않더라도 입사지원은 하실 수 있으나, <Br pc tablet />
                    불이익을 받으실 수 있습니다.
                  </DocNotice>
                  <DocRadioGroup onChange={setOptional} value={optional} />
                </div>
                <div className={cn("space-y-3")}>
                  <b>③ 민감 정보</b>
                  <DocTable>
                    <DocTableHeader>
                      <DocTableRow>
                        <DocTableHeaderCell>수집 항목</DocTableHeaderCell>
                        <DocTableHeaderCell>수집·이용 목적</DocTableHeaderCell>
                        <DocTableHeaderCell>보유기간</DocTableHeaderCell>
                      </DocTableRow>
                    </DocTableHeader>
                    <DocTableBody>
                      <DocTableRow>
                        <DocTableCell>
                          보훈대상여부, 보훈번호, 관계, 장애인여부, 장애종류, 장애급수,
                          취업보호계층여부, 해당 세부사항
                        </DocTableCell>
                        <DocTableCell>대상자 가산점 부여</DocTableCell>
                        <DocTableCell>3년</DocTableCell>
                      </DocTableRow>
                    </DocTableBody>
                  </DocTable>
                  <DocNotice>
                    민감 정보 수집에 동의하지 않으시면 입사지원은 하실 수 있으나, <Br pc tablet />
                    불이익을 받으실 수 있습니다.
                  </DocNotice>
                  <DocRadioGroup onChange={setSensitive} value={sensitive} />
                </div>
              </div>
            </OrderBlock>
            <br />
            <br />
            <OrderBlock number="2" title="개인정보 보유 및 이용기간">
              <p>
                회사는 입사지원자가 지원자 본인의 개인정보의 삭제를 요청 시 즉각 삭제 처리합니다.
                단, 별도의 삭제 요청이 없는 경우, 입사지원 이력 관리를 위해 3년간 보관됩니다.
              </p>
            </OrderBlock>
          </ScrollArea>
        </div>
        <DialogFooter className={cn("flex-col items-center gap-8 pt-4")}>
          <TotalAgreement
            setRequired={setRequired}
            setOptional={setOptional}
            setSensitive={setSensitive}
            required={required}
            optional={optional}
            sensitive={sensitive}
          />
          <ConfirmButton required={required} optional={optional} sensitive={sensitive} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OrderBlock({ number, title, children }) {
  return (
    <article className={cn("space-y-0.5")}>
      <h3 className={cn("flex items-center gap-0.5 font-bold")}>
        <span>{number}.</span>
        <span>{title}</span>
      </h3>
      <div className={cn("space-y-3 pl-3")}>{children}</div>
    </article>
  );
}

function DocTable({ children, className }) {
  return (
    <table className={cn("w-full table-fixed border-y border-y-[#B7B7B7] text-center", className)}>
      <colgroup>
        <col />
        <col />
        <col className={cn("w-[100px]")} />
      </colgroup>
      {children}
    </table>
  );
}

function DocTableHeader({ children, className }) {
  return <thead className={cn("border-b border-b-[#D5D5D5]", className)}>{children}</thead>;
}

function DocTableBody({ children, className }) {
  return <tbody className={cn("", className)}>{children}</tbody>;
}

function DocTableRow({ children, className }) {
  return <tr className={cn("", className)}>{children}</tr>;
}

function DocTableHeaderCell({ children, className }) {
  return (
    <th
      className={cn(
        "border-r border-r-[#F2F2F2] px-[0.5em] py-[0.3em] font-semibold last:border-r-0",
        className,
      )}>
      {children}
    </th>
  );
}

function DocTableCell({ children, className }) {
  return (
    <td
      className={cn(
        "border-r border-r-[#F2F2F2] px-[0.5em] py-[0.5em] last:border-r-0",
        className,
      )}>
      {children}
    </td>
  );
}

function DocNotice({ children, className }) {
  return (
    <p className={cn("flex gap-[0.5em] font-light", className)}>
      <span>※</span>
      {children}
    </p>
  );
}

function DocRadioGroup({ onChange, value }) {
  return (
    <RadioGroup onValueChange={onChange} value={value} className={cn("pt-3")}>
      <FormRadioGroupItem value={true} label="동의합니다." />
      <FormRadioGroupItem value={false} label="동의하지 않습니다." />
    </RadioGroup>
  );
}

function TotalAgreement({ setRequired, setOptional, setSensitive, required, optional, sensitive }) {
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    if (!required) {
      setValue(undefined);
    } else if (required && optional && sensitive) {
      setValue(1);
    } else if (required) {
      setValue(2);
    }
  }, [required, optional, sensitive]);

  const onAllAgree = () => {
    setRequired(true);
    setOptional(true);
    setSensitive(true);
  };

  const onRequiredAgree = () => {
    setRequired(true);
    setOptional(false);
    setSensitive(false);
  };

  return (
    <RadioGroup
      onValueChange={setValue}
      value={value}
      className={cn("w-full justify-center gap-8", "mobile:gap-2")}>
      <FormRadioGroupItem value={1} label="전체 동의" onClick={onAllAgree} />
      <FormRadioGroupItem value={2} label="필수 항목만 동의" onClick={onRequiredAgree} />
    </RadioGroup>
  );
}

function ConfirmButton({ required, optional, sensitive }) {
  const disabled = !required;
  const form = useFormContext();

  const handleClick = () => {
    form.setValue("privacy_required", required);
    form.setValue("privacy_optional", optional);
    form.setValue("privacy_sensitive", sensitive);
  };

  return (
    <DialogClose asChild>
      <Button variant="gray-darker" size="lg" disabled={disabled} onClick={handleClick}>
        상기 내용을 확인하였습니다.
      </Button>
    </DialogClose>
  );
}

function CloseButton({ required, optional, sensitive }) {
  const form = useFormContext();

  const handleClick = () => {
    form.setValue("privacy_required", required);
    form.setValue("privacy_optional", optional);
    form.setValue("privacy_sensitive", sensitive);
  };

  return (
    <DialogClose
      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-dd-gray-darker text-white hover:bg-dd-gray-darker/80 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:text-dd-gray-dark"
      onClick={handleClick}>
      <X className="h-3/4 w-3/4" strokeWidth={1} />
      <span className="sr-only">Close</span>
    </DialogClose>
  );
}
