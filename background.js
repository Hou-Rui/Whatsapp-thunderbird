/*
Open a new tab, and load WhatsApp into it.
*/
const targetUrl = "https://web.whatsapp.com";

function rewriteUserAgentHeaderAsync(e) {
  let asyncRewrite = new Promise((resolve, reject) => {
    window.setTimeout(() => {
      for (let header of e.requestHeaders) {
        if (header.name.toLowerCase() === "user-agent") {
          header.value = header.value.replace('Thunderbird', 'Firefox');
        }
      }
      resolve({requestHeaders: e.requestHeaders});
    }, 2000);
  });
  return asyncRewrite;
}

console.log("injecting");

browser.browserAction.onClicked.addListener((whatsapp) => {
   browser.tabs.create({
      url: browser.runtime.getURL(targetUrl)
   });
});

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeaderAsync,
  {urls: [targetUrl + '/*']},
  ["blocking", "requestHeaders"]
);
