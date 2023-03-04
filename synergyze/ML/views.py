from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, APIView
from django.core.files.storage import default_storage
from django.http import JsonResponse
from deepface import DeepFace
# from .models import Img
from .serializers import ImgSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.generics import CreateAPIView
from drf_yasg.utils import swagger_auto_schema
import urllib.request

backends = [
  'opencv', 
  'ssd', 
  'dlib', 
  'mtcnn', 
  'retinaface', 
  'mediapipe'
]

@csrf_exempt
@api_view(["POST"])
def get_prediction(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = DeepFace.analyze(img_path=file_name, actions=["gender"], detector_backend="opencv")
        count = len(result)
    except Exception as e:
        print(e)
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")
   
    return JsonResponse({"result": result, "count": count})

# class PhotoList(CreateAPIView):
#     queryset = Img.objects.all()
#     serializer_class = ImgSerializer



@csrf_exempt
@swagger_auto_schema(methods=['post'],request_body=ImgSerializer)
@api_view(["POST"])
def get_gender(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = []
        output = DeepFace.analyze(img_path=file_name, actions=["gender"], detector_backend="retinaface")
        for data in output:
            result.append(data["dominant_gender"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")
   
    return JsonResponse({"result": result, "count": count})


