import { useEffect, useState, useContext } from "react";
import { fetchStudents, deleteStudent } from "../../services/adminService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaUpload,
  FaBook,
  FaFilter,
  FaUserEdit,
  FaTrashAlt
} from "react-icons/fa";

export default function ManageStudents() {
  const { adminToken } = useContext(AdminAuthContext);
  const [students, setStudents] = useState([]);

  const [yearFilter, setYearFilter] = useState("All");
  const [semFilter, setSemFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const navigate = useNavigate();

  const load = async () => {
    const res = await fetchStudents(adminToken);
    setStudents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteStudent(id, adminToken);
      load();
    }
  };

  const handleEdit = (id) => navigate(`/admin/edit-student/${id}`);

  // ---------- INTERNAL CSS ----------
  const layoutStyle = {
    display: "flex",
    background: "#eef2f5",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
  };

  const sidebarStyle = {
    width: "250px",
    background: "linear-gradient(180deg, #1e3c72, #2a5298)",
    color: "white",
    padding: "30px 20px",
    boxShadow: "3px 0 15px rgba(0,0,0,0.25)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  };

  const sidebarTitle = {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "35px",
    textAlign: "center",
    textShadow: "0 3px 10px rgba(0,0,0,0.3)",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 15px",
    margin: "10px 0",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    textDecoration: "none",
    fontSize: "17px",
    transition: "0.3s",
  };

  const contentStyle = {
    marginLeft: "270px",
    padding: "45px",
    width: "100%",
    animation: "fadeIn 1s ease",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#1c1c1c",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const filterBox = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "20px",
    flexWrap: "wrap",
    background: "white",
    padding: "15px 20px",
    borderRadius: "15px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  };

  const filterSelect = {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "2px solid #1e3c72",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
    background: "#f6f9fc",
    fontWeight: "600",
  };

  const tableBox = {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  };

  const thStyle = {
    background: "rgba(30,60,114,0.9)",
    color: "white",
    padding: "14px",
    borderBottom: "2px solid #ddd",
    fontSize: "16px",
    letterSpacing: "0.5px",
    backdropFilter: "blur(6px)",
  };

  const tdStyle = {
    padding: "14px",
    borderBottom: "1px solid #eee",
    fontSize: "15px",
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  };

  const actionBtn = {
    padding: "7px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "0.3s",
  };

  const btnEdit = { ...actionBtn, background: "#ffb400", color: "white" };
  const btnDelete = { ...actionBtn, background: "#ff4d4d", color: "white" };

  // 🔍 FILTER LOGIC
  const filteredStudents = students.filter((s) => {
    const matchYear = yearFilter === "All" || s.year == yearFilter;
    const matchSem = semFilter === "All" || s.semester == semFilter;
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    return matchYear && matchSem && matchDept;
  });

  return (
    <div style={layoutStyle}>
      <style>
        {`
          a:hover {
            background: rgba(255,255,255,0.4) !important;
            transform: translateX(8px);
          }

          tr {
            transition: 0.3s;
          }

          tr:hover {
            background: #f0f4ff;
            transform: scale(1.01);
          }

          button:hover {
            transform: scale(1.08);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media(max-width: 900px) {
            div[style*="margin-left: 270px"] {
              margin-left: 0 !important;
              padding: 25px !important;
            }

            div[style*="position: fixed"] {
              width: 100% !important;
              height: auto !important;
              display: flex !important;
              flex-direction: row !important;
              justify-content: space-around !important;
            }
          }
        `}
      </style>

      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <div style={sidebarTitle}>
          <FaUsers /> Admin Panel
        </div>

        <Link to="/admin/dashboard" style={linkStyle}>
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link to="/admin/add-student" style={linkStyle}>
          <FaUserPlus /> Add Student
        </Link>

        <Link to="/admin/manage-students" style={linkStyle}>
          <FaUsers /> Manage Students
        </Link>

        <Link to="/admin/upload-notes" style={linkStyle}>
          <FaUpload /> Upload Notes
        </Link>

        <Link to="/admin/manage-notes" style={linkStyle}>
          <FaBook /> Manage Notes
        </Link>
      </div>

      {/* CONTENT */}
      <div style={contentStyle}>
        <h2 style={titleStyle}>
          <FaUsers /> Manage Students
        </h2>

        {/* FILTERS */}
        <div style={filterBox}>
          <FaFilter size={20} color="#1e3c72" />
          <b style={{ fontSize: "18px" }}>Filters:</b>

          <select style={filterSelect} value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="All">Year (All)</option>
            <option value="1">1</option><option value="2">2</option>
            <option value="3">3</option><option value="4">4</option>
          </select>

          <select style={filterSelect} value={semFilter} onChange={(e) => setSemFilter(e.target.value)}>
            <option value="All">Semester (All)</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>

          <select style={filterSelect} value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="All">Department (All)</option>
            <option value="CSE">CSE</option><option value="ECE">ECE</option>
            <option value="EEE">EEE</option><option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option><option value="IT">IT</option>
            <option value="AIDS">AIDS</option><option value="BME">BME</option>
          </select>
        </div>

        {/* TABLE */}
        <div style={tableBox}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Roll No</th>
                <th style={thStyle}>Year</th>
                <th style={thStyle}>Semester</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s._id}>
                  <td style={tdStyle}>{s.name}</td>
                  <td style={tdStyle}>{s.roll}</td>
                  <td style={tdStyle}>{s.year}</td>
                  <td style={tdStyle}>{s.semester}</td>
                  <td style={tdStyle}>{s.department}</td>

                  <td style={tdStyle}>
                    <button style={btnEdit} onClick={() => handleEdit(s._id)}>
                      <FaUserEdit /> Edit
                    </button>

                    <button style={btnDelete} onClick={() => handleDelete(s._id)}>
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
