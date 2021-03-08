# Generated by Django 3.1.7 on 2021-02-22 00:49

import colorfield.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import products.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0006_auto_20201130_2238"),
    ]

    operations = [
        migrations.CreateModel(
            name="ProductVariant",
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
                ("stock_keeping_unit", models.BigIntegerField()),
                ("discount", models.IntegerField()),
                ("published", models.BooleanField(default=False)),
                ("price", models.IntegerField()),
                ("weight_in_grams", models.IntegerField()),
                (
                    "color",
                    colorfield.fields.ColorField(
                        blank=True, default=None, max_length=18, null=True
                    ),
                ),
            ],
            options={
                "ordering": ("-created",),
                "get_latest_by": "created",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ProductVariantImage",
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
                (
                    "image",
                    models.ImageField(
                        upload_to=products.models.generate_upload_path_for_images
                    ),
                ),
                ("published", models.BooleanField(default=False)),
                (
                    "product_variant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="product_variant_images",
                        related_query_name="product_variant_image",
                        to="products.productvariant",
                    ),
                ),
            ],
            options={
                "ordering": ("-created",),
                "get_latest_by": "created",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ProductVariantInventory",
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
                ("trace_quantity", models.BooleanField(default=True)),
                ("quantity", models.IntegerField()),
            ],
            options={
                "verbose_name_plural": "Product variant inventory",
            },
        ),
        migrations.CreateModel(
            name="ProductVariantSpecification",
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
                (
                    "specification_name",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                (
                    "specification_value",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                (
                    "product_variant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="product_variant_specifications",
                        related_query_name="product_variant_specification",
                        to="products.productvariant",
                    ),
                ),
            ],
            options={
                "ordering": ("-created",),
                "get_latest_by": "created",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Warehouse",
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
                ("warehouse_name", models.CharField(max_length=255)),
                (
                    "address_street_line_1",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                (
                    "address_street_line_2",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("city", models.CharField(blank=True, max_length=255, null=True)),
                ("province", models.CharField(blank=True, max_length=255, null=True)),
                ("country", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ("-created",),
                "get_latest_by": "created",
                "abstract": False,
            },
        ),
        migrations.RemoveField(
            model_name="productspecification",
            name="product",
        ),
        migrations.AlterModelOptions(
            name="productchildcategory",
            options={"verbose_name_plural": "Child Categories"},
        ),
        migrations.RemoveField(
            model_name="product",
            name="discount",
        ),
        migrations.RemoveField(
            model_name="product",
            name="quantity_per_unit",
        ),
        migrations.RemoveField(
            model_name="product",
            name="sizes_available",
        ),
        migrations.RemoveField(
            model_name="product",
            name="unit_price",
        ),
        migrations.RemoveField(
            model_name="product",
            name="unit_weight_in_grams",
        ),
        migrations.DeleteModel(
            name="ProductImage",
        ),
        migrations.DeleteModel(
            name="ProductSpecification",
        ),
        migrations.AddField(
            model_name="productvariantinventory",
            name="assigned_warehouses",
            field=models.ManyToManyField(to="products.Warehouse"),
        ),
        migrations.AddField(
            model_name="productvariantinventory",
            name="product_variant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="product_variant_inventories",
                related_query_name="product_variant_inventory",
                to="products.productvariant",
            ),
        ),
        migrations.AddField(
            model_name="productvariant",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="product_variants",
                related_query_name="product_variant",
                to="products.product",
            ),
        ),
        migrations.AddField(
            model_name="productvariant",
            name="sizes_available",
            field=models.ManyToManyField(to="products.ProductSize"),
        ),
    ]
