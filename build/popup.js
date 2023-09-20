import browser from 'webextension-polyfill';
function sanitizeFilename(filename) {
    // Replace any characters not allowed in filenames with underscores
    return filename.replace(/[/\\?%*:|"<>]/g, '_');
}
document.addEventListener('DOMContentLoaded', () => {
    const saveLinkButton = document.getElementById('saveLinkButton');
    if (saveLinkButton) {
        saveLinkButton.addEventListener('click', () => {
            browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                const activeTab = tabs[0];
                const link = activeTab.url;
                let title = activeTab.title || 'Link';
                // Sanitize the title to remove illegal characters
                title = sanitizeFilename(title);
                // Create a Blob containing the URL
                const blob = new Blob([`[InternetShortcut]\r\nURL=${link}`], { type: 'text/plain' });
                // Save the Blob as a .url file
                browser.downloads.download({
                    url: URL.createObjectURL(blob),
                    filename: `${title}.url`,
                    saveAs: true
                });
            });
        });
    }
});
