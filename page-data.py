import csv
import json
import os

CSV_FILE_PATH = "data.csv"

with open(CSV_FILE_PATH, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)

    for row in csvReader:

        data = {}

        dir = row["Name of your club"].lower()
        dir = dir.replace(" club", '')
        dir = dir.rstrip(" ")
        dir = dir.replace(" ", '_')

        data["title"] = row["Name of your club"]
        data["teacher"] = row["Club Sponsor Teacher"]
        data["room"] = row["Meeting Location"]
        data["carousel"] = ["./img/space.jpg"]
        data["purpose"] = row["What is the purpose of your club?"]
        data["typicalWeek"] = row["What are some activities that take place during a typical meeting?"]
        data["schedule"] = f"We meet on {row['Meeting Day']}s at {row['Meeting Time']}. Come Join us!"
        data["purposeImg"] = "./data/placeholder/img/purpose.jpg"
        data["meetingImg"] = "./data/placeholder/img/meeting.jpg"

        socials = {}

        socials["instagram"] = f"https://www.instagram.com/{row['Instagram Tag']}/"
        socials["discord"] = row["Discord Server Link"]
        socials["teams"] = row["Teams Link"]

        data["socials"] = socials

        try:
            os.mkdir(f"data/clubs/{dir}")

            with open(f"data/clubs/{dir}/info.json", 'w', encoding='utf-8') as jsonf:
                jsonf.write(json.dumps(data, indent=4))

        except OSError as error:
            print(error)
