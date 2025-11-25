import { Link } from "react-router-dom";
import { FaUserShield, FaUserGraduate } from "react-icons/fa";

export default function Home() {
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4a90e2, #9013fe)",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const floatingCircle = (size, top, left, bg) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    top: top,
    left: left,
    opacity: 0.3,
    animation: "float 6s ease-in-out infinite alternate",
  });

  const cardStyle = {
    background: "white",
    padding: "50px 40px",
    borderRadius: "25px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    animation: "fadeIn 1s ease",
    zIndex: 10,
    position: "relative",
  };

  const titleStyle = {
    fontSize: "34px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "35px",
    letterSpacing: "1px",
    background: "linear-gradient(45deg, #007bff, #00b0ff)",
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

  return (
    <div style={pageStyle}>
      {/* Floating Background Circles */}
      <div style={floatingCircle("150px", "10%", "20%", "#fff")}></div>
      <div style={floatingCircle("100px", "60%", "80%", "#ffeb3b")}></div>
      <div style={floatingCircle("200px", "30%", "70%", "#ff6f61")}></div>

      <style>
        {`
          a:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 25px rgba(0,0,0,0.3);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
        `}
      </style>

      <div style={cardStyle}>
        <h1 style={titleStyle}>Notes Organizer</h1>

        <Link to="/admin/login" style={linkBtn}>
          <FaUserShield /> Admin Login
        </Link>

        <Link to="/student/login" style={linkBtnStudent}>
          <FaUserGraduate /> Student Login
        </Link>
      </div>
    </div>
  );
}
