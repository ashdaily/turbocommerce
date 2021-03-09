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
            "username": "ashish@gmail.com",
            "password": "ashish123",
        }

        r = self.client.post("/api/core/customer/signup/", payload)
        self.assertEqual(r.status_code, 200)

    def test_raise_validation_error_when_username_not_email(self):
        payload = {
            "username": "ash",
            "password": "ashish123",
        }
        r = self.client.post("/api/core/customer/signup/", payload)
        self.assertEqual(r.status_code, 400)
        r = self.deserialize(r)
        self.assertEqual(r["username"], ["Username should only be email"])
