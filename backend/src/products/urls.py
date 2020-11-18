from django.urls import path

from . import views


urlpatterns = [
    path("", views.ProductView.as_view(), name="product"),
    path(
        "product-grand-parent-category/",
        views.ProductGrandParentCategoryView.as_view(),
        name="product-grand-parent-category",
    ),
]
