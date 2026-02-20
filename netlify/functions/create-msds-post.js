const { neon } = require("@neondatabase/serverless");
const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }
  
  // --- JWT 인증 시작 ---
  try {
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "인증 토큰이 필요합니다." }) };
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not set.");
    
    jwt.verify(token, jwtSecret);
  } catch (error) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "유효하지 않거나 만료된 토큰입니다." }) };
  }
  // --- JWT 인증 끝 ---

  try {
    // 1. 요청 본문에서 사용자 입력을 파싱합니다.
    const { title, content } = JSON.parse(event.body);

    // 2. 입력값 유효성 검사
    if (!title || !content) {
      return {
        statusCode: 400, // Bad Request
        headers,
        body: JSON.stringify({ error: "필수 항목(제목, 내용)이 누락되었습니다." }),
      };
    }

    // 3. 서버에서 author_name과 is_notice 값을 설정합니다.
    const author_name = "관리자";
    const is_notice = false; // MSDS 게시물이므로 항상 false

    // 4. 데이터베이스에 연결합니다.
    const sql = neon(process.env.DATABASE_URL);

    // 5. 유효성 검사를 통과한 데이터로 INSERT 쿼리를 실행합니다.
    await sql`
      INSERT INTO msds_posts (title, content, author_name, is_notice, created_at, updated_at)
      VALUES (${title}, ${content}, ${author_name}, ${is_notice}, NOW(), NOW())
    `;

    return { statusCode: 200, headers, body: JSON.stringify({ message: "Success" }) };
  } catch (error) {
    console.error("Error creating MSDS post:", error);
    // 500 에러는 유지하되, 유효성 검사 실패 시에는 400 에러가 먼저 반환됩니다.
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Database error: " + error.message }) };
  }
};