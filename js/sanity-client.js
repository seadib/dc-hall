/**
 * Dhaka College International Hall - Sanity CMS Client
 * Connects directly to Sanity Cloud Content Lake with instant real-time synchronization.
 */

const SANITY_CONFIG = {
  projectId: "w16kaeyg",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false // false guarantees instant real-time live data with zero edge-caching lag
};

const SANITY_GROQ_QUERY = `{
  "settings": *[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
    ...,
    "logo": coalesce(logo.asset->url, logo),
    "hero_image": coalesce(hero_image.asset->url, hero_image),
    "notice_pdf": coalesce(notice_pdf.asset->url, notice_pdf)
  },
  "students": *[_type == "student" && !(_id in path("drafts.**"))] | order(position asc){
    ...,
    "photo": coalesce(photo.asset->url, photo),
    "room_no": coalesce(room_ref->room_no, room_no),
    "room_title_en": room_ref->title_en,
    "room_title_bn": room_ref->title_bn,
    "results_1st_year": {
      ...,
      "ct1_pdf": coalesce(results_1st_year.ct1_pdf.asset->url, results_1st_year.ct1_pdf),
      "ct2_pdf": coalesce(results_1st_year.ct2_pdf.asset->url, results_1st_year.ct2_pdf),
      "hy_pdf": coalesce(results_1st_year.hy_pdf.asset->url, results_1st_year.hy_pdf),
      "ct3_pdf": coalesce(results_1st_year.ct3_pdf.asset->url, results_1st_year.ct3_pdf),
      "yearly_pdf": coalesce(results_1st_year.yearly_pdf.asset->url, results_1st_year.yearly_pdf)
    },
    "results_2nd_year": {
      ...,
      "ct1_pdf": coalesce(results_2nd_year.ct1_pdf.asset->url, results_2nd_year.ct1_pdf),
      "ct2_pdf": coalesce(results_2nd_year.ct2_pdf.asset->url, results_2nd_year.ct2_pdf),
      "ct3_pdf": coalesce(results_2nd_year.ct3_pdf.asset->url, results_2nd_year.ct3_pdf),
      "test_pdf": coalesce(results_2nd_year.test_pdf.asset->url, results_2nd_year.test_pdf)
    },
    "pdfs": {
      "ct1": coalesce(pdfs.ct1.asset->url, pdfs.ct1),
      "ct2": coalesce(pdfs.ct2.asset->url, pdfs.ct2),
      "hy": coalesce(pdfs.hy.asset->url, pdfs.hy),
      "ct3": coalesce(pdfs.ct3.asset->url, pdfs.ct3),
      "yearly": coalesce(pdfs.yearly.asset->url, pdfs.yearly)
    }
  },
  "rooms": *[_type == "room" && !(_id in path("drafts.**"))] | order(room_no asc){
    ...,
    "photos": coalesce(photos[].asset->url, photos),
    "assigned_students": assigned_students[]->{ _id, name_en, name_bn, short_roll, student_id }
  },
  "home": *[_type == "homePage" && !(_id in path("drafts.**"))][0],
  "hall": *[_type == "hallInfo" && !(_id in path("drafts.**"))][0]{
    ...,
    "hall_photo": coalesce(hall_photo.asset->url, hall_photo),
    "hall_super_photo": coalesce(hall_super_photo.asset->url, hall_super_photo),
    "campus_photos": campus_photos[]{
      ...,
      "photo": coalesce(asset->url, photo)
    },
    "alumni_profiles": alumni_profiles[]{
      ...,
      "photo": coalesce(photo.asset->url, photo, asset->url)
    }
  },
  "developer": *[_type == "developerProfile" && !(_id in path("drafts.**"))][0]{
    ...,
    "portrait": coalesce(portrait.asset->url, portrait),
    "contributors": contributors[]{
      ...,
      "photo": coalesce(photo.asset->url, photo, asset->url)
    }
  },
  "gallery": *[_type == "galleryItem" && !(_id in path("drafts.**"))] | order(position asc, _createdAt desc){
    ...,
    "photo": coalesce(photo.asset->url, photo)
  },
  "galleryEvents": *[_type == "galleryEvent" && !(_id in path("drafts.**"))] | order(date desc, position asc){
    ...,
    "event_id": event_id.current,
    "photos": photos[]{
      ...,
      "photo": coalesce(photo.asset->url, photo)
    }
  }
}`;

/**
 * Fetches all site content from Sanity Content Lake.
 * Connects directly to live API (api.sanity.io) with &$ts cache-busting parameter.
 */
async function fetchSanityCms() {
  const host = SANITY_CONFIG.useCdn ? "apicdn.sanity.io" : "api.sanity.io";
  // &$ts is a standard GROQ query parameter that guarantees zero browser or proxy caching
  const endpoint = `https://${SANITY_CONFIG.projectId}.${host}/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(SANITY_GROQ_QUERY)}&%24ts=${Date.now()}`;

  try {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 7000) : null;
    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      },
      signal: controller ? controller.signal : undefined
    });
    if (timeoutId) clearTimeout(timeoutId);

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

/**
 * Real-time Live Listener:
 * Uses Server-Sent Events (SSE) to listen for mutations in the Sanity dataset.
 * When an admin publishes or edits any document in Sanity Studio, it triggers onUpdate immediately.
 */
function initSanityRealtimeListener(onUpdate) {
  if (typeof EventSource === "undefined") return null;

  try {
    const listenUrl = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/listen/${SANITY_CONFIG.dataset}?query=${encodeURIComponent('*')}`;
    const evtSource = new EventSource(listenUrl);

    let debounceTimer = null;
    evtSource.addEventListener("mutation", (event) => {
      console.log("⚡ Sanity CMS real-time mutation event received:", event.data);
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (typeof onUpdate === "function") {
          onUpdate();
        }
      }, 500);
    });

    evtSource.onerror = (err) => {
      // EventSource automatically reconnects on error
      console.debug("Sanity EventSource reconnecting...", err);
    };

    return evtSource;
  } catch (err) {
    console.warn("Could not initialize Sanity real-time listener:", err);
    return null;
  }
}

window.fetchSanityCms = fetchSanityCms;
window.initSanityRealtimeListener = initSanityRealtimeListener;
