const DEFAULT_PROXY = "https://proxy.library.nyu.edu/login?url=";

function restoreOptions() {
  chrome.storage.sync.get(["proxyPrefix"], (data) => {
    document.getElementById("proxyPrefix").value = data.proxyPrefix || DEFAULT_PROXY;
  });
}

function saveOptions() {
  const prefixValue = document.getElementById("proxyPrefix").value.trim();
  chrome.storage.sync.set({ proxyPrefix: prefixValue }, () => {
    const status = document.getElementById("status");
    status.textContent = "Configuration saved successfully.";
    setTimeout(() => {
      status.textContent = "";
    }, 2500);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("saveBtn").addEventListener("click", saveOptions);
