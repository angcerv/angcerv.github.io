import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

// Precache every build chunk, including screens loaded with React.lazy.
export function pwaPlugin() {
  return {
    name: 'daycraft-pwa',
    apply: 'build',
    generateBundle(_options, bundle) {
      const assets = ['./', 'manifest.webmanifest', 'brand/app-192.png', 'brand/app-512.png', 'brand/daycraft-logo.png', 'brand/apple-touch-icon.png', 'brand/favicon.png', ...Object.keys(bundle).filter(name => /\.(js|css)$/.test(name))]
      const hash = createHash('sha256')
      for (const [name, entry] of Object.entries(bundle)) hash.update(name).update(entry.type === 'chunk' ? entry.code : entry.source)
      hash.update(readFileSync(new URL('../public/manifest.webmanifest', import.meta.url)))
      for (const icon of assets.filter(name => name.endsWith('.png'))) hash.update(readFileSync(new URL('../public/' + icon, import.meta.url)))
      const template = readFileSync(new URL('./service-worker.js', import.meta.url), 'utf8')
      hash.update(template)
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: template.replace('__CACHE_VERSION__', hash.digest('hex').slice(0, 20)).replace('__PRECACHE_FILES__', JSON.stringify(assets)) })
    },
  }
}
