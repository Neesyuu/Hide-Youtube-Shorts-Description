
function updateButtonStyle(button, isSelected) {
  button.className = isSelected ? 'selected' : 'unselected';
}

function toggleSetting(key, button) {
  chrome.storage.local.get(key, function(data) {
    const current = data[key] || false;
    const updated = !current;
    chrome.storage.local.set({ [key]: updated });
    updateButtonStyle(button, updated);
  });
}

document.getElementById('toggleMetadata').addEventListener('click', function() {
  toggleSetting('hideMetadata', this);
});

document.getElementById('toggleMenu').addEventListener('click', function() {
  toggleSetting('hideMenu', this);
});

chrome.storage.local.get(['hideMetadata', 'hideMenu'], function(data) {
  updateButtonStyle(document.getElementById('toggleMetadata'), data.hideMetadata || false);
  updateButtonStyle(document.getElementById('toggleMenu'), data.hideMenu || false);
});
