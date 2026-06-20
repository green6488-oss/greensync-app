// firebase-messaging-sw.js
// 이 파일은 반드시 Vite 프로젝트의 `public` 폴더 루트에 위치해야 합니다.
// (배포되면 https://본인도메인/firebase-messaging-sw.js 로 접근 가능해야 함 —
//  하위 폴더에 넣으면 동작하지 않습니다.)
//
// 앱이 꺼져있거나 백그라운드에 있을 때도, 이 서비스워커가 푸시를 받아
// 휴대폰 OS 알림(상단 배너/알림센터)으로 띄워줍니다.

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// App.tsx의 FIREBASE_CONFIG와 반드시 동일한 값이어야 합니다.
firebase.initializeApp({
  apiKey: "AIzaSyD9JRIurIbSGAnijOOKc1E1BlyLmZaW6Yk",
  authDomain: "greensync-73654.firebaseapp.com",
  projectId: "greensync-73654",
  storageBucket: "greensync-73654.firebasestorage.app",
  messagingSenderId: "538253928657",
  appId: "1:538253928657:web:44d397813013eba718fdf0",
});

const messaging = firebase.messaging();

// 앱이 백그라운드/종료 상태일 때 푸시가 도착하면 이 콜백이 실행되어
// 직접 OS 알림을 띄운다. (포그라운드일 때는 App.tsx 쪽의 기존 인앱
// 알림 팝업이 그 역할을 하므로, 여기서는 중복으로 띄우지 않는다.)
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || "그린산업(주)";
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || "";

  self.registration.showNotification(title, {
    body: body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: payload.data || {},
  });
});

// 알림을 탭하면 앱(또는 이미 열려있는 탭)으로 포커스 이동.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
