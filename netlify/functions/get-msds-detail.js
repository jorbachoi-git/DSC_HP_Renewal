const { neon } = require("@neondatabase/serverless");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  const { id, skipIncrement } = event.queryStringParameters;
  if (!id) {
    return { statusCode: 400, headers, body: "Missing ID" };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // 1. 조회수 증가 (skipIncrement가 없을 때만)
    if (skipIncrement !== 'true') {
      await sql`UPDATE msds_posts SET view_count = view_count + 1 WHERE id = ${id}`;
    }

    // 2. 상세 정보 조회
    const rows = await sql`SELECT * FROM msds_posts WHERE id = ${id}`;

    if (rows.length === 0) {
      return { statusCode: 404, headers, body: "Post not found" };
    }

    return { statusCode: 200, headers, body: JSON.stringify(rows[0]) };
  } catch (error) {
    console.error("Error fetching MSDS detail:", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to fetch MSDS detail" }) };
  }
};