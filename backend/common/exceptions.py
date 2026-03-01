from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {"success": False, "errors": {"detail": ["Internal server error"]}},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    if isinstance(response.data, dict):
        errors = response.data
    elif isinstance(response.data, list):
        errors = {"non_field_errors": response.data}
    else:
        errors = {"detail": [str(response.data)]}

    response.data = {"success": False, "errors": errors}
    return response
