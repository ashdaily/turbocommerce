from django.test import TestCase
import json


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
