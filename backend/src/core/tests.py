from django.test import Client, TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestCustomer(APITestCase):
    def test_customer_create(self):
        """
        Ensure we can create a new customer object.
        """
        url = reverse("customer")
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
