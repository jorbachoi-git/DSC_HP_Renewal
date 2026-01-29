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
    const { title, is_notice, content } = JSON.parse(event.body);
    const author_name = "관리자"; // Set author name to '관리자' on the backend

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO msds_posts (title, content, author_name, is_notice, created_at, updated_at)
      VALUES (${title}, ${content}, ${author_name}, ${is_notice || false}, NOW(), NOW())
    `;

    return { statusCode: 200, headers, body: JSON.stringify({ message: "Success" }) };
  } catch (error) {
    console.error("Error creating MSDS post:", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Database error: " + error.message }) };
  }
};