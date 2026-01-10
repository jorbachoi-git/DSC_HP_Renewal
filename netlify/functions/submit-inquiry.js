const { neon } = require("@neondatabase/serverless");
const bcrypt = require("bcryptjs");
const path = require("path");

// .env 로딩: 실행 위치(루트) 기준 우선 시도 후, 실패 시 파일 상대 경로 시도
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

exports.handler = async (event, context) => {
  // 1. CORS 헤더 설정 (로컬 개발 및 크로스 도메인 요청 허용)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // 2. Preflight 요청 처리
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // 3. POST 메서드만 허용
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // 4. 데이터 파싱
    const data = JSON.parse(event.body);
    const { name, email, phone, message, password } = data;

    // 필수값 검증
    if (!name || !email || !message || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "필수 항목(이름, 이메일, 내용, 비밀번호)이 누락되었습니다.",
        }),
      };
    }

    // 5. DB 연결
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

    // 5. DB 연결 (HTTP Driver 사용 - Stateless)
    const sql = neon(process.env.DATABASE_URL);

    // 6. 비밀번호 해싱 (보안)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. 데이터 삽입 쿼리 실행
    const rows = await sql`
      INSERT INTO inquiries (name, email, phone, message, password_hash, created_at)
      VALUES (${name}, ${email}, ${
      phone || null
    }, ${message}, ${hashedPassword}, NOW())
      RETURNING id
    `;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "문의가 성공적으로 등록되었습니다.",
        id: rows[0].id,
      }),
    };
  } catch (error) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `서버 오류: ${error.message}` }),
    };
  }
};
