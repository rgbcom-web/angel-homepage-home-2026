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
  const { langContent, isEng } = useLang();

  return (
    <ProductSection className={cn("pt-10")}>
      <ProductSectionHeader className={cn("text-center")}>
        <ProductSectionTitle label={<span className={cn("text-dd-blue")}>MW10</span>}>
          {langContent({
            ko: "제품 사양",
            en: "Product Specifications",
          })}
        </ProductSectionTitle>
      </ProductSectionHeader>
      <SpecTableContainer>
        <SpecTable className={cn("text-[#C5C5C5] [&_td_b]:text-white [&_th]:bg-black")}>
          <SpecTableBody>
            <SpecTableRow>
              <SpecTableCellHeader>
                {langContent({
                  ko: "제품명 / 모델명",
                  en: "Product Name (Model Name)",
                })}
              </SpecTableCellHeader>
              <SpecTableCell>
                {langContent({
                  ko: "수동식탈부하보행훈련기 / MW10",
                  en: "Suspension Walker (MW10)",
                })}
              </SpecTableCell>
            </SpecTableRow>
            <SpecTableRow>
              <SpecTableCellHeader>
                {langContent({
                  ko: "중량",
                  en: "Weight",
                })}
              </SpecTableCellHeader>
              <SpecTableCell>
                {langContent({
                  ko: "약 40kg",
                  en: "Approx. 40kg",
                })}
              </SpecTableCell>
            </SpecTableRow>
            <SpecTableRow>
              <SpecTableCellHeader>
                {langContent({
                  ko: "본체크기",
                  en: "Size",
                })}
              </SpecTableCellHeader>
              <SpecTableCell>
                {langContent({
                  ko: "1,982 mm(높이) X 867 mm(너비) X 820 mm(깊이)",
                  en: "1,982 mm(Height) X 867 mm(Width) X 820 mm(Depth)",
                })}
              </SpecTableCell>
            </SpecTableRow>
            <SpecTableRow>
              <SpecTableCellHeader>
                {langContent({
                  ko: "최대허용하중",
                  en: "Maximum Loads",
                })}
              </SpecTableCellHeader>
              <SpecTableCell>135kg</SpecTableCell>
            </SpecTableRow>
            {!isEng && (
              <SpecTableRow>
                <SpecTableCellHeader>품목명</SpecTableCellHeader>
                <SpecTableCell>수동식정형용운동장치 (제신 22-230호)</SpecTableCell>
              </SpecTableRow>
            )}
            <SpecTableRow>
              <SpecTableCellHeader>
                {langContent({
                  ko: "제조사 / 제조국",
                  en: "Manufacturer",
                })}
              </SpecTableCellHeader>
              <SpecTableCell>
                {langContent({
                  ko: "(주)엔젤로보틱스 / 대한민국",
                  en: "Angel Robotics Co. Ltd, South Korea",
                })}
              </SpecTableCell>
            </SpecTableRow>
          </SpecTableBody>
        </SpecTable>
        {!isEng && (
          <SpecTableNotice className={cn("text-dd-gray")}>
            <b>
              의료기기 광고심의필 : 52025-I10-12-1204 <Br mobile />
              (유효기간 28. 04. 04)
            </b>
          </SpecTableNotice>
        )}
      </SpecTableContainer>
    </ProductSection>
  );
}
