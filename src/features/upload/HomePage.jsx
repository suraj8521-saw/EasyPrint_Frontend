import React from "react";
import {
  ArrowRight,
  FileText,
  MapPin,
  Printer,
  UploadCloud,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
export default function HomePage() {
  const { session, isGuest } = useAuth();
  return (
    <div className="home-dashboard">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">YOUR PRINTING WORKSPACE</span>
          <h1>Welcome{isGuest ? "" : `, ${session?.name || "back"}`}!</h1>
          <p>Everything you need to upload, edit and print your documents.</p>
        </div>
        <Link to="/upload" className="button button-primary">
          <UploadCloud /> Upload & Print
        </Link>
      </div>
      <div className="dashboard-cards">
        <Link to="/upload" className="dashboard-card blue-card">
          <span>
            <UploadCloud />
          </span>
          <h3>Upload & Print</h3>
          <p>Upload documents and customize your print settings.</p>
          <b>
            Start now <ArrowRight size={16} />
          </b>
        </Link>
        <Link to="/shops" className="dashboard-card green-card">
          <span>
            <MapPin />
          </span>
          <h3>Find a Shop</h3>
          <p>Choose a printing partner for your documents.</p>
          <b>
            Explore shops <ArrowRight size={16} />
          </b>
        </Link>
        <Link to="/my-orders" className="dashboard-card purple-card">
          <span>
            <FileText />
          </span>
          <h3>My Orders</h3>
          <p>Review your previous print jobs and receipts.</p>
          <b>
            View orders <ArrowRight size={16} />
          </b>
        </Link>
      </div>
      <div className="welcome-banner">
        <div>
          <span className="eyebrow">EASYPRINT EDITOR</span>
          <h2>Make every page print-ready.</h2>
          <p>
            Crop, rotate, adjust image quality and preview before sending to
            print.
          </p>
          <Link to="/upload" className="button button-primary">
            Open document editor <ArrowRight size={17} />
          </Link>
        </div>
        <div className="banner-icon">
          <Printer size={88} />
          <Zap size={32} />
        </div>
      </div>
      <div className="info-note">
        <FileText />
        <div>
          <strong>Recent files section removed</strong>
          <p>
            As requested, this dashboard doesn't show a Recent Files section.
            Your documents will appear in the editor when you upload them.
          </p>
        </div>
      </div>
    </div>
  );
}
