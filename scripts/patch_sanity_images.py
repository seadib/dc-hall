import os
import mimetypes
import urllib.request
import json

PROJECT_ID = "w16kaeyg"
DATASET = "production"
TOKEN = "skmzxPQYAq87P9GjNIac7LMDJc5QiMunJ094KjiXNO6FE8092rBmCC7jotH0BxW3RsgLFmvhXpuNfJo2u8pKA3Kl2Sn1WONlrYhigaLxXk00obFGA7w215YFu7sJRYymqWLBwNcaHIOUL5VA8lvA9Li74OhDtcZIJGaFSPm4GuYyDKVLh76l"
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

ASSET_CACHE = {}

def upload_image_to_sanity(file_path):
    """Uploads a local image file to Sanity and returns its asset _id."""
    if not os.path.exists(file_path):
        return None
    
    abs_path = os.path.abspath(file_path)
    if abs_path in ASSET_CACHE:
        return ASSET_CACHE[abs_path]
    
    filename = os.path.basename(file_path)
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        mime_type = "image/jpeg"
    
    with open(file_path, "rb") as f:
        file_bytes = f.read()
    
    url = f"https://{PROJECT_ID}.api.sanity.io/v2023-01-01/assets/images/{DATASET}?filename={urllib.parse.quote(filename)}"
    req = urllib.request.Request(url, data=file_bytes, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": mime_type
    })
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            asset_id = data["document"]["_id"]
            ASSET_CACHE[abs_path] = asset_id
            print(f"  [+] Uploaded {filename} -> {asset_id}")
            return asset_id
    except Exception as e:
        print(f"  [!] Failed to upload {filename}: {e}")
        return None

def resolve_local_path(img_path):
    """Finds the local file path for a relative image path."""
    if not img_path or not isinstance(img_path, str):
        return None
    cleaned = img_path.strip().lstrip("/")
    
    candidates = [
        os.path.join(BASE_DIR, cleaned),
        os.path.join(BASE_DIR, "images", os.path.basename(cleaned)),
        os.path.join(BASE_DIR, "assets", "uploads", os.path.basename(cleaned)),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None

def query_sanity(groq_query):
    url = f"https://{PROJECT_ID}.apicdn.sanity.io/v2023-08-01/data/query/{DATASET}?query={urllib.parse.quote(groq_query)}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))["result"]

def mutate_sanity(mutations):
    if not mutations:
        return
    url = f"https://{PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/{DATASET}"
    payload = json.dumps({"mutations": mutations}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    })
    with urllib.request.urlopen(req) as resp:
        print(f"  [✔] Mutations committed: {len(mutations)} operations.")

def main():
    print(f"Scanning documents in {PROJECT_ID}/{DATASET}...")
    docs = query_sanity("*")
    print(f"Found {len(docs)} documents.")

    image_fields = ["logo", "hero_image", "photo", "portrait", "hall_super_photo", "hall_photo"]
    mutations = []

    for doc in docs:
        doc_id = doc.get("_id")
        doc_type = doc.get("_type")
        patches_set = {}
        patches_unset = []

        # 1. Direct Image Fields
        for field in image_fields:
            val = doc.get(field)
            if isinstance(val, str) and val.strip():
                local_file = resolve_local_path(val)
                if local_file:
                    asset_id = upload_image_to_sanity(local_file)
                    if asset_id:
                        patches_set[field] = {
                            "_type": "image",
                            "asset": {
                                "_type": "reference",
                                "_ref": asset_id
                            }
                        }
                    else:
                        patches_unset.append(field)
                else:
                    print(f"  [!] Missing file on disk for {doc_id}.{field}: {val}")
                    patches_unset.append(field)

        # 2. Photos Array (e.g. rooms)
        if "photos" in doc and isinstance(doc["photos"], list):
            new_photos = []
            has_change = False
            for p in doc["photos"]:
                if isinstance(p, str) and p.strip():
                    has_change = True
                    local_file = resolve_local_path(p)
                    if local_file:
                        asset_id = upload_image_to_sanity(local_file)
                        if asset_id:
                            new_photos.append({
                                "_type": "image",
                                "_key": f"img_{asset_id[:12]}",
                                "asset": {
                                    "_type": "reference",
                                    "_ref": asset_id
                                }
                            })
                    else:
                        print(f"  [!] Missing photo file for {doc_id}: {p}")
                elif isinstance(p, dict):
                    new_photos.append(p)
            if has_change:
                patches_set["photos"] = new_photos

        if patches_set or patches_unset:
            patch_data = {"id": doc_id}
            if patches_set:
                patch_data["set"] = patches_set
            if patches_unset:
                patch_data["unset"] = patches_unset
            mutations.append({"patch": patch_data})

    if mutations:
        print(f"Applying patches for {len(mutations)} documents...")
        mutate_sanity(mutations)
        print("All documents patched successfully!")
    else:
        print("No string image fields needed patching.")

if __name__ == "__main__":
    main()
