import AccountSelectionCard from "./AccountSelectionCard";
import { shopData } from "../data/shopData";

const Shop = () => {
  return <AccountSelectionCard {...shopData} />;
};

export default Shop;