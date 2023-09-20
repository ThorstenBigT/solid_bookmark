import browser from 'webextension-polyfill'
// Listen for messages from content script
browser.runtime.onMessage.addListener((message) => {
    // Handle the extracted SEO data
    const { pageTitle, pageUrl, metaTags, headerTags } = message
  
    console.log(`Page Title: ${pageTitle}`)
    console.log(`Page URL: ${pageUrl}`)
    console.log('Meta Tags:', metaTags)
    console.log('Header Tags:', headerTags)
  })