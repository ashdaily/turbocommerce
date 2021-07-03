from pprint import pprint
import json

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

        r = self.client.post(self.url, payload)
        self.assertEqual(r.status_code, 201)

    def test_raise_validation_error_when_email_not_valid(self):
        payload = {
            "email": "ash",
            "password": "ashish123",
        }
        r = self.client.post(self.url, payload)
        self.assertEqual(r.status_code, 400)
        r = self.deserialize(r)
        self.assertEqual(r["email"], ["Enter a valid email address."])

    def test_signup_process_strips_extra_spaces(self):
        payload = {
            "email": "    ash1@gmail.com    ",
            "password": "ashish123  ",
        }
        r = self.client.post(self.url, payload)
        self.assertEqual(r.status_code, 201)
        r = self.deserialize(r)

        self.assertEqual(User.objects.last().email, "ash1@gmail.com")


class TestCustomerLogin(TestCaseBase):
    fixtures = [
        "core/tests/fixtures/users.json",
    ]
    url = reverse("token_obtain_pair")

    def test_login_for_customer(self):
        payload = {
            "email": "ashish@gmail.com",
            "password": "ashish123",
        }
        r = self.client.post(reverse("customer-signup"), payload)
        self.assertEqual(r.status_code, 201)

        r = self.client.post(self.url, payload)
        self.assertEqual(r.status_code, 200)

        self.assertContains(r, "access")
        self.assertContains(r, "refresh")


class TestCustomerUpdatePassword(TestCaseBase):
    fixtures = [
        "core/tests/fixtures/users.json",
    ]

    def test_customer_can_update_password_and_can_login_with_new_password(self):
        # change password
        new_password = "greekyogurt123"
        payload = {
            "new_password": new_password,
        }
        r = self.client.put(
            reverse("customer-update-password"),
            payload,
            **self.customer_bearer_token,
            content_type="application/json"
        )
        self.assertEqual(r.status_code, 204)

        # login with new password
        payload = {"email": "ash@gmail.com", "password": new_password}
        r = self.client.post(reverse("token_obtain_pair"), payload)
        self.assertEqual(r.status_code, 200)

        self.assertContains(r, "access")
        self.assertContains(r, "refresh")
