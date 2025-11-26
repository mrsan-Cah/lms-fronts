import { useState, useContext } from "react";
import { addStudent } from "../../services/adminService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUserPlus,
  FaUsers,
  FaBook,
  FaUpload,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

export default function AddStudent() {
  const [form, setForm] = useState({});
  const { adminToken } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    const res = await addStudent(form, adminToken);

    if (res.data.message) {
      alert("Student Added Successfully!");
      navigate("/admin/dashboard");
    }
  };

  // ---------- Internal CSS ----------
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8efff, #f8faff)",
    fontFamily: "Poppins, sans-serif",
  };

  const sidebarStyle = {
    width: "260px",
    background: "linear-gradient(180deg, #0056d6, #007bff)",
    color: "white",
    padding: "35px 20px",
    boxShadow: "4px 0 25px rgba(0,0,0,0.2)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: "0 20px 20px 0",
  };

  const sidebarTitle = {
    fontSize: "28px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "30px",
    letterSpacing: "1px",
    textShadow: "0 3px 6px rgba(0,0,0,0.3)",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 17px",
    textDecoration: "none",
    background: "rgba(255,255,255,0.18)",
    margin: "12px 0",
    borderRadius: "12px",
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
    transition: "0.35s",
    backdropFilter: "blur(4px)",
  };

  const logoutBtn = {
    marginTop: "50px",
    background: "rgba(255,0,0,0.35)",
  };

  const contentStyle = {
    marginLeft: "280px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "50px",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.75)",
    width: "500px",
    padding: "40px",
    borderRadius: "25px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    backdropFilter: "blur(10px)",
    animation: "slideUp 0.9s ease",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "25px",
    color: "#222",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    borderRadius: "12px",
    border: "1px solid #bbb",
    fontSize: "16px",
    outline: "none",
    transition: "0.35s",
    background: "#ffffffa8",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #007bff, #0056d6)",
    color: "white",
    border: "none",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    letterSpacing: "0.5px",
    boxShadow: "0 6px 12px rgba(0,123,255,0.4)",
  };

  return (
    <div style={layoutStyle}>
      <style>
        {`
          a:hover {
            background: rgba(255,255,255,0.40) !important;
            transform: translateX(8px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          }

          input:focus {
            border-color: #007bff !important;
            box-shadow: 0 0 12px rgba(0,123,255,0.6);
            background: white !important;
          }

          button:hover {
            background: linear-gradient(135deg, #0056d6, #003a92) !important;
            transform: scale(1.05);
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={sidebarTitle}>Admin Panel</div>

        <Link style={linkStyle} to="/admin/dashboard">
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link style={linkStyle} to="/admin/add-student">
          <FaUserPlus /> Add Student
        </Link>

        <Link style={linkStyle} to="/admin/manage-students">
          <FaUsers /> Manage Students
        </Link>

        <Link style={linkStyle} to="/admin/upload-notes">
          <FaUpload /> Upload Notes
        </Link>

        <Link style={linkStyle} to="/admin/manage-notes">
          <FaBook /> Manage Notes
        </Link>

        <Link style={{ ...linkStyle, ...logoutBtn }} to="/admin/login">
          <FaSignOutAlt /> Logout
        </Link>
      </div>

      {/* Form Card */}
      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>Add New Student</h2>

          <input
            style={inputStyle}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="Roll Number"
            onChange={(e) => setForm({ ...form, roll: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="DOB (dd-mm-yyyy)"
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="Year"
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="Semester"
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
          />

          <select
            style={inputStyle}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
            <option value="IT">IT</option>
            <option value="AIDS">AIDS</option>
            <option value="BME">BME</option>
          </select>

          <button style={buttonStyle} onClick={submit}>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}
