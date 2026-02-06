import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseService } from "../services/courseService";
import type { CourseDetail as CourseDetailType } from "../services/courseService";
import { useAuth } from "../contexts/AuthContext";

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) fetchCourseDetail();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      const data = await courseService.getCourseDetail(Number(courseId));
      setCourse(data);
    } catch {
      setError("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      await courseService.enrollCourse(Number(courseId));
      navigate(`/course/${courseId}/content`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to enroll");
    } finally {
      setEnrolling(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="mb-2 text-sm font-medium text-purple-600">
              {course.chapters.length} Chapters
            </p>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              {course.title}
            </h1>
            <p className="max-w-3xl text-lg text-gray-600">
              {course.description}
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Created on {new Date(course.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Enroll Card */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border bg-white p-5 shadow-sm sticky top-24">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="mb-4 h-40 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-purple-100 text-5xl font-bold text-purple-600">
                  {course.title.charAt(0)}
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="mb-4 w-full rounded-lg bg-purple-600 py-3 text-lg font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {enrolling ? "Enrolling..." : "Enroll for Free"}
              </button>

              <ul className="space-y-2 text-sm text-gray-600">
                <li>✔ Full lifetime access</li>
                <li>✔ Access on all devices</li>
                <li>✔ Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* What you'll learn */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              What you'll learn
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
              <li>✔ Core concepts and fundamentals</li>
              <li>✔ Real-world practical skills</li>
              <li>✔ Industry best practices</li>
              <li>✔ Certificate of completion</li>
            </ul>
          </div>

          {/* Chapters */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Course Content
            </h2>

            {course.chapters.length === 0 ? (
              <p className="text-gray-600">No chapters available.</p>
            ) : (
              <div className="space-y-2">
                {course.chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className="flex items-center gap-4 rounded-lg border px-4 py-3 hover:bg-gray-50"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 text-sm font-bold text-purple-700">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-800">
                      {chapter.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-6 sticky top-24">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Requirements
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Basic computer knowledge</li>
              <li>• Willingness to learn</li>
              <li>• No prior experience required</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CourseDetail;
