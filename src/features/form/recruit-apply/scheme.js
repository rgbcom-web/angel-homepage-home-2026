import { z } from "zod";
import { fileDataSchema, filesFieldSchema } from "@/shared/schema/schema";

export const defaultValues = {
  name: "",
  email: "",
  contact: "",
  title: "",
  content: "",
  attachments: null,
  files: {
    attachments: null,
  },
  privacy_required: false,
  privacy_optional: false,
  privacy_sensitive: false,
};

export const formScheme = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식이 올바르지 않습니다." }),
  contact: z.string().min(1, { message: "연락처를 입력해주세요." }),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." }),
  attachments: fileDataSchema({ isArray: true }),
  files: filesFieldSchema({
    attachments: {
      isArray: true,
      requiredLimit: 1,
      size: 20,
      extentions: {
        value: ["jpg", "png", "gif", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "hwp"],
        message: "첨부파일은 이미지, 문서 (doc, hwp, pdf 등) 파일만 첨부 가능합니다.",
      },
    },
  }),
  privacy_required: z.boolean().refine((data) => data === true, {
    message: "개인정보 수집 및 이용에 동의해주세요.",
  }),
  privacy_optional: z.boolean().optional(),
  privacy_sensitive: z.boolean().optional(),
});
