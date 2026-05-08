"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  fuel_type: string;
  km_driven: number;
  transmission: string;
  owners: number;
  images: string[];
  is_sold: boolean;
  is_featured: boolean;
  body_type?: string;
  color?: string;
  interior?: string;
  description?: string;
  insurance_validity?: string;
  insurance_type?: string;
  rto?: string;
  engine?: string;
drive?: string;
feature_1_title?: string;
  feature_1_desc?: string;
  feature_2_title?: string;
  feature_2_desc?: string;
  feature_3_title?: string;
  feature_3_desc?: string;
  feature_4_title?: string;
  feature_4_desc?: string;
}
interface CallBackRequest {
  id: string;
  name: string;
  email?: string;
  phone: string;
  message?: string;
  created_at: string;
}
// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
// ─── SITE CONFIG ──────────────────────────────────────────────────────────────
const siteConfig = {
  dealershipName: "SSK CARS",
  tagline: "Lucknow's Trusted Dealership",
  colors: {
    primary: "#C0392B",
    secondary: "#1A1A1A",
    accent: "#D4AF37",
    background: "#F9F9F9",
  },
  phones: [
    { label: "Sales", number: "+91 98396 22998" },
    { label: "Sales", number: "+91 98381 22998" }, // ← ADD YOUR NEW NUMBER HERE
    { label: "Sales", number: "+91 97921 12999" },
    { label: "Sales", number: "+91 98390 99077" },
  ],
  email: "Sskcarsales@gmail.com",
  whatsappNumber: "9838122998",
  address: "CP-5, Faizabad Rd, near Chandan Hospital, Vijayant Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
  hours: { weekdays: "Mon – Sat: 10:00 AM – 9:00 PM", sunday: "Sun: 11:00 AM – 8:00 PM" },
  social: { instagram: "#", facebook: "#" },
};

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────
const formatPrice = (price: number) => { // Added : number
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price.toLocaleString("en-IN")}`;
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) => {
 const icons: Record<string, React.ReactNode> = {
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
    car: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14l4 4v4a2 2 0 01-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 9l2-4h8l2 4"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>,
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    youtube: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 001.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 001.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  };
  return <span className={className}>{icons[name] || null}</span>;
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Modal = ({ isOpen, onClose, title, children }: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "white", borderRadius: 16, padding: 32, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1A1A1A" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#6B7280" }}><Icon name="x" size={22} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Select = ({ label, options, value, onChange, required = false }: {
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}{required && <span style={{ color: "#C0392B" }}> *</span>}</label>}
    <select value={value} onChange={onChange} required={required}
      style={{ width: "100%", padding: "11px 14px", border: "2px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", background: "white", cursor: "pointer", boxSizing: "border-box" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// ─── CAR CARD ─────────────────────────────────────────────────────────────────
const CarCard = ({ car, onViewDetails, onWhatsApp }: { 
  car: Car; 
  onViewDetails: (car: Car) => void; 
  onWhatsApp: (car: Car) => void 
}) => (
  <div onClick={() => onViewDetails(car)} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.07)", transition: "all 0.4s ease-out", cursor: "pointer", position: "relative", border: "1px solid #f0f0f0", fontFamily: "'Avenir Next', 'Inter', sans-serif", width: "100%", display: "flex", flexDirection: "column", height: "100%" }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.15)"; e.currentTarget.style.transform = "translateY(-10px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
   <div onClick={() => onViewDetails(car)} style={{ position: "relative", height: 360, overflow: "hidden", flexShrink: 0, cursor: "pointer" }}>
      <img src={car.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
      {car.is_sold && (
  <div style={{ position: "absolute", bottom: 16, left: 16 }}>
    <span style={{ fontFamily: "'Raleway', sans-serif",background: "#C0392B", color: "white", padding: "6px 14px", borderRadius: 6, fontWeight: 700, fontSize: 16, letterSpacing: "1.5px", textTransform: "uppercase" }}>Sold</span>
  </div>
)}
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", background: "black", color: "white", padding: "8px 16px", borderRadius: 6, fontSize: 14, fontWeight: 500 }}>Reg Year: {car.year}</span>
      </div>
    </div>
    <div style={{ padding: "20px 30px 30px", display: "flex", flexDirection: "column", flex: 1 }}>
  <h3 style={{ fontSize: "clamp(16px, 4vw, 28px)", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px", lineHeight: 1.2, textAlign: "center", wordBreak: "break-word", whiteSpace: "normal" }}>{car.brand} {car.model}</h3>
<div style={{ fontSize: "26px", fontWeight: 700, color: "#1A1A1A", marginBottom: "25px", textAlign: "center" }}>₹ {car.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", paddingBottom: "25px", borderBottom: "1px solid #eee", marginBottom: "25px" }}>
    <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 700, marginBottom: "4px", textTransform: "uppercase" }}>KM</div><div style={{ fontWeight: 700, fontSize: "14px", color: "#1A1A1A" }}>{car.km_driven.toLocaleString("en-IN")}</div></div>
    <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 700, marginBottom: "4px", textTransform: "uppercase" }}>Fuel</div><div style={{ fontWeight: 700, fontSize: "14px", color: "#1A1A1A" }}>{car.fuel_type}</div></div>
    <div style={{ textAlign: "center" }}><div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 700, marginBottom: "4px", textTransform: "uppercase" }}>Owner</div><div style={{ fontWeight: 700, fontSize: "14px", color: "#1A1A1A" }}>{car.owners}</div></div>
  </div>
      <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
        <button onClick={() => onViewDetails(car)} style={{ flex: 1, padding: "16px 0", background: "#000", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: "14px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px" }}>View Details</button>
       <a 
  href={`https://wa.me/919838122998?text=${encodeURIComponent(`Hi SSK CARS, I'm interested in the ${car.year} ${car.brand} ${car.model}.`)}`}
  target="_blank" 
  rel="noopener noreferrer"
  onClick={(e) => { 
    // This stops the parent card's "View Details" from triggering
    e.stopPropagation(); 
  }} 
  style={{ 
    width: "60px", 
    height: "55px", 
    background: "#25D366", 
    color: "white", 
    border: "none", 
    borderRadius: 10, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    cursor: "pointer",
    textDecoration: "none" // Ensures no underline
  }}
>
  <Icon name="whatsapp" size={24} />
