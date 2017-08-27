const head = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>https://www.xiao555.com.cn/</loc>
  <lastmod>2017-06-13</lastmod>
  <priority>0.6</priority>
</url>
<url>
  <loc>https://www.xiao555.com.cn/archive</loc>
  <lastmod>2017-06-13</lastmod>
  <priority>0.6</priority>
</url>
<url>
  <loc>https://www.xiao555.com.cn/about</loc>
  <lastmod>2017-06-12</lastmod>
  <priority>0.6</priority>
</url>\r\n`
const tail = '</urlset>'

const api = 'https://www.xiao555.com.cn/api/articles?status=Published'
const siteUrl = 'https://www.xiao555.com.cn'

let getSitemapFromBody = (result) => {
  let body = ''
  for (var post in result.data) {
    body += `  <url>\r\n`
    body += `    <loc>${siteUrl}/posts/${result.data[post].path}</loc>\r\n`
    body += `    <lastmod>${result.data[post].lastEditTime}</lastmod>\r\n`
    body += `    <priority>0.6</priority>\r\n`
    body += `  </url>\r\n`
  }
  return head + body + tail
}

module.exports = {
  api,
  getSitemapFromBody
}
