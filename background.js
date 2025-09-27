// background.js - Main background script for the extension
 url_csv = [];

chrome.runtime.onInstalled.addListener(() => {
// Set up an alarm to trigger every minute
  chrome.storage.local.set({ notifications: [], isRunning: false, unreadCount: 0 });
  console.log('Extension installed');
 // chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'stay_hydrated.png',
    title: 'Time to Hydrate',
    message: "Everyday I'm Guzzlin'!",
    buttons: [{ title: 'Keep it Flowing.' }],
    priority: 0
  });
});

chrome.notifications.onButtonClicked.addListener(async () => {
  const item = await chrome.storage.sync.get(['minutes']);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: item.minutes });
});



// Alarm listener for periodic notifications
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "minuteNotifier") {
    chrome.storage.local.get(["isRunning", "notifications", "unreadCount"], (data) => {
      if (data.isRunning) {
        const time = new Date().toLocaleTimeString();
        const notification = {
          id: Date.now().toString(),
          message: `Most a pontos idő: ${time}`,
          read: false
        };
        // Add new notification to storage
        const updatedNotifications = [...data.notifications, notification];
        const newUnreadCount = data.unreadCount + 1;

        chrome.storage.local.set({
          notifications: updatedNotifications,
          unreadCount: newUnreadCount
        });

        chrome.notifications.create(notification.id, {
          type: "basic",
          iconUrl: "icons/icon48.png",
          title: "Popup Notifier",
          message: notification.message
        });

        chrome.action.setBadgeText({ text: newUnreadCount.toString() });
        chrome.action.setBadgeBackgroundColor({ color: "#AE0000" });
      }
    });
  }
});

// Action button click listener to mark notifications as read
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(["notifications", "unreadCount"], (data) => {
  // Mark the next unread notification as read
    const unreadNotifications = data.notifications.filter(n => !n.read);
   // If there are unread notifications, mark the first one as read
    if (unreadNotifications.length > 0) {
      const nextNotification = unreadNotifications[0];
      nextNotification.read = true;

      const updatedNotifications = data.notifications.map(n =>
        n.id === nextNotification.id ? nextNotification : n
      );
      const newUnreadCount = data.unreadCount - 1;

      chrome.storage.local.set({
        notifications: updatedNotifications,
        unreadCount: newUnreadCount
      });

      chrome.action.setBadgeText({ text: newUnreadCount > 0 ? newUnreadCount.toString() : "" });
    }
  });
});




// Message listener for content scripts

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "saveContent") {
    // Fájlnév az URL alapján
    //let safeName = message.url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    //let filename = safeName + ".txt";
    saveContensToLocalStore(message);
  }
   if (message.action === "saveLinks") {
        saveLinkToLocalStore(message);
     }

    if (message.action === "saveData") {
        saveDATAToLocalStore(message);
     }

});



function saveLinkToLocalStore(links) {
  chrome.storage.local.set({ 'LINK_DATA': links });
}


function saveDATAToLocalStore(links) {
  chrome.storage.local.set({ 'DATA_URL': links });
}

function saveContensToLocalStore(links) {
  url_csv.push(links);
  chrome.storage.local.set({ 'URL_DATA': url_csv });
}


//function saveLinksToCSV(links) {
//  const csvContent = "URL\n" + links.map(link => `"${link}"`).join("\n");
//  const dataUrl = "data:text/csv;base64," + btoa(unescape(encodeURIComponent(csvContent)));

//  chrome.downloads.download({
//    url: dataUrl,
 //   filename: 'HREF.csv',
 //   saveAs: true
//  });
//}


//function saveData() {
//  chrome.storage.local.set({ [CONFIG.STORAGE_KEY]: autoData }, () => {
    //console.log('Adatok elmentve:', Object.keys(autoData).length, 'elem');
//  });
//}
