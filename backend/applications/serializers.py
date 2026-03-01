import re

from django.conf import settings
from django.contrib.auth import authenticate
from django.urls import reverse
from rest_framework import serializers

from .models import AuditLog, LoanApplication
from .services import LoanApplicationService
from .utils import get_client_ip
from .validators import validate_id_document, validate_selfie_image

PHONE_REGEX = re.compile(r"^\+?[0-9\-\s]{7,20}$")


class LoanApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = [
            "full_name",
            "date_of_birth",
            "phone",
            "email",
            "address",
            "employment_status",
            "monthly_income",
            "loan_amount",
            "national_id_number",
            "id_document",
            "selfie_image",
        ]

    def validate_phone(self, value):
        if not PHONE_REGEX.match(value):
            raise serializers.ValidationError("Invalid phone format.")
        return value

    def validate_monthly_income(self, value):
        if value <= 0:
            raise serializers.ValidationError("Monthly income must be greater than 0.")
        return value

    def validate_loan_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Loan amount must be greater than 0.")
        if value > settings.LOAN_MAX_AMOUNT:
            raise serializers.ValidationError(f"Loan amount cannot exceed {settings.LOAN_MAX_AMOUNT}.")
        return value

    def validate(self, attrs):
        validate_id_document(attrs["id_document"])
        validate_selfie_image(attrs["selfie_image"])
        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        ip_address = get_client_ip(request)
        return LoanApplicationService.create_application(validated_data, ip_address=ip_address)


class ApplicationStatusCheckSerializer(serializers.Serializer):
    phone_or_email = serializers.CharField(max_length=255)
    national_id_number = serializers.CharField(max_length=64)


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs["username"], password=attrs["password"])
        if not user or not user.is_active or not user.is_staff:
            raise serializers.ValidationError({"detail": ["Invalid admin credentials."]})
        attrs["user"] = user
        return attrs


class AdminLoanApplicationListSerializer(serializers.ModelSerializer):
    loan_to_income_ratio = serializers.SerializerMethodField()

    class Meta:
        model = LoanApplication
        fields = [
            "id",
            "full_name",
            "phone",
            "loan_amount",
            "monthly_income",
            "loan_to_income_ratio",
            "status",
            "flagged",
            "created_at",
        ]

    def get_loan_to_income_ratio(self, obj):
        return str(obj.loan_to_income_ratio)


class AdminLoanApplicationDetailSerializer(serializers.ModelSerializer):
    loan_to_income_ratio = serializers.SerializerMethodField()
    id_document_url = serializers.SerializerMethodField()
    selfie_image_url = serializers.SerializerMethodField()

    class Meta:
        model = LoanApplication
        fields = [
            "id",
            "full_name",
            "date_of_birth",
            "phone",
            "email",
            "address",
            "employment_status",
            "monthly_income",
            "loan_amount",
            "loan_to_income_ratio",
            "national_id_number",
            "id_document_url",
            "selfie_image_url",
            "ip_address",
            "status",
            "flagged",
            "admin_notes",
            "created_at",
            "updated_at",
        ]

    def get_loan_to_income_ratio(self, obj):
        return str(obj.loan_to_income_ratio)

    def get_id_document_url(self, obj):
        request = self.context.get("request")
        if not request:
            return None
        return request.build_absolute_uri(
            reverse("admin-application-file", kwargs={"application_id": str(obj.id), "file_type": "id_document"})
        )

    def get_selfie_image_url(self, obj):
        request = self.context.get("request")
        if not request:
            return None
        return request.build_absolute_uri(
            reverse("admin-application-file", kwargs={"application_id": str(obj.id), "file_type": "selfie_image"})
        )


class AdminFlagSerializer(serializers.Serializer):
    flagged = serializers.BooleanField()


class AdminNotesSerializer(serializers.Serializer):
    admin_notes = serializers.CharField(allow_blank=True, allow_null=True)


class AuditLogSerializer(serializers.ModelSerializer):
    admin_username = serializers.CharField(source="admin_user.username", read_only=True)
    application_id = serializers.UUIDField(source="application.id", read_only=True)

    class Meta:
        model = AuditLog
        fields = ["id", "admin_username", "action", "application_id", "timestamp", "ip_address", "metadata"]
