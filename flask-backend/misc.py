import sqlite3

conn = sqlite3.connect('freeg.db')

c = conn.cursor()

# c.execute("""insert into expiration ("item_name", "item_exp") values("banana", 3)""")

# c.execute("""SELECT * from expiration""")
# print(c.fetchall())
#
# conn.commit()
#
# conn.close()

with open("db_gen.sql", 'r') as sql_file:
    c.executescript(sql_file.read())

conn.close()

#
# import os
# from cv2 import cv2
#
#
# img = cv2.imread(os.path.join(os.getcwd(), "cache", "file", "frame-2.png"))
#
# decoder = cv2.QRCodeDetector()
# data, points, _ = decoder.detectAndDecode(img)
#
# if points is not None:
#     nrOfPoints = len(points)
#
#     points = points[0]
#     for i in range(nrOfPoints):
#         pt1 = [int(val) for val in points[i]]
#         pt2 = [int(val) for val in points[(i + 1) % 4]]
#         cv2.line(img, pt1, pt2, color=(255, 0, 0), thickness=3)
#
#     print(data)



# import json
# data = {
#     "items": [
#         "apple",
#         "strawberry",
#         "cilantro",
#         "corn",
#         "beef",
#         "tuna",
#         "egg"
#     ]
# }
#
# print (json.dumps(data))