# GitHub Pages 배포 과정 요약

## 1. `gh-pages` 패키지를 이용한 초기 시도
처음에는 `npm`의 `gh-pages` 패키지를 사용하여 배포를 시도했습니다.
- **`gh-pages` 설치**: 배포 자동화 스크립트를 위해 `npm install gh-pages --save-dev` 명령을 실행했습니다.
- **`package.json` 설정**: `homepage` URL을 추가하고, 빌드와 배포를 위한 `predeploy` 및 `deploy` 스크립트를 추가했습니다.
- **`vite.config.ts` 설정**: GitHub Pages의 하위 디렉토리 경로에 맞추기 위해 `base` 속성을 추가했습니다.

## 2. 초기 배포 오류 수정
첫 배포 시도에서 몇 가지 오류가 발생하여 수정했습니다.
- **타입스크립트 오류**: `src/data.ts` 파일에서 레시피의 난이도(`difficulty`) 값이 허용되지 않는 `"易"`로 되어 있어 빌드에 실패했습니다. 이를 허용되는 값인 `"初"`로 모두 수정했습니다.
- **`gh-pages` 캐시 오류**: 이전에 잘못된 배포 시도로 인해 남아있던 캐시 때문에 `gh-pages` 브랜치를 생성하지 못하는 오류가 발생했습니다. `node_modules/.cache/gh-pages` 폴더를 삭제하여 캐시를 초기화하고 해결했습니다.

## 3. 빈 화면 문제 해결 (`HashRouter`로 변경)
배포 후 사이트가 빈 화면으로 나오는 문제가 발생했습니다.
- **원인**: `BrowserRouter`가 GitHub Pages와 같은 하위 디렉토리 환경에서 페이지를 제대로 찾지 못하는 문제였습니다.
- **해결**: `src/App.tsx` 파일에서 `BrowserRouter`를 `HashRouter`로 변경하여, URL에 `#`을 사용하는 방식으로 라우팅 문제를 해결했습니다.

## 4. GitHub Actions 배포 방식으로 전환
사용자님께서 GitHub Actions 워크플로우를 사용하기 시작하면서 새로운 오류가 발생했습니다.
- **문제**: Actions 로그에서 `HttpError: Not Found (404)` 오류가 발생했습니다.
- **원인**: GitHub 저장소의 Pages 설정이 "Branch"에서 배포하도록 되어 있었습니다. Actions를 사용하려면 "GitHub Actions"에서 배포하도록 설정해야 합니다.
- **해결**:
    1. 저장소 설정을 "GitHub Actions"으로 변경하도록 안내했습니다.
    2. 올바른 배포를 위해 표준 Vite 프로젝트용 워크플로우 파일인 `.github/workflows/deploy.yml`을 생성하고 프로젝트에 추가했습니다.

## 5. 반복적인 404 경로 문제 해결
GitHub Actions로 배포한 후, CSS, JS, 이미지 파일 등 각종 리소스에서 404 오류가 계속 발생했습니다.
- **문제**: 모든 리소스 요청 주소에 저장소 이름인 `/korean_recipe/`가 누락되어 최상위 주소에서 파일을 찾으려고 시도했습니다.
- **원인**: 코드 여러 곳에 이미지 경로가 `/images/...`와 같이 슬래시(`/`)로 시작하는 **절대 경로**로 하드코딩되어 있었습니다.
- **해결**:
    1. **Vite `base` 경로 수정**: 먼저 `vite.config.ts`의 `base` 경로가 저장소 이름(`korean_recipe`)과 일치하는지 확인하고 수정했습니다.
    2. **이미지 경로 전면 수정**: `sed` 명령과 `replace` 도구를 사용하여 프로젝트 전체(`data.ts`, `Header.tsx`, `Icon.tsx`, `metaraw.tsx` 등)를 검색하여, `/images/...`로 시작하는 모든 절대 경로에서 맨 앞의 슬래시를 제거하고 **상대 경로**(`images/...`)로 변경했습니다.
    3. **폴더 이름 공백 수정**: `army soup` 폴더 이름의 공백이 문제를 일으킬 수 있어 `army-soup`로 변경하고 `data.ts`의 경로도 함께 수정했습니다.

## 6. 스타일 오류 복구
마지막 경로 수정 과정에서 제가 실수로 `metaraw.tsx` 컴포넌트의 이미지 크기 스타일을 변경하는 문제가 있었습니다.
- **해결**: `git show` 명령으로 이전 버전의 코드를 확인하여, 원래 스타일은 그대로 유지하면서 경로만 수정하도록 코드를 되돌렸습니다.

## 7. 최종 워크플로우 확립
위의 모든 과정을 거쳐, 이제는 로컬에서 코드를 수정한 후 `git push`만 하면 GitHub Actions가 자동으로 웹사이트를 배포하는 안정적인 워크플로우가 완성되었습니다.

