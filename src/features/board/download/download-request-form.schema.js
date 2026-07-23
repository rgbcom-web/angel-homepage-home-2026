import { z } from "zod";

export const downloadRequestDefaultValues = (item) => ({
  category: item.category,
  title: item.title,
  parent: item.id,
  name: "",
  email: "",
  contact: "",
  company: "",
  department: "",
  privacy: false,
});

const messages = {
  ko: {
    categoryRequired: "요청 파일 카테고리가 넘어오지 않았습니다.",
    titleRequired: "요청 파일 제목이 넘어오지 않았습니다.",
    parentRequired: "요청 파일 아이디값이 넘어오지 않았습니다.",
    nameRequired: "이름을 입력해주세요.",
    emailRequired: "이메일을 입력해주세요.",
    emailInvalid: "이메일 형식이 올바르지 않습니다.",
    contactRequired: "연락처를 입력해주세요.",
    companyRequired: "회사를 입력해주세요.",
    departmentRequired: "부서를 입력해주세요.",
    privacyRequired: "개인정보 수집 및 이용에 동의해주세요.",
  },
  en: {
    categoryRequired: "File category is required.",
    titleRequired: "File title is required.",
    parentRequired: "File ID is required.",
    nameRequired: "Please enter your name.",
    emailRequired: "Please enter your email.",
    emailInvalid: "Invalid email format.",
    contactRequired: "Please enter your contact number.",
    companyRequired: "Please enter your company.",
    departmentRequired: "Please enter your department.",
    privacyRequired: "Please agree to the privacy policy.",
  },
};

export const downloadRequestFormScheme = (lang) => {
  const msg = messages[lang];
  return z.object({
    category: z.string().min(1, { message: msg.categoryRequired }),
    title: z.string().min(1, { message: msg.titleRequired }),
    parent: z.number().min(1, { message: msg.parentRequired }),
    name: z.string().min(1, { message: msg.nameRequired }),
    email: z.string().min(1, { message: msg.emailRequired }).email({ message: msg.emailInvalid }),
    contact: z.string().min(1, { message: msg.contactRequired }),
    company: z.string().min(1, { message: msg.companyRequired }),
    department: z.string().min(1, { message: msg.departmentRequired }),
    privacy: z.boolean().refine((data) => data === true, {
      message: msg.privacyRequired,
    }),
  });
};
