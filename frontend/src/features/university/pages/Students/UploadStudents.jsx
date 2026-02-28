import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useBulkUploadStudents from "@/features/university/hooks/useBulkUploadStudents";
import Skeleton from "@/features/university/components/ui/Skeleton";
import { useState } from "react";

const UploadStudents = () => {
  const {
    file,
    setFile,
    handleSubmit,
    loading,
    error,
    success,
  } = useBulkUploadStudents();

  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <UniversityLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bulk Upload Students
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload CSV or Excel file to import student records.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          >
            <p className="text-sm text-gray-600">
              Drag & drop your file here, or click to browse
            </p>

            <input
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              id="fileUpload"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

            <label
              htmlFor="fileUpload"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer hover:bg-blue-700 transition"
            >
              Select File
            </label>

            {file && (
              <p className="mt-4 text-sm text-gray-700 font-medium">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm">
              {success}
            </div>
          )}

          {/* Upload Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Students"}
            </button>
          </div>

          {/* Loading Skeleton Preview */}
          {loading && (
            <div className="space-y-4 pt-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          )}

        </div>

      </div>
    </UniversityLayout>
  );
};

export default UploadStudents;