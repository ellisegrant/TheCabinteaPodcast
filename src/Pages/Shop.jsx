import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   ADINKRA — Sankofa (carry culture forward)
   On a merch page this means: wear the roots.
───────────────────────────────────────────── */
function Sankofa({ size = 56, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="52" cy="62" rx="22" ry="14" stroke={color} strokeWidth="2.8" fill="none"/>
      <path d="M30 62 Q18 55 14 45 Q22 50 30 56" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M30 65 Q16 65 12 58 Q20 60 30 62" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M52 48 Q58 30 70 28 Q78 26 80 34 Q82 42 74 46 Q64 50 52 48Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="76" cy="33" r="3" fill={color}/>
      <ellipse cx="50" cy="80" rx="8" ry="10" stroke={color} strokeWidth="2" fill="none"/>
      <line x1="45" y1="74" x2="42" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="55" y1="74" x2="58" y2="88" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   DESIGN COMPONENTS
───────────────────────────────────────────── */
function TextileBand() {
  const colors = [
    "#C4A44E","#2C8C7C","#B5541E","#C4A44E","#152A2F",
    "#B5541E","#2C8C7C","#C4A44E","#152A2F","#C4A44E",
    "#B5541E","#2C8C7C","#C4A44E","#152A2F","#2C8C7C",
    "#C4A44E","#B5541E",
  ];
  return (
    <div style={{ display: "flex", height: "8px", width: "100%", overflow: "hidden" }}>
      {colors.map((c, i) => <div key={i} style={{ background: c, flex: 1 }} />)}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────── */
const EARTH = "#2A1A0E";
const WARM  = "#1E2D1A";
const DEEP  = "#152A2F";
const TERRA = "#B5541E";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";

/* ─────────────────────────────────────────────
   PRODUCTS — local image paths
───────────────────────────────────────────── */
const products = [
  {
    id: 1, name: "Cabin Tea Classic Tee", price: 35, category: "Apparel",
    desc: "Heavyweight organic cotton tee with embroidered wordmark. Unisex fit.",
    img: "/images/shop/classic-tee.jpg", accent: TERRA,
  },
  {
    id: 2, name: "Ocean Ceramic Mug", price: 24, category: "Drinkware",
    desc: "Hand-finished stoneware mug in deep teal glaze. 12oz.",
    img: "/images/shop/mug.jpg", accent: TEAL,
  },
  {
    id: 3, name: "Sipping With... Cap", price: 28, category: "Apparel",
    desc: "Structured cotton cap with gold thread embroidery. Adjustable.",
    img: "/images/shop/cap.jpg", accent: GOLD,
  },
  {
    id: 4, name: "Gulf Canvas Tote", price: 22, category: "Accessories",
    desc: "Heavyweight cotton canvas tote with screen-printed wave motif.",
    img: "/images/shop/tote.jpg", accent: TERRA,
  },
  {
    id: 5, name: "Episode Blend Tea Tin", price: 18, category: "Tea",
    desc: "Organic herbal blend curated for the show. Same tea our guests sip. 50g.",
    img: "/images/shop/tea-tin.jpg", accent: GOLD,
  },
  {
    id: 6, name: "Cabin Tea Hoodie", price: 58, category: "Apparel",
    desc: "Premium fleece hoodie with Cabin Tea crest. Relaxed fit. Organic cotton blend.",
    img: "/images/shop/hoodie.jpg", accent: TERRA,
  },
  {
    id: 7, name: "Keepsake Gift Set", price: 45, category: "Tea",
    desc: "Tea tin + ceramic mug + hand-written card in a branded box.",
    img: "/images/shop/gift-set.jpg", accent: GOLD,
  },
  {
    id: 8, name: "Wave Enamel Pin", price: 12, category: "Accessories",
    desc: "Gold-plated enamel pin with the Cabin Tea wave motif.",
    img: "/images/shop/pin.jpg", accent: GOLD,
  },
];

const CATEGORIES = ["All", "Apparel", "Drinkware", "Accessories", "Tea"];

/* ─────────────────────────────────────────────
   CART DRAWER
───────────────────────────────────────────── */
function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        zIndex: 200, backdropFilter: "blur(4px)",
      }} />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(420px, 90vw)", background: EARTH,
        zIndex: 201, display: "flex", flexDirection: "column",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 28px",
          borderBottom: `1px solid rgba(196,164,78,0.15)`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <span style={{ fontSize: "9px", letterSpacing: "3px", color: TERRA, display: "block", marginBottom: "4px" }}>YOUR ORDER</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "white" }}>
              {cart.reduce((s, i) => s + i.qty, 0)} {cart.reduce((s, i) => s + i.qty, 0) === 1 ? "item" : "items"}
            </span>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(214,207,194,0.5)", fontSize: "24px", lineHeight: 1,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(214,207,194,0.5)"}
          >×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "18px", color: "rgba(214,207,194,0.4)" }}>
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: "grid", gridTemplateColumns: "64px 1fr auto",
                  gap: "16px", padding: "18px 0",
                  borderBottom: `1px solid rgba(255,255,255,0.06)`,
                  alignItems: "center",
                }}>
                  {/* Thumb */}
                  <div style={{ width: "64px", height: "64px", overflow: "hidden", background: WARM }}>
                    <img src={item.img} alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  {/* Info */}
                  <div>
                    <span style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "white", marginBottom: "4px" }}>{item.name}</span>
                    <span style={{ display: "block", fontSize: "11px", color: "rgba(214,207,194,0.4)", marginBottom: "8px" }}>${item.price} each</span>
                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button onClick={() => onQtyChange(item.id, item.qty - 1)}
                        style={{ width: "24px", height: "24px", border: `1px solid rgba(196,164,78,0.2)`, background: "none", color: "rgba(214,207,194,0.6)", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: "13px", color: "white", minWidth: "16px", textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => onQtyChange(item.id, item.qty + 1)}
                        style={{ width: "24px", height: "24px", border: `1px solid rgba(196,164,78,0.2)`, background: "none", color: "rgba(214,207,194,0.6)", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", color: GOLD, marginBottom: "8px" }}>
                      ${item.price * item.qty}
                    </span>
                    <button onClick={() => onRemove(item.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "10px", letterSpacing: "1px", color: "rgba(214,207,194,0.3)", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = TERRA}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(214,207,194,0.3)"}
                    >REMOVE</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: `1px solid rgba(196,164,78,0.15)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(214,207,194,0.5)" }}>TOTAL</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "28px", color: "white" }}>${total}</span>
            </div>
            <button style={{
              width: "100%", padding: "16px",
              background: GOLD, color: DEEP,
              border: "none", cursor: "pointer",
              fontSize: "10px", letterSpacing: "3px", fontWeight: 700,
              fontFamily: "inherit", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >PROCEED TO CHECKOUT</button>
            <p style={{ fontSize: "11px", color: "rgba(214,207,194,0.3)", textAlign: "center", marginTop: "12px" }}>
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ product, onAdd, justAdded, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: EARTH, overflow: "hidden",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ${0.05 + index * 0.07}s, transform 0.6s ${0.05 + index * 0.07}s, box-shadow 0.3s`,
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Mini textile top stripe */}
      <div style={{ display: "flex", height: "3px", width: "100%", overflow: "hidden" }}>
        {[product.accent, TEAL, GOLD, product.accent].map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* Image */}
      <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
        <img src={product.img} alt={product.name} style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, transparent 50%)` }} />

        {/* Category tag */}
        <span style={{
          position: "absolute", top: "14px", left: "14px",
          background: "rgba(42,26,14,0.85)", backdropFilter: "blur(6px)",
          border: `1px solid rgba(196,164,78,0.15)`,
          fontSize: "8px", letterSpacing: "2px", fontWeight: 700,
          color: "rgba(214,207,194,0.7)", padding: "5px 10px",
        }}>{product.category.toUpperCase()}</span>
      </div>

      {/* Content */}
      <div style={{
        padding: "24px 24px 28px", flex: 1,
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "18px", lineHeight: 1.15, letterSpacing: "-0.3px",
          color: hovered ? product.accent : "white",
          marginBottom: "10px", transition: "color 0.25s",
        }}>{product.name}</h3>

        <p style={{
          fontSize: "13px", lineHeight: 1.75,
          color: "rgba(214,207,194,0.5)", fontWeight: 300,
          flex: 1, marginBottom: "20px",
        }}>{product.desc}</p>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "24px", color: GOLD, letterSpacing: "-0.5px",
          }}>${product.price}</span>

          <button onClick={() => onAdd(product)} style={{
            padding: "9px 20px",
            background: justAdded ? TEAL : "transparent",
            border: `1px solid ${justAdded ? TEAL : "rgba(196,164,78,0.3)"}`,
            color: justAdded ? "white" : GOLD,
            fontSize: "9px", letterSpacing: "2px", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { if (!justAdded) { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = DEEP; e.currentTarget.style.borderColor = GOLD; }}}
            onMouseLeave={e => { if (!justAdded) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = "rgba(196,164,78,0.3)"; }}}
          >
            {justAdded ? "ADDED ✓" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHOP PAGE
───────────────────────────────────────────── */
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const [heroRef,  heroVis]  = useReveal(0.05);
  const [gridRef,  gridVis]  = useReveal(0.05);
  const [ctaRef,   ctaVis]   = useReveal(0.1);

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const changeQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  return (
    <div style={{ minHeight: "100vh", background: DEEP, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {/* Cart drawer */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
        />
      )}

      {/* ══════════════════════════════════════════
          HERO — warm, lifestyle, editorial
          "Wear the wave" — cultural ownership
      ══════════════════════════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "70vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/images/shop/hero.jpg" alt="Cabin Tea Shop"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${EARTH} 0%, rgba(42,26,14,0.75) 40%, rgba(42,26,14,0.2) 100%)` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(42,26,14,0.85) 0%, transparent 55%)` }} />
        </div>
        <div className="ct-grain" style={{ zIndex: 1 }} />

        {/* Sankofa watermark */}
        <div style={{
          position: "absolute", top: "100px", right: "4vw", zIndex: 2,
          opacity: heroVis ? 0.08 : 0, transition: "opacity 1.5s 0.5s",
          transform: "scale(3)",
        }}>
          <Sankofa size={80} color={GOLD} />
        </div>

        <div style={{ position: "relative", zIndex: 3, padding: "80px 5vw 80px" }}>

          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}>
            <div style={{ width: "20px", height: "1px", background: GOLD }} />
            <span style={{ fontSize: "10px", letterSpacing: "4px", color: GOLD, fontWeight: 500 }}>
              CABIN TEA · THE SHOP
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 0.87, letterSpacing: "-3px",
            color: "white", margin: 0,
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.2s, transform 0.8s 0.2s",
          }}>Wear</h1>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic",
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 0.87, letterSpacing: "-3px",
            color: GOLD, marginBottom: "44px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(28px)",
            transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
          }}>the wave.</h1>

          <div style={{
            display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(16px)",
            transition: "opacity 0.7s 0.45s, transform 0.7s 0.45s",
          }}>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: "clamp(15px, 1.6vw, 18px)", color: "rgba(214,207,194,0.7)",
              lineHeight: 1.6, margin: 0, maxWidth: "380px",
              borderLeft: `2px solid rgba(181,84,30,0.5)`, paddingLeft: "18px",
            }}>
              Every purchase supports ocean storytelling and coastal communities.
            </p>

            {/* Cart button */}
            <button onClick={() => setCartOpen(true)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "12px 24px",
              background: cartCount > 0 ? GOLD : "transparent",
              border: `1px solid ${cartCount > 0 ? GOLD : "rgba(196,164,78,0.35)"}`,
              color: cartCount > 0 ? DEEP : "rgba(214,207,194,0.75)",
              cursor: "pointer", fontSize: "10px",
              letterSpacing: "2.5px", fontWeight: 700,
              fontFamily: "inherit", transition: "all 0.2s",
              flexShrink: 0,
            }}
              onMouseEnter={e => { if (!cartCount) { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}}
              onMouseLeave={e => { if (!cartCount) { e.currentTarget.style.borderColor = "rgba(196,164,78,0.35)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 ? `CART (${cartCount})` : "VIEW CART"}
            </button>
          </div>
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════
          FILTERS + GRID
      ══════════════════════════════════════════ */}
      <section ref={gridRef} style={{ background: EARTH, padding: "64px 5vw 100px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* Filter row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px", marginBottom: "48px",
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: "8px 20px",
                  background: activeCategory === cat ? TERRA : "transparent",
                  border: `1px solid ${activeCategory === cat ? TERRA : "rgba(181,84,30,0.25)"}`,
                  color: activeCategory === cat ? "white" : "rgba(214,207,194,0.45)",
                  fontSize: "10px", letterSpacing: "2px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "rgba(181,84,30,0.5)"; e.currentTarget.style.color = "rgba(214,207,194,0.75)"; }}}
                  onMouseLeave={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "rgba(181,84,30,0.25)"; e.currentTarget.style.color = "rgba(214,207,194,0.45)"; }}}
                >{cat}</button>
              ))}
            </div>

            {/* Item count */}
            <span style={{ fontSize: "11px", color: "rgba(214,207,194,0.3)", letterSpacing: "1px" }}>
              {filtered.length} {filtered.length === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2px", background: `rgba(181,84,30,0.06)`,
            }}>
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  justAdded={addedId === product.id}
                  index={i}
                  visible={gridVis}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: "20px", color: "rgba(214,207,194,0.3)",
              }}>No products in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <TextileBand />

      {/* ══════════════════════════════════════════
          CTA — culture, not just commerce
      ══════════════════════════════════════════ */}
      <section ref={ctaRef} style={{ background: WARM, padding: "100px 5vw", position: "relative", overflow: "hidden" }}>

        {/* Ghost Sankofa */}
        <div style={{ position: "absolute", right: "3vw", top: "50%", transform: "translateY(-50%)", opacity: 0.06 }}>
          <Sankofa size={320} color="white" />
        </div>

        <div style={{
          maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
        }}>
          <div style={{
            opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>
            {/* Textile mini stripe */}
            <div style={{ display: "flex", height: "4px", width: "80px", marginBottom: "28px", overflow: "hidden" }}>
              {[TERRA, TEAL, GOLD, TERRA, TEAL].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)", color: "white",
              lineHeight: 0.95, letterSpacing: "-1px", marginBottom: "20px",
            }}>
              Every purchase<br />
              <span style={{ color: GOLD, fontStyle: "italic" }}>supports ocean storytelling.</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(214,207,194,0.55)", fontWeight: 300, maxWidth: "380px" }}>
              Proceeds from merch sales go directly towards producing new episodes and supporting coastal communities across Africa.
            </p>
          </div>

          <div style={{
            opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(20px)",
            transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
            display: "flex", flexDirection: "column", gap: "14px",
          }}>
            <Link to="/episodes" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 28px",
              background: EARTH, border: `1px solid rgba(181,84,30,0.2)`,
              textDecoration: "none", transition: "border-color 0.2s",
              borderLeft: `3px solid ${TERRA}`,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = TERRA}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(181,84,30,0.2)"}
            >
              <div>
                <span style={{ display: "block", fontSize: "10px", letterSpacing: "2.5px", color: TERRA, marginBottom: "4px" }}>EXPLORE</span>
                <span style={{ display: "block", fontSize: "15px", fontWeight: 500, color: "white" }}>Our Episodes</span>
              </div>
              <span style={{ color: "rgba(196,164,78,0.4)", fontSize: "18px" }}>→</span>
            </Link>

            <Link to="/partner" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 28px",
              background: EARTH, border: `1px solid rgba(44,140,124,0.2)`,
              textDecoration: "none", transition: "border-color 0.2s",
              borderLeft: `3px solid ${TEAL}`,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = TEAL}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(44,140,124,0.2)"}
            >
              <div>
                <span style={{ display: "block", fontSize: "10px", letterSpacing: "2.5px", color: TEAL, marginBottom: "4px" }}>COLLABORATE</span>
                <span style={{ display: "block", fontSize: "15px", fontWeight: 500, color: "white" }}>Partner With Us</span>
              </div>
              <span style={{ color: "rgba(196,164,78,0.4)", fontSize: "18px" }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
