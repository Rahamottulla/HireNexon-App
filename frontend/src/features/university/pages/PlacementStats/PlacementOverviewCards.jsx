import StatsCard from "@/features/university/components/cards/StatsCard";

const PlacementOverviewCards = ({ stats }) => {
  const cards = [
    { title: "Total Placed", value: stats.totalPlaced },
    { title: "Highest Package", value: `₹ ${stats.highestPackage} LPA` },
    { title: "Average Package", value: `₹ ${stats.averagePackage} LPA` },
    { title: "Placement Rate", value: `${stats.placementRate}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <StatsCard key={i} title={card.title} value={card.value} />
      ))}
    </div>
  );
};

export default PlacementOverviewCards;