import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import { pwaPlugin } from '../scripts/pwa-plugin.mjs'

function fixture(scope = 'https://planner.example/') {
  let emitted
  const plugin = pwaPlugin()
  plugin.generateBundle.call({ emitFile: value => { emitted = value } }, {}, {
    'index.html': { type: 'asset', source: '<html>app</html>' },
    'assets/main.js': { type: 'chunk', code: 'main' },
    'assets/planner.js': { type: 'chunk', code: 'lazy planner' },
    'assets/app.css': { type: 'asset', source: 'body{}' },
  })
  const handlers = new Map(), stores = new Map(), requested = []
  let network = async request => new Response('asset', { headers: { 'content-type': request.url.endsWith('.js') ? 'text/javascript' : request.url.endsWith('.css') ? 'text/css' : request.url.endsWith('.png') ? 'image/png' : 'text/html' } })
  const caches = {
    open: async name => {
      if (!stores.has(name)) stores.set(name, new Map())
      const store = stores.get(name)
      return { put: async (url, response) => store.set(url, response.clone()), match: async value => store.get(typeof value === 'string' ? value : value.url)?.clone() }
    },
    keys: async () => [...stores.keys()],
    delete: async name => stores.delete(name),
  }
  let claimed = false
  vm.runInNewContext(emitted.source, {
    self: { registration: { scope }, clients: { claim: async () => { claimed = true } }, addEventListener: (type, handler) => handlers.set(type, handler) },
    caches, URL, Request,
    fetch: async request => { requested.push(request); return network(request) },
  })
  return {
    emitted, stores, requested,
    setNetwork: value => { network = value },
    claimed: () => claimed,
    lifecycle: type => { let pending; handlers.get(type)({ waitUntil: value => { pending = value } }); return pending },
    fetch: (path, mode = 'cors', method = 'GET') => { let response; handlers.get('fetch')({ request: { url: new URL(path, scope).href, mode, method }, respondWith: value => { response = value } }); return response },
  }
}
test('PWA manifest opens standalone and uses existing PNG icons', async () => {
  const manifest = JSON.parse(await readFile(new URL('../public/manifest.webmanifest', import.meta.url)))
  assert.equal(manifest.display, 'standalone')
  assert.equal(manifest.start_url, './')
  for (const icon of manifest.icons) {
    const content = await readFile(new URL('../public/' + icon.src, import.meta.url))
    assert.equal(content.subarray(1, 4).toString(), 'PNG')
  }
})
test('offline install includes lazy screens and serves them and navigation without network', async () => {
  const app = fixture()
  await app.lifecycle('install')
  assert.ok(app.requested.some(request => request.url.endsWith('/assets/planner.js')))
  assert.ok(app.requested.every(request => request.redirect === 'error'))
  app.setNetwork(async () => { throw Error('offline') })
  assert.equal(await (await app.fetch('/', 'navigate')).text(), 'asset')
  assert.equal(await (await app.fetch('/assets/planner.js')).text(), 'asset')
})
test('service worker leaves authentication, external requests and mutations untouched', async () => {
  const app = fixture()
  assert.equal(app.fetch('/auth/login', 'navigate'), undefined)
  assert.equal(app.fetch('https://other.example/'), undefined)
  assert.equal(app.fetch('/api/recipes'), undefined)
  assert.equal(app.fetch('/', 'navigate', 'POST'), undefined)
})
test('failed precache is removed and cannot be reported as ready', async () => {
  const app = fixture()
  app.setNetwork(async () => new Response('unavailable', { status: 503 }))
  await assert.rejects(app.lifecycle('install'), /Offline download failed/)
  assert.equal(app.stores.size, 0)
})
test('activation removes only obsolete app shell caches and claims the installed app', async () => {
  const app = fixture()
  app.stores.set('daycraft-shell-old', new Map())
  app.stores.set('other-app-cache', new Map())
  app.stores.set('whats-cooking-shell-current', new Map())
  await app.lifecycle('install')
  await app.lifecycle('activate')
  assert.equal(app.stores.has('daycraft-shell-old'), false)
  assert.equal(app.stores.has('other-app-cache'), true)
  assert.equal(app.claimed(), true)
  assert.equal(app.stores.has('whats-cooking-shell-current'), true)
})
test('build generates stable cache version for identical source', () => {
  assert.equal(fixture().emitted.source, fixture().emitted.source)
  assert.equal(fixture().emitted.source.includes('__CACHE_VERSION__'), false)
})

test('offline install rejects a login page returned in place of JavaScript', async () => {
  const app = fixture()
  app.setNetwork(async () => new Response('<html>Sign in</html>', { headers: { 'content-type': 'text/html' } }))
  await assert.rejects(app.lifecycle('install'), /Offline download failed/)
  assert.equal(app.stores.size, 0)
})

test('DayCraft service worker stays inside its own publication folder', async () => {
 const app = fixture('https://planner.example/daycraft/')
 await app.lifecycle('install')
 assert.ok(app.requested.every(request => request.url.startsWith('https://planner.example/daycraft/')))
 assert.equal(app.fetch('/', 'navigate'), undefined)
 assert.equal(app.fetch('/whats-cooking/', 'navigate'), undefined)
 app.setNetwork(async () => { throw Error('offline') })
 assert.equal(await (await app.fetch('/daycraft/', 'navigate')).text(), 'asset')
})
