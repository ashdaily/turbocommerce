from django.contrib.auth.hashers import make_password
from django.http import Http404
from pyhustler.pagination import PaginationMixin
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenViewBase

from core.models import User
from core.serializers import (
    AdminUserTokenObtainSerializer,
    CustomerUpdatePasswordSerializer,
    UserSerializer,
)


class CustomerDetailView(APIView):
    permission_classes = [IsAuthenticated]
    serializer = UserSerializer
    model = User

    def get(self, request, *args, **kwargs):
        queryset = self.model.get(user=request.user)
        data = UserSerializer(queryset)

        serializer = self.serializer(data)
        if serializer.is_valid():
            return Response(serializer.data)


class CustomerUpdatePasswordView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = CustomerUpdatePasswordSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.serializer(data=request.data)

        if serializer.is_valid():
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerSignupView(APIView):
    """
    PATH: /api/core/customer/signup/

    """

    serializer = UserSerializer

    def post(self, request, *args, **kwargs):
        payload = request.data.copy()
        payload["user_type"] = User.CUSTOMER
        serializer = self.serializer(data=payload)

        if serializer.is_valid():
            user = User()
            user.email = payload.get("email").strip()
            user.password = make_password(payload.get("password").strip())
            user.user_type = payload.get("user_type")
            user.save()

            return Response({}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminLoginView(TokenViewBase):
    """
    PATH: /api/core/admin/login/

    Takes a set of admin user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    serializer_class = AdminUserTokenObtainSerializer
