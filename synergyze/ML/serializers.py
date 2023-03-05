from rest_framework import serializers


class ImgSerializer(serializers.Serializer):
    image = serializers.ImageField()
