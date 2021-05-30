from django.urls import reverse

from store.models import StoreInformation
from store.views import StoreInformationListView
from utils.tests import TestCaseBase
from utils.print import pprint


class TestStoreInformationListView(TestCaseBase):
    fixtures = [
        "store/tests/fixtures/store-information.json",
    ]
    url = reverse("store-information")

    def test_get_store_information(self):
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, 200)

        payload = self.deserialize(r)
        self.assertEqual(
            payload,
            [
                {
                    "store_name": "Ash Store",
                    "title_tag": "Yo chicas gotta buy my stuff",
                    "logo": "http://testserver/media/ashstore/1.png",
                    "default_currency": "₹",
                }
            ],
        )

    def test_more_than_one_store_info_should_not_be_created(self):
        with self.assertRaises(Exception):
            StoreInformation.objects.create(
                store_name="Pokemon",
                title_tag="Yo chicas gotta buy my stuff",
                logo="https://lorempixel.com/50/50",
                default_currency="₹",
            )

    def test_should_be_able_to_update_the_only_existing_store_info_object(self):
        """
        Since StoreInformation model is not allowed to save more one object.
        We want to ensure that the only object is able to be updated from
        admin panel.
        """
        store_info = StoreInformation.objects.get(pk=1)
        STORE_NAME = "Potato store"
        store_info.store_name = STORE_NAME
        store_info.save()

        r = self.client.get(self.url)
        self.assertEqual(r.status_code, 200)

        payload = self.deserialize(r)
        self.assertEqual(
            payload,
            [
                {
                    "store_name": STORE_NAME,
                    "title_tag": "Yo chicas gotta buy my stuff",
                    "logo": "http://testserver/media/ashstore/1.png",
                    "default_currency": "₹",
                }
            ],
        )
