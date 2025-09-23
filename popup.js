document.addEventListener('DOMContentLoaded', function() {
  const saveCurrentBtn = document.getElementById('saveCurrent');
  const viewSavedBtn = document.getElementById('viewSaved');
  const statusDiv = document.getElementById('status');
  const savedList = document.getElementById('savedList');
  const liveFilter = document.getElementById('liveFilter');
  const symatable = document.getElementById('symatInput');
  const header = document.getElementById('header');

    let autoData = {};
    const CONFIG = {
    STORAGE_KEY: 'hasznaltauto_data'
    };
    // Load stored data on popup open
    loadStoredData();
    //console.log('Popup opened, data loaded:', autoData.length, 'elem');



  // Load recent saved items
  //loadRecentItems();
  
  // Save current page HTML
  saveCurrentBtn.addEventListener('click', function() {
    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //  chrome.scripting.executeScript({
     //   target: {tabId: tabs[0].id},
     //   files: ['script.js']
   //   }, () => {
        // Call the function
    //    injectScript();

        showStatus('HTML content saved successfully!', 'success');
        // Reload recent items after a short delay
        setTimeout(loadRecentItems, 500);
      });

  // View saved HTML
  viewSavedBtn.addEventListener('click', function() {
    loadStoredData();
    loadRecentItems();

   // chrome.tabs.create({url: chrome.runtime.getURL('saved.html')});
  });



  // Adatok betöltése localStorage-ből
function loadStoredData() {
  chrome.storage.local.get([CONFIG.STORAGE_KEY], (result) => {
    if (result[CONFIG.STORAGE_KEY]) {
      autoData = result[CONFIG.STORAGE_KEY];
          header.innerHTML = ` <h3><strong>${Object.keys(autoData).length} Hirdetés</strong><br></h3>`
        showStatus('Background content loaded successfully!', 'success');
        //  setTimeout(loadRecentItems, 500);
      //console.log('Adatok betöltve:', Object.keys(autoData).length, 'elem');
    }
  });
}
  // Load recent saved items from storage
  function loadRecentItems() {
        loadStoredData()
      savedList.innerHTML = '';
      
      // Filter and sort items
      const htmlItems = [];
      for (let key in autoData) {
       // if (key.startsWith('tab_html_')) {
          htmlItems.push({
            key: key,
            data: autoData[key]
          });
        //}
      }
      
      // Sort by timestamp (newest first)
      htmlItems.sort((a, b) => 
        new Date(b.data.timestamp) - new Date(a.data.timestamp)
      );
      
      // Display recent items (max 5)
      const displayItems = htmlItems.slice(0, 100);
      if (displayItems.length === 0) {
        savedList.innerHTML = '<p>No saved HTML yet</p>';
        return;
      }

      // szűrő
      displayItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'saved-item';
        d0 =item.data.data
        d1 = d0.substring(d0.indexOf('_ful') + 4);
        div.innerHTML = `
          <strong>${d1}  ${item.data.exists}</strong><br>
          <small>${new Date(item.data.timestamp).toLocaleString()}  ${item.data.url}</small>
        `;
        if (item.data.exists) {
          div.style.backgroundColor = '#d4edda'; // light green
        } else {
          div.style.backgroundColor = '#f8d7da'; // light red
        }
        if (symatable) {
          const filterText = symatable.value.toLowerCase();
          if (item.data.url.toLowerCase().includes(filterText) || item.data.data.toLowerCase().includes(filterText)) {
            div.style.display = 'block';
          } else {
            div.style.display = 'none';
          }
        }
        if (liveFilter.checked) {
         if (item.data.exists) {savedList.appendChild(div)}
          // div.style.display = 'block';
          } else {
          savedList.appendChild(div);
          //  div.style.display = 'none';
          }


      });

  }
  
  // Show status message
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 2000);
  }
chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'local' && changes.hasznaltauto_data) {
      // Reload data and update UI
 //     loadStoredData();
     // loadRecentItems();
    }
  });

  chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === 'session' && changes.lastID) {
      // Reload data and update UI
        newID = changes.lastID.newValue;
 //     loadStoredData();
      loadRecentItems();
     //   window.sharedStorage.set({ "lastID": newID } , () => {
    //console.log('Adatok elmentve:', newID, 'elem');
  });
    }
  });

  // Listen for messages from content script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'html_saved') {
      // Store the metadata in chrome.storage
      chrome.storage.local.set({
        [request.key]: {
          url: request.url,
          title: request.title,
          timestamp: request.timestamp
        }
      });
      
      // Update the UI
      loadRecentItems();
    }
  });
});