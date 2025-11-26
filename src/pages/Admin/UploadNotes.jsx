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
  FaCalendarAlt,
  FaBuilding,
  FaClipboardCheck
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
    fd.append("department", form.department);
    fd.append("file", form.file);

    const res = await uploadNotes(fd, adminToken);

    if (res.data.message) {
      alert("Notes Uploaded Successfully!");
      navigate("/admin/dashboard");
    }
  };

  /* ================== INTERNAL PREMIUM CSS ================== */
  const layout = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "linear-gradient(135deg, #e8edf5, #eef3ff, #dae2f8)"
  };

  const sidebar = {
    width: "260px",
    background: "linear-gradient(180deg, #0d1b4c, #162b64, #1c3879)",
    padding: "28px 18px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    height: "100vh"
  };

  const sidebarTitle = {
    fontSize: "27px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "10px",
    letterSpacing: "1px",
    textShadow: "0 0 8px rgba(255,255,255,0.5)"
  };

  const link = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
    color: "#e0e0e0",
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(4px)",
    transition: "0.3s",
    fontWeight: "500",
  };

  const activeLink = {
    background: "rgba(255,255,255,0.28)",
    fontWeight: "700",
    color: "#fff",
    boxShadow: "0 0 14px rgba(255,255,255,0.4)",
    transform: "scale(1.05)"
  };

  const content = {
    flex: 1,
    padding: "50px 40px"
  };

  const card = {
    width: "600px",
    margin: "auto",
    padding: "40px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "20px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
    animation: "floatIn 0.8s ease",
    border: "1px solid rgba(255,255,255,0.4)",
    backdropFilter: "blur(10px)"
  };

  const title = {
    fontSize: "30px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "25px",
    color: "#0d1b4c",
    textShadow: "0 2px 10px rgba(13,27,76,0.3)"
  };

  const label = {
    fontWeight: "600",
    marginBottom: "6px",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #b4b4b4",
    background: "white",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s"
  };

  const fileBox = {
    padding: "14px",
    borderRadius: "12px",
    border: "2px dashed #1c3879",
    background: "#f5f8ff",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "18px",
    fontWeight: "600",
    transition: "0.3s"
  };

  const button = {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(90deg,#1c3879,#0d1b4c)",
    border: "none",
    color: "white",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s"
  };

  return (
    <div style={layout}>
      {/* ANIMATIONS */}
      <style>
        {`
          input:focus, select:focus {
            border-color: #1c3879 !important;
            box-shadow: 0 0 10px rgba(28,56,121,0.4);
            transform: scale(1.02);
          }

          button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 18px rgba(28,56,121,0.4);
          }

          a:hover {
            transform: translateX(6px);
            background: rgba(255,255,255,0.25) !important;
          }

          #fileBox:hover {
            background: #e3e9ff;
            transform: scale(1.03);
            box-shadow: 0 0 12px rgba(28,56,121,0.3);
          }

          @keyframes floatIn {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <div style={sidebarTitle}>Admin Panel</div>

        <Link to="/admin/dashboard" style={link}>
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link to="/admin/add-student" style={link}>
          <FaUserPlus /> Add Student
        </Link>

        <Link to="/admin/manage-students" style={link}>
          <FaUsers /> Manage Students
        </Link>

        <Link to="/admin/upload-notes" style={{ ...link, ...activeLink }}>
          <FaUpload /> Upload Notes
        </Link>

        <Link to="/admin/manage-notes" style={link}>
          <FaBook /> Manage Notes
        </Link>
      </div>

      {/* CONTENT */}
      <div style={content}>
        <div style={card}>
          <h2 style={title}>
            <FaClipboardCheck style={{ marginRight: "10px" }} /> Upload Notes
          </h2>

          {/* Title */}
          <label style={label}><FaFileAlt /> Title</label>
          <input
            style={input}
            placeholder="Enter Notes Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Description */}
          <label style={label}><FaLayerGroup /> Description</label>
          <input
            style={input}
            placeholder="Enter Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Department */}
          <label style={label}><FaBuilding /> Department</label>
          <select
            style={input}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AIML</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>

          {/* Year */}
          <label style={label}><FaCalendarAlt /> Year (1 - 4)</label>
          <input
            style={input}
            type="number"
            min="1"
            max="4"
            placeholder="Enter Year"
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />

          {/* Semester */}
          <label style={label}><FaCalendarAlt /> Semester (1 - 8)</label>
          <input
            style={input}
            type="number"
            min="1"
            max="8"
            placeholder="Enter Semester"
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
          />

          {/* File Input */}
          <label style={label}><FaUpload /> Upload File</label>
          <div id="fileBox" style={fileBox}>
            <input
              type="file"
              style={{ opacity: 0, position: "absolute", width: "100%" }}
              onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
            />
            Click to Upload PDF
          </div>

          {/* Button */}
          <button style={button} onClick={submit}>
            <FaUpload style={{ marginRight: "8px" }} /> Upload Notes
          </button>
        </div>
      </div>
    </div>
  );
}
