import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function useReveal(threshold = 0.05) {
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

/* ── Palette — matches site exactly ── */
const BG    = "#0F1912";
const PANEL = "#141F18";
const DARK2 = "#1A2820";
const GOLD  = "#C4A44E";
const TEAL  = "#2C8C7C";
const CREAM = "rgba(214,207,194,0.75)";
const MUTED = "rgba(214,207,194,0.38)";

/* ── Products ── */
const PRODUCTS = [
  {
    id: 1, name: "Cabin Tea Classic Tee", price: 35, category: "Apparel",
    desc: "Heavyweight organic cotton. Embroidered wordmark. Unisex fit.",
    img: "/cabintea.jpg",
  },
  {
    id: 2, name: "Ocean Ceramic Mug", price: 24, category: "Drinkware",
    desc: "Hand-finished stoneware in deep teal glaze. 12oz.",
    img: "/occeanmug.jpg",
  },
  {
    id: 3, name: "Sipping With... Cap", price: 28, category: "Apparel",
    desc: "Structured cotton cap with gold thread embroidery. Adjustable.",
    img: "/occeancap.jpg",
  },
  {
    id: 4, name: "Gulf Canvas Tote", price: 22, category: "Accessories",
    desc: "Heavyweight canvas with screen-printed wave motif.",
    img: "/gulftotebag.jpg",
  },
  {
    id: 5, name: "Episode Blend Tea Tin", price: 18, category: "Tea",
    desc: "Organic herbal blend — the same tea our guests sip. 50g.",
    img: "/teatin.jpg",
  },
  {
    id: 6, name: "Cabin Tea Hoodie", price: 58, category: "Apparel",
    desc: "Premium fleece. Cabin Tea crest. Relaxed fit. Organic cotton blend.",
    img: "/teahoodie.jpg",
  },
  {
    id: 7, name: "Keepsake Gift Set", price: 45, category: "Tea",
    desc: "Tea tin + ceramic mug + hand-written card in a branded box.",
    img: "/giftbox.jpg",
  },
  {
    id: 8, name: "Wave Enamel Pin", price: 12, category: "Accessories",
    desc: "Gold-plated enamel pin with the Cabin Tea wave motif.",
    img: "/enamelpin.jpg",
  },
];

const CATEGORIES = ["All", "Apparel", "Drinkware", "Accessories", "Tea"];

/* ════════════════════════════════════════
   CART DRAWER
════════════════════════════════════════ */
function CartDrawer({ cart, onClose, onRemove, onQtyChange }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 200, backdropFilter: "blur(4px)",
      }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "min(400px, 90vw)",
        background: PANEL,
        zIndex: 201,
        display: "flex", flexDirection: "column",
        borderLeft: "1px solid rgba(196,164,78,0.12)",
        boxShadow: "-24px 0 64px rgba(0,0,0,0.5)",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontSize: "9px", letterSpacing: "3px", color: GOLD, margin: "0 0 4px", fontWeight: 600 }}>
              YOUR ORDER
            </p>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: 0 }}>
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: MUTED, fontSize: "22px", lineHeight: 1,
            transition: "color 0.2s", padding: "4px",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = MUTED}
          >×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "64px" }}>
              <p style={{ fontSize: "15px", color: MUTED, fontStyle: "italic" }}>Your cart is empty.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr auto",
                  gap: "16px", padding: "18px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  alignItems: "center",
                }}>
                  {/* Thumb */}
                  <div style={{ width: "72px", height: "72px", overflow: "hidden", background: DARK2, flexShrink: 0 }}>
                    <img src={item.img} alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  {/* Info */}
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "white", margin: "0 0 3px", lineHeight: 1.3 }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: "11px", color: MUTED, margin: "0 0 10px" }}>
                      ${item.price} each
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {[
                        ["−", () => onQtyChange(item.id, item.qty - 1)],
                        [item.qty, null],
                        ["+", () => onQtyChange(item.id, item.qty + 1)],
                      ].map(([label, action], i) => (
                        action ? (
                          <button key={i} onClick={action} style={{
                            width: "26px", height: "26px",
                            border: "1px solid rgba(196,164,78,0.2)",
                            background: "none", color: MUTED,
                            cursor: "pointer", fontSize: "14px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "border-color 0.2s, color 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(196,164,78,0.2)"; e.currentTarget.style.color = MUTED; }}
                          >{label}</button>
                        ) : (
                          <span key={i} style={{ fontSize: "14px", color: "white", minWidth: "18px", textAlign: "center" }}>
                            {label}
                          </span>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Price + remove */}
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: GOLD, margin: "0 0 8px" }}>
                      ${item.price * item.qty}
                    </p>
                    <button onClick={() => onRemove(item.id)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontSize: "9px", letterSpacing: "1.5px", color: MUTED,
                      transition: "color 0.2s", fontFamily: "inherit",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = "white"}
                      onMouseLeave={e => e.currentTarget.style.color = MUTED}
                    >REMOVE</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
              <span style={{ fontSize: "9px", letterSpacing: "2.5px", color: MUTED, fontWeight: 600 }}>ORDER TOTAL</span>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "white" }}>${total}</span>
            </div>
            <button style={{
              width: "100%", padding: "15px",
              background: GOLD, color: BG,
              border: "none", cursor: "pointer",
              fontSize: "10px", letterSpacing: "2.5px", fontWeight: 700,
              fontFamily: "inherit", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >PROCEED TO CHECKOUT</button>
            <p style={{ fontSize: "11px", color: MUTED, textAlign: "center", margin: "12px 0 0" }}>
              Shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/* ════════════════════════════════════════
   PRODUCT CARD
   — Clean, image-led, minimal chrome
   — Inspired by Okayplayer: let the
     product do the talking
════════════════════════════════════════ */
function ProductCard({ product, onAdd, justAdded, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        background: PANEL,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.55s ${0.04 + index * 0.06}s, transform 0.55s ${0.04 + index * 0.06}s`,
        cursor: "pointer",
      }}
    >
      {/* Image — clean square crop, generous height */}
      <div style={{
        position: "relative",
        paddingBottom: "100%", /* 1:1 square */
        overflow: "hidden",
        background: DARK2,
      }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Subtle dark vignette — not a full cover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,0.55) 0%, transparent 45%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s",
        }} />

        {/* Category pill — top left */}
        <span style={{
          position: "absolute", top: "14px", left: "14px",
          background: "rgba(15,25,18,0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(196,164,78,0.18)",
          fontSize: "8px", letterSpacing: "2px", fontWeight: 700,
          color: MUTED, padding: "5px 10px",
        }}>{product.category.toUpperCase()}</span>

        {/* Quick-add button — appears on hover */}
        <div style={{
          position: "absolute", bottom: "14px", left: "14px", right: "14px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.25s, transform 0.3s",
        }}>
          <button
            onClick={e => { e.stopPropagation(); onAdd(product); }}
            style={{
              width: "100%", padding: "11px",
              background: justAdded ? TEAL : GOLD,
              color: BG, border: "none",
              fontSize: "9px", letterSpacing: "2.5px", fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              transition: "background 0.2s",
            }}
          >{justAdded ? "ADDED ✓" : "ADD TO CART"}</button>
        </div>
      </div>

      {/* Card footer — clean, tight */}
      <div style={{ padding: "16px 18px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: "14px", fontWeight: 600,
              color: hovered ? GOLD : "white",
              lineHeight: 1.3, margin: "0 0 5px",
              letterSpacing: "0",
              transition: "color 0.2s",
            }}>{product.name}</h3>
            <p style={{
              fontSize: "12px", color: MUTED,
              lineHeight: 1.55, margin: 0,
              fontWeight: 300,
            }}>{product.desc}</p>
          </div>
          <span style={{
            fontSize: "16px", fontWeight: 700,
            color: "white", flexShrink: 0,
            lineHeight: 1,
          }}>${product.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SHOP PAGE
════════════════════════════════════════ */
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart]         = useState([]);
  const [addedId, setAddedId]   = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const [heroRef, heroVis] = useReveal(0.05);
  const [gridRef, gridVis] = useReveal(0.04);
  const [ctaRef,  ctaVis]  = useReveal(0.1);

  const filtered = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

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
    <div style={{ minHeight: "100vh", background: BG, color: "white", overflowX: "hidden" }}>
      <Navbar />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
        />
      )}

      {/* ════════ HERO ════════ */}
      <section ref={heroRef} style={{
        height: "65vh", minHeight: "440px",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <img
          src="/images/shop/hero.jpg"
          alt="Cabin Tea Shop"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(15,25,18,1) 0%, rgba(15,25,18,0.55) 50%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(15,25,18,0.75) 0%, transparent 60%)",
        }} />
        <div className="ct-grain" style={{ zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 5vw 64px" }}>
          <p style={{
            fontSize: "10px", letterSpacing: "4px", color: GOLD,
            fontWeight: 600, margin: "0 0 16px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(10px)",
            transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
          }}>CABIN TEA · THE SHOP</p>

          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(44px, 7vw, 110px)",
            lineHeight: 0.9, letterSpacing: "-2px",
            color: "white", margin: "0 0 4px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.8s 0.18s, transform 0.8s 0.18s",
          }}>Wear</h1>
          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(44px, 7vw, 110px)",
            lineHeight: 0.9, letterSpacing: "-2px",
            color: GOLD, margin: "0 0 36px",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)",
            transition: "opacity 0.8s 0.26s, transform 0.8s 0.26s",
          }}>the wave.</h1>

          <div style={{
            display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
            opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(12px)",
            transition: "opacity 0.7s 0.38s, transform 0.7s 0.38s",
          }}>
            <p style={{
              fontSize: "15px", color: CREAM, lineHeight: 1.65,
              fontWeight: 300, maxWidth: "380px", margin: 0,
            }}>
              Every purchase supports ocean storytelling and coastal communities across Africa.
            </p>

            {/* Cart button */}
            <button onClick={() => setCartOpen(true)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "12px 24px",
              background: cartCount > 0 ? GOLD : "transparent",
              border: `1px solid ${cartCount > 0 ? GOLD : "rgba(255,255,255,0.2)"}`,
              color: cartCount > 0 ? BG : CREAM,
              cursor: "pointer", fontSize: "10px",
              letterSpacing: "2px", fontWeight: 700,
              fontFamily: "inherit", transition: "all 0.2s",
              flexShrink: 0,
            }}
              onMouseEnter={e => { if (!cartCount) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "white"; }}}
              onMouseLeave={e => { if (!cartCount) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = CREAM; }}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 ? `CART (${cartCount})` : "VIEW CART"}
            </button>
          </div>
        </div>
      </section>

      {/* ════════ SHOP GRID ════════ */}
      <section ref={gridRef} style={{ background: BG, padding: "0 5vw 96px" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

          {/* ── Sticky filter + count bar ── */}
          <div style={{
            position: "sticky", top: "80px", zIndex: 10,
            background: BG,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 0",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: "14px",
            marginBottom: "40px",
          }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: "7px 18px",
                  background: activeCategory === cat ? GOLD : "transparent",
                  border: `1px solid ${activeCategory === cat ? GOLD : "rgba(196,164,78,0.2)"}`,
                  color: activeCategory === cat ? BG : MUTED,
                  fontSize: "10px", letterSpacing: "1.5px", fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.18s",
                }}
                  onMouseEnter={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "rgba(196,164,78,0.45)"; e.currentTarget.style.color = CREAM; }}}
                  onMouseLeave={e => { if (activeCategory !== cat) { e.currentTarget.style.borderColor = "rgba(196,164,78,0.2)"; e.currentTarget.style.color = MUTED; }}}
                >{cat}</button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{ fontSize: "11px", color: MUTED, letterSpacing: "1px" }}>
                {filtered.length} {filtered.length === 1 ? "ITEM" : "ITEMS"}
              </span>
              {cartCount > 0 && (
                <button onClick={() => setCartOpen(true)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "10px", letterSpacing: "2px", fontWeight: 700,
                  color: GOLD, fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: "7px",
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  {cartCount} IN CART
                </button>
              )}
            </div>
          </div>

          {/* ── Product grid — 4 columns desktop, scales down ── */}
          {filtered.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "2px",
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
              <p style={{ fontSize: "16px", color: MUTED, fontStyle: "italic" }}>Nothing here yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ════════ BOTTOM CTA ════════ */}
      <section ref={ctaRef} style={{
        background: PANEL,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "64px 5vw",
      }}>
        <div style={{
          maxWidth: "1300px", margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: "32px",
          opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(16px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: GOLD, marginBottom: "10px", fontWeight: 600 }}>
              MORE FROM CABIN TEA
            </p>
            <h2 style={{
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 36px)",
              color: "white", margin: 0, lineHeight: 1.1,
            }}>
              Every purchase supports<br />
              <span style={{ color: GOLD }}>ocean storytelling.</span>
            </h2>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/episodes" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 28px",
              border: "1px solid rgba(255,255,255,0.15)", color: CREAM,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "1.5px", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = CREAM; }}
            >Listen to Episodes →</Link>

            <Link to="/partner" style={{
              display: "inline-block", padding: "13px 28px",
              background: GOLD, color: BG,
              textDecoration: "none", fontSize: "11px",
              letterSpacing: "1.5px", fontWeight: 700,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >Partner With Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
