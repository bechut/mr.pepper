// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAK3LDeixsL4ptbJ4nhBEhayh6ezQgWvpc",
  projectId: "app-todo-47999",
  messagingSenderId: "368489519179",
  appId: "1:368489519179:web:3d63cdddf9ce2a82bc15ce",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.data.message;
  const notificationOptions = {
    body: payload.data.description,
    icon: payload.data.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
