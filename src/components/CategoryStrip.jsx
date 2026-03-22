import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const categories = [
  { label: "Governance", to: "/episodes?tag=governance" },
  { label: "Blue Economy", to: "/episodes?tag=blue-economy" },
  { label: "Culture", to: "/episodes?tag=culture" },
  { label: "Diaspora", to: "/episodes?tag=diaspora" },
  { label: "Technology", to: "/episodes?tag=technology" },
  { label: "Community", to: "/episodes?tag=community" },
  { label: "Investment", to: "/episodes?tag=investment" },
];

export default function CategoryStrip() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 64);
      // hide strip when scrolling down fast, show when scrolling up
      setVisible(y < lastY || y < 120);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div style={{
      position: "fixed",
      top: visible ? "64px" : "40px",
      left: 0, right: 0,
      zIndex: 90,
      background: scrolled ? "rgba(21,42,47,0.97)" : "rgba(21,42,47,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(196,164,78,0.12)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-4px)",
      transition: "top 0.3s, opacity 0.3s, transform 0.3s, background 0.3s",
      height: "36px",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        padding: "0 24px",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        width: "100%",
      }}>
        {/* Left label */}
        <span style={{
          fontSize: "9px", letterSpacing: "3px", fontWeight: 600,
          color: "var(--teal, #2c8c7c)",
          whiteSpace: "nowrap", marginRight: "20px", flexShrink: 0,
        }}>TOPICS</span>

        <div style={{ width: "1px", height: "14px", background: "rgba(196,164,78,0.2)", marginRight: "20px", flexShrink: 0 }} />

        {categories.map((cat, i) => {
          const active = location.search.includes(cat.to.split("?tag=")[1]);
          return (
            <Link
              key={cat.label}
              to={cat.to}
              style={{
                textDecoration: "none",
                fontSize: "10px",
                letterSpacing: "1.5px",
                fontWeight: active ? 600 : 400,
                color: active ? "var(--gold, #c4a44e)" : "rgba(214,207,194,0.45)",
                whiteSpace: "nowrap",
                padding: "0 16px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                borderBottom: active ? "2px solid var(--gold, #c4a44e)" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "rgba(214,207,194,0.85)";
                e.currentTarget.style.borderBottomColor = "rgba(196,164,78,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = active ? "var(--gold, #c4a44e)" : "rgba(214,207,194,0.45)";
                e.currentTarget.style.borderBottomColor = active ? "var(--gold, #c4a44e)" : "transparent";
              }}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
