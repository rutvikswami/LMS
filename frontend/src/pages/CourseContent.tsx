import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseService } from "../services/courseService";
import type { CourseDetail } from "../services/courseService";

const CourseContent: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) fetchCourseContent();
  }, [courseId]);

  const fetchCourseContent = async () => {
    try {
      const data = await courseService.getCourseContent(Number(courseId));
      setCourse(data);
      if (data.chapters.length > 0) {
        setSelectedChapter(data.chapters[0].id);
      }
    } catch {
      setError("Failed to load course content.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  if (!course || error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700">
          {error || "Course not found"}
        </div>
      </div>
    );
  }

  const currentChapter = course.chapters.find((c) => c.id === selectedChapter);
  const currentIndex = course.chapters.findIndex(
    (c) => c.id === selectedChapter,
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Video */}
        <div className="bg-black">
          <div className="mx-auto max-w-7xl">
            <div className="aspect-video flex items-center justify-center text-white">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600/20">
                  ▶
                </div>
                <p className="text-xl font-semibold">
                  {currentChapter?.title || "Select a chapter"}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Video player integration ready
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <button
              disabled={currentIndex === 0}
              onClick={() =>
                currentIndex > 0 &&
                setSelectedChapter(course.chapters[currentIndex - 1].id)
              }
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            <p className="text-sm text-gray-600">
              Chapter {currentIndex + 1} of {course.chapters.length}
            </p>

            <button
              disabled={currentIndex === course.chapters.length - 1}
              onClick={() =>
                currentIndex < course.chapters.length - 1 &&
                setSelectedChapter(course.chapters[currentIndex + 1].id)
              }
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Overview */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              {course.title}
            </h1>
            <p className="max-w-3xl text-gray-700">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-80 border-l bg-white">
        <div className="border-b px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Course Content
          </h3>
          <p className="text-sm text-gray-500">
            {course.chapters.length} chapters
          </p>
        </div>

        <div className="overflow-y-auto p-3">
          {course.chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter.id)}
              className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
                selectedChapter === chapter.id
                  ? "bg-purple-50 text-purple-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="text-sm font-medium">
                {index + 1}. {chapter.title}
              </p>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CourseContent;
