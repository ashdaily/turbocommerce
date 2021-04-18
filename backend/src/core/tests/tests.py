from pprint import pprint

from django.urls import reverse

from core.models import User
from utils.tests import TestCaseBase


class TestCustomerSignup(TestCaseBase):
    fixtures = [
        "core/tests/fixtures/users.json",
    ]
    url = reverse("customer-signup")

    def test_signup_for_customer(self):
        payload = {
            "email": "ashish@gmail.com",
            "password": "ashish123",
        }

        r = self.client.post("/api/core/customer/signup/", payload)
        self.assertEqual(r.status_code, 200)

    def test_raise_validation_error_when_email_not_valid(self):
        payload = {
            "email": "ash",
            "password": "ashish123",
        }
        r = self.client.post("/api/core/customer/signup/", payload)
        self.assertEqual(r.status_code, 400)
        r = self.deserialize(r)
        self.assertEqual(r["email"], ["Enter a valid email address."])
