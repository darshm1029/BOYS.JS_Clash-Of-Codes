"""synergyze URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from ML.views import (
    get_prediction,
    get_gender,
    verify,
    get_age,
    get_emotion,
    get_race,
    get_all,
    get_prediction_by_url,
    get_age_by_url,
    get_emotion_by_url,
    get_gender_by_url,
    get_race_by_url,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Test API",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="testing@api.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("predict/", get_prediction),
    path("gender/", get_gender),
    path("verify/", verify),
    path("age/", get_age),
    path("emotion/", get_emotion),
    path("race/", get_race),
    path("all/", get_all),
    path("v1/predict/", get_prediction_by_url),
    path("v1/age/", get_age_by_url),
    path("v1/emotion/", get_emotion_by_url),
    path("v1/gender/", get_gender_by_url),
    path("v1/race/", get_race_by_url),
    # path('photos/', PhotoList.as_view()),
    re_path(
        r"^playground/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^docs/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
