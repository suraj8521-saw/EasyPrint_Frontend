import React, { useState } from 'react';
import { ArrowRight, FileText, Zap, ShieldCheck, MapPin, Image, ScanLine, Sparkles, Printer, Users, Star, Menu, Globe, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Brand from '../../shared/Brand.jsx';
import hero from '../../assets/images/printing-hero.png';
const features = [
 { icon: Zap, title: 'Fast & Easy', desc: 'Get prints in minutes', tone: 'blue' },
 { icon: FileText, title: 'Multiple Formats', desc: 'PDF, JPG, PNG, DOC', tone: 'green' },
 { icon: Image, title: 'Edit Before Print', desc: 'Crop, Rotate, Adjust', tone: 'purple' },
 { icon: ShieldCheck, title: 'Secure & Private', desc: 'Your files are safe', tone: 'pink' },
];
const services = [
 { icon: FileText, title: 'Document Printing', desc: 'PDF, JPG, PNG, DOC', tone: 'pink' },
 { icon: Image, title: 'Photo Printing', desc: 'High Quality Prints', tone: 'blue' },
 { icon: ScanLine, title: 'Scan & Print', desc: 'Aadhaar, PAN, Forms', tone: 'green' },
 { icon: Sparkles, title: 'AI Document Help', desc: 'Summarize, Correct, Format', tone: 'purple' },
];
export default function LandingPage() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const closeMenu = () => setMobileMenuOpen(false);
 return <main className="landing-page">
  <header className="site-header"><Link to="/" className="brand-link" onClick={closeMenu}><Brand/></Link><nav className="desktop-nav"><a className="active" href="#home">Home</a><Link to="/auth/login">Services</Link><Link to="/auth/login">How It Works</Link><Link to="/auth/login">Find a Shop</Link><Link to="/auth/login">Pricing</Link><Link to="/auth/login">Support</Link></nav><div className="header-actions"><button className="language-button"><Globe size={16}/> English⌄</button><Link className="button button-outline button-small" to="/auth/login">Login</Link><Link className="button button-primary button-small" to="/auth/login">Get Started</Link><button type="button" className="mobile-menu" aria-controls="easyprint-mobile-nav" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(v => !v)}><Menu/></button></div>{mobileMenuOpen && <nav id="easyprint-mobile-nav" className="mobile-nav-panel"><a href="#home" onClick={closeMenu}>Home</a><Link to="/auth/login" onClick={closeMenu}>Services</Link><Link to="/auth/login" onClick={closeMenu}>How It Works</Link><Link to="/auth/login" onClick={closeMenu}>Find a Shop</Link><Link to="/auth/login" onClick={closeMenu}>Pricing</Link><Link to="/auth/login" onClick={closeMenu}>Support</Link><Link to="/auth/login" onClick={closeMenu}>Login / Get Started</Link></nav>}</header>
  <section id="home" className="hero-section"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> Your One-Stop Printing Solution</div><h1>Upload. Edit. Print.<br/><span>Anywhere.</span></h1><p className="hero-description">Scan the QR code at our shop or upload your documents, edit them online, and get them printed at nearby shops — fast, secure and hassle-free.</p><div className="feature-row">{features.map(({icon:Icon,title,desc,tone})=><div className="feature-mini" key={title}><span className={`feature-icon ${tone}`}><Icon/></span><strong>{title}</strong><small>{desc}</small></div>)}</div><div className="hero-actions"><Link className="button button-primary button-large" to="/auth/login"><span className="upload-symbol">↥</span> Get Started <ArrowRight size={19}/></Link><Link className="button button-outline button-large" to="/auth/login"><MapPin size={19} fill="currentColor"/> Find a Shop</Link></div></div><div className="hero-art" style={{backgroundImage:`url(${hero})`}} aria-label="EasyPrint QR printing in a modern print shop"/><div className="stats-strip"><Stat icon={Users} value="10K+" label="Happy Users"/><Stat icon={Printer} value="500+" label="Partner Shops"/><Stat icon={FileText} value="100K+" label="Documents Printed"/><Stat icon={Star} value="4.8" label="User Rating" gold/></div></section>
  <section id="services" className="services-section"><div className="section-heading"><h2>Everything You Need for Printing</h2><p>Professional printing services with smart digital tools</p></div><div className="service-grid">{services.map(({icon:Icon,title,desc,tone})=><Link to="/auth/login" className={`service-card ${tone}`} key={title}><span className={`service-icon ${tone}`}><Icon/></span><strong>{title}</strong><small>{desc}</small><span className="service-arrow"><ArrowRight size={18}/></span></Link>)}</div></section>
  <section id="how" className="how-section"><div className="section-heading"><h2>How It Works</h2><p>Get your documents printed in 4 simple steps</p></div><div className="steps-grid">{[{n:'1',icon:Printer,title:'Upload',desc:'Upload your document or scan QR at shop'},{n:'2',icon:FileText,title:'Edit',desc:'Crop, rotate, adjust if needed'},{n:'3',icon:MapPin,title:'Find a Shop',desc:'Choose the nearest printing shop'},{n:'4',icon:Printer,title:'Print',desc:'Get your documents printed easily'}].map(({n,icon:Icon,title,desc})=><div className="step" key={n}><span className="step-number">{n}</span><span className="step-icon"><Icon/></span><div><strong>{title}</strong><small>{desc}</small></div>{n!=='4'&&<ArrowRight className="step-arrow"/>}</div>)}</div></section>
  <footer className="site-footer"><Brand compact/><span>© 2026 EasyPrint. Print smarter, live easier.</span><div><Link to="/auth/login">Pricing</Link><Link to="/auth/login">Support</Link></div></footer>
 </main>;
}
function Stat({icon:Icon,value,label,gold}) { return <div className="stat"><span className={`stat-icon ${gold?'gold':''}`}><Icon/></span><div><strong>{value}</strong><small>{label}</small></div></div>; }
