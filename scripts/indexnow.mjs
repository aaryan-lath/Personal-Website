// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver share this endpoint).
// Google does not support IndexNow; use Search Console for Google.
//
// Usage:
//   npm run indexnow                     submit every URL in the live sitemap
//   npm run indexnow -- <url> [url ...]  submit specific URLs only
//
// Run this after deploying content changes, not on every build.
// The key is intentionally public: it is served at the key location below,
// which is how IndexNow verifies site ownership.

const HOST = 'www.aaryanlath.com';
const KEY = 'f53754c2347317e9b3db61d533605757';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  let urls = process.argv.slice(2);

  if (urls.length === 0) {
    const res = await fetch(`https://${HOST}/sitemap.xml`);
    if (!res.ok) {
      console.error(`Failed to fetch sitemap: ${res.status}`);
      process.exit(1);
    }
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }

  if (urls.length === 0) {
    console.error('No URLs to submit.');
    process.exit(1);
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });

  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  console.log(`Submitted ${urls.length} URL(s):`);
  for (const u of urls) console.log(`  ${u}`);

  // 200 = OK, 202 = accepted (key validation pending). Anything else is a failure.
  if (res.status !== 200 && res.status !== 202) {
    const body = await res.text();
    console.error(body);
    process.exit(1);
  }
}

main();
