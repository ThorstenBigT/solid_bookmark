//import browser from 'webextension-polyfill';
function create_key_value_pair(key, value) {
    return `${key}='${value}'`;
}
function formatAsValidURL(inputString) {
    // Encode the input string to make it a valid URL
    const encodedString = encodeURIComponent(inputString);
    // Optionally, you can replace spaces with '%20' (URL-encoded space)
    // If you want to replace spaces with '+', you can use .replace(/%20/g, '+') instead.
    const finalURL = encodedString.replace(/%20/g, '+');
    return finalURL;
}
// Listen for messages from content script
browser.runtime.onMessage.addListener((message) => {
    // Handle the extracted SEO data
    const { pageTitle, pageUrl, metaTags } = message;
    const base_url = 'https://stashdat.link/app/main?';
    const bookmark_url = create_key_value_pair('new', pageUrl);
    const bookmark_titel = create_key_value_pair('title', pageTitle);
    let tmp_url = `${bookmark_url}&${bookmark_titel}`;
    for (let i = 0; i < metaTags.length; i++) {
        const item = metaTags[i];
        if (item.name === 'description') {
            const meta_data = create_key_value_pair(item.name, item.content);
            tmp_url = tmp_url + `&${meta_data}`;
        }
    }
    //tmp_url = formatAsValidURL(tmp_url)
    const final_url = base_url + tmp_url;
    console.log(`Final Url: ${final_url}`);
    console.log('Metadata:', metaTags);
    browser.tabs.create({
        url: final_url,
        active: true, // Whether the new tab should be active or not
    });
});
