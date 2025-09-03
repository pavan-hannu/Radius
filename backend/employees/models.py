from django.db import models
from django.conf import settings

class EmployeePerformance(models.Model):
    employee = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='performance')
    assigned_students = models.IntegerField(default=0)
    completed_applications = models.IntegerField(default=0)
    success_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    revenue_generated = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    
    # Monthly targets
    monthly_target_students = models.IntegerField(default=0)
    monthly_target_applications = models.IntegerField(default=0)
    monthly_target_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Performance - {self.employee.full_name}"
    
    @property
    def target_achievement_percentage(self):
        if self.monthly_target_students > 0:
            return round((self.assigned_students / self.monthly_target_students) * 100, 2)
        return 0

class EmployeeTarget(models.Model):
    employee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='targets')
    target_type = models.CharField(max_length=50)  # students, applications, revenue
    target_value = models.DecimalField(max_digits=10, decimal_places=2)
    achieved_value = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    month = models.DateField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['employee', 'target_type', 'month']
    
    def __str__(self):
        return f"{self.employee.full_name} - {self.target_type} target for {self.month.strftime('%B %Y')}"
    
    @property
    def achievement_percentage(self):
        if self.target_value > 0:
            return round((self.achieved_value / self.target_value) * 100, 2)
        return 0
