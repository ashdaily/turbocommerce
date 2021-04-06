from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from core import views as core_views


urlpatterns = [
    path("customer/", core_views.CustomerDetailView.as_view(), name="customer-detail"),
    path(
        "customer/signup/",
        core_views.CustomerSignupView.as_view(),
        name="customer-signup",
    ),
    path(
        "auth/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "auth/token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]
