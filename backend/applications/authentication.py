from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
    """Authenticate using Authorization header first, then fallback to HTTP-only cookie."""

    def authenticate(self, request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(settings.JWT_AUTH_COOKIE)
            if raw_token is None:
                return None
            if isinstance(raw_token, str):
                raw_token = raw_token.encode("utf-8")
        else:
            raw_token = self.get_raw_token(header)
            if raw_token is None:
                return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
