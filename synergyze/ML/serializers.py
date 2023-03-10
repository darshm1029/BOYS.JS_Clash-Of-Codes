from rest_framework import serializers


class ImgSerializer(serializers.Serializer):
    image = serializers.ImageField()


class VerifySerializer(serializers.Serializer):
    image1 = serializers.ImageField()
    image2 = serializers.ImageField()


class UrlSerializer(serializers.Serializer):
    image = serializers.URLField()


class VerifyUrlSerializer(serializers.Serializer):
    image1 = serializers.URLField()
    image2 = serializers.URLField()
