from django.urls import path

from . import views


urlpatterns = [
    path("", views.ProductListView.as_view(), name="product"),
    path("in-ids/", views.ProductsByIdsListView.as_view(), name="products-in-ids"),
    path("<int:pk>/", views.ProductDetailsView.as_view(), name="product-details"),
    path(
        "product-grand-parent-category/",
        views.ProductGrandParentCategoryListView.as_view(),
        name="product-grand-parent-category",
    ),
    path(
        "product-suggestion/<int:product_id>/",
        views.ProductSuggestionListView.as_view(),
        name="product-suggestion",
    ),
]
