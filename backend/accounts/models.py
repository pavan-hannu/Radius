from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('counselor', 'Counselor'),
        ('employee', 'Employee'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    phone = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=50, blank=True, null=True)
    join_date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username
