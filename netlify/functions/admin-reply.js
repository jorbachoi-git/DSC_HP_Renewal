const { neon } = require("@neondatabase/serverless");
const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// .env 로딩
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

  // --- JWT 인증 시작 ---
  try {
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "인증 토큰이 필요합니다." }),
      };
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not set.");

    jwt.verify(token, jwtSecret);
  } catch (error) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "유효하지 않거나 만료된 토큰입니다." }),
    };
  }
  // --- JWT 인증 끝 ---

  try {
    const body = JSON.parse(event.body);
    const inquiryId = body.inquiryId || body.id;
    const reply = body.reply;

    if (!inquiryId || !reply) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "필수 항목(inquiryId, reply)을 입력해주세요",
        }),
      };
    }

    if (!process.env.DATABASE_URL) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "DB 연결 설정이 필요합니다." }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      UPDATE inquiries 
      SET reply = ${reply}
      WHERE id = ${inquiryId}
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
