from django.db import models

class University(models.Model):
    TYPE_CHOICES = [
        ('public', 'Public'),
        ('private', 'Private'),
    ]
    
    PARTNERSHIP_CHOICES = [
        ('direct', 'Direct Partnership'),
        ('premium', 'Premium Partner'),
        ('preferred', 'Preferred Partner'),
        ('standard', 'Standard'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    website = models.URLField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    established_year = models.IntegerField()
    
    # Rankings and Stats
    ranking = models.IntegerField(help_text="Country ranking")
    world_ranking = models.IntegerField(help_text="World ranking")
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    
    # Student Information
    total_students = models.IntegerField(default=0)
    international_students = models.IntegerField(default=0)
    acceptance_rate = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage")
    
    # Financial Information
    tuition_fee_range = models.CharField(max_length=100)
    application_fee = models.CharField(max_length=50)
    
    # Partnership Information
    partnership_status = models.CharField(max_length=20, choices=PARTNERSHIP_CHOICES, default='standard')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        verbose_name_plural = "Universities"
    
    def __str__(self):
        return f"{self.name}, {self.country}"
    
    @property
    def international_percentage(self):
        if self.total_students > 0:
            return round((self.international_students / self.total_students) * 100, 2)
        return 0

class UniversityProgram(models.Model):
    LEVEL_CHOICES = [
        ('bachelor', "Bachelor's Degree"),
        ('master', "Master's Degree"),
        ('phd', 'PhD'),
        ('diploma', 'Diploma/Certificate'),
    ]
    
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='programs')
    name = models.CharField(max_length=200)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    duration = models.CharField(max_length=50)
    annual_fee = models.CharField(max_length=100)
    requirements = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.level}) - {self.university.name}"

class UniversityRequirement(models.Model):
    university = models.OneToOneField(University, on_delete=models.CASCADE, related_name='requirements')
    english_tests = models.TextField(help_text="e.g., IELTS: 6.5, TOEFL: 89")
    academic_requirements = models.TextField()
    documents_required = models.TextField()
    application_deadlines = models.TextField()
    
    def __str__(self):
        return f"Requirements for {self.university.name}"
