import React from 'react';
import {Button} from 'semantic-ui-react';

const Settings = () => {
  const notificationsHandler = () => {
    window.Notification.requestPermission((userChoice) => {
      if (userChoice !== 'granted') console.log('Notifications user declined');
      else {
        navigator.serviceWorker.ready.then((swreg) => {
          swreg.showNotification('Successfully Subscribed', {
            body: 'You will recieve notifications from CookiezCarz',
            icon: 'https://s4.aconvert.com/convert/p3r68-cdx67/aelkf-3kkhr-0.png',
            dir: 'ltr',
            lang: 'en-US',
            vibrate: [100, 50, 200],
            badge: 'https://s4.aconvert.com/convert/p3r68-cdx67/aelkf-3kkhr-0.png',
            // image:
            // tag:
            // renotify
          });
        })
      }
    });
  };

  const configurePushSub = () => {
    let reg;

    navigator.serviceWorker.ready
    .then((swreg) => {
      return swreg.pushManager.getSubscription()
    }).then((sub) => {
      if (sub === null) {
        // Create Subscription
        reg.pushManager.subscribe({
          userVisibleOnly: true
        });
      } else {
        // we have a subscription
      }
    })
  };

  return (
    <div>
      {window.Notification && <Button fluid content="Enable Notification" onClick={configurePushSub}/>}
    </div>
  );
}

export default Settings;
