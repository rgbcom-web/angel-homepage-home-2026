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
        <ProductSectionTitle label={<span className={cn("text-dd-blue")}>ANGEL LEGS M20</span>}>
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
    <SpecTableContainer>
      <SpecTable
        className={cn(
          "[&_td:not(:last-child)]:border-r [&_td]:border-r-[#D4D4D4] [&_tr]:border-b-[#D4D4D4]",
          "mobile:table-auto mobile:text-sm",
        )}
        fixMobile
        colgroup={
          <col
            className={cn(
              "w-[200px] tablet:w-[150px] mobile:w-[50px]",
              isEng && "w-[230px] tablet:w-[190px]",
            )}
          />
        }>
        <SpecTableBody>
          {isEng && (
            <SpecTableRow>
              <SpecTableCellHeader>
                Product Name
              </SpecTableCellHeader>
              <SpecTableCell colSpan={isEng ? '2' : '1'}>
                <b>ANGEL LEGS M20</b>
              </SpecTableCell>
            </SpecTableRow>
            )
          }
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "모델명",
                en: "Model",
              })}
            </SpecTableCellHeader>
            <SpecTableCell>
              {isEng ? 'M20-A-C3' : <b>M20-A-C3</b>}
            </SpecTableCell>
            <SpecTableCell>
              {isEng ? 'M20-B-C3' : <b>M20-B-C3</b>}
            </SpecTableCell>
          </SpecTableRow>
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "중량",
                en: "Device Weight",
              })}
            </SpecTableCellHeader>
            <SpecTableCell>14.2kg</SpecTableCell>
            <SpecTableCell>20kg</SpecTableCell>
          </SpecTableRow>
          {isEng && (
          <SpecTableRow>
              <SpecTableCellHeader>
                Dimensions
              </SpecTableCellHeader>
              <SpecTableCell>
                1170~1430mm({isEng ? "H" : "높이"}) X <Br mobile />
                390~510mm({isEng ? "W" : "너비"}) X <Br mobile />
                370~435mm({isEng ? "D" : "폭"})
              </SpecTableCell>
              <SpecTableCell>
                1284~1565mm({isEng ? "H" : "높이"}) X <Br mobile />
                438~561mm({isEng ? "W" : "너비"}) X <Br mobile />
                425~480mm({isEng ? "D" : "폭"})
              </SpecTableCell>
            </SpecTableRow>
            )
          }
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "권장 착용 사이즈",
                en: "Size Criteria",
              })}
            </SpecTableCellHeader>
            <SpecTableCell>
              <div className={cn("flex flex-wrap justify-center gap-x-[1em]", "mobile:flex-col")}>
                <span>
                  <span className={cn("inline-block")}>
                    <b>
                      {langContent({
                        ko: "신장",
                        en: "Height",
                      })}
                    </b>
                    :
                  </span>{" "}
                  <span className={cn("inline-block")}>115~150 cm</span>
                </span>
                <span>
                  <span className={cn("inline-block")}>
                    <b>
                      {langContent({
                        ko: "몸무게",
                        en: "Weight",
                      })}
                    </b>
                    :
                  </span>{" "}
                  <span className={cn("inline-block")}>50 kg</span>
                </span>
              </div>
            </SpecTableCell>
            <SpecTableCell>
              <div className={cn("flex flex-wrap justify-center gap-x-[1em]", "mobile:flex-col")}>
                <span>
                  <span className={cn("inline-block")}>
                    <b>
                      {langContent({
                        ko: "신장",
                        en: "Height",
                      })}
                    </b>
                    :
                  </span>{" "}
                  <span className={cn("inline-block")}>140~190 cm</span>
                </span>
                <span>
                  <span className={cn("inline-block")}>
                    <b>
                      {langContent({
                        ko: "몸무게",
                        en: "Weight",
                      })}
                    </b>
                    :
                  </span>{" "}
                  <span className={cn("inline-block")}>80 kg</span>
                </span>
              </div>
            </SpecTableCell>
          </SpecTableRow>
          {!isEng && (
            <SpecTableRow>
              <SpecTableCellHeader>품목명</SpecTableCellHeader>
              <SpecTableCell colSpan={2}>로봇보조정형용운동장치 (제허 22-857호)</SpecTableCell>
            </SpecTableRow>
          )}
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "의료기기 인허가",
                en: "Certificate",
              })}
            </SpecTableCellHeader>
            <SpecTableCell colSpan={2}>
              {langContent({
                ko: "3등급 허가 의료기기",
                en: "KFDA",
              })}
            </SpecTableCell>
          </SpecTableRow>
          <SpecTableRow>
            <SpecTableCellHeader>
              {langContent({
                ko: "제조사 / 제조국",
                en: "Manufacturer",
              })}
            </SpecTableCellHeader>
            <SpecTableCell colSpan={2}>
              {langContent({
                ko: "(주)엔젤로보틱스 / 대한민국",
                en: "Angel Robotics Co. Ltd (South Korea)",
              })}
            </SpecTableCell>
          </SpecTableRow>
        </SpecTableBody>
      </SpecTable>
      {!isEng && (
        <SpecTableNotice className={cn("text-black/60")}>
          <b>
            의료기기 광고심의필 : 52025-110-10-1007 <Br mobile />
            (유효기간 28.03.28)
          </b>
        </SpecTableNotice>
      )}
    </SpecTableContainer>
  );
}
