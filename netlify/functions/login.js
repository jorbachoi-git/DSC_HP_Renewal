const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");

// Load .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  console.log('--- Debugging login.js ---');
  console.log('ADMIN_PASSWORD_HASH (from process.env):', process.env.ADMIN_PASSWORD_HASH ? process.env.ADMIN_PASSWORD_HASH.substring(0, 10) + '...' : 'Not Set');
  console.log('JWT_SECRET (from process.env):', process.env.JWT_SECRET ? process.env.JWT_SECRET.substring(0, 10) + '...' : 'Not Set');
  console.log('--- End Debugging login.js ---');

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { password } = JSON.parse(event.body);

    if (!password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Password is required" }),
      };
    }

    // 환경 변수에서 관리자 비밀번호 해시값을 가져옵니다.
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminPasswordHash) {
      console.error(
        "Server configuration error: ADMIN_PASSWORD_HASH is missing.",
      );
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error." }),
      };
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT_SECRET is not set in environment variables.");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Server configuration error: JWT_SECRET is missing.",
        }),
      };
    }

    const isMatch = await bcrypt.compare(password, adminPasswordHash);

    if (!isMatch) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: "Invalid credentials" }),
      };
    }

    // 비밀번호가 일치하면, 1시간 동안 유효한 JWT를 생성합니다.
    const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "1h" });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "An internal server error occurred." }),
    };
  }
};
