import environ
from django.conf import settings
from django.conf.urls.static import static
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
        terms_of_service="",
        contact=openapi.Contact(email="ashtokyo31@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    # django administration
    path("admin/", admin.site.urls),
    # project apps
    path("api/core/", include("core.urls")),
    path("api/products/", include("products.urls")),
    path("api/customer/", include("customer.urls")),
    path("api/store/", include("store.urls")),
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

# serves uploaded media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
