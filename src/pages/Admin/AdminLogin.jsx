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
    background: "linear-gradient(135deg, #764ba2, #667eea)",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const floatingShape = (size, top, left, bg, rotate = "0deg") => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    top: top,
    left: left,
    opacity: 0.2,
    transform: `rotate(${rotate})`,
    animation: "float 6s ease-in-out infinite alternate",
  });

  const cardStyle = {
    background: "white",
    padding: "50px 40px",
    borderRadius: "25px",
    width: "400px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    animation: "fadeIn 1s ease",
    textAlign: "center",
    zIndex: 10,
    position: "relative",
    overflow: "hidden",
  };

  const titleStyle = {
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "30px",
    letterSpacing: "1px",
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const inputWrapper = {
    position: "relative",
    margin: "15px 0",
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#667eea",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s",
  };

  const btnStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    borderRadius: "12px",
    background: "linear-gradient(45deg, #667eea, #764ba2)",
    color: "white",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const backBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "20px",
    cursor: "pointer",
    color: "#667eea",
    fontWeight: 600,
    textDecoration: "none",
  };

  const registerLinkStyle = {
    marginTop: 15,
    display: "block",
    color: "#667eea",
    fontWeight: 600,
    textDecoration: "none",
  };

  return (
    <div style={pageStyle}>
      {/* Floating Background Shapes */}
      <div style={floatingShape("150px", "10%", "10%", "#fff")}></div>
      <div style={floatingShape("100px", "60%", "80%", "#ffeb3b")}></div>
      <div style={floatingShape("200px", "30%", "70%", "#ff6f61")}></div>
      <div style={floatingShape("120px", "50%", "20%", "#6fcf97", "45deg")}></div>
      <div style={floatingShape("80px", "80%", "10%", "#56ccf2", "30deg")}></div>

      <style>
        {`
          input:focus {
            border-color: #764ba2 !important;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
          }

          button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 25px rgba(0,0,0,0.25);
          }

          a:hover {
            color: #4c51bf !important;
            text-decoration: underline !important;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
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
