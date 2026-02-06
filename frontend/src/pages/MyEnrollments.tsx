import React, { useEffect, useState } from "react";
import { courseService } from "../services/courseService";
import type { Enrollment } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

const MyEnrollments: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const data = await courseService.getMyEnrollments();
      setEnrollments(data);
    } catch {
      setError("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="mt-1 text-gray-600">Continue where you left off</p>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : error ? (
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
            {error}
          </div>
        ) : enrollments.length === 0 ? (
          <div className="rounded-lg border bg-white p-12 text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              No courses yet
            </h2>
            <p className="mb-6 text-gray-600">
              Enroll in a course to start learning
            </p>
            <Link
              to="/"
              className="rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {enrollments.length}{" "}
                {enrollments.length === 1 ? "Course" : "Courses"}
              </h2>
              <p className="mt-1 text-gray-600">Keep learning and growing</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {enrollments.map((enrollment) => (
                <CourseCard
                  key={enrollment.id}
                  course={enrollment.course}
                  enrolled
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default MyEnrollments;
