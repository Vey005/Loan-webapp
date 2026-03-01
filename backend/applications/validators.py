import os

from django.conf import settings
from django.core.exceptions import ValidationError


def _validate_file_size(file_obj):
    if file_obj.size > settings.MAX_UPLOAD_SIZE_BYTES:
        raise ValidationError(f"File size must be <= {settings.MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)}MB.")


def validate_id_document(file_obj):
    _validate_file_size(file_obj)
    extension = os.path.splitext(file_obj.name)[1].lower()

    if extension not in settings.ID_DOCUMENT_ALLOWED_TYPES:
        raise ValidationError("Unsupported ID document type.")

    content_type = getattr(file_obj, "content_type", "")
    if content_type and not (
        content_type.startswith("image/") or content_type in {"application/pdf", "application/x-pdf"}
    ):
        raise ValidationError("ID document must be an image or PDF.")


def validate_selfie_image(file_obj):
    _validate_file_size(file_obj)
    extension = os.path.splitext(file_obj.name)[1].lower()

    if extension not in settings.SELFIE_ALLOWED_TYPES:
        raise ValidationError("Unsupported selfie image type.")

    content_type = getattr(file_obj, "content_type", "")
    if content_type and not content_type.startswith("image/"):
        raise ValidationError("Selfie must be an image file.")
