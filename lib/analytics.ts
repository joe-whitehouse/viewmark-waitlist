// Simple analytics tracking for page views
export function trackPageView() {
  // Only track in browser environment
  if (typeof window === 'undefined') return
  
  try {
    const pagePath = window.location.pathname
    const userAgent = navigator.userAgent
    const referrer = document.referrer || ''
    
    // Generate a simple session ID (stored in sessionStorage)
    let sessionId = sessionStorage.getItem('analytics_session_id')
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
      sessionStorage.setItem('analytics_session_id', sessionId)
    }
    
    // Send tracking data to Netlify Function
    fetch('/.netlify/functions/track-pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagePath,
        userAgent,
        referrer,
        sessionId
      })
    }).catch(error => {
      // Silently fail - don't break the user experience
      console.debug('Analytics tracking failed:', error)
    })
  } catch (error) {
    // Silently fail - don't break the user experience
    console.debug('Analytics tracking error:', error)
  }
}

// Track page view on load
export function initAnalytics() {
  if (typeof window === 'undefined') return
  
  // Track initial page view
  trackPageView()
  
  // Track page views on navigation (for SPA behavior)
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args)
    setTimeout(trackPageView, 100) // Small delay to ensure URL is updated
  }
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args)
    setTimeout(trackPageView, 100)
  }
  
  // Track back/forward navigation
  window.addEventListener('popstate', () => {
    setTimeout(trackPageView, 100)
  })
}
