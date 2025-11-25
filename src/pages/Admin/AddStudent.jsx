import { useState, useContext } from "react";
import { addStudent } from "../../services/adminService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaUsers, FaBook, FaUpload, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

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
    background: "#f4f6f9",
    fontFamily: "Poppins, sans-serif",
  };

  const sidebarStyle = {
    width: "250px",
    background: "linear-gradient(180deg, #4a90e2, #007bff)",
    color: "white",
    padding: "30px 20px",
    boxShadow: "3px 0 10px rgba(0,0,0,0.1)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  };

  const sidebarTitle = {
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "25px",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 15px",
    textDecoration: "none",
    background: "rgba(255,255,255,0.15)",
    margin: "10px 0",
    borderRadius: "10px",
    color: "white",
    fontSize: "17px",
    transition: "0.3s",
  };

  const logoutBtn = {
    marginTop: "40px",
    background: "rgba(255,0,0,0.25)",
  };

  const contentStyle = {
    marginLeft: "270px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "40px",
  };

  const cardStyle = {
    background: "white",
    width: "450px",
    padding: "35px",
    borderRadius: "18px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.8s ease",
  };

  const titleStyle = {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={layoutStyle}>
      <style>
        {`
          a:hover {
            background: rgba(255,255,255,0.35) !important;
            transform: translateX(5px);
          }

          input:focus {
            border-color: #007bff !important;
            box-shadow: 0 0 8px rgba(0,123,255,0.4);
          }

          button:hover {
            background: #005fcc !important;
            transform: scale(1.03);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
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

      {/* Form Content */}
      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>Add New Student</h2>

          <input style={inputStyle} placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input style={inputStyle} placeholder="Roll Number"
            onChange={(e) => setForm({ ...form, roll: e.target.value })} />

          <input style={inputStyle} placeholder="DOB (dd-mm-yyyy)"
            onChange={(e) => setForm({ ...form, dob: e.target.value })} />

          <input style={inputStyle} placeholder="Year"
            onChange={(e) => setForm({ ...form, year: e.target.value })} />

          <input style={inputStyle} placeholder="Semester"
            onChange={(e) => setForm({ ...form, semester: e.target.value })} />

          <button style={buttonStyle} onClick={submit}>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}
