import json

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import User


class TestCaseBase(TestCase):
    def make_random_model_data(self, model, count: int, *none_fields):
        o = model.objects.get(id=1)
        objects = []
        for _ in range(count):
            o.id = None
            for none_field in none_fields:
                setattr(o, none_field, None)
            objects.append(o)

        model.objects.bulk_create(objects)

    def deserialize(self, response) -> list or dict:
        return json.loads(response.content)

    def make_bearer_token(self, user_id):
        user = User.objects.get(id=user_id)
        client = APIClient()
        refresh = RefreshToken.for_user(user)
        return {"HTTP_AUTHORIZATION": f"Bearer {refresh.access_token}"}

    @property
    def customer_bearer_token(self):
        return self.make_bearer_token(1)

    @property
    def admin_bearer_token(self):
        return self.make_bearer_token(2)
