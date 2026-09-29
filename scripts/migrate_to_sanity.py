import json
import os
import requests

PROJECT_ID = "w16kaeyg"
DATASET = "production"
TOKEN = "skmzxPQYAq87P9GjNIac7LMDJc5QiMunJ094KjiXNO6FE8092rBmCC7jotH0BxW3RsgLFmvhXpuNfJo2u8pKA3Kl2Sn1WONlrYhigaLxXk00obFGA7w215YFu7sJRYymqWLBwNcaHIOUL5VA8lvA9Li74OhDtcZIJGaFSPm4GuYyDKVLh76l"

API_URL = f"https://{PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/{DATASET}"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

def clean_doc(doc):
    """Ensure all keys and subkeys are compatible with Sanity."""
    if isinstance(doc, dict):
        cleaned = {}
        for k, v in doc.items():
            # Avoid keys starting with _ unless they are Sanity system fields
            if k.startswith("_") and k not in ["_id", "_type", "_key"]:
                continue
            cleaned[k] = clean_doc(v)
        return cleaned
    elif isinstance(doc, list):
        # Sanity arrays of objects need a unique _key for each object
        cleaned_list = []
        for i, item in enumerate(doc):
            if isinstance(item, dict):
                item_cleaned = clean_doc(item)
                if "_key" not in item_cleaned:
                    item_cleaned["_key"] = f"key_{i}_{hash(str(item)) & 0xffffffff:x}"
                cleaned_list.append(item_cleaned)
            else:
                cleaned_list.append(item)
        return cleaned_list
    return doc

def main():
    db_path = os.path.join(os.path.dirname(__file__), "..", "data", "site_db.json")
    with open(db_path, "r", encoding="utf-8") as f:
        db = json.load(f)

    mutations = []

    # 1. Site Settings Document
    settings = db.get("settings", {})
    settings_doc = clean_doc({
        "_id": "siteSettings",
        "_type": "siteSettings",
        **settings,
        "dhaka_college": db.get("dhaka_college", {})
    })
    mutations.append({"createOrReplace": settings_doc})

    # 2. Home Page Document
    home = db.get("home", {})
    home_doc = clean_doc({
        "_id": "homePage",
        "_type": "homePage",
        **home
    })
    mutations.append({"createOrReplace": home_doc})

    # 3. Hall Info Document
    hall = db.get("hall", {})
    hall_super = db.get("hall_super", {})
    hall_doc = clean_doc({
        "_id": "hallInfo",
        "_type": "hallInfo",
        **hall,
        **hall_super
    })
    mutations.append({"createOrReplace": hall_doc})

    # 4. Developer Profile Document
    developer = db.get("developer", {})
    dev_doc = clean_doc({
        "_id": "developerProfile",
        "_type": "developerProfile",
        **developer
    })
    mutations.append({"createOrReplace": dev_doc})

    # 5. Students
    students = db.get("students_mgmt", {}).get("students", [])
    for idx, s in enumerate(students):
        student_id = s.get("student_id") or f"student_{idx+1}"
        s_doc = clean_doc({
            "_id": f"student-{student_id}",
            "_type": "student",
            **s
        })
        mutations.append({"createOrReplace": s_doc})

    # 6. Rooms
    rooms = db.get("rooms_mgmt", {}).get("rooms", [])
    for idx, r in enumerate(rooms):
        room_no = str(r.get("room_no") or f"room_{idx+1}")
        r_doc = clean_doc({
            "_id": f"room-{room_no}",
            "_type": "room",
            **r
        })
        mutations.append({"createOrReplace": r_doc})

    # 7. Gallery Items
    gallery_items = db.get("gallery", {}).get("items", [])
    for idx, g in enumerate(gallery_items):
        g_doc = clean_doc({
            "_id": f"gallery-item-{idx+1}",
            "_type": "galleryItem",
            **g
        })
        mutations.append({"createOrReplace": g_doc})

    print(f"Total documents to upload/replace: {len(mutations)}")

    # Send in batches of 25
    batch_size = 25
    for i in range(0, len(mutations), batch_size):
        batch = mutations[i:i+batch_size]
        print(f"Sending batch {i // batch_size + 1}/{(len(mutations) + batch_size - 1) // batch_size} ({len(batch)} items)...")
        res = requests.post(API_URL, headers=HEADERS, json={"mutations": batch})
        if res.status_code == 200:
            print(f"Batch {i // batch_size + 1} succeeded! Transaction: {res.json().get('transactionId')}")
        else:
            print(f"Batch {i // batch_size + 1} failed: {res.status_code} - {res.text}")
            return

    print("SUCCESS: All data successfully migrated to Sanity Content Lake!")

if __name__ == "__main__":
    main()
