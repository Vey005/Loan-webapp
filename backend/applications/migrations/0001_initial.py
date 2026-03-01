# Generated manually for initial schema.

import applications.models
import applications.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="LoanApplication",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("full_name", models.CharField(max_length=255)),
                ("date_of_birth", models.DateField()),
                ("phone", models.CharField(db_index=True, max_length=32)),
                ("email", models.EmailField(db_index=True, max_length=254)),
                ("address", models.TextField()),
                ("employment_status", models.CharField(max_length=128)),
                ("monthly_income", models.DecimalField(decimal_places=2, max_digits=12)),
                ("loan_amount", models.DecimalField(decimal_places=2, max_digits=12)),
                ("national_id_number", models.CharField(db_index=True, max_length=64)),
                (
                    "id_document",
                    models.FileField(
                        upload_to=applications.models.id_document_upload_path,
                        validators=[applications.validators.validate_id_document],
                    ),
                ),
                (
                    "selfie_image",
                    models.ImageField(
                        upload_to=applications.models.selfie_upload_path,
                        validators=[applications.validators.validate_selfie_image],
                    ),
                ),
                ("ip_address", models.GenericIPAddressField(blank=True, null=True)),
                (
                    "status",
                    models.CharField(
                        choices=[("pending", "Pending"), ("approved", "Approved"), ("rejected", "Rejected")],
                        db_index=True,
                        default="pending",
                        max_length=16,
                    ),
                ),
                ("flagged", models.BooleanField(default=False)),
                ("admin_notes", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
                "indexes": [
                    models.Index(fields=["national_id_number"], name="loanapp_nat_id_idx"),
                    models.Index(fields=["phone"], name="loanapp_phone_idx"),
                    models.Index(fields=["email"], name="loanapp_email_idx"),
                    models.Index(fields=["status"], name="loanapp_status_idx"),
                    models.Index(fields=["created_at"], name="loanapp_created_idx"),
                ],
            },
        ),
        migrations.CreateModel(
            name="AuditLog",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("action", models.CharField(max_length=64)),
                ("timestamp", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("ip_address", models.GenericIPAddressField(blank=True, null=True)),
                ("metadata", models.JSONField(blank=True, default=dict)),
                (
                    "admin_user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="audit_logs",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "application",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="audit_logs",
                        to="applications.loanapplication",
                    ),
                ),
            ],
            options={"ordering": ["-timestamp"]},
        ),
    ]
