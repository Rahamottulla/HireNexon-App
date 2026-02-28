import StatsCard from "@/features/university/components/cards/StatsCard";

const StudentStats = ({ stats }) => {
  const cards = [
    { title: "Total Students", value: stats.total },
    { title: "Eligible", value: stats.eligible },
    { title: "Placed", value: stats.placed },
    { title: "Placement Rate", value: `${stats.rate}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <StatsCard key={i} title={card.title} value={card.value} />
      ))}
    </div>
  );
};

export default StudentStats;