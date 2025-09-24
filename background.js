// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

 url_csv = [];
// Message listener for content scripts


chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "saveContent") {
    // Fájlnév az URL alapján
    //let safeName = message.url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    //let filename = safeName + ".txt";
    saveContensToLocalStore(message);

    //   chrome.downloads.download({
 //     url: URL.createObjectURL(
   //     new Blob([message.text], { type: "text/plain" })
  //    ),
 //     filename: filename,
 //     saveAs: false
 //   });
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
  // Retrieve existing list from local storage or initialize a new one
 // let url_csv = JSON.parse(localStorage.getItem('URL_DATA')) || [];

  // Append the links parameter to the list
  url_csv.push(links);

  // Save the updated list back to local storage with key URL_DATA
  // Adatok mentése localStorage-ba



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
