import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseService } from "../services/courseService";
import type { Course } from "../services/courseService";

const CreatorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCreatorCourses();
  }, []);

  const fetchCreatorCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch {
      setError("Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Creator Dashboard
            </h1>
            <p className="mt-1 text-gray-600">
              Manage your courses and content
            </p>
          </div>

          <Link
            to="/creator/create-course"
            className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
          >
            + New Course
          </Link>
        </div>
      </header>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-white p-5">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              {courses.length}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-5">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">—</p>
          </div>

          <div className="rounded-lg border bg-white p-5">
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">—</p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Your Courses</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center">
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No courses yet
            </h3>
            <p className="mb-6 text-gray-600">
              Create your first course to get started
            </p>
            <Link
              to="/creator/create-course"
              className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Create Course
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-lg border bg-white p-4"
              >
                {/* Thumbnail */}
                <div className="h-20 w-28 flex shrink-0 overflow-hidden rounded-md bg-gray-100">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-purple-600">
                      {course.title.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                    {course.description}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Created {new Date(course.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/course/${course.id}`}
                    className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    View
                  </Link>
                  <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Edit
                  </button>
                  <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200">
                    Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CreatorDashboard;
