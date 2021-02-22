from colorfield.fields import ColorField
from django.db import models
from django.template.defaultfilters import slugify
from pyhustler.countries import COUNTRIES
from pyhustler.measurement import MEASUREMENT_NAMES, MEASUREMENT_UNITS

from core.models import Timestamp, User


class ProductMeasurement(models.Model):
    measurement_name = models.CharField(
        max_length=50, null=True, blank=True, choices=MEASUREMENT_NAMES
    )
    measurement_value = models.IntegerField(null=True, blank=True)
    measurement_unit = models.CharField(
        max_length=50, null=True, blank=True, choices=MEASUREMENT_UNITS
    )

    def __str__(self):
        return (
            f"{self.measurement_name}={self.measurement_value}({self.measurement_unit})"
        )


class ProductSize(Timestamp):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    measurement = models.ManyToManyField(ProductMeasurement)
    comment = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name


class Warehouse(Timestamp):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    warehouse_name = models.CharField(max_length=255)
    address_street_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_street_line_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    province = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.warehouse_name


class ProductGrandParentCategory(Timestamp):
    category_name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Grand Parent Categories"

    def __str__(self):
        return self.category_name


class ProductParentCategory(Timestamp):
    grand_parent_category = models.ForeignKey(
        ProductGrandParentCategory, on_delete=models.CASCADE
    )
    category_name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Parent Categories"

    def __str__(self):
        return self.category_name


class ProductChildCategory(Timestamp):
    parent_category = models.ForeignKey(ProductParentCategory, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Child Categories"

    def __str__(self):
        return self.category_name


class ProductBrand(Timestamp):
    brand_name = models.CharField(max_length=255, null=True, blank=True, unique=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.brand_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.brand_name


class ProductModelManager(models.Manager):
    def product_suggestion(self, last_seen_product_id=None):
        """
        This method will find the suggested products
        for the customer based on the product they are
        looking at.

        Arguments -
        last_seen_product_id: This is the id of the product
        that will be used as reference for generating the
        other product suggestions that may interest a customer
        """
        if last_seen_product_id is None:
            raise Exception("Needs 'last_seen_product_id' argument")

        try:
            reference_product = self.get(id=last_seen_product_id)
        except self.DoesNotExist:
            return self.none()
        else:
            return self.filter(child_category=reference_product.child_category).exclude(
                id=reference_product.id
            )


class Product(Timestamp):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    child_category = models.ForeignKey(ProductChildCategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(ProductBrand, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255, null=True, blank=True)
    product_description = models.TextField(max_length=3000, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)
    returnable = models.BooleanField(default=False)
    country_of_origin = models.CharField(max_length=255, null=True, blank=True)

    objects = ProductModelManager()

    def __str__(self):
        return self.product_name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.product_name)
        super().save(*args, **kwargs)


class ProductVariant(Timestamp):
    product = models.ForeignKey(
        Product,
        related_name="product_variants",
        related_query_name="product_variant",
        on_delete=models.CASCADE,
    )
    stock_keeping_unit = models.BigIntegerField()
    sizes_available = models.ManyToManyField(ProductSize)
    discount = models.IntegerField()
    published = models.BooleanField(default=False)
    price = models.IntegerField()
    weight_in_grams = models.IntegerField()
    color = ColorField(null=True)

    def __str__(self):
        return f"{self.product.product_name}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.product_name)
        super().save(*args, **kwargs)


def generate_upload_path_for_images(instance, filename):
    return f"{instance.product_variant.product.user}/%Y/%m/%d/{filename}"


class ProductVariantImage(Timestamp):
    product_variant = models.ForeignKey(
        ProductVariant,
        related_name="product_variant_images",
        related_query_name="product_variant_image",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(upload_to=generate_upload_path_for_images)
    published = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product_variant.product.product_name}"


class ProductVariantSpecification(Timestamp):
    """
    Example:
    specification_name: material
    specification_value: cotton
    """

    product_variant = models.ForeignKey(
        ProductVariant,
        related_name="product_variant_specifications",
        related_query_name="product_variant_specification",
        on_delete=models.CASCADE,
    )
    specification_name = models.CharField(max_length=255, null=True, blank=True)
    specification_value = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.product_variant.product.product_name}"


class ProductVariantInventory(Timestamp):
    class Meta:
        verbose_name_plural = "Product variant inventory"

    product_variant = models.ForeignKey(
        ProductVariant,
        related_name="product_variant_inventories",
        related_query_name="product_variant_inventory",
        on_delete=models.CASCADE,
    )
    trace_quantity = models.BooleanField(default=True)
    quantity = models.IntegerField()
    assigned_warehouses = models.ManyToManyField(Warehouse)
