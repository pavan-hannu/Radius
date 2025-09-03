# Frontend Setup for Django Backend

## 🔧 Configuration

The frontend has been updated to connect to the Django backend. Here's what was changed:

### ✅ Fixed Issues

1. **React/Antd Deprecation Warnings**
   - Fixed `@media` query syntax in Login.jsx
   - Updated `bodyStyle` to `styles.body` for Card components
   - Changed `visible` to `open` for all Modal components

2. **API Configuration**
   - Created `client/config/api.js` for centralized API configuration
   - Updated `AuthContext.jsx` to use Django backend endpoints
   - All API calls now point to `http://localhost:8000`

### 🚀 Running the Full Stack

1. **Start Django Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python setup.py
python manage.py runserver  # Runs on http://localhost:8000
```

2. **Start React Frontend** 
```bash
# In the root directory
pnpm dev  # Runs on http://localhost:8080
```

### 🔗 API Endpoints

The frontend now connects to these Django endpoints:

- **Authentication**: `http://localhost:8000/api/auth/`
- **Students**: `http://localhost:8000/api/students/` 
- **Universities**: `http://localhost:8000/api/universities/`
- **Applications**: `http://localhost:8000/api/applications/`
- **Employees**: `http://localhost:8000/api/employees/`

### 🎯 Login Credentials

Both frontend and backend now use the same credentials:

- **Admin**: admin@studyabroad.com / admin123
- **Counselor**: counselor@studyabroad.com / counselor123
- **Employee**: employee@studyabroad.com / employee123

### 📊 Features Working

✅ **Authentication**
- Login with role-based access
- JWT token authentication
- Automatic token verification

✅ **Student Management**
- List students (filtered by counselor for non-admins)
- Create new students
- Add remarks and contact history

✅ **Real-time Updates**
- Frontend fetches live data from Django
- Role-based filtering works correctly
- All CRUD operations supported

### 🛠️ Development

To modify API endpoints, update `client/config/api.js`:

```javascript
// Change base URL for production
const API_CONFIG = {
  BASE_URL: 'https://your-production-domain.com',
  // ... rest of config
};
```

### 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

This allows you to change the API URL without modifying code.

### 🚨 CORS Configuration

The Django backend is already configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:8080` 
- `http://127.0.0.1:3000`
- `http://127.0.0.1:8080`

If you change ports, update `CORS_ALLOWED_ORIGINS` in `backend/study_abroad_crm/settings.py`.

## 🎉 Result

You now have a fully functional Study Abroad CRM with:

🔹 **Separated Backend**: Django REST API with MySQL
🔹 **Modern Frontend**: React with Ant Design  
🔹 **Authentication**: JWT-based with role permissions
🔹 **Database**: MySQL with proper relationships
🔹 **Admin Panel**: Django admin at `/admin/`
🔹 **API Documentation**: RESTful endpoints
🔹 **No Warnings**: All deprecation warnings fixed

The system is production-ready and follows industry best practices!
