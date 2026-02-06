import React from "react";
import { Link } from "react-router-dom";
import type { Course } from "../services/courseService";

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  enrolled = false,
}) => {
  return (
    <Link
      to={enrolled ? `/course/${course.id}/content` : `/course/${course.id}`}
      className="group block rounded-xl border border-gray-200 bg-white overflow-hidden
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500">
            <span className="text-5xl font-bold text-white">
              {course.title.charAt(0)}
            </span>
          </div>
        )}

        {enrolled && (
          <span className="absolute top-3 right-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
            Enrolled
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-purple-600">
          {course.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {course.description}
        </p>

        <div className="flex items-center justify-between border-t pt-4 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
              <svg
                className="h-4 w-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            Course
          </div>

          <span className="flex items-center gap-1 font-medium text-purple-600 transition group-hover:gap-2">
            View
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
