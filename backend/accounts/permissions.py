from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework.permissions import BasePermission

from .models import User


def create_groups_and_permissions():
    content_type = ContentType.objects.get_for_model(User)

    # Student permissions
    view_course, _ = Permission.objects.get_or_create(
        codename="view_course",
        name="Can view courses",
        content_type=content_type,
    )

    enroll_course, _ = Permission.objects.get_or_create(
        codename="enroll_course",
        name="Can enroll in courses",
        content_type=content_type,
    )

    view_course_content, _ = Permission.objects.get_or_create(
        codename="view_course_content",
        name="Can view course content",
        content_type=content_type,
    )

    # Creator permissions
    create_course, _ = Permission.objects.get_or_create(
        codename="create_course",
        name="Can create courses",
        content_type=content_type,
    )

    update_course, _ = Permission.objects.get_or_create(
        codename="update_course",
        name="Can update courses",
        content_type=content_type,
    )

    student_group, _ = Group.objects.get_or_create(name="Student")
    creator_group, _ = Group.objects.get_or_create(name="Creator")

    student_group.permissions.set([
        view_course,
        enroll_course,
        view_course_content,
    ])

    creator_group.permissions.set([
        view_course,
        enroll_course,
        view_course_content,
        create_course,
        update_course,
    ])


class CanCreateCourse(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm("accounts.create_course")


class CanEnrollCourse(BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm("accounts.enroll_course")


class CanViewCourseContent(BasePermission):
    """
    Permission to access course chapters.
    Enrollment OR creator ownership is checked in view.
    """
    def has_permission(self, request, view):
        return request.user.has_perm("accounts.view_course_content")
