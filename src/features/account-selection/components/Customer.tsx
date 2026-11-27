import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthSession } from "../../auth/api/authQueries";
import AccountSelectionCard from "./AccountSelectionCard";
import CustomerAccessModal from "../../customer/components/CustomerAccessModal";
import { customerData } from "../data/customerData";

const Customer = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardLinkClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;

    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated && user?.role === "CUSTOMER") {
      navigate("/customer/dashboard");
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="h-full" onClickCapture={handleCardLinkClickCapture}>
        <AccountSelectionCard {...customerData} />
      </div>

      {isModalOpen && (
        <CustomerAccessModal
          onContinueAsGuest={() => {
            setIsModalOpen(false);
            navigate("/customer/dashboard");
          }}
          onScanQrNow={() => {
            setIsModalOpen(false);
            navigate("/customer/scan");
          }}
          onLogin={() => {
            setIsModalOpen(false);
            navigate("/auth/login", {
              state: { from: { pathname: "/customer/dashboard" } },
            });
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Customer;