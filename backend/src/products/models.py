from django.db import models
from django.template.defaultfilters import slugify

from core.models import Timestamp, Vendor
from pyhustler.countries import COUNTRIES
from pyhustler.measurement import MEASUREMENT_NAMES, MEASUREMENT_UNITS


class ProductMeasurement(models.Model):
    measurement_name = models.CharField(
        max_length=50, null=True, blank=True, choices=MEASUREMENT_NAMES
    )
    measurment_value = models.IntegerField(null=True, blank=True)
    measurement_unit = models.CharField(
        max_length=50, null=True, blank=True, choices=MEASUREMENT_UNITS, unique=True
    )

    def __str__(self):
        return (
            f"{self.measurement_name}={self.measurment_value}({self.measurement_unit})"
        )


class ProductSize(Timestamp):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    measurement = models.ManyToManyField(ProductMeasurement)
    comment = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name


class ProductSpecification(Timestamp):
    specification_name = models.CharField(max_length=255, null=True, blank=True)
    specification_value = models.CharField(max_length=255, null=True, blank=True)


class ProductGrandParentCategory(Timestamp):
    category_name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Grand Parent Categories"


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


class ProductChildCategory(Timestamp):
    parent_category = models.ForeignKey(ProductParentCategory, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=255, null=True, blank=True)
    size = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Categories"


class ProductBrand(Timestamp):
    brand_name = models.CharField(max_length=255, null=True, blank=True, unique=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.brand_name)
        super().save(*args, **kwargs)


class Product(Timestamp):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    child_category = models.ForeignKey(ProductChildCategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(ProductBrand, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255, null=True, blank=True)
    product_description = models.TextField(max_length=3000, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)
    quantity_per_unit = models.IntegerField()
    sizes_available = models.ManyToManyField(ProductSize)
    discount = models.IntegerField()
    unit_price = models.IntegerField()
    unit_weight_in_grams = models.IntegerField()
    returnable = models.BooleanField(default=False)
    country_of_origin = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.product_name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.product_name)
        super().save(*args, **kwargs)
