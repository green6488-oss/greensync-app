# 그린산업통합앱 — GitHub + Vercel 배포 가이드

이 폴더는 기존 App.tsx(CodeSandbox에서 쓰던 파일)를 정식 배포 가능한 형태로 감싼 것입니다.
**Code.gs(구글 시트 백엔드)는 이 작업과 무관합니다.** Apps Script는 그대로 두시면 됩니다.

---

## 1단계 — GitHub에 코드 올리기

### 방법 A: GitHub 웹사이트에서 직접 업로드 (Git 명령어 몰라도 됨, 추천)

1. github.com 로그인 → 우측 상단 **+** → **New repository**
2. Repository name: `greensync-app` (원하는 이름으로)
3. Public/Private 아무거나 선택 (Private 추천 — 회사 코드라서)
4. **Create repository** 클릭
5. 만들어진 빈 저장소 페이지에서 **uploading an existing file** 클릭
6. 이 폴더 안의 **모든 파일과 폴더**를 통째로 끌어다 놓기(드래그 앤 드롭)
   - `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `vercel.json`, `.gitignore`, `src/` 폴더 전체
7. 하단의 **Commit changes** 클릭

### 방법 B: Git 명령어 사용 (터미널 익숙하면)

```bash
cd greensync-app
git init
git add .
git commit -m "최초 배포"
git branch -M main
git remote add origin https://github.com/내계정/greensync-app.git
git push -u origin main
```

---

## 2단계 — Vercel 연결

1. vercel.com 접속 → **GitHub 계정으로 로그인/가입**
2. 로그인 후 **Add New → Project**
3. 방금 만든 `greensync-app` 저장소 선택 → **Import**
4. Framework Preset이 자동으로 **Vite**로 인식됨 (안 되면 직접 "Vite" 선택)
5. 별다른 설정 건드릴 필요 없이 **Deploy** 클릭
6. 1~2분 후 `https://greensync-app-아무개.vercel.app` 같은 주소가 발급됨

이 주소가 **앞으로 직원분들께 공유할 정식 링크**입니다. 카카오톡으로 보내도, 문자로 보내도 문제없이 열립니다.

---

## 3단계 — 이후 코드 수정 시

1. 저(Claude)가 수정된 `App.tsx` 내용을 드림
2. GitHub 저장소의 `src/App.tsx` 파일을 열어서 **Edit(연필 아이콘)** 클릭
3. 전체 내용을 새 내용으로 교체 → **Commit changes**
4. 커밋하는 순간 Vercel이 자동으로 감지해서 **자동으로 재배포** 시작 (1~2분)
5. 같은 주소에서 바로 새 버전이 보임 — 별도 작업 필요 없음

즉, 지금 CodeSandbox에서 코드 고치던 것과 거의 같은 느낌이지만, 더 안정적으로 동작합니다.

---

## 확인 사항

- [ ] `src/App.tsx` 안의 `callGasWebApp` 함수가 가리키는 GAS 웹앱 URL이 최신 배포 URL인지 확인 (Apps Script에서 "배포 관리"로 확인 가능)
- [ ] Vercel 배포 후 발급된 주소로 직접 접속해서 로그인 화면이 뜨는지 확인
- [ ] 모바일(카카오톡 아닌 일반 브라우저)에서 정상 접속되는지 확인

## 참고

- 이 프로젝트는 Vite + React + TypeScript + Tailwind CSS로 구성되어 있습니다.
- `npm install` 및 `npm run build`는 Vercel이 클라우드에서 자동으로 실행해줍니다. 로컬에 Node.js를 설치해서 직접 테스트하고 싶다면 `npm install` 후 `npm run dev`로 로컬 미리보기가 가능합니다(선택사항, 필수 아님).
