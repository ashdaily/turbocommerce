import json
from pprint import pprint

from django.conf import settings
from django.urls import reverse
from django.test import Client

from core.models import User
from products.models import Product, ProductGrandParentCategory
from products.views import ProductListView
from utils.tests import TestCaseBase


client = Client()
page_size = settings.REST_FRAMEWORK_PAGE_SIZE


class ProductListViewTestCase(TestCaseBase):
    fixtures = [
        "products/tests/fixtures/products.json",
    ]

    def test_should_get_products(self):
        url = reverse("products")
        r = client.get(url)

        self.assertEqual(r.status_code, 200)
        self.assertEqual(
            json.loads(r.content),
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "brand": {"brand_name": "Abc inc", "id": 1, "slug": "abc-inc"},
                        "child_category": {
                            "category_name": "Women",
                            "parent_category": 1,
                            "slug": "women",
                        },
                        "country_of_origin": "Japan",
                        "id": 1,
                        "product_description": "Torn clothes are the new cool",
                        "product_name": "Bizarre shirt",
                        "product_variants": [
                            {
                                "color": "#FFFFFF",
                                "discount": 10,
                                "id": 1,
                                "images": ["/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 500,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made " "with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "published": True,
                                "sizes_available": [
                                    {
                                        "comment": "Fits a 6 " "feet tall " "woman",
                                        "measurement": [
                                            {
                                                "id": 1,
                                                "measurement_name": "LENGTH",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                            {
                                                "id": 2,
                                                "measurement_name": "WAIST",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                        ],
                                        "name": "XL",
                                    },
                                    {
                                        "comment": "Fits a "
                                        "5'8 feet "
                                        "tall "
                                        "woman",
                                        "measurement": [
                                            {
                                                "id": 1,
                                                "measurement_name": "LENGTH",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                            {
                                                "id": 2,
                                                "measurement_name": "WAIST",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                        ],
                                        "name": "M",
                                    },
                                ],
                                "stock_keeping_unit": 87987,
                                "weight_in_grams": 344,
                            },
                            {
                                "color": "#000000",
                                "discount": 1,
                                "id": 2,
                                "images": ["/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made " "with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "published": True,
                                "sizes_available": [
                                    {
                                        "comment": "Fits a 6 " "feet tall " "woman",
                                        "measurement": [
                                            {
                                                "id": 1,
                                                "measurement_name": "LENGTH",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                            {
                                                "id": 2,
                                                "measurement_name": "WAIST",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                        ],
                                        "name": "XL",
                                    },
                                    {
                                        "comment": "Fits a "
                                        "5'8 feet "
                                        "tall "
                                        "woman",
                                        "measurement": [
                                            {
                                                "id": 1,
                                                "measurement_name": "LENGTH",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                            {
                                                "id": 2,
                                                "measurement_name": "WAIST",
                                                "measurement_unit": "CENTIMETER",
                                                "measurement_value": 45,
                                            },
                                        ],
                                        "name": "M",
                                    },
                                ],
                                "stock_keeping_unit": 87988,
                                "weight_in_grams": 344,
                            },
                        ],
                        "returnable": True,
                        "slug": "bizarre-shirt",
                    }
                ],
            },
        )

    def test_product_pagination_should_work(self):
        product_count = 99
        self.make_random_model_data(Product, product_count, *["slug"])

        # page_size default
        url = reverse("products")
        r = client.get(url)

        payload = self.deserialize(r.content)

        self.assertEqual(payload["count"], product_count + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual("page=2" in payload["next"], True)
        self.assertEqual(payload["previous"], None)

    def test_product_pagination_should_work_with_page_size_query_param(self):
        product_count = 99
        self.make_random_model_data(Product, product_count, *["slug"])
        url = reverse("products")

        # page_size = 40
        r = client.get(f"{url}?page_size=40")

        payload = self.deserialize(r.content)

        self.assertEqual(payload["count"], product_count + 1)
        self.assertEqual(len(payload["results"]), 40)
        self.assertEqual("page=2" in payload["next"], True)
        self.assertEqual(payload["previous"], None)

    def test_product_pagination_should_work_with_page_number_query_param(self):
        product_count = 99
        self.make_random_model_data(Product, product_count, *["slug"])
        url = reverse("products")

        # page=2
        r = client.get(f"{url}?page=2")

        payload = self.deserialize(r.content)

        self.assertEqual(payload["count"], product_count + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual("page=3" in payload["next"], True)
        self.assertEqual(payload["previous"].endswith("products/"), True)

        # page=5
        r = client.get(f"{url}?page=5")

        payload = self.deserialize(r.content)

        self.assertEqual(payload["count"], product_count + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual("page=6" in payload["next"], True)
        self.assertEqual("page=4" in payload["previous"], True)

        # page=10 (last page)
        r = client.get(f"{url}?page=10")

        payload = self.deserialize(r.content)
        self.assertEqual(payload["count"], product_count + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual(payload["next"], None)
        self.assertEqual("page=9" in payload["previous"], True)
