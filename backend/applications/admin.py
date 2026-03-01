from django.contrib import admin

from .models import AuditLog, LoanApplication


@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "email",
        "loan_amount",
        "monthly_income",
        "status",
        "flagged",
        "created_at",
    )
    list_filter = ("status", "flagged", "created_at")
    search_fields = ("full_name", "phone", "email", "national_id_number")
    readonly_fields = ("created_at", "updated_at")


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ("timestamp", "admin_user", "action", "application", "ip_address")
    list_filter = ("action", "timestamp")
    search_fields = ("admin_user__username", "application__full_name", "application__phone")
