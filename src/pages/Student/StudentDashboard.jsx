import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentAuthContext } from "../../context/StudentAuthContext";
import {
  FaUserCircle,
  FaBook,
  FaUser,
  FaCalendarAlt,
  FaIdBadge,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function StudentDashboard() {
  const { studentData, setStudentToken } = useContext(StudentAuthContext);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const handleLogout = () => {
    setStudentToken(null);
    navigate("/student/login");
  };

  return (
    <div style={styles.container}>
      {/* MOBILE HEADER */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <FaBars
            size={24}
            color="#007bff"
            onClick={() => setSidebarOpen(true)}
            style={{ cursor: "pointer" }}
          />
          <span style={{ marginLeft: 15, fontWeight: 700, fontSize: 18 }}>
            Student Dashboard
          </span>
        </div>
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          left: isMobile ? (sidebarOpen ? "0" : "-260px") : "0",
        }}
      >
        {isMobile && (
          <FaTimes
            size={22}
            color="white"
            onClick={() => setSidebarOpen(false)}
            style={{ alignSelf: "flex-end", cursor: "pointer", marginBottom: 20 }}
          />
        )}

        <h2 style={styles.sidebarTitle}>
          <FaUserCircle style={{ marginRight: "10px", color: "#fff" }} />
          Student Panel
        </h2>

        <div
          style={{ ...styles.link, ...styles.active }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
        >
          <FaBook style={styles.icon} /> My Details
        </div>

        <div
          style={styles.link}
          onClick={() => navigate("/student/notes")}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          <FaBook style={styles.icon} /> View Notes
        </div>

        {/* Logout Button */}
        <div
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={(e) => e.currentTarget.style.background = "#c82333"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#dc3545"}
        >
          <FaSignOutAlt style={styles.icon} /> Logout
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ ...styles.content, padding: isMobile ? "20px" : "40px" }}>
        <h2 style={styles.heading}>My Details</h2>

        {studentData && (
          <div style={styles.card}>
            <table style={styles.table}>
              <tbody>
                {[
                  { icon: <FaIdBadge style={{ color: "#007bff" }} />, label: "Roll Number", value: studentData.roll },
                  { icon: <FaUser style={{ color: "#28a745" }} />, label: "Name", value: studentData.name },
                  { icon: <FaCalendarAlt style={{ color: "#ffc107" }} />, label: "DOB", value: studentData.dob },
                  { icon: <FaEnvelope style={{ color: "#17a2b8" }} />, label: "Email", value: studentData.email || "Not Provided" },
                  { icon: <FaCalendarAlt style={{ color: "#6f42c1" }} />, label: "Year", value: studentData.year },
                  { icon: <FaCalendarAlt style={{ color: "#fd7e14" }} />, label: "Semester", value: studentData.semester },
                ].map((item, index) => (
                  <tr
                    key={index}
                    style={{
                      ...styles.tableRow,
                      backgroundColor: index % 2 === 0 ? "#f9fafc" : "#eef2f7",
                    }}
                  >
                    <td style={styles.tdIcon}>{item.icon}</td>
                    <td style={styles.tdLabel}>{item.label}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    fontFamily: "Poppins, sans-serif",
    background: "#eef2f7",
    minHeight: "100vh",
    position: "relative",
  },
  mobileHeader: {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    background: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  sidebar: {
    width: "250px",
    background: "linear-gradient(180deg, #4a90e2, #007bff)",
    padding: "30px 20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    transition: "left 0.3s",
    position: "fixed",
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
    textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    padding: "12px 15px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  active: {
    background: "rgba(255,255,255,0.25)",
    fontWeight: "700",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    padding: "12px 15px",
    borderRadius: "10px",
    background: "#dc3545", // red
    cursor: "pointer",
    marginTop: "auto", // stick at bottom
    fontWeight: 700,
    transition: "all 0.3s",
  },
  icon: { fontSize: "18px" },
  content: {
    flex: 1,
    padding: "40px",
    marginLeft: 250,
    transition: "margin 0.3s",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    background: "linear-gradient(to right, #007bff, #00b0ff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    transition: "all 0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    transition: "all 0.2s",
  },
  tdIcon: {
    padding: "12px",
    background: "#f4f6f9",
    textAlign: "center",
    width: "50px",
    fontSize: "18px",
    borderRadius: "8px 0 0 8px",
  },
  tdLabel: {
    padding: "12px",
    fontWeight: "600",
    width: "160px",
  },
};
