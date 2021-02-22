from django.contrib import admin

from .models import (
    ProductMeasurement,
    ProductSize,
    ProductVariantSpecification,
    ProductGrandParentCategory,
    ProductParentCategory,
    ProductChildCategory,
    ProductBrand,
    Product,
)


admin.site.register(ProductMeasurement)
admin.site.register(ProductSize)
admin.site.register(ProductVariantSpecification)
admin.site.register(ProductGrandParentCategory)
admin.site.register(ProductParentCategory)
admin.site.register(ProductChildCategory)
admin.site.register(ProductBrand)
admin.site.register(Product)
