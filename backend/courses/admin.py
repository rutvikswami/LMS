from django.contrib import admin
from .models import Course, Chapter


class ChapterInline(admin.TabularInline):
    model = Chapter
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "creator", "created_at")
    inlines = [ChapterInline]


@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")
