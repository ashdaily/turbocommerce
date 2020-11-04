from django.urls import path

from core import views


urlpatterns = [
    path("customer/", views.CustomerView.as_view(), name="customer"),
]
