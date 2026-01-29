const { neon } = require("@neondatabase/serverless");
const jwt = require("jsonwebtoken");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const { getAll } = event.queryStringParameters || {};

    let rows;

    if (getAll === "true") {
      // 관리자 요청: JWT 인증 검증
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

      try {
        jwt.verify(token, jwtSecret);
      } catch (e) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "유효하지 않은 토큰입니다." }),
        };
      }

      // 관리자는 모든 컬럼(이메일, 연락처 포함) 조회
      rows = await sql`SELECT * FROM inquiries ORDER BY created_at DESC`;
    } else {
      // 일반 사용자 요청: 민감 정보(이메일, 연락처, 비밀번호 등) 제외하고 조회
      rows =
        await sql`SELECT id, name, message, reply, created_at FROM inquiries ORDER BY created_at DESC`;
    }

    return { statusCode: 200, headers, body: JSON.stringify(rows) };
  } catch (error) {
    console.error("Get List Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "서버 오류가 발생했습니다." }),
    };
  }
};
