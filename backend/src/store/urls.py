from django.urls import path

from store.views import StoreInformationListView


urlpatterns = [
    path(
        "store-information/",
        StoreInformationListView.as_view(),
        name="store-information",
    ),
]
