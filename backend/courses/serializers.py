from rest_framework import serializers
from accounts.models import User
from .models import (
    Course,
    Chapter,
    Enrollment,
    CourseProgress,
)

# -------------------------------------------------
# BASIC / SHARED SERIALIZERS
# -------------------------------------------------

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = (
            "id",
            "title",
            "order",
        )


# -------------------------------------------------
# PUBLIC COURSE SERIALIZERS
# -------------------------------------------------

class CourseListSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Home page
    - Course listing
    """

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "thumbnail",
            "created_at",
        )


class CourseDetailSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Course detail page
    - Before enrollment
    """

    chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "thumbnail",
            "chapters",
            "created_at",
        )


# -------------------------------------------------
# CREATOR DASHBOARD SERIALIZERS
# -------------------------------------------------

class CreatorCourseSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Creator dashboard
    """

    total_students = serializers.IntegerField()

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "created_at",
            "total_students",
        )


class EnrolledStudentSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Creator viewing enrolled students
    """

    student_email = serializers.EmailField(source="student.email")

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "student_email",
            "enrolled_at",
        )


# -------------------------------------------------
# ENROLLMENT SERIALIZERS
# -------------------------------------------------

class EnrollmentSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Student enrolled courses list
    """

    course = CourseListSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "course",
            "enrolled_at",
        )


# -------------------------------------------------
# COURSE CONTENT (POST-ENROLLMENT)
# -------------------------------------------------

class CourseContentSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Viewing course content after enrollment
    """

    chapters = ChapterSerializer(many=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "chapters",
        )


# -------------------------------------------------
# PROGRESS TRACKING
# -------------------------------------------------

class CourseProgressSerializer(serializers.ModelSerializer):
    """
    Used for:
    - Tracking progress
    """

    class Meta:
        model = CourseProgress
        fields = (
            "completed_chapters",
            "completed",
        )
