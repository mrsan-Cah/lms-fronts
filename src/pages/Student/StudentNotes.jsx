import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentAuthContext } from "../../context/StudentAuthContext";
import { getStudentNotes } from "../../services/studentService";
import { FaBook, FaDownload, FaEye, FaCalendarAlt, FaLayerGroup, FaHome } from "react-icons/fa";

export default function StudentNotes() {
  const { studentData } = useContext(StudentAuthContext);
  const [notes, setNotes] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleViewNotes = async () => {
    if (!year || !semester) {
      alert("Please select both Year and Semester!");
      return;
    }
    setLoading(true);
    try {
      const res = await getStudentNotes(studentData.roll, year, semester);
      setNotes(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch notes!");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>
          <FaBook style={{ marginRight: 8 }} /> My Notes
        </h2>
        <button style={styles.dashboardBtn} onClick={() => navigate("/student/dashboard")}>
          <FaHome style={{ marginRight: 6 }} /> Dashboard
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterItem}>
          <FaCalendarAlt style={{ marginRight: 5 }} />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.filterItem}>
          <FaLayerGroup style={{ marginRight: 5 }} />
          <input
            type="number"
            min="1"
            max="2"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            style={styles.input}
          />
        </div>
        <button style={styles.viewBtn} onClick={handleViewNotes}>
          {loading ? "Loading..." : "View Notes"}
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 && !loading ? (
        <p>No notes found for selected Year & Semester.</p>
      ) : (
        <div style={styles.notesList}>
          {notes.map((n) => (
            <div key={n._id} style={styles.noteCard}>
              <span style={styles.noteTitle}>
                <FaBook style={{ marginRight: 6 }} /> {n.title}
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={`https://lms-back-o5uk.onrender.com/uploads/${n.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.viewBtnSmall}
                >
                  <FaEye /> View
                </a>
                <a
                  href={`https://lms-back-o5uk.onrender.com/uploads/${n.file}`}
                  download
                  style={styles.downloadBtn}
                >
                  <FaDownload /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px", fontFamily: "Poppins, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  heading: { fontSize: "26px", fontWeight: 700, display: "flex", alignItems: "center", color: "#007bff" },
  dashboardBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#17a2b8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.3s"
  },
  filters: { display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" },
  filterItem: { display: "flex", alignItems: "center", background: "#f4f6f9", padding: "8px 12px", borderRadius: "10px", gap: "5px" },
  input: { width: "80px", padding: "5px 8px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
  viewBtn: { padding: "8px 15px", background: "#007bff", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, transition: "0.3s" },
  notesList: { display: "flex", flexDirection: "column", gap: "15px" },
  noteCard: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", borderRadius: "12px", background: "#fff", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" },
  noteTitle: { fontSize: "16px", fontWeight: 600, display: "flex", alignItems: "center" },
  downloadBtn: { display: "flex", alignItems: "center", gap: "5px", background: "#007bff", color: "#fff", padding: "8px 12px", borderRadius: "8px", textDecoration: "none", fontWeight: 600, transition: "0.3s" },
  viewBtnSmall: { display: "flex", alignItems: "center", gap: "5px", background: "#28a745", color: "#fff", padding: "8px 12px", borderRadius: "8px", textDecoration: "none", fontWeight: 600, transition: "0.3s" },
};
