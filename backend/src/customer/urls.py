from django.urls import path

from customer.views import CustomerWishlistView, CustomerWishlistDetailView


urlpatterns = [
    path("wishlist/", CustomerWishlistView.as_view(), name="customer-wishlist"),
    path(
        "wishlist/<int:pk>/",
        CustomerWishlistDetailView.as_view(),
        name="customer-wishlist-delete",
    ),
]
