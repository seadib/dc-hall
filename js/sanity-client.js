/**
 * Dhaka College International Hall - Sanity CMS Client
 * Connects directly to Sanity Cloud Content Lake via fast CDN.
 */

const SANITY_CONFIG = {
  projectId: "w16kaeyg",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true
};

const SANITY_GROQ_QUERY = `{
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
  "rooms": *[_type == "room"] | order(room_no asc){
    ...,
    "photos": photos[]{
      "url": coalesce(asset->url, @)
    }
  },
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
}`;

/**
 * Fetches all site content from Sanity CDN.
 * Returns null if network fails so the app can fall back to local JSON files.
 */
async function fetchSanityCms() {
  const host = SANITY_CONFIG.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const endpoint = `https://${SANITY_CONFIG.projectId}.${host}/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(SANITY_GROQ_QUERY)}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      console.warn(`Sanity API responded with status ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data && data.result ? data.result : null;
  } catch (error) {
    console.warn("Unable to fetch from Sanity CDN, falling back to local files:", error);
    return null;
  }
}

window.fetchSanityCms = fetchSanityCms;
