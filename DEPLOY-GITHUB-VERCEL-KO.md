# ELDYN 웹 배포 — 가장 쉬운 방법

## 1. GitHub 저장소 만들기
1. github.com 로그인
2. 우측 상단 + → New repository
3. Repository name: `ellens-project`
4. Private 선택 권장
5. Create repository

## 2. 파일 올리기
1. 생성된 저장소에서 `uploading an existing file` 또는 Add file → Upload files
2. 이 폴더 안의 파일과 `icons` 폴더를 모두 끌어다 놓기
3. Commit changes 클릭

중요: `ELLENS-PROJECT-VERCEL-READY` 폴더 자체가 아니라, 그 안의 `index.html`, `app.js`, `styles.css` 등이 저장소 최상위에 보여야 합니다.

## 3. Vercel에 연결하기
1. vercel.com 로그인
2. Add New → Project
3. GitHub 연결 허용
4. `ellens-project` 저장소 옆 Import
5. Framework Preset: Other
6. Root Directory: `./`
7. Build Command: 비워두기
8. Output Directory: 비워두기
9. Deploy 클릭

완료되면 `https://프로젝트이름.vercel.app` 주소가 생성됩니다.

## 4. Supabase 인증 주소 추가
Supabase → Authentication → URL Configuration에서:
- Site URL: Vercel에서 받은 주소
- Redirect URLs: `https://프로젝트이름.vercel.app/**`

저장 후 해당 웹주소에서 로그인합니다.

## 5. 휴대폰 설치
- iPhone Safari: 공유 → 홈 화면에 추가
- Android Chrome: 메뉴 → 앱 설치 또는 홈 화면에 추가

## 보안
`config.js`에는 브라우저용 Publishable Key만 들어 있습니다. Service Role Key는 절대 넣지 마세요.
