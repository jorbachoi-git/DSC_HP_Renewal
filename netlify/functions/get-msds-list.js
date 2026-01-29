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

  const { keyword } = event.queryStringParameters;

  try {
    const sql = neon(process.env.DATABASE_URL);
    let rows;

    if (keyword) {
      const searchPattern = `%${keyword}%`;
      rows = await sql`
        SELECT id, title, author_name, view_count, is_notice, created_at 
        FROM msds_posts 
        WHERE title ILIKE ${searchPattern} OR content ILIKE ${searchPattern}
        ORDER BY is_notice DESC, created_at DESC
      `;
    } else {
      rows = await sql`
        SELECT id, title, author_name, view_count, is_notice, created_at 
        FROM msds_posts 
        ORDER BY is_notice DESC, created_at DESC
      `;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error("Error fetching MSDS list:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to fetch MSDS list" }),
    };
  }
};
