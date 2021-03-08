from django.contrib import admin

from .models import (
    ProductMeasurement,
    ProductSize,
    ProductGrandParentCategory,
    ProductParentCategory,
    ProductChildCategory,
    ProductBrand,
    Product,
    ProductVariant,
    ProductVariantImage,
    ProductVariantInventory,
    ProductVariantSpecification,
    Warehouse,
)


admin.site.register(ProductMeasurement)
admin.site.register(ProductSize)
admin.site.register(ProductGrandParentCategory)
admin.site.register(ProductParentCategory)
admin.site.register(ProductChildCategory)
admin.site.register(ProductBrand)
admin.site.register(Product)
admin.site.register(ProductVariant)
admin.site.register(ProductVariantImage)
admin.site.register(ProductVariantInventory)
admin.site.register(ProductVariantSpecification)
admin.site.register(Warehouse)
