"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { z } from "zod";
import { transformZodErrors } from "@/shared/lib/validation.utils";
import { formScheme } from "../apply-form-scheme";
import { sendAlimMail } from "@/features/form/send-alim-mail";

export async function createApplyRequest(noticeTitle, formData, tableName, pathToRevalidate) {
  try {
    // 유효성 검사
    const validationResult = formScheme.safeParse(formData);
    if (!validationResult.success) {
      throw validationResult.error;
    }

    const { files, ...toInsertData } = validationResult.data;

    const supa = await createAdminClient();

    const query = supa.from(tableName).insert({
      ...toInsertData,
    });

    const { error } = await query.select("*").single();

    if (error) {
      throw error;
    }

    const sendAlimMailResult = await sendAlimMail({
      tableName,
      mailSubject: `[채용지원접수] ${validationResult.data.name}님의 채용지원이 접수되었습니다.`,
      mailBody: getMailBody({ ...validationResult.data, noticeTitle }),
      attachments: files.attachments,
    });

    // 페이지 리렌더링
    pathToRevalidate && revalidatePath(pathToRevalidate);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: transformZodErrors(error),
      };
    }

    return {
      success: false,
      errors: {
        message: error.message || "서버 오류가 발생했습니다.",
      },
    };
  }
}

function getMailBody(data) {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>지원서 접수 알림</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif; color: #333333; line-height: 1.5;">
  <!-- 메인 컨테이너 -->
  <div style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    
    <!-- 헤더 -->
    <div style="background-color: #f1f5f9; padding: 25px 30px;">
      <img src="https://angel-robotics.com/images/common/logo-angel.png" alt="엔젤로보틱스 로고" style="height: 24px; display: block;">
    </div>
    
    <!-- 알림 헤더 -->
    <div style="padding: 25px 30px 5px; border-bottom: 1px solid #e2e8f0;">
      <h1 style="margin: 0; color: #1e293b; font-size: 22px; font-weight: 700;">새 지원서가 접수되었습니다</h1>
    </div>
    
    <!-- 문의 정보 -->
    <div style="padding: 20px 30px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; vertical-align: top; border-bottom: 1px solid #e2e8f0;">채용공고</td>
          <td style="padding: 8px 0; font-weight: 500; border-bottom: 1px solid #e2e8f0;">${data.noticeTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; vertical-align: top; border-bottom: 1px solid #e2e8f0;">이름</td>
          <td style="padding: 8px 0; font-weight: 500; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; vertical-align: top; border-bottom: 1px solid #e2e8f0;">이메일</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; vertical-align: top; border-bottom: 1px solid #e2e8f0;">연락처</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">${data.contact}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; vertical-align: top; border-bottom: 1px solid #e2e8f0;">제목</td>
          <td style="padding: 8px 0; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${data.title}</td>
        </tr>
      </table>
      
      <!-- 문의 내용 -->
      <div style="margin-top: 20px; background-color: #f8fafc; border-radius: 6px; padding: 20px;">
        <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #64748b; font-weight: 600;">내용</h3>
        <div style="line-height: 1.6; color: #334155; white-space: pre-wrap;">${data.content}</div>
      </div>
      
      <!-- 버튼 -->
      <div style="margin-top: 25px; display: flex; gap: 10px;">
        <a href="https://admin.angel-robotics.com" style="display: inline-block; background-color: #2563eb; color: white; font-weight: 600; text-decoration: none; padding: 12px 16px; border-radius: 6px; font-size: 14px; text-align: center; flex: 2;">
          관리자 페이지
        </a>
        <a href="mailto:${data.email}" style="display: inline-block; background-color: white; border: 1px solid #d1d5db; color: #4b5563; font-weight: 600; text-decoration: none; padding: 12px 16px; border-radius: 6px; font-size: 14px; text-align: center; flex: 1;">
          답장하기
        </a>
      </div>
      
      <!-- 알림 -->
      <!--
      <div style="margin-top: 30px; background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; font-size: 14px; color: #92400e;">
        <p style="margin: 0;">
          <strong>참고:</strong> 문의는 48시간 이내 답변을 원칙으로 합니다. 긴급 문의는 우선적으로 처리해 주세요.
        </p>
      </div>
      -->
    </div>
    
    <!-- 푸터 -->
    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px;">
      <p style="margin: 0;">© ANGEL ROBOTICS. 이 메일은 자동으로 발송되었습니다.</p>
    </div>
  </div>
</body>
</html>
  `;
}
