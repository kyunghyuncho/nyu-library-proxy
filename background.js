const DEFAULT_PROXY = "https://proxy.library.nyu.edu/login?url=";

function isNonProxiableUrl(url) {
  return (
    url.startsWith("chrome://") ||
    url.startsWith("edge://") ||
    url.includes("proxy.library.nyu.edu")
  );
}

function redirectTabViaProxy(tab) {
  if (!tab?.url || isNonProxiableUrl(tab.url)) {
    return;
  }

  chrome.storage.sync.get(["proxyPrefix"], (data) => {
    const prefix = data.proxyPrefix || DEFAULT_PROXY;
    const targetUrl = prefix + encodeURIComponent(tab.url);
    chrome.tabs.update(tab.id, { url: targetUrl });
  });
}

function setupContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "configure-proxy",
      title: "Configure Proxy",
      contexts: ["action"],
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["proxyPrefix"], (result) => {
    if (!result.proxyPrefix) {
      chrome.storage.sync.set({ proxyPrefix: DEFAULT_PROXY });
    }
  });
  setupContextMenu();
});

chrome.action.onClicked.addListener((tab) => {
  redirectTabViaProxy(tab);
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "configure-proxy") {
    chrome.runtime.openOptionsPage();
  }
});
