from django.conf import settings
from pyhustler.pagination import PaginationMixin
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    page_size = settings.REST_FRAMEWORK_PAGE_SIZE
    page_size_query_param = "page_size"
    max_page_size = settings.REST_FRAMEWORK_MAX_PAGE_SIZE


class ProductSuggestionPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = "page_size"
    max_page_size = 3
