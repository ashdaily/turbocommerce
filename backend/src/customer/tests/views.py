from django.urls import reverse

from customer.models import CustomerWishlist, CustomerShippingAddress
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
        product_1 = 1
        payload = {"product": product_1}

        r = self.client.post(self.url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r.status_code, 201)

        wishlist = CustomerWishlist.objects.filter(customer__id=1).values_list(
            "product", flat=True
        )

        self.assertEqual(wishlist[0], product_1)
        self.assertEqual(len(wishlist), 1)

        product_2 = 2
        payload = {"product": product_2}
        r = self.client.post(self.url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r.status_code, 201)

        wishlist = CustomerWishlist.objects.filter(customer__id=1).values_list(
            "product", flat=True
        )

        self.assertEqual(wishlist[1], product_2)
        self.assertEqual(len(wishlist), 2)

    def test_admin_user_cannot_post_wishlist_and_raises_validation_error(self):
        product_1 = 1
        payload = {"product": product_1}

        r = self.client.post(self.url, data=payload, **self.admin_bearer_token)
        self.assertEqual(r.status_code, 400)

    def test_get_empty_customer_wishlist(self):
        r = self.client.get(self.url, **self.customer_bearer_token)
        self.assertEqual(r.status_code, 200)

        self.assertEqual(
            r.json(), {"count": 0, "next": None, "previous": None, "results": []}
        )

    def test_get_non_empty_customer_wishlist(self):
        product_1 = 1
        payload = {"product": product_1}

        r1 = self.client.post(self.url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r1.status_code, 201)

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

    def test_delete_wishlist(self):
        payload = {"product": 1}
        r1 = self.client.post(self.url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r1.status_code, 201)
        product_id = r1.json()["product"]
        wishlist_id = r1.json()["id"]

        r2 = self.client.delete(
            f"/api/customer/wishlist/{product_id}/",
            data=payload,
            **self.customer_bearer_token,
        )
        self.assertEqual(r2.status_code, 204)
        self.assertEqual(
            CustomerWishlist.objects.filter(id=wishlist_id).exists(), False
        )


class TestCustomerShippingAddressView(TestCaseBase):
    fixtures = [
        "customer/tests/fixtures/customer.json",
    ]

    def test_should_create_get_delete_customer_shipping_address(self):
        # create customer shipping address
        url = reverse("customer-shipping-address")
        payload = {
            "address": "XXX",
            "city": "XXX",
            "province": "XXX",
            "country": "XXX",
            "postal_code": "XXX",
            "country_code_primary_phone_number": "XXX",
            "primary_phone_number": "XXX",
            "country_code_alternate_phone_number": "XXX",
            "alternate_phone_number": "XXX",
            "address_type": CustomerShippingAddress.ADDRESS_TYPE_HOME,
            "default_address": True,
        }
        r1 = self.client.post(url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r1.status_code, 201)

        # get all customer shipping addresses
        r2 = self.client.get(url, **self.customer_bearer_token)
        address_id = r2.json()[0]["id"]
        self.assertEqual(
            r2.json(),
            [
                {
                    "address": "XXX",
                    "address_type": "HOME",
                    "alternate_phone_number": "XXX",
                    "city": "XXX",
                    "country": "XXX",
                    "country_code_alternate_phone_number": "XXX",
                    "country_code_primary_phone_number": "XXX",
                    "customer": 1,
                    "default_address": True,
                    "id": address_id,
                    "postal_code": "XXX",
                    "primary_phone_number": "XXX",
                    "province": "XXX",
                }
            ],
        )

        # get customer shipping address by id
        url = reverse("customer-shipping-address-delete", kwargs={"id": address_id})
        r3 = self.client.get(url, **self.customer_bearer_token)
        self.assertEqual(
            r3.json(),
            {
                "address": "XXX",
                "address_type": "HOME",
                "alternate_phone_number": "XXX",
                "city": "XXX",
                "country": "XXX",
                "country_code_alternate_phone_number": "XXX",
                "country_code_primary_phone_number": "XXX",
                "customer": 1,
                "default_address": True,
                "id": address_id,
                "postal_code": "XXX",
                "primary_phone_number": "XXX",
                "province": "XXX",
            },
        )

        # put/patch the customer shipping address
        payload = {
            "customer": 1,
            "address": "YYY",
            "city": "YYY",
            "province": "YYY",
            "country": "YYY",
            "postal_code": "YYY",
            "country_code_primary_phone_number": "YYY",
            "primary_phone_number": "YYY",
            "country_code_alternate_phone_number": "YYY",
            "alternate_phone_number": "YYY",
            "address_type": CustomerShippingAddress.ADDRESS_TYPE_OFFICE,
            "default_address": False,
        }

        r4 = self.client.put(
            url,
            data=payload,
            **self.customer_bearer_token,
            content_type="application/json",
        )
        self.assertEqual(
            r4.json(),
            {
                "address": "YYY",
                "address_type": "OFFICE",
                "alternate_phone_number": "YYY",
                "city": "YYY",
                "country": "YYY",
                "country_code_alternate_phone_number": "YYY",
                "country_code_primary_phone_number": "YYY",
                "customer": 1,
                "default_address": False,
                "id": address_id,
                "postal_code": "YYY",
                "primary_phone_number": "YYY",
                "province": "YYY",
            },
        )

        payload = {"country": "ZZZ"}
        r5 = self.client.patch(
            url,
            data=payload,
            **self.customer_bearer_token,
            content_type="application/json",
        )
        self.assertEqual(
            r5.json(),
            {
                "address": "YYY",
                "address_type": "OFFICE",
                "alternate_phone_number": "YYY",
                "city": "YYY",
                "country": "ZZZ",
                "country_code_alternate_phone_number": "YYY",
                "country_code_primary_phone_number": "YYY",
                "customer": 1,
                "default_address": False,
                "id": address_id,
                "postal_code": "YYY",
                "primary_phone_number": "YYY",
                "province": "YYY",
            },
        )

        # delete the customer shipping address
        r6 = self.client.delete(url, data=payload, **self.customer_bearer_token)
        self.assertEqual(r6.status_code, 204)
