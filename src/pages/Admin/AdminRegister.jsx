import { useState } from "react";
import { adminRegister } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaBuilding, FaUserPlus } from "react-icons/fa";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    department: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    const res = await adminRegister(form);
    alert(res.data.message);
    navigate("/admin/login");
  };

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
    position: "relative",
    overflow: "hidden"
  };

  const floatingShape = (size, top, left, bg) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: bg,
    top: top,
    left: left,
    opacity: 0.15,
    animation: "float 6s ease-in-out infinite alternate"
  });

  const cardStyle = {
    background: "white",
    width: "420px",
    padding: "50px 40px",
    borderRadius: "25px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    animation: "fadeIn 1s ease",
    textAlign: "center",
    position: "relative",
    zIndex: 10
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "30px",
    background: "linear-gradient(45deg, #ff5e62, #ff9966)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    letterSpacing: "1px"
  };

  const inputWrapper = {
    position: "relative",
    margin: "15px 0"
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#ff5e62"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s"
  };

  const selectStyle = {
    ...inputStyle,
    paddingLeft: "40px",
    background: "white"
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    borderRadius: "12px",
    background: "linear-gradient(45deg, #ff5e62, #ff9966)",
    color: "white",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px"
  };

  const linkStyle = {
    marginTop: 15,
    display: "block",
    color: "#ff5e62",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer"
  };

  return (
    <div style={pageStyle}>
      {/* Floating Background Shapes */}
      <div style={floatingShape("150px", "10%", "10%", "#fff")}></div>
      <div style={floatingShape("100px", "60%", "80%", "#ffeb3b")}></div>
      <div style={floatingShape("200px", "30%", "70%", "#ff6f61")}></div>

      <style>
        {`
          input:focus, select:focus {
            border-color: #ff5e62 !important;
            box-shadow: 0 0 8px rgba(255,94,98,0.4);
          }

          button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 12px 25px rgba(0,0,0,0.25);
          }

          a:hover {
            text-decoration: underline !important;
            color: #e14f55 !important;
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
        <h2 style={titleStyle}>Admin Register</h2>

        <div style={inputWrapper}>
          <FaUser style={iconStyle} />
          <input
            style={inputStyle}
            placeholder="Name"
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

        <div style={inputWrapper}>
          <FaBuilding style={iconStyle} />
          <select
            style={selectStyle}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
            <option>IT</option>
            <option>AIDS</option>
            <option>BME</option>
          </select>
        </div>

        <button style={buttonStyle}>
          <FaUserPlus /> Register
        </button>

        <span style={linkStyle} onClick={() => navigate("/admin/login")}>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}
