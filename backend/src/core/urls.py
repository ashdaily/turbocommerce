from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from core import views as core_views


urlpatterns = [
    # customer
    path("customer/", core_views.CustomerDetailView.as_view(), name="customer-detail"),
    path(
        "customer/signup/",
        core_views.CustomerSignupView.as_view(),
        name="customer-signup",
    ),
    path(
        "customer/update-password/",
        core_views.CustomerUpdatePasswordView.as_view(),
        name="customer-update-password",
    ),
    path(
        "auth/token/", jwt_views.TokenObtainPairView.as_view(), name="token-obtain-pair"
    ),
    path(
        "auth/token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token-refresh",
    ),
    # admin
    path("admin/login/", core_views.AdminLoginView.as_view(), name="admin-login"),
]
