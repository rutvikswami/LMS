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
              {course.total_sections || 0} Sections • {course.total_chapters || 0} Lectures • {Math.floor((course.total_duration || 0) / 60)}h {(course.total_duration || 0) % 60}m
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

          {/* Course Content */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{course.total_sections || 0}</span> sections • 
                <span className="font-semibold ml-1">{course.total_chapters || 0}</span> lectures • 
                <span className="font-semibold ml-1">{Math.floor((course.total_duration || 0) / 60)}h {(course.total_duration || 0) % 60}m</span>
              </div>
            </div>

            {!course.sections || course.sections.length === 0 ? (
              <p className="text-gray-600">No content available.</p>
            ) : (
              <div className="space-y-3">
                {course.sections.map((section) => (
                  <details
                    key={section.id}
                    className="group bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-purple-300 transition-all"
                  >
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-600 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {section.chapter_count} lectures • {section.total_duration} min
                          </p>
                        </div>
                      </div>
                    </summary>
                    <div className="px-4 pb-4">
                      <ul className="space-y-2 mt-2">
                        {section.chapters.map((chapter) => (
                          <li
                            key={chapter.id}
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors border border-gray-100"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-7 h-7 bg-purple-100 rounded-lg">
                                {chapter.video_url ? (
                                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-gray-800 font-medium text-sm">{chapter.title}</span>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">{chapter.duration_minutes} min</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
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
