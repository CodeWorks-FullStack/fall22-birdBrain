export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'bogusbasin.us.auth0.com'
export const audience = 'https://bogusbasin.com'
export const clientId = 'IybiQhJGC0aPAEsmJSWLX48UwmNzqkVD'
