from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from customer.models import CustomerShippingAddress


@receiver(post_save, sender=CustomerShippingAddress)
def set_shipping_address_as_default(sender, **kwargs):
    """
    Since, for one customer, there should only be one default shipping address,
    if a new customer's shipping address was saved as
    default_address, this signal will set all
    the other existing addresses for the same customer as
    non default shipping addresses.
    """
    customer_shipping_address = kwargs["instance"]
    customer = shipping_address.customer

    if customer_shipping_address.default_address:
        other_addresses = CustomerShippingAddress.objects.filter(
            customer=customer, default_address=True
        ).exclude(id=customer_shipping_address.id)

        objects_to_update = []
        if other_addresses.exists():
            for other_address in other_addresses:
                other_address.default_address = False
                objects_to_update.append(objects_to_update)

            CustomerShippingAddress.objects.bulk_update(
                objects_to_update, ["default_address"]
            )
