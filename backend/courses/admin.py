from django.contrib import admin
from .models import Course, Section, Chapter


class ChapterInline(admin.TabularInline):
    model = Chapter
    extra = 1
    fields = ('title', 'order', 'duration_minutes', 'video_url')


class SectionInline(admin.StackedInline):
    model = Section
    extra = 1
    fields = ('title', 'order')


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "creator", "created_at")
    inlines = [SectionInline]


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order")
    inlines = [ChapterInline]


@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "order", "duration_minutes")
