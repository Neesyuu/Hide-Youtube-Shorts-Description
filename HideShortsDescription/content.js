function applyOverlayLogic() {
  chrome.storage.local.get(["hideMetadata", "hideMenu"], function (data) {
    const styleId = "hide-shorts-overlay-style";
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    let css = "";
    if (data.hideMetadata) {
      css += `
        ytd-reel-player-overlay-renderer .metadata-container {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        ytd-reel-player-overlay-renderer .metadata-container:hover {
          opacity: 1;
        }
      `;
    }
    if (data.hideMenu) {
      css += `
        ytd-reel-player-overlay-renderer .action-container {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        ytd-reel-player-overlay-renderer .action-container:hover {
          opacity: 1;
        }
      `;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
  });
}

applyOverlayLogic();

chrome.storage.onChanged.addListener(function (changes, area) {
  if (
    area === "local" &&
    ("hideMetadata" in changes || "hideMenu" in changes)
  ) {
    applyOverlayLogic();
  }
});
