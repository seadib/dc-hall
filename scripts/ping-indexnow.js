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

const options = {
  hostname: "api.indexnow.org",
  port: 443,
  path: "/IndexNow",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow Ping Status: ${res.statusCode} (${res.statusMessage})`);
  res.on("data", (d) => process.stdout.write(d));
});

req.on("error", (error) => {
  console.error("Error pinging IndexNow:", error);
});

req.write(data);
req.end();
