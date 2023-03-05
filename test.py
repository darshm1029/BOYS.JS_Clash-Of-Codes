from deepface import DeepFace

result = DeepFace.analyze(
    img_path="darsh.jpeg", actions=["gender", "age", "race", "emotion"]
)
print(result)
