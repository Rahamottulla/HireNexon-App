import StatsCard from "@/features/university/components/cards/StatsCard";

const OverviewCards = ({ stats }) => {
  const cards = [
    { title: "Total Students", value: stats.totalStudents },
    { title: "Eligible Students", value: stats.eligibleStudents },
    { title: "Total Placed", value: stats.totalPlaced },
    { title: "Placement Rate", value: `${stats.placementRate}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
        />
      ))}
    </div>
  );
};

export default OverviewCards;