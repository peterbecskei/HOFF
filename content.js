// content.js



// Amikor betöltődött a DOM, kivesszük a tartalmat
//const CONTENT = document.body.innerText || document.body.textContent || "";
const CONTENT = document.body.innerHTML || "";
alllink = extractLinks();
// Első 1000 karakter
const snippet = CONTENT.slice(1, 2000);

// Adatok betöltése localStorage-ből
function loadStoredData() {
  const productlist = localStorage.getItem("ins-cart-product-list");
 // storage.local.get("ins-cart-product-list" , (result) => {
 //   if (result["ins-cart-product-list"]) {
 //     autoData = result["ins-cart-product-list"];

  //  }
//  });
}
// loadStoredData()
// Üzenet a háttérszolgáltatásnak
chrome.runtime.sendMessage({
  action: "saveContent",
  text: snippet,
  url: window.location.href
});
// Send links to background script
chrome.runtime.sendMessage({
  action: "saveLinks",
  text: alllink,
  url: window.location.href
});

// Send links to background script
const DATA = CONTENT.slice(2001, 4000);
 const productlist = localStorage.getItem("ins-cart-product-list");
chrome.runtime.sendMessage({
  action: "saveData",
  text: productlist,
//   text: JSON.stringify(productlist),
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