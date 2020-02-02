// self.addEventListener('install', (event) => {
//   console.log('[service worker] installing ws ...', event);
// })

// self.addEventListener('activate', (event) => {
//   console.log('[service worker] Activating ws ...', event);
//   return self.clients.claim();
// })

self.addEventListener('fetch', (event) => {
  console.log('[service worker] fetch ws ...', event);
  // event.respondWith(caches.match(event.request));
})

self.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  return false;
})

self.addEventListener('notificationclick', (event) => {
  const {notification} = event
  console.log('notification', notification)
  notification.close()
})

self.addEventListener('notificationclose', (event) => {
  console.log('notificationz', event)
})


self.addEventListener('push', (event) => {
  let data = {title: 'test notification', content: 'test notification'};
  console.log('push', event)
  if (event.data) {

    console.log(event.data.text())
  }
})