from rest_framework import serializers
from .models import Img

class ImgSerializer(serializers.Serializer):
    img = serializers.ImageField()