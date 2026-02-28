import StatsCard from "@/features/university/components/cards/StatsCard";

const DepartmentStats = ({ stats }) => {
  const cards = [
    { title: "Total Departments", value: stats.total },
    { title: "Total Students", value: stats.totalStudents },
    { title: "Placed Students", value: stats.placedStudents },
    { title: "Placement Rate", value: `${stats.placementRate}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item, i) => (
        <StatsCard key={i} title={item.title} value={item.value} />
      ))}
    </div>
  );
};

export default DepartmentStats;
