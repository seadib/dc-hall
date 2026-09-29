import requests

url_rooms = 'https://w16kaeyg.apicdn.sanity.io/v2023-01-01/data/query/production?query=*[_type=="room"]{room_no}'
rooms = requests.get(url_rooms).json().get('result', [])
room_nos = [str(r.get('room_no')) for r in rooms]
print(f"Total rooms in Sanity: {len(room_nos)}")
print("Rooms list:", room_nos)
dupes_rooms = [x for x in set(room_nos) if room_nos.count(x) > 1]
print("Duplicate rooms:", dupes_rooms if dupes_rooms else "None (Clean!)")

url_students = 'https://w16kaeyg.apicdn.sanity.io/v2023-01-01/data/query/production?query=*[_type=="student"]{student_id, name_en, room_no}'
students = requests.get(url_students).json().get('result', [])
student_ids = [s.get('student_id') for s in students]
print(f"\nTotal students in Sanity: {len(students)}")
dupes_students = [x for x in set(student_ids) if student_ids.count(x) > 1]
print("Duplicate student IDs:", dupes_students if dupes_students else "None (Clean!)")
