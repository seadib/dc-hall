/**
 * Google Search Console API Management Tool for https://dchall.pro.bd/
 * Zero external dependencies - uses native Node.js crypto and https.
 * 
 * Usage:
 *   node scripts/gsc-tool.js status              - Check site and sitemap status
 *   node scripts/gsc-tool.js submit-sitemap      - Resubmit sitemap to Google
 *   node scripts/gsc-tool.js inspect <url>       - Inspect index status of a specific URL
 *   node scripts/gsc-tool.js inspect-all         - Inspect all URLs from sitemap.xml
 *   node scripts/gsc-tool.js analytics [days]    - Check search clicks & queries
 */

const crypto = require("crypto");
const https = require("https");
const fs = require("fs");
const path = require("path");

const KEY_FILE = path.resolve(__dirname, "../service_account.json");
const SITE_DOMAIN = "sc-domain:dchall.pro.bd";
const SITEMAP_URL = "https://dchall.pro.bd/sitemap.xml";

if (!fs.existsSync(KEY_FILE)) {
  console.error("Error: service_account.json not found in root directory.");
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(KEY_FILE, "utf-8"));

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
    const claim = Buffer.from(JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    })).toString("base64url");

    const sign = crypto.createSign("RSA-SHA256");
    sign.update(`${header}.${claim}`);
    const signature = sign.sign(key.private_key, "base64url");
    const jwt = `${header}.${claim}.${signature}`;

    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
    const req = https.request("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) resolve(parsed.access_token);
          else reject(new Error("Failed to get token: " + data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

function apiRequest(token, urlPath, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    if (postData) {
      headers["Content-Type"] = "application/json";
      headers["Content-Length"] = Buffer.byteLength(postData);
    }

    const req = https.request(`https://www.googleapis.com/${urlPath}`, {
      method,
      headers
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on("error", reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function inspectUrl(token, targetUrl) {
  const postData = JSON.stringify({
    inspectionUrl: targetUrl,
    siteUrl: SITE_DOMAIN
  });

  return new Promise((resolve, reject) => {
    const req = https.request("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)
      }
    }, (res) => {
      let d = "";
      res.on("data", c => d += c);
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(d) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: d });
        }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const command = process.argv[2] || "status";
  console.log(`[GSC Tool] Authenticating with ${key.client_email}...`);
  const token = await getAccessToken();
  console.log("[GSC Tool] Authentication successful!\n");

  if (command === "status") {
    console.log("--- Site Verification & Sitemaps ---");
    const sitemapsRes = await apiRequest(token, `webmasters/v3/sites/${encodeURIComponent(SITE_DOMAIN)}/sitemaps`);
    if (sitemapsRes.data && sitemapsRes.data.sitemap) {
      sitemapsRes.data.sitemap.forEach(s => {
        console.log(`Sitemap: ${s.path}`);
        console.log(`  Last Submitted: ${s.lastSubmitted || "N/A"}`);
        console.log(`  Pending Status: ${s.isPending ? "Pending crawl" : "Processed"}`);
        console.log(`  Warnings: ${s.warnings}, Errors: ${s.errors}`);
        if (s.contents) {
          s.contents.forEach(c => console.log(`  Content: ${c.type} -> Submitted: ${c.submitted}, Indexed: ${c.indexed}`));
        }
      });
    } else {
      console.log("No sitemaps found or response:", sitemapsRes);
    }
  } else if (command === "submit-sitemap") {
    console.log(`Submitting ${SITEMAP_URL} to Google Search Console...`);
    const encodedSite = encodeURIComponent(SITE_DOMAIN);
    const encodedSitemap = encodeURIComponent(SITEMAP_URL);
    const res = await apiRequest(token, `webmasters/v3/sites/${encodedSite}/sitemaps/${encodedSitemap}`, "PUT");
    console.log(`Response HTTP Status: ${res.status} (${res.status === 204 ? "Success (Sitemap queued for processing)" : "Unexpected status"})`);
  } else if (command === "inspect") {
    const url = process.argv[3] || "https://dchall.pro.bd/";
    console.log(`Inspecting URL: ${url}...`);
    const res = await inspectUrl(token, url);
    if (res.data && res.data.inspectionResult) {
      const idx = res.data.inspectionResult.indexStatusResult;
      console.log("\n--- Inspection Result ---");
      console.log(`Verdict:        ${idx?.verdict}`);
      console.log(`Coverage:       ${idx?.coverageState}`);
      console.log(`Robots.txt:     ${idx?.robotsTxtState}`);
      console.log(`Indexing State: ${idx?.indexingState}`);
      console.log(`Page Fetch:     ${idx?.pageFetchState}`);
      console.log(`Google Can.:    ${idx?.googleCanonical}`);
      console.log(`User Can.:      ${idx?.userCanonical}`);
      console.log(`Last Crawled:   ${idx?.lastCrawlTime}`);
      console.log(`Crawled As:     ${idx?.crawledAs}`);
    } else {
      console.log("Response:", res);
    }
  } else if (command === "inspect-all") {
    const sitemapContent = fs.readFileSync(path.resolve(__dirname, "../sitemap.xml"), "utf-8");
    const matches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    console.log(`Found ${matches.length} URLs in sitemap.xml. Inspecting each sequentially...\n`);

    for (let i = 0; i < matches.length; i++) {
      const url = matches[i];
      process.stdout.write(`[${i + 1}/${matches.length}] ${url.padEnd(45)} `);
      try {
        const res = await inspectUrl(token, url);
        const idx = res.data?.inspectionResult?.indexStatusResult;
        console.log(`[${idx?.verdict || "UNKNOWN"}] - ${idx?.coverageState || "N/A"}`);
      } catch (err) {
        console.log(`[ERROR: ${err.message}]`);
      }
      // Small pause to be gentle with API quotas
      await new Promise(r => setTimeout(r, 600));
    }
  } else if (command === "analytics") {
    const days = parseInt(process.argv[3] || "28", 10);
    const today = new Date();
    const past = new Date(today.getTime() - days * 24 * 3600 * 1000);
    const startDate = past.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    console.log(`Fetching Search Analytics (${startDate} to ${endDate})...\n`);
    const res = await apiRequest(token, `webmasters/v3/sites/${encodeURIComponent(SITE_DOMAIN)}/searchAnalytics/query`, "POST", {
      startDate,
      endDate,
      dimensions: ["query"],
      rowLimit: 15
    });

    if (res.data?.rows && res.data.rows.length > 0) {
      console.log("Top Search Queries:");
      console.table(res.data.rows.map(r => ({
        Query: r.keys[0],
        Clicks: r.clicks,
        Impressions: r.impressions,
        CTR: `${(r.ctr * 100).toFixed(1)}%`,
        AvgPosition: r.position.toFixed(1)
      })));
    } else {
      console.log("No query impressions recorded yet or data is still aggregating.");
    }
  } else {
    console.log(`Unknown command: ${command}`);
    console.log("Available commands: status, submit-sitemap, inspect <url>, inspect-all, analytics [days]");
  }
}

main().catch(err => {
  console.error("Execution failed:", err);
  process.exit(1);
});
