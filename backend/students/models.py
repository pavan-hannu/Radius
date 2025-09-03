from django.db import models
from django.conf import settings

class Student(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('inquiry', 'Inquiry'),
        ('document_review', 'Document Review'),
        ('applied', 'Applied'),
        ('visa_approved', 'Visa Approved'),
        ('enrolled', 'Enrolled'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn'),
    ]
    
    EDUCATION_LEVEL_CHOICES = [
        ('12th', '12th Grade'),
        ('diploma', 'Diploma'),
        ('bachelor', "Bachelor's Degree"),
        ('master', "Master's Degree"),
        ('phd', 'PhD'),
    ]
    
    # Personal Information
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    address = models.TextField()
    
    # Academic Information
    current_education = models.CharField(max_length=20, choices=EDUCATION_LEVEL_CHOICES)
    field_of_study = models.CharField(max_length=100)
    institution = models.CharField(max_length=200)
    gpa = models.CharField(max_length=20)
    graduation_year = models.IntegerField()
    english_proficiency = models.CharField(max_length=50, blank=True, null=True)
    test_score = models.CharField(max_length=100, blank=True, null=True)
    
    # Study Abroad Plans
    preferred_country = models.CharField(max_length=50)
    intended_program = models.CharField(max_length=20, choices=EDUCATION_LEVEL_CHOICES)
    preferred_field = models.CharField(max_length=100)
    intake_year = models.CharField(max_length=20)
    budget = models.CharField(max_length=50, blank=True, null=True)
    
    # CRM Information
    assigned_counselor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='inquiry')
    additional_notes = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

class StudentRemark(models.Model):
    CONTACT_TYPE_CHOICES = [
        ('call', 'Phone Call'),
        ('email', 'Email'),
        ('meeting', 'In-Person Meeting'),
        ('whatsapp', 'WhatsApp'),
    ]
    
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='remarks')
    counselor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact_type = models.CharField(max_length=20, choices=CONTACT_TYPE_CHOICES)
    content = models.TextField()
    next_follow_up = models.DateField(blank=True, null=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Remark for {self.student.full_name} by {self.counselor.full_name}"
