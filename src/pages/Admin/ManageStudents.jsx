import { useEffect, useState, useContext } from "react";
import { fetchStudents, deleteStudent } from "../../services/adminService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaUpload,
  FaBook
} from "react-icons/fa";

export default function ManageStudents() {
  const { adminToken } = useContext(AdminAuthContext);
  const [students, setStudents] = useState([]);

  const [yearFilter, setYearFilter] = useState("All");
  const [semFilter, setSemFilter] = useState("All");

  const navigate = useNavigate();

  const load = async () => {
    const res = await fetchStudents(adminToken);
    setStudents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id, adminToken);
      load();
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-student/${id}`);
  };

  // ---------- INTERNAL CSS ----------
  const layoutStyle = {
    display: "flex",
    background: "#f4f6f9",
    minHeight: "100vh",
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
    gap: "12px",
    padding: "12px 15px",
    margin: "10px 0",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.15)",
    textDecoration: "none",
    color: "white",
    fontSize: "17px",
    transition: "0.3s",
  };

  const contentStyle = {
    marginLeft: "270px",
    padding: "40px",
    width: "100%",
  };

  const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    animation: "fadeIn 1s ease",
  };

  const titleStyle = {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  };

  const filterBox = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  };

  const filterSelect = {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #4a90e2",
    fontSize: "16px",
    outline: "none",
    cursor: "pointer",
  };

  const tableStyle = {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  };

  const thStyle = {
    background: "#4a90e2",
    color: "white",
    padding: "12px",
    fontSize: "16px",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontSize: "15px",
  };

  const btnEdit = {
    padding: "6px 14px",
    marginRight: "10px",
    borderRadius: "8px",
    background: "#ffb400",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  };

  const btnDelete = {
    padding: "6px 14px",
    borderRadius: "8px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  };

  // 🔍 FINAL FILTER LOGIC (ONLY YEAR + SEM)
  const filteredStudents = students.filter((s) => {
    const matchYear = yearFilter === "All" || s.year == yearFilter;
    const matchSem = semFilter === "All" || s.semester == semFilter;
    return matchYear && matchSem;
  });

  return (
    <div style={layoutStyle}>
      <style>
        {`
          a:hover {
            background: rgba(255,255,255,0.35) !important;
            transform: translateX(5px);
          }

          tr:hover {
            background: #f1f1f1;
          }

          button:hover {
            transform: scale(1.05);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(25px); }
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

        <Link to="/admin/upload-notes" style={linkStyle}>
          <FaUpload /> Upload Notes
        </Link>

        <Link to="/admin/manage-notes" style={linkStyle}>
          <FaBook /> Manage Notes
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div style={contentStyle}>
        <h2 style={titleStyle}>Manage Students</h2>

        {/* FILTERS */}
        <div style={filterBox}>
          {/* Year */}
          <label style={{ fontSize: "18px", fontWeight: "600" }}>
            Year:
          </label>

          <select
            style={filterSelect}
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          {/* Semester */}
          <label style={{ fontSize: "18px", fontWeight: "600" }}>
            Semester:
          </label>

          <select
            style={filterSelect}
            value={semFilter}
            onChange={(e) => setSemFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div style={cardStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Roll No</th>
                <th style={thStyle}>Year</th>
                <th style={thStyle}>Semester</th>
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

                  <td style={tdStyle}>
                    <button style={btnEdit} onClick={() => handleEdit(s._id)}>
                      Edit
                    </button>

                    <button style={btnDelete} onClick={() => handleDelete(s._id)}>
                      Delete
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
