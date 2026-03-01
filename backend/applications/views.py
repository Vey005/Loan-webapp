from pathlib import Path

from django.conf import settings
from django.db.models import Q
from django.http import FileResponse, Http404
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from common.permissions import IsStaffAdmin
from common.responses import error_response, success_response

from .models import AuditLog, LoanApplication
from .serializers import (
    AdminFlagSerializer,
    AdminLoanApplicationDetailSerializer,
    AdminLoanApplicationListSerializer,
    AdminLoginSerializer,
    AdminNotesSerializer,
    ApplicationStatusCheckSerializer,
    AuditLogSerializer,
    LoanApplicationCreateSerializer,
)
from .services import AdminApplicationService, LoanApplicationService
from .utils import get_client_ip


class PublicApplicationCreateView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    throttle_scope = "application_submission"

    def post(self, request):
        serializer = LoanApplicationCreateSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        application = serializer.save()
        return success_response(
            data={
                "application_id": application.id,
                "status": application.status,
                "submitted_at": application.created_at,
            },
            status_code=status.HTTP_201_CREATED,
        )


class PublicApplicationStatusView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ApplicationStatusCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        application = LoanApplicationService.find_for_status_lookup(
            phone_or_email=serializer.validated_data["phone_or_email"],
            national_id_number=serializer.validated_data["national_id_number"],
        )

        if not application:
            return error_response(
                {"detail": ["No matching application was found."]},
                status_code=status.HTTP_404_NOT_FOUND,
            )

        return success_response(
            data={
                "application_id": application.id,
                "status": application.status,
                "submitted_at": application.created_at,
            }
        )


class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    throttle_scope = "admin_login"

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = success_response(
            data={
                "access": access_token,
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            }
        )

        response.set_cookie(
            settings.JWT_AUTH_COOKIE,
            access_token,
            httponly=True,
            secure=not settings.DEBUG,
            samesite="Lax",
            max_age=int(settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()),
        )
        return response


class AdminLogoutView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def post(self, request):
        response = success_response(data={"message": "Logged out."})
        response.delete_cookie(settings.JWT_AUTH_COOKIE)
        return response


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def get(self, request):
        metrics = AdminApplicationService.dashboard_metrics()
        return success_response(data=metrics)


class AdminApplicationListView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    SORT_MAPPING = {
        "amount": "loan_amount",
        "-amount": "-loan_amount",
        "income": "monthly_income",
        "-income": "-monthly_income",
        "date": "created_at",
        "-date": "-created_at",
    }

    def get(self, request):
        queryset = LoanApplication.objects.all()

        search = request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search)
                | Q(phone__icontains=search)
                | Q(national_id_number__icontains=search)
            )

        status_filter = request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        sort = request.query_params.get("sort", "-date")
        queryset = queryset.order_by(self.SORT_MAPPING.get(sort, "-created_at"))

        paginator = LimitOffsetPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request, view=self)

        serializer = AdminLoanApplicationListSerializer(paginated_qs, many=True, context={"request": request})

        return success_response(
            data={
                "count": paginator.count,
                "next": paginator.get_next_link(),
                "previous": paginator.get_previous_link(),
                "results": serializer.data,
            }
        )


class AdminApplicationDetailView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def get(self, request, application_id):
        application = get_object_or_404(LoanApplication, id=application_id)
        serializer = AdminLoanApplicationDetailSerializer(application, context={"request": request})
        return success_response(data=serializer.data)


class AdminApplicationApproveView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def patch(self, request, application_id):
        application = get_object_or_404(LoanApplication, id=application_id)
        updated = AdminApplicationService.approve(application, request.user, get_client_ip(request))
        return success_response(data={"application_id": updated.id, "status": updated.status})


class AdminApplicationRejectView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def patch(self, request, application_id):
        application = get_object_or_404(LoanApplication, id=application_id)
        updated = AdminApplicationService.reject(application, request.user, get_client_ip(request))
        return success_response(data={"application_id": updated.id, "status": updated.status})


class AdminApplicationFlagView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def patch(self, request, application_id):
        application = get_object_or_404(LoanApplication, id=application_id)
        serializer = AdminFlagSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        updated = AdminApplicationService.set_flag(
            application,
            serializer.validated_data["flagged"],
            request.user,
            get_client_ip(request),
        )
        return success_response(data={"application_id": updated.id, "flagged": updated.flagged})


class AdminApplicationNotesView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def patch(self, request, application_id):
        application = get_object_or_404(LoanApplication, id=application_id)
        serializer = AdminNotesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        updated = AdminApplicationService.update_notes(
            application,
            serializer.validated_data.get("admin_notes"),
            request.user,
            get_client_ip(request),
        )
        return success_response(data={"application_id": updated.id, "admin_notes": updated.admin_notes})


class AdminApplicationFileView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def get(self, request, application_id, file_type):
        application = get_object_or_404(LoanApplication, id=application_id)

        if file_type == "id_document":
            file_field = application.id_document
        elif file_type == "selfie_image":
            file_field = application.selfie_image
        else:
            raise Http404("File type not found")

        if not file_field:
            raise Http404("File not found")

        filename = Path(file_field.name).name
        response = FileResponse(file_field.open("rb"), as_attachment=False)
        response["Content-Disposition"] = f'inline; filename="{filename}"'
        return response


class AdminAuditLogListView(APIView):
    permission_classes = [IsAuthenticated, IsStaffAdmin]

    def get(self, request):
        queryset = AuditLog.objects.select_related("admin_user", "application").all()

        application_id = request.query_params.get("application_id")
        if application_id:
            queryset = queryset.filter(application_id=application_id)

        paginator = LimitOffsetPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request, view=self)
        serializer = AuditLogSerializer(paginated_qs, many=True)

        return success_response(
            data={
                "count": paginator.count,
                "next": paginator.get_next_link(),
                "previous": paginator.get_previous_link(),
                "results": serializer.data,
            }
        )

