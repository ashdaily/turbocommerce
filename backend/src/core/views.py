from django.http import Http404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from utils.pagination import BaseAPIView
from .models import User
from .serializers import UserSerializer


class CustomerView(BaseAPIView):
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
