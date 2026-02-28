import InterviewCalendar from "./InterviewCalendar";
import useInterviews from "@/features/company/hooks/useInterviews";

const Interviews = () => {
  const { interviews } = useInterviews();

  return (
    <div className="p-6">
      <InterviewCalendar interviews={interviews} />
    </div>
  );
};

export default Interviews;
