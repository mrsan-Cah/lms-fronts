import { Link } from "react-router-dom";
import { FaUserShield, FaUserGraduate } from "react-icons/fa";

export default function Home() {
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Poppins, sans-serif",

    /* ⭐ CLEAR HD BACKGROUND IMAGE */
    backgroundImage:
      "url('https://assets.collegedunia.com/public/image/C_Abdul_3e8e35f230303d7a827c0bf0435a7c1d.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.45)",
    zIndex: 1,
  };

  const floatingCircle = (size, top, left, bg, duration = "6s") => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    top,
    left,
    opacity: 0.22,
    animation: `float ${duration} ease-in-out infinite alternate`,
    filter: "blur(4px)",
    zIndex: 2,
  });

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "50px 40px",
    borderRadius: "25px",
    width: "380px",
    maxWidth: "95%",
    textAlign: "center",
    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.3)",
    animation: "fadeIn 1s ease",
    zIndex: 10,
    position: "relative",
    transition: "0.3s",
  };

  const titleStyle = {
    fontSize: "34px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "35px",
    background: "linear-gradient(45deg, #77f2ff, #a47bff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const linkBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    margin: "15px 0",
    padding: "14px 0",
    borderRadius: "12px",
    textDecoration: "none",
    background: "linear-gradient(45deg, #4a90e2, #9013fe)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.4s ease",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  };

  const linkBtnStudent = {
    ...linkBtn,
    background: "linear-gradient(45deg, #28a745, #20c997)",
  };

  const responsiveStyles = `
    /* --------------------------------------------- */
    /* 📱 MOBILE SMALL (360px – 480px) */
    /* --------------------------------------------- */
    @media (max-width: 480px) {
      .home-card {
        width: 90% !important;
        padding: 35px 20px !important;
      }
      .home-title {
        font-size: 26px !important;
        margin-bottom: 25px !important;
      }
      .home-btn {
        font-size: 14px !important;
        padding: 12px 0 !important;
      }
    }

    /* --------------------------------------------- */
    /* 📱 MOBILE LARGE / PHABLETS (480px – 768px) */
    /* --------------------------------------------- */
    @media (max-width: 768px) {
      .home-card {
        width: 85% !important;
        padding: 40px 25px !important;
      }
      .home-title {
        font-size: 30px !important;
      }
      .home-btn {
        font-size: 15px !important;
        padding: 13px 0 !important;
      }
    }

    /* --------------------------------------------- */
    /* 📱 TABLETS (768px – 1024px) */
    /* --------------------------------------------- */
    @media (max-width: 1024px) {
      .home-card {
        width: 55% !important;
        padding: 45px 35px !important;
      }
      .home-title {
        font-size: 32px !important;
      }
      .home-btn {
        font-size: 16px !important;
      }
    }

    /* --------------------------------------------- */
    /* 💻 LAPTOPS SMALL (1024px – 1280px) */
    /* --------------------------------------------- */
    @media (max-width: 1280px) {
      .home-card {
        width: 430px !important;
      }
    }
  `;

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>

      {/* Floating Background Shapes */}
      <div style={floatingCircle("150px", "10%", "15%", "#ffffff", "8s")}></div>
      <div style={floatingCircle("100px", "65%", "85%", "#ffe066", "5s")}></div>
      <div style={floatingCircle("200px", "30%", "70%", "#ff6f61", "7s")}></div>
      <div style={floatingCircle("120px", "50%", "40%", "#9b59b6", "6s")}></div>
      <div style={floatingCircle("80px", "20%", "80%", "#16a085", "4s")}></div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-25px) translateX(15px); }
            100% { transform: translateY(0) translateX(0); }
          }

          a:hover {
            transform: translateY(-3px) scale(1.07);
            box-shadow: 0 12px 30px rgba(0,0,0,0.35);
          }

          ${responsiveStyles}
        `}
      </style>

      <div className="home-card" style={cardStyle}>
        <h1 className="home-title" style={titleStyle}>Notes Organizer</h1>

        <Link to="/admin/login" className="home-btn" style={linkBtn}>
          <FaUserShield /> Admin Login
        </Link>

        <Link to="/student/login" className="home-btn" style={linkBtnStudent}>
          <FaUserGraduate /> Student Login
        </Link>
      </div>
    </div>
  );
}
