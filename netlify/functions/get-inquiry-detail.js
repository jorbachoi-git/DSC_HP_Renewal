const { neon } = require("@neondatabase/serverless");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");

// .env 로딩
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
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { id, password } = JSON.parse(event.body);

    if (!id || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "ID와 비밀번호가 필요합니다." }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);
    const results = await sql`SELECT * FROM inquiries WHERE id = ${id}`;

    if (results.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "해당 문의를 찾을 수 없습니다." }),
      };
    }

    const record = results[0];
    const isMatch = await bcrypt.compare(password, record.password_hash);

    if (!isMatch) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "비밀번호가 일치하지 않습니다." }),
      };
    }

    // 비밀번호 해시를 제외한 상세 정보 반환
    const { password_hash, ...detail } = record;
    return { statusCode: 200, headers, body: JSON.stringify(detail) };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "서버 오류" }) };
  }
};
