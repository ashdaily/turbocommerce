from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import serializers, exceptions
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "user_type",
            "phone_number",
        )


class CustomerUpdatePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """

    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class AdminUserTokenObtainSerializer(TokenObtainPairSerializer):
    """
    TokenObtainPairSerializer doesn't check if the user is
    admin or not, so we want to override it to check
    if the credentials belong to admin user or not.
    """

    def default_user_authentication_rule(self, user):
        if user is not None and user.is_active and user.user_type == User.ADMIN:
            return True
        return False

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        if not self.default_user_authentication_rule(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages["no_active_account"],
                "no_active_account",
            )

        data = {}

        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        update_last_login(None, self.user)

        return data
