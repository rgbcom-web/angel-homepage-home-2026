import { z } from "zod";

export const donationFormDefaultValues = (item) => ({
  name: "",
  email: "",
  contact: "",
  privacy: false,
});

export const donationFormScheme = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식이 올바르지 않습니다." }),
  contact: z.string().min(1, { message: "연락처를 입력해주세요." }),
  privacy: z.boolean().refine((data) => data === true, {
    message: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});
