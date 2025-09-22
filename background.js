// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});
 url_csv = [];
// Message listener for content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveContent") {
    //saveLinksToCSV(request.text);
    sendResponse({status: "success"});
  }
  return true;
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "saveContent") {
    // Fájlnév az URL alapján
    let safeName = message.url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    //let filename = safeName + ".txt";
    saveLinkToLocalStore(safeName);
    //   chrome.downloads.download({
 //     url: URL.createObjectURL(
   //     new Blob([message.text], { type: "text/plain" })
  //    ),
 //     filename: filename,
 //     saveAs: false
 //   });
  }
});


function saveLinkToLocalStore(links) {
  // Retrieve existing list from local storage or initialize a new one
 // let url_csv = JSON.parse(localStorage.getItem('URL_DATA')) || [];

  // Append the links parameter to the list
  url_csv.push(links);

  // Save the updated list back to local storage with key URL_DATA
  chrome.storage.local.set('URL_DATA', JSON.stringify(url_csv));
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