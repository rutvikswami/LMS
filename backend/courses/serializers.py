from rest_framework import serializers
from accounts.models import User
from .models import (
    Course,
    Section,
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
            "content",
            "video_url",
            "duration_minutes",
            "order",
        )


class SectionSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)
    chapter_count = serializers.SerializerMethodField()
    total_duration = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = (
            "id",
            "title",
            "order",
            "chapters",
            "chapter_count",
            "total_duration",
        )

    def get_chapter_count(self, obj):
        return obj.chapters.count()

    def get_total_duration(self, obj):
        return sum(chapter.duration_minutes for chapter in obj.chapters.all())


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

    sections = SectionSerializer(many=True, read_only=True)
    total_sections = serializers.SerializerMethodField()
    total_chapters = serializers.SerializerMethodField()
    total_duration = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "thumbnail",
            "sections",
            "total_sections",
            "total_chapters",
            "total_duration",
            "created_at",
        )

    def get_total_sections(self, obj):
        return obj.sections.count()

    def get_total_chapters(self, obj):
        return sum(section.chapters.count() for section in obj.sections.all())

    def get_total_duration(self, obj):
        total = 0
        for section in obj.sections.all():
            for chapter in section.chapters.all():
                total += chapter.duration_minutes
        return total


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

    sections = SectionSerializer(many=True)

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "sections",
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
