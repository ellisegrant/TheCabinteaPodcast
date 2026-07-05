import { useState } from "react";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookies";

const CONSENT_COOKIE = "ct_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !getCookie(CONSENT_COOKIE));

  const respond = (value) => {
    setCookie(CONSENT_COOKIE, value, 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      left: "20px", bottom: "20px",
      zIndex: 300,
      maxWidth: "360px",
      background: "rgba(18,36,40,0.99)",
      border: "1px solid rgba(196,164,78,0.25)",
      borderTop: "2px solid var(--gold, #c4a44e)",
      borderRadius: "4px",
      padding: "20px 22px",
      boxShadow: "0 20px 48px rgba(0,0,0,0.45)",
    }}>
      <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(214,207,194,0.85)", margin: "0 0 16px", fontWeight: 300 }}>
        We use cookies to keep your shopping cart and preferences saved across visits. By continuing, you agree to our use of cookies.{" "}
        <Link to="/contact" style={{ color: "var(--gold, #c4a44e)" }}>Contact us</Link> if you have questions.
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => respond("accepted")}
          style={{
            padding: "9px 20px",
            background: "var(--gold, #c4a44e)", color: "#0F1912",
            border: "none", cursor: "pointer",
            fontSize: "10px", letterSpacing: "1.5px", fontWeight: 700,
            fontFamily: "inherit",
          }}
        >
          ACCEPT
        </button>
        <button
          onClick={() => respond("declined")}
          style={{
            padding: "9px 20px",
            background: "transparent", color: "rgba(214,207,194,0.75)",
            border: "1px solid rgba(214,207,194,0.25)", cursor: "pointer",
            fontSize: "10px", letterSpacing: "1.5px", fontWeight: 600,
            fontFamily: "inherit",
          }}
        >
          DECLINE
        </button>
      </div>
    </div>
  );
}
