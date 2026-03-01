from django.db import transaction
from django.db.models import Q, Sum
from rest_framework.exceptions import ValidationError

from .models import ApplicationStatus, AuditLog, LoanApplication


class LoanApplicationService:
    @staticmethod
    @transaction.atomic
    def create_application(validated_data, ip_address=None):
        return LoanApplication.objects.create(
            **validated_data,
            ip_address=ip_address,
            status=ApplicationStatus.PENDING,
        )

    @staticmethod
    def find_for_status_lookup(phone_or_email, national_id_number):
        return (
            LoanApplication.objects.filter(national_id_number=national_id_number)
            .filter(Q(phone=phone_or_email) | Q(email__iexact=phone_or_email))
            .order_by("-created_at")
            .first()
        )


class AdminApplicationService:
    @staticmethod
    def _log(admin_user, application, action, ip_address, metadata=None):
        AuditLog.objects.create(
            admin_user=admin_user,
            action=action,
            application=application,
            ip_address=ip_address,
            metadata=metadata or {},
        )

    @staticmethod
    @transaction.atomic
    def approve(application, admin_user, ip_address=None):
        if application.status == ApplicationStatus.REJECTED:
            raise ValidationError({"status": ["Cannot approve an application already rejected."]})

        application.status = ApplicationStatus.APPROVED
        application.save(update_fields=["status", "updated_at"])
        AdminApplicationService._log(admin_user, application, "approved", ip_address)
        return application

    @staticmethod
    @transaction.atomic
    def reject(application, admin_user, ip_address=None):
        if application.status == ApplicationStatus.APPROVED:
            raise ValidationError({"status": ["Cannot reject an application already approved."]})

        application.status = ApplicationStatus.REJECTED
        application.save(update_fields=["status", "updated_at"])
        AdminApplicationService._log(admin_user, application, "rejected", ip_address)
        return application

    @staticmethod
    @transaction.atomic
    def set_flag(application, flagged, admin_user, ip_address=None):
        application.flagged = flagged
        application.save(update_fields=["flagged", "updated_at"])
        action = "flagged" if flagged else "unflagged"
        AdminApplicationService._log(admin_user, application, action, ip_address)
        return application

    @staticmethod
    @transaction.atomic
    def update_notes(application, notes, admin_user, ip_address=None):
        application.admin_notes = notes
        application.save(update_fields=["admin_notes", "updated_at"])
        AdminApplicationService._log(admin_user, application, "notes_updated", ip_address)
        return application

    @staticmethod
    def dashboard_metrics():
        base_queryset = LoanApplication.objects.all()

        total_requested = base_queryset.aggregate(total=Sum("loan_amount"))["total"] or 0
        approved_requested = (
            base_queryset.filter(status=ApplicationStatus.APPROVED).aggregate(total=Sum("loan_amount"))["total"] or 0
        )

        return {
            "total_applications": base_queryset.count(),
            "pending_applications": base_queryset.filter(status=ApplicationStatus.PENDING).count(),
            "approved_applications": base_queryset.filter(status=ApplicationStatus.APPROVED).count(),
            "rejected_applications": base_queryset.filter(status=ApplicationStatus.REJECTED).count(),
            "flagged_applications": base_queryset.filter(flagged=True).count(),
            "total_requested_loan_sum": total_requested,
            "total_approved_loan_sum": approved_requested,
        }
