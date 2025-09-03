from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Student, StudentRemark
from .serializers import StudentSerializer, StudentCreateSerializer, StudentRemarkSerializer

class StudentListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'preferred_country', 'assigned_counselor']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    ordering_fields = ['created_at', 'updated_at', 'first_name', 'last_name']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return StudentCreateSerializer
        return StudentSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Student.objects.all()
        elif user.role in ['counselor', 'employee']:
            return Student.objects.filter(assigned_counselor=user)
        return Student.objects.none()

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return StudentCreateSerializer
        return StudentSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Student.objects.all()
        elif user.role in ['counselor', 'employee']:
            return Student.objects.filter(assigned_counselor=user)
        return Student.objects.none()

class StudentRemarkListCreateView(generics.ListCreateAPIView):
    serializer_class = StudentRemarkSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['student', 'contact_type', 'priority']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return StudentRemark.objects.all()
        return StudentRemark.objects.filter(counselor=user)
    
    def perform_create(self, serializer):
        serializer.save(counselor=self.request.user)

class StudentRemarkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentRemarkSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return StudentRemark.objects.all()
        return StudentRemark.objects.filter(counselor=user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_stats(request):
    user = request.user
    
    if user.role == 'admin':
        queryset = Student.objects.all()
    else:
        queryset = Student.objects.filter(assigned_counselor=user)
    
    stats = {
        'total_students': queryset.count(),
        'inquiry': queryset.filter(status='inquiry').count(),
        'document_review': queryset.filter(status='document_review').count(),
        'applied': queryset.filter(status='applied').count(),
        'visa_approved': queryset.filter(status='visa_approved').count(),
        'enrolled': queryset.filter(status='enrolled').count(),
    }
    
    return Response(stats)
