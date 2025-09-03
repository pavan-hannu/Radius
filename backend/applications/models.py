from django.db import models
from django.conf import settings
from students.models import Student
from universities.models import University

class Application(models.Model):
    STATUS_CHOICES = [
        ('inquiry_received', 'Inquiry Received'),
        ('document_review', 'Document Review'),
        ('application_submitted', 'Application Submitted'),
        ('university_review', 'University Review'),
        ('decision_received', 'Decision Received'),
        ('visa_processing', 'Visa Processing'),
        ('visa_approved', 'Visa Approved'),
        ('enrolled', 'Enrolled'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn'),
    ]
    
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    
    # Basic Information
    application_id = models.CharField(max_length=20, unique=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='applications')
    university = models.ForeignKey(University, on_delete=models.CASCADE)
    program = models.CharField(max_length=200)
    level = models.CharField(max_length=20)
    intake = models.CharField(max_length=50)
    
    # Status and Progress
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='inquiry_received')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    current_step = models.IntegerField(default=1)
    total_steps = models.IntegerField(default=8)
    
    # Dates
    application_date = models.DateField()
    estimated_decision = models.DateField(blank=True, null=True)
    last_update = models.DateTimeField(auto_now=True)
    
    # Financial
    application_fee = models.CharField(max_length=50)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.application_id} - {self.student.full_name} to {self.university.name}"
    
    @property
    def progress_percentage(self):
        return round((self.current_step / self.total_steps) * 100, 2)

class ApplicationDocument(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('revision_required', 'Revision Required'),
        ('rejected', 'Rejected'),
    ]
    
    TYPE_CHOICES = [
        ('academic', 'Academic'),
        ('personal', 'Personal'),
        ('reference', 'Reference'),
        ('test_score', 'Test Score'),
        ('essay', 'Essay'),
        ('other', 'Other'),
    ]
    
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=200)
    document_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    upload_date = models.DateTimeField(blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='application_documents/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} - {self.application.application_id}"

class ApplicationTimeline(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name='timeline')
    status = models.CharField(max_length=50)
    description = models.TextField()
    date = models.DateTimeField()
    completed = models.BooleanField(default=False)
    is_current = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['date']
    
    def __str__(self):
        return f"{self.application.application_id} - {self.status}"
