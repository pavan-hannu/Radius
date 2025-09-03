from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('verify/', views.verify_token, name='verify_token'),
    path('logout/', views.logout_view, name='logout'),
    path('users/', views.UserListCreateView.as_view(), name='user_list_create'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user_detail'),
    path('me/', views.current_user, name='current_user'),
]
