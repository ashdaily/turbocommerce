from django.urls import path

from . import views


urlpatterns = [
    path("list/", views.ProductView.as_view(), name="product-list"),
]
