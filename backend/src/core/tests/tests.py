from pprint import pprint

from django.test import Client, TestCase
from django.urls import reverse
from rest_framework import status

from core.models import User
from utils.tests import TestCaseBase


class TestAuthentication(TestCaseBase):
    fixtures = [
        "core/tests/fixtures/users.json",
    ]

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
        r = self.deserialize(r.content)
        self.assertEqual(r["username"], ["Username should only be email"])
