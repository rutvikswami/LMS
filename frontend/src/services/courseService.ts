import api from './api';

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  created_at: string;
}

export interface Chapter {
  id: number;
  title: string;
  order: number;
}

export interface CourseDetail extends Course {
  chapters: Chapter[];
}

export interface Enrollment {
  id: number;
  course: Course;
  enrolled_at: string;
}

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/courses/');
    return response.data;
  },

  async getCourseDetail(courseId: number): Promise<CourseDetail> {
    const response = await api.get<CourseDetail>(`/courses/${courseId}/`);
    return response.data;
  },

  async enrollCourse(courseId: number): Promise<void> {
    await api.post(`/courses/${courseId}/enroll/`);
  },

  async getMyEnrollments(): Promise<Enrollment[]> {
    const response = await api.get<Enrollment[]>('/courses/my-enrollments/');
    return response.data;
  },

  async getCourseContent(courseId: number): Promise<CourseDetail> {
    const response = await api.get<CourseDetail>(`/courses/${courseId}/content/`);
    return response.data;
  },
};
