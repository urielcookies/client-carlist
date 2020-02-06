// self.addEventListener('install', (event) => {
//   console.log('[service worker] installing ws ...', event);
// })

// self.addEventListener('activate', (event) => {
//   console.log('[service worker] Activating ws ...', event);
//   return self.clients.claim();
// })

self.addEventListener('fetch', (event) => {
  // console.log('[service worker] fetch ws ...', event);
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
  let data = {title: 'test notification', body: 'test notification', url: '/'};
  if (event.data) {
    console.log(event.data.text())
    data = JSON.parse(event.data.text());
    navigator.serviceWorker.ready.then((swreg) => {
      swreg.showNotification('Successfully Subscribed', {
        body: 'You will recieve notifications from CookiezCarz',
        icon: process.env.PUBLIC_URL + '/images/coco.png',
        dir: 'ltr',
        lang: 'en-US',
        vibrate: [100, 50, 200],
        badge: process.env.PUBLIC_URL + '/images/coco.png',
        data: {
          url: data.url
        }
      });
    })
  }
})