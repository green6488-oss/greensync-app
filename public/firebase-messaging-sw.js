// public/firebase-messaging-sw.js
//
// Firebase Cloud Messaging 백그라운드 서비스워커.
// 앱이 백그라운드(다른 앱 사용 중, 화면 꺼짐, 브라우저 탭 비활성 등)일 때
// 도착하는 푸시 메시지를 받아 OS 알림(상단 배너)으로 띄워주는 역할을 한다.
//
// ⚠️ 이 파일은 반드시 정적 파일로 /firebase-messaging-sw.js 경로에서 그대로
// 서빙되어야 한다(번들링/리액트 라우팅 대상이 아님). public/ 폴더 최상위에
// 위치해야 하고, index.html 등으로 리다이렉트되면 안 된다.
//
// 서비스워커는 모듈(import/export) 문법을 쓸 수 없는 환경이 많으므로,
// Firebase compat(호환) 버전 스크립트를 importScripts로 불러온다.
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// App.tsx의 FIREBASE_CONFIG와 반드시 동일한 값이어야 한다(클라이언트 공개
// 설정값이라 코드에 그대로 두어도 안전함 — 비밀 키 아님).
firebase.initializeApp({
  apiKey: "AIzaSyD9JRIurIbSGAnijOOKc1E1BlyLmZaW6Yk",
  authDomain: "greensync-73654.firebaseapp.com",
  projectId: "greensync-73654",
  storageBucket: "greensync-73654.firebasestorage.app",
  messagingSenderId: "538253928657",
  appId: "1:538253928657:web:44d397813013eba718fdf0",
});

const messaging = firebase.messaging();

// 백그라운드 상태에서 푸시가 도착했을 때 실행된다.
// 서버(Code.gs)에서 data 페이로드로 title/body를 보내는 구조이므로,
// notification 필드가 없을 수도 있어 data를 우선 사용한다.
messaging.onBackgroundMessage((payload) => {
  const title =
    (payload.data && payload.data.title) ||
    (payload.notification && payload.notification.title) ||
    "그린산업(주)";
  const body =
    (payload.data && payload.data.body) ||
    (payload.notification && payload.notification.body) ||
    "";

  self.registration.showNotification(title, {
    body,
    icon: "/icon-192.png",
  });
});
