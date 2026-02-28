import { useParams } from "react-router-dom";
import UniversityLayout from "@/features/university/components/layout/UniversityLayout";
import useStudentDetails from "@/features/university/hooks/useStudentDetails";
import Loader from "@/features/university/components/ui/Loader";

const StudentDetails = () => {
  const { id } = useParams();
  const { student, loading, error } = useStudentDetails(id);

  return (
    <UniversityLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm mt-8 space-y-6">

        {loading && <Loader />}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </div>
        )}

        {student && (
          <>
            <h1 className="text-2xl font-bold">
              {student.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>CGPA:</strong> {student.cgpa}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Status:</strong> {student.status}</p>
            </div>
          </>
        )}

      </div>
    </UniversityLayout>
  );
};

export default StudentDetails;