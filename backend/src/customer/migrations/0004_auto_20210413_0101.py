# Generated by Django 3.1.7 on 2021-04-13 01:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("customer", "0003_auto_20210413_0055"),
    ]

    operations = [
        migrations.RenameField(
            model_name="customerwishlist",
            old_name="products",
            new_name="product",
        ),
    ]
