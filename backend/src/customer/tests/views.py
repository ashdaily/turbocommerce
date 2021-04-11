from django.urls import reverse

from customer.models import CustomerWishlist
from utils.tests import TestCaseBase
from utils.print import pprint


class TestCustomerWishlistView(TestCaseBase):
    fixtures = [
        "customer/tests/fixtures/customer.json",
        "customer/tests/fixtures/admin.json",
        "customer/tests/fixtures/products.json",
    ]
    url = reverse("customer-wishlist")

    def test_post_wishlist(self):
        products = [1]
        payload = {"products": products}

        r = self.client.post(self.url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r.status_code, 200)

        wishlist = CustomerWishlist.objects.get(customer__id=1)

        products_in_wishlist = list(
            map(lambda product: product.id, wishlist.products.all())
        )
        self.assertEqual(products, products_in_wishlist)

    def test_admin_user_cannot_post_wishlist_and_raises_validation_error(self):
        products = [1]
        payload = {"products": products}

        r = self.client.post(self.url, data=payload, **self.admin_bearer_token)
        self.assertEqual(r.status_code, 400)

    def test_get_empty_customer_wishlist(self):
        r2 = self.client.get(self.url, **self.customer_bearer_token)
        self.assertEqual(r2.status_code, 200)

        self.assertEqual(
            r2.json(), {"count": 0, "next": None, "previous": None, "results": []}
        )

    def test_get_non_empty_customer_wishlist(self):
        products = [1]
        payload = {"products": products}

        r1 = self.client.post(self.url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r1.status_code, 200)

        r2 = self.client.get(self.url, **self.customer_bearer_token)
        self.assertEqual(r2.status_code, 200)
        self.assertEqual(
            r2.json(),
            {
                "count": 1,
                "next": None,
                "previous": None,
                "results": [
                    {
                        "id": 1,
                        "child_category": {
                            "id": 1,
                            "category_name": "Pants",
                            "slug": "pants",
                            "parent_category": {
                                "id": 1,
                                "category_name": "Formal",
                                "slug": "formal",
                                "grand_parent_category": {
                                    "id": 1,
                                    "category_name": "Women",
                                    "slug": "women",
                                },
                            },
                        },
                        "brand": {"id": 1, "brand_name": "Abc inc", "slug": "abc-inc"},
                        "product_name": "Bizarre shirt",
                        "product_description": "Torn clothes are the new cool",
                        "product_variants": [
                            {
                                "id": 1,
                                "stock_keeping_unit": 87987,
                                "size": {
                                    "name": "XL",
                                    "measurement": [
                                        {
                                            "id": 1,
                                            "measurement_name": "LENGTH",
                                            "measurement_value": 45,
                                            "measurement_unit": "CENTIMETER",
                                        },
                                        {
                                            "id": 2,
                                            "measurement_name": "WAIST",
                                            "measurement_value": 45,
                                            "measurement_unit": "CENTIMETER",
                                        },
                                    ],
                                    "comment": "Fits a 6 feet tall woman",
                                },
                                "discount": 10,
                                "published": True,
                                "price": 500,
                                "weight_in_grams": 344,
                                "color": "#FFFFFF",
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "quantity": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Hand",
                                    }
                                ],
                                "in_stock": True,
                            },
                            {
                                "id": 2,
                                "stock_keeping_unit": 87988,
                                "size": {
                                    "name": "M",
                                    "measurement": [
                                        {
                                            "id": 1,
                                            "measurement_name": "LENGTH",
                                            "measurement_value": 45,
                                            "measurement_unit": "CENTIMETER",
                                        },
                                        {
                                            "id": 2,
                                            "measurement_name": "WAIST",
                                            "measurement_value": 45,
                                            "measurement_unit": "CENTIMETER",
                                        },
                                    ],
                                    "comment": "Fits a 5'8 feet tall woman",
                                },
                                "discount": 1,
                                "published": True,
                                "price": 5000,
                                "weight_in_grams": 344,
                                "color": "#000000",
                                "images": ["/media/https%3A/lorempixel/500/500"],
                                "quantity": 5000,
                                "product_variant_specifications": [
                                    {
                                        "specification_name": "Made with",
                                        "specification_value": "Machine",
                                    }
                                ],
                                "in_stock": True,
                            },
                        ],
                        "slug": "bizarre-shirt",
                        "returnable": True,
                        "country_of_origin": "Japan",
                    }
                ],
            },
        )
