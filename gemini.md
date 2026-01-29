# Project Context: DongSuh Chemical (DSC) Homepage

## 1. Project Overview

- **Subject**: 동서화학(DSC) 기업 홈페이지 및 관리자 대시보드 개발
- **Type**: Static Web Site + Serverless Backend
- **Key Features**: 
  - 제품 소개 및 상세 정보 모달
  - MSDS 자료실 (개별 PDF 및 Google Drive 통합 다운로드)
  - 고객 문의 시스템 (공개/비공개 설정, 비밀번호 통한 상세 조회)
  - 관리자 대시보드 (문의 답변 관리, MSDS 게시물 CRUD)
  - 다국어 지원 (한/영) 및 카카오맵 API 연동

## 2. Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend**: Netlify Functions (Node.js), jsonwebtoken, bcryptjs
- **Database**: Neon (PostgreSQL)
- **Hosting**: Netlify

## 3. File Structure & Key Files

- `index.html`: 메인 홈페이지. 고객용 UI, 제품 소개, 문의 등록 폼 포함.
- `admin.html`: 관리자 대시보드. 미답변 문의 확인 및 답변, MSDS 게시물 관리 기능.
- `src/script.js`: 메인 홈페이지의 프론트엔드 로직 (API 호출, UI 인터랙션, 상태 관리).
- `netlify/functions/`: 백엔드 API 로직
  - `login.js`: 관리자 비밀번호를 검증하고 인증 토큰(JWT)을 발급.
  - `submit-inquiry.js`: 고객 문의를 DB에 저장.
  - `get-public-list.js`: 공개된 문의 목록을 조회.
  - `get-inquiry-detail.js`: 특정 문의의 상세 정보 조회.
  - `verify-password.js`: 문의 상세 확인을 위한 비밀번호 검증.
  - `admin-reply.js`: (토큰 인증) 관리자 답변을 DB에 등록/업데이트.
  - `get-msds-list.js`: MSDS 게시판 목록 조회.
  - `get-msds-detail.js`: MSDS 게시글 상세 조회.
  - `create-msds-post.js`: (토큰 인증) MSDS 게시글 생성.
  - `update-msds-post.js`: (토큰 인증) MSDS 게시글 수정.
  - `delete-inquiry.js`: (토큰 인증) 문의 삭제.
  - `delete-msds-post.js`: (토큰 인증) MSDS 게시글 삭제.

## 4. Coding Conventions & Rules

### A. Style (CSS)

- **Primary Color**: `#008b8b` (Teal)
- **Design Principle**: 반응형 웹 (Mobile First), 시니어 계층을 고려한 큰 폰트와 입력창.
- **Components**:
  - 모달 팝업 (`.custom-modal`)
  - 아코디언 메뉴 (모바일 네비게이션, 문의 상세 내용)

### B. Security

- **XSS Prevention**: 모든 사용자 입력 데이터 출력 시 `sanitizeHTML()` 함수 필수 사용.
- **Privacy**: 공개 목록 조회 시 이름은 반드시 마스킹 처리 (`김**`).
- **Authentication**: 관리자 인증은 JWT(JSON Web Token) 기반으로 처리. 비밀번호는 해시(bcrypt)하여 Netlify 환경 변수(`ADMIN_PASSWORD_HASH`)에 저장하며, 토큰 서명에는 별도의 비밀 키(`JWT_SECRET`)를 사용. 평문 비밀번호는 코드나 DB에 저장되지 않음.

### C. JavaScript Logic

- **API Calls**: `fetch` API 사용, `API_BASE` 상수로 경로 관리.
- **Error Handling**: `try-catch` 블록 사용, 사용자에게는 `showStatus` 또는 커스텀 모달로 피드백 제공.

## 5. 유지보수 및 테스트 주요 관점

- **환경 변수 관리**: `ADMIN_PASSWORD_HASH`와 `JWT_SECRET`은 Netlify 환경 변수를 통해 안전하게 관리되어야 함.
- **데이터 흐름**: 사용자 문의 등록부터 관리자 답변까지의 전체 데이터 흐름 및 DB 상태 변화 추적.
- **UI/UX**: 모바일, 태블릿, 데스크탑 환경에서의 반응형 UI/UX 일관성 검증.
- **API 안정성**: Netlify Functions와 Neon DB 간의 연결 및 각 API 엔드포인트의 응답/에러 처리 안정성 확인.
- **보안**: XSS, 토큰 인증 등 보안 규칙 준수 여부 지속적 검토.

---

이 문맥을 바탕으로 코드 분석 및 제안을 수행하시오.
## 6. Gemini CLI 작업 관련

- **Stitch 산출물 관리**: Stitch를 통해 생성된 UI 디자인 및 HTML 코드는 프로젝트 루트에 생성된 `stitch-sandbox` 폴더에 저장한 후 실험 및 최종 프로젝트 통합에 활용합니다. 산출물은 제공되는 다운로드 링크를 통해 수동으로 `stitch-sandbox` 폴더에 저장해야 합니다.
