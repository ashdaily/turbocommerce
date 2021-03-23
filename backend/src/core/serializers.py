from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "first_name",
            "last_name",
            "user_type",
            "phone_number",
            "address_pincode",
        )

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def validate_username(self, username):
        username = username.strip().lower()
        try:
            validate_email(username)
        except ValidationError:
            raise serializers.ValidationError("Username should only be email")
        return username
