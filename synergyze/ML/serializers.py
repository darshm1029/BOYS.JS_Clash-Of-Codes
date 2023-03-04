from rest_framework import serializers


class ImgSerializer(serializers.Serializer):
    img = serializers.ImageField()
