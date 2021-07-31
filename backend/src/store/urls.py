from django.urls import path

from store import views


urlpatterns = [
    path(
        "store-information/",
        views.StoreInformationListView.as_view(),
        name="store-information",
    ),
    path(
        "store-information/<int:id>/",
        views.StoreInformationDetailView.as_view(),
        name="store-information-detail",
    ),
]
