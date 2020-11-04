from django.http import Http404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from utils.pagination import BaseAPIView


class CustomerView(BaseAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("user created")
        print(request.data)
        return Response(status=status.HTTP_201_CREATED)
