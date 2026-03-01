from rest_framework.permissions import BasePermission


class IsStaffAdmin(BasePermission):
    message = "Admin privileges are required."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
