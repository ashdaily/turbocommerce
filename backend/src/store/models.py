from django.db import models

from core.models import User, Timestamp


def path_for_store_logo(instance, filename):
    return f"{instance.store_name}/logo/{filename}"


class Store(Timestamp):
    store_owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="store_owner",
        related_query_name="store_owner",
    )
    store_name = models.CharField(max_length=50, unique=True)
    store_logo = models.ImageField(upload_to=path_for_store_logo, null=True, blank=True)

    def __str__(self):
        return self.store_name
