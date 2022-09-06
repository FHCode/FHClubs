import csv
import json

CSV_FILE_PATH = "data.csv"

with open(CSV_FILE_PATH, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)

    for row in csvReader:

        data = {}

        dir = row["Name of your club"].lower()
        dir = dir.replace(" club", '')
        dir = dir.replace(" ", '_')

        data["title"] = row["Name of your club"]
        data["teacher"] = row["Club Sponsor Teacher"]
        data["room"] = row["Meeting Location"]
        data["carousel"] = ["./img/space.jpg"]
        data["purpose"] = row["What is the purpose of your club?"]
        data["typicalWeek"] = row["What does a typical meeting look like?"]
        data["schedule"] = f"We meet on{row["Meeting Day"]}s at {row["Meeting Time"]}. Come Join us!"

        socials = {}

        socials["instagram"] = f"https://www.instagram.com/{row["Instagram Tag"]}/"
        socials["discord"] = row["Discord Server Link"]
        socials["teams"] = row["Teams Link"]

        data["socials"] = socials

        with open(f"data/clubs/{dir}/info.json", 'w', encoding='utf-8') as jsonf:
            jsonf.write(json.dumps(data, indent=4))
