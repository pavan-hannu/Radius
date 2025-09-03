from rest_framework import serializers
from .models import Student, StudentRemark
from accounts.serializers import UserSerializer

class StudentRemarkSerializer(serializers.ModelSerializer):
    counselor_name = serializers.CharField(source='counselor.full_name', read_only=True)
    
    class Meta:
        model = StudentRemark
        fields = ['id', 'student', 'counselor', 'counselor_name', 'contact_type', 
                 'content', 'next_follow_up', 'priority', 'created_at']
        read_only_fields = ['counselor']

class StudentSerializer(serializers.ModelSerializer):
    counselor_name = serializers.CharField(source='assigned_counselor.full_name', read_only=True)
    remarks = StudentRemarkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'full_name', 'email', 'phone', 
                 'date_of_birth', 'gender', 'address', 'current_education', 
                 'field_of_study', 'institution', 'gpa', 'graduation_year', 
                 'english_proficiency', 'test_score', 'preferred_country', 
                 'intended_program', 'preferred_field', 'intake_year', 'budget', 
                 'assigned_counselor', 'counselor_name', 'status', 'additional_notes', 
                 'created_at', 'updated_at', 'remarks']
        read_only_fields = ['id', 'full_name', 'created_at', 'updated_at']

class StudentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'email', 'phone', 'date_of_birth', 
                 'gender', 'address', 'current_education', 'field_of_study', 
                 'institution', 'gpa', 'graduation_year', 'english_proficiency', 
                 'test_score', 'preferred_country', 'intended_program', 
                 'preferred_field', 'intake_year', 'budget', 'assigned_counselor', 
                 'additional_notes']
