import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { renderToString } from 'vue/server-renderer'

const server = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true },
  appType: 'custom'
})

try {
  const { createSiteApp } = await server.ssrLoadModule('/src/siteApp.js')
  const appHtml = await renderToString(createSiteApp({ ssr: true }))
  const buildDate = new Date()
  const date = buildDate.toISOString().slice(0, 10)
  const indexPath = new URL('../dist/index.html', import.meta.url)
  const template = await readFile(indexPath, 'utf8')
  const mountPoint = '<div id="app"></div>'
  if (!template.includes(mountPoint)) {
    throw new Error('Could not find the empty #app mount point in dist/index.html')
  }

  const rendered = template
    .replaceAll('__BUILD_DATE__', date)
    .replace(mountPoint, `<div id="app">${appHtml}</div>`)
  const datedEndpoints = [
    [new URL('../dist/sitemap.xml', import.meta.url), '__BUILD_DATE__', date],
    [new URL('../dist/feed.xml', import.meta.url), '__BUILD_TIMESTAMP__', buildDate.toUTCString()]
  ]

  const datedFiles = await Promise.all(
    datedEndpoints.map(async ([path, token, value]) => ({ path, token, value, content: await readFile(path, 'utf8') }))
  )
  for (const { path, token, content } of datedFiles) {
    if (!content.includes(token)) {
      throw new Error(`Could not find ${token} in ${path.pathname}`)
    }
  }

  await writeFile(indexPath, rendered)
  await Promise.all(
    datedFiles.map(({ path, token, value, content }) => writeFile(path, content.replace(token, value)))
  )
  console.log('Prerendered homepage HTML into dist/index.html')
} finally {
  await server.close()
}
