/* ---------- Student Dashboard ---------- */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentAuthContext } from "../../context/StudentAuthContext";
import { getStudentNotes, submitStudentRequest } from "../../services/studentService";
import {
  FaIdBadge,
  FaUser,
  FaCalendarAlt,
  FaBuilding,
  FaBook,
  FaDownload,
  FaEye,
  FaHome,
  FaArrowRight
} from "react-icons/fa";

export default function StudentDashboard() {
  const { studentData } = useContext(StudentAuthContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [filterType, setFilterType] = useState("filtered");
  const [loading, setLoading] = useState(false);
  const [requestText, setRequestText] = useState("");

  useEffect(() => {
    if (!studentData) navigate("/student/login");
  }, [studentData, navigate]);

  if (!studentData) return <div style={{ padding: 20 }}>Loading...</div>;

  const infoItems = [
    { icon: <FaIdBadge />, label: "Roll Number", value: studentData.roll },
    { icon: <FaUser />, label: "Name", value: studentData.name },
    { icon: <FaBuilding />, label: "Department", value: studentData.department },
    { icon: <FaCalendarAlt />, label: "DOB", value: studentData.dob },
    { icon: <FaCalendarAlt />, label: "Year", value: studentData.year },
    { icon: <FaCalendarAlt />, label: "Semester", value: studentData.semester },
  ];

  // Fetch notes
  const handleViewNotes = async () => {
    setLoading(true);
    try {
      let res;
      if (filterType === "all") {
        res = await getStudentNotes(studentData.roll, "all", "all");
      } else {
        if (!year || !semester) {
          alert("Please enter both Year and Semester!");
          setLoading(false);
          return;
        }
        res = await getStudentNotes(studentData.roll, year, semester);
      }
      setNotes(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch notes!");
    }
    setLoading(false);
  };

  // Submit request to backend
  const handleSubmitRequest = async () => {
    if (!requestText.trim()) {
      alert("Please enter a request message.");
      return;
    }

    try {
      const res = await submitStudentRequest(studentData.roll, requestText);
      if (res.data?.message) alert(res.data.message);
      setRequestText(""); // clear textarea
    } catch (err) {
      console.error(err);
      alert("Failed to submit request. Try again.");
    }
  };

  return (
    <div style={styles.outerContainer}>
      {/* ---------- Welcome Message ---------- */}
      <div style={styles.welcomeMsg}>
        Welcome, <span style={styles.studentName}>{studentData.name}</span>!
      </div>

      <div style={styles.container}>
        {/* ---------- Left Column: Student Info ---------- */}
        <div style={styles.leftColumn}>
          <h2 style={styles.heading}>My Details</h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <tbody>
                {infoItems.map((item, idx) => (
                  <tr key={idx} style={styles.tableRow}>
                    <td style={styles.iconCell}>{item.icon}</td>
                    <td style={styles.labelCell}>{item.label}</td>
                    <td style={styles.valueCell}>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- Right Column: Notes ---------- */}
        <div style={styles.rightColumn}>
          <h2 style={styles.heading}>
            <FaBook style={{ marginRight: 8 }} /> My Notes
          </h2>

          <div style={styles.filters}>
            <select
              style={styles.input}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="filtered">Filter by Year & Semester</option>
              <option value="all">All Notes</option>
            </select>

            {filterType === "filtered" && (
              <>
                <input
                  type="number"
                  placeholder="Year (1-4)"
                  style={styles.input}
                  value={year}
                  min="1"
                  max="4"
                  onChange={(e) => setYear(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Semester (1-8)"
                  style={styles.input}
                  value={semester}
                  min="1"
                  max="8"
                  onChange={(e) => setSemester(e.target.value)}
                />
              </>
            )}

            <button style={styles.viewBtn} onClick={handleViewNotes}>
              {loading ? "Loading..." : "View Notes"}
            </button>
          </div>

          {/* ---------- Actions ---------- */}
          <div style={styles.actions}>
            <button style={styles.homeBtn} onClick={() => navigate("/")}>
              <FaHome style={{ marginRight: 6 }} /> Back to Home
            </button>

            {studentData.isAdmin && (
              <button style={styles.adminBtn} onClick={() => navigate("/admin/dashboard")}>
                <FaArrowRight style={{ marginRight: 6 }} /> Go to Admin Dashboard
              </button>
            )}
          </div>

          {/* ---------- Notes List ---------- */}
          {notes.length === 0 && !loading ? (
            <p style={{ color: "#6c757d", marginTop: 20 }}>No notes found.</p>
          ) : (
            <div style={styles.notesList}>
              {notes.map((n) => (
                <div key={n._id} style={styles.noteCard}>
                  <span style={styles.noteTitle}>
                    <FaBook style={{ marginRight: 6, color: "#007bff" }} /> {n.title}
                  </span>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a
                      href={`https://lms-server-17tl.onrender.com/uploads/${n.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.viewBtnSmall}
                    >
                      <FaEye /> View
                    </a>
                    <a
                      href={`https://lms-server-17tl.onrender.com/uploads/${n.file}`}
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

          {/* ---------- Notes Request Section ---------- */}
          <div style={styles.requestSection}>
            <h3 style={styles.requestHeading}>Request New Notes</h3>
            <textarea
              placeholder="Enter your request here..."
              style={styles.textarea}
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
            ></textarea>
            <button style={styles.requestBtn} onClick={handleSubmitRequest}>
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------- STYLES ----------- */


const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(145deg, #e0e7ff, #f8f9fa)",
    minHeight: "100vh",
    padding: "40px 20px",
    transition: "0.5s",
    animation: "fadeIn 1s ease-in-out",
    fontFamily: "'Poppins', sans-serif",
  },
  welcomeMsg: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 30,
    textAlign: "center",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },
  studentName: {
    fontWeight: 900,
    fontSize: 30,
    background: "linear-gradient(90deg, #28a745, #5cd65c)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  container: {
    display: "flex",
    gap: 30,
    maxWidth: 1200,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  leftColumn: {
    flex: "1 1 350px",
    maxWidth: 400,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    padding: 30,
    transition: "0.5s",
  },
  rightColumn: {
    flex: "2 1 600px",
    minWidth: 300,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    padding: 30,
    transition: "0.5s",
    overflowY: "auto",
    maxHeight: "80vh",
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 25,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "linear-gradient(90deg,#007bff,#00c6ff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    letterSpacing: 0.5,
  },
  tableContainer: {
    width: "100%",
    background: "rgba(248,249,255,0.9)",
    borderRadius: 20,
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "0.3s",
  },
  tableRow: {
    borderBottom: "1px solid #e6e6e6",
    cursor: "default",
    transition: "0.3s",
    "&:hover": {
      background: "#f1f6ff",
      transform: "scale(1.02)",
    },
  },
  iconCell: {
    padding: "12px",
    fontSize: 22,
    color: "#007bff",
    textAlign: "center",
    background: "rgba(0,123,255,0.1)",
    width: 50,
    borderRadius: 12,
  },
  labelCell: { padding: "12px", fontWeight: 600, color: "#6c757d", width: "40%" },
  valueCell: { padding: "12px", fontWeight: 700, color: "#343a40" },
  filters: { display: "flex", gap: "12px", marginBottom: "25px", flexWrap: "wrap", alignItems: "center" },
  input: {
    padding: "10px 15px",
    borderRadius: "16px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "180px",
    outline: "none",
    transition: "0.3s",
    "&:focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 8px rgba(0,123,255,0.3)",
    },
  },
  viewBtn: {
    padding: "10px 24px",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    color: "#fff",
    border: "none",
    borderRadius: "18px",
    cursor: "pointer",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 8,
    transition: "0.4s",
    "&:hover": {
      transform: "translateY(-4px) scale(1.05)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
    },
  },
  actions: { display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" },
  homeBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 22px",
    background: "linear-gradient(90deg, #28a745, #5cd65c)",
    color: "#fff",
    border: "none",
    borderRadius: 18,
    cursor: "pointer",
    fontWeight: 700,
    transition: "0.4s",
    "&:hover": {
      transform: "translateY(-3px) scale(1.04)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
    },
  },
  adminBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 22px",
    background: "linear-gradient(90deg, #ffc107, #ffdb4d)",
    color: "#fff",
    border: "none",
    borderRadius: 18,
    cursor: "pointer",
    fontWeight: 700,
    transition: "0.4s",
    "&:hover": {
      transform: "translateY(-3px) scale(1.04)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
    },
  },
  notesList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 20,
    overflowY: "auto",
    paddingRight: 5,
    scrollbarWidth: "thin",
    scrollbarColor: "#007bff #e0e7ff",
  },
  noteCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "22px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
    transition: "0.5s",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-6px) scale(1.05)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    },
  },
  noteTitle: { fontSize: "16px", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#007bff" },
  downloadBtn: { display: "flex", alignItems: "center", gap: "6px", background: "#007bff", color: "#fff", padding: "8px 14px", borderRadius: 14, textDecoration: "none", fontWeight: 600, transition: "0.3s", "&:hover": { background: "#0056b3" } },
  viewBtnSmall: { display: "flex", alignItems: "center", gap: "6px", background: "#28a745", color: "#fff", padding: "8px 14px", borderRadius: 14, textDecoration: "none", fontWeight: 600, transition: "0.3s", "&:hover": { background: "#1e7e34" } },
  requestSection: {
    marginTop: 30,
    padding: 24,
    borderRadius: 24,
    background: "rgba(240,248,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    transition: "0.4s",
  },
  requestHeading: { fontSize: 20, fontWeight: 700, color: "#007bff" },
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 14,
    borderRadius: 16,
    border: "1px solid #ccc",
    resize: "none",
    fontSize: 14,
    outline: "none",
    transition: "0.3s",
    "&:focus": { borderColor: "#007bff", boxShadow: "0 0 10px rgba(0,123,255,0.3)" },
  },
  requestBtn: {
    padding: "14px 28px",
    background: "linear-gradient(90deg, #28a745, #5cd65c)",
    color: "#fff",
    border: "none",
    borderRadius: 18,
    cursor: "pointer",
    fontWeight: 700,
    alignSelf: "flex-start",
    transition: "0.4s",
    "&:hover": { transform: "translateY(-4px) scale(1.05)", boxShadow: "0 12px 28px rgba(0,0,0,0.25)" },
  },
  "@media(max-width:900px)": {
    container: { flexDirection: "column", gap: 25 },
    rightColumn: { width: "100%", minWidth: "auto" },
    leftColumn: { width: "100%", minWidth: "auto" },
  }
};
