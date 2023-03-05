from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, APIView, parser_classes
from django.core.files.storage import default_storage
from django.http import JsonResponse
from deepface import DeepFace

# from .models import Img
from .serializers import (
    ImgSerializer,
    VerifySerializer,
    UrlSerializer,
    VerifyUrlSerializer,
)

# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.generics import CreateAPIView
from drf_yasg.utils import swagger_auto_schema
import urllib.request
from rest_framework.parsers import MultiPartParser, FormParser

backends = ["opencv", "ssd", "dlib", "mtcnn", "retinaface", "mediapipe"]


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=ImgSerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def get_prediction(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = DeepFace.analyze(
            img_path=file_name, actions=["gender"], detector_backend="opencv"
        )
        count = len(result)
    except Exception as e:
        print(e)
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=UrlSerializer)
@api_view(["POST"])
def get_prediction_by_url(request):
    img = request.data.get("image")
    urllib.request.urlretrieve(img, "image.jpeg")
    count = 0
    try:
        result = DeepFace.analyze(
            img_path="image.jpeg", actions=["gender"], detector_backend="opencv"
        )
        count = len(result)
    except Exception as e:
        print(e)
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=ImgSerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def get_gender(request):
    img = request.FILES.get("image")
    print(img)
    print(request.FILES)
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path=file_name, actions=["gender"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["dominant_gender"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=UrlSerializer)
@api_view(["POST"])
def get_gender_by_url(request):
    img = request.data.get("image")
    urllib.request.urlretrieve(img, "image.jpeg")
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path="image.jpeg", actions=["gender"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["dominant_gender"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=VerifySerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def verify(request):
    img1 = request.FILES.get("image1")
    urllib.request.urlretrieve(img1, "image1.jpeg")
    img2 = request.FILES.get("image2")
    urllib.request.urlretrieve(img2, "image.jpeg")
    result = DeepFace.verify(
        "image1.jpeg",
        "image2.jpeg",
        distance_metric="euclidean_l2",
        model_name="Facenet512",
    )
    print(result)
    default_storage.delete("image1.jpeg")
    default_storage.delete("image2.jpeg")
    return JsonResponse({"result": bool(result["verified"])})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=VerifyUrlSerializer)
@api_view(["POST"])
def verify_by_url(request):
    img1 = request.data.get("image1")
    urllib.request.urlretrieve(img1, "image1.jpeg")
    img2 = request.data.get("image2")
    urllib.request.urlretrieve(img2, "image2.jpeg")
    result = DeepFace.verify(
        "image1.jpeg",
        "image2.jpeg",
        distance_metric="euclidean_l2",
        model_name="Facenet512",
    )
    print(result)
    default_storage.delete("image1.jpeg")
    default_storage.delete("image2.jpeg")
    return JsonResponse({"result": bool(result["verified"])})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=ImgSerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def get_age(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path=file_name, actions=["age"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["age"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=UrlSerializer)
@api_view(["POST"])
def get_age_by_url(request):
    img = request.data.get("image")
    urllib.request.urlretrieve(img, "image.jpeg")
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path="image.jpeg", actions=["age"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["age"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=ImgSerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def get_emotion(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path=file_name, actions=["emotion"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["dominant_emotion"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=UrlSerializer)
@api_view(["POST"])
def get_emotion_by_url(request):
    img = request.data.get("image")
    urllib.request.urlretrieve(img, "image.jpeg")
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path="image.jpeg", actions=["emotion"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["dominant_emotion"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=ImgSerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def get_race(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path=file_name, actions=["race"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["dominant_race"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=UrlSerializer)
@api_view(["POST"])
def get_race_by_url(request):
    img = request.data.get("image")
    urllib.request.urlretrieve(img, "image.jpeg")
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path="image.jpeg", actions=["race"], detector_backend="retinaface"
        )
        for data in output:
            result.append(data["dominant_race"])
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=ImgSerializer)
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def get_all(request):
    img = request.FILES.get("image")
    file_name = default_storage.save("image.jpeg", img)
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path=file_name,
            actions=["gender", "age", "emotion", "race"],
            detector_backend="retinaface",
        )
        for data in output:
            result.append(
                {
                    "gender": data["dominant_gender"],
                    "emotion": data["dominant_emotion"],
                    "race": data["dominant_race"],
                    "age": data["age"],
                }
            )
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})


@csrf_exempt
@swagger_auto_schema(methods=["post"], request_body=UrlSerializer)
@api_view(["POST"])
def get_all_by_url(request):
    img = request.data.get("image")
    urllib.request.urlretrieve(img, "image.jpeg")
    count = 0
    try:
        result = []
        output = DeepFace.analyze(
            img_path="image.jpeg",
            actions=["gender", "age", "emotion", "race"],
            detector_backend="retinaface",
        )
        for data in output:
            result.append(
                {
                    "gender": data["dominant_gender"],
                    "emotion": data["dominant_emotion"],
                    "race": data["dominant_race"],
                    "age": data["age"],
                }
            )
        count = len(result)
    except:
        result = "Please upload a valid image"
    finally:
        default_storage.delete("image.jpeg")

    return JsonResponse({"result": result, "count": count})
