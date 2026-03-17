import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WaveLine from "../components/WaveLine";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const categories = ["All", "Apparel", "Drinkware", "Accessories", "Tea"];

const products = [
  { id: 1, name: "Cabin Tea Classic Tee", price: 35, category: "Apparel", desc: "Heavyweight organic cotton tee with embroidered wordmark. Unisex fit.", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { id: 2, name: "Ocean Ceramic Mug", price: 24, category: "Drinkware", desc: "Hand-finished stoneware mug in deep teal glaze. 12oz.", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80" },
  { id: 3, name: "Sipping With... Cap", price: 28, category: "Apparel", desc: "Structured cotton cap with gold thread embroidery. Adjustable.", img: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=500&q=80" },
  { id: 4, name: "Gulf Canvas Tote", price: 22, category: "Accessories", desc: "Heavyweight cotton canvas tote with screen-printed wave motif.", img: "https://images.unsplash.com/photo-1597633125184-9fd7e54cf714?w=500&q=80" },
  { id: 5, name: "Episode Blend Tea Tin", price: 18, category: "Tea", desc: "Organic herbal blend curated for the show. Same tea our guests sip. 50g.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80" },
  { id: 6, name: "Cabin Tea Hoodie", price: 58, category: "Apparel", desc: "Premium fleece hoodie with Cabin Tea crest. Relaxed fit. Organic cotton blend.", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" },
  { id: 7, name: "Keepsake Gift Set", price: 45, category: "Tea", desc: "Tea tin + ceramic mug + hand-written card in a branded box.", img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&q=80" },
  { id: 8, name: "Wave Enamel Pin", price: 12, category: "Accessories", desc: "Gold-plated enamel pin with the Cabin Tea wave motif.", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80" },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [gridRef, gridVis] = useReveal(0.05);

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      <Navbar />

      {/* ═══ HEADER ═══ */}
      <section className="relative overflow-hidden" style={{ height: "35vh", minHeight: "260px" }}>
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80" alt="Shop" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to top, var(--dark) 10%, rgba(21,42,47,0.6) 50%, rgba(21,42,47,0.75) 100%)" }} />
        <div className="ct-grain" />

        <div className="anim-fade-up relative flex flex-col justify-end h-full p-6 md:p-12 lg:p-16 pb-12" style={{ zIndex: 2 }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-medium block mb-2" style={{ fontSize: "11px", letterSpacing: "4px", color: "var(--teal)" }}>CABIN TEA MERCH</span>
              <h1 className="font-display italic font-bold" style={{ fontSize: "clamp(30px, 4.5vw, 48px)", color: "white", lineHeight: 1.1 }}>Wear the wave.</h1>
            </div>
            {/* Cart */}
            {cartCount > 0 && (
              <div className="anim-fade-up-d2 flex items-center gap-3 py-2 px-4 rounded" style={{ background: "rgba(196,164,78,0.15)", border: "1px solid rgba(196,164,78,0.3)" }}>
                <span className="font-medium" style={{ fontSize: "12px", letterSpacing: "1px", color: "var(--gold)" }}>
                  {cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}
                </span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                <span className="font-display font-bold" style={{ fontSize: "16px", color: "var(--gold)" }}>${cartTotal}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section className="px-6 md:px-12 lg:px-16 py-6">
        <div className="flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className="ct-filter-tab py-2.5 px-6 text-xs font-medium cursor-pointer rounded-sm" style={{
              letterSpacing: "1.5px",
              background: activeCategory === cat ? "var(--gold)" : "transparent",
              color: activeCategory === cat ? "var(--dark)" : "var(--text-muted)",
              border: activeCategory === cat ? "1px solid var(--gold)" : "1px solid rgba(138,158,165,0.25)",
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ PRODUCT GRID ═══ */}
      <section ref={gridRef} className="flex-1 px-6 md:px-12 lg:px-16 pb-16 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} className={`ct-reveal ${gridVis ? "ct-visible" : ""} ct-product-card ct-image-card rounded-lg overflow-hidden flex flex-col`} style={{ transitionDelay: `${0.05 + i * 0.08}s` }}>
              {/* Image */}
              <div className="ct-product-image relative overflow-hidden" style={{ height: "220px" }}>
                <img src={p.img} alt={p.name} className="ct-img-cover" />
                <div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(to top, var(--dark-alt) 3%, transparent 40%)" }} />
                <span className="absolute top-3 left-3 py-1 px-2.5 rounded-sm font-medium" style={{ fontSize: "9px", letterSpacing: "1.5px", background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)" }}>
                  {p.category.toUpperCase()}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-5" style={{ background: "var(--dark-alt)", borderTop: "1px solid rgba(44,140,124,0.12)" }}>
                <h3 className="font-display font-bold text-white mb-1.5" style={{ fontSize: "17px", lineHeight: 1.3 }}>{p.name}</h3>
                <p className="font-light mb-4 flex-1" style={{ fontSize: "13px", lineHeight: 1.65, color: "rgba(214,207,194,0.5)" }}>{p.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-display font-bold" style={{ fontSize: "20px", color: "var(--gold)" }}>${p.price}</span>
                  <button onClick={() => addToCart(p)} className="ct-add-to-cart py-2 px-4 font-medium text-xs cursor-pointer rounded-sm" style={{
                    letterSpacing: "1.5px",
                    background: addedId === p.id ? "var(--teal)" : "transparent",
                    color: addedId === p.id ? "white" : "var(--gold)",
                    border: addedId === p.id ? "1px solid var(--teal)" : "1px solid var(--gold)",
                  }}>
                    {addedId === p.id ? "ADDED ✓" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif italic" style={{ fontSize: "18px", color: "var(--text-muted)" }}>No products in this category yet.</p>
          </div>
        )}
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden py-16 px-6 md:px-12 text-center" style={{ background: "var(--teal-dark)" }}>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(21,42,47,0.4) 0%, transparent 50%, rgba(196,164,78,0.05) 100%)" }} />
        <div className="relative max-w-xl mx-auto">
          <div className="mx-auto mb-5" style={{ maxWidth: "160px" }}><WaveLine color="rgba(196,164,78,0.6)" /></div>
          <h2 className="font-display italic font-bold mb-3" style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--cream)" }}>
            Every purchase supports ocean storytelling.
          </h2>
          <p className="mx-auto mb-8 font-light" style={{ fontSize: "14px", lineHeight: 1.85, color: "rgba(214,207,194,0.6)", maxWidth: "420px" }}>
            Proceeds from merch sales go directly towards producing new episodes and supporting coastal communities.
          </p>
          <Link to="/episodes" className="ct-btn-outline py-3.5 px-10 font-medium text-xs no-underline inline-block" style={{ letterSpacing: "3px", borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
            EXPLORE EPISODES
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}