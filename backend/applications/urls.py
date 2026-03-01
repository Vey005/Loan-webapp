from django.urls import path

from .views import (
    AdminApplicationApproveView,
    AdminApplicationDetailView,
    AdminApplicationFileView,
    AdminApplicationFlagView,
    AdminApplicationListView,
    AdminApplicationNotesView,
    AdminApplicationRejectView,
    AdminAuditLogListView,
    AdminDashboardView,
    AdminLoginView,
    AdminLogoutView,
    PublicApplicationCreateView,
    PublicApplicationStatusView,
)

urlpatterns = [
    path("applications/", PublicApplicationCreateView.as_view(), name="application-create"),
    path("applications/status/", PublicApplicationStatusView.as_view(), name="application-status"),
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
    path("admin/logout/", AdminLogoutView.as_view(), name="admin-logout"),
    path("admin/dashboard/", AdminDashboardView.as_view(), name="admin-dashboard"),
    path("admin/applications/", AdminApplicationListView.as_view(), name="admin-applications"),
    path("admin/applications/<uuid:application_id>/", AdminApplicationDetailView.as_view(), name="admin-application-detail"),
    path("admin/applications/<uuid:application_id>/approve/", AdminApplicationApproveView.as_view(), name="admin-application-approve"),
    path("admin/applications/<uuid:application_id>/reject/", AdminApplicationRejectView.as_view(), name="admin-application-reject"),
    path("admin/applications/<uuid:application_id>/flag/", AdminApplicationFlagView.as_view(), name="admin-application-flag"),
    path("admin/applications/<uuid:application_id>/notes/", AdminApplicationNotesView.as_view(), name="admin-application-notes"),
    path(
        "admin/applications/<uuid:application_id>/files/<str:file_type>/",
        AdminApplicationFileView.as_view(),
        name="admin-application-file",
    ),
    path("admin/audit-logs/", AdminAuditLogListView.as_view(), name="admin-audit-logs"),
]
