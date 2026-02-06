from django.db.models import Count
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from accounts.permissions import (
    CanCreateCourse,
    CanEnrollCourse,
    CanViewCourseContent,
)

from .models import (
    Course,
    Enrollment,
    CourseProgress,
)

from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    CourseContentSerializer,
    EnrollmentSerializer,
    CreatorCourseSerializer,
    EnrolledStudentSerializer,
    CourseProgressSerializer,
)


# =================================================
# PUBLIC / STUDENT VIEWS
# =================================================

class CourseListView(APIView):
    """
    List all courses (home page).
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseListSerializer(courses, many=True)
        return Response(serializer.data)


class CourseDetailView(APIView):
    """
    View course details before enrollment.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)


# =================================================
# ENROLLMENT VIEWS
# =================================================

class EnrollCourseView(APIView):
    """
    Enroll student into a course.
    """

    permission_classes = [IsAuthenticated, CanEnrollCourse]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)

        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course
        )

        if created:
            CourseProgress.objects.create(enrollment=enrollment)

        return Response(
            {"message": "Enrolled successfully"},
            status=status.HTTP_201_CREATED
        )


class MyEnrollmentsView(APIView):
    """
    View courses the student is enrolled in.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(student=request.user)
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)


# =================================================
# COURSE CONTENT & PROGRESS
# =================================================

class CourseContentView(APIView):
    """
    View course content after enrollment.
    """

    permission_classes = [IsAuthenticated, CanViewCourseContent]

    def get(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)

        # Creator always allowed
        if course.creator == request.user:
            serializer = CourseContentSerializer(course)
            return Response(serializer.data)

        enrollment = Enrollment.objects.filter(
            course=course,
            student=request.user
        ).first()

        if not enrollment:
            return Response(
                {"detail": "You are not enrolled in this course"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = CourseContentSerializer(course)
        return Response(serializer.data)


class CourseProgressView(APIView):
    """
    Update and view course progress.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        enrollment = get_object_or_404(
            Enrollment,
            course_id=course_id,
            student=request.user
        )
        serializer = CourseProgressSerializer(enrollment.progress)
        return Response(serializer.data)

    def post(self, request, course_id):
        enrollment = get_object_or_404(
            Enrollment,
            course_id=course_id,
            student=request.user
        )

        completed_chapters = request.data.get("completed_chapters")

        if completed_chapters is None:
            return Response(
                {"detail": "completed_chapters is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        progress = enrollment.progress
        progress.completed_chapters = completed_chapters

        total_chapters = enrollment.course.chapters.count()
        if completed_chapters >= total_chapters:
            progress.completed = True

        progress.save()

        serializer = CourseProgressSerializer(progress)
        return Response(serializer.data)


# =================================================
# CREATOR DASHBOARD VIEWS
# =================================================

class CourseCreateView(APIView):
    """
    Creator creates a course.
    """

    permission_classes = [IsAuthenticated, CanCreateCourse]

    def post(self, request):
        serializer = CourseDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course = serializer.save(creator=request.user)
        return Response(
            CourseDetailSerializer(course).data,
            status=status.HTTP_201_CREATED
        )


class CreatorCoursesView(APIView):
    """
    Creator views their own courses.
    """

    permission_classes = [IsAuthenticated, CanCreateCourse]

    def get(self, request):
        courses = (
            Course.objects
            .filter(creator=request.user)
            .annotate(total_students=Count("enrollments"))
        )
        serializer = CreatorCourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseStudentsView(APIView):
    """
    Creator views students enrolled in a course.
    """

    permission_classes = [IsAuthenticated, CanCreateCourse]

    def get(self, request, course_id):
        course = get_object_or_404(
            Course,
            id=course_id,
            creator=request.user
        )
        enrollments = Enrollment.objects.filter(course=course)
        serializer = EnrolledStudentSerializer(enrollments, many=True)
        return Response(serializer.data)
