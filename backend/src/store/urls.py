from django.urls import path

from store.views import StoreListView


urlpatterns = [path("", StoreListView.as_view(), name="store-list")]
