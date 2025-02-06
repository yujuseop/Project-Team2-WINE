# Project-Team2-WINE

<br/>
<br/>

# 0. Getting Started (시작하기)

```bash
$ npm run dev
$ npm run build
$ npm run
```

[서비스 링크 x]()

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

- 프로젝트 이름: WHYNE
- 프로젝트 설명: 와인 추천 및 리뷰 서비스

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

|                                                                         강동욱                                                                         |                                                                         강동우                                                                         |                                                                                                         유주섭                                                                                                         |                                                                             이승환                                                                              |                                                                         정혜연                                                                         |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://i.namu.wiki/i/o81kFfad6uoV0sN0iGSqA3hEKyIniZUhP7VBq2dI3WeyOFalhAEa_lQ_SY0GEbC_oJ4qzLlKokalWFk6cx86vg.webp" alt="강동욱" width="150"> | <img src="https://i.namu.wiki/i/hWLEwQhnjvdoRZQhrgHMKAZjiSVPO5D86_nBD6OCVLHamm0dM7Ssv2KTfYgjJj-V_X3hMsgV-LeIgI7lmbqzhA.webp" alt="강동우" width="150"> | <img src="https://i.namu.wiki/i/BI-Q8xHjYIpLmksHyJ_kzopza0YHAAiMe8bijku1ZU-MN-f6oVv-OG5vBXlugtEtBldC_WDJi9v-E3JYUtCCHohE7lZ1W75NP57fBYBBRFQ7Amn3AXxeDIwXNPRz0pQNJUFVJwezFQ2UnzTy7_Aaww.webp" alt="유주섭" width="150"> | <img src="https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png" alt="이승환" width="150"> | <img src="https://i.namu.wiki/i/qWyoh8nA_DcTuY4gqcmkFC2k5Sbn8D6yVCVRQHMhJD-eRYtugUDNg6jP-v0VqbnFdCjL4jYrepNXw9ey8ouFAA.webp" alt="정혜연" width="150"> |
|                                                                           FE                                                                           |                                                                           FE                                                                           |                                                                                                           FE                                                                                                           |                                                                               FE                                                                                |                                                                           FE                                                                           |
|                                                          [GitHub](https://github.com/ko777y)                                                           |                                                         [GitHub](https://github.com/ghkjiop92)                                                         |                                                                                         [GitHub](https://github.com/yujuseop)                                                                                          |                                                            [GitHub](https://github.com/mynameishwan)                                                            |                                                         [GitHub](https://github.com/yeon0036)                                                          |

<br/>
<br/>

# 3. Key Features (주요 기능)

- **회원가입**:

  - 회원가입 시 DB에 유저정보가 등록됩니다.

- **로그인**:

  - 사용자 인증 정보를 통해 로그인합니다.

- **와인 목록 페이지**:

  - 와인 검색 기능을 통해 와인을 검색할 수 있습니다.
  - 와인 검색 시 와인 이름, 와인 종류, 와인 가격, 와인 평점, 와인 리뷰 수 등을 확인할 수 있습니다.
  - 와인을 타입/가격/평점 순으로 필터링 할 수 있습니다.

- **와인 등록하기**:

  - 이름, 가격, 원산지, 사진, 타입을 입력하여 와인을 등록할 수 있습니다.

- **와인 상세페이지**:

  - 와인 정보 및 리뷰를 확인할 수 있습니다.
  - 리뷰를 추가할 수 있습니다.

- **내 프로필**:
  - 내가 작성한 리뷰를 확인/수정/삭제 할 수 있습니다.

<br/>
<br/>

# 4. Tasks & Responsibilities (작업 및 역할 분담)

|        |                                                                                                                                                                                                                        |                                                                                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 강동욱 | <img src="https://i.namu.wiki/i/o81kFfad6uoV0sN0iGSqA3hEKyIniZUhP7VBq2dI3WeyOFalhAEa_lQ_SY0GEbC_oJ4qzLlKokalWFk6cx86vg.webp" alt="강동욱" width="100">                                                                 | <ul><li>와인목록, 와인등록모달</li><li>cards component</li></ul>                                                       |
| 강동우 | <img src="https://i.namu.wiki/i/hWLEwQhnjvdoRZQhrgHMKAZjiSVPO5D86_nBD6OCVLHamm0dM7Ssv2KTfYgjJj-V_X3hMsgV-LeIgI7lmbqzhA.webp" alt="강동우" width="100">                                                                 | <ul><li>내 프로필 - 내가 등록한 와인, 삭제 모달 페이지</li><li>flavor, profile component</li></ul>                                                          |
| 유주섭 | <img src="https://i.namu.wiki/i/BI-Q8xHjYIpLmksHyJ_kzopza0YHAAiMe8bijku1ZU-MN-f6oVv-OG5vBXlugtEtBldC_WDJi9v-E3JYUtCCHohE7lZ1W75NP57fBYBBRFQ7Amn3AXxeDIwXNPRz0pQNJUFVJwezFQ2UnzTy7_Aaww.webp" alt="유주섭" width="100"> | <ul><li>회원가입/로그인 , 유저관리토큰 </li><li>input, search, gnb component</ul> |
| 이승환 | <img src="https://upload.wikimedia.org/wikipedia/ko/thumb/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png/230px-%EC%8B%A0%EC%A7%B1%EA%B5%AC.png" alt="이승환" width="100">                                                        | <ul><li>와인 상세페이지, 리뷰모달 </li><li>filter, dropdown component</li></ul>                                                        |
| 정혜연 | <img src="https://i.namu.wiki/i/qWyoh8nA_DcTuY4gqcmkFC2k5Sbn8D6yVCVRQHMhJD-eRYtugUDNg6jP-v0VqbnFdCjL4jYrepNXw9ey8ouFAA.webp" alt="정혜연" width="100">                                                                 | <ul><li>프로젝트 계획 정리</li><li>랜딩페이지, 내 프로필 - 내가 쓴 후기</li><li>default, global css component</li></ul>                                                        |

<br/>
<br/>

# 5. Technology Stack (기술 스택)

## 5.1 Language

|            |                                                                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML5      | <img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="100">                                       |
| CSS3       | <img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="100">                                        |
| Javascript | <img src="https://github.com/user-attachments/assets/4a7d7074-8c71-48b4-8652-7431477669d1" alt="Javascript" width="100">                                  |
| Typescript | <img src="https://i.namu.wiki/i/EY559r31H-um8uTtptPIbCZoBGxsumSlwEH0T_rA6WmxQq1UwqyAf3cJQJXN7Fv5CoEz0kv5CBXzjkkPU_XWig.svg" alt="Typescript" width="100"> |

<br/>

## 5.2 Frotend

|                  |                                                                                                                                |         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- |
| React            | <img src="https://github.com/user-attachments/assets/e3b49dbb-981b-4804-acf9-012c854a2fd2" alt="React" width="100">            | 18.3.1  |
| StyledComponents | <img src="https://github.com/user-attachments/assets/c9b26078-5d79-40cc-b120-69d9b3882786" alt="StyledComponents" width="100"> | 6.1.12  |
| Next.js          | <img src="https://images-cdn.openxcell.com/wp-content/uploads/2024/07/24154156/dango-inner-2.webp" alt="Next.js" width="100">  | 14.2.11 |

<br/>

## 5.3 Cooperation

|         |                                                                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Git     | <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100">                                    |
| Notion  | <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="100">                                 |
| Figma   | <img src="https://i.namu.wiki/i/cAYebt8RyZGac7cdIFcRTJoLftLkBbmXEk0hqRx8V0koKfyQRfxleyZEvOQN_iQ6lrhf44NIA5btYUpb13P8jw.svg" alt="Figma" width="100"> |
| Discord | <img src="https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ" alt="Discord" width="100">       |

<br/>

# 6. Project Structure (프로젝트 구조) 

```plaintext
PROJECT-TEAM2-WINE/
├── .next/                      # Next.js 빌드 결과물
├── node_modules/               # npm 패키지 모듈
├── public/                     # 정적 파일 저장소
│   ├── assets/                 # 폰트 및 기타 정적 파일
│   ├── img/                    # 이미지 파일
├── src/                        # 소스 코드 디렉토리
│   ├── pages/                  # Next.js의 라우팅 페이지 폴더
│   │   ├── wines/              # 와인 관련 페이지 모음
│   │   ├── _app.tsx            # Next.js의 글로벌 설정 파일
│   │   ├── _document.tsx       # HTML 문서 구조 설정 파일
│   │   ├── index.tsx           # 메인 페이지
│   │   ├── login.tsx           # 로그인 페이지
│   │   ├── myprofile.tsx       # 프로필 페이지
│   │   ├── signup.tsx          # 회원가입 페이지
│   ├── styles/                 # 스타일 관련 파일 저장
│   │   ├── global.css          # 전역 CSS 스타일 파일
├── .gitignore                  # Git에서 제외할 파일 목록
├── eslint.config.mjs           # ESLint 설정 파일
├── next-env.d.ts               # Next.js 환경 타입 정의
├── next.config.ts              # Next.js 설정 파일
├── package-lock.json           # 종속성 버전 고정 파일
├── package.json                # 프로젝트 종속성 및 스크립트 정의
├── README.md                   # 프로젝트 개요 및 사용법 설명
└── tsconfig.json               # TypeScript 설정 파일

```

<br/>
<br/>

# 7. Development Workflow (개발 워크플로우)

## 브랜치 전략 (Branch Strategy)

우리의 브랜치 전략은 Git Flow를 기반으로 하며, 다음과 같은 브랜치를 사용합니다.

- Main Branch

  - 배포 가능한 상태의 코드를 유지합니다.
  - 모든 배포는 이 브랜치에서 이루어집니다.

- practice Branch

  - 최종 배포 브랜치 전, 마지막 점검 브랜치입니다.
  - 컨플릭 해결 및 테스트 코드 작성 후 배포 브랜치로 병합합니다.

- {name} Branch
  - 팀원 각자의 개발 브랜치입니다.
  - 모든 기능 개발은 이 브랜치에서 이루어집니다.

<br/>
<br/>

## 커밋 태그

- feat: 새로운 기능을 추가할 때 사용합니다.
  - 예: feat: add login functionality
- fix: 버그를 수정할 때 사용합니다.
  - 예: fix: correct issue with user registration
- docs: 문서와 관련된 변경사항 (README.md, API 문서 등).
  - 예: docs: update API documentation
- style: 코드의 스타일(포맷팅, 세미콜론 누락 등) 변경으로, 기능적 변화는 없는 경우.
  - 예: style: format code to improve readability
- refactor: 코드 리팩토링 (기능 변경 없이 코드 구조 개선).
  - 예: refactor: simplify user validation logic
- test: 테스트 코드의 추가 또는 수정.
  - 예: test: add tests for authentication module
- chore: 빌드, 도구 설정 등 기능적이지 않은 변경사항.
  - 예: chore: update dependencies
- perf: 성능 개선 관련 변경사항.
  - 예: perf: optimize database query performance
- build: 빌드 시스템이나 외부 종속성에 영향을 미치는 변경사항.
  - 예: build: update webpack configuration
- revert: 이전 커밋을 되돌릴 때 사용합니다.
  - 예: revert: revert commit abc123
- hotfix: 긴급하게 버그를 수정할 때 사용합니다.
  - 예: hotfix: fix critical login issue

<br/>

## 커밋 이모지

```
== 코드 관련
📝	코드 작성
🔥	코드 제거
🔨	코드 리팩토링
💄	UI / style 변경

== 문서&파일
📰	새 파일 생성
🔥	파일 제거
📚	문서 작성

== 버그
🐛	버그 리포트
🚑	버그를 고칠 때

== 기타
🐎	성능 향상
✨	새로운 기능 구현
💡	새로운 아이디어
🚀	배포
```

<br/>

## 커밋 예시

```
== ex1
✨Feat: "회원 가입 기능 구현"

SMS, 이메일 중복확인 API 개발

== ex2
📚chore: styled-components 라이브러리 설치

```

<br/>
<br/>
