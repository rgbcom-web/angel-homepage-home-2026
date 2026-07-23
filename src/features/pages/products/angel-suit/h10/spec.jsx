"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  ProductSection,
  ProductSectionHeader,
  ProductSectionTitle,
} from "@/features/pages/products/layouts/default-layouts";
import {
  SpecTableContainer,
  SpecTable,
  SpecTableBody,
  SpecTableRow,
  SpecTableCell,
  SpecTableCellHeader,
  SpecTableNotice,
} from "@/features/pages/products/layouts/spec-table";
import { Br } from "@/features/layout";

export function Spec() {
  const { langContent } = useLang();

  return (
    <ProductSection className={cn("bg-white py-32 text-black", "tablet:py-20")}>
      <ProductSectionHeader className={cn("text-center")}>
        <ProductSectionTitle label={<span className={cn("text-dd-mint")}>ANGEL SUIT H10</span>}>
          {langContent({
            ko: "제품 사양",
            en: "Product Specifications",
          })}
        </ProductSectionTitle>
      </ProductSectionHeader>
      <PC_SpecTable />
    </ProductSection>
  );
}

function PC_SpecTable() {
  const { langContent, isEng } = useLang();

  return (
    <SpecTableContainer className={cn(isEng && "max-w-[1000px]")}>
      <SpecTable
        className={cn(
          "[&_td:not(:last-child)]:border-r [&_td]:border-r-[#D4D4D4] [&_tr]:border-b-[#D4D4D4]",
        )}
        theme="mint"
        colgroup={
          <col
            className={cn(
              "w-[200px] tablet:w-[150px] mobile:w-[50px]",
              isEng && "w-[300px] tablet:w-[190px]",
            )}
          />
        }>
        <SpecTableBody>
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "제품명 / 모델명",
                en: "Product Name",
              })}
            </SpecTableCellHeader>
            <SpecTableCell colSpan={isEng ? '2' : '1'}>
              <b>
                {langContent({
                  ko: "ANGEL SUIT (엔젤슈트) / AS-H10",
                  en: "ANGEL SUIT",
                })}
              </b>
            </SpecTableCell>
          </SpecTableRow>
          {isEng && (
              <SpecTableRow>
                <SpecTableCellHeader>
                  Model
                </SpecTableCellHeader>
                <SpecTableCell>AS-H10-3BB (Standard)</SpecTableCell>
                <SpecTableCell>AS-H10-4BB (Large)</SpecTableCell>
              </SpecTableRow>
            )
          }
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "중량",
                en: "Device Weight",
              })}
            </SpecTableCellHeader>
            <SpecTableCell>2.8 kg</SpecTableCell>
            { isEng && (
              <SpecTableCell>3.4 kg</SpecTableCell>
            )}
          </SpecTableRow>
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "본체크기",
                en: "Dimensions",
              })}
            </SpecTableCellHeader>
            <SpecTableCell>
              435 mm({isEng ? "H" : "높이"}) X <Br mobile />
              432~508 mm({isEng ? "W" : "너비"}) X <Br mobile />
              300~330 mm({isEng ? "D" : "폭"})
            </SpecTableCell>
            {isEng && (
              <SpecTableCell>
                435 mm({isEng ? "H" : "높이"}) X <Br mobile />
                580~620 mm({isEng ? "W" : "너비"}) X <Br mobile />
                300~330 mm({isEng ? "D" : "폭"})
              </SpecTableCell>
            )}
          </SpecTableRow>
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "권장 착용 사이즈",
                en: "Recommended Size",
              })}
            </SpecTableCellHeader>
            <SpecTableCell>
              <div className={cn("flex", "flex-col")}>
                {/* <span>
                  <span className={cn("inline-block")}>
                    <b>{isEng ? "Height" : "신장"}</b>:
                  </span>{" "}
                  <span className={cn("inline-block")}>150~190 cm</span>
                </span> */}
                <span>
                  <span className={cn("inline-block")}>
                    <b>{isEng ? "" : "허리둘레:"}</b>
                  </span>{" "}
                  <span className={cn("inline-block")}>24~40 inch</span>
                </span>
              </div>
            </SpecTableCell>
            {
              isEng && (
                <SpecTableCell>
                  <div className={cn("flex", "flex-col")}>
                    <span>
                      <span className={cn("inline-block")}>38~55 inch</span>
                    </span>
                  </div>
                </SpecTableCell>
              )
            }
          </SpecTableRow>
          {!isEng && (
            <SpecTableRow>
              <SpecTableCellHeader>품목명</SpecTableCellHeader>
              <SpecTableCell><b>전동식정형용운동장치</b></SpecTableCell>
            </SpecTableRow>
          )}
          {isEng && (
            <SpecTableRow>
              <SpecTableCellHeader>Certification</SpecTableCellHeader>
              <SpecTableCell colSpan={isEng ? '2' : '1'}>KFDA</SpecTableCell>
            </SpecTableRow>
          )}
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "제조사 / 제조국",
                en: "Manufacturer",
              })}
            </SpecTableCellHeader>
            <SpecTableCell colSpan={isEng ? '2' : '1'}>
              {langContent({
                ko: "(주)엔젤로보틱스 / 대한민국",
                en: "Angel Robotics Co. Ltd, South Korea",
              })}
            </SpecTableCell>
          </SpecTableRow>
        </SpecTableBody>
      </SpecTable>
      { !isEng && (
        <SpecTableNotice className={cn("text-black/60")}>
          <span>
            이 제품은 &apos;<b>의료기기</b>&apos;이며, &apos;<b>사용상의 주의사항</b>&apos;과{" "}
            <Br mobile />
            &apos;<b>사용방법</b>&apos;을 잘 읽고 사용하십시오.
          </span>
          <Br />
          <b>
            의료기기 광고심의필 : 52025-110-18-1900 <Br mobile />
            (유효기간 28.06.04)
          </b>
        </SpecTableNotice>
      )}
    </SpecTableContainer>
  );
}
