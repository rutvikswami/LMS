from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Course(models.Model):
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_courses"
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    """
    A section within a course (like Udemy sections).
    Example: "Section 1: Introduction to Python"
    """
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="sections"
    )
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]
        unique_together = ["course", "order"]

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Chapter(models.Model):
    """
    A chapter/lecture within a section (like Udemy lectures).
    Example: "1. Installing Python"
    """
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="chapters"
    )
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True, help_text="Chapter content/description")
    video_url = models.URLField(blank=True, null=True, help_text="Video URL if applicable")
    duration_minutes = models.PositiveIntegerField(default=0, help_text="Duration in minutes")
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]
        unique_together = ["section", "order"]

    def __str__(self):
        return f"{self.section.title} - {self.title}"


class Enrollment(models.Model):
    """
    Student enrolled in a course.
    """

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="enrollments"
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "course")

    def __str__(self):
        return f"{self.student} enrolled in {self.course}"


class CourseProgress(models.Model):
    """
    Basic progress tracking per course.
    """

    enrollment = models.OneToOneField(
        Enrollment,
        on_delete=models.CASCADE,
        related_name="progress"
    )
    completed_chapters = models.PositiveIntegerField(default=0)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Progress for {self.enrollment}"
