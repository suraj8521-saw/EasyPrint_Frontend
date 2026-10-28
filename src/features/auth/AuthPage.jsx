import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  Zap,
  Printer,
} from "lucide-react";
import Brand from "../../shared/Brand.jsx";
import hero from "../../assets/images/printing-hero.png";
import { useAuth } from "./AuthContext.jsx";
const highlights = [
  { icon: Zap, title: "Fast & Easy", desc: "Get prints in minutes" },
  { icon: FileText, title: "Multiple Formats", desc: "PDF, JPG, PNG, DOC" },
  { icon: Sparkles, title: "Edit Before Print", desc: "Crop, Rotate, Adjust" },
];
export default function AuthPage({ initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    if (tab === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSubmitting(true);
    try {
      if (tab === "signup") await signup({ email, name, password });
      else await login({ email, password });
      navigate(location.state?.from || "/home", { replace: true });
    } catch (err) {
      setError(
        err.message ||
          "Authentication failed. Check that the backend is running.",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <Link to="/" className="auth-brand">
          <Brand />
        </Link>
        <div className="auth-promo">
          <h1>
            Upload. Edit. Print.
            <br />
            <span>Anywhere.</span>
          </h1>
          <p>
            Scan the QR code at our shop or upload your documents, edit them
            online, and get them printed at nearby shops — fast, secure and
            hassle-free.
          </p>
          <div className="auth-benefits">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <span className="benefit-icon">
                  <Icon />
                </span>
                <strong>{title}</strong>
                <small>{desc}</small>
              </div>
            ))}
          </div>
        </div>
        <div
          className="auth-image"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="auth-how">
          <h3>How It Works</h3>
          <p>Get your documents printed in 4 simple steps</p>
          <div className="auth-steps">
            {["Upload", "Edit", "Find a Shop", "Print"].map((s, i) => (
              <div key={s}>
                <span>{i + 1}</span>
                <strong>{s}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="auth-panel-wrap">
        <div className="auth-panel">
          <Link to="/" className="mobile-auth-brand">
            <Brand />
          </Link>
          <div className="auth-tabs">
            <button
              className={tab === "login" ? "selected" : ""}
              onClick={() => {
                setTab("login");
                setError("");
              }}
            >
              Login
            </button>
            <button
              className={tab === "signup" ? "selected" : ""}
              onClick={() => {
                setTab("signup");
                setError("");
              }}
            >
              Sign Up
            </button>
          </div>
          <h2>{tab === "login" ? "Welcome Back!" : "Create Your Account"}</h2>
          <p className="auth-subtitle">
            {tab === "login"
              ? "Login to continue your printing journey."
              : "Sign up to get started with EasyPrint."}
          </p>
          <form onSubmit={submit} className="auth-form">
            {tab === "signup" && (
              <label className="input-wrap">
                <UserRound />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  autoComplete="name"
                />
              </label>
            )}
            <label className="input-wrap">
              <Mail />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Phone Number"
                autoComplete="username"
              />
            </label>
            <label className="input-wrap">
              <LockKeyhole />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete={
                  tab === "login" ? "current-password" : "new-password"
                }
              />
              <button
                type="button"
                className="input-trailing"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </label>
            {tab === "login" && (
              <div className="form-meta">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />{" "}
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    setError(
                      "Password recovery is not available in the supplied backend yet.",
                    )
                  }
                >
                  Forgot Password?
                </button>
              </div>
            )}
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}
            <button
              className="button button-primary auth-submit"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Please wait…"
                : tab === "login"
                  ? "Login"
                  : "Create Account"}{" "}
              <ArrowRight size={20} />
            </button>
          </form>
          <div className="or-divider">
            <span>or continue with</span>
          </div>
          <button
            className="social-button guest-button"
            onClick={() => navigate("/auth/guest")}
          >
            <UserRound /> Continue as Guest
          </button>
          <button
            className="social-button"
            onClick={() =>
              setError(
                "Google sign-in needs OAuth credentials and a backend callback. Configure them to enable this option.",
              )
            }
          >
            <GoogleMark /> Continue with Google
          </button>
          <p className="auth-switch">
            {tab === "login" ? "New to EasyPrint?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setTab(tab === "login" ? "signup" : "login");
                setError("");
              }}
            >
              {tab === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
          <p className="auth-legal">
            <CheckCircle size={13} /> Your documents are handled securely.
          </p>
        </div>
      </section>
    </main>
  );
}
function GoogleMark() {
  return <span className="google-mark">G</span>;
}
