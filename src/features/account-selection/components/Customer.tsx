import AccountSelectionCard from "./AccountSelectionCard";
import { customerData } from "../data/customerData";

const Customer = () => {
  return <AccountSelectionCard {...customerData} />;
};

export default Customer;