import { useState, useContext, useEffect } from "react";
import { studentLogin } from "../../services/studentService";
import { StudentAuthContext } from "../../context/StudentAuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaSignInAlt, FaGraduationCap, FaEnvelope, FaHome } from "react-icons/fa";

export default function StudentLogin() {
  const [form, setForm] = useState({});
  const { setStudentData } = useContext(StudentAuthContext);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const submit = async () => {
    const res = await studentLogin(form);
    if (res.data.student) {
      setStudentData(res.data.student);
      navigate("/student/dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = windowWidth < 500 ? "90%" : "380px";

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, width: cardWidth }}>
        <div style={styles.iconBackground}>
          <FaGraduationCap style={styles.bgIcon} />
          <FaEnvelope style={{ ...styles.bgIcon, right: 20, top: 15 }} />
        </div>

        <h2 style={styles.heading}>
          <FaSignInAlt style={{ marginRight: "10px", color: "#007bff" }} />
          Student Login
        </h2>

        {/* Roll Input */}
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input
            placeholder="Roll Number"
            onChange={(e) => setForm({ ...form, roll: e.target.value })}
            style={styles.input}
          />
        </div>

        {/* DOB Input */}
        <div style={styles.inputGroup}>
          <FaCalendarAlt style={styles.icon} />
          <input
            placeholder="DOB (dd-mm-yyyy)"
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            style={styles.input}
          />
        </div>

        {/* Login Button */}
        <button style={styles.button} onClick={submit}>
          <FaSignInAlt style={{ marginRight: 8 }} /> Login
        </button>

        {/* Back to Home Button */}
        <button
          style={{ ...styles.button, background: "#6c757d", marginTop: "12px" }}
          onClick={() => navigate("/")}
        >
          <FaHome style={{ marginRight: 8 }} /> Back to Home
        </button>
      </div>
    </div>
  );
}

/* ---------------- PREMIUM INTERNAL CSS ---------------- */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #c3ecf9, #c9f0ff)",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    padding: "20px",
  },
  card: {
    position: "relative",
    background: "white",
    padding: "45px 40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "default",
    maxWidth: "100%",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#333",
    textAlign: "center",
    zIndex: 2,
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
    background: "#f5f5f8",
    borderRadius: "12px",
    padding: "10px 14px",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
    transition: "0.3s",
  },
  icon: {
    marginRight: "12px",
    fontSize: "18px",
    color: "#007bff",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "10px 8px",
    fontSize: "16px",
    fontWeight: "500",
    background: "transparent",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #00b0ff)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  iconBackground: {
    position: "absolute",
    top: -40,
    right: -40,
    zIndex: 1,
  },
  bgIcon: {
    fontSize: "80px",
    color: "rgba(0,123,255,0.1)",
    position: "absolute",
    top: 20,
    left: 20,
    transform: "rotate(-15deg)",
  },
};
