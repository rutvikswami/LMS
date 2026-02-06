import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Chapter {
  title: string;
  order: number;
}

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([
    { title: "", order: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addChapter = () => {
    setChapters([...chapters, { title: "", order: chapters.length + 1 }]);
  };

  const removeChapter = (index: number) => {
    if (chapters.length > 1) {
      const updated = chapters.filter((_, i) => i !== index);
      updated.forEach((c, i) => (c.order = i + 1));
      setChapters(updated);
    }
  };

  const updateChapter = (index: number, title: string) => {
    const updated = [...chapters];
    updated[index].title = title;
    setChapters(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Course title is required");
    if (!description.trim()) return setError("Course description is required");
    if (chapters.some((c) => !c.title.trim()))
      return setError("All chapter titles must be filled");

    setLoading(true);
    try {
      await api.post("/courses/create/", {
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim() || null,
        chapters: chapters.map((c) => ({
          title: c.title.trim(),
          order: c.order,
        })),
      });
      navigate("/creator/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/creator/dashboard")}
            className="mb-4 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create Course</h1>
          <p className="mt-1 text-gray-600">
            Add course details and structure your content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Course Details */}
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Course Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                  placeholder="Complete Python Bootcamp"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                  placeholder="Describe what students will learn..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Thumbnail URL (optional)
                </label>
                <input
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                  placeholder="https://image-url.com/banner.jpg"
                />
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div className="rounded-xl border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Course Chapters
              </h2>
              <button
                type="button"
                onClick={addChapter}
                className="rounded-lg bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-200"
              >
                + Add Chapter
              </button>
            </div>

            <div className="space-y-3">
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border bg-gray-50 px-3 py-2"
                >
                  <span className="text-sm font-semibold text-gray-500">
                    {index + 1}
                  </span>
                  <input
                    value={chapter.title}
                    onChange={(e) => updateChapter(index, e.target.value)}
                    className="flex-1 rounded-md border px-2 py-1.5 text-sm focus:border-purple-500 focus:outline-none"
                    placeholder={`Chapter ${index + 1}`}
                  />
                  {chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChapter(index)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/creator/dashboard")}
              className="rounded-lg border px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Creating…" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
