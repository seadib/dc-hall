import requests
import json
import urllib.parse

PROJECT_ID = "w16kaeyg"
DATASET = "production"

GROQ_QUERY = '''{
  "settings": *[_type == "siteSettings"][0]{
    ...,
    "logo": coalesce(logo.asset->url, logo),
    "hero_image": coalesce(hero_image.asset->url, hero_image),
    "notice_pdf": coalesce(notice_pdf.asset->url, notice_pdf)
  },
  "students": *[_type == "student"] | order(position asc){
    ...,
    "photo": coalesce(photo.asset->url, photo),
    "pdfs": {
      "ct1": coalesce(pdfs.ct1.asset->url, pdfs.ct1),
      "ct2": coalesce(pdfs.ct2.asset->url, pdfs.ct2),
      "hy": coalesce(pdfs.hy.asset->url, pdfs.hy),
      "ct3": coalesce(pdfs.ct3.asset->url, pdfs.ct3),
      "yearly": coalesce(pdfs.yearly.asset->url, pdfs.yearly)
    }
  },
  "rooms": *[_type == "room"] | order(room_no asc),
  "home": *[_type == "homePage"][0],
  "hall": *[_type == "hallInfo"][0]{
    ...,
    "hall_photo": coalesce(hall_photo.asset->url, hall_photo),
    "hall_super_photo": coalesce(hall_super_photo.asset->url, hall_super_photo)
  },
  "developer": *[_type == "developerProfile"][0]{
    ...,
    "portrait": coalesce(portrait.asset->url, portrait)
  },
  "gallery": *[_type == "galleryItem"] | order(position asc){
    ...,
    "photo": coalesce(photo.asset->url, photo)
  }
}'''

url = f"https://{PROJECT_ID}.apicdn.sanity.io/v2023-01-01/data/query/{DATASET}?query={urllib.parse.quote(GROQ_QUERY)}"

r = requests.get(url)
print("Status Code:", r.status_code)
if r.status_code == 200:
    res = r.json().get("result", {})
    print("Settings title:", res.get("settings", {}).get("site_title_en"))
    print("Students count:", len(res.get("students", [])))
    print("Student 1 photo:", res.get("students", [])[0].get("photo"))
    print("Student 1 pdfs:", res.get("students", [])[0].get("pdfs"))
    print("Gallery count:", len(res.get("gallery", [])))
    print("Gallery 1 photo:", res.get("gallery", [])[0].get("photo"))
    print("SUCCESS: Complete query resolved perfectly!")
else:
    print("Query error:", r.text)
