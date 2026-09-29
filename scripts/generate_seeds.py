import os
import json

root = os.getcwd()
students_dir = os.path.join(root, "data", "students")
rooms_dir = os.path.join(root, "data", "rooms")

os.makedirs(students_dir, exist_ok=True)
os.makedirs(rooms_dir, exist_ok=True)

groups = ["science", "commerce", "arts"]
blood_groups = ["B+", "A+", "O+", "AB+", "A-", "B-", "O-", "AB-"]

student_seeds = [
  ["adib1", "Adib Rahman", "আদিব রহমান"],
  ["santo2", "Santo Islam", "সান্ত ইসলাম"],
  ["jahid3", "Jahid Hasan", "জাহিদ হাসান"],
  ["sakil4", "Sakil Ahmed", "সাকিল আহমেদ"],
  ["sasfkat5", "Sasfkat Hossain", "সাসফকাত হোসেন"],
  ["munsi6", "Munsi Karim", "মুন্সি করিম"],
  ["musfik7", "Musfik Rahman", "মুশফিক রহমান"],
  ["esty8", "Esty Hasan", "এস্টি হাসান"],
  ["nafis9", "Nafis Mahmud", "নাফিস মাহমুদ"],
  ["kayes10", "Kayes Ahmed", "কায়েস আহমেদ"],
  ["jahid11", "Jahidul Islam", "জাহিদুল ইসলাম"],
  ["siam12", "Siam Rahman", "সিয়াম রহমান"],
  ["siam13", "Siam Hossain", "সিয়াম হোসেন"],
  ["saimun14", "Saimun Islam", "সাইমুন ইসলাম"],
  ["pranto15", "Pranto Das", "প্রান্ত দাস"],
  ["nayem18", "Nayem Islam", "নাঈম ইসলাম"],
  ["alauddin17", "Alauddin Khan", "আলাউদ্দিন খান"],
  ["rafiq18", "Rafiq Hasan", "রফিক হাসান"],
  ["riyad19", "Riyad Ahmed", "রিয়াদ আহমেদ"],
  ["mosih20", "Mosih Rahman", "মসিহ রহমান"],
  ["abrar21", "Abrar Hossain", "আবরার হোসেন"],
  ["rudro22", "Rudro Mahmud", "রুদ্র মাহমুদ"],
  ["riasad23", "Riasad Karim", "রিয়াসাদ করিম"],
  ["musa24", "Musa Islam", "মুসা ইসলাম"],
  ["ariful25", "Ariful Hasan", "আরিফুল হাসান"],
  ["rejawl26", "Rejawl Ahmed", "রেজাউল আহমেদ"],
  ["sabit27", "Sabit Rahman", "সাবিত রহমান"],
  ["alif28", "Alif Mahmud", "আলিফ মাহমুদ"]
]

