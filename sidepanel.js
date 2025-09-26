document.addEventListener('DOMContentLoaded', () => {
  const mainMenu = document.getElementById('main-menu');
  const playerPanel = document.getElementById('player-panel');
    const fetchPanel = document.getElementById('fetch-panel');
        const notifPanel = document.getElementById('notif-panel');

  // menu_1 kattintás: váltás a lejátszó panelre
  document.getElementById('menu_1').addEventListener('click', () => {
    mainMenu.classList.remove('active');
    playerPanel.classList.add('active');
  });

  // menu_2 kattintás: egyelőre semmi, de kattintható (később fejleszthető)
  document.getElementById('menu_2').addEventListener('click', () => {
    mainMenu.classList.remove('active');
    fetchPanel.classList.add('active');
    // Üresen hagyva, későbbi fejlesztéshez
    console.log('menu_2 kattintva');
  });

 // menu_3 kattintás: egyelőre semmi, de kattintható (később fejleszthető)
  document.getElementById('menu_3').addEventListener('click', () => {
    mainMenu.classList.remove('active');
    notifPanel.classList.add('active');

    //fetchPanel.classList.add('active');
    // Üresen hagyva, későbbi fejlesztéshez
    console.log('menu_3 kattintva');
  });



//
  // back to main: vissza a főmenübe
  document.getElementById('back-to-main').addEventListener('click', () => {
    playerPanel.classList.remove('active');
    mainMenu.classList.add('active');
  });

    // back to main: vissza a főmenübe
  document.getElementById('back-to-main1').addEventListener('click', () => {
     fetchPanel.classList.remove('active');
    mainMenu.classList.add('active');
  });
    // back to main: vissza a főmenübe
  document.getElementById('back-to-main2').addEventListener('click', () => {
     notifPanel.classList.remove('active');
    mainMenu.classList.add('active');
  });




// Fetch panel gombok és funkciók
  // play, pause, reset: egyelőre üresen (később fejleszthető)
  document.getElementById('Data').addEventListener('click', () => {
    // Üresen hagyva
    console.log('reset kattintva');
  });


  // Fetch gomb: új Chrome tabon nyissa meg a fetchURL címet
  document.getElementById('fetch').addEventListener('click', () => {
    const url = document.getElementById('fetchURL').value;
    window.open(url, '_blank');
    chrome.action.setPopup({popup: 'popup.html'})
      chrome.action.openPopup()

  });
  // Get gomb: új Chrome tabon nyissa meg a fetchURL címet
  document.getElementById('get').addEventListener('click', () => {
   // const url = document.getElementById('get').value;
     chrome.action.setPopup({popup: 'popup.html'})
      chrome.action.openPopup()
   // window.open(url, '_blank');
  });



  // Player panel gombok és funkciók
  // play, pause, reset: egyelőre üresen (később fejleszthető)
  document.getElementById('play').addEventListener('click', () => {
    // Üresen hagyva
    console.log('play kattintva');
  });

  document.getElementById('pause').addEventListener('click', () => {
    // Üresen hagyva
     chrome.action.setPopup({popup: 'popup.html'})
      chrome.action.openPopup()
    console.log('pause kattintva');
  });

  document.getElementById('reset').addEventListener('click', () => {
    // Üresen hagyva
    console.log('reset kattintva');
  });


// Notification panel gombok és funkciók
// Inicializálás alapértékekkel, ha még nincsenek beállítva
  document.getElementById("startButton").addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: true });
  chrome.alarms.create("minuteNotifier", { periodInMinutes: 1 });
  updateUI();
});

document.getElementById("stopButton").addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: false });
  chrome.alarms.clear("minuteNotifier");
  updateUI();
});

document.getElementById("editButton").addEventListener("click", () => {
  const newMessage = prompt("Enter new notification message prefix:", "Most a pontos idő:");
  if (newMessage) {
    chrome.storage.local.set({ messagePrefix: newMessage });
  }
});

document.getElementById("resetButton").addEventListener("click", () => {
  chrome.storage.local.set({ notifications: [], unreadCount: 0, messagePrefix: "Most a pontos idő:" });
  chrome.action.setBadgeText({ text: "" });
  updateUI();
});

function updateUI() {
  chrome.storage.local.get(["notifications", "isRunning"], (data) => {
    const list = document.getElementById("notificationList");
    list.innerHTML = "";
    data.notifications.forEach(notification => {
      const div = document.createElement("div");
      div.className = `notification ${notification.read ? "read" : "unread"}`;
      div.textContent = notification.message;
      list.appendChild(div);
    });
    document.getElementById("startButton").disabled = data.isRunning;
    document.getElementById("stopButton").disabled = !data.isRunning;
  });
}

chrome.storage.local.onChanged.addListener(() => {
  updateUI();
});

updateUI();



});   // dom end