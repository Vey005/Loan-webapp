import os
import uuid
from decimal import Decimal

from django.conf import settings
from django.db import models

from .validators import validate_id_document, validate_selfie_image


class ApplicationStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    APPROVED = "approved", "Approved"
    REJECTED = "rejected", "Rejected"


def _upload_path(instance, filename, category):
    extension = os.path.splitext(filename)[1].lower()
    return f"applications/{instance.id}/{category}/{uuid.uuid4().hex}{extension}"


def id_document_upload_path(instance, filename):
    return _upload_path(instance, filename, "id-document")


def selfie_upload_path(instance, filename):
    return _upload_path(instance, filename, "selfie")


class LoanApplication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=32, db_index=True)
    email = models.EmailField(db_index=True)
    address = models.TextField()

    employment_status = models.CharField(max_length=128)
    monthly_income = models.DecimalField(max_digits=12, decimal_places=2)
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)

    national_id_number = models.CharField(max_length=64, db_index=True)
    id_document = models.FileField(upload_to=id_document_upload_path, validators=[validate_id_document])
    selfie_image = models.ImageField(upload_to=selfie_upload_path, validators=[validate_selfie_image])

    ip_address = models.GenericIPAddressField(null=True, blank=True)

    status = models.CharField(
        max_length=16,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.PENDING,
        db_index=True,
    )
    flagged = models.BooleanField(default=False)
    admin_notes = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["national_id_number"]),
            models.Index(fields=["phone"]),
            models.Index(fields=["email"]),
            models.Index(fields=["status"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.full_name} ({self.status})"

    @property
    def loan_to_income_ratio(self):
        if not self.monthly_income:
            return Decimal("0.00")
        return (self.loan_amount / self.monthly_income).quantize(Decimal("0.01"))


class AuditLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    admin_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="audit_logs")
    action = models.CharField(max_length=64)
    application = models.ForeignKey(LoanApplication, on_delete=models.CASCADE, related_name="audit_logs")
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.action} by {self.admin_user} on {self.application_id}"
