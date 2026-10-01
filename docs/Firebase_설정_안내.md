# Firebase 설정 안내 (사용자 수행)

연구관리 통합대장 3단계 / 작성 2026.10.01.
순서대로 진행 후 **D. 회신 항목** 전달 필요.

---

## A. Firebase 콘솔 (https://console.firebase.google.com)

### 1. 프로젝트 생성
- [프로젝트 추가] → 이름 예: `khepi-research-ledger`
- Google 애널리틱스: 사용 안 함
- 생성 후 표시되는 **프로젝트 ID** 기록 (D 회신 항목)

### 2. 요금제 확인 (확인 필요)
- 2024.10. Firebase 공지 기준: 새 프로젝트에서 Storage(근거 파일) 기본 버킷 생성 시 **Blaze(종량제) 요금제 필요**
  - 이 안내는 공지 내용 기준 / 콘솔 Storage 화면에서 실제 요구 여부 확인 필요
- 서울 리전(asia-northeast3) Storage 는 무료 사용량 대상 리전이 아님 → 소량 사용 시에도 저장·전송량 만큼 과금 (월 수백 원~수천 원 수준 예상, 사용량에 따라 상이)
- Firestore·Authentication 은 무료 사용량 범위 내 운영 가능 예상
- Blaze 전환 시 결제 계정(카드) 등록 필요 → **기관 결제 승인 여부 확인 필요**
- 예산 알림: Google Cloud 콘솔 → 결제 → 예산 및 알림 (예: 월 1만 원 알림) 설정 권장
- Blaze 불가 시: 근거 파일(6단계)만 보류하고 나머지 기능 진행 가능 → 회신 시 알림

### 3. Authentication (로그인)
- 빌드 → Authentication → [시작하기]
- Sign-in method → **Google** → 사용 설정 → 프로젝트 지원 이메일 선택 → 저장
- 다른 로그인 방식(이메일/비밀번호 등)은 **사용 안 함**
- 설정 → **승인된 도메인** → [도메인 추가] → `<GitHub 계정>.github.io`
  - `localhost` 는 기본 포함 (로컬 확인용)

### 4. Firestore Database (데이터)
- 빌드 → Firestore Database → [데이터베이스 만들기]
- 위치: **asia-northeast3 (서울)** — 생성 후 변경 불가
- 보안 규칙: **프로덕션 모드**

### 5. Storage (근거 파일)
- 빌드 → Storage → [시작하기]
- 위치: **asia-northeast3 (서울)** (Firestore 와 동일)
- 보안 규칙: **프로덕션 모드**
- 2번 요금제 단계에서 보류한 경우 생략

### 6. 웹 앱 등록 (접속 정보)
- 프로젝트 개요 옆 톱니바퀴 → 프로젝트 설정 → 일반 → 내 앱 → 웹(`</>`) 아이콘
- 앱 닉네임 예: `ledger-web` / Firebase Hosting **체크 안 함**
- 표시되는 `firebaseConfig` 6개 값 기록 (7·10번에 사용)
  ```
  apiKey / authDomain / projectId / storageBucket / messagingSenderId / appId
  ```
- 이 값은 웹에 공개되는 식별자 (비밀번호 아님) / 접근 통제는 보안 규칙이 담당

### 7. 최초 관리자 등록 (권한 목록)
- Firestore Database → 데이터 → [컬렉션 시작]
- 컬렉션 ID: `config` → 문서 ID: `access`
- 필드 4개 추가

| 필드 | 유형 | 값 |
|---|---|---|
| `admins` | array | 본인 Google 이메일 1개 (**소문자**로 입력) |
| `editors` | array | (빈 배열) |
| `viewers` | array | (빈 배열) |
| `membersPrivateEnabled` | boolean | `false` |

- 이후 사용자 추가·권한 변경은 앱 [관리] 화면에서 처리
- `membersPrivateEnabled`: 위원 실명·생년월일 저장 허용 여부
  - **정보보안 담당 확인 전까지 false 유지** → 앱에서 실명 저장 불가 (보안 규칙으로 차단)
  - 확인 후에만 콘솔에서 true 로 변경 (앱 화면에서는 변경 불가)

---

## B. 내 PC (로컬 실행)

### 8. 준비
- Node.js 22 LTS 설치 (https://nodejs.org)
- 저장소 내려받기 → 폴더에서 `npm ci`

### 9. 접속 정보 파일
- `.env.example` 을 복사해 `.env.local` 생성 → 6번 값 입력
  ```
  VITE_FB_API_KEY=...
  VITE_FB_AUTH_DOMAIN=...
  VITE_FB_PROJECT_ID=...
  VITE_FB_STORAGE_BUCKET=...
  VITE_FB_MESSAGING_SENDER_ID=...
  VITE_FB_APP_ID=...
  ```
- `.env.local` 은 git 제외 대상 (저장소에 올라가지 않음)

### 10. 보안 규칙 배포
- firebase-tools 는 프로젝트에 포함되어 있어 전역 설치 불필요 (`npx firebase` 사용)
  ```
  npx firebase login
  npx firebase use --add        # 1번 프로젝트 선택, 별칭(alias): default
  npx firebase deploy --only firestore:rules,storage
  ```
- Storage 규칙이 Firestore 권한 목록을 조회하므로, 배포 중 **"Storage 가 Firestore 에 접근하도록 권한 부여"** 질문 표시 → `Y`
- 배포 완료 메시지 확인 (`Deploy complete!`)

### 11. 로그인 확인
- `npm run dev` → 브라우저에서 표시 주소 접속 (예: http://localhost:5173/-/)
- [Google 계정으로 로그인] → 7번에 등록한 계정으로 로그인
- 정상: 상단바에 이름과 "관리자" 표시 / [관리] 화면 진입 가능
- 다른(미등록) 계정 로그인 시 "접근 권한 없음" 표시 확인

---

## C. GitHub (9단계 배포 때 진행, 미리 해도 무방)
- Settings → Secrets and variables → Actions → 9번 6개 값을 같은 이름으로 등록
- Settings → Pages → Source: **GitHub Actions**
- 저장소 비공개 권장

---

## D. 회신 항목
1. 프로젝트 ID
2. 요금제: Blaze 전환 여부 (Storage 생성 가능 여부)
3. 10번 규칙 배포 결과 (성공 / 오류 메시지)
4. 11번 로그인 확인 결과 (관리자 표시 여부, 미등록 계정 차단 여부)
5. 정보보안 담당 확인 일정 (위원 실명·생년월일, 비공개 과제 원문)

---

## 참고: 개발자 확인용 (콘솔 작업 불필요)
- `npm test` — domain 단위 테스트
- `npm run test:rules` — 보안 규칙 테스트 (Java 11 이상 필요, 결과표: `docs/보안규칙_테스트결과.md`)
- `npm run emulators` + `.env.local` 에 `VITE_FB_USE_EMULATOR=true` — 실제 프로젝트 없이 로컬 에뮬레이터로 실행