sheet_overrides = {
  "adib1": { "name": "Abdullah Al Adib", "bnName": "আবদুল্যাহ আল আদিব", "fullRoll": "1202526010139", "roll": "139", "room": "103", "group": "science", "section": "A", "practicalGroup": "A2", "blood": "A+", "address": "Hatia, Noakhali", "phone": "01625329874", "email": "seadibpc@gmail.com", "fb": "https://www.facebook.com/seadix", "bio": "" },
  "santo2": { "name": "Naimul Islam", "bnName": "নাইমুল ইসলাম", "fullRoll": "1202526010161", "roll": "161", "room": "105", "group": "science", "section": "B", "practicalGroup": "B1", "blood": "O+", "address": "Hatia, Noakhali", "phone": "01613601161", "email": "mistersanto1000@gmail.com", "bio": "" },
  "jahid3": { "name": "Md Zahidul Islam", "bnName": "মোঃ জাহিদুল ইসলাম", "fullRoll": "1202526010164", "roll": "164", "room": "102", "group": "science", "section": "B", "practicalGroup": "B1", "blood": "A+", "address": "Hatia, Noakhali", "phone": "01844474892", "email": "zahidsigma164@gmail.com", "fb": "https://www.facebook.com/share/1BABcH2cjn/", "bio": "I'm SIGMA The Zahid" },
  "sasfkat5": { "name": "Shafkat Rahman", "bnName": "শাফকাত রহমান", "fullRoll": "1202526010008", "roll": "008", "room": "104", "group": "science", "section": "A", "practicalGroup": "A1", "blood": "O+", "address": "Deboi, Rupganj, Narayanganj", "phone": "01996569688", "email": "shafkatrahmandkam@gmail.com", "fb": "https://www.facebook.com/share/18oRrju5zF/", "bio": "CT-1= Absent, CT-2= Absent, Half yearly = Absent, CT-3= loading, Year FINAL= Loading" },
  "sakil4": { "name": "Md. Shakil Sheikh", "bnName": "মোঃ শাকিল শেখ", "fullRoll": "1202526010326", "roll": "326", "room": "103", "group": "science", "section": "C", "practicalGroup": "C1", "blood": "O+", "address": "Kanchan, Rupganj, Narayanganj", "phone": "01739554600", "fatherPhone": "01758684640", "bio": "" },
  "pranto15": { "name": "Ratul Hassan Pranto", "bnName": "রাতুল হাসান প্রান্ত", "fullRoll": "1202526010863", "roll": "863", "room": "106", "group": "science", "section": "F", "practicalGroup": "F2", "blood": "O+", "address": "Kushtia Sadar, Kushtia", "phone": "01995393323", "fatherPhone": "01755729078", "email": "rh597040@gmail.com", "fb": "https://www.facebook.com/share/1T3gCxVk6J/", "bio": "" },
  "musfik7": { "name": "Md. Mushfiqur Rahman", "bnName": "মোঃ মুশফিকুর রহমান", "fullRoll": "1202526010122", "roll": "122", "room": "107", "group": "science", "section": "A", "practicalGroup": "A2", "blood": "A+", "address": "South Sakuchia, Monpura, Bhola", "phone": "01577390514", "email": "mushfiq88bd@gmail.com", "fb": "https://www.facebook.com/share/18osDPmvYU/", "bio": "" },
  "siam12": { "name": "Siam Hasan", "bnName": "সিয়াম হাসান", "fullRoll": "1202526010195", "roll": "195", "room": "107", "group": "science", "section": "B", "practicalGroup": "B1", "blood": "B+", "address": "Moshinda Majpara, Gurudaspur, Natore", "phone": "01804692801", "fatherPhone": "01761866285", "email": "siamhasananik01@gmail.com", "fb": "https://www.facebook.com/siam.hasan.anik.402132", "bio": "I am a Crazy Boy." },
  "alif28": { "name": "Alimuzzamann Alif", "bnName": "আলিমুজ্জামান আলিফ", "fullRoll": "1202526010153", "roll": "153", "room": "110", "group": "science", "section": "B", "practicalGroup": "B1", "blood": "AB+", "address": "সুন্দরগঞ্জ, গাইবান্ধা", "phone": "01758173284", "fatherPhone": "1540759625", "email": "mdalimuzzamanalif890@gmail.com", "fb": "https://www.facebook.com/share/18MFvaQuS2/", "bio": "What an amazing website it is for our international hall which created by meritorious adib. Keep going higher. Truly appreciating for such kind of initiatives. With all are staying with it . Hoping main target Will fulfill with it's modern development." },
  "nafis9": { "name": "Nafis Alam Tarif", "bnName": "নাফিস আলম তারিফ", "fullRoll": "1202526010141", "roll": "141", "room": "108", "group": "science", "section": "A", "practicalGroup": "A2", "blood": "O+", "address": "Ranisonkail, Thakurgaon", "phone": "01346588124", "fatherPhone": "01738770330", "email": "tarifalam265@gmail.com", "fb": "https://www.facebook.com/share/1EDVSWD95F/", "bio": "Competition, I'm The Competition...." },
  "kayes10": { "name": "Riasadul Islam Kayes", "bnName": "রিয়াসাদুল ইসলাম কায়েস", "fullRoll": "1202526010882", "roll": "882", "room": "108", "group": "science", "section": "F", "practicalGroup": "F2", "blood": "A+", "address": "Chakaria, Cox's bazar.", "phone": "01629171207", "email": "riasadulislamkayes@gmail.com", "bio": "\"প্রত্যেক প্রাণীই মৃত্যুর স্বাদ গ্রহণ করবে\"" },
  "ariful25": { "name": "Ariful Islam", "bnName": "আরিফুল ইসলাম", "fullRoll": "1202526010050", "roll": "050", "room": "109", "group": "science", "section": "A", "practicalGroup": "A1", "blood": "O+", "address": "Rohanpur, Gomastapur, Chapainawabganj", "phone": "01848631025", "email": "arifulislam20238086@gmail.com", "fb": "https://www.facebook.com/profile.php?id=100093029856067", "bio": "" },
  "rejawl26": { "name": "Md Rezaul Karim", "bnName": "মোঃ রেজাউল করিম", "fullRoll": "1202526030098", "roll": "098", "room": "110", "group": "arts", "section": "", "practicalGroup": "", "blood": "A+", "address": "Titas, Cumilla", "phone": "01641659606", "email": "rkdc8989@gmail.com", "bio": "Sports lover" }
}

