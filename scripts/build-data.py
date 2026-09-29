import os
import json

root = os.getcwd()

def normalized_upload_path(value):
    if not value or not isinstance(value, str):
        return value
    return value.lstrip('/')

db_path = os.path.join(root, "data", "site_db.json")

try:
    if os.path.exists(db_path):
        with open(db_path, "r", encoding="utf-8") as f:
            db = json.load(f)

        # 1. Normalize Settings
        settings = db.get("settings", {})
        if settings:
            settings["logo"] = normalized_upload_path(settings.get("logo", ""))
            settings["hero_image"] = normalized_upload_path(settings.get("hero_image", ""))
            settings["notice_pdf"] = normalized_upload_path(settings.get("notice_pdf", ""))
            contact_logos = settings.get("contact_logos", {})
            if contact_logos:
                for k in contact_logos:
                    contact_logos[k] = normalized_upload_path(contact_logos[k])

        # 2. Normalize Developer Profile
        developer = db.get("developer", {})
        if developer:
            developer["portrait"] = normalized_upload_path(developer.get("portrait", ""))
            contributors = developer.get("contributors", [])
            for c in contributors:
                c["photo"] = normalized_upload_path(c.get("photo", ""))

        # 3. Normalize & Sort Students
        students_mgmt = db.get("students_mgmt", {})
        students = students_mgmt.get("students", [])
        if students:
            normalized_students = []
            for student in students:
                id_ = student.get("student_id")
                class_no = student.get("class_no", "11")
                pdfs = student.get("pdfs", {})
                for k in list(pdfs.keys()):
                    pdfs[k] = normalized_upload_path(pdfs[k])
                    
                student["photo"] = normalized_upload_path(student.get("photo", ""))
                student["pdfs"] = pdfs
                student["generated_pdf_names"] = {
                    "ct1": f"pdfs/{id_}-{class_no}-ct1.pdf" if id_ else "",
                    "ct2": f"pdfs/{id_}-{class_no}-ct2.pdf" if id_ else "",
                    "hy": f"pdfs/{id_}-{class_no}-hy.pdf" if id_ else "",
                    "ct3": f"pdfs/{id_}-{class_no}-ct3.pdf" if id_ else "",
                    "yearly": f"pdfs/{id_}-{class_no}-y.pdf" if id_ else ""
                }
                normalized_students.append(student)
                
            normalized_students.sort(key=lambda x: int(x.get("position") or 9999))
            students_mgmt["students"] = normalized_students

        # 4. Normalize & Sort Rooms
        rooms_mgmt = db.get("rooms_mgmt", {})
        rooms = rooms_mgmt.get("rooms", [])
        if rooms:
            normalized_rooms = []
            for room in rooms:
                if room.get("photos"):
                    room["photos"] = [normalized_upload_path(p) for p in room["photos"]]
                normalized_rooms.append(room)
            
            # Numeric room sorting
            normalized_rooms.sort(key=lambda x: int(x.get("room_no") or 0))
            rooms_mgmt["rooms"] = normalized_rooms

        # 5. Normalize Gallery
        gallery = db.get("gallery", {})
        items = gallery.get("items", [])
        if items:
            for item in items:
                item["photo"] = normalized_upload_path(item.get("photo", ""))
            items.sort(key=lambda x: int(x.get("position") or 9999))

        # 6. Normalize Hall Info & Hall Super
        hall = db.get("hall", {})
        if hall:
            hall["hall_photo"] = normalized_upload_path(hall.get("hall_photo", ""))
            hall_photos = hall.get("hall_photos", [])
            for p in hall_photos:
                p["photo"] = normalized_upload_path(p.get("photo", ""))
            alumni = hall.get("alumni_profiles", [])
            for a in alumni:
                a["photo"] = normalized_upload_path(a.get("photo", ""))
            alumni.sort(key=lambda x: int(x.get("position") or 9999))

        hall_super = db.get("hall_super", {})
        if hall_super:
            hall_super["hall_super_photo"] = normalized_upload_path(hall_super.get("hall_super_photo", ""))

        # Write normalized site_db.json back
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)
        print("Successfully normalized data/site_db.json")

        # 7. Split into separate files
        dhaka_college = db.get("dhaka_college", {})
        settings_out = {**settings, "dhaka_college": dhaka_college}
        
        with open(os.path.join(root, "data", "settings.json"), "w", encoding="utf-8") as f:
            json.dump(settings_out, f, indent=2, ensure_ascii=False)
            
        with open(os.path.join(root, "data", "home.json"), "w", encoding="utf-8") as f:
            json.dump(db.get("home", {}), f, indent=2, ensure_ascii=False)

        with open(os.path.join(root, "data", "developer.json"), "w", encoding="utf-8") as f:
            json.dump(developer, f, indent=2, ensure_ascii=False)

        with open(os.path.join(root, "data", "students.json"), "w", encoding="utf-8") as f:
            json.dump(students_mgmt, f, indent=2, ensure_ascii=False)

        with open(os.path.join(root, "data", "rooms.json"), "w", encoding="utf-8") as f:
            json.dump(rooms_mgmt, f, indent=2, ensure_ascii=False)

        with open(os.path.join(root, "data", "gallery.json"), "w", encoding="utf-8") as f:
            json.dump(gallery, f, indent=2, ensure_ascii=False)

        hall_out = {**hall, **hall_super}
        with open(os.path.join(root, "data", "hall.json"), "w", encoding="utf-8") as f:
            json.dump(hall_out, f, indent=2, ensure_ascii=False)

        print("Successfully split database into individual files.")
    else:
        print("data/site_db.json does not exist. Cannot split database.")
except Exception as e:
    print("Error processing database:", e)
