import React, {useState, useEffect} from 'react';

import {post} from 'axios';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import {hasSubscription} from '../../endpoints';

const Settings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotifications] = useState(false);

  useEffect(() => hasSubscription(setNotifications), []);
  
  const displayConfirmNotification = () => {
    window.Notification.requestPermission((userChoice) => {
      if (userChoice !== 'granted') alert('Idiot');
      else {
        return navigator.serviceWorker.ready.then((swreg) => {
          swreg.showNotification('Successfully Subscribed', {
            body: 'You will recieve notifications from CookiezCarz',
            icon: process.env.PUBLIC_URL + '/images/coco.png',
            dir: 'ltr',
            lang: 'en-US',
            vibrate: [100, 50, 200],
            badge: process.env.PUBLIC_URL + '/images/coco.png',
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
        .then((data) => {
          if (data === 201) {
            displayConfirmNotification()
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
          onClick={() => setOpenModal(true)}/>
      )}

      <Modal open={openModal} basic size='small'>
        <Header icon='alarm' content='Enable Notifications' />
        <Modal.Content>
          <p>
            Enabling notifications for this app in this browser will disable notifications on your previous one. Continue?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => {configurePushSub(); setOpenModal(false); setNotifications(true)}}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Settings;
