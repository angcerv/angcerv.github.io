/* Build placeholders are replaced by pwa-plugin.mjs. No user data is cached here. */
const cachePrefix = 'daycraft-shell-'
const cacheName = cachePrefix + '56a73508e36da3ca42bf'
const resources = ["./","manifest.webmanifest","brand/app-192.png","brand/app-512.png","brand/daycraft-logo.png","brand/apple-touch-icon.png","brand/favicon.png","assets/index-DVm90WHB.js","assets/ActionMenu-BgY5Ivew.js","assets/ActivityTypeField-DABjoH3Z.js","assets/AppearanceFields-DqdAKoZB.js","assets/CalendarView-BaTECBly.js","assets/ColorPicker-BjlT1mA_.js","assets/DateInput-Bral5B2y.js","assets/EventEditor-3Wrg_e1i.js","assets/EventIconPicker-C5qz2wpZ.js","assets/ExpenseDateControl-C6ARqZCA.js","assets/ExpenseEditor-DOWLOPfA.js","assets/ExpensesView-8NTk9K-D.js","assets/GarmentManager-BO0POsj6.js","assets/HabitEditor-XwsUHmQi.js","assets/HabitsView-BZUTXdlr.js","assets/Icon-O4rCrlAP.js","assets/IconPicker-CVniXsEa.js","assets/ListsView-CCXIn6MR.js","assets/OptionRow-BPi3KxIb.js","assets/PeopleView-IUEc4AQC.js","assets/PersonForm-DtDiSHtj.js","assets/RecordEditor-s5Um_dfJ.js","assets/RecordTypes-DsUOumUa.js","assets/RoutineFields-DOtGk3C6.js","assets/RoutineOptionsPanel-IJzrY4Bb.js","assets/RoutineSource-CRSTkpcX.js","assets/RoutineWeekEditor-Don8xOOm.js","assets/RoutinesView-CqG2OOGk.js","assets/SettingsPanel-j5xtPkXd.js","assets/WardrobeEditor-DL9qVDRw.js","assets/WardrobeView-QJJtwzSz.js","assets/WeatherForecastPanel-4YV-CCo8.js","assets/calendar-Bl2KpNhh.js","assets/calendarLayout-DlKRcRbC.js","assets/editorFocus--NXYIjsm.js","assets/esm-B00LNBG6.js","assets/esm-DrFq1KJS.js","assets/eventIcons-_LQoIoMi.js","assets/eventStatus-QfLRYrcS.js","assets/events-DnyWun-9.js","assets/expenses-OPWVFwDt.js","assets/focusIsolation-MNvY5foa.js","assets/garmentColors-Bz04uycx.js","assets/listFocus-BRcgdSRC.js","assets/recurrenceForm-BdVkEkFr.js","assets/routines-B5-c_mOj.js","assets/wardrobe-Bi2xrAbX.js","assets/weather-B1VAJ8Qs.js","assets/web-Bxb9zIFH.js","assets/web-CvELk7Ba.js","assets/web-DSHXjzCu.js","assets/CalendarView-D8LCYhu5.css","assets/HabitsView-BNk6S2jn.css","assets/ListsView-akDngJ4y.css","assets/OptionRow-DxlQgtmP.css","assets/PersonForm-C40knuN9.css","assets/index-CuPKSFTI.css","assets/routines-CjrJEjyM.css","assets/wardrobe-QeLjjye0.css"]
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
