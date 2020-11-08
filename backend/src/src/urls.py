from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("rest_framework_social_oauth2.urls")),
    path("api/core/", include("core.urls")),
    path("api/products/", include("core.urls")),
]