en_to_bn_nums = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' }
def to_bn_num(num_str):
    return "".join(en_to_bn_nums.get(c, c) for c in str(num_str))

for index, (slug, name, bnName) in enumerate(student_seeds):
    overrides = sheet_overrides.get(slug, {})
    
    group = overrides.get("group", groups[index % len(groups)])
    section = overrides.get("section", ["A", "B", "C", "D", "E"][index % 5] if group == "science" else "")
    room = overrides.get("room", str(101 + index // 2))
    roll = overrides.get("roll", str(101 + index).zfill(3))
    full_roll = overrides.get("fullRoll", f"1202526010{roll}" if group == "science" else roll)
    practical_group = overrides.get("practicalGroup", f"{section}{index % 2 + 1}" if section else "")
    phone = overrides.get("phone", f"0170000{str(index + 1).zfill(4)}")
    
    address_list = ["Kaliganj, Dhaka", "Narayanganj", "Cumilla", "Gazipur", "Mymensingh", "Sylhet", "Barishal", "Tangail"]
    address_bn_list = ["কালীগঞ্জ, ঢাকা", "নারায়ণগঞ্জ", "কুমিল্লা", "গাজীপুর", "ময়মনসিংহ", "সিলেট", "বরিশাল", "টাঙ্গাইল"]
    address = overrides.get("address", address_list[index % 8])
    address_bn = overrides.get("address", address_bn_list[index % 8])
    
    student_data = {
      "position": index + 1,
      "student_id": slug,
      "name_en": overrides.get("name", name),
      "name_bn": overrides.get("bnName", bnName),
      "room_no": room,
      "roommate_ids": [],
      "short_roll": roll,
      "full_roll": full_roll,
      "class_no": "11",
      "group": group,
      "group_en": "Science" if group == 'science' else "Humanities" if group == 'arts' else "Business Studies",
      "group_bn": "বিজ্ঞান" if group == 'science' else "মানবিক" if group == 'arts' else "ব্যবসায় শিক্ষা",
      "section": section,
      "practical_group": practical_group,
      "blood_group": overrides.get("blood", blood_groups[index % len(blood_groups)]),
      "address_en": address,
      "address_bn": address_bn,
      "phone": phone,
      "father_phone": overrides.get("fatherPhone", f"0180000{str(index + 1).zfill(4)}"),
      "email": overrides.get("email", f"{slug}@gmail.com"),
      "facebook": overrides.get("fb", "https://facebook.com/"),
      "bio_en": overrides.get("bio", "Demo student profile for International Hall. Detailed information can be updated later from the student sheet."),
      "bio_bn": overrides.get("bio", "আন্তর্জাতিক ছাত্রাবাসের ডেমো শিক্ষার্থী প্রোফাইল। পরে sheet থেকে বিস্তারিত তথ্য আপডেট করা যাবে।"),
      "photo": f"images/{slug}.jpg",
      "pdfs": {
        "ct1": f"pdfs/{slug}-11-ct1.pdf",
        "ct2": f"pdfs/{slug}-11-ct2.pdf",
        "hy": f"pdfs/{slug}-11-hy.pdf",
        "ct3": f"pdfs/{slug}-11-ct3.pdf",
        "yearly": f"pdfs/{slug}-11-y.pdf"
      },
      "custom_links": []
    }
    
    with open(os.path.join(students_dir, f"{slug}.json"), "w", encoding="utf-8") as f:
        json.dump(student_data, f, indent=2, ensure_ascii=False)
    print(f"Generated {slug}")

for i in range(1, 15):
    room_no = str(100 + i)
    room_data = {
      "room_no": room_no,
      "title_en": f"Room {room_no}",
      "title_bn": f"রুম {to_bn_num(room_no)}",
      "description_en": "Demo room details. Later you can replace the room photos and add bed, table, window and seat information.",
      "description_bn": "রুমের ডেমো বিবরণ। পরে আপনি রুমের ছবি পরিবর্তন করতে এবং বিছানা, টেবিল, জানালা ও সিটের তথ্য যুক্ত করতে পারবেন।",
      "photos": [
        f"images/room{i}-1.jpg",
        f"images/room{i}-2.jpg",
        f"images/room{i}-3.jpg",
        f"images/room{i}-4.jpg"
      ]
    }
    with open(os.path.join(rooms_dir, f"{room_no}.json"), "w", encoding="utf-8") as f:
        json.dump(room_data, f, indent=2, ensure_ascii=False)
    print(f"Generated room {room_no}")
