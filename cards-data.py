import csv
import json

CSV_FILE_PATH = "data.csv"

with open("data/club-cards.json") as jsonf:
    data = json.load(jsonf)

clubs = list(data.keys())
for i in range(len(clubs)):
    clubs[i] = clubs[i].lower()

with open(CSV_FILE_PATH, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)

    for row in csvReader:
        if row["Name of your club"].lower() not in clubs and row["Name of your club"] != "":
            key = row["Name of your club"]

            data[key] = {}

            link = row["Name of your club"].lower()
            link = link.replace(" club", '')
            link = link.rstrip(" ")
            link = link.replace(" ", '_')

            data[key]["link"] = link

            data[key]["thumbnail"] = "./img/thumbnails/placeholder.jpg"

            data[key]["desc"] = row["What is the purpose of your club?"]

            data[key]["mon"] = False
            data[key]["tue"] = False
            data[key]["wed"] = False
            data[key]["thu"] = False
            data[key]["fri"] = False
            data[key]["dayOther"] = False

            day = row["Meeting Day"]

            match day:
                case "Monday":
                    data[key]["mon"] = True

                case "Tuesday":
                    data[key]["tue"] = True

                case "Wednesday":
                    data[key]["wed"] = True

                case "Thursday":
                    data[key]["thu"] = True

                case "Friday":
                    data[key]["fri"] = True

                case _:
                    data[key]["dayOther"] = True

            data[key]["academic"] = False
            data[key]["social"] = False
            data[key]["human"] = False
            data[key]["clubTypeOther"] = False

            type = row["What best describes the role of your club?"]

            match type:
                case "Academic":
                    data[key]["academic"] = True

                case "Social":
                    data[key]["social"] = True

                case "Humanitarian":
                    data[key]["human"] = True

                case _:
                    data[key]["clubTypeOther"] = True

            data[key]["lunch"] = False
            data[key]["afterSchool"] = False
            data[key]["meetingTimeOther"] = False

            time = row["Meeting Time"]

            match time:
                case "Lunchtime":
                    data[key]["lunch"] = True

                case "After School":
                    data[key]["afterSchool"] = True

                case _:
                    data[key]["meetingTimeOther"] = True
        else:
            print("Club already in cards!")

data = dict(sorted(data.items()))

with open("data/club-cards.json", 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(data, indent=4))
