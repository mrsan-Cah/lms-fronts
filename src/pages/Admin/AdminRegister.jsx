import { useState } from "react";
import { adminRegister } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUserPlus } from "react-icons/fa";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    const res = await adminRegister(form);
    alert(res.data.message);
    navigate("/admin/login");
  };

  // Page background
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    background:
      "linear-gradient(135deg, #ff9966, #ff5e62, #ff758c, #ff7eb3)",
    backgroundSize: "300% 300%",
    animation: "bgMove 12s ease infinite",
    position: "relative",
    overflow: "hidden"
  };

  // Floating particles
  const particle = (size, top, left, opacity) => ({
    position: "absolute",
    width: size,
    height: size,
    background: "rgba(255,255,255," + opacity + ")",
    borderRadius: "50%",
    top,
    left,
    filter: "blur(4px)",
    animation: "particleMove 10s ease-in-out infinite alternate"
  });

  // Glass card styling
  const cardStyle = {
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "25px",
    width: "420px",
    padding: "50px 40px",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    animation: "slideUp 1.2s ease",
    position: "relative",
    zIndex: 10,
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "35px",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "25px",
    background: "linear-gradient(45deg, #ffffff, #ffe5e5)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0px 2px 30px rgba(255,255,255,0.6)"
  };

  // Input
  const inputWrapper = {
    position: "relative",
    margin: "20px 0"
  };

  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#ff5e62",
    fontSize: "18px"
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 14px 14px 45px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.6)",
    outline: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    fontSize: "16px",
    letterSpacing: "0.5px",
    transition: "all 0.3s"
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    borderRadius: "15px",
    background:
      "linear-gradient(45deg, #ff5e62, #ff9966, #ff758c)",
    backgroundSize: "200% 200%",
    animation: "buttonGlow 4s ease infinite",
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0px 4px 20px rgba(255,94,98,0.4)"
  };

  const linkStyle = {
    marginTop: 18,
    display: "block",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: 600,
    opacity: 0.8
  };

  return (
    <div style={pageStyle}>
      
      {/* Floating particles */}
      <div style={particle("90px", "20%", "15%", "0.2")}></div>
      <div style={particle("130px", "70%", "80%", "0.15")}></div>
      <div style={particle("75px", "40%", "70%", "0.3")}></div>
      <div style={particle("150px", "10%", "60%", "0.1")}></div>

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes buttonGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes particleMove {
            0% { transform: translateY(0); }
            100% { transform: translateY(-20px); }
          }

          input:focus {
            border-color: #fff !important;
            box-shadow: 0 0 12px rgba(255,255,255,0.7);
            background: rgba(255,255,255,0.3);
          }

          button:hover {
            transform: scale(1.06);
            box-shadow: 0px 8px 25px rgba(255,94,98,0.45);
          }

          a:hover {
            opacity: 1;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={cardStyle}>
        <h2 style={titleStyle}>Admin Register</h2>

        <div style={inputWrapper}>
          <FaUser style={iconStyle} />
          <input
            style={inputStyle}
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div style={inputWrapper}>
          <FaUser style={iconStyle} />
          <input
            style={inputStyle}
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div style={inputWrapper}>
          <FaLock style={iconStyle} />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button style={buttonStyle} onClick={submit}>
          <FaUserPlus /> Register
        </button>

        <span style={linkStyle} onClick={() => navigate("/admin/login")}>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}
