# Generated by Django 3.1.7 on 2021-04-13 01:27

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0002_auto_20210327_0700"),
        ("customer", "0004_auto_20210413_0101"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="customerwishlist",
            options={},
        ),
        migrations.AlterUniqueTogether(
            name="customerwishlist",
            unique_together={("customer", "product")},
        ),
    ]
