const https = require("https");

const data = JSON.stringify({
  host: "dchall.pro.bd",
  key: "24584e0303ec415caadfc3342eb8338e",
  keyLocation: "https://dchall.pro.bd/24584e0303ec415caadfc3342eb8338e.txt",
  urlList: [
    "https://dchall.pro.bd/",
    "https://dchall.pro.bd/students.html",
    "https://dchall.pro.bd/roommates.html",
    "https://dchall.pro.bd/results.html",
    "https://dchall.pro.bd/hostel.html",
    "https://dchall.pro.bd/gallery.html",
    "https://dchall.pro.bd/developer.html",
    "https://dchall.pro.bd/profile.html",
    "https://dchall.pro.bd/dc-clubs.html",
    "https://dchall.pro.bd/dc-social.html",
    "https://dchall.pro.bd/embed.html"
  ]
});

const endpoints = ["www.bing.com", "api.indexnow.org", "yandex.com"];

endpoints.forEach(host => {
  const req = https.request({
    hostname: host,
    port: 443,
    path: "/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(data)
    }
  }, (res) => {
    console.log(`[IndexNow] ${host} -> Status: ${res.statusCode} (${res.statusMessage})`);
  });

  req.on("error", err => console.error(`[IndexNow] Error for ${host}:`, err.message));
  req.write(data);
  req.end();
});
