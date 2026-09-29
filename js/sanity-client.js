/**
 * Dhaka College International Hall - Sanity CMS Client
 * Connects directly to Sanity Cloud Content Lake with real-time live synchronization.
 */

const SANITY_CONFIG = {
  projectId: "w16kaeyg",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false // false guarantees instant real-time live data with zero edge-caching lag
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
    "photos": coalesce(photos[].asset->url, photos)
  },
  "home": *[_type == "homePage"][0],
  "hall": *[_type == "hallInfo"][0]{
    ...,
    "hall_photo": coalesce(hall_photo.asset->url, hall_photo),
    "hall_super_photo": coalesce(hall_super_photo.asset->url, hall_super_photo),
    "hall_photos": hall_photos[]{
      ...,
      "photo": coalesce(photo.asset->url, photo, asset->url)
    },
    "alumni_profiles": alumni_profiles[]{
      ...,
      "photo": coalesce(photo.asset->url, photo, asset->url)
    }
  },
  "developer": *[_type == "developerProfile"][0]{
    ...,
    "portrait": coalesce(portrait.asset->url, portrait)
  },
  "gallery": *[_type == "galleryItem"] | order(position asc, _createdAt desc){
    ...,
    "photo": coalesce(photo.asset->url, photo)
  }
}`;

/**
 * Fetches all site content from Sanity Content Lake.
 * Uses cache: "no-store" and timestamp to bypass any browser cache.
 */
async function fetchSanityCms() {
  const host = SANITY_CONFIG.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const timestamp = Date.now();
  const endpoint = `https://${SANITY_CONFIG.projectId}.${host}/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(SANITY_GROQ_QUERY)}&_t=${timestamp}`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) {
      console.warn(`Sanity API responded with status ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data && data.result) {
      console.log("✔ Live data successfully fetched from Sanity CMS Lake:", data.result);
      return data.result;
    }
    return null;
  } catch (error) {
    console.warn("Unable to fetch from Sanity CMS, falling back to local files:", error);
    return null;
  }
}

window.fetchSanityCms = fetchSanityCms;
