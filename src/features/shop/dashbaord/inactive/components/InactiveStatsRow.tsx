import StatCard from "../../shared/StatCard";
import { INACTIVE_STATS } from "../data/inactiveStats";

const InactiveStatsRow = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {INACTIVE_STATS.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default InactiveStatsRow;