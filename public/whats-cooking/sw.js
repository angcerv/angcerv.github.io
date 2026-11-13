/* Build placeholders are replaced by pwa-plugin.mjs. No user data is cached here. */
const cachePrefix = 'whats-cooking-shell-'
const cacheName = cachePrefix + 'fd309944b09b2a22b059'
const resources = ["./","manifest.webmanifest","icons/app-192.png","icons/app-512.png","icons/apple-touch-icon.png","assets/index-DMRTgNaX.js","assets/CookingView-Bo5s4LO1.js","assets/PlannerView-Dv5mx7pu.js","assets/ShoppingView-BehXfNiY.js","assets/web--1NyChRN.js","assets/web-BtqrUZxD.js","assets/web-C36cAp6F.js","assets/web-DcLO0-_v.js","assets/index-B3c8YQK3.css"]
const urls = resources.map(path => new URL(path, self.registration.scope).href)
const shellURL = new URL('./', self.registration.scope).href

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName)
    try {
      // Do not cache login redirects or error pages as application code.
      await Promise.all(urls.map(async url => {
        const response = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin', redirect: 'error' }))
        const type = response.headers.get('content-type') || ''
        const expected = url.endsWith('.js') ? /(?:javascript|ecmascript)/ : url.endsWith('.css') ? /text\/css/ : url.endsWith('.png') ? /image\/png/ : null
        if (!response.ok || response.type === 'opaque' || expected && !expected.test(type)) throw Error('Offline download failed')
        await cache.put(url, response)
      }))
    } catch (error) {
      await caches.delete(cacheName)
      throw error
    }
  })())
  // Updates wait until all existing app windows close; never reload unsaved forms.
})
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name.startsWith(cachePrefix) && name !== cacheName) await caches.delete(name)
    await self.clients.claim()
  })())
})
self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  const root = new URL(self.registration.scope)
  const isShell = request.mode === 'navigate' && url.origin === root.origin && (url.pathname === root.pathname || url.pathname === new URL('index.html', root).pathname)
  // Never intercept authentication routes, external requests, or unknown endpoints.
  if (!isShell && !urls.includes(url.href)) return
  event.respondWith((async () => {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(isShell ? shellURL : request)
    return cached || fetch(request)
  })())
})
