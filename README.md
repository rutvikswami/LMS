# 🎓 Learning Management System

A modern, full-stack Learning Management System with a beautiful Udemy-inspired interface. Built with Django REST Framework and React + TypeScript + Tailwind CSS.

![LMS Banner](https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=300&fit=crop)

## ✨ Features

### 🎨 Beautiful UI/UX
- Modern gradient designs (Purple, Pink, Gray color scheme)
- Udemy-inspired course detail and content pages
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Card-based layouts with hover effects

### 🔐 Authentication & Authorization
- JWT token-based authentication
- Role-based access (Student/Creator)
- Protected routes with automatic redirects
- Automatic token refresh
- Persistent login sessions

### 📚 Course Management
- Browse all available courses
- Detailed course pages with chapter previews
- One-click course enrollment
- Course content viewer with chapter navigation
- Beautiful course cards with thumbnails

### 🎯 Student Features
- **Home Page**: Hero banner with course grid
- **Course Discovery**: Browse and preview courses
- **Course Detail**: View course info before enrolling
- **Enrollment**: Quick enrollment process
- **My Learning**: Dashboard of enrolled courses
- **Course Content**: Full course viewer with sidebar chapters

### 🛠️ Technical Stack

**Frontend:**
- React 19 with TypeScript
- React Router v6 for navigation
- Tailwind CSS 4 for styling
- Axios for API communication
- Vite for fast development
- Context API for state management

**Backend:**
- Django 6.0
- Django REST Framework
- JWT Authentication
- MySQL Database
- CORS enabled

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server

### 1. Start Backend
```bash
cd LMS/backend
python manage.py migrate
python manage.py runserver
```

### 2. Start Frontend
```bash
cd LMS/frontend
npm install
npm run dev
```

### 3. Access Application
Open http://localhost:5173 in your browser

### 4. Test Login
- **Email**: creator@example.com
- **Password**: password123

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Detailed setup guide
- **[FEATURES.md](FEATURES.md)** - Complete feature list
- **[frontend/README.md](frontend/README.md)** - Frontend documentation

## 📸 Screenshots

### Home Page
- Beautiful gradient hero banner
- Feature highlights section
- Responsive course grid

### Course Detail
- Dark hero section with course info
- Sticky enrollment card
- Chapter preview
- What you'll learn section

### Course Content (Udemy-style)
- Video player area (placeholder)
- Chapter sidebar navigation
- Previous/Next navigation
- Overview section below video

### My Learning
- Grid of enrolled courses
- Quick access to course content
- Enrollment badges

## 🎨 Design System

### Colors
- **Primary**: Purple (#9333ea, #7e22ce)
- **Secondary**: Pink (#ec4899)
- **Background**: Gray (#f9fafb, #f3f4f6)
- **Text**: Gray (#374151, #1f2937, #111827)

### Components
- Navbar (sticky, responsive)
- CourseCard (hover effects, thumbnails)
- ProtectedRoute (auth guard)
- Loading states (spinners)
- Error messages (styled alerts)

## 📁 Project Structure

```
LMS/
├── backend/
│   ├── accounts/              # User authentication
│   │   ├── models.py         # Custom User model
│   │   ├── serializers.py    # Auth serializers
│   │   ├── views.py          # Login/Register views
│   │   └── urls.py           # Auth endpoints
│   ├── courses/              # Course management
│   │   ├── models.py         # Course, Chapter, Enrollment
│   │   ├── serializers.py    # Course serializers
│   │   ├── views.py          # Course CRUD views
│   │   └── urls.py           # Course endpoints
│   └── backend/              # Django settings
│       ├── settings.py       # CORS, JWT config
│       └── urls.py           # Main URL config
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   ├── CourseCard.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/         # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── MyEnrollments.tsx
│   │   │   ├── CourseDetail.tsx
│   │   │   └── CourseContent.tsx
│   │   ├── services/         # API services
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── courseService.ts
│   │   ├── App.tsx           # Main app + routing
│   │   └── main.tsx          # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── QUICKSTART.md             # Quick start guide
├── SETUP_INSTRUCTIONS.md     # Detailed setup
├── FEATURES.md               # Feature documentation
└── README.md                 # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/accounts/signup/` - Register new user
- `POST /api/accounts/login/` - Login user
- `POST /api/token/refresh/` - Refresh JWT token

### Courses
- `GET /api/courses/` - List all courses
- `GET /api/courses/:id/` - Course detail
- `POST /api/courses/:id/enroll/` - Enroll in course
- `GET /api/courses/my-enrollments/` - My enrolled courses
- `GET /api/courses/:id/content/` - Course content (protected)

### Creator (Future)
- `POST /api/courses/create/` - Create course
- `GET /api/courses/creator/my-courses/` - Creator's courses
- `GET /api/courses/creator/course/:id/students/` - Course students

## 📦 Sample Data

The system includes 6 pre-created courses:

1. **Complete Python Bootcamp** (10 chapters)
2. **Web Development Masterclass** (10 chapters)
3. **Data Science with Python** (10 chapters)
4. **UI/UX Design Fundamentals** (10 chapters)
5. **JavaScript Advanced Concepts** (10 chapters)
6. **Digital Marketing Mastery** (10 chapters)

## ✅ Implemented Features

- ✅ User registration with role selection (Student/Creator)
- ✅ JWT authentication with token refresh
- ✅ Beautiful home page with gradient banner
- ✅ Course listing with responsive grid
- ✅ Course detail page (Udemy-style)
- ✅ Course enrollment system
- ✅ My Learning dashboard
- ✅ Course content viewer with sidebar
- ✅ Chapter navigation (Previous/Next)
- ✅ Protected routes
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ CORS configuration

## 🚧 Future Enhancements

- [ ] Video upload and streaming
- [ ] Course progress tracking
- [ ] Quizzes and assessments
- [ ] Course search and filters
- [ ] User profiles
- [ ] Course reviews and ratings
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Discussion forums
- [ ] Live classes
- [ ] Mobile app

## 🛠️ Development

### Frontend Development
```bash
cd LMS/frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
```

### Backend Development
```bash
cd LMS/backend
python manage.py runserver    # Start server
python manage.py shell        # Django shell
python manage.py migrate      # Run migrations
python manage.py test         # Run tests
```

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend is running on port 8000
- Ensure frontend is running on port 5173
- Check CORS_ALLOWED_ORIGINS in settings.py

**Database Connection**
- Verify MySQL is running
- Check database credentials
- Run migrations

**Authentication Issues**
- Clear browser localStorage
- Check JWT token expiration
- Verify user exists in database

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

Built with ❤️ using Django, React, TypeScript, and Tailwind CSS

## 🙏 Acknowledgments

- Udemy for design inspiration
- Tailwind CSS for amazing styling utilities
- Django REST Framework for powerful API
- React team for excellent documentation

---

**Ready to start learning? Follow the [QUICKSTART.md](QUICKSTART.md) guide!** 🚀
