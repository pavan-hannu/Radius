from django.urls import path
from . import views

urlpatterns = [
    path('', views.StudentListCreateView.as_view(), name='student_list_create'),
    path('<int:pk>/', views.StudentDetailView.as_view(), name='student_detail'),
    path('remarks/', views.StudentRemarkListCreateView.as_view(), name='remark_list_create'),
    path('remarks/<int:pk>/', views.StudentRemarkDetailView.as_view(), name='remark_detail'),
    path('stats/', views.student_stats, name='student_stats'),
]
