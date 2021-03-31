from colorfield.fields import ColorField
from django.db import models
from django.template.defaultfilters import slugify
from pyhustler.countries import COUNTRIES
from pyhustler.measurement import MEASUREMENT_NAMES, MEASUREMENT_UNITS

from core.models import Timestamp
from store.models import Store


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
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    measurement = models.ManyToManyField(ProductMeasurement)
    comment = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name


class Warehouse(Timestamp):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
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

    def _make_unique_slug(self):
        self.slug = slugify(self.category_name)
        qs = ProductGrandParentCategory.objects.filter(slug=self.slug)
        if qs.exists():
            self.slug = f"{self.slug}-{qs.count()}"

    def save(self, *args, **kwargs):
        self._make_unique_slug()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Grand Parent Categories"

    def __str__(self):
        return self.category_name


class ProductParentCategory(Timestamp):
    grand_parent_category = models.ForeignKey(
        ProductGrandParentCategory,
        on_delete=models.CASCADE,
        related_name="product_parent_categories",
        related_query_name="product_parent_category",
    )
    category_name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def _make_unique_slug(self):
        self.slug = slugify(self.category_name)
        qs = ProductParentCategory.objects.filter(slug=self.slug)
        if qs.exists():
            self.slug = f"{self.slug}-{qs.count()}"

    def save(self, *args, **kwargs):
        self._make_unique_slug()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Parent Categories"

    def __str__(self):
        return self.category_name


class ProductChildCategory(Timestamp):
    parent_category = models.ForeignKey(
        ProductParentCategory,
        on_delete=models.CASCADE,
        related_name="product_child_categories",
        related_query_name="product_child_category",
    )
    category_name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def _make_unique_slug(self):
        self.slug = slugify(self.category_name)
        qs = ProductChildCategory.objects.filter(slug=self.slug)
        if qs.exists():
            self.slug = f"{self.slug}-{qs.count()}"

    def save(self, *args, **kwargs):
        self._make_unique_slug()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Child Categories"

    def __str__(self):
        return self.category_name


class ProductBrand(Timestamp):
    brand_name = models.CharField(max_length=255, null=True, blank=True, unique=True)
    slug = models.SlugField(max_length=520, null=True, blank=True, unique=True)

    def _make_unique_slug(self):
        self.slug = slugify(self.brand_name)
        qs = ProductBrand.objects.filter(slug=self.slug)
        if qs.exists():
            self.slug = f"{self.slug}-{qs.count()}"

    def save(self, *args, **kwargs):
        self._make_unique_slug()
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

    def get_product_by_category(
        self, grand_parent_category_slug, parent_category_slug, child_category_slug
    ):
        queryset = Product.objects.all()

        if grand_parent_category_slug:
            queryset = self.filter(
                child_category__parent_category__grand_parent_category__slug=grand_parent_category_slug
            )

        if parent_category_slug:
            queryset = self.filter(
                child_category__parent_category__slug=parent_category_slug
            )

        if child_category_slug:
            queryset = self.filter(child_category__id=child_category_slug)

        return queryset


class Product(Timestamp):
    store = models.ForeignKey(
        Store,
        on_delete=models.CASCADE,
        related_name="store_products",
        related_query_name="store_product",
    )
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

    def _make_unique_slug(self):
        self.slug = slugify(self.product_name)
        qs = Product.objects.filter(slug=self.slug)
        if qs.exists():
            self.slug = f"{self.slug}-{qs.count()}"

    def save(self, *args, **kwargs):
        self._make_unique_slug()
        super().save(*args, **kwargs)

    @property
    def grand_parent_category(self):
        return self.child_category.parent_category.grand_parent_category


class ProductVariant(Timestamp):
    product = models.ForeignKey(
        Product,
        related_name="product_variants",
        related_query_name="product_variant",
        on_delete=models.CASCADE,
    )
    stock_keeping_unit = models.BigIntegerField(unique=True)
    size = models.ForeignKey(ProductSize, on_delete=models.SET_NULL, null=True)
    discount = models.IntegerField()
    published = models.BooleanField(default=False)
    price = models.IntegerField()
    weight_in_grams = models.IntegerField()
    color = ColorField(null=True)

    def __str__(self):
        return f"{self.product.product_name} {self.id}"

    @property
    def quantity(self):
        total_quantity = 0
        for inventory in self.product_variant_inventories.all():
            total_quantity += inventory.quantity
        return total_quantity

    @property
    def in_stock(self):
        for inventory in self.product_variant_inventories.all():
            if inventory.quantity > 0:
                return True
        return False

    @property
    def images(self):
        images = []
        for image in self.product_variant_images.all():
            if not image.published:
                continue
            images.append(image.image.url)
        return images


def generate_upload_path_for_images(instance, filename):
    variant = instance.product_variant
    return f"{variant.product.store.store_name}/{variant.id}/{filename}"


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
    warehouse = models.ForeignKey(
        Warehouse,
        related_name="product_variant_warehouses",
        related_query_name="product_variant_warehouse",
        on_delete=models.SET_NULL,
        null=True,
    )

    def __str__(self):
        return f"{self.product_variant.product.product_name}"
