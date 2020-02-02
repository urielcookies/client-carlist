import React from 'react';
import {post} from 'axios';
import {Button} from 'semantic-ui-react';

const Settings = () => {
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

  const configurePushSub = () => {
    let reg;

    navigator.serviceWorker.ready
    .then((swreg) => {
      reg = swreg;
      return swreg.pushManager.getSubscription()
    }).then((sub) => {
      if (sub === null) {
        // Create Subscription
        const vapidPublicKey = "BGtbGS02vyTs8DEeNMU-qkk06y8G_hftexcb9ckqBd8F4bolTd7E5FKhcM7JSOqL-TiVOP-lmxXLB5MjnQDEVeA";
        const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        // we have a subscription
      }
    }).then((newSub) => {
        console.log(newSub)
        console.log(JSON.stringify(newSub))
        const headers = {'Content-Type': 'application/json', token: getCookie('token')};
        post('https://carlistapi.azurewebsites.net/api/useraccounts/test-push', newSub, {headers})
          .then(({data, status}) => {
            if (status === 200 && data) {
              console.log(data)
              displayConfirmNotification()
            }
          })
        // POST request JSON newsub to save subscribtion
        // in the succes of axios displayConfirmNotification()

    })
  };

  return (
    <div style={{height: '80vh'}}>
      {window.Notification && <Button fluid content="Enable Notification" onClick={configurePushSub}/>}
    </div>
  );
}

export default Settings;
