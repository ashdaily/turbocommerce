from django.urls import path

from customer import views


urlpatterns = [
    path("wishlist/", views.CustomerWishlistView.as_view(), name="customer-wishlist"),
    path(
        "wishlist/<int:product_id>/",
        views.CustomerWishlistDetailView.as_view(),
        name="customer-wishlist-delete",
    ),
    path(
        "customer-shipping-address/",
        views.CustomerShippingAddressView.as_view(),
        name="customer-shipping-address",
    ),
    path(
        "customer-shipping-address/<int:id>/",
        views.CustomerShippingAddressDetailView.as_view(),
        name="customer-shipping-address-detail",
    ),
]
