import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

// Normalize upload paths from CMS by stripping leading slashes
function normalizedUploadPath(value) {
  if (!value || typeof value !== "string") return value;
  return value.replace(/^\/+/, "");
}

const dbPath = path.join(root, "data", "site_db.json");

try {
  if (existsSync(dbPath)) {
    const db = JSON.parse(await readFile(dbPath, "utf8"));

    // 1. Normalize Settings
    if (db.settings) {
      db.settings.logo = normalizedUploadPath(db.settings.logo);
      db.settings.hero_image = normalizedUploadPath(db.settings.hero_image);
      db.settings.notice_pdf = normalizedUploadPath(db.settings.notice_pdf);
      if (db.settings.contact_logos) {
        for (const [k, v] of Object.entries(db.settings.contact_logos)) {
          db.settings.contact_logos[k] = normalizedUploadPath(v);
        }
      }
    }

    // 2. Normalize Developer Profile
    if (db.developer) {
      db.developer.portrait = normalizedUploadPath(db.developer.portrait);
      if (db.developer.contributors) {
        db.developer.contributors = db.developer.contributors.map(c => ({
          ...c,
          photo: normalizedUploadPath(c.photo)
        }));
      }
    }

    // 3. Normalize & Sort Students
    if (db.students_mgmt && db.students_mgmt.students) {
      let students = db.students_mgmt.students.map((student, idx) => {
        const id = student.student_id;
        const classNo = student.class_no || "11";
        const pdfs = student.pdfs || {};
        for (const [key, value] of Object.entries(pdfs)) {
          pdfs[key] = normalizedUploadPath(value);
        }
        return {
          ...student,
          photo: normalizedUploadPath(student.photo),
          pdfs,
          generated_pdf_names: {
            ct1: id ? `pdfs/${id}-${classNo}-ct1.pdf` : "",
            ct2: id ? `pdfs/${id}-${classNo}-ct2.pdf` : "",
            hy: id ? `pdfs/${id}-${classNo}-hy.pdf` : "",
            ct3: id ? `pdfs/${id}-${classNo}-ct3.pdf` : "",
            yearly: id ? `pdfs/${id}-${classNo}-y.pdf` : ""
          }
        };
      });

      students.sort((a, b) => Number(a.position || 9999) - Number(b.position || 9999));
      db.students_mgmt.students = students;
    }

    // 4. Normalize & Sort Rooms
    if (db.rooms_mgmt && db.rooms_mgmt.rooms) {
      let rooms = db.rooms_mgmt.rooms;
      for (const room of rooms) {
        if (room.photos) {
          room.photos = room.photos.map(normalizedUploadPath);
        }
      }
      rooms.sort((a, b) => String(a.room_no).localeCompare(String(b.room_no), undefined, { numeric: true }));
      db.rooms_mgmt.rooms = rooms;
    }

    // 5. Normalize Gallery
    if (db.gallery && db.gallery.items) {
      let items = db.gallery.items.map(item => ({
        ...item,
        photo: normalizedUploadPath(item.photo)
      }));
      items.sort((a, b) => Number(a.position || 9999) - Number(b.position || 9999));
      db.gallery.items = items;
    }

    // 6. Normalize Hall Info & Hall Super
    if (db.hall) {
      db.hall.hall_photo = normalizedUploadPath(db.hall.hall_photo);
      if (db.hall.hall_photos) {
        db.hall.hall_photos = db.hall.hall_photos.map(item => ({
          ...item,
          photo: normalizedUploadPath(item.photo)
        }));
      }
      if (db.hall.alumni_profiles) {
        db.hall.alumni_profiles = db.hall.alumni_profiles.map(item => ({
          ...item,
          photo: normalizedUploadPath(item.photo)
        }));
        db.hall.alumni_profiles.sort((a, b) => Number(a.position || 9999) - Number(b.position || 9999));
      }
    }
    if (db.hall_super) {
      db.hall_super.hall_super_photo = normalizedUploadPath(db.hall_super.hall_super_photo);
    }

    // Write normalized site_db.json back
    await writeFile(dbPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
    console.log("Successfully normalized data/site_db.json");

    // 7. Split into separate files
    const settingsOut = {
      ...db.settings,
      dhaka_college: db.dhaka_college || {}
    };
    await writeFile(path.join(root, "data", "settings.json"), JSON.stringify(settingsOut, null, 2), "utf8");
    await writeFile(path.join(root, "data", "home.json"), JSON.stringify(db.home || {}, null, 2), "utf8");
    await writeFile(path.join(root, "data", "developer.json"), JSON.stringify(db.developer || {}, null, 2), "utf8");
    await writeFile(path.join(root, "data", "students.json"), JSON.stringify(db.students_mgmt || { students: [] }, null, 2), "utf8");
    await writeFile(path.join(root, "data", "rooms.json"), JSON.stringify(db.rooms_mgmt || { rooms: [] }, null, 2), "utf8");
    await writeFile(path.join(root, "data", "gallery.json"), JSON.stringify(db.gallery || { items: [] }, null, 2), "utf8");

    const hallOut = {
      ...(db.hall || {}),
      ...(db.hall_super || {})
    };
    await writeFile(path.join(root, "data", "hall.json"), JSON.stringify(hallOut, null, 2), "utf8");

    console.log("Successfully split database into individual files.");
  } else {
    console.error("data/site_db.json does not exist. Cannot split database.");
  }
} catch (err) {
  console.error("Error processing database:", err);
}
