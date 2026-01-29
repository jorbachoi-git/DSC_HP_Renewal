// src/script.js

const API_BASE = "/.netlify/functions";

// 1. 양식 제출
document.getElementById("inquiryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = e.target.querySelector("button[type='submit']");
  const originalBtnText = submitBtn.textContent;

  const form = e.target;
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
    password: document.getElementById("password").value,
  };

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "처리중...";

    const response = await fetch(`${API_BASE}/submit-inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // 응답을 먼저 텍스트로 받아서 확인 (JSON 파싱 에러 방지 및 디버깅)
    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      // JSON이 아니면 서버가 보낸 에러 메시지(텍스트)를 그대로 출력
      throw new Error(responseText || "서버 응답 형식이 올바르지 않습니다.");
    }

    if (response.ok) {
      showStatus("submitStatus", "✓ 문의가 등록되었습니다", "success");
      form.reset();

      // 1초 후 공개 목록 새로고침
      setTimeout(() => loadPublicList(), 1000);
    } else {
      showStatus(
        "submitStatus",
        `✗ ${result.error || result.message || "오류 발생"}`,
        "error",
      );
    }
  } catch (error) {
    showStatus("submitStatus", `✗ 오류: ${error.message}`, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
});

// 2. 공개 목록 조회 및 더보기 기능
let allInquiries = []; // 전체 데이터 저장
let visibleCount = 5; // 처음에 보여줄 개수
const ITEMS_PER_PAGE = 5; // 더보기 클릭 시 추가될 개수

async function loadPublicList() {
  try {
    const response = await fetch(`${API_BASE}/get-public-list`);
    allInquiries = await response.json();

    // 초기화
    visibleCount = ITEMS_PER_PAGE;
    renderPublicList();
  } catch (error) {
    console.error("List load error:", error);
    document.getElementById("publicList").innerHTML =
      '<tr><td colspan="3" style="text-align:center;color:red;padding:20px;">목록을 불러오는 중 오류가 발생했습니다.</td></tr>';
  }
}

function renderPublicList() {
  const container = document.getElementById("publicList");
  const loadMoreContainer = document.getElementById("loadMoreContainer");

  if (allInquiries.length === 0) {
    container.innerHTML =
      '<tr><td colspan="3" style="text-align:center;color:#999;padding:20px;">등록된 문의가 없습니다</td></tr>';
    if (loadMoreContainer) loadMoreContainer.style.display = "none";
    return;
  }

  // 현재 보여줄 데이터 슬라이싱
  const visibleItems = allInquiries.slice(0, visibleCount);

  container.innerHTML = visibleItems
    .map(
      (q) => `
      <tr onclick="toggleInquiryDetail(${
        q.id
      })" style="cursor: pointer;" class="inquiry-row">
        <td class="text-left">
            <div class="truncate-text" title="${sanitizeHTML(q.message)}">
                ${sanitizeHTML(q.message)}
            </div>
        </td>
        <td>${maskName(q.name)}</td>
        <td>${new Date(q.created_at).toLocaleDateString("ko-KR")}</td>
      </tr>
      <!-- 상세 내용 행 (숨김 상태로 시작) -->
      <tr id="detail-row-${q.id}" class="detail-row" style="display: none;">
        <td colspan="3" class="detail-cell">
            <div id="detail-content-${q.id}" class="detail-content">
                <!-- 비밀번호 입력 폼 -->
                <div class="inline-verify-box">
                    <p>🔒 내용을 확인하려면 비밀번호를 입력하세요</p>
                    <form onsubmit="handleInlineVerify(event, ${q.id})">
                        <input type="password" id="pass-${
                          q.id
                        }" placeholder="비밀번호" required />
                        <button type="submit">확인</button>
                    </form>
                    <div id="msg-${q.id}" class="status-message"></div>
                </div>
            </div>
        </td>
      </tr>
    `,
    )
    .join("");

  // 더보기 버튼 표시 여부 제어
  if (visibleCount < allInquiries.length) {
    loadMoreContainer.style.display = "block";
  } else {
    loadMoreContainer.style.display = "none";
  }
}

// 아코디언 토글 함수
window.toggleInquiryDetail = function (id) {
  const row = document.getElementById(`detail-row-${id}`);
  const isHidden = row.style.display === "none";

  // 다른 모든 상세 행 닫기 (하나만 펼치기 모드)
  document
    .querySelectorAll(".detail-row")
    .forEach((r) => (r.style.display = "none"));

  // 클릭한 행 토글
  if (isHidden) {
    row.style.display = "table-row";
    // 비밀번호 입력창에 포커스
    setTimeout(() => {
      const passInput = document.getElementById(`pass-${id}`);
      if (passInput) passInput.focus();
    }, 100);
  }
};

// 인라인 비밀번호 검증 및 상세 조회 함수
window.handleInlineVerify = async function (e, id) {
  e.preventDefault();
  const passInput = document.getElementById(`pass-${id}`);
  const msgDiv = document.getElementById(`msg-${id}`);
  const contentDiv = document.getElementById(`detail-content-${id}`);
  const btn = e.target.querySelector("button");
  const password = passInput.value;

  try {
    btn.disabled = true;
    btn.textContent = "확인중...";
    msgDiv.textContent = "";
    msgDiv.className = "status-message";

    // 1. 비밀번호 검증 요청
    const verifyRes = await fetch(`${API_BASE}/verify-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (!verifyRes.ok) {
      const err = await verifyRes.json();
      throw new Error(err.error || "비밀번호가 일치하지 않습니다.");
    }

    // 2. 상세 내용 요청
    const detailRes = await fetch(`${API_BASE}/get-inquiry-detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });

    if (!detailRes.ok) throw new Error("상세 정보를 불러오는데 실패했습니다.");
    const inquiry = await detailRes.json();

    // 3. 상세 내용 렌더링 (폼을 내용으로 교체)
    contentDiv.innerHTML = `
            <div class="inquiry-full-details">
                <div class="detail-header">
                    <strong>📝 문의 상세 내용</strong>
                    <span style="color:#888; font-size:0.9rem;">${new Date(
                      inquiry.created_at,
                    ).toLocaleString("ko-KR")}</span>
                </div>
                <div class="detail-meta">
                    <span><strong>작성자:</strong> ${
                      inquiry.name
                    }</span> &nbsp;|&nbsp; 
                    <span><strong>이메일:</strong> ${inquiry.email}</span>
                    ${
                      inquiry.phone
                        ? `&nbsp;|&nbsp; <span><strong>연락처:</strong> ${inquiry.phone}</span>`
                        : ""
                    }
                </div>
                <div class="detail-body">
                    ${sanitizeHTML(inquiry.message)}
                </div>
                ${
                  inquiry.reply
                    ? `
                    <div class="reply-box">
                        <div class="reply-label">💬 관리자 답변</div>
                        <div class="reply-content">${sanitizeHTML(
                          inquiry.reply,
                        )}</div>
                    </div>
                `
                    : '<div class="no-reply">⏳ 아직 답변이 등록되지 않았습니다.</div>'
                }
            </div>
        `;
  } catch (error) {
    msgDiv.textContent = `✗ ${error.message}`;
    msgDiv.className = "status-message error";
    btn.disabled = false;
    btn.textContent = "확인";
  }
};

// 3. MSDS 게시판 기능
async function loadMsdsList(keyword = "") {
  const tbody = document.getElementById("msdsListBody");
  if (!tbody) return;

  try {
    let url = `${API_BASE}/get-msds-list`;
    if (keyword) {
      url += `?keyword=${encodeURIComponent(keyword)}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText}`);
    }

    const posts = await response.json();

    if (posts.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" style="padding:20px; text-align:center;">등록된 게시물이 없습니다.</td></tr>';
      return;
    }

    tbody.innerHTML = posts
      .map((post) => {
        const date = new Date(post.created_at).toLocaleDateString("ko-KR");
        const noticeBadge = post.is_notice
          ? '<span class="badge-notice">공지사항</span>'
          : "";
        const rowClass = post.is_notice ? 'class="notice"' : "";

        return `
        <tr ${rowClass} onclick="viewMsdsPost(${post.id})" style="cursor: pointer;">
          <td>${post.id}</td>
          <td class="title">
            ${noticeBadge}
            ${sanitizeHTML(post.title)}
          </td>
          <td>${post.author_name}</td>
          <td>${date}</td>
          <td>${post.view_count}</td>
        </tr>
      `;
      })
      .join("");

    // 게시물 총 개수 업데이트 (선택 사항)
    const totalEl = document.querySelector(".board-total span");
    if (totalEl) totalEl.textContent = `${posts.length}건`;
  } catch (error) {
    console.error("MSDS Load Error:", error);
    tbody.innerHTML =
      '<tr><td colspan="5" style="padding:20px; text-align:center; color:red;">목록을 불러오지 못했습니다.</td></tr>';
  }
}

window.viewMsdsPost = async function (id) {
  try {
    const response = await fetch(`${API_BASE}/get-msds-detail?id=${id}`);
    const post = await response.json();

    if (!response.ok) throw new Error("Failed to load post");

    document.getElementById("msds-detail-title").innerHTML = sanitizeHTML(
      post.title,
    );
    document.getElementById("msds-detail-author").innerText =
      "작성자: " + post.author_name;
    document.getElementById("msds-detail-date").innerText =
      "작성일: " + new Date(post.created_at).toLocaleDateString("ko-KR");
    document.getElementById("msds-detail-views").innerText =
      "조회수: " + post.view_count;
    document.getElementById("msds-detail-content").innerHTML = post.content; // HTML 컨텐츠 허용

    navigateTo("msds-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    alert("게시글을 불러오는 중 오류가 발생했습니다.");
    console.error(error);
  }
};

// 유틸리티 함수
function showStatus(elementId, message, type) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.className = `status-message ${type}`;
}

function sanitizeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function maskName(name) {
  if (!name) return "";
  if (name.length <= 1) return name;
  return name.charAt(0) + "*".repeat(name.length - 1);
}

// 페이지 로드 시 공개 목록 표시
document.addEventListener("DOMContentLoaded", () => {
  loadPublicList();
  loadMsdsList(); // MSDS 목록 로드 추가

  // MSDS 검색 기능 연결
  const searchForm = document.querySelector(".board-search");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지
      const keyword = document.getElementById("keyword").value;
      loadMsdsList(keyword);
    });
  }

  // 더보기 버튼 이벤트 연결
  document.getElementById("btnLoadMore").addEventListener("click", () => {
    visibleCount += ITEMS_PER_PAGE;
    renderPublicList();
  });
});
