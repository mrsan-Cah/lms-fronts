import { useEffect, useState, useContext } from "react";
import { fetchNotes, deleteNotes } from "../../services/notesService";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { Link } from "react-router-dom";

/* Icons */
import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaUpload,
  FaBook,
  FaFilter,
  FaCalendarAlt,
  FaFileAlt,
  FaTrash,
  FaLayerGroup,
  FaBookmark,
  FaFilePdf,
} from "react-icons/fa";

export default function ManageNotes() {
  const { adminToken } = useContext(AdminAuthContext);
  const [notes, setNotes] = useState([]);

  const [yearFilter, setYearFilter] = useState("All");
  const [semFilter, setSemFilter] = useState("All");

  const load = async () => {
    const res = await fetchNotes(adminToken);
    setNotes(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const filteredNotes = notes.filter((n) => {
    const matchYear = yearFilter === "All" || n.year == yearFilter;
    const matchSem = semFilter === "All" || n.semester == semFilter;
    return matchYear && matchSem;
  });

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>
          <FaLayerGroup style={{ marginRight: "10px" }} />
          Admin Panel
        </h2>

        <Link to="/admin/dashboard" style={styles.link}>
          <FaHome style={styles.icon} /> Dashboard
        </Link>

        <Link to="/admin/add-student" style={styles.link}>
          <FaUserPlus style={styles.icon} /> Add Student
        </Link>

        <Link to="/admin/manage-students" style={styles.link}>
          <FaUsers style={styles.icon} /> Manage Students
        </Link>

        <Link to="/admin/upload-notes" style={styles.link}>
          <FaUpload style={styles.icon} /> Upload Notes
        </Link>

        <Link to="/admin/manage-notes" style={{ ...styles.link, ...styles.active }}>
          <FaBook style={styles.icon} /> Manage Notes
        </Link>
      </div>

      {/* Content Area */}
      <div style={styles.content}>
        <h2 style={styles.heading}>
          <FaBookmark style={{ marginRight: "10px", color: "#007bff" }} />
          Manage Notes
        </h2>

        {/* Filters */}
        <div style={styles.filterBox}>
          <FaFilter style={styles.filterIcon} />

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>
              <FaCalendarAlt /> Year
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="All">All</option>
              {[1, 2, 3, 4].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>
              <FaCalendarAlt /> Semester
            </label>
            <select
              value={semFilter}
              onChange={(e) => setSemFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="All">All</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        <div style={styles.notesContainer}>
          {filteredNotes.map((n) => (
            <div
              key={n._id}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={styles.cardTitle}>
                <FaFileAlt style={{ color: "#007bff", marginRight: "8px" }} />
                {n.title}
              </h3>

              <p style={styles.cardText}>
                <FaCalendarAlt style={{ color: "#ff9800", marginRight: "6px" }} />
                <b>Year:</b> {n.year}
              </p>

              <p style={styles.cardText}>
                <FaLayerGroup style={{ color: "#9c27b0", marginRight: "6px" }} />
                <b>Semester:</b> {n.semester}
              </p>

              <a
                href={`https://lms-back-o5uk.onrender.com/uploads/${n.file}`}
                target="_blank"
                rel="noreferrer"
                style={styles.fileLink}
                onMouseEnter={(e) => (e.target.style.color = "#004a99")}
                onMouseLeave={(e) => (e.target.style.color = "#007bff")}
              >
                <FaFilePdf style={{ marginRight: "6px" }} />
                View File →
              </a>

              <button
                style={styles.deleteBtn}
                onMouseEnter={(e) => (e.target.style.background = "#b71c1c")}
                onMouseLeave={(e) => (e.target.style.background = "#d32f2f")}
                onClick={() => deleteNotes(n._id, adminToken).then(load)}
              >
                <FaTrash style={{ marginRight: "6px" }} />
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- PREMIUM INTERNAL CSS ---------- */

const styles = {
  container: {
    display: "flex",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#eef2f7",
  },

  sidebar: {
    width: "260px",
    background: "linear-gradient(180deg, #0a0f24, #0d1131)",
    minHeight: "100vh",
    padding: "30px 22px",
    position: "fixed",
    top: 0,
    left: 0,
    color: "white",
    boxShadow: "5px 0 20px rgba(0,0,0,0.4)",
  },

  sidebarTitle: {
    fontSize: "26px",
    marginBottom: "35px",
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  link: {
    display: "flex",
    alignItems: "center",
    padding: "14px 15px",
    marginBottom: "14px",
    borderRadius: "12px",
    gap: "12px",
    textDecoration: "none",
    color: "#d4d4d4",
    fontSize: "16px",
    fontWeight: "500",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(6px)",
    transition: "0.3s",
  },

  active: {
    background: "#007bff",
    color: "white",
    fontWeight: "700",
    boxShadow: "0 4px 12px rgba(0,123,255,0.6)",
  },

  icon: { fontSize: "18px" },

  content: {
    flex: 1,
    padding: "45px",
    marginLeft: "280px",
  },

  heading: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "28px",
    color: "#1a1a1a",
  },

  filterBox: {
    display: "flex",
    alignItems: "center",
    gap: "35px",
    padding: "22px 28px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    marginBottom: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  filterIcon: { fontSize: "23px", color: "#1976d2" },

  filterItem: { display: "flex", flexDirection: "column" },

  filterLabel: {
    fontSize: "15px",
    marginBottom: "6px",
    fontWeight: "700",
  },

filterSelect: {
  padding: "10px 12px",
  fontSize: "15px",
  fontWeight: "600",
  borderRadius: "8px",
  border: "1px solid #1976d2",  // ✅ fixed
  background: "#ffffff",
  outline: "none",
  transition: "0.3s",
},

  notesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
    gap: "26px",
  },

  card: {
    background: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 12px 26px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "12px",
  },

  cardText: {
    fontSize: "15px",
    color: "#555",
    margin: "5px 0",
  },

  fileLink: {
    display: "inline-block",
    marginTop: "10px",
    marginBottom: "12px",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "700",
    transition: "0.3s",
  },

  deleteBtn: {
    background: "#c62828",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "0.3s",
  },
};
