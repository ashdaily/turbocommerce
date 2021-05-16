from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from core.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = (
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
        "is_superuser",
        "date_joined",
    )
    list_filter = ("is_staff", "is_active")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                    "user_type",
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "phone_number",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)
