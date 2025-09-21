// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Message listener for content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveLinks") {
    saveLinksToCSV(request.links);
    sendResponse({status: "success"});
  }
  return true;
});

function saveLinksToCSV(links) {
  const csvContent = "URL\n" + links.map(link => `"${link}"`).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: 'HREF.csv',
    saveAs: true
  });
}