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

  const { id, skipIncrement } = event.queryStringParameters || {};
  if (!id) {
    return { statusCode: 400, headers, body: "Missing ID" };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    if (skipIncrement !== "true") {
      await sql`UPDATE notice_posts SET view_count = view_count + 1 WHERE id = ${id}`;
    }

    const rows = await sql`SELECT * FROM notice_posts WHERE id = ${id}`;

    if (rows.length === 0) {
      return { statusCode: 404, headers, body: "Post not found" };
    }

    return { statusCode: 200, headers, body: JSON.stringify(rows[0]) };
  } catch (error) {
    console.error("Error fetching Notice detail:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch Notice detail" }),
    };
  }
};
