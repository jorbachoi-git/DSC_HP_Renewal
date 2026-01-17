# Project Context: DongSuh Chemical (DSC) Homepage

## 1. Project Overview

- **Subject**: 동서화학(DSC) 기업 홈페이지 및 관리자 대시보드 개발
- **Type**: Static Web Site + Serverless Backend
- **Key Features**: 제품 소개, MSDS 자료실(Google Drive 연동), 고객 문의(공개/비공개), 관리자 답변 시스템

## 2. Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend**: Netlify Functions (Node.js)
- **Database**: Neon (PostgreSQL)
- **Hosting**: Netlify

## 3. File Structure & Key Files

- `index.html`: 메인 홈페이지. 고객용 UI, 제품 소개, 문의 등록 폼 포함.
- `admin.html`: 관리자 대시보드. 미답변 문의 확인 및 답변 등록 기능.
- `src/script.js`: 메인 홈페이지의 프론트엔드 로직 (문의 등록, 목록 조회, 비밀번호 검증).
- `netlify/functions/`: 백엔드 API 로직
  - `get-public-list.js`: 공개 문의 목록 조회 (이름 마스킹 처리 필수).
  - `submit-inquiry.js`: 문의 등록.
  - `admin-reply.js`: 관리자 답변 등록.

## 4. Coding Conventions & Rules

### A. Style (CSS)

- **Primary Color**: `#008b8b` (Teal)
- **Design Principle**: 반응형 웹 (Mobile First), 시니어 계층을 고려한 큰 폰트와 입력창.
- **Components**:
  - 모달 팝업 (`.custom-modal`)
  - 아코디언 메뉴 (모바일 네비게이션, 문의 상세 내용)

### B. Security

- **XSS Prevention**: 모든 사용자 입력 데이터 출력 시 `sanitizeHTML()` 함수 필수 사용.
- **Privacy**: 공개 목록 조회 시 이름은 반드시 마스킹 처리 (`김**`). 비밀번호는 평문 저장하지 않음 (DB 레벨).

### C. JavaScript Logic

- **API Calls**: `fetch` API 사용, `API_BASE` 상수로 경로 관리.
- **Error Handling**: `try-catch` 블록 사용, 사용자에게는 `showStatus` 또는 커스텀 모달로 피드백 제공.

## 5. Current Debugging Focus

- 문의 등록 및 관리자 답변 프로세스의 데이터 흐름 확인.
- 모바일 환경에서의 UI/UX 개선.
- Netlify Functions와 Neon DB 간의 연결 안정성.

---

이 문맥을 바탕으로 코드 분석 및 제안을 수행하시오.
