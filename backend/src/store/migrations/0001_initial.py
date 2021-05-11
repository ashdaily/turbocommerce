# Generated by Django 3.1.3 on 2021-05-09 20:53

from django.db import migrations, models
import store.models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="StoreInformation",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("last_updated", models.DateTimeField(auto_now=True)),
                ("store_name", models.CharField(max_length=255)),
                ("title_tag", models.CharField(max_length=100)),
                ("logo", models.ImageField(upload_to=store.models.save_logo)),
            ],
            options={
                "ordering": ("-created",),
                "get_latest_by": "created",
                "abstract": False,
            },
        ),
    ]
