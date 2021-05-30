from django.db import models


from core.models import User, Timestamp


def save_logo(instance, filename):
    return f"{instance.store_name}/{instance.id}/{filename}"


class StoreInformation(Timestamp):
    store_name = models.CharField(max_length=255)
    title_tag = models.CharField(max_length=100)
    logo = models.ImageField(upload_to=save_logo)
    default_currency = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        """
        we support only single store for now
        so we want to restrict the admin from adding multiple
        store informations
        """
        if self.pk is None and StoreInformation.objects.all().count() == 1:
            raise Exception("Only single store information allowed")

        super().save(*args, **kwargs)

    def __str__(self):
        return self.store_name
