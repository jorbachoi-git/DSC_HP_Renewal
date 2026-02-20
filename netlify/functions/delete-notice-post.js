const { neon } = require("@neondatabase/serverless");
const jwt = require("jsonwebtoken");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

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

  try {
    const { id } = JSON.parse(event.body);

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "ID is required for deletion" }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`DELETE FROM notice_posts WHERE id = ${id}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "게시글이 삭제되었습니다." }),
    };
  } catch (error) {
    console.error("Delete Notice Post Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "서버 오류가 발생했습니다." }),
    };
  }
};
