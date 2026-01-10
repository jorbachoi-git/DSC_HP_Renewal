const { neon } = require("@neondatabase/serverless");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" }),
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // 모든 문의 조회 (미답변 포함)
    const rows = await sql`
      SELECT id, name, message, reply, created_at 
      FROM inquiries 
      ORDER BY created_at DESC
    `;

    // 클라이언트 측 이름 마스킹: 첫글자*처리 (예: "김**")
    const maskedRows = rows.map((row) => ({
      id: row.id,
      name: maskName(row.name),
      message: row.message,
      reply: row.reply,
      created_at: row.created_at,
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(maskedRows),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "조회 실패" }),
    };
  }
};

// 이름 마스킹 함수
function maskName(fullName) {
  if (!fullName || fullName.length < 2) return "****";

  // 한글 처리 (예: "김민준" → "김**")
  const firstChar = fullName[0];
  const masked = "*".repeat(fullName.length - 1);
  return firstChar + masked;
}
