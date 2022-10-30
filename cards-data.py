import csv
import json

CSV_FILE_PATH = "data.csv"

data = {}

with open(CSV_FILE_PATH, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)

    for row in csvReader:

        key = row["Name of your club"]

        data[key] = {}

        link = row["Name of your club"].lower()
        link = link.replace(" club", '')
        link = link.rstrip(" ")
        link = link.replace(" ", '_')

        data[key]["link"] = link

        data[key]["thumbnail"] = "./data/clubs/template/img/thumbnail.png"

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


with open("data/club-cards.json", 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(data, indent=4))
