from django.contrib import admin
from .models import Student, StudentRemark

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'status', 'preferred_country', 'assigned_counselor', 'created_at']
    list_filter = ['status', 'preferred_country', 'assigned_counselor', 'current_education']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    ordering = ['-created_at']

@admin.register(StudentRemark)
class StudentRemarkAdmin(admin.ModelAdmin):
    list_display = ['student', 'counselor', 'contact_type', 'priority', 'created_at']
    list_filter = ['contact_type', 'priority', 'created_at']
    search_fields = ['student__first_name', 'student__last_name', 'content']
    ordering = ['-created_at']
