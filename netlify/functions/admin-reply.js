const { neon } = require("@neondatabase/serverless");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// .env 로딩: 실행 위치(루트) 기준 우선 시도 후, 실패 시 파일 상대 경로 시도
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  // OPTIONS preflight 요청 처리
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { id, adminPassword, reply } = JSON.parse(event.body);

    // 필수 항목 검증
    if (!id || !reply || !adminPassword) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "필수 항목을 입력해주세요" }),
      };
    }

    // 관리자 비밀번호 검증 (해시 비교로 변경)
    // 로컬 테스트용 Fallback: 환경변수가 없으면 .env의 해시값 사용
    if (!process.env.ADMIN_PASSWORD_HASH) {
      process.env.ADMIN_PASSWORD_HASH =
        "$2a$10$4Abmuigt1LUODvuKFbKXzeZfspuKtYxpuzId/8RbVzzunCkJvqUdy";
    }

    const isMatch = await bcrypt.compare(
      adminPassword,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isMatch) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "관리자 암호가 일치하지 않습니다" }),
      };
    }

    // DB 연결 (로컬 테스트용 하드코딩 포함)
    if (!process.env.DATABASE_URL) {
      console.error("Error: DATABASE_URL is missing");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Server Configuration Error: Missing Database Connection",
        }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);

    // 답글 업데이트
    const result = await sql`
      UPDATE inquiries 
      SET reply = ${reply}
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "해당 문의를 찾을 수 없습니다" }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "답글이 등록되었습니다",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "서버 오류가 발생했습니다" }),
    };
  }
};
