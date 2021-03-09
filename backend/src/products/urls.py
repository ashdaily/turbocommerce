from django.urls import path

from . import views


urlpatterns = [
    # products
    path("", views.ProductListView.as_view(), name="products"),
    path("in-ids/", views.ProductsByIdsListView.as_view(), name="products-in-ids"),
    path("<int:pk>/", views.ProductDetailsView.as_view(), name="product-details"),
    path(
        "product-suggestion/<int:product_id>/",
        views.ProductSuggestionListView.as_view(),
        name="product-suggestion",
    ),
    # categories
    path(
        "categories/",
        views.ProductCategoriesListView.as_view(),
        name="product-categories",
    ),
]
