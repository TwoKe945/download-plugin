chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 设置判断条件，页面加载完成才添加事件，否则会导致事件重复添加触发多次
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./content-script.js"],
      })
      .then(() => {
        console.log("INJECTED SCRIPT SUCC.");
      })
      .catch((err) => console.log(err));
  }
})