## 8. 검색 엔진 최적화(SEO) 설정
`k-foodstudio.com` 커스텀 도메인 연결 이후, 구글 검색 노출을 개선하기 위한 SEO 작업을 진행했습니다.
- **문제점**:
    1. `HashRouter` 사용으로 URL에 `#`가 포함되어 검색 엔진이 페이지를 개별적으로 인식하기 어려웠습니다.
    2. 모든 페이지의 `title` 태그가 동일하고, 페이지별 요약 정보인 `meta description` 태그가 없어 SEO에 매우 불리했습니다.
- **해결 과정**:
    1. **`BrowserRouter`로 전환**: `HashRouter`를 `BrowserRouter`로 변경하여 `/#/` 없는 깔끔한 URL 구조를 만들었습니다.
    2. **GitHub Pages 설정**: `BrowserRouter` 사용 시 새로고침하면 404 오류가 발생하는 문제를 해결하기 위해, `public/404.html` 파일을 수정하고 `package.json`의 빌드 스크립트에 `dist/index.html`을 `dist/404.html`로 복사하는 명령을 추가했습니다.
    3. **동적 SEO 태그 추가**: `react-helmet-async` 라이브러리를 설치하고 `RecipeDetail.tsx` 같은 상세 페이지 컴포넌트에 적용했습니다. 이를 통해 각 레시피 페이지마다 고유한 `<title>`과 `<meta name="description">`이 동적으로 생성됩니다.
    4. **크롤러 가이드 파일 생성**: 검색 엔진이 사이트의 전체 구조를 쉽게 파악할 수 있도록 모든 주요 경로가 포함된 `sitemap.xml`을 생성했습니다. 또한, 모든 크롤러의 사이트 접근을 허용하고 사이트맵 위치를 알려주는 `robots.txt` 파일을 추가했습니다.
- **결과**: 검색 엔진 친화적인 URL 구조와 풍부한 페이지별 메타 정보를 제공하게 되어, 향후 구글 검색 순위 및 노출률 향상을 기대할 수 있게 되었습니다.

### 코드 변경 요약

Google Search Console에서 보고된 "리디렉션이 포함된 페이지" 문제를 해결하고 URL 일관성을 확보하기 위해 다음과 같은 변경 사항이 적용되었습니다.

**목표:** `404.html` 파일의 리디렉션 로직(URL 끝에 슬래시 추가) 및 `sitemap.xml`의 URL 형식과 일치하도록 애플리케이션의 라우팅 및 내부 링크를 수정하여 URL 표준화를 달성합니다.

**적용된 변경 사항:**

1.  **`src/App.tsx`**
    *   **변경 내용:** 모든 `<Route>` 컴포넌트의 `path` 속성에 슬래시(`/`)를 추가했습니다. (루트 경로 `/` 및 와일드카드 경로 `*` 제외)
        *   예시: `<Route path="/recipes"` -> `<Route path="/recipes/"`
        *   영향을 받은 라우트: `/recipes`, `/tips`, `/recipe/:id`, `/tip/:id`, `/terms`, `/privacy`
    *   **롤백된 변경 내용:** 사용자 요청에 따라 `StoriesPage`, `StoryDetail`, `LabsPage`, `LabDetail` 컴포넌트의 임포트 및 해당 라우트 추가는 롤백되었습니다.

2.  **`src/pages/HomePage.tsx`**
    *   **변경 내용:** 내부 `<Link>` 컴포넌트의 `to` 속성 경로에 슬래시를 추가했습니다.
        *   `<Link to="/recipes"` -> `<Link to="/recipes/"`
        *   `<Link to="/tips"` -> `<Link to="/tips/"`

3.  **`src/pages/TipDetail.tsx`**
    *   **변경 내용:** 내부 `<Link>` 컴포넌트의 `to` 속성 경로에 슬래시를 추가했습니다.
        *   `<Link to="/tips"` -> `<Link to="/tips/"`

4.  **`src/components/Footer.tsx`**
    *   **변경 내용:** 내부 `<Link>` 컴포넌트의 `to` 속성 경로에 슬래시를 추가했습니다.
        *   `<Link to="/privacy"` -> `<Link to="/privacy/"`
        *   `<Link to="/terms"` -> `<Link to="/terms/"`

**변경의 목적:**
이러한 변경을 통해 애플리케이션의 모든 내부 URL이 슬래시로 끝나도록 통일되었습니다. 이는 `404.html`의 리디렉션 동작 및 `sitemap.xml`의 URL 형식과 일치하여 Google이 웹사이트의 표준 URL을 더 명확하게 이해하고 색인하는 데 도움을 줍니다. 결과적으로 Google Search Console의 "리디렉션이 포함된 페이지" 보고서가 점차 개선될 것으로 예상됩니다.