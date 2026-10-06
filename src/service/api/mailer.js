"use server";

import nodemailer from "nodemailer";
import { createAdminClient } from "../db/supabase/server";

const createTransporter = async () => {
  const supa = await createAdminClient();

  const { data, error } = await supa.from("settings_smtp").select("*").single();

  if (error) {
    throw new Error("SMTP 설정을 가져오는 중 오류가 발생했습니다: " + error.message);
  }

  // 포트에 따른 보안 설정 자동 조정
  const port = parseInt(data.smtp_port);
  let secureOption = data.smtp_secure;

  // 일반적인 SMTP 포트에 대한 기본값 설정
  if (port === 465) {
    // 465 포트는 대부분 SSL 필요 (secure: true)
    secureOption = true;
  } else if (port === 587 || port === 25) {
    // 587, 25 포트는 대부분 STARTTLS 사용 (secure: false)
    secureOption = false;
  }

  // 추가 TLS 옵션 설정
  const transporterConfig = {
    host: data.smtp_host,
    port: port,
    secure: secureOption,
    auth: {
      user: data.smtp_user,
      pass: data.smtp_password,
    },
  };

  // STARTTLS가 필요한 경우 (587, 25포트 등)
  if (!secureOption) {
    transporterConfig.tls = {
      ciphers: "SSLv3",
      rejectUnauthorized: false, // 자체 서명 인증서 허용 (필요한 경우)
    };
  }

  return {
    transporter: nodemailer.createTransport(transporterConfig),
    smtpData: data,
  };
};

/**
 * 이메일 전송 함수
 * @param {string} to - 수신자 이메일
 * @param {string} subject - 이메일 제목
 * @param {string} html - 이메일 HTML 내용
 * @param {Array} attachments - 첨부 파일 목록
 * @param {Object} options - 추가 옵션
 * @param {string} options.senderName - 발신자 이름 (기본값 대신 사용)
 * @param {string} options.replyTo - 답장 주소
 * @param {Array} options.cc - 참조 수신자 목록
 * @param {Array} options.bcc - 숨은 참조 수신자 목록
 * @returns {Promise<Object>} 전송 결과
 */
export async function sendmail(to, subject, html, attachments = [], options = {}) {
  try {
    const { transporter, smtpData } = await createTransporter();
    const supa = await createAdminClient();
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;

    // 발신자 이름: 함수 호출 시 제공된 이름 > DB 설정 > 기본값 순으로 사용
    const senderName = options.senderName || smtpData.sender_name || "Angel Robotics";
    const fromEmail = smtpData.smtp_user;

    // File 객체 또는 스토리지 업로드 메타데이터를 nodemailer 형식으로 변환
    const processedAttachments = (
      await Promise.all(
        (attachments || []).filter(Boolean).map(async (file) => {
          if (file instanceof File) {
            const buffer = await file.arrayBuffer();
            return {
              filename: file.name,
              content: Buffer.from(buffer),
              contentType: file.type,
            };
          }

          // 클라이언트에서 이미 업로드된 스토리지 파일
          if (file?.filePath) {
            try {
              const { data, error } = await supa.storage.from(bucket).download(file.filePath);

              if (error || !data) {
                console.error("메일 첨부 다운로드 실패:", file.filePath, error);
                return null;
              }

              return {
                filename: file.originalName || file.filePath.split("/").pop(),
                content: Buffer.from(await data.arrayBuffer()),
              };
            } catch (downloadError) {
              console.error("메일 첨부 다운로드 오류:", file.filePath, downloadError);
              return null;
            }
          }

          return file;
        }),
      )
    ).filter(Boolean);

    const mailData = {
      from: `${senderName} <${fromEmail}>`,
      to: Array.isArray(to) ? to.join(",") : to, // 수신자 처리 개선 (다수 수신자 처리)
      subject,
      html,
      attachments: processedAttachments,
      // 추가 옵션 설정
      ...(options.replyTo && { replyTo: options.replyTo }),
      ...(options.cc && { cc: options.cc }),
      ...(options.bcc && { bcc: options.bcc }),
    };

    const result = await transporter.sendMail(mailData);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("메일 발송 오류:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// 메일 발송 테스트 함수
export async function testSmtpConnection() {
  try {
    const { transporter, smtpData } = await createTransporter();

    // SMTP 연결 테스트만 수행
    await transporter.verify();
    return { success: true, message: "SMTP 연결이 정상적으로 작동합니다." };
  } catch (error) {
    return {
      success: false,
      message: "SMTP 연결 테스트 실패",
      error: error.message,
    };
  }
}
