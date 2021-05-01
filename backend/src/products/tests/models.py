from pprint import pprint

from core.models import User
from products.models import (
    ProductGrandParentCategory,
    ProductParentCategory,
    ProductChildCategory,
    ProductBrand,
    Product,
)
from store.models import Store
from utils.tests import TestCaseBase


class TestProductGrandParentCategory(TestCaseBase):
    def test_product_grand_parent_category_should_create_unique_slugs(self):
        grand_parent_category_1 = ProductGrandParentCategory.objects.create(
            category_name="abc"
        )
        grand_parent_category_2 = ProductGrandParentCategory.objects.create(
            category_name="abc"
        )
        self.assertNotEqual(grand_parent_category_1.slug, grand_parent_category_2.slug)
        self.assertEqual(grand_parent_category_1.slug, "abc")
        self.assertEqual(grand_parent_category_2.slug, "abc-1")


class TestProductParentCategory(TestCaseBase):
    def test_product_parent_category_should_create_unique_slugs(self):
        grand_parent_category = ProductGrandParentCategory.objects.create(
            category_name="abc"
        )
        parent_category_1 = ProductParentCategory.objects.create(
            grand_parent_category=grand_parent_category, category_name="abc"
        )
        parent_category_2 = ProductParentCategory.objects.create(
            grand_parent_category=grand_parent_category, category_name="abc"
        )
        self.assertNotEqual(parent_category_1.slug, parent_category_2.slug)
        self.assertEqual(parent_category_1.slug, "abc")
        self.assertEqual(parent_category_2.slug, "abc-1")


class TestProductChildCategory(TestCaseBase):
    def test_product_child_category_should_create_unique_slugs(self):
        grand_parent_category = ProductGrandParentCategory.objects.create(
            category_name="abc"
        )

        parent_category = ProductParentCategory.objects.create(
            grand_parent_category=grand_parent_category, category_name="abc"
        )

        child_category_1 = ProductChildCategory.objects.create(
            parent_category=parent_category, category_name="abc"
        )
        child_category_2 = ProductChildCategory.objects.create(
            parent_category=parent_category, category_name="abc"
        )

        self.assertNotEqual(child_category_1.slug, child_category_2.slug)
        self.assertEqual(child_category_1.slug, "abc")
        self.assertEqual(child_category_2.slug, "abc-1")


class TestProduct(TestCaseBase):
    def test_product_should_create_unique_slugs(self):
        grand_parent_category = ProductGrandParentCategory.objects.create(
            category_name="abc"
        )

        parent_category = ProductParentCategory.objects.create(
            grand_parent_category=grand_parent_category, category_name="abc"
        )

        child_category = ProductChildCategory.objects.create(
            parent_category=parent_category, category_name="abc"
        )

        brand = ProductBrand.objects.create(brand_name="brand")

        store_owner = User.objects.create(
            email="ash@gmail.com", password="ash", user_type=User.CUSTOMER
        )
        store = Store.objects.create(
            store_owner=store_owner,
            store_name="mystore",
        )

        product_1 = Product.objects.create(
            store=store,
            child_category=child_category,
            brand=brand,
            product_name="abc",
            product_description="abc",
            returnable=True,
            country_of_origin="Morrocco",
        )
        product_2 = Product.objects.create(
            store=store,
            child_category=child_category,
            brand=brand,
            product_name="abc",
            product_description="abc",
            returnable=True,
            country_of_origin="Morrocco",
        )

        self.assertEqual(product_1.slug, "abc")
        self.assertEqual(product_2.slug, "abc-1")
