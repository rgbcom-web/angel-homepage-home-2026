import { z } from "zod";
import { CONTACT_CATEGORY_LIST, CONTACT_PRODUCT_LIST } from "../../../app/app-constants";

export const defaultValues = (lang) => {
  const values = {
    category: CONTACT_CATEGORY_LIST[lang][0],
    product: CONTACT_PRODUCT_LIST[lang][0],
    name: "",
    email: "",
    contact: "",
    company: "",
    title: "",
    content: "",
    privacy: false,
  };

  if (lang === "en") {
    values.country = "";
  }

  return values;
};

const messages = {
  ko: {
    categoryRequired: "문의 구분을 선택해주세요.",
    nameRequired: "이름을 입력해주세요.",
    emailRequired: "이메일을 입력해주세요.",
    emailInvalid: "이메일 형식이 올바르지 않습니다.",
    contactRequired: "연락처를 입력해주세요.",
    titleRequired: "제목을 입력해주세요.",
    contentRequired: "내용을 입력해주세요.",
    privacy: "개인정보 수집 및 이용에 동의해주세요.",
  },
  en: {
    categoryRequired: "Please select an inquiry type.",
    nameRequired: "Please enter your name.",
    emailRequired: "Please enter your email.",
    emailInvalid: "Invalid email format.",
    countryRequired: "Please enter your country.",
    titleRequired: "Please enter a title.",
    contentRequired: "Please enter your message.",
    privacy: "Please agree to the privacy policy.",
  },
};

export const formScheme = (lang = "ko") => {
  const msg = messages[lang];

  const schemeObject = {
    category: z.string().min(1, { message: msg.categoryRequired }),
    product: z.string().optional(),
    name: z.string().min(1, { message: msg.nameRequired }),
    email: z.string().min(1, { message: msg.emailRequired }).email({ message: msg.emailInvalid }),
    contact: z.string().min(1, { message: msg.contactRequired }),
    company: z.string().optional(),
    title: z.string().min(1, { message: msg.titleRequired }),
    content: z.string().min(1, { message: msg.contentRequired }),
    privacy: z.boolean().refine((data) => data === true, {
      message: msg.privacy,
    }),
  };

  if (lang === "en") {
    schemeObject.contact = z.string().optional();
    schemeObject.country = z.string().min(1, { message: msg.countryRequired });
  }

  return z.object(schemeObject);
};
