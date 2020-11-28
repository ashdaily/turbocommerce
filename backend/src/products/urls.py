from django.urls import path

from . import views


urlpatterns = [
    path("", views.ProductView.as_view(), name="product"),
    path("<int:pk>/", views.ProductDetailsView.as_view(), name="product-details"),
    path(
        "product-grand-parent-category/",
        views.ProductGrandParentCategoryView.as_view(),
        name="product-grand-parent-category",
    ),
]
