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
  const action = event.action
  console.log(action);
  return event.waitUntil(
    clients.matchAll()
      .then((clientsFound) => {
        var client = clientsFound.find((c) => {
          return c.visibilityState === 'visible';
        })

        if (client !== undefined) {
          client.navigate(notification.data.url);
          client.focus();
        } else {
          clients.openWindow(notification.data.url);
        }

        notification.close();
      })
  )
})

self.addEventListener('notificationclose', (event) => {
  console.log('notificationz', event)
})


self.addEventListener('push', (event) => {
  let data = {title: 'test notification', body: 'test notification', url: '/'};
  if (event.data) {
    console.log(event.data.text())
    data = JSON.parse(event.data.text());
    const options = {
      body: data.body,
      icon: event.currentTarget.location.origin + '/images/coco.png',
      dir: 'ltr',
      lang: 'en-US',
      vibrate: [100, 50, 200],
      badge: event.currentTarget.location.origin + '/images/coco.png',
      data: {
        url: data.url
      }
    };

    return event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
})