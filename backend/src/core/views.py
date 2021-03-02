from django.http import Http404
from pyhustler.pagination import PaginationMixin
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer


class CustomerView(APIView, PaginationMixin):
    permission_classes = [IsAuthenticated]
    serializer = UserSerializer
    model = User

    def get(self, request, *args, **kwargs):
        queryset = self.model.get(user=request.user)
        data = UserSerializer(queryset)

        serializer = self.serializer(data)
        if serializer.is_valid():
            return Response(serializer.data)

        return Response(serializer.errors)


class SignupView(APIView):
    serializer = UserSerializer

    def post(self, request, *args, **kwargs):
        payload = request.data.copy()
        payload["user_type"] = User.CUSTOMER
        serializer = self.serializer(data=payload)

        if serializer.is_valid():
            serializer.save()
            return Response({})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
