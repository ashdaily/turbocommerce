from django.conf import settings
from django.urls import reverse
from django.utils.http import urlencode

from products.models import Product
from products.views import ProductListView
from utils.tests import TestCaseBase
from utils.print import pprint


page_size = settings.REST_FRAMEWORK_PAGE_SIZE


class TestProductListView(TestCaseBase):
    fixtures = [
        "products/tests/fixtures/products.json",
    ]
    url = reverse("products")

    def test_should_get_products_list(self):
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, 200)

        payload = self.deserialize(r)
        self.assertEqual(
            payload,
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "brand": {"brand_name": "Abc inc", "id": 1, "slug": "abc-inc"},
                        "child_category": {
                            "category_name": "Pants",
                            "id": 1,
                            "parent_category": {
                                "category_name": "Formal",
                                "grand_parent_category": {
                                    "category_name": "Women",
                                    "id": 1,
                                    "slug": "women",
                                },
                                "id": 1,
                                "slug": "formal",
                            },
                            "slug": "pants",
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
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 500,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 6 feet tall woman",
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
                                "stock_keeping_unit": 87987,
                                "weight_in_grams": 344,
                            },
                            {
                                "color": "#000000",
                                "discount": 1,
                                "id": 2,
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 5'8 feet tall woman",
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
        PRODUCT_COUNT = 99
        self.make_random_model_data(Product, PRODUCT_COUNT, *["slug"])

        # page_size default
        r = self.client.get(self.url)

        payload = self.deserialize(r)

        self.assertEqual(payload["count"], PRODUCT_COUNT + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual("page=2" in payload["next"], True)
        self.assertEqual(payload["previous"], None)

    def test_product_pagination_should_work_with_page_size_query_param(self):
        PRODUCT_COUNT = 99
        self.make_random_model_data(Product, PRODUCT_COUNT, *["slug"])

        # page_size = 40
        r = self.client.get(f"{self.url}?page_size=40")

        payload = self.deserialize(r)

        self.assertEqual(payload["count"], PRODUCT_COUNT + 1)
        self.assertEqual(len(payload["results"]), 40)
        self.assertEqual("page=2" in payload["next"], True)
        self.assertEqual(payload["previous"], None)

    def test_product_pagination_should_work_with_page_number_query_param(self):
        PRODUCT_COUNT = 99
        self.make_random_model_data(Product, PRODUCT_COUNT, *["slug"])

        # page=2
        r = self.client.get(f"{self.url}?page=2")

        payload = self.deserialize(r)

        self.assertEqual(payload["count"], PRODUCT_COUNT + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual("page=3" in payload["next"], True)
        self.assertEqual(payload["previous"].endswith("products/"), True)

        # page=5
        r = self.client.get(f"{self.url}?page=5")

        payload = self.deserialize(r)

        self.assertEqual(payload["count"], PRODUCT_COUNT + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual("page=6" in payload["next"], True)
        self.assertEqual("page=4" in payload["previous"], True)

        # page=10 (last page)
        r = self.client.get(f"{self.url}?page=10")

        payload = self.deserialize(r)
        self.assertEqual(payload["count"], PRODUCT_COUNT + 1)
        self.assertEqual(len(payload["results"]), page_size)
        self.assertEqual(payload["next"], None)
        self.assertEqual("page=9" in payload["previous"], True)

    def test_should_get_products_list_with_query_param(self):
        r = self.client.get(f"{self.url}?slug=bizarre-shirt")

        payload = self.deserialize(r)
        self.assertEqual(
            payload,
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "brand": {"brand_name": "Abc inc", "id": 1, "slug": "abc-inc"},
                        "child_category": {
                            "category_name": "Pants",
                            "id": 1,
                            "parent_category": {
                                "category_name": "Formal",
                                "grand_parent_category": {
                                    "category_name": "Women",
                                    "id": 1,
                                    "slug": "women",
                                },
                                "id": 1,
                                "slug": "formal",
                            },
                            "slug": "pants",
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
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 500,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 6 feet tall woman",
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
                                "stock_keeping_unit": 87987,
                                "weight_in_grams": 344,
                            },
                            {
                                "color": "#000000",
                                "discount": 1,
                                "id": 2,
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 5'8 feet tall woman",
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


class TestProductCategoriesListView(TestCaseBase):
    fixtures = [
        "products/tests/fixtures/products.json",
    ]
    url = reverse("product-categories")

    def test_should_get_categories_list(self):
        r = self.client.get(self.url)
        payload = self.deserialize(r)
        self.assertEqual(
            payload,
            [
                {
                    "id": 1,
                    "category_name": "Women",
                    "product_parent_categories": [
                        {
                            "id": 1,
                            "category_name": "Formal",
                            "product_child_categories": [
                                {"id": 1, "category_name": "Pants", "slug": "pants"}
                            ],
                            "slug": "formal",
                        }
                    ],
                    "slug": "women",
                }
            ],
        )


class TestProductVariantInventoryListView(TestCaseBase):
    fixtures = [
        "products/tests/fixtures/products.json",
    ]

    def test_should_get_product_variant_stock_availability(self):
        url = reverse("product-variant-inventory")
        kwargs = {"product_variant_ids": "1,2"}
        url = f"{url}?{urlencode(kwargs)}"

        r = self.client.get(url, **self.customer_bearer_token)

        payload = self.deserialize(r)
        self.assertEqual(
            payload,
            [
                {"in_stock": True, "product_variant": 1},
                {"in_stock": True, "product_variant": 2},
            ],
        )


class TestProductByCategoryListView(TestCaseBase):
    url = reverse("products-by-category")
    fixtures = [
        "products/tests/fixtures/products.json",
    ]

    def test_get_products_by_grand_parent_category_slug(self):
        kwargs = {"grand_parent_category_slug": "women"}
        url = f"{self.url}?{urlencode(kwargs)}"

        r = self.client.get(url)
        payload = self.deserialize(r)

        self.assertEqual(
            payload,
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "brand": {"brand_name": "Abc inc", "id": 1, "slug": "abc-inc"},
                        "child_category": {
                            "category_name": "Pants",
                            "id": 1,
                            "parent_category": {
                                "category_name": "Formal",
                                "grand_parent_category": {
                                    "category_name": "Women",
                                    "id": 1,
                                    "slug": "women",
                                },
                                "id": 1,
                                "slug": "formal",
                            },
                            "slug": "pants",
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
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 500,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 6 feet tall woman",
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
                                "stock_keeping_unit": 87987,
                                "weight_in_grams": 344,
                            },
                            {
                                "color": "#000000",
                                "discount": 1,
                                "id": 2,
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 5'8 feet tall woman",
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

    def test_get_products_by_parent_category_slug(self):
        kwargs = {"parent_category_slug": "formal"}
        url = f"{self.url}?{urlencode(kwargs)}"

        r = self.client.get(url)
        payload = self.deserialize(r)

        self.assertEqual(
            payload,
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "brand": {"brand_name": "Abc inc", "id": 1, "slug": "abc-inc"},
                        "child_category": {
                            "category_name": "Pants",
                            "id": 1,
                            "parent_category": {
                                "category_name": "Formal",
                                "grand_parent_category": {
                                    "category_name": "Women",
                                    "id": 1,
                                    "slug": "women",
                                },
                                "id": 1,
                                "slug": "formal",
                            },
                            "slug": "pants",
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
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 500,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 6 feet tall woman",
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
                                "stock_keeping_unit": 87987,
                                "weight_in_grams": 344,
                            },
                            {
                                "color": "#000000",
                                "discount": 1,
                                "id": 2,
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 5'8 feet tall woman",
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

    def test_get_products_by_child_category_slug(self):
        kwargs = {"child_category_slug": "pants"}
        url = f"{self.url}?{urlencode(kwargs)}"

        r = self.client.get(url)
        payload = self.deserialize(r)

        self.assertEqual(
            payload,
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "brand": {"brand_name": "Abc inc", "id": 1, "slug": "abc-inc"},
                        "child_category": {
                            "category_name": "Pants",
                            "id": 1,
                            "parent_category": {
                                "category_name": "Formal",
                                "grand_parent_category": {
                                    "category_name": "Women",
                                    "id": 1,
                                    "slug": "women",
                                },
                                "id": 1,
                                "slug": "formal",
                            },
                            "slug": "pants",
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
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 500,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 6 feet tall woman",
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
                                "stock_keeping_unit": 87987,
                                "weight_in_grams": 344,
                            },
                            {
                                "color": "#000000",
                                "discount": 1,
                                "id": 2,
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "in_stock": True,
                                "price": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "published": True,
                                "quantity": 5000,
                                "size": {
                                    "comment": "Fits a 5'8 feet tall woman",
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
