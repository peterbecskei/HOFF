// content.js



// Amikor betöltődött a DOM, kivesszük a tartalmat
//const CONTENT = document.body.innerText || document.body.textContent || "";
const CONTENT = document.body.innerHTML || "";

// Első 1000 karakter
const snippet = CONTENT.slice(0, 1000);

// Üzenet a háttérszolgáltatásnak
chrome.runtime.sendMessage({
  action: "saveContent",
  text: snippet,
  url: window.location.href
});



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
//const allLinks = extractLinks();
//chrome.runtime.sendMessage({
//  action: "saveLinks",
//  links: allLinks
//});