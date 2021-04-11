from django.urls import path

from customer.views import CustomerWishlistView


urlpatterns = [
    path("wishlist/", CustomerWishlistView.as_view(), name="customer-wishlist")
]
