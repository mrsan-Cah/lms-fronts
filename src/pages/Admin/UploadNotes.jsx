import { useState, useContext } from "react";
import { uploadNotes } from "../../services/notesService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";

/* React Icons */
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaUpload,
  FaBook,
  FaFileAlt,
  FaLayerGroup,
  FaCalendarAlt
} from "react-icons/fa";

export default function UploadNotes() {
  const [form, setForm] = useState({});
  const { adminToken } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("year", form.year);
    fd.append("semester", form.semester);
    fd.append("file", form.file);

    const res = await uploadNotes(fd, adminToken);

    if (res.data.message) {
      alert("Notes Uploaded Successfully!");
      navigate("/admin/dashboard");
    }
  };

  /* ---------------- INTERNAL CSS ---------------- */
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(to right, #f4f7fb, #e9eff5)"
  };

  const sidebarStyle = {
    width: "260px",
    background: "linear-gradient(180deg, #1a237e, #0d47a1)",
    padding: "28px 20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "4px 0 12px rgba(0,0,0,0.25)"
  };

  const sidebarTitle = {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "10px"
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
    color: "white",
    fontSize: "17px",
    padding: "12px 15px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.18)",
    transition: "0.3s",
    fontWeight: "500"
  };

  const activeLink = {
    background: "rgba(255,255,255,0.35)",
    fontWeight: "700",
    transform: "scale(1.05)"
  };

  const contentStyle = {
    flex: 1,
    padding: "40px"
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    width: "550px",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.9s ease",
    margin: "auto",
    border: "1px solid rgba(255,255,255,0.4)"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "25px",
    color: "#1a237e"
  };

  const inputLabel = {
    fontWeight: "600",
    fontSize: "15px",
    marginBottom: "6px",
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "10px",
    border: "1px solid #bbb",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
    background: "#fff"
  };

  const fileInput = {
    ...inputStyle,
    background: "#f5f5f5"
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#1565c0,#0d47a1)",
    color: "white",
    border: "none",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s"
  };

  return (
    <div style={layoutStyle}>
      <style>
        {`
          input:focus {
            border-color: #1a237e !important;
            box-shadow: 0 0 8px rgba(26,35,126,0.4);
          }

          button:hover {
            background: linear-gradient(90deg,#0d47a1,#002171) !important;
            transform: scale(1.04);
          }

          a:hover {
            transform: translateX(6px);
            background: rgba(255,255,255,0.28) !important;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <div style={sidebarTitle}>Admin Panel</div>

        <Link to="/admin/dashboard" style={linkStyle}>
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link to="/admin/add-student" style={linkStyle}>
          <FaUserPlus /> Add Student
        </Link>

        <Link to="/admin/manage-students" style={linkStyle}>
          <FaUsers /> Manage Students
        </Link>

        <Link to="/admin/upload-notes" style={{ ...linkStyle, ...activeLink }}>
          <FaUpload /> Upload Notes
        </Link>

        <Link to="/admin/manage-notes" style={linkStyle}>
          <FaBook /> Manage Notes
        </Link>
      </div>

      {/* CONTENT */}
      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>
            <FaFileAlt style={{ marginRight: "8px" }} /> Upload Notes
          </h2>

          {/* Title */}
          <label style={inputLabel}>
            <FaFileAlt /> Title
          </label>
          <input
            style={inputStyle}
            placeholder="Enter Notes Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Description */}
          <label style={inputLabel}>
            <FaLayerGroup /> Description
          </label>
          <input
            style={inputStyle}
            placeholder="Enter Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Year */}
          <label style={inputLabel}>
            <FaCalendarAlt /> Year (1 - 4)
          </label>
          <input
            style={inputStyle}
            type="number"
            min="1"
            max="4"
            placeholder="Enter Year"
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />

          {/* Semester */}
          <label style={inputLabel}>
            <FaCalendarAlt /> Semester (1 - 8)
          </label>
          <input
            style={inputStyle}
            type="number"
            min="1"
            max="8"
            placeholder="Enter Semester"
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
          />

          {/* File */}
          <label style={inputLabel}>
            <FaUpload /> Upload File
          </label>
          <input
            style={fileInput}
            type="file"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />

          {/* Button */}
          <button style={buttonStyle} onClick={submit}>
            <FaUpload style={{ marginRight: "8px" }} /> Upload Notes
          </button>
        </div>
      </div>
    </div>
  );
}
