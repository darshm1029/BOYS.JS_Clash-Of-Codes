import os
from deepface import DeepFace

entries = os.listdir("C:/Users\deadp\Downloads\dataset")

output = {}
count = 0
for entry in entries:
    count += 1
    print(count)
    try:
        result = DeepFace.analyze(
            "C:/Users\deadp\Downloads\dataset" + entry,
            actions=["gender"],
            detector_backend="opencv",
        )
        output[entry] = "Human"
    except Exception as e:
        output[entry] = "Anime"

print("Human = " + str(len([i for i in output.values() if i == "Human"])))
print("Anime = " + str(len([i for i in output.values() if i == "Anime"])))
