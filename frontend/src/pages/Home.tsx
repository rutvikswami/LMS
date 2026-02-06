import React, { useEffect, useState } from "react";
import { courseService } from "../services/courseService";
import type { Course } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch {
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold text-gray-900 sm:text-5xl">
            Learn skills that shape your future
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            High-quality courses from experienced creators. Learn at your own
            pace.
          </p>

          {!isAuthenticated && (
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-lg border px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <div className="rounded-lg border bg-white p-6">
            <p className="text-3xl font-bold text-gray-900">1000+</p>
            <p className="mt-1 text-gray-600">Courses</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <p className="text-3xl font-bold text-gray-900">Expert</p>
            <p className="mt-1 text-gray-600">Instructors</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <p className="text-3xl font-bold text-gray-900">Lifetime</p>
            <p className="mt-1 text-gray-600">Access</p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Explore Courses</h2>
          <p className="mt-2 text-gray-600">
            Browse courses and start learning today
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          </div>
        ) : error ? (
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
            {error}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-600 py-20">
            No courses available yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
