# K家食堂 · 韓料嚴選所 (Korean Recipe Site)

한국 요리 레시피 사이트입니다. React + TypeScript + Tailwind CSS로 구축되었습니다.

## 🍽️ 주요 기능

- **홈페이지**: 요리 카드 형태로 레시피 목록 표시
- **레시피 상세**: 김치찌개, 떡볶이 등 한국 요리 상세 정보
- **맛 프로필**: 매운맛, 짠맛, 단맛, 발효감 시각화
- **재료 목록**: 정통 재료와 현지 대체 재료 제공
- **요리 단계**: 단계별 요리법과 팁 제공
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Vite** - 빌드 도구
- **ESLint** - 코드 품질 관리

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx
│   ├── RecipeCard.tsx
│   ├── FlavorMeter.tsx
│   ├── IngredientList.tsx
│   ├── StepBlock.tsx
│   ├── AdSlot.tsx
│   ├── StickyCTA.tsx
│   ├── AffiliateNotice.tsx
│   └── HeatBadge.tsx
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx
│   └── RecipeDetail.tsx
├── types.ts            # TypeScript 타입 정의
├── data.ts             # 레시피 데이터
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx            # 앱 진입점
└── index.css           # Tailwind CSS 임포트
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 빌드 결과 미리보기

```bash
npm run preview
```

## 📝 레시피 데이터

현재 포함된 레시피:
- **김치찌개 (泡菜鍋)**: 발효향이 뚜렷한 한국 대표 찌개
- **떡볶이 (辣炒年糕)**: 달콤하고 매운 떡볶이

각 레시피는 다음 정보를 포함합니다:
- 조리 시간 및 난이도
- 맛 프로필 (매운맛, 짠맛, 단맛, 발효감)
- 정통 재료와 현지 대체 재료
- 단계별 조리법과 팁
- 필요한 스타터 키트

## 🎨 디자인 특징

- **모던한 UI**: 깔끔하고 직관적인 인터페이스
- **반응형**: 모든 디바이스에서 최적화된 경험
- **한국적 감성**: 한국 요리의 특색을 살린 디자인
- **접근성**: 스크린 리더 등 접근성 도구 지원

## 🔧 개발 명령어

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드 결과 미리보기
- `npm run lint` - ESLint로 코드 검사

## 📄 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.
