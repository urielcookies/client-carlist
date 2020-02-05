import React, {useState, useEffect} from 'react';

import {post} from 'axios';
import {Button} from 'semantic-ui-react';

const Settings = () => {
  const [notification, setNotifications] = useState(false);

  useEffect(() => {
    navigator.serviceWorker.ready
    .then((swreg) => swreg.pushManager.getSubscription())
    .then((sub) => setNotifications(sub))
  }, []);
  
  const displayConfirmNotification = () => {
    window.Notification.requestPermission((userChoice) => {
      if (userChoice !== 'granted') console.log('Notifications user declined');
      else {
        navigator.serviceWorker.ready.then((swreg) => {
          swreg.showNotification('Successfully Subscribed', {
            body: 'You will recieve notifications from CookiezCarz',
            // icon: 'https://s4.aconvert.com/convert/p3r68-cdx67/aelkf-3kkhr-0.png',
            dir: 'ltr',
            lang: 'en-US',
            vibrate: [100, 50, 200],
            // badge: 'https://s4.aconvert.com/convert/p3r68-cdx67/aelkf-3kkhr-0.png',
            // image:
            // tag:
            // renotify
          });
        })
      }
    });
  };

  function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const configurePushSub = () =>
    navigator.serviceWorker.ready
    .then(swreg => (swreg.pushManager.getSubscription(), swreg))
    .then((subscription) => {
      // const sub = subscription ? 'CREATE SUBSCRIPTION' : 'UPDATE SUBSCRIPTION'
      if (subscription) {
        const vapidPublicKey = "BGtbGS02vyTs8DEeNMU-qkk06y8G_hftexcb9ckqBd8F4bolTd7E5FKhcM7JSOqL-TiVOP-lmxXLB5MjnQDEVeA";
        const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return subscription.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey,
        });
      }
    }).then((subscription) => {
      const headers = {'Content-Type': 'application/json', token: getCookie('token')};
      post('https://carlistapi.azurewebsites.net/api/websubscriptions/insert-subscription', subscription, {headers})
        .then(({data, status}) => {
          if (status === 200 && data) {
            console.log(data)
            // displayConfirmNotification()
            setNotifications(true);
          }
        })
        // in the succes of axios displayConfirmNotification()
    });

  return (
    <div style={{height: '80vh'}}>
      {window.Notification && (
        <Button
          basic
          fluid
          color="teal"
          disabled={Boolean(notification)}
          content={notification ? "Notifications are Enabled" : "Enable Notification"}
          onClick={configurePushSub}/>
      )}
    </div>
  );
}

export default Settings;
