from store.models import Store


class StoreDomainNameMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        domain = request.META["HTTP_ORIGIN"]
        domain.replace("https://", "")
        domain.replace("http://", "")
        request.store_domain_name = domain

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.
        return response
