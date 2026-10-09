import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { renderToString } from 'vue/server-renderer'
import { SERVICE_PAGES } from '../src/servicePages.js'

const ORIGIN = 'https://brownpixels.in'

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Could not find expected SEO tag: ${pattern}`)
  return html.replace(pattern, replacement)
}

function applyPageMetadata(html, page, date) {
  const canonical = ORIGIN + page.path
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  let output = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  output = replaceTag(
    output,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`
  )
  output = replaceTag(
    output,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`
  )
  output = replaceTag(
    output,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${title}" />`
  )
  output = replaceTag(
    output,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${description}" />`
  )
  output = replaceTag(
    output,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`
  )
  output = replaceTag(
    output,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${title}" />`
  )
  output = replaceTag(
    output,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${description}" />`
  )

  const jsonLdPattern = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/
  if (!jsonLdPattern.test(output)) throw new Error('Could not find JSON-LD structured data')
  output = output.replace(jsonLdPattern, (_, open, json, close) => {
    const structuredData = JSON.parse(json)
    const graph = structuredData['@graph']
    const webPage = graph.find((node) => node['@type'] === 'WebPage')
    if (!webPage) throw new Error('Could not find the WebPage structured data node')

    webPage['@id'] = `${canonical}#webpage`
    webPage.url = canonical
    webPage.name = page.title
    webPage.description = page.description
    webPage.dateModified = date
    if (page.path !== '/') {
      structuredData['@graph'] = graph.filter((node) => node['@type'] !== 'FAQPage')
    }

    return `${open}\n      ${JSON.stringify(structuredData, null, 2)}\n    ${close}`
  })
  return output
}

const server = await createServer({
  configFile: './vite.config.js',
  server: { middlewareMode: true },
  appType: 'custom'
})

try {
  const { createSiteApp } = await server.ssrLoadModule('/src/siteApp.js')
  const buildDate = new Date()
  const date = buildDate.toISOString().slice(0, 10)
  const indexPath = new URL('../dist/index.html', import.meta.url)
  const template = await readFile(indexPath, 'utf8')
  const mountPoint = '<div id="app"></div>'
  if (!template.includes(mountPoint)) {
    throw new Error('Could not find the empty #app mount point in dist/index.html')
  }

  const pages = [{ path: '/', title: '', description: '' }, ...Object.values(SERVICE_PAGES)]
  const renderedPages = await Promise.all(
    pages.map(async (page) => {
      const appHtml = await renderToString(createSiteApp({ ssr: true, pathname: page.path }))
      let document = template.replaceAll('__BUILD_DATE__', date).replace(mountPoint, `<div id="app">${appHtml}</div>`)
      if (page.path === '/') {
        const title = document.match(/<title>([\s\S]*?)<\/title>/)?.[1]
        const description = document.match(/<meta name="description" content="([^"]*)" \/>/)?.[1]
        if (!title || !description) throw new Error('Could not read the homepage title and description')
        page.title = title
        page.description = description
      }
      document = applyPageMetadata(document, page, date)
      const outputPath =
        page.path === '/'
          ? indexPath
          : new URL(`../dist${page.path}index.html`, import.meta.url)
      return { outputPath, document }
    })
  )

  const datedEndpoints = [
    [new URL('../dist/sitemap.xml', import.meta.url), '__BUILD_DATE__', date],
    [new URL('../dist/feed.xml', import.meta.url), '__BUILD_TIMESTAMP__', buildDate.toUTCString()]
  ]
  const datedFiles = await Promise.all(
    datedEndpoints.map(async ([path, token, value]) => ({
      path,
      token,
      value,
      content: await readFile(path, 'utf8')
    }))
  )
  for (const { path, token, content } of datedFiles) {
    if (!content.includes(token)) {
      throw new Error(`Could not find ${token} in ${path.pathname}`)
    }
  }

  for (const { outputPath, document } of renderedPages) {
    await mkdir(new URL('.', outputPath), { recursive: true })
    await writeFile(outputPath, document)
  }
  await Promise.all(
    datedFiles.map(({ path, token, value, content }) => writeFile(path, content.replaceAll(token, value)))
  )
  console.log(`Prerendered ${renderedPages.length} pages into dist/`)
} finally {
  await server.close()
}
