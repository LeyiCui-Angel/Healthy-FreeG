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
