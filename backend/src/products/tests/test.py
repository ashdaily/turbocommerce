from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, force_authenticate

from core.models import User
from products.models import ProductGrandParentCategory
from products.views import ProductListView
from utils.strings import make_random_string


class ProductListViewTestCase(APITestCase):
    fixtures = [
        "products/tests/fixtures/products.json",
    ]

    def setUp(self):
        self.user = User.objects.get(username="ash")

    def test_should_get_products(self):
        factory = APIRequestFactory()
        view = ProductListView.as_view()
        url = reverse("products")
        request = factory.get(url)
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
