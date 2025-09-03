# Study Abroad CRM - Django Backend

## 🚀 Quick Setup

### Prerequisites

- Python 3.8+
- MySQL 8.0+
- pip and virtualenv

### Installation Steps

1. **Create virtual environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**

```bash
pip install -r requirements.txt
```

3. **Set up MySQL database**

```sql
CREATE DATABASE study_abroad_crm;
CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON study_abroad_crm.* TO 'crm_user'@'localhost';
FLUSH PRIVILEGES;
```

4. **Configure environment variables**
   Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=study_abroad_crm
DB_USER=crm_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

5. **Run setup script**

```bash
python setup.py
```

6. **Start the development server**

```bash
python manage.py runserver
```

## 🔑 Default Login Credentials

- **Admin**: admin@studyabroad.com / admin123
- **Counselor**: counselor@studyabroad.com / counselor123
- **Employee**: employee@studyabroad.com / employee123

## 📋 API Endpoints

### Authentication

- `POST /api/auth/login/` - User login
- `GET /api/auth/verify/` - Verify token
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Current user info

### Students

- `GET /api/students/` - List students
- `POST /api/students/` - Create student
- `GET /api/students/{id}/` - Student details
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student
- `GET /api/students/stats/` - Student statistics

### Student Remarks

- `GET /api/students/remarks/` - List remarks
- `POST /api/students/remarks/` - Create remark
- `GET /api/students/remarks/{id}/` - Remark details
- `PUT /api/students/remarks/{id}/` - Update remark

### Universities

- `GET /api/universities/` - List universities
- `POST /api/universities/` - Create university
- `GET /api/universities/{id}/` - University details

### Applications

- `GET /api/applications/` - List applications
- `POST /api/applications/` - Create application
- `GET /api/applications/{id}/` - Application details

## 🏗️ Project Structure

```
backend/
├── study_abroad_crm/          # Django project settings
├── accounts/                  # User authentication
├── students/                  # Student management
├── universities/              # University data
├── applications/              # Application tracking
├── employees/                 # Employee performance
├── setup.py                   # Setup script
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## 🛠️ Development

### Adding New Models

1. Create model in appropriate app
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`

### Creating API Endpoints

1. Add serializer in `serializers.py`
2. Add view in `views.py`
3. Add URL in `urls.py`

### Admin Interface

Access at `http://localhost:8000/admin/` with admin credentials.

## 🔧 Configuration

### Role-Based Access Control

- **Admin**: Full access to all data
- **Counselor**: Access to assigned students only
- **Employee**: Limited access based on assignments

### Database Filtering

- Students are automatically filtered based on user role
- Counselors only see their assigned students
- Admins see all data

## 📊 Features

✅ **User Management**

- Role-based authentication (Admin, Counselor, Employee)
- JWT token authentication
- User profiles and permissions

✅ **Student Management**

- Complete student profiles
- Academic and personal information
- Status tracking (Inquiry → Enrolled)
- Counselor assignments

✅ **Communication Tracking**

- Student remarks and notes
- Contact history (Call, Email, Meeting)
- Follow-up scheduling
- Priority management

✅ **University Database**

- Partner university profiles
- Program listings
- Requirements and deadlines
- Partnership status tracking

✅ **Application Workflow**

- Multi-step application process
- Document management
- Status progression tracking
- Timeline visualization

✅ **Employee Performance**

- Performance metrics
- Target tracking
- Success rate calculations
- Revenue monitoring

## 🚨 Troubleshooting

### Common Issues

**MySQL Connection Error**

- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists

**Permission Denied**

- Check file permissions
- Ensure virtual environment is activated

**Migration Errors**

- Delete migration files (keep `__init__.py`)
- Run `python manage.py makemigrations`
- Run `python manage.py migrate`

### Reset Database

```bash
python manage.py flush
python setup.py
```

## 🤝 Contributing

1. Follow Django best practices
2. Use proper serializers for API responses
3. Implement proper permissions
4. Add tests for new features
5. Update documentation
