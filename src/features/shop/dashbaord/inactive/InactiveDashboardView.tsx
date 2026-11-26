import DashboardWelcome from "../shared/DashboardWelcome";
import InactiveStatsRow from "./components/InactiveStatsRow";
import ShopLockedHero from "./components/ShopLockedHero";
import LockedDashboardMobile from "./components/LockedDashboardMobile";

interface InactiveDashboardViewProps {
  onActivate?: () => void;
}

const InactiveDashboardView = ({ onActivate }: InactiveDashboardViewProps) => {
  return (
    <div className="w-full space-y-6">
      <DashboardWelcome />
      <InactiveStatsRow />
      <ShopLockedHero onActivate={onActivate} />
      <LockedDashboardMobile onActivate={onActivate} />
    </div>
  );
};

export default InactiveDashboardView;
