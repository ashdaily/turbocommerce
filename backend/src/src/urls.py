import environ
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


env = environ.Env()
swagger_view = get_schema_view(
    openapi.Info(
        title=env("PROJECT_NAME"),
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    # admin
    path("admin/", admin.site.urls),
    # project apps
    path("api/core/", include("core.urls")),
    path("api/products/", include("products.urls")),
    # swagger
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        swagger_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        swagger_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", swagger_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
