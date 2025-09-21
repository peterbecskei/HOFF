// content.js
function extractLinks() {
  const links = [];
  const anchorElements = document.querySelectorAll('a[href]');

  anchorElements.forEach(anchor => {
    const href = anchor.href;
    if (href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('www.')) {
      links.push(href);
    }
  });

  return links;
}

// Send links to background script
const allLinks = extractLinks();
chrome.runtime.sendMessage({
  action: "saveLinks",
  links: allLinks
});