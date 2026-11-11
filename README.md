# 마이링크 (MyLink)

> 나만의 링크 페이지를 30분 만에!

흩어진 포트폴리오·SNS·블로그 링크를 한 페이지에 모아 `mylink/내아이디` 주소 하나로 공유하는 링크트리 클론 서비스입니다.
한양대학교 바이브 코딩 수업 프로젝트로, Nintendo.com(2001) 콘솔 하드웨어 감성의 디자인 시스템을 적용했습니다.

**배포 주소:** https://mylink-one-mu.vercel.app

## 주요 기능

| 기능 | 설명 |
| --- | --- |
| 구글 로그인 | Firebase Authentication 으로 클릭 한 번에 로그인, 첫 로그인 시 프로필 자동 생성 |
| 링크 관리 (CRUD) | 링크 추가 · 인라인 편집 · 삭제 확인 모달, Firestore 실시간 반영 |
| 개인 페이지 | `/[username]` 동적 라우팅, 로그인 없이 누구나 조회 가능 |
| 프로필 수정 | username(공유 URL) · 표시 이름 · 소개글 · 프로필 사진, username 중복 체크 |
| 클릭 통계 | 방문자 클릭 수를 서버에서 안전하게 +1, 마이페이지에서 총 클릭수 · 링크별 순위 확인 |
| 공유 최적화 | OG 태그, 사용자별 동적 OG 이미지, `sitemap.xml`, `robots.txt` |

## 페이지 구성

| 경로 | 설명 |
| --- | --- |
| `/` | 랜딩 페이지 (서비스 소개 · 기능 · 미리보기) |
| `/login` | 구글 로그인 |
| `/mypage` | 마이페이지: 프로필 수정 · 링크 관리 · 클릭 통계 (로그인 필수) |
| `/[username]` | 공개 개인 링크 페이지 |

## 기술 스택

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui (Base UI)
- **Backend (BaaS):** Firebase Authentication, Cloud Firestore
- **Deploy:** Vercel (GitHub `master` push 시 자동 배포)

## 데이터 구조 (Firestore)

```
users/{userId}/profile/info      { username, displayName, bio, avatarUrl }
users/{userId}/links/{linkId}    { title, url, description, clickCount, createdAt, updatedAt }
usernames/{username}             { uid }   ← username 중복 방지 + URL 조회용
```

보안 규칙은 [`firestore.rules`](./firestore.rules) 에 있으며, **읽기는 누구나 / 쓰기는 로그인한 본인만** 가능합니다.
단, 클릭 통계를 위해 방문자는 `clickCount` 를 정확히 +1 하는 것만 허용합니다.

## 로컬에서 실행하기

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

Firebase 웹 설정값은 `src/lib/firebase/client.ts` 에 기본값으로 들어 있습니다.
다른 Firebase 프로젝트를 쓰려면 `.env.example` 을 `.env.local` 로 복사해 값을 채우세요.

### 다른 Firebase 프로젝트로 연결할 때

1. Firebase 콘솔에서 프로젝트 생성 → **Firestore Database** 생성 (리전 `asia-northeast3`)
2. **Authentication → 로그인 방법**에서 Google 사용 설정
3. **Firestore → 규칙**에 `firestore.rules` 내용을 붙여넣고 게시
4. 배포 도메인을 **Authentication → 설정 → 승인된 도메인**에 추가

## 주차별 진행

| 주차 | 내용 |
| --- | --- |
| 1~8주차 | 기획(PRD) · 프로필 페이지 · 디자인 시스템(shadcn/ui) |
| 9주차 | Firebase 연동, Firestore 영구 저장 (Create / Read) |
| 10주차 | 인라인 편집(Update) · 삭제 확인 모달(Delete) |
| 11주차 | 구글 소셜 로그인, 사용자별 데이터 분리 |
| 12주차 | Security Rules, `/[username]` 개인 페이지, 프로필 편집 |
| 13주차 | 클릭 통계 (동시성 안전한 카운트 + 통계 UI) |
| 14주차 | Vercel 배포, 랜딩 페이지, OG 이미지, sitemap |

## License

[MIT](./LICENSE)
