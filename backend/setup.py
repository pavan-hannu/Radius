#!/usr/bin/env python
"""
Django CRM Setup Script
This script sets up the Study Abroad CRM Django backend with initial data and admin user.
"""

import os
import sys
import django
from django.core.management import execute_from_command_line
from django.contrib.auth import get_user_model
from django.db import transaction

def setup_django():
    """Configure Django settings"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'study_abroad_crm.settings')
    django.setup()

def run_migrations():
    """Run database migrations"""
    print("🔄 Running database migrations...")
    execute_from_command_line(['manage.py', 'makemigrations'])
    execute_from_command_line(['manage.py', 'migrate'])
    print("✅ Database migrations completed!")

def create_superuser():
    """Create superuser if it doesn't exist"""
    User = get_user_model()
    
    admin_email = 'admin@studyabroad.com'
    admin_username = 'admin'
    admin_password = 'admin123'
    
    if not User.objects.filter(username=admin_username).exists():
        print(f"🔄 Creating superuser: {admin_username}")
        User.objects.create_superuser(
            username=admin_username,
            email=admin_email,
            password=admin_password,
            first_name='System',
            last_name='Administrator',
            role='admin'
        )
        print(f"✅ Superuser created!")
        print(f"   Username: {admin_username}")
        print(f"   Email: {admin_email}")
        print(f"   Password: {admin_password}")
    else:
        print("ℹ️  Superuser already exists")

def create_demo_users():
    """Create demo counselor and employee users"""
    User = get_user_model()
    
    demo_users = [
        {
            'username': 'sarah_johnson',
            'email': 'counselor@studyabroad.com',
            'password': 'counselor123',
            'first_name': 'Sarah',
            'last_name': 'Johnson',
            'role': 'counselor',
            'department': 'Counseling',
            'phone': '+1-234-567-8901'
        },
        {
            'username': 'mike_chen',
            'email': 'employee@studyabroad.com',
            'password': 'employee123',
            'first_name': 'Mike',
            'last_name': 'Chen',
            'role': 'employee',
            'department': 'Counseling',
            'phone': '+1-234-567-8902'
        }
    ]
    
    print("🔄 Creating demo users...")
    for user_data in demo_users:
        username = user_data['username']
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(**user_data)
            print(f"   ✅ Created {user_data['role']}: {username}")
        else:
            print(f"   ℹ️  User {username} already exists")

def create_demo_data():
    """Create demo universities and students"""
    from universities.models import University, UniversityProgram, UniversityRequirement
    from students.models import Student
    from django.contrib.auth import get_user_model
    from datetime import date
    
    User = get_user_model()
    
    print("🔄 Creating demo data...")
    
    # Create demo universities
    universities_data = [
        {
            'name': 'University of Toronto',
            'country': 'Canada',
            'city': 'Toronto',
            'website': 'https://www.utoronto.ca',
            'type': 'public',
            'established_year': 1827,
            'ranking': 1,
            'world_ranking': 34,
            'rating': 4.8,
            'total_students': 91286,
            'international_students': 23000,
            'acceptance_rate': 43.0,
            'tuition_fee_range': '$45,000 - $65,000',
            'application_fee': '$125',
            'partnership_status': 'direct'
        },
        {
            'name': 'University of Melbourne',
            'country': 'Australia',
            'city': 'Melbourne',
            'website': 'https://www.unimelb.edu.au',
            'type': 'public',
            'established_year': 1853,
            'ranking': 1,
            'world_ranking': 37,
            'rating': 4.7,
            'total_students': 51348,
            'international_students': 18500,
            'acceptance_rate': 70.0,
            'tuition_fee_range': '$32,000 - $48,000',
            'application_fee': '$100',
            'partnership_status': 'preferred'
        }
    ]
    
    for uni_data in universities_data:
        university, created = University.objects.get_or_create(
            name=uni_data['name'],
            defaults=uni_data
        )
        if created:
            print(f"   ✅ Created university: {university.name}")

def collect_static():
    """Collect static files"""
    print("🔄 Collecting static files...")
    execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])
    print("✅ Static files collected!")

def main():
    """Main setup function"""
    print("🚀 Setting up Study Abroad CRM Django Backend...")
    print("=" * 50)
    
    try:
        # Setup Django
        setup_django()
        
        # Run migrations
        run_migrations()
        
        # Create superuser
        create_superuser()
        
        # Create demo users
        create_demo_users()
        
        # Create demo data
        create_demo_data()
        
        # Collect static files
        collect_static()
        
        print("\n🎉 Setup completed successfully!")
        print("=" * 50)
        print("📋 Login Credentials:")
        print("   Admin: admin@studyabroad.com / admin123")
        print("   Counselor: counselor@studyabroad.com / counselor123") 
        print("   Employee: employee@studyabroad.com / employee123")
        print("\n🌐 Access Django Admin at: http://localhost:8000/admin/")
        print("🚀 Start the server with: python manage.py runserver")
        
    except Exception as e:
        print(f"❌ Setup failed: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()
