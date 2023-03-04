from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.http import JsonResponse
from deepface import DeepFace

@csrf_exempt
@api_view(["POST"])
def get_prediction(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    result = DeepFace.analyze(img_path=file_name,actions=['gender'])
    default_storage.delete("image.jpeg")
    return JsonResponse({"result": result})