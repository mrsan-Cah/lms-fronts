import { useState, useContext } from "react";
import { adminLogin } from "../../services/adminService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft, FaKey } from "react-icons/fa";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setAdminToken } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    const res = await adminLogin(form);
    if (res.data.token) {
      setAdminToken(res.data.token);
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a1c2c, #373b52)",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const blob = (bg, size, top, left, blur = "80px") => ({
    position: "absolute",
    width: size,
    height: size,
    background: bg,
    top,
    left,
    filter: `blur(${blur})`,
    borderRadius: "50%",
    opacity: 0.7,
    animation: "blobMove 10s infinite alternate ease-in-out",
  });

  const cardStyle = {
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 0.15)",
    padding: "50px 45px",
    borderRadius: "25px",
    width: "420px",
    boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
    animation: "zoomIn 0.8s ease",
    border: "1px solid rgba(255,255,255,0.3)",
    position: "relative",
    zIndex: 10,
    color: "white",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "25px",
    background: "linear-gradient(45deg, #8bc6ec, #9599e2)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const inputWrapper = {
    position: "relative",
    margin: "18px 0",
  };

  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#8bc6ec",
    fontSize: "18px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 14px 14px 45px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  };

  const btnStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    borderRadius: "12px",
    background: "linear-gradient(45deg, #8bc6ec, #9599e2)",
    color: "white",
    fontSize: "17px",
    border: "none",
    cursor: "pointer",
    transition: "0.4s",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    letterSpacing: "0.5px",
  };

  const backBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "20px",
    cursor: "pointer",
    color: "#8bc6ec",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "15px",
  };

  const registerLinkStyle = {
    marginTop: 15,
    display: "block",
    color: "#8bc6ec",
    fontWeight: 600,
    textDecoration: "none",
  };

  return (
    <div style={pageStyle}>
      {/* Glowing Background Blobs */}
      <div style={blob("#8bc6ec", "350px", "10%", "5%")}></div>
      <div style={blob("#9599e2", "300px", "60%", "70%")}></div>
      <div style={blob("#fcb045", "250px", "30%", "20%")}></div>

      <style>
        {`
          input:hover {
            background: rgba(255,255,255,0.18);
          }

          input:focus {
            border-color: #8bc6ec;
            box-shadow: 0 0 10px rgba(139,198,236,0.7);
          }

          button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 25px rgba(0,0,0,0.4);
          }

          a:hover {
            color: #b0d7ff !important;
            text-decoration: underline !important;
          }

          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }

          @keyframes blobMove {
            0% { transform: translate(0px); }
            100% { transform: translate(30px, -30px); }
          }
        `}
      </style>

      <div style={cardStyle}>
        <div style={backBtnStyle} onClick={() => navigate("/")}>
          <FaArrowLeft /> Back to Home
        </div>

        <h2 style={titleStyle}>Admin Login</h2>

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

        <button style={btnStyle} onClick={submit}>
          <FaKey /> Login
        </button>

        <Link to="/admin/register" style={registerLinkStyle}>
          New Admin? Register Here
        </Link>
      </div>
    </div>
  );
}
