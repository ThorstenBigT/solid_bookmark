import browser from 'webextension-polyfill'
// Function to extract SEO data from the page
function extractSEOData() {
    const pageTitle = document.title
    const pageUrl = window.location.href
    
    // Extract meta tags
    const metaTags = Array.from(document.querySelectorAll('meta')).map((tag) => ({
      name: tag.getAttribute('name') || tag.getAttribute('property') || '',
      content: tag.getAttribute('content') || '',
    }))
    
    // Extract header tags (h1, h2, h3, etc.)
    const headerTags = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((header) => ({
      tagName: header.tagName,
      text: header.textContent || '',
    }))
  
    // Send the extracted SEO data to the background script
    browser.runtime.sendMessage({
      pageTitle,
      pageUrl,
      metaTags,
      headerTags,
    })
  }
  
extractSEOData()