</a>
      </div>
    </div>
  </div>
);

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = ({ currentPage, setPage, scrolled }: { 
  currentPage: string; 
  setPage: (p: string) => void; 
  scrolled: boolean 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callModal, setCallModal] = useState(false);
  // Admin removed from navLinks — access only via /admin URL
  const navLinks = ["Home", "Inventory", "Sell Your Car", "Gallery", "About Us", "Contact"];

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  const handleNav = (link: string) => {
  if (link === "Sell Your Car") {
    setPage("home");
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById("sell-your-car-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return;
  }
  setPage(link.toLowerCase().replace(/ /g, "-"));
  setMobileMenuOpen(false);
  window.scrollTo(0, 0);
};

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none", transition: "all 0.3s" }}>
        <div className="header-desktop-row" style={{ background: "#000000", padding: "0 60px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "110px" }}>
          <div style={{ display: "flex", gap: "28px", flex: 1 }}>
            {[{ name: "facebook", url: "https://www.facebook.com/share/1XJZUX3pwo/" }, { name: "instagram", url: "https://www.instagram.com/ssk_cars_lko" }, { name: "youtube", url: "https://youtube.com/@sskcars-001?si=dMhZMibQQSH__EPI" }].map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" style={{ color: "white", opacity: 0.9, transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#C0392B"} onMouseLeave={e => e.currentTarget.style.color = "white"}><Icon name={social.name} size={26} /></a>
            ))}
          </div>
          <div onClick={() => setPage("home")} style={{ cursor: "pointer", textAlign: "center" }}>
            <img src="/logo26.png" alt="SSK CARS" style={{ height: "95px", width: "auto", display: "block", margin: "0 auto" }} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setCallModal(true)} style={{ background: "#00C853", color: "white", border: "none", padding: "14px 36px", borderRadius: "6px", fontWeight: 900, fontSize: "14px", letterSpacing: "2px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textTransform: "uppercase", marginRight: "40px" }} className="premium-call-btn">
              <Icon name="phone" size={18} /> Call Us Now
            </button>
          </div>
        </div>
       <nav className="header-desktop-row" style={{ background: "#000000", display: "flex", justifyContent: "center", alignItems: "center", height: "60px", borderTop: "0.5px solid black" }}>
          <div style={{ display: "flex", gap: "56px" }}>
            {navLinks.map(link => {
              const pageId = link.toLowerCase().replace(/ /g, "-");
              return (
                <button key={link} onClick={() => handleNav(link)} style={{ background: "none", border: "none", color: currentPage === pageId ? "#C0392B" : "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "2px", transition: "0.3s", position: "relative" }} className="nav-link-hover">{link}</button>
              );
            })}
          </div>
        </nav>
        <div className="header-mobile-row" style={{ background: "#000000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "75px", position: "relative", zIndex: 1001 }}>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center" }}><Icon name={mobileMenuOpen ? "x" : "menu"} size={30} /></button>
          <div onClick={() => { setPage("home"); setMobileMenuOpen(false); window.scrollTo(0, 0); }} style={{ cursor: "pointer", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <img src="/logo26.png" alt="SSK CARS" style={{ height: "50px", width: "auto", display: "block" }} />
          </div>
         <button onClick={() => setCallModal(true)} style={{ background: "#00C853", color: "white", border: "none", borderRadius: "8px", padding: "10px 14px", fontWeight: 900, fontSize: "11px", letterSpacing: "1px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase" }} className="mobile-call-btn">
  <Icon name="phone" size={14} className="mobile-call-icon" />
  <span className="mobile-call-text">Call</span>
</button>
        </div>
        {mobileMenuOpen && (
          <div style={{ position: "fixed", top: "75px", left: 0, right: 0, height: "calc(100vh - 75px)", background: "#000000", zIndex: 1000, display: "flex", flexDirection: "column", paddingTop: "20px", overflowY: "auto", animation: "fadeIn 0.2s ease-in-out" }}>
            {navLinks.map(link => {
              const pageId = link.toLowerCase().replace(/ /g, "-");
              return (
                <button key={link} onClick={() => handleNav(link)} style={{ background: "transparent", border: "none", borderBottom: "1px solid #1a1a1a", color: currentPage === pageId ? "#C0392B" : "white", fontWeight: 600, fontSize: "22px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.15em", padding: "25px 30px", textAlign: "left", width: "100%", fontFamily: "'Montserrat', sans-serif" }}>{link}</button>
              );
            })}
            <div style={{ display: "flex", gap: "30px", padding: "40px 30px" }}>
              {[{ name: "facebook", url: "https://www.facebook.com/share/1XJZUX3pwo/" }, { name: "instagram", url: "https://www.instagram.com/ssk_cars_lko" }, { name: "youtube", url: "https://youtube.com/@sskcars-001?si=dMhZMibQQSH__EPI" }].map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)" }}><Icon name={social.name} size={28} /></a>
              ))}
            </div>
          </div>
        )}
      </header>
      <Modal isOpen={callModal} onClose={() => setCallModal(false)} title="Contact SSK CARS">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {siteConfig.phones.map((p: { label: string; number: string }) => (
            <a key={p.number} href={`tel:${p.number}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "#F9F9F9", borderRadius: 12, textDecoration: "none", border: "2px solid #E5E7EB" }}>
              <div style={{ width: 44, height: 44, background: "#C0392B", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><Icon name="phone" size={20} /></div>
              <div><div style={{ fontSize: 16, color: "#202122", fontWeight: 500 }}>{p.label}</div><div style={{ fontSize: 18, fontWeight: 800, color: "#1A1A1A" }}>{p.number}</div></div>
            </a>
          ))}
        </div>
      </Modal>
    </>
  );
};

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
const HeroCarousel = ({ onInventory }: { onInventory: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [callModal, setCallModal] = useState(false);
  const slides = [
    { url: "/HERO1.png", title: "Premium Cars" },
    { url: "/HERO2.png", title: "Certified Quality" },
    { url: "/HERO3.png", title: "Luxury Redefined" },
  ];
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <>
      <div className="hero-full-height" style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden" }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity 1s", opacity: i === current ? 1 : 0 }}>
            <img src={s.url} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
          </div>
        ))}
        <div className="hero-content-area" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between",padding: "max(180px, 22vh) 8% 50px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: 800, width: "100%", textAlign: "center", margin: "0 auto" }}>
            <div style={{ color: "#D4AF37", fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>✦ Welcome to SSK CARS</div>
            <h1 style={{ color: "white", fontSize: "clamp(32px, 7vw, 80px)", fontWeight: 500, lineHeight: 1.1, margin: 0, fontFamily: "'Raleway', sans-serif", textShadow: "0 2px 30px rgba(0,0,0,0.5)", textTransform: "uppercase" }}>{slides[current].title}</h1>
          </div>
          <div className="hero-btns" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", width: "100%", marginBottom: "40px" }}>
            <button onClick={() => setCallModal(true)} style={{ padding: "18px 36px", background: "#C0392B", color: "white", border: "none", borderRadius: 12, fontWeight: 900, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit", boxShadow: "0 10px 40px rgba(192,57,43,0.4)" }}><Icon name="phone" size={20} /> Call Us Now</button>
            <button onClick={onInventory} style={{ padding: "18px 36px", background: "rgba(255,255,255,0.1)", color: "white", border: "2px solid white", borderRadius: 12, fontWeight: 900, fontSize: 18, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(12px)" }}>View Inventory →</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
          {slides.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? "#D4AF37" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />))}
        </div>
      </div>
      <Modal isOpen={callModal} onClose={() => setCallModal(false)} title="Contact SSK CARS">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {siteConfig.phones.map((p: { label: string; number: string }) => (
            <a key={p.number} href={`tel:${p.number}`} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "#F9F9F9", borderRadius: 12, textDecoration: "none", border: "2px solid #E5E7EB" }}>
              <div style={{ width: 44, height: 44, background: "#C0392B", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><Icon name="phone" size={20} /></div>
              <div><div style={{ fontSize: 16, color: "#202021", fontWeight: 500 }}>{p.label}</div><div style={{ fontSize: 18, fontWeight: 800, color: "#1A1A1A" }}>{p.number}</div></div>
            </a>
          ))}
        </div>
      </Modal>
    </>
  );
};
//emi
const EMICalculator = () => {
  const [isClient, setIsClient] = useState(false);
  const [price, setPrice] = useState(1000000);
  const [downAmount, setDownAmount] = useState(200000);
  const [tenure, setTenure] = useState(60);
  const [rate, setRate] = useState(9.5);

  useEffect(() => { setIsClient(true); }, []);

 const toIndianStr = (num: number) => { 
  if (!num || isNaN(num)) return ""; 
  return Math.round(num).toLocaleString("en-IN"); 
};

  const toNum = (str: string) => { 
  const clean = str.replace(/[^0-9.]/g, ""); 
  return clean === "" ? 0 : Number(clean); 
};
  const loanAmount = Math.max(0, price - downAmount);
  const monthlyRate = rate / 12 / 100;
  const emi = loanAmount > 0 && rate > 0 ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1) : 0;
  const totalPayment = emi * tenure;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const interestPct = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;
  const principalPct = 100 - interestPct;

  if (!isClient) {
    return (
      <section style={{ padding: "40px 12px 100px", background: "#0a0a0a", minHeight: "600px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ color: "#D4AF37", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Finance Your Purchase</div>
            <h2 style={{ color: "white", fontSize: "clamp(30px,4vw,48px)", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>EMI CALCULATOR</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: "40px 12px 100px", background: "#0a0a0a", overflowX: "hidden" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ color: "#D4AF37", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Finance Your Purchase</div>
          <h2 style={{ color: "white", fontSize: "clamp(30px,4vw,48px)", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>EMI CALCULATOR</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px", alignItems: "stretch" }} className="emi-main-grid">
          <div style={{ background: "#151515", padding: "clamp(16px, 4vw, 40px)", borderRadius: "28px", border: "1px solid #222", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div><label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 10 }}>CAR PRICE (₹)</label><input type="text" autoComplete="off" value={toIndianStr(price)} onChange={e => setPrice(toNum(e.target.value))} style={{ width: "100%", background: "#1f1f1f", border: "2px solid #333", padding: "20px", borderRadius: "12px", color: "white", fontSize: "22px", fontWeight: "700", outline: "none" }} /></div>
              <div><label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 10 }}>DOWN PAYMENT (₹)</label><input type="text" autoComplete="off" value={toIndianStr(downAmount)} onChange={e => setDownAmount(toNum(e.target.value))} style={{ width: "100%", background: "#1f1f1f", border: "2px solid #333", padding: "20px", borderRadius: "12px", color: "white", fontSize: "22px", fontWeight: "700", outline: "none" }} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div><label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, marginBottom: 10 }}>TENURE (MO)</label><input type="number" autoComplete="off" value={tenure || ""} onChange={e => setTenure(toNum(e.target.value))} style={{ width: "100%", background: "#1f1f1f", border: "2px solid #333", padding: "18px", borderRadius: "12px", color: "white", fontSize: "20px", fontWeight: "700", outline: "none" }} /></div>
                <div><label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600, marginBottom: 10 }}>INTEREST (%)</label><input type="number" autoComplete="off" step="0.1" value={rate || ""} onChange={e => setRate(toNum(e.target.value))} style={{ width: "100%", background: "#1f1f1f", border: "2px solid #333", padding: "18px", borderRadius: "12px", color: "white", fontSize: "20px", fontWeight: "700", outline: "none" }} /></div>
              </div>
            </div>
            <div style={{ marginTop: "25px", padding: "18px", background: "rgba(212,175,55,0.08)", borderRadius: "12px", border: "1px dashed #D4AF3766", color: "#D4AF37", textAlign: "center", fontWeight: "700", fontSize: "18px" }}>Loan Amount: ₹{toIndianStr(loanAmount)}</div>
          </div>
          <div style={{ background: "linear-gradient(145deg, #1a1a1a, #0d0d0d)", borderRadius: "28px", padding: "clamp(16px, 4vw, 40px)", border: "1px solid #222", display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
            <div style={{ textAlign: "center", marginBottom: "35px" }}><div style={{ color: "#9CA3AF", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Monthly EMI</div><div style={{ color: "#27AE60", fontSize: "48px", fontWeight: "900" }}>₹{toIndianStr(emi)}</div></div>
            {[{ label: "Principal Amount", val: loanAmount }, { label: "Total Interest", val: totalInterest }, { label: "Total Payable", val: totalPayment }].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid #222" }}><span style={{ color: "#9CA3AF", fontSize: 15 }}>{item.label}</span><span style={{ color: "white", fontWeight: 700, fontSize: "17px" }}>₹{toIndianStr(item.val)}</span></div>
            ))}
          </div>
          <div style={{ background: "#121212", padding: "clamp(16px, 4vw, 40px)", borderRadius: "28px", border: "1px solid #222", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "250px", height: "250px", borderRadius: "50%", marginBottom: "35px", background: `conic-gradient(#27AE60 ${interestPct}%, #D1D5DB ${interestPct}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(0,0,0,0.6)" }}>
              <div style={{ width: "180px", height: "180px", background: "#0a0a0a", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontSize: "15px", fontWeight: "900", letterSpacing: "0.1em" }}>TOTAL</span><span style={{ color: "white", fontSize: "11px", opacity: 0.5 }}>BREAKDOWN</span></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", background: "#1a1a1a", borderRadius: "10px", border: "1px solid #222" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#D1D5DB" }}><div style={{ width: 14, height: 14, background: "#D1D5DB", borderRadius: "4px" }} /> Principal</div><span style={{ color: "white", fontWeight: "700" }}>{principalPct.toFixed(1)}%</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", background: "#1a1a1a", borderRadius: "10px", border: "1px solid #222" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#D1D5DB" }}><div style={{ width: 14, height: 14, background: "#27AE60", borderRadius: "4px" }} /> Interest</div><span style={{ color: "white", fontWeight: "700" }}>{interestPct.toFixed(1)}%</span></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:1250px){.emi-main-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:768px){.emi-main-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
};

// ─── REVEAL ON SCROLL ─────────────────────────────────────────────────────────
const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(60px)", transition: "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)", willChange: "opacity, transform" }}>{children}</div>;
};
const SellYourCarSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async () => {
  if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
if (!formData.phone.trim() || formData.phone.trim().length < 8) { setFormError("Please enter a valid phone number."); return; }
  setSubmitting(true);
  setFormError("");
  const { error } = await supabase.from("call_back_requests").insert([{
     name: formData.name.trim() || "Quick Request",  // use entered name
    phone: formData.phone.trim(),
  }]);
    setSubmitting(false);
    if (error) { setFormError("Something went wrong. Please try again or call us directly."); return; }
    setSubmitted(true);
    setFormData({ name: "", phone: "" });
    setTimeout(() => { setSubmitted(false); setFormOpen(false); }, 3500);
  };

  return (
    <section id="sell-your-car-section" style={{
      background: "#000",
backgroundImage: 'url("/K2.png")',
backgroundSize: "cover",
backgroundPosition: "center",
backgroundAttachment: "scroll",
      padding: "100px 24px",
      position: "relative",
      overflow: "hidden",
WebkitTransform: "translateZ(0)" as any,
transform: "translateZ(0)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100svh",
 
    }}>
      {/* Background glow */}
      <div style={{
  position: "absolute", inset: 0,
  background: "rgba(0,0,0,0.65)",
  pointerEvents: "none",
}} />

      {/* Top label */}
      <div style={{
        color: "#D4AF37", fontSize: 14, fontWeight: 600,
        letterSpacing: "0.3em", textTransform: "uppercase",
        marginBottom: 28, fontFamily: "'Montserrat', sans-serif",
        position: "relative", zIndex: 2,
      }}>
        ✦ Sell smart at  best value without delay
      </div>

      {/* Main heading */}
      <div style={{ textAlign: "center", marginBottom: 20, position: "relative", zIndex: 2 }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px, 5vw, 60px)", color: "white",
          textTransform: "uppercase", letterSpacing: "0.06em",
          lineHeight: 1.15, margin: 0,
        }}>
          SELL YOUR CAR IN JUST
        </h2>

        {/* ── THE BREATHING SHINING 29 ── */}
        <div style={{ position: "relative", display: "inline-block", margin: "4px 0" }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
            fontSize: "clamp(110px, 24vw, 260px)",
            letterSpacing: "-0.03em", lineHeight: 0.88,
            display: "inline-block",
           
color: "#D4AF37",
           animation: "breathe29 2.6s ease-in-out infinite",
position: "relative", zIndex: 2,
textShadow: "0 0 15px rgba(212,175,55,1), 0 0 25px rgba(212,175,55,0.7)",
          }}>
            29
          </span>
         
          
        </div>

        <h2 style={{
          fontFamily: "'Raleway', sans-serif", fontWeight: 800,
          fontSize: "clamp(28px, 5vw, 60px)", color: "white",
          textTransform: "uppercase", letterSpacing: "0.06em",
          lineHeight: 1.15, margin: 0,
        }}>
          MINUTES
        </h2>
      </div>

      {/* Subtitle */}
      <p style={{
        color: "rgba(255,255,255,0.45)", fontSize: "clamp(16px, 1.8vw, 20px)",
        fontFamily: "'Raleway', sans-serif", fontWeight: 400,
        maxWidth: 520, textAlign: "center", lineHeight: 1.75,
        marginBottom: 52, marginTop: 12,
        position: "relative", zIndex: 2,
      }}>
        No haggling. No hidden charges. Drive in, get evaluated, walk out with the best price — guaranteed.
      </p>

      {/* 3 CTA Buttons */}
      <div style={{
  display: "flex", flexDirection: "column", gap: 14,
  width: "100%", maxWidth: 340,
  marginBottom: 0, marginTop: 40,
  position: "relative", zIndex: 2,
}}>
        {/* Request Call Back */}
        <button onClick={() => setFormOpen(true)} style={{
         padding: "17px 0",
width: "100%",
justifyContent: "center", background: "white", color: "#1A1A1A",
          border: "none", borderRadius: 12, fontWeight: 920, fontSize: 16,
          cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.05em", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 10,
          transition: "all 0.25s", boxShadow: "0 8px 28px rgba(255,255,255,0.12)",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(255,255,255,0.18)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,255,255,0.12)"; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Request Call Back
        </button>

        {/* Call Now */}
        <a href={`tel:${siteConfig.phones[0].number}`} style={{
          padding: "17px 0",
width: "100%",
justifyContent: "center", background: "#C0392B", color: "white",
          border: "none", borderRadius: 12, fontWeight: 900, fontSize: 14,
          cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.05em", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none", transition: "all 0.25s",
          boxShadow: "0 8px 28px rgba(192,57,43,0.45)",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "#A93226"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#C0392B"; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          Call Now
        </a>

        {/* WhatsApp */}
        <a href={`https://wa.me/9838122998?text=Hi SSK CARS, I want to sell my car. Please call me back.`}
          target="_blank" rel="noopener noreferrer" style={{
           padding: "17px 0",
width: "100%",
justifyContent: "center", background: "#25D366", color: "white",
            border: "none", borderRadius: 12, fontWeight: 900, fontSize: 14,
            cursor: "pointer", fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.05em", textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 10,
            textDecoration: "none", transition: "all 0.25s",
            boxShadow: "0 8px 28px rgba(37,211,102,0.3)",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "#1DA851"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "#25D366"; }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      

      {/* Keyframes */}
     <style>{`
  @keyframes breathe29 {
    0%,100% { transform: scale(1); }
    50% { transform: scale(1.045); }
  }
  
`}</style>

      {/* ── CALL BACK MODAL ── */}
      {formOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
         
<div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.88)" }} onClick={() => { if (!submitting) setFormOpen(false); }} />
          <div style={{
            position: "relative", background: "white", borderRadius: 20,
            padding: "40px 36px", maxWidth: 460, width: "100%",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            animation: "sellModalIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <button onClick={() => setFormOpen(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 72, height: 72, background: "linear-gradient(135deg,#27AE60,#1e8449)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(39,174,96,0.4)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1A1A1A", marginBottom: 8, fontFamily: "'Montserrat', sans-serif" }}>Request Sent!</h3>
                <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.6 }}>Our team will call you back shortly. Thank you!</p>
              </div>
            ) : (
              <>
               
<div style={{ textAlign: "center", marginBottom: 28 }}>
  <div style={{ fontSize: 40, marginBottom: 12 }}>📞</div>
  <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1A1A1A", margin: "0 0 8px", fontFamily: "'Montserrat', sans-serif" }}>Request a Call Back</h2>
  <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>Enter your number — we'll call you.</p>
</div>

{formError && (
  <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "12px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600, marginBottom: 18, border: "1px solid #FECACA" }}>{formError}</div>
)}

<input
  type="text"
  placeholder="Your Name*"
  value={formData.name}
  onChange={e => setFormData({ ...formData, name: e.target.value })}
  style={{
    width: "100%", padding: "18px 16px",
    border: "2px solid #E5E7EB", borderRadius: 12,
    fontSize: 18, fontFamily: "inherit", outline: "none",
    boxSizing: "border-box", marginBottom: 14,
    transition: "border 0.2s", color: "#1A1A1A",
    textAlign: "center", letterSpacing: "0.05em",
    display: "block",
  }}
  onFocus={e => e.target.style.borderColor = "#1A1A1A"}
  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
/>
<input
  type="tel"
  placeholder="Your Phone Number*"
  value={formData.phone}
  onChange={e => setFormData({ ...formData, phone: e.target.value })}
  style={{
    width: "100%", padding: "18px 16px",
    border: "2px solid #E5E7EB", borderRadius: 12,
    fontSize: 18, fontFamily: "inherit", outline: "none",
    boxSizing: "border-box", marginBottom: 20,
    transition: "border 0.2s", color: "#1A1A1A",
    textAlign: "center", letterSpacing: "0.05em",
    display: "block",
  }}
  onFocus={e => e.target.style.borderColor = "#1A1A1A"}
  onBlur={e => e.target.style.borderColor = "#E5E7EB"}
/>

<button
  onClick={handleSubmit}
  disabled={submitting}
  style={{
    width: "100%", padding: "18px",
    background: submitting ? "#E5E7EB" : "#1A1A1A",
    color: submitting ? "#9CA3AF" : "white",
    border: "none", borderRadius: 12, fontWeight: 900, fontSize: 16,
    cursor: submitting ? "not-allowed" : "pointer",
    fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em",
    transition: "all 0.2s",
  }}
  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "#C0392B"; }}
  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = "#1A1A1A"; }}
>
  {submitting ? "Submitting..." : "Call Me Back →"}
</button>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes sellModalIn { from{opacity:0;transform:scale(0.9) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
    </section>
  );
};
// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage, setSelectedCar, cars, loading }: {
  setPage: (p: string) => void;
  setSelectedCar: (c: Car) => void;
  cars: Car[]; // This uses your interface!
  loading: boolean;
}) => {
  const featuredCars = cars.filter((c: Car) => c.is_featured);
const handleWhatsApp = (car: Car) => {
  // 1. Properly format the message with encoding
  const message = `Hi SSK CARS, I'm interested in the ${car.year} ${car.brand} ${car.model}. Please share more details.`;
  const encodedMsg = encodeURIComponent(message);
  
  // 2. Use the clean number format: 91 followed by digits (no spaces)
  const whatsappUrl = `https://wa.me/919838122998?text=${encodedMsg}`;
  
  // 3. FORCE a new tab so the browser doesn't replace the current page state
  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }
};
  return (
    <div>
      <HeroCarousel onInventory={() => setPage("inventory")} />
      <section style={{ padding: "40px 0", background: "#F9F9F9", overflow: "hidden" }}>
       <div className="featured-section-wrapper" style={{ maxWidth: "100%", margin: "0 auto", padding: "0 16px" }}>
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <div style={{ color: "#C0392B", fontSize: "14px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>Hand-Picked For You</div>
            <h2 className="featured-section-heading" style={{ fontSize: "clamp(36px,6vw,48px)", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#1A1A1A", marginBottom: 15 }}>FEATURED INVENTORY</h2>
          </div>
          {loading ? (
           <div style={{ display: "flex", gap: "30px", overflowX: "auto", padding: "20px 0 60px" }}>
  {[1,2,3].map(i => (
    <div key={i} className="featured-card-wrap" style={{ width: "88%", flex: "0 0 88%", maxWidth: "420px", background: "white", borderRadius: 18, overflow: "hidden", border: "1px solid #f0f0f0" }}>
      <div style={{ height: 300, background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
      <div style={{ padding: 30 }}>
        <div style={{ height: 24, background: "#f0f0f0", borderRadius: 6, marginBottom: 12, animation: "shimmer 1.5s infinite" }} />
        <div style={{ height: 32, background: "#f0f0f0", borderRadius: 6, marginBottom: 25, width: "60%", animation: "shimmer 1.5s infinite" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 25 }}>
          {[1,2,3].map(j => <div key={j} style={{ height: 40, background: "#f0f0f0", borderRadius: 6, animation: "shimmer 1.5s infinite" }} />)}
        </div>
        <div style={{ height: 50, background: "#f0f0f0", borderRadius: 10, animation: "shimmer 1.5s infinite" }} />
      </div>
    </div>
  ))}
</div>
          ) : featuredCars.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#9CA3AF", fontSize: 18, fontWeight: 700 }}>No featured cars yet. Check back soon!</div>
          ) : (
            <div className="hide-scrollbar" style={{ display: "flex", gap: "30px", overflowX: "auto", padding: "20px 0 60px", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", justifyContent: "flex-start" }}>
              {featuredCars.map(car => (
                <div key={car.id} className="featured-card-wrap" style={{ width: "88%", flex: "0 0 88%", maxWidth: "420px", scrollSnapAlign: "start" }}>
                  <CarCard car={car} onViewDetails={c => { setSelectedCar(c); setPage("car-detail"); }} onWhatsApp={handleWhatsApp} />
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button onClick={() => setPage("inventory")} style={{ padding: "22px 70px", background: "#1A1A1A", color: "white", border: "none", borderRadius: "15px", fontWeight: 800, fontSize: "clamp(14px, 4vw, 22px)", whiteSpace: "nowrap", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "15px", transition: "all 0.3s" }}>
              VIEW INVENTORY <Icon name="chevronRight" size={28} />
            </button>
          </div>
        </div>
      </section>
      <SellYourCarSection />
      <section style={{ padding: "30px 24px 80px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: "#C0392B", fontSize: 14, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Our Promise</div>
          <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#1A1A1A", marginBottom: 60 }}>Why Choose SSK CARS?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", justifyContent: "center" }}>
            {[{ icon: "shield", title: "WARRANTY PROTECTION", desc: "Drive with peace of mind. We provide comprehensive warranty coverage for up to 1000km on all our vehicles." }, { icon: "zap", title: "EASY BANK FINANCING", desc: "Instant loan approvals with our official tie-ups with premium banks like HDFC, ensuring the lowest interest rates." }, { icon: "tag", title: "AUTHENTIC MILEAGE", desc: "Strict 'No Speedometer Back' policy. We guarantee 100% original odometer readings with full service history." }, { icon: "clock", title: "TRANSPARENT PRICING", desc: "Zero hidden charges. The price you see is exactly what you pay—no processing fees or surprise costs." }].map(item => (
              <div key={item.title} style={{ padding: "50px 40px", background: "#F9F9F9", borderRadius: "24px", textAlign: "center", border: "2px solid transparent", transition: "all 0.4s ease", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C0392B"; e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)"; }}>
                <div style={{ width: "80px", height: "80px", background: "#C0392B", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 30px", color: "white", boxShadow: "0 10px 20px rgba(192,57,43,0.3)" }}><Icon name={item.icon} size={70} /></div>
                <h3 style={{ fontWeight: 900, fontSize: "20px", color: "#1A1A1A", marginBottom: "15px", letterSpacing: "0.02em" }}>{item.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <EMICalculator />
      <section style={{ padding: "0 0 100px", background: "white", overflow: "hidden", marginTop: "-2px", position: "relative", zIndex: 5 }}>
        <div style={{ padding: "0 6%", margin: "0 auto", textAlign: "center", paddingTop: "50px" }}>
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontFamily: "'Raleway', sans-serif", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#1A1A1A", marginBottom: 20 }}>Follow us on Instagram</h2>
            <a href="https://www.instagram.com/ssk_cars_lko?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" style={{ color: "#C0392B", display: "inline-block" }}><Icon name="instagram" size={40} /></a>
          </div>
          <div className="hide-scrollbar" style={{ display: "flex", gap: "25px", overflowX: "auto", padding: "20px 10px 60px", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", cursor: "grab", justifyContent: "flex-start" }}>
            {[{ thumb: "/chacha.png", url: "https://www.instagram.com/reel/DRXvtM9k4NA/" }, { thumb: "/chacha2.png", url: "https://www.instagram.com/reel/DXUT6paEysO/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" }, { thumb: "/slk.png", url: "https://www.instagram.com/reel/DW1fU-0k9Lv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l1.png", url: "https://www.instagram.com/reel/DXo85Zpk72K/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l4.png", url: "https://www.instagram.com/reel/DRkdXxmE3zi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l3.png", url: "https://www.instagram.com/reel/DVL45wVkzrZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l2.png", url: "https://www.instagram.com/reel/DXKQkZlE0hS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l5.png", url: "https://www.instagram.com/reel/C9SqC9wNRVo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l7.png", url: "https://www.instagram.com/reel/DA87juOy0xZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }, { thumb: "/l6.png", url: "https://www.instagram.com/reel/DX3-0UtT_Hr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }].map((reel, idx) => (
              <div key={idx} className="insta-reel-card-v2" 
     onClick={() => { window.open(reel.url, '_blank', 'noopener,noreferrer'); }} style={{ flex: "0 0 320px", width: "320px", height: "560px", position: "relative", borderRadius: "24px", overflow: "hidden", backgroundColor: "#000", scrollSnapAlign: "start", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", cursor: "pointer" }}>
                <img src={reel.thumb} alt="SSK CARS Reel Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "25px", textAlign: "left" }}>
                  <div style={{ color: "white", fontSize: "16px", fontWeight: "400", letterSpacing: "1px", opacity: 0.9 }}>@ssk_cars_lko</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── INVENTORY PAGE ───────────────────────────────────────────────────────────
const InventoryPage = ({ setPage, setSelectedCar, cars, loading }: {
  setPage: (p: string) => void;
  setSelectedCar: (c: Car | null) => void;
  cars: Car[];
  loading: boolean;
}) => {
  const [filters, setFilters] = useState({ fuel: "", bodyType: "", kmRange: "" });
  const [sort, setSort] = useState("newest");
  const [filterModal, setFilterModal] = useState(false);
  const filtered = cars.filter((c: Car) => {
    if (filters.fuel && c.fuel_type !== filters.fuel) return false;
    if (filters.bodyType && c.body_type !== filters.bodyType) return false;
    if (filters.kmRange) {
      const kms = c.km_driven;
      if (filters.kmRange === "0-80" && kms > 80000) return false;
      if (filters.kmRange === "0-120" && kms > 120000) return false;
      if (filters.kmRange === "0-160" && kms > 160000) return false;
      if (filters.kmRange === "0-200" && kms > 200000) return false;
      if (filters.kmRange === "200+" && kms <= 200000) return false;
    }
    return true;
  });
  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.year - a.year;
  });
  return (
    <div className="inventory-wrapper" style={{ paddingTop: 180, paddingBottom: 120, minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 40px" }}>
        <div className="inventory-toolbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "60px", gap: "12px", flexWrap: "nowrap" }}>
          <button onClick={() => setFilterModal(true)} style={{ padding: "14px 20px", background: "white", border: "1px solid #000", borderRadius: 6, fontWeight: 800, fontSize: "12px", letterSpacing: "1.5px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "#000", whiteSpace: "nowrap", flexShrink: 0 }}>
            <Icon name="filter" size={14} /> FILTERS {Object.values(filters).filter(Boolean).length > 0 && `(${Object.values(filters).filter(Boolean).length})`}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ fontFamily: "'Raleway', sans-serif", padding: "10px 0", border: "none", borderBottom: "3px solid black", fontWeight: 800, fontSize: "12px", outline: "none", cursor: "pointer", background: "transparent", color: "#000", whiteSpace: "nowrap", minWidth: 0, flex: 1 }}>
            <option value="newest">SORT BY: REG YEAR (NEWEST)</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
          </select>
        </div>
        <div className="bbt-giant-grid">
  {loading ? (
    <>
      {[1,2,3,4,5,6].map(i => (
        <div key={i} style={{ background: "white", borderRadius: 18, overflow: "hidden", border: "1px solid #f0f0f0" }}>
          <div style={{ height: 300, background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          <div style={{ padding: 30 }}>
            <div style={{ height: 24, background: "#f0f0f0", borderRadius: 6, marginBottom: 12, animation: "shimmer 1.5s infinite" }} />
            <div style={{ height: 32, background: "#f0f0f0", borderRadius: 6, marginBottom: 25, width: "60%", animation: "shimmer 1.5s infinite" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 25 }}>
              {[1,2,3].map(j => <div key={j} style={{ height: 40, background: "#f0f0f0", borderRadius: 6, animation: "shimmer 1.5s infinite" }} />)}
            </div>
            <div style={{ height: 50, background: "#f0f0f0", borderRadius: 10, animation: "shimmer 1.5s infinite" }} />
          </div>
        </div>
      ))}
    </>
  ) : sortedAndFiltered.length > 0 ? (
            sortedAndFiltered.map((car) => (
              <RevealOnScroll key={car.id}>
                <CarCard car={car} onViewDetails={c => { setSelectedCar(c); setPage("car-detail"); }} onWhatsApp={c => window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=Hi, Interested in ${c.brand} ${c.model}`)} />
              </RevealOnScroll>
            ))
          ) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "100px", fontSize: "20px", color: "#999", fontWeight: 700 }}>NO CARS MATCH YOUR FILTERS</div>
          )}
        </div>
      </div>
      <Modal isOpen={filterModal} onClose={() => setFilterModal(false)} title="REFINE SEARCH">
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          <Select label="BODY TYPE" value={filters.bodyType} onChange={e => setFilters({ ...filters, bodyType: e.target.value })} options={[{ label: "All Body Types", value: "" }, { label: "Sedan", value: "Sedan" }, { label: "SUV", value: "SUV" }, { label: "Hatchback", value: "Hatchback" }, { label: "Luxury", value: "Luxury" }]} />
          <Select label="FUEL TYPE" value={filters.fuel} onChange={e => setFilters({ ...filters, fuel: e.target.value })} options={[{ label: "All Fuel Types", value: "" }, { label: "Petrol", value: "Petrol" }, { label: "Diesel", value: "Diesel" }, { label: "CNG", value: "CNG" }, { label: "Electric", value: "Electric" }]} />
          <Select label="KMS DRIVEN" value={filters.kmRange} onChange={e => setFilters({ ...filters, kmRange: e.target.value })} options={[{ label: "All Kilometers", value: "" }, { label: "Under 80,000 km", value: "0-80" }, { label: "Under 120,000 km", value: "0-120" }, { label: "Under 160,000 km", value: "0-160" }, { label: "Under 200,000 km", value: "0-200" }, { label: "Above 200,000 km", value: "200+" }]} />
          <div style={{ display: "flex", gap: 15, marginTop: 15 }}>
            <button onClick={() => setFilterModal(false)} style={{ flex: 1, padding: "18px", background: "#C0392B", color: "white", border: "none", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>APPLY FILTERS</button>
            <button onClick={() => { setFilters({ fuel: "", bodyType: "", kmRange: "" }); setFilterModal(false); }} style={{ flex: 1, padding: "18px", background: "#f0f0f0", color: "#333", border: "none", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>CLEAR ALL</button>
          </div>
        </div>
      </Modal>
     <style>{`.bbt-giant-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}@media(max-width:1300px){.bbt-giant-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:768px){.bbt-giant-grid{display:flex!important;flex-direction:column!important;align-items:center!important;gap:30px!important;padding:0 4vw!important;}.bbt-giant-grid>div{width:92vw!important;max-width:420px!important;}}`}</style>
    </div>
  );
};

// ─── CAR DETAIL PAGE ──────────────────────────────────────────────────────────
const CarDetailPage = ({ car, setPage }: { 
  car: Car; 
  setPage: (p: string) => void 
}) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  if (!car) return null;
  
  const images = car.images;

  const nextImg = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    setActiveImg((prev) => (prev + 1) % images.length); 
  };

  const prevImg = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    setActiveImg((prev) => (prev - 1 + images.length) % images.length); 
  };

  const SpecIcon = ({ type }: { type: string }) => {
    const icons: Record<string, React.ReactNode> = {
      registration: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
      fuel: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M3 22V8a2 2 0 012-2h10a2 2 0 012 2v14"/><path d="M19 14V9l-3-3"/><path d="M7 22v-4h4v4"/><line x1="3" y1="22" x2="21" y2="22"/></svg>,
      km: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 8,14"/></svg>,
      transmission: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="10" y="8" width="4" height="12" rx="1"/><rect x="18" y="4" width="4" height="16" rx="1"/></svg>,
      owner: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      color: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 010 20"/><path d="M12 2v20"/></svg>,
      interior: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
      insurance: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      insuranceType: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
      rto: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
      engine: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
        <rect x="2" y="8" width="4" height="8" rx="1"/>
        <rect x="6" y="10" width="12" height="6" rx="1"/>
        <rect x="18" y="9" width="4" height="6" rx="1"/>
        <line x1="9" y1="10" x2="9" y2="6"/>
        <line x1="12" y1="10" x2="12" y2="6"/>
        <line x1="15" y1="10" x2="15" y2="6"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="6" y1="16" x2="6" y2="19"/>
        <line x1="18" y1="16" x2="18" y2="19"/>
      </svg>,
      drive: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>,
    };
    return <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>{icons[type] || null}</span>;
  };

  const specs = [
    { icon: "registration", label: "Registration", value: car.year },
    { icon: "fuel", label: "Fuel Type", value: car.fuel_type },
    { icon: "km", label: "KM Driven", value: `${car.km_driven.toLocaleString("en-IN")} km` },
    { icon: "transmission", label: "Transmission", value: car.transmission },
    { icon: "owner", label: "Owner", value: car.owners },
    { icon: "color", label: "Ext. Color", value: car.color || "—" },
    { icon: "interior", label: "Interior", value: car.interior || "—" },
    { icon: "insurance", label: "Insurance Validity", value: car.insurance_validity || "—" },
    { icon: "insuranceType", label: "Insurance Type", value: car.insurance_type || "—" },
    { icon: "rto", label: "RTO", value: car.rto || "—" },
    { icon: "engine", label: "Engine", value: car.engine || "—" },
    { icon: "drive", label: "Drive", value: car.drive || "—" },
  ];

  return (
    <div className="detail-page-wrapper" style={{ paddingTop: 180, minHeight: "100vh", background: "#fff" }}>
      <div className="detail-container" style={{ maxWidth: "1800px", margin: "0 auto", padding: "40px" }}>
        <button onClick={() => setPage("inventory")} style={{ background: "none", border: "none", color: "#C0392B", fontWeight: 800, cursor: "pointer", fontSize: "14px", marginBottom: "30px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
          <Icon name="chevronLeft" size={18} /> Back to Inventory
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "32px", alignItems: "start" }} className="detail-split-view">
          
          {/* LEFT: Image Section */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div 
              className="detail-main-img-container" 
              onClick={() => setIsZoomed(true)} 
              style={{ borderRadius: "18px", overflow: "hidden", position: "relative", height: "680px", background: "#1A1A1A", border: "1px solid #eee", cursor: "zoom-in" }}
            >
              <img src={images[activeImg]} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              <button onClick={prevImg} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "none", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}><Icon name="chevronLeft" size={24} /></button>
              <button onClick={nextImg} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "none", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}><Icon name="chevronRight" size={24} /></button>
              <div style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(0,0,0,0.6)", color: "white", fontSize: "12px", fontWeight: 700, padding: "5px 12px", borderRadius: 20, backdropFilter: "blur(4px)" }}>
                {activeImg + 1} / {images.length}
              </div>
            </div>
            <div className="detail-thumbnails-row" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginTop: "14px" }}>
              {images.slice(0, 6).map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{ height: "100px", borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: i === activeImg ? "3px solid #C0392B" : "2px solid transparent", transition: "0.2s" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: i === activeImg ? 1 : 0.65 }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Info Card */}
          <div 
            className="detail-info-card" 
            style={{ 
              background: "white", 
              borderRadius: "20px", 
              border: "1px solid #eee", 
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)", 
              display: "flex", 
              flexDirection: "column",
              overflow: "hidden",
              height: "820px",
            }}
          >
            {/* Car Name + Price — CENTERED */}
            <div style={{ padding: "24px 24px 18px", borderBottom: "1px solid #F3F4F6", textAlign: "center" }}>
             <h1 style={{ fontSize: "30px", fontWeight: 900, color: "#1A1A1A", marginBottom: "8px", lineHeight: 1.2, fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.01em" }}>
                {car.brand} {car.model}
              </h1>
              <div style={{ fontSize: "28px", color: "#C0392B", fontWeight: 900, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.02em" }}>
                ₹ {car.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Specs Grid — fills all space between header and buttons */}
            <div style={{ padding: "12px 14px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", height: "100%" }}>
                {specs.map((spec, i) => (
                  <div key={i} style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px", 
                    padding: "10px 8px", 
                    borderRadius: "12px", 
                    background: "#FAFAFA", 
                    border: "1px solid #F0F0F0",
                    textAlign: "center",
                  }}>
                    <SpecIcon type={spec.icon} />
                   <div style={{ fontSize: "11px", color: "#67696c", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'Montserrat', sans-serif" }}>{spec.label}</div>
<div style={{ fontSize: "15px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.01em" }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ padding: "14px 16px 16px", borderTop: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", flexShrink: 0 }}>
              <button 
                onClick={() => window.open(`tel:${siteConfig.phones[0].number}`)} 
                style={{ background: "#1A1A1A", color: "white", padding: "16px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: 800, fontSize: "14px", letterSpacing: "1px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Icon name="phone" size={16} /> CALL
              </button>
             <a 
  href={`https://wa.me/919838122998?text=${encodeURIComponent(`Hi SSK CARS, I'm interested in the ${car.year} ${car.brand} ${car.model} listed for ₹${car.price.toLocaleString("en-IN")}.`)}`}
  target="_blank" 
  rel="noopener noreferrer" 
  style={{ 
    background: "#25D366", 
    color: "white", 
    padding: "16px", 
    borderRadius: "12px", 
    border: "none", 
    cursor: "pointer", 
    fontWeight: 800, 
    fontSize: "14px", 
    letterSpacing: "1px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: "8px",
    textDecoration: "none", // Critical for <a> tags
    flex: 1 // Ensures it fills its half of the grid
  }}
>
  <Icon name="whatsapp" size={16} /> WHATSAPP
</a>
            </div>
          </div>
        </div>

       {/* Description + Feature Cards */}
<div style={{ marginTop: "36px", borderTop: "1px solid #eee", paddingTop: "32px" }}>
  <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "22px", fontWeight: 700, color: "#1A1A1A", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>About this Car:</h2>
  <p style={{ color: "black", lineHeight: 1.85, fontSize: "18px", marginBottom: "36px" }}>{car.description}</p>

  {[
    { title: car.feature_1_title, desc: car.feature_1_desc },
    { title: car.feature_2_title, desc: car.feature_2_desc },
    { title: car.feature_3_title, desc: car.feature_3_desc },
    { title: car.feature_4_title, desc: car.feature_4_desc },
  ].some(f => f.title) && (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "16px",
    }}>
      {[
        { title: car.feature_1_title, desc: car.feature_1_desc },
        { title: car.feature_2_title, desc: car.feature_2_desc },
        { title: car.feature_3_title, desc: car.feature_3_desc },
        { title: car.feature_4_title, desc: car.feature_4_desc },
      ].filter(f => f.title).map((feature, i) => (
        <div key={i} style={{
  background: "white",
  borderRadius: "14px",
  padding: "24px 22px",
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  border: "none",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  cursor: "default",
}}
onMouseEnter={e => {
  e.currentTarget.style.transform = "scale(1.03)";
  e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.14)";
}}
onMouseLeave={e => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
}}
>
          <div style={{
    flexShrink: 0,
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#22C55E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  }}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  </div>
  <div>
    <div style={{ fontFamily: "'Montserrat', sans-serif",color: "#1A1A1A", fontWeight: 650, fontSize: "20px", marginBottom: "5px", lineHeight: 1.3 }}>
      {feature.title}
    </div>
    {feature.desc && (
      <div style={{ color: "#39393a", fontSize: "15px", fontWeight: 500,lineHeight: 1.6 }}>
        {feature.desc}
      </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      </div>

      {isZoomed && (
        <div onClick={() => setIsZoomed(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 5000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(10px)" }}>
          <button style={{ position: "absolute", top: 30, right: 30, background: "none", border: "none", color: "white", cursor: "pointer" }}><Icon name="x" size={40} /></button>
          <img src={images[activeImg]} alt="Zoomed car" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "12px", boxShadow: "0 0 50px rgba(0,0,0,0.5)" }} />
        </div>
      )}

      <style>{`
        @media(max-width:1024px){
          .detail-split-view { grid-template-columns: 1fr !important; }
          .detail-info-card { height: auto !important; }
        }
        @media(max-width:768px){
          .detail-page-wrapper { padding-top: 100px !important; }
          .detail-container { padding: 20px !important; }
          .detail-main-img-container { height: 260px !important; }
          .detail-thumbnails-row { display: none !important; }
          .detail-info-card { height: auto !important; }
        }
      `}</style>
    </div>
  );
};
// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const AboutPage = () => {
  const playfair = "'Playfair Display', serif";
  const giantHeadingStyle: React.CSSProperties = { 
    fontFamily: "'Montserrat', sans-serif", 
    fontSize: "clamp(40px, 6vw, 72px)", 
    fontWeight: 700, 
    textTransform: "uppercase", 
    lineHeight: 1.1, 
    margin: 0, 
    letterSpacing: "-0.01em", 
    textAlign: "left" // This will now be valid
  };
 const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => { 
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = isEnter ? "translateY(-8px)" : "translateY(0)"; 
    target.style.borderColor = isEnter ? "#C0392B" : "transparent"; 
    target.style.boxShadow = isEnter ? "0 20px 40px rgba(0,0,0,0.1)" : "0 4px 24px rgba(0,0,0,0.06)"; 
  };
  return (
    <div style={{ background: "white", width: "100%", overflowX: "hidden" }}>
      <section className="about-section" style={{ width: "100%", minHeight: "100vh", backgroundImage: 'url("/HERO1.png")', backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "scroll", position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.60)" }} />
        <div className="about-hero-text" style={{ position: "relative", zIndex: 2, padding: "0 80px 80px 80px", width: "100%", boxSizing: "border-box" }}>
          <p style={{ color: "white", fontWeight: 300, fontSize: "clamp(16px, 2.2vw, 24px)", opacity: 0.9, width: "100%", textAlign: "justify", lineHeight: 1.8, margin: 0 }}>
            Since <b>1998</b>, SSK CARS has been a definitive name in the Lucknow automotive landscape, built on a foundation of integrity and a passion for premium used cars. Over the past <b>25 years</b>, we have transformed from a local specialist into a trusted pan-India provider, curated for enthusiasts who demand quality and performance. Our journey is defined by more than just high-end vehicles; it is about the lasting relationships we build and the confidence we instill in every driver who joins the <b>SSK family</b>. While our roots remain firmly planted in the City of Nawabs, our reach now extends to <b>every corner of India</b>, ensuring our hand-picked inventory and transparent service are accessible nationwide, guaranteeing <b>absolute satisfaction.</b>
          </p>
        </div>
      </section>
      <section className="about-section-pad about-story-section" style={{ padding: "100px 80px", background: "white" }}>
        <div className="about-story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <h2 style={{ ...giantHeadingStyle, color: "#1A1A1A", marginBottom: "30px" }}>OUR <span style={{ color: "#C0392B" }}>STORY</span></h2>
            <p style={{ color: "#6B7280", fontSize: "18px", lineHeight: "1.5", textAlign: "justify" }}>SSK CARS was built on a simple idea — buying a car should feel just as exciting and trustworthy as driving one. Based in Lucknow, we specialize in premium pre-owned vehicles that combine quality, performance, and value. Every car in our collection is carefully selected and inspected, ensuring our customers drive away with complete confidence.</p>
            <div style={{ marginTop: "40px", display: "flex", gap: "30px", flexWrap: "wrap" }}>
              {[{ num: "25000+", label: "Cars Sold" }, { num: "25+", label: "Years Exp" }, { num: "2", label: "Showrooms" }].map(stat => (
                <div key={stat.label}><span style={{ fontFamily: "'Montserrat', sans-serif", color: "#C0392B", fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 600, display: "block" }}>{stat.num}</span><span style={{ color: "#9CA3AF", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</span></div>
              ))}
            </div>
          </div>
          <div className="about-img-container"><img src="/SSK2.png" alt="Our Story" style={{ width: "100%", height: "auto", minHeight: "300px", objectFit: "cover", borderRadius: "24px", boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }} /></div>
        </div>
      </section>
      <section className="about-section-pad about-showrooms-section" style={{ background: "#000", padding: "100px 80px" }}>
        <h2 style={{ ...giantHeadingStyle, color: "white", marginBottom: "50px" }}>OUR <span style={{ color: "#C0392B" }}>SHOWROOMS</span></h2>
        <div className="about-showrooms-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {[{ title: "Gomti Nagar Showroom", addr: "CP-5, Faizabad Rd, near Chandan Hospital, Vijayant Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010", badge: "MAIN SHOWROOM", badgeColor: "#C0392B" }, { title: "Lalbagh Branch", addr: "5, J.C.Bose Marg, opp. LDA office, Lalbagh, Lucknow, Uttar Pradesh 226001", badge: "BRANCH OFFICE", badgeColor: "#D4AF37" }].map((item, idx) => (
            <div key={idx} style={{ background: "white", borderRadius: "24px", overflow: "hidden", border: "2px solid transparent", transition: "all 0.3s" }} onMouseEnter={(e) => handleCardHover(e, true)} onMouseLeave={(e) => handleCardHover(e, false)}>
              <div style={{ position: "relative", height: "240px" }}><img src="/SSK2.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /><div style={{ position: "absolute", top: 0, left: 0, background: item.badgeColor, color: item.badgeColor === "#D4AF37" ? "#000" : "#fff", padding: "8px 16px", fontSize: "12px", fontWeight: 800 }}>{item.badge}</div></div>
              <div style={{ padding: "30px" }}><h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1A1A1A", margin: 0 }}>{item.title}</h3><p style={{ color: "#6B7280", fontSize: "14px", marginTop: "10px" }}>{item.addr}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section-pad about-celeb-section" style={{ background: "white", padding: "80px 80px" }}>
        <div className="about-celeb-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "60px", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ ...giantHeadingStyle, color: "#1A1A1A", marginBottom: "30px" }}>EXCLUSIVE <span style={{ color: "#C0392B" }}>SERVICE</span></h2>
            <div style={{ borderLeft: "4px solid #C0392B", paddingLeft: "20px", marginBottom: "30px" }}><p style={{ color: "#6B7280", fontSize: "18px", lineHeight: "1.4", textAlign: "justify" }}>When celebrities and public figures visit for promotions, SSK CARS ensures they travel in comfort and style. We provide a curated selection of premium vehicles that reflect both luxury and reliability, making every journey seamless.</p></div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>{["🎬 Celebrity Clients", "🏆 VIP Fleet"].map(pill => (<span key={pill} style={{ background: "rgba(192,57,43,0.1)", color: "#C0392B", padding: "10px 20px", borderRadius: "50px", fontSize: "16px", fontWeight: 700 }}>{pill}</span>))}</div>
          </div>
          <div style={{ height: "540px", borderRadius: "24px", overflow: "hidden" }}><img src="/celeb.jpg" alt="VIP Fleet" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} /></div>
        </div>
      </section>
      <section className="about-section-pad" style={{ background: "#000", padding: "100px 80px" }}>
        <h2 style={{ ...giantHeadingStyle, color: "white", marginBottom: "40px" }}>OUR <span style={{ color: "#C0392B" }}>AIM</span></h2>
        <div className="about-aim-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px", lineHeight: "1.4", fontWeight: 300, margin: 0, textAlign: "justify" }}>At SSK CARS, our aim is to redefine the experience of buying and selling pre-owned vehicles by setting new standards of trust, quality, and sophistication with budget friendly prices. We strive to offer a carefully curated selection of premium cars that deliver both performance and value, while ensuring complete transparency at every step.</p>
          <div style={{ borderLeft: "4px solid #C0392B", paddingLeft: "30px" }}><p style={{ fontFamily: playfair, fontSize: "22px", color: "white", fontStyle: "italic", opacity: 0.8, margin: 0 }}>"JUST DON'T DREAM IT OWN IT"</p></div>
        </div>
      </section>
      <style>{`.about-section{min-height:125vh!important;min-height:125svh!important}
@media(max-width:768px){.about-section{min-height:100svh!important;min-height:100vh!important}}@media(max-width:1024px){.about-section-pad{padding:60px 20px!important}.about-hero-text{padding-left:30px!important;padding-right:30px!important}.about-story-grid,.about-showrooms-grid,.about-celeb-grid,.about-aim-grid{grid-template-columns:1fr!important;gap:40px!important}}@media(max-width:768px){.about-hero-text{padding:0 20px 50px 20px!important}.about-hero-text p{width:100%!important;font-size:clamp(15px,4.5vw,20px)!important;line-height:1.75!important}.about-story-grid,.about-showrooms-grid,.about-celeb-grid,.about-aim-grid{grid-template-columns:1fr!important;gap:32px!important}}`}</style>
    </div>
  );
};

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
const ContactPage = () => {
  const contactData = [{ icon: "mapPin", label: "Address", value: "Faizabad road near Chandan Hospital, Vijayant Khand,\nGomti Nagar, Lucknow, UP 226010" }, { icon: "phone", label: "Contact", value: siteConfig.phones.map(p => p.number).join("\n") }, { icon: "mail", label: "Email", value: siteConfig.email }];
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <div className="contact-section-wrapper">
        <div className="contact-main-grid">
          <div className="contact-heading-area">
            <h1 className="contact-giant-title">Get In Touch</h1>
            <div className="contact-subtitle"><span className="red-accent-line"></span><p>Lucknow's Premier Automotive Experience</p></div>
          </div>
          <div className="contact-info-grid">
            {contactData.map((item) => (
              <div key={item.label} className="contact-item">
                <div className="contact-icon-red"><Icon name={item.icon} size={28} /></div>
                <div className="contact-label">{item.label}</div>
                <div className="contact-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "600px", marginTop: "100px", filter: "grayscale(0.2)" }}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1486.0113070835177!2d81.02090155852174!3d26.873875703408103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3790cdac57f%3A0x6366b2e582960a60!2sSSK%20Cars!5e0!3m2!1sen!2sin!4v1777510934583!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" title="Location Map" />
      </div>
      <style>{`.contact-section-wrapper{padding-top:220px;padding-left:60px;padding-right:60px}.contact-heading-area{max-width:500px;display:flex;flex-direction:column;justify-content:center}.contact-main-grid{display:flex;justify-content:space-between;align-items:center;gap:clamp(80px,12vw,350px)}.contact-giant-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,6vw,66px);line-height:1;text-align:left;font-weight:400;color:#1A1A1A;margin:0;text-transform:uppercase}.contact-subtitle{margin-top:40px;display:flex;align-items:center;gap:15px}.red-accent-line{width:40px;height:3px;background:#C0392B}.contact-subtitle p{font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#9CA3AF;margin:0}.contact-info-grid{display:grid;grid-template-columns:repeat(3,3fr);gap:40px;flex-grow:1;max-width:80%;padding-top:20px}.contact-item{display:flex;flex-direction:column;gap:12px}.contact-icon-red{color:#C0392B;margin-bottom:5px}.contact-label{font-size:20px;font-weight:800;text-transform:uppercase;letter-spacing:0.2em;color:#1A1A1A}.contact-value{font-size:20px;line-height:1.7;color:#4B5563;white-space:pre-line;font-weight:600}@media(max-width:1100px){.contact-main-grid{flex-direction:column;gap:80px}.contact-info-grid{max-width:100%;width:100%}}@media(max-width:768px){.contact-section-wrapper{padding-top:140px;padding-left:24px;padding-right:24px}.contact-heading-area{align-items:center;text-align:center}.contact-giant-title{text-align:center}.contact-info-grid{grid-template-columns:1fr;gap:40px}.contact-item{align-items:center;text-align:center}}`}</style>
    </div>
  );
};
// ─── UNIVERSAL MANAGED VIDEO (play/pause, exclusive playback, auto-thumbnail) ──
const MobileVideo = ({ src, thumbnail, style, className }: {
  src: string;
  thumbnail?: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  useEffect(() => {
    if (!isMobile) setPlaying(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onExternal = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    video.addEventListener("externalpause", onExternal);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("externalpause", onExternal);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      document.querySelectorAll("video[data-mobile-managed]").forEach((v) => {
        if (v !== video) {
          (v as HTMLVideoElement).pause();
          v.dispatchEvent(new Event("externalpause"));
        }
      });
      video.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", background: "#111", ...style }} className={className}>
      <video
        ref={videoRef}
        data-mobile-managed
        autoPlay={!isMobile}        // ← plays immediately, no flash
        muted
        loop
        playsInline
        preload="auto"              // ← always preload, no thumbnail delay
        poster={isMobile ? thumbnail : undefined}  // ← poster only on mobile
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%", minHeight: "100%",
          width: "auto", height: "auto", objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Play button — mobile only */}
      <button
        onClick={handlePlay}
        className="mobile-play-btn"
        aria-label={playing ? "Pause" : "Play"}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          background: playing ? "transparent" : "rgba(0,0,0,0.2)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 10,
        }}
      >
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}>
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M2 1.5L16 10L2 18.5V1.5Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
    </div>
  );
};
// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
const GalleryPage = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#000", backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("/HERO3.png")', backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "scroll", overflowX: "hidden" }}>
      <div style={{ position: "relative", zIndex: 2, paddingTop: "110px" }}>

        {/* Hero */}
<MobileVideo
  src="/teaser.mp4"
  thumbnail="/sellpagebg.jpg"
  style={{ width: "100%", height: "100%" }}
  className="video-container"
/>

        {/* HEADING */}
        <div style={{ padding: "100px 20px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400, fontSize: "clamp(20px, 7vw, 50px)", color: "white", letterSpacing: "6px", textTransform: "uppercase" }}>Power. Style. Presence.</h2>
        </div>

        <section style={{ padding: "20px 2% 80px", background: "transparent" }}>

             <div className="bento-grid-three" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            {[
              { src: "/v1.mp4", thumbnail: "/q1.png" },
              { src: "/v2.mp4", thumbnail: "/q2.png" },
              { src: "/v3.mp4", thumbnail: "/q3.png" },
            ].map(({ src, thumbnail }) => (
              <MobileVideo
                key={src}
                src={src}
                thumbnail={thumbnail}
                style={{ height: "380px", borderRadius: "14px" }}
              />
            ))}
          </div>

          {/* ── NEW BENTO GRID (8 blocks, 4×2) — images unchanged ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "280px 280px", gap: "12px", width: "100%", maxWidth: "100%" }} className="bento-grid-top">

            <div style={{ gridColumn: "1", gridRow: "1 / 3", position: "relative", overflow: "hidden", borderRadius: "0", background: "#111" }}>
              <img src="/m1.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
            </div>

            <div onClick={() => setSelectedImg("/m2.png")} style={{ gridColumn: "2", gridRow: "1", position: "relative", overflow: "hidden", borderRadius: "0", cursor: "pointer", background: "#111" }}>
              <img src="/m2.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            <div onClick={() => setSelectedImg("/m3.png")} style={{ gridColumn: "2", gridRow: "2", position: "relative", overflow: "hidden", borderRadius: "0", cursor: "pointer", background: "#111" }}>
              <img src="/m3.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            <div onClick={() => setSelectedImg("/m4.png")} style={{ gridColumn: "3", gridRow: "1", position: "relative", overflow: "hidden", borderRadius: "0", cursor: "pointer", background: "#111" }}>
              <img src="/m4.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            <div onClick={() => setSelectedImg("/m5.png")} style={{ gridColumn: "3", gridRow: "2", position: "relative", overflow: "hidden", borderRadius: "0", cursor: "pointer", background: "#111" }}>
              <img src="/m5.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            <div style={{ gridColumn: "4", gridRow: "1 / 3", position: "relative", overflow: "hidden", borderRadius: "0", background: "#111" }}>
              <img src="/SSK5.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
            </div>

          </div>

          {/* ── OLD BENTO GRID — videos replaced with MobileVideo ── */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gridTemplateRows: "280px 280px", gap: "12px", width: "100%", maxWidth: "100%", marginTop: "12px" }} className="bento-grid-new">

            {/* SSKVID — col 1, spans 2 rows */}
            <MobileVideo src="/SSKVID.mp4" thumbnail="/q4.png"
              style={{ gridColumn: "1", gridRow: "1 / 3", borderRadius: "0 0 14px 14px" }} />

            <div onClick={() => setSelectedImg("/K1.png")} style={{ gridColumn: "2", gridRow: "1", position: "relative", overflow: "hidden", borderRadius: "0", cursor: "pointer", background: "#111" }}>
              <img src="/K1.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            <div onClick={() => setSelectedImg("/K2.png")} style={{ gridColumn: "3", gridRow: "1", position: "relative", overflow: "hidden", borderRadius: "0", cursor: "pointer", background: "#111" }}>
              <img src="/K2.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            {/* CCLASS — col 4, spans 2 rows */}
            <MobileVideo src="/CCLASS.mp4" thumbnail="/q5.png"
              style={{ gridColumn: "4", gridRow: "1 / 3", borderRadius: "0 0 14px 14px" }} />

            {/* JAG — col 2, row 2 */}
            <MobileVideo src="/JAG.mp4" thumbnail="/q6.png"
              style={{ gridColumn: "2", gridRow: "2", borderRadius: "0 0 14px 14px" }} />


            <div onClick={() => setSelectedImg("/K3.png")} style={{ gridColumn: "3", gridRow: "2", position: "relative", overflow: "hidden", borderRadius: "0 0 14px 14px", cursor: "pointer", background: "#111" }}>
              <img src="/K3.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>

            <div onClick={() => setSelectedImg("/SHOW.png")} style={{ gridColumn: "1 / 5", gridRow: "3", height: "500px", position: "relative", overflow: "hidden", borderRadius: "14px", cursor: "pointer", background: "#111" }}>
              <img src="/SHOW.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", transition: "transform 0.5s" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)" }} />
            </div>

          </div>

          <style>{`
            @media(max-width:768px){
              .bento-grid-three { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto auto !important; }
              .bento-grid-three > div:nth-child(1) { height: 160px !important; border-radius: 8px !important; }
              .bento-grid-three > div:nth-child(2) { height: 160px !important; border-radius: 8px !important; }
              .bento-grid-three > div:nth-child(3) { grid-column: 1 / 3 !important; height: 160px !important; border-radius: 8px !important; }
              .bento-grid-top { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
              .bento-grid-top > div { grid-column: span 1 !important; grid-row: span 1 !important; height: 180px !important; border-radius: 10px !important; }
              .bento-grid-new { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
              .bento-grid-new > div { grid-column: span 1 !important; grid-row: span 1 !important; height: 200px !important; border-radius: 10px !important; }
              .bento-grid-new > div:last-child { grid-column: 1 / 3 !important; height: 160px !important; }
            }
          `}</style>

        </section>
      </div>

      {selectedImg && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.98)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", backdropFilter: "blur(15px)" }} onClick={() => setSelectedImg(null)}>
          <button style={{ position: "absolute", top: "40px", right: "40px", background: "none", border: "none", color: "white", cursor: "pointer" }}><Icon name="x" size={40} /></button>
          <img src={selectedImg} alt="Zoomed car" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
      )}
    </div>
  );
};
// ─── TOAST ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }: { 
  message: string; 
  type: "success" | "error"; 
  onClose: () => void 
}) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: type === "success" ? "#1A1A1A" : "#C0392B", color: "white", padding: "16px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", whiteSpace: "nowrap", animation: "slideUp 0.3s ease" }}>
      <Icon name={type === "success" ? "check" : "x"} size={18} />{message}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  );
};

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────
const ConfirmDialog = ({ message, onConfirm, onCancel }: { 
  message: string; 
  onConfirm: () => void; 
  onCancel: () => void 
}) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} onClick={onCancel} />
    <div style={{ position: "relative", background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 400, width: "90%", textAlign: "center", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A1A", marginBottom: 12 }}>Are you sure?</h3>
      <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>{message}</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onCancel} style={{ flex: 1, padding: "13px", background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
        <button onClick={onConfirm} style={{ flex: 1, padding: "13px", background: "#C0392B", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Yes, Delete</button>
      </div>
    </div>
  </div>
);

// ─── ADMIN INPUT ──────────────────────────────────────────────────────────────
const AdminInput = ({ label, type = "text", placeholder, value, onChange, required, hint }: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
}) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}{required && <span style={{ color: "#C0392B" }}> *</span>}</label>
   <input  type={type} placeholder={placeholder} value={value} onChange={onChange} onWheel={e => (e.target as HTMLInputElement).blur()}   style={{ width: "100%", padding: "14px 16px", border: "2px solid #E5E7EB", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border 0.2s", background: "#FAFAFA", color: "#1A1A1A" }} onFocus={e => e.target.style.borderColor = "#C0392B"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
    {hint && <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 5 }}>{hint}</div>}
  </div>
);

const AdminSelect = ({ label, value, onChange, options, required }: {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
  required?: boolean;
}) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}{required && <span style={{ color: "#C0392B" }}> *</span>}</label>
   <select  value={value} onChange={onChange} style={{ width: "100%", padding: "14px 16px", border: "2px solid #E5E7EB", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: "#FAFAFA", cursor: "pointer", boxSizing: "border-box", color: "#1A1A1A" }}>
      {options.map((o: { value: string | number; label: string }) => (
       <option key={o.value} value={o.value}>{o.label}</option>
    ))}
    </select>
  </div>
);

const DescriptionTextarea = ({ value, onChange, minWords = 50 }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minWords?: number;
}) => {
  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
  const isValid = wordCount >= minWords;
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 800, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        <span>About this Car:  <span style={{ color: "#C0392B" }}>*</span></span>
        <span style={{ fontSize: 12, fontWeight: 700, color: isValid ? "#27AE60" : "#C0392B", textTransform: "none", letterSpacing: 0 }}>{wordCount} / {minWords} words minimum</span>
      </label>
      <textarea value={value} onChange={onChange} placeholder="Describe the car's condition, service history, special features... (minimum 50 words)" rows={5}
        style={{ width: "100%", padding: "14px 16px", border: `2px solid ${isValid ? "#27AE60" : "#E5E7EB"}`, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box", background: "#FAFAFA", transition: "border 0.2s", lineHeight: 1.6,color: "#1A1A1A"}}
        onFocus={e => e.target.style.borderColor = isValid ? "#27AE60" : "#C0392B"}
        onBlur={e => e.target.style.borderColor = isValid ? "#27AE60" : "#E5E7EB"} />
    </div>
  );
};

// ─── ADD CAR PAGE (with Supabase Storage upload) ──────────────────────────────
const AddCarPage = ({ onBack, onAdd, showToast }: {
  onBack: () => void;
  onAdd: (newCar: Car) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}) => {
 const [form, setForm] = useState<{
  name: string;
  price: string;
  year: number;
  fuel_type: string;
  body_type: string;
  km_driven: string;
  transmission: string;
  owners: number;
  color: string;
  interior: string;
  description: string;
  images: string[];
  insurance_validity: string;
  insurance_type: string;
  rto: string;
  engine: string;
  drive: string;
  feature_1_title: string; feature_1_desc: string;
  feature_2_title: string; feature_2_desc: string;
  feature_3_title: string; feature_3_desc: string;
  feature_4_title: string; feature_4_desc: string;
}>({
  name: "",
  price: "",
  year: new Date().getFullYear(),
  fuel_type: "Petrol",
  body_type: "Sedan",
  km_driven: "",
  transmission: "Manual",
  owners: 1,
  color: "",
  interior: "",
  description: "",
  images: [],
  insurance_validity: "",
  insurance_type: "Third Party",
  rto: "",
  engine: "",
  drive: "",
  feature_1_title: "", feature_1_desc: "",
  feature_2_title: "", feature_2_desc: "",
  feature_3_title: "", feature_3_desc: "",
  feature_4_title: "", feature_4_desc: "",
});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
 const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  setForm(f => ({ ...f, [k]: e.target.value }));
  setErrors(er => ({ ...er, [k]: "" }));
};
const setPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value.replace(/,/g, "");
  if (!isNaN(Number(raw)) || raw === "") {
    setForm(f => ({ ...f, price: raw }));
    setErrors(er => ({ ...er, price: "" }));
  }
};
const displayPrice = form.price ? Number(form.price).toLocaleString("en-IN") : "";
const setKm = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value.replace(/,/g, "");
  if (!isNaN(Number(raw)) || raw === "") {
    setForm(f => ({ ...f, km_driven: raw }));
    setErrors(er => ({ ...er, km_driven: "" }));
  }
};
const displayKm = form.km_driven ? Number(form.km_driven).toLocaleString("en-IN") : "";
  const wordCount = form.description.trim() === "" ? 0 : form.description.trim().split(/\s+/).length;

  // Upload images to Supabase Storage and return public URLs
  const uploadImages = async (files: File[]): Promise<string[]> => {
  const urls: string[] = []; // Explicitly type as string[]
  
  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error } = await supabase.storage.from('CARIMAGES').upload(fileName, file);
    
    if (error) throw error;
    
    const { data } = supabase.storage.from('CARIMAGES').getPublicUrl(fileName);
    urls.push(data.publicUrl);
  }
  
  return urls;
};

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files ? Array.from(e.target.files) : []; // Type check for files
  if (form.images.length + files.length > 20) { 
    showToast("Maximum 20 images allowed", "error"); 
    return; 
  }
    setUploading(true);
    try {
      const urls = await uploadImages(files);
      setForm(f => ({ ...f, images: [...f.images, ...urls] }));
      setErrors(er => ({ ...er, images: "" }));
    } catch (err) {
      showToast("Image upload failed. Try again.", "error");
    }
    setUploading(false);
  };

  const removeImage = async (i: number) => {
  const url = form.images[i];
  try {
    const fileName = url.split('/').pop();
    if (fileName) {
      await supabase.storage.from('CARIMAGES').remove([fileName]);
    }
  } catch (err) { /* ignore */ }
  setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
};

  const validate = () => {
  const e: Record<string, string> = {};
  if (!form.name.trim()) e.name = "Car name is required";
  if (!form.price || isNaN(Number(form.price))) e.price = "Valid price is required";
  if (!form.km_driven || isNaN(Number(form.km_driven))) e.km_driven = "KM driven is required";
  if (!form.color.trim()) e.color = "Exterior color is required";
  if (!form.interior.trim()) e.interior = "Interior description is required";
  if (wordCount < 50) e.description = `Need ${50 - wordCount} more words`;
  if (form.images.length < 6) e.images = `Minimum 6 images required (${form.images.length} uploaded)`;
  setErrors(e);
  return Object.keys(e).length === 0;
};

  const handleSubmit = async () => {
    if (!validate()) { showToast("Please fix all errors before submitting", "error"); return; }
    const nameParts = form.name.trim().split(" ");
    const newCar = {
      brand: nameParts[0],
      model: nameParts.slice(1).join(" ") || nameParts[0],
      price: Number(form.price),
      year: Number(form.year),
      fuel_type: form.fuel_type,
      body_type: form.body_type,
      km_driven: Number(form.km_driven),
      transmission: form.transmission,
      owners: Number(form.owners),
      color: form.color,
      interior: form.interior,
      description: form.description,
      images: form.images,
      is_sold: false,
      is_featured: false,
      insurance_validity: form.insurance_validity,
  insurance_type: form.insurance_type,
  rto: form.rto,
  engine: form.engine,    // ADD THIS
  drive: form.drive,      // ADD THIS
  feature_1_title: form.feature_1_title, feature_1_desc: form.feature_1_desc,
  feature_2_title: form.feature_2_title, feature_2_desc: form.feature_2_desc,
  feature_3_title: form.feature_3_title, feature_3_desc: form.feature_3_desc,
  feature_4_title: form.feature_4_title, feature_4_desc: form.feature_4_desc,
    };
    const { data, error } = await supabase.from('cars').insert([newCar]).select().single();
    if (error) { showToast("Failed to add car. Try again.", "error"); return; }
    onAdd(data);
    showToast("🎉 Car added! It's now live on the website.", "success");
    setTimeout(() => onBack(), 1500);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#C0392B", fontWeight: 800, cursor: "pointer", fontSize: 14, marginBottom: 28, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: "0.05em" }}><Icon name="chevronLeft" size={18} /> Back to Inventory</button>
      <div style={{ marginBottom: 32 }}><h1 style={{ fontSize: 32, fontWeight: 900, color: "#1A1A1A", margin: "0 0 8px" }}>Add New Car</h1><p style={{ color: "#9CA3AF", fontSize: 15 }}>Fill in all details. The car appears live immediately.</p></div>
      <div style={{ background: "white", borderRadius: 20, padding: "36px 36px 40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "2px solid #F3F4F6" }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 20, textTransform: "uppercase" }}>📋 Basic Information</h3>
          <div className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <div><AdminInput label="Car Name (Brand + Model)" placeholder="e.g. BMW M5 CS" value={form.name} onChange={set("name")} required />{errors.name && <div style={{ color: "#C0392B", fontSize: 12, marginTop: -14, marginBottom: 16, fontWeight: 600 }}>{errors.name}</div>}</div>
            <div><AdminInput label="Price (₹ in numbers)" type="text" placeholder="e.g. 8,500,000" value={displayPrice} onChange={setPrice} required hint="e.g. 8,50,000 for ₹8.5 Lakh" />{errors.price && <div style={{ color: "#C0392B", fontSize: 12, marginTop: -14, marginBottom: 16, fontWeight: 600 }}>{errors.price}</div>}</div>
          </div>
        </div>
        
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "2px solid #F3F4F6" }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 20, textTransform: "uppercase" }}>⚙️ Car Specifications</h3>
          <div className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <AdminInput label="Registration Year" type="number" placeholder="e.g. 2024" value={form.year} onChange={set("year")} required />
            <AdminSelect label="Body Type" value={form.body_type} onChange={set("body_type")} required options={[{ value: "Sedan", label: "Sedan" }, { value: "SUV", label: "SUV" }, { value: "Hatchback", label: "Hatchback" }, { value: "Luxury", label: " Coupe" }]} />
            <AdminSelect label="Fuel Type" value={form.fuel_type} onChange={set("fuel_type")} required options={["Petrol", "Diesel", "CNG", "Electric"].map(f => ({ value: f, label: f }))} />
            <div><AdminInput label="Mileage / KM Driven" type="text" placeholder="e.g. 50,000" value={displayKm} onChange={setKm} required />{errors.km_driven && <div style={{ color: "#C0392B", fontSize: 12, marginTop: -14, marginBottom: 16, fontWeight: 600 }}>{errors.km_driven}</div>}</div>
            <AdminSelect label="Transmission" value={form.transmission} onChange={set("transmission")} required options={["Manual", "Automatic"].map(f => ({ value: f, label: f }))} />
            <AdminSelect label="Number of Owners" value={form.owners} onChange={set("owners")} required options={[1, 2, 3, 4].map(n => ({ value: n, label: n === 4 ? "4+ Owners" : `${n} Owner${n > 1 ? "s" : ""}` }))} />
            <div><AdminInput label="Exterior Color" placeholder="e.g. Alpine White" value={form.color} onChange={set("color")} required />{errors.color && <div style={{ color: "#C0392B", fontSize: 12, marginTop: -14, marginBottom: 16, fontWeight: 600 }}>{errors.color}</div>}</div>
          </div>
          <div><AdminInput label="Interior" placeholder="e.g. Red Merino Leather" value={form.interior} onChange={set("interior")} required />{errors.interior && <div style={{ color: "#C0392B", fontSize: 12, marginTop: -14, marginBottom: 16, fontWeight: 600 }}>{errors.interior}</div>}</div>
          <AdminInput label="Insurance Validity" placeholder="e.g. May 2027" value={form.insurance_validity} onChange={set("insurance_validity")} />
<AdminInput label="Insurance Type" placeholder="e.g. Third Party, Comprehensive, Zero Dep" value={form.insurance_type} onChange={set("insurance_type")} />
<AdminInput label="RTO" placeholder="e.g. UP70" value={form.rto} onChange={set("rto")} />
<AdminInput label="Engine" placeholder="e.g. 2993cc" value={form.engine} onChange={set("engine")} />
<AdminInput label="Drive" placeholder="e.g. RWD, AWD, 4WD" value={form.drive} onChange={set("drive")} />
        </div>
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "2px solid #F3F4F6" }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 8, textTransform: "uppercase" }}>📝 Car Description</h3>
          <DescriptionTextarea value={form.description} onChange={set("description")} minWords={50} />
          {errors.description && <div style={{ color: "#C0392B", fontSize: 12, marginTop: -12, marginBottom: 16, fontWeight: 600 }}>{errors.description}</div>}
        </div>
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "2px solid #F3F4F6" }}>
  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 6, textTransform: "uppercase" }}>✅ Feature Highlights</h3>
  <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 20 }}>4 feature cards shown on the car detail page. Each has a bold title + short description.</p>
  {([1,2,3,4] as const).map(n => (
    <div key={n} className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
      <AdminInput
        label={`Feature ${n} — Title`}
        placeholder="e.g. 2 free services included"
        value={(form as any)[`feature_${n}_title`]}
        onChange={set(`feature_${n}_title`)}
      />
      <AdminInput
        label={`Feature ${n} — Description`}
        placeholder="e.g. Complimentary servicing for first 2 visits"
        value={(form as any)[`feature_${n}_desc`]}
        onChange={set(`feature_${n}_desc`)}
      />
    </div>
  ))}
</div>
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 8, textTransform: "uppercase" }}>📸 Car Images</h3>
          <label htmlFor="car-image-upload" style={{ border: `2px dashed ${form.images.length >= 6 ? "#27AE60" : "#E5E7EB"}`, borderRadius: 12, padding: "32px 24px", textAlign: "center", background: "#FAFAFA", marginBottom: 16, display: "block", cursor: uploading || form.images.length >= 20 ? "not-allowed" : "pointer" }}>
  <Icon name="upload" size={36} />
  <div style={{ marginTop: 12, fontWeight: 700, color: "#374151", fontSize: 15 }}>{uploading ? "Uploading..." : "Click anywhere here to upload images"}</div>
  <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>{form.images.length} / 20 uploaded (Min 6 required)</div>
  <input id="car-image-upload" type="file" accept="image/*" multiple disabled={uploading || form.images.length >= 20} onChange={handleFileChange} style={{ display: "none" }} />
</label>
          {form.images.length > 0 && (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10 }}>
    {form.images.map((img: string, i: number) => (
      <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: i === 0 ? "2px solid #C0392B" : "2px solid #E5E7EB" }}>
        <img src={img} alt="" style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />
        <button onClick={() => removeImage(i)} style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, background: "#C0392B", border: "none", borderRadius: "50%", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>✕</button>
        {i === 0
          ? <div style={{ background: "rgba(192,57,43,0.85)", color: "white", fontSize: 9, fontWeight: 800, textAlign: "center", padding: "4px 0", letterSpacing: "0.08em" }}>PRIMARY</div>
          : <button onClick={() => {
              const imgs = [...form.images];
              const [sel] = imgs.splice(i, 1);
              imgs.unshift(sel);
              setForm(f => ({ ...f, images: imgs }));
            }} style={{ width: "100%", background: "#1A1A1A", color: "white", border: "none", fontSize: 9, fontWeight: 800, padding: "4px 0", cursor: "pointer", letterSpacing: "0.08em", fontFamily: "inherit" }}>
              SET PRIMARY
            </button>
        }
      </div>
    ))}
  </div>
)}
          {errors.images && <div style={{ color: "#C0392B", fontSize: 12, fontWeight: 600, marginTop: 8 }}>{errors.images}</div>}
        </div>
        <button onClick={handleSubmit} disabled={uploading} style={{ width: "100%", padding: "20px", background: form.images.length >= 6 && wordCount >= 50 && !uploading ? "#C0392B" : "#E5E7EB", color: form.images.length >= 6 && wordCount >= 50 && !uploading ? "white" : "#9CA3AF", border: "none", borderRadius: 12, fontWeight: 900, fontSize: 17, cursor: uploading ? "not-allowed" : "pointer", fontFamily: "inherit", letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 0.2s" }}>
          {uploading ? "⏳ Uploading images..." : form.images.length < 6 ? `⚠️ Upload ${6 - form.images.length} more images` : wordCount < 50 ? `⚠️ Add ${50 - wordCount} more words` : "🚀 Add Car to Website — Go Live Now"}
        </button>
      </div>
    </div>
  );
};

// ─── CAR EDIT PAGE (with Supabase) ────────────────────────────────────────────
const CarEditPage = ({ car, onBack, onUpdate, onDelete, showToast }: {
  car: Car;
  onBack: () => void;
  onUpdate: (id: string, updatedCar: Car) => void;
  onDelete: (id: string) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}) => {
  const [form, setForm] = useState({
    name: `${car.brand} ${car.model}`, price: car.price, year: car.year, fuel_type: car.fuel_type,
    km_driven: car.km_driven, transmission: car.transmission, owners: car.owners,
    color: car.color || "", interior: car.interior || "", description: car.description || "",
    is_featured: car.is_featured, is_sold: car.is_sold, images: car.images || [],
    insurance_validity: car.insurance_validity || "",
  insurance_type: car.insurance_type || "Third Party",
  rto: car.rto || "",
  engine: car.engine || "",    // ADD THIS
  drive: car.drive || "",      // ADD THIS
  body_type: car.body_type || "Sedan", 
  feature_1_title: car.feature_1_title || "", feature_1_desc: car.feature_1_desc || "",
  feature_2_title: car.feature_2_title || "", feature_2_desc: car.feature_2_desc || "",
  feature_3_title: car.feature_3_title || "", feature_3_desc: car.feature_3_desc || "",
  feature_4_title: car.feature_4_title || "", feature_4_desc: car.feature_4_desc || "",
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [uploading, setUploading] = useState(false);
 const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  setForm(f => ({ ...f, [k]: e.target.value }));
};
  const wordCount = form.description.trim() === "" ? 0 : form.description.trim().split(/\s+/).length;

  const uploadMoreImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // Ensure files exist before attempting to create an array
  const files = e.target.files ? Array.from(e.target.files) : [];
  
  if (form.images.length + files.length > 20) { 
    showToast("Maximum 20 images allowed", "error"); 
    return; 
  }

  setUploading(true);
  try {
    const urls: string[] = []; // Explicitly type the array as string[]
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error } = await supabase.storage.from('CARIMAGES').upload(fileName, file);
      if (error) throw error;
      
      const { data } = supabase.storage.from('CARIMAGES').getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    // Updated state update logic
    setForm(f => ({ ...f, images: [...f.images, ...urls] }));
  } catch (err) { 
    showToast("Image upload failed", "error"); 
  }
  setUploading(false);
};

  const handleSave = async () => {
    if (!form.name || !form.price) { showToast("Please fill all required fields", "error"); return; }
    if (form.images.length < 1) { showToast("At least 1 image is required", "error"); return; }
    if (wordCount < 50) { showToast("Description must be at least 50 words", "error"); return; }
    const nameParts = form.name.trim().split(" ");
    const updated = {
      brand: nameParts[0], model: nameParts.slice(1).join(" "),
      price: Number(form.price), year: Number(form.year), fuel_type: form.fuel_type,
      km_driven: Number(form.km_driven), transmission: form.transmission,
      owners: Number(form.owners), color: form.color, interior: form.interior,
      description: form.description, images: form.images,
      is_featured: form.is_featured, is_sold: form.is_sold,
      insurance_validity: form.insurance_validity,
  insurance_type: form.insurance_type,
  rto: form.rto,
  engine: form.engine,    // ADD THIS
  drive: form.drive, 
    body_type: form.body_type, 
  feature_1_title: form.feature_1_title, feature_1_desc: form.feature_1_desc,
  feature_2_title: form.feature_2_title, feature_2_desc: form.feature_2_desc,
  feature_3_title: form.feature_3_title, feature_3_desc: form.feature_3_desc,
  feature_4_title: form.feature_4_title, feature_4_desc: form.feature_4_desc,
    };
    const { data, error } = await supabase.from('cars').update(updated).eq('id', car.id).select().single();
    if (error) { showToast("Failed to save. Try again.", "error"); return; }
    onUpdate(car.id, data);
    showToast("✅ Car updated successfully!", "success");
    setTimeout(() => onBack(), 1200);
  };

  const toggleFeatured = async () => {
    const newVal = !form.is_featured;
    const { data, error } = await supabase.from('cars').update({ is_featured: newVal }).eq('id', car.id).select().single();
    if (error) { showToast("Failed to update", "error"); return; }
    setForm(f => ({ ...f, is_featured: newVal }));
    onUpdate(car.id, data);
    showToast(newVal ? "⭐ Added to Featured" : "Removed from Featured", "success");
  };

  const toggleSold = async () => {
    const newVal = !form.is_sold;
    const { data, error } = await supabase.from('cars').update({ is_sold: newVal }).eq('id', car.id).select().single();
    if (error) { showToast("Failed to update", "error"); return; }
    setForm(f => ({ ...f, is_sold: newVal }));
    onUpdate(car.id, data);
    showToast(newVal ? "🔴 Marked as Sold Out" : "✅ Marked as Available", "success");
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('cars').delete().eq('id', car.id);
    if (error) { showToast("Failed to delete", "error"); return; }
    onDelete(car.id);
    showToast("🗑️ Car deleted", "success");
    onBack();
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#C0392B", fontWeight: 800, cursor: "pointer", fontSize: 14, marginBottom: 28, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", textTransform: "uppercase", letterSpacing: "0.05em" }}><Icon name="chevronLeft" size={18} /> Back to Inventory</button>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, padding: "24px 28px", background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
        {form.images[0] && <img src={form.images[0]} alt="" style={{ width: 100, height: 72, objectFit: "cover", borderRadius: 10 }} />}
        <div>
          <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Editing Car</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1A1A1A", margin: "0 0 6px" }}>{form.name}</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {form.is_featured && <span style={{ background: "#FEF9E7", color: "#D4AF37", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: "1px solid #D4AF37" }}>⭐ FEATURED</span>}
            {form.is_sold && <span style={{ background: "#FEE2E2", color: "#C0392B", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: "1px solid #C0392B" }}>🔴 SOLD OUT</span>}
            {!form.is_sold && !form.is_featured && <span style={{ background: "#E8F8F5", color: "#27AE60", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, border: "1px solid #27AE60" }}>✅ AVAILABLE</span>}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Quick Actions</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={toggleFeatured} style={{ flex: 1, padding: "18px 16px", background: form.is_featured ? "#FEF9E7" : "#D4AF37", color: form.is_featured ? "#92400E" : "#1A1A1A", border: form.is_featured ? "2px solid #D4AF37" : "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 14 }}>{form.is_featured ? "⭐ Remove from Featured" : "⭐ Mark as Featured"}</button>
          <button onClick={toggleSold} style={{ flex: 1, padding: "18px 16px", background: form.is_sold ? "#E8F8F5" : "#C0392B", color: form.is_sold ? "#27AE60" : "white", border: form.is_sold ? "2px solid #27AE60" : "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 14 }}>{form.is_sold ? "✅ Mark as Available" : "🔴 Mark as Sold Out"}</button>
          <button onClick={() => setConfirmDelete(true)} style={{ flex: 1, padding: "18px 16px", background: "#FEE2E2", color: "#C0392B", border: "2px solid #FECACA", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", fontWeight: 800, fontSize: 14 }}>🗑️ Delete Car</button>
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 20, padding: "36px 36px 40px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: "#1A1A1A", marginBottom: 28, paddingBottom: 16, borderBottom: "2px solid #F3F4F6" }}>Edit Car Details</h3>
        <div className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
          <AdminInput label="Car Name (Brand + Model)" placeholder="e.g. Hyundai Creta SX" value={form.name} onChange={set("name")} required />
          <AdminInput label="Price (₹)" type="number" placeholder="e.g. 1250000" value={form.price} onChange={set("price")} required />
          <AdminInput label="Registration Year" type="number" placeholder="e.g. 2022" value={form.year} onChange={set("year")} required />
          <AdminSelect label="Fuel Type" value={form.fuel_type} onChange={set("fuel_type")} required options={["Petrol", "Diesel", "CNG", "Electric"].map(f => ({ value: f, label: f }))} />
            <AdminSelect label="Body Type" value={form.body_type} onChange={set("body_type")} required options={[{ value: "Sedan", label: "Sedan" }, { value: "SUV", label: "SUV" }, { value: "Hatchback", label: "Hatchback" }, { value: "Luxury", label: "Coupe" }]} />
          <AdminInput label="Mileage / KM Driven" type="number" placeholder="e.g. 35000" value={form.km_driven} onChange={set("km_driven")} required />
          <AdminSelect label="Transmission" value={form.transmission} onChange={set("transmission")} required options={["Manual", "Automatic"].map(f => ({ value: f, label: f }))} />
          <AdminSelect label="Number of Owners" value={form.owners} onChange={set("owners")} required options={[1, 2, 3, 4].map(n => ({ value: n, label: n === 4 ? "4+ Owners" : `${n} Owner${n > 1 ? "s" : ""}` }))} />
          <AdminInput label="Exterior Color" placeholder="e.g. Phantom Black" value={form.color} onChange={set("color")} required />
          <AdminInput label="Insurance Validity" placeholder="e.g. May 2027" value={form.insurance_validity} onChange={set("insurance_validity")} />
<AdminInput label="Insurance Type" placeholder="e.g. Third Party, Comprehensive, Zero Dep" value={form.insurance_type} onChange={set("insurance_type")} />
<AdminInput label="RTO" placeholder="e.g. UP70" value={form.rto} onChange={set("rto")} />
        </div>
        <AdminInput label="Interior" placeholder="e.g. Beige Fabric, Black Leather" value={form.interior} onChange={set("interior")} required />
        <AdminInput label="Engine" placeholder="e.g. 2993cc" value={form.engine} onChange={set("engine")} />
<AdminInput label="Drive" placeholder="e.g. RWD, AWD, 4WD" value={form.drive} onChange={set("drive")} />
        <DescriptionTextarea value={form.description} onChange={set("description")} minWords={50} />
        <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "2px solid #F3F4F6" }}>
  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1A1A1A", marginBottom: 6, textTransform: "uppercase" }}>✅ Feature Highlights</h3>
  <p style={{ color: "#9CA3AF", fontSize: 13, marginBottom: 20 }}>4 feature cards shown on the car detail page. Each has a bold title + short description.</p>
  {([1,2,3,4] as const).map(n => (
    <div key={n} className="admin-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
      <AdminInput
        label={`Feature ${n} — Title`}
        placeholder="e.g. 2 free services included"
        value={(form as any)[`feature_${n}_title`]}
        onChange={set(`feature_${n}_title`)}
      />
      <AdminInput
        label={`Feature ${n} — Description`}
        placeholder="e.g. Complimentary servicing for first 2 visits"
        value={(form as any)[`feature_${n}_desc`]}
        onChange={set(`feature_${n}_desc`)}
      />
    </div>
  ))}
</div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#6B7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Car Images <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "none" }}>— First image is primary</span></label>
         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10, marginBottom: 12 }}>
  {form.images.map((img: string, i: number) => (
    <div key={i} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: i === 0 ? "2px solid #C0392B" : "2px solid #E5E7EB" }}>
      <img src={img} alt="" style={{ width: "100%", height: 80, objectFit: "cover", display: "block" }} />
      {form.images.length > 1 && (
        <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))} style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, background: "#C0392B", border: "none", borderRadius: "50%", color: "white", cursor: "pointer", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      )}
      {i === 0
        ? <div style={{ background: "rgba(192,57,43,0.85)", color: "white", fontSize: 8, fontWeight: 800, textAlign: "center", padding: "3px 0", letterSpacing: "0.08em" }}>PRIMARY</div>
        : <button onClick={() => {
            const imgs = [...form.images];
            const [sel] = imgs.splice(i, 1);
            imgs.unshift(sel);
            setForm(f => ({ ...f, images: imgs }));
          }} style={{ width: "100%", background: "#1A1A1A", color: "white", border: "none", fontSize: 8, fontWeight: 800, padding: "3px 0", cursor: "pointer", letterSpacing: "0.08em", fontFamily: "inherit" }}>
            SET PRIMARY
          </button>
      }
    </div>
  ))}
</div>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#F3F4F6", border: "2px dashed #D1D5DB", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#374151" }}>
            <Icon name="plus" size={16} /> {uploading ? "Uploading..." : "Add More Images"}
            <input type="file" accept="image/*" multiple disabled={uploading} style={{ display: "none" }} onChange={uploadMoreImages} />
          </label>
        </div>
        <button onClick={handleSave} style={{ width: "100%", padding: "18px", background: "#1A1A1A", color: "white", border: "none", borderRadius: 12, fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#C0392B"; }} onMouseLeave={e => { e.currentTarget.style.background = "#1A1A1A"; }}>
          Save All Changes
        </button>
      </div>
      {confirmDelete && <ConfirmDialog message="This will permanently remove this car from the website." onConfirm={handleDelete} onCancel={() => setConfirmDelete(false)} />}
    </div>
  );
};

// ─── INVENTORY LIST ───────────────────────────────────────────────────────────
const InventoryList = ({ cars, onCarClick, onAddCar }: {
  cars: Car[];
  onCarClick: (car: Car) => void;
  onAddCar: () => void;
}) => (
  <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111", letterSpacing: "-0.01em", margin: "0 0 5px" }}>Inventory</h2>
        <p style={{ color: "#aaa", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{cars.length} Cars Total</p>
      </div>
      <button onClick={onAddCar} style={{ display: "flex", alignItems: "center", gap: 8, background: "#C0392B", color: "white", border: "none", borderRadius: 10, padding: "13px 22px", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.06em", cursor: "pointer" }}>
        <Icon name="plus" size={14} /> ADD CAR
      </button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
      {[
        { label: "TOTAL", value: cars.length, color: "#111" },
        { label: "LIVE", value: cars.filter(c => !c.is_sold).length, color: "#27AE60" },
        { label: "SOLD", value: cars.filter(c => c.is_sold).length, color: "#C0392B" },
        { label: "FEATURED", value: cars.filter(c => c.is_featured).length, color: "#D4AF37" },
      ].map(s => (
        <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "20px 18px", border: "1px solid #EBEBEB" }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#aaa", letterSpacing: "0.14em", marginTop: 6 }}>{s.label}</div>
        </div>
      ))}
    </div>

    <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", overflow: "hidden" }}>
      {cars.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#aaa", fontSize: 14, fontWeight: 700 }}>No cars yet. Click ADD CAR to get started.</div>
      ) : cars.map((car, i) => (
        <div key={car.id} onClick={() => onCarClick(car)}
          style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderBottom: i < cars.length - 1 ? "1px solid #F5F5F5" : "none", cursor: "pointer", transition: "background 0.12s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
          onMouseLeave={e => e.currentTarget.style.background = "white"}>
          <div style={{ width: 68, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#F0F0F0" }}>
            {car.images?.[0]
              ? <img src={car.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="car" size={22} /></div>
            }
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#111", letterSpacing: "0.01em" }}>{car.brand} {car.model}</span>
              {car.is_sold && <span style={{ background: "#FEECEC", color: "#C0392B", fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 20 }}>SOLD</span>}
              {car.is_featured && <span style={{ background: "#FEF9EC", color: "#B8860B", fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 20 }}>★ FEATURED</span>}
            </div>
            <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500, marginTop: 4 }}>{car.year} · ₹{(car.price / 100000).toFixed(1)}L · {car.km_driven?.toLocaleString("en-IN")} km</div>
          </div>
          <div style={{ color: "#D0D0D0", flexShrink: 0 }}><Icon name="chevronRight" size={16} /></div>
        </div>
      ))}
    </div>
  </div>
);
const LeadsPanel = ({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) => {
  const [leads, setLeads] = useState<CallBackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("call_back_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("call_back_requests").delete().eq("id", id);
    if (error) { showToast("Failed to delete", "error"); return; }
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast("🗑️ Lead deleted", "success");
    setConfirmDeleteId(null);
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111", letterSpacing: "-0.01em", margin: "0 0 5px" }}>Leads</h2>
        <p style={{ color: "#aaa", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{leads.length} Call-Back Request{leads.length !== 1 ? "s" : ""}</p>
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#aaa", fontSize: 14, fontWeight: 700 }}>Loading leads...</div>
      ) : leads.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", background: "white", borderRadius: 14, border: "1px solid #EBEBEB" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
          <div style={{ color: "#aaa", fontSize: 14, fontWeight: 700 }}>No leads yet.</div>
          <div style={{ color: "#ccc", fontSize: 12, marginTop: 4, fontWeight: 500 }}>Call-back requests will appear here.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {leads.map(lead => (
            <div key={lead.id} style={{ background: "white", borderRadius: 14, padding: "18px 22px", border: "1px solid #EBEBEB", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", transition: "background 0.12s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}>

              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#C0392B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 16, flexShrink: 0, letterSpacing: "0.02em" }}>
                {lead.name.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#111", marginBottom: 5, letterSpacing: "0.01em" }}>{lead.name}</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                  <a href={`tel:${lead.phone}`} style={{ fontSize: 13, color: "#C0392B", fontWeight: 700, textDecoration: "none" }}>📞 {lead.phone}</a>
                  {lead.email && <span style={{ fontSize: 13, color: "#aaa", fontWeight: 500 }}>✉️ {lead.email}</span>}
                </div>
                {lead.message && (
                  <div style={{ marginTop: 8, fontSize: 12, color: "#777", background: "#F7F7F7", borderRadius: 8, padding: "8px 12px", borderLeft: "3px solid #E0E0E0", fontWeight: 500 }}>
                    {lead.message}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "#bbb", fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap", textTransform: "uppercase" }}>{formatDate(lead.created_at)}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href={`tel:${lead.phone}`} style={{ padding: "8px 16px", background: "#111", color: "white", borderRadius: 8, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: "0.08em" }}>CALL</a>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi ${encodeURIComponent(lead.name)}, this is SSK CARS. We received your request!`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ padding: "8px 16px", background: "#25D366", color: "white", borderRadius: 8, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: "0.08em" }}>WA</a>
                  <button onClick={() => setConfirmDeleteId(lead.id)} style={{ padding: "8px 12px", background: "#FEECEC", color: "#C0392B", border: "none", borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDeleteId && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setConfirmDeleteId(null)} />
          <div style={{ position: "relative", background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 380, width: "90%", textAlign: "center", boxShadow: "0 30px 60px rgba(0,0,0,0.3)", fontFamily: "'Montserrat', sans-serif" }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#111", marginBottom: 10, letterSpacing: "-0.01em" }}>Delete this lead?</h3>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6, marginBottom: 28, fontWeight: 500 }}>This permanently removes the call-back request from your records.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setConfirmDeleteId(null)} style={{ flex: 1, padding: "13px", background: "#F5F5F5", color: "#555", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>Cancel</button>
              <button onClick={() => deleteLead(confirmDeleteId)} style={{ flex: 1, padding: "13px", background: "#C0392B", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ cars, setCars, onLogout }: {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  onLogout: () => void;
}) => {
  // 1. Fix: Tell TypeScript this state can hold a Car object or null
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showAddCar, setShowAddCar] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 2. Add types to function parameters
  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type });
   
  const [showLeads, setShowLeads] = useState(false);
  const handleUpdate = (id: string, updatedCar: Car) => { 
    setCars(prev => prev.map(c => c.id === id ? updatedCar : c)); 
    if (selectedCar?.id === id) setSelectedCar(updatedCar); 
  };
  
  const handleDelete = (id: string) => { 
    setCars(prev => prev.filter(c => c.id !== id)); 
    setSelectedCar(null); 
  };
  
  const handleAdd = (newCar: Car) => { 
    setCars(prev => [newCar, ...prev]); 
    setShowAddCar(false); 
  };

  const mainContent = () => {
     if (showLeads) return <LeadsPanel showToast={showToast} />;  
    if (showAddCar) return <AddCarPage onBack={() => setShowAddCar(false)} onAdd={handleAdd} showToast={showToast} />;
    if (selectedCar) return <CarEditPage car={selectedCar} onBack={() => setSelectedCar(null)} onUpdate={handleUpdate} onDelete={handleDelete} showToast={showToast} />;
    return <InventoryList cars={cars} onCarClick={setSelectedCar} onAddCar={() => setShowAddCar(true)} />;
  };

  const Sidebar = () => (
    <div style={{ width: 210, background: "#111111", minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0, fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ padding: "28px 22px 22px", borderBottom: "1px solid #1E1E1E" }}>
        <div style={{ color: "white", fontWeight: 900, fontSize: 17, letterSpacing: "0.08em" }}>SSK CARS</div>
        <div style={{ color: "#C0392B", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", marginTop: 4 }}>ADMIN PANEL</div>
      </div>
      <nav style={{ padding: "18px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <button
          onClick={() => { setSelectedCar(null); setShowAddCar(false); setShowLeads(false); setMobileSidebarOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: !showLeads ? "#C0392B" : "transparent", border: "none", borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.03em", color: !showLeads ? "white" : "#666", cursor: "pointer", textAlign: "left" }}
          onMouseEnter={e => { if (showLeads) { e.currentTarget.style.background = "#1E1E1E"; e.currentTarget.style.color = "#ccc"; } }}
          onMouseLeave={e => { if (showLeads) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; } }}
        >
          <Icon name="car" size={15} /> Inventory
        </button>
        <button
          onClick={() => { setSelectedCar(null); setShowAddCar(false); setShowLeads(true); setMobileSidebarOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 14px", background: showLeads ? "#C0392B" : "transparent", border: "none", borderRadius: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.03em", color: showLeads ? "white" : "#666", cursor: "pointer", textAlign: "left" }}
          onMouseEnter={e => { if (!showLeads) { e.currentTarget.style.background = "#1E1E1E"; e.currentTarget.style.color = "#ccc"; } }}
          onMouseLeave={e => { if (!showLeads) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; } }}
        >
          <Icon name="phone" size={15} /> Leads
        </button>
      </nav>
      <div style={{ padding: "14px", borderTop: "1px solid #1E1E1E" }}>
        <button onClick={onLogout}
          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", background: "none", border: "1px solid #2A2A2A", borderRadius: 8, color: "#555", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#C0392B"; e.currentTarget.style.borderColor = "#C0392B"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#2A2A2A"; }}
        >
          <Icon name="logout" size={13} /> Logout
        </button>
      </div>
    </div>
  );

  return (
   <div style={{ display: "flex", minHeight: "100vh", background: "#F5F5F5", fontFamily: "'Montserrat', sans-serif" }}>
      <div className="admin-desktop-sidebar"><Sidebar /></div>
      {mobileSidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileSidebarOpen(false)} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}><Sidebar /></div>
        </div>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div className="admin-mobile-topbar" style={{ display: "none", padding: "16px 20px", background: "#1A1A1A", alignItems: "center", gap: 16 }}>
          <button onClick={() => setMobileSidebarOpen(true)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
            <Icon name="menu" size={24} />
          </button>
          <span style={{ color: "white", fontWeight: 900, fontSize: 18 }}>SSK CARS Admin</span>
        </div>
        <div className="admin-main-content" style={{ flex: 1, padding: "40px 44px", overflowX: "hidden" }}>{mainContent()}</div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <style>{`@media(max-width:768px){.admin-desktop-sidebar{display:none!important}.admin-mobile-topbar{display:flex!important}}@media(min-width:769px){.admin-desktop-sidebar{display:flex!important}}`}</style>
    </div>
  );
};

// ─── ADMIN LOGIN (Real Supabase Auth — no hardcoded credentials) ──────────────
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Start true to check existing session

  // Check for existing Supabase session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        onLogin();
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter both email and password"); return; }
    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("Incorrect email or password. Please try again.");
      setLoading(false);
    } else {
      onLogin();
    }
  };

 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
  if (e.key === "Enter") handleLogin(); 
};

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "white", fontSize: 18, fontWeight: 700 }}>Verifying session...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(192,57,43,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.05) 0%, transparent 40%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", background: "white", borderRadius: 24, padding: "52px 48px", maxWidth: 440, width: "100%", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 70, height: 70, background: "linear-gradient(135deg, #C0392B, #922B21)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(192,57,43,0.35)" }}><Icon name="car" size={34} /></div>
          <h1 style={{ fontWeight: 900, fontSize: 28, color: "#1A1A1A", margin: "0 0 6px", letterSpacing: "-0.02em" }}>SSK CARS</h1>
          <p style={{ color: "#9CA3AF", fontSize: 15, margin: 0 }}>Admin Dashboard — Secure Login</p>
        </div>
        {error && (<div style={{ background: "#FEE2E2", color: "#991B1B", padding: "14px 16px", borderRadius: 10, marginBottom: 24, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, border: "1px solid #FECACA" }}><Icon name="x" size={16} /> {error}</div>)}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email Address</label>
          <input  type="email" placeholder="Enter your email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} onKeyDown={handleKeyDown} style={{ width: "100%", padding: "15px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }} onFocus={e => e.target.style.borderColor = "#C0392B"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} onKeyDown={handleKeyDown} style={{ width: "100%", padding: "15px 48px 15px 16px", border: "2px solid #E5E7EB", borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }} onFocus={e => e.target.style.borderColor = "#C0392B"} onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
            <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center" }}>{showPassword ? "🙈" : "👁️"}</button>
          </div>
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "17px", background: loading ? "#E5E7EB" : "#C0392B", color: loading ? "#9CA3AF" : "white", border: "none", borderRadius: 12, fontWeight: 900, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", letterSpacing: "0.03em", transition: "all 0.2s", boxShadow: loading ? "none" : "0 4px 16px rgba(192,57,43,0.35)" }}>
          {loading ? "Verifying..." : "Login to Dashboard →"}
        </button>
      </div>
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage }: { setPage: (p: string) => void }) => (
  <footer  style={{ background: "#000000", fontFamily: "'Montserrat', sans-serif", color: "white", padding: "100px 24px 40px" }}>
    <div style={{ maxWidth: "1750px", margin: "0 auto" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "250px 1.5fr 1fr 1.2fr 1fr", gap: "40px", marginBottom: "80px", alignItems: "start" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: "0" }}><img src="/symbol.png" alt="SSK CARS" style={{ width: "210px", height: "225px", objectFit: "contain", display: "block", marginTop: "-15px" }} /></div>
        <div><div style={{ fontWeight: 700, fontSize: 30, marginBottom: 15, letterSpacing: "1px", lineHeight: 1 }}>SSK CARS</div><div style={{ color: "#C0392B", fontSize: 12, fontWeight: 700, marginBottom: 20, letterSpacing: "0.1em" }}>{siteConfig.tagline.toUpperCase()}</div><p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8 }}>Lucknow's most trusted pre-owned luxury car dealership. We provide only the highest quality inspected vehicles with transparent pricing.</p></div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: 28, textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1 }}>Quick Links</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {["Home", "Inventory", "Gallery", "About Us", "Contact"].map(l => (
              <button key={l} suppressHydrationWarning onClick={() => setPage(l.toLowerCase().replace(/ /g, "-"))} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 0, fontSize: 15, fontFamily: "inherit", textAlign: "left", transition: "0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#C0392B"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: 28, textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1 }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.6)", fontSize: 14 }}><Icon name="mapPin" size={18} /><span style={{ lineHeight: 1.5 }}>{siteConfig.address}</span></div>
            <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.6)", fontSize: 14 }}><Icon name="phone" size={18} /><span>{siteConfig.phones[0].number}</span></div>
            <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.6)", fontSize: 14 }}><Icon name="mail" size={18} /><span>{siteConfig.email}</span></div>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: 28, textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1 }}>Business Hours</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 2 }}><div style={{ color: "white", fontWeight: 700 }}>Mon – Sat:</div> 10:00 AM – 9:00 PM<br /><div style={{ color: "white", fontWeight: 700 }}>Sunday:</div> 11:00 AM – 8:00 PM</div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
        <span>© 2026 SSK CARS. Lucknow, Uttar Pradesh, India | All Rights Reserved</span>
       
      </div>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
  <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hi SSK CARS, I am looking for a car!`} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, width: 56, height: 56, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Icon name="whatsapp" size={26} />
  </a>
);

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPageRaw] = useState("home");
const setPage = (p: string) => { setPageRaw(p); window.scrollTo({ top: 0, behavior: "instant" }); };
  const [scrolled, setScrolled] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
 const [cars, setCars] = useState<Car[]>([]);       // ← Empty array, no mock data
  const [carsLoading, setCarsLoading] = useState(true);

  // ── Fetch cars from Supabase on load ──
  useEffect(() => {
    const fetchCars = async () => {
      setCarsLoading(true);
      const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
      if (!error && data) setCars(data);
      setCarsLoading(false);
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ← ADD THIS RIGHT HERE
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
      setPage("admin");
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
  // ── Handle logout with Supabase signOut ──
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setPage("home");
  };

  const isAdminPage = page === "admin" || page === "admin-dashboard";

  const renderPage = () => {
    if (page === "home") return <HomePage setPage={setPage} setSelectedCar={setSelectedCar} cars={cars} loading={carsLoading} />;
    if (page === "inventory") return <InventoryPage setPage={setPage} setSelectedCar={setSelectedCar} cars={cars} loading={carsLoading} />;
    if (page === "about-us") return <AboutPage />;
    if (page === "car-detail" && selectedCar) return <CarDetailPage car={selectedCar} setPage={setPage} />;
    if (page === "contact") return <ContactPage />;
    if (page === "gallery") return <GalleryPage />;
    if (page === "admin") {
      if (isAdmin) return <AdminDashboard cars={cars} setCars={setCars} onLogout={handleLogout} />;
      return <AdminLogin onLogin={() => { setIsAdmin(true); setPage("admin-dashboard"); }} />;
    }
    if (page === "admin-dashboard") return <AdminDashboard cars={cars} setCars={setCars} onLogout={handleLogout} />;
    return <HomePage setPage={setPage} setSelectedCar={setSelectedCar} cars={cars} loading={carsLoading} />;
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#F9F9F9", margin: 0, padding: 0, overflowX: "hidden", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; max-width: 100%; }
        body { margin: 0; }
        svg { display: inline-block; vertical-align: middle; }
        ::-webkit-scrollbar { display: none; }
        html { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        select { color: #000 !important; background-color: #fff !important; }
        option { color: #000 !important; }
        header img { filter: none !important; }

        @media (min-width: 1025px) { .insta-reel-card-v2 { width: 320px !important; height: 580px !important; } }
        @media (min-width: 769px) and (max-width: 1024px) { .insta-reel-card-v2 { width: 280px !important; height: 520px !important; } }
        .insta-reel-card-v2:hover { transform: scale(1.05); box-shadow: 0 30px 60px rgba(0,0,0,0.25); z-index: 2; }

        .nav-link-hover:after { content: ''; position: absolute; width: 0; height: 2px; display: block; margin-top: 5px; right: 0; background: #C0392B; transition: width 0.3s ease; }
        .nav-link-hover:hover:after { width: 100%; left: 0; background: #C0392B; }
        .nav-link-hover:hover { color: #C0392B !important; }
        .premium-call-btn:hover { background: #A93226 !important; transform: scale(1.05); box-shadow: 0 5px 15px rgba(192,57,43,0.4); }

        @media (max-width: 1024px) { .header-desktop-row { display: none !important; } .header-mobile-row { display: flex !important; background: #000 !important; } }
        @media (min-width: 1025px) { .header-desktop-row { display: flex !important; } .header-mobile-row { display: none !important; } }

        .gallery-container-fixed { width: 100%; max-width: 100%; overflow: hidden; padding: 60px 0; position: relative; }
        .slick-marquee-track { display: flex; gap: 30px; width: max-content; animation: infinite-scroll 40s linear infinite; }
        .slick-gallery-card-v2 { flex-shrink: 0; width: 380px; height: 520px; border-radius: 0 !important; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); background: #111; }
        .slick-gallery-card-v2 img { width: 100%; height: 100%; object-fit: cover; display: block; }
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 15px)); } }
        .slick-marquee-track:hover { animation-play-state: paused; }
        .video-container { width: 100%; aspect-ratio: 16/9; background: black; }
        .video-container iframe { width: 100%; height: 100%; display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .hero-content-area { padding-top: 95px !important; }
          .featured-section-wrapper { padding: 0 16px !important; }
          .featured-card-wrap { width: 92vw !important; flex: 0 0 92vw !important; }
          .featured-section-heading { font-size: clamp(32px,5vw,44px) !important; white-space: normal !important; }
          .hero-btns { flex-direction: column-reverse !important; gap: 16px !important; align-items: center !important; justify-content: center !important; width: 100% !important; }
          .hero-btns button { width: 90% !important; max-width: 350px; padding: 18px 24px !important; font-size: 18px !important; justify-content: center !important; }
          .insta-reel-card-v2 { height: 520px !important; flex: 0 0 70vw !important; width: 70vw !important; }
          .hide-scrollbar { padding-left: 20px !important; gap: 15px !important; }
          .inventory-wrapper { padding-top: 90px !important; padding-left: 4% !important; padding-right: 4% !important; }
          .inventory-toolbar { margin-bottom: 30px !important; flex-wrap: nowrap !important; gap: 12px !important; align-items: center !important; }
          .detail-split-view { grid-template-columns: 1fr !important; }
          .about-story-grid, .about-showrooms-grid, .about-celeb-grid, .about-aim-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-section-pad { padding: 60px 20px !important; }
          .emi-main-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center !important; }
          .footer-grid > div:first-child { display: flex !important; justify-content: center !important; align-items: center !important; }
          .footer-grid > div:first-child img { width: 100px !important; height: 110px !important; margin: 0 auto !important; display: block !important; }
          .footer-grid > div { display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .admin-main-content { padding: 20px 12px !important; }
          .admin-form-grid { grid-template-columns: 1fr !important; }
          .admin-stats-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .admin-card-header { flex-direction: column; align-items: flex-start !important; gap: 15px; }
          .slick-gallery-card-v2 { width: 220px; height: 320px; }
        }

        @media (max-width: 360px) {
          .hero-btns button { padding: 14px 20px !important; font-size: 15px !important; }
          .featured-card-wrap { width: 96vw !important; flex: 0 0 96vw !important; max-width: 96vw !important; }
          .featured-section-heading { white-space: normal !important; font-size: 28px !important; }
          .insta-reel-card-v2 { flex: 0 0 82vw !important; width: 82vw !important; height: 420px !important; }
          input[type="text"], input[type="number"], select { font-size: 16px !important; }
        }
          

        section, footer, header { max-width: 100%; overflow-x: hidden; }
        .hide-scrollbar { max-width: 100%; overflow-x: auto; }
        #root > div, .App > div { overflow-x: hidden; max-width: 100%; }
        @media (max-width: 390px) {
  .mobile-call-btn {
    border-radius: 50% !important;
    padding: 10px !important;
    width: 40px !important;
    height: 40px !important;
    justify-content: center !important;
  }
  .mobile-call-text {
    display: none !important;
  }
}
      `}</style>
      {!isAdminPage && <Header currentPage={page} setPage={setPage} scrolled={scrolled} />}
      <main>{renderPage()}</main>
      {!isAdminPage && <Footer setPage={setPage} />}
      {!isAdminPage && <WhatsAppFloat />}
    </div>
  );
}
