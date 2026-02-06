from django.urls import path

from .views import (
    # Public / Student
    CourseListView,
    CourseDetailView,

    # Enrollment
    EnrollCourseView,
    MyEnrollmentsView,

    # Course Content & Progress
    CourseContentView,
    CourseProgressView,

    # Creator
    CourseCreateView,
    CreatorCoursesView,
    CourseStudentsView,
)

urlpatterns = [

    # ==============================
    # PUBLIC / STUDENT ROUTES
    # ==============================

    # List all courses (home page)
    path(
        "",
        CourseListView.as_view(),
        name="course-list",
    ),

    # Course detail (before enrollment)
    path(
        "<int:course_id>/",
        CourseDetailView.as_view(),
        name="course-detail",
    ),

    # ==============================
    # ENROLLMENT ROUTES
    # ==============================

    # Enroll in a course
    path(
        "<int:course_id>/enroll/",
        EnrollCourseView.as_view(),
        name="course-enroll",
    ),

    # View my enrolled courses
    path(
        "my-enrollments/",
        MyEnrollmentsView.as_view(),
        name="my-enrollments",
    ),

    # ==============================
    # COURSE CONTENT & PROGRESS
    # ==============================

    # View course content (after enrollment)
    path(
        "<int:course_id>/content/",
        CourseContentView.as_view(),
        name="course-content",
    ),

    # View / update course progress
    path(
        "<int:course_id>/progress/",
        CourseProgressView.as_view(),
        name="course-progress",
    ),

    # ==============================
    # CREATOR ROUTES
    # ==============================

    # Create a course
    path(
        "create/",
        CourseCreateView.as_view(),
        name="course-create",
    ),

    # Creator: view own courses
    path(
        "creator/my-courses/",
        CreatorCoursesView.as_view(),
        name="creator-courses",
    ),

    # Creator: view students in a course
    path(
        "creator/course/<int:course_id>/students/",
        CourseStudentsView.as_view(),
        name="course-students",
    ),
]
