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
  FaBuilding,
  FaFileDownload,
  FaFolderOpen,
  FaGraduationCap,
  FaListUl
} from "react-icons/fa";

export default function ManageNotes() {
  const { adminToken } = useContext(AdminAuthContext);
  const [notes, setNotes] = useState([]);

  const [departmentFilter, setDepartmentFilter] = useState("All");
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
    const matchDept = departmentFilter === "All" || n.department === departmentFilter;
    const matchYear = yearFilter === "All" || n.year == yearFilter;
    const matchSem = semFilter === "All" || n.semester == semFilter;
    return matchDept && matchYear && matchSem;
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

      {/* Content */}
      <div style={styles.content}>
        <h2 style={styles.heading}>
          <FaBookmark style={{ marginRight: "10px", color: "#007bff" }} />
          Manage Notes
        </h2>

        {/* Filters */}
        <div style={styles.filterBox}>
          <FaFilter style={styles.filterIcon} />

          {/* Department Filter */}
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>
              <FaBuilding /> Department
            </label>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="All">All</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="EEE">EEE</option>
              <option value="AIDS">AIDS</option>
              <option value="CIVIL">CIVIL</option>
              <option value="AIML">AIML</option>
              <option value="S&H">S&H</option>
            </select>
          </div>

          {/* Year Filter */}
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>
              <FaGraduationCap /> Year
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

          {/* Semester Filter */}
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>
              <FaListUl /> Semester
            </label>
            <select
              value={semFilter}
              onChange={(e) => setSemFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="All">All</option>
              {[1,2,3,4,5,6,7,8].map((s)=>(
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes Grid */}
        <div style={styles.notesContainer}>
          {filteredNotes.map((n) => (
            <div key={n._id} style={styles.card}>

              <h3 style={styles.cardTitle}>
                <FaFileAlt style={{ color: "#007bff", marginRight: "8px" }} />
                {n.title}
              </h3>

              <p style={styles.cardText}>
                <b>Department:</b> {n.department}
              </p>

              <p style={styles.cardText}>
                <b>Year:</b> {n.year}
              </p>

              <p style={styles.cardText}>
                <b>Semester:</b> {n.semester}
              </p>

              {/* View File */}
              <a
                href={`https://lms-server-17tl.onrender.com/uploads/${n.file}`}
                target="_blank"
                rel="noreferrer"
                style={styles.fileLink}
              >
                <FaFolderOpen /> Open File
              </a>

              {/* Download File */}
              <a
                href={`https://lms-server-17tl.onrender.com/uploads/${n.file}`}
                download
                style={styles.downloadBtn}
              >
                <FaFileDownload /> Download
              </a>

              {/* Delete */}
              <button
                style={styles.deleteBtn}
                onClick={() => deleteNotes(n._id, adminToken).then(load)}
              >
                <FaTrash /> Delete
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
    background: "linear-gradient(180deg, #0a0f24, #0e1a40)",
    minHeight: "100vh",
    padding: "32px 22px",
    position: "fixed",
    top: 0,
    left: 0,
    color: "white",
    boxShadow: "6px 0 25px rgba(0,0,0,0.45)",
  },

  sidebarTitle: {
    fontSize: "26px",
    marginBottom: "40px",
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: "1px",
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
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(6px)",
    transition: "0.3s",
  },

  active: {
    background: "#007bff",
    color: "white",
    fontWeight: "700",
    boxShadow: "0 4px 14px rgba(0,123,255,0.7)",
  },

  icon: { fontSize: "20px" },

  content: {
    flex: 1,
    padding: "45px",
    marginLeft: "280px",
  },

  heading: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "30px",
    color: "#1a1a1a",
  },

  filterBox: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    padding: "22px 28px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    marginBottom: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  filterIcon: { fontSize: "25px", color: "#1976d2" },

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
    border: "1px solid #1976d2",
    background: "white",
    outline: "none",
    cursor: "pointer",
    transition: "0.3s",
  },

  notesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "26px",
  },

  card: {
    background: "white",
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
    transition: "0.3s",
    borderLeft: "6px solid #007bff",
  },

  cardTitle: {
    fontSize: "21px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "12px",
  },

  cardText: {
    fontSize: "15px",
    color: "#444",
    margin: "5px 0",
  },

  fileLink: {
    display: "inline-block",
    padding: "10px",
    marginTop: "12px",
    background: "#eef4ff",
    color: "#007bff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "700",
    transition: "0.3s",
  },

  downloadBtn: {
    display: "inline-block",
    padding: "10px",
    marginTop: "10px",
    background: "#d1ffd1",
    color: "green",
    borderRadius: "8px",
    fontWeight: "700",
    textDecoration: "none",
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
    marginTop: "14px",
    transition: "0.3s",
  },
};
