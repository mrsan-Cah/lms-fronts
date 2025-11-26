import { useState, useContext, useEffect } from "react";
import { studentLogin } from "../../services/studentService";
import { StudentAuthContext } from "../../context/StudentAuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaSignInAlt,
  FaGraduationCap,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

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

  const cardWidth =
    windowWidth < 420
      ? "92%"
      : windowWidth < 768
      ? "380px"
      : windowWidth < 1024
      ? "420px"
      : "450px";

  return (
    <div style={styles.container}>
      {/* Responsive Glow Backgrounds */}
      <div style={{ ...styles.glow1, width: windowWidth < 500 ? "250px" : "400px", height: windowWidth < 500 ? "250px" : "400px" }}></div>
      <div style={{ ...styles.glow2, width: windowWidth < 500 ? "250px" : "400px", height: windowWidth < 500 ? "250px" : "400px" }}></div>

      <div style={{ ...styles.card, width: cardWidth }}>
        <div style={styles.iconBackground}>
          <FaGraduationCap style={styles.bgIcon} />
          <FaEnvelope style={{ ...styles.bgIcon, right: 15, top: 25 }} />
        </div>

        <h2
          style={{
            ...styles.heading,
            fontSize: windowWidth < 480 ? "26px" : windowWidth < 768 ? "30px" : "32px",
          }}
        >
          <FaSignInAlt style={{ marginRight: "10px" }} />
          Student Login
        </h2>

        {/* Roll Number */}
        <div
          style={{
            ...styles.inputGroup,
            padding: windowWidth < 480 ? "10px 12px" : "12px 16px",
          }}
        >
          <FaUser style={{ ...styles.icon, fontSize: windowWidth < 480 ? "16px" : "18px" }} />
          <input
            placeholder="Roll Number"
            onChange={(e) => setForm({ ...form, roll: e.target.value })}
            style={{ ...styles.input, fontSize: windowWidth < 480 ? "14px" : "16px" }}
          />
        </div>

        {/* DOB */}
        <div
          style={{
            ...styles.inputGroup,
            padding: windowWidth < 480 ? "10px 12px" : "12px 16px",
          }}
        >
          <FaCalendarAlt
            style={{ ...styles.icon, fontSize: windowWidth < 480 ? "16px" : "18px" }}
          />
          <input
            placeholder="DOB (dd-mm-yyyy)"
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            style={{ ...styles.input, fontSize: windowWidth < 480 ? "14px" : "16px" }}
          />
        </div>

        {/* Login Button */}
        <button
          style={{
            ...styles.button,
            fontSize: windowWidth < 480 ? "15px" : "17px",
            padding: windowWidth < 480 ? "12px" : "14px",
          }}
          onClick={submit}
        >
          <FaSignInAlt style={{ marginRight: 8 }} /> Login
        </button>

        {/* Back Button */}
        <button
          style={{
            ...styles.buttonSecondary,
            fontSize: windowWidth < 480 ? "14px" : "16px",
            padding: windowWidth < 480 ? "12px" : "14px",
          }}
          onClick={() => navigate("/")}
        >
          <FaHome style={{ marginRight: 8 }} /> Back to Home
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES (Responsive Ready) ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #9be2ff, #e0f7ff, #b6e4ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: "15px",
    fontFamily: "Poppins, sans-serif",
  },

  glow1: {
    position: "absolute",
    background: "#00c6ff",
    filter: "blur(180px)",
    top: "-20%",
    left: "-15%",
    opacity: 0.6,
  },

  glow2: {
    position: "absolute",
    background: "#007bff",
    filter: "blur(180px)",
    bottom: "-20%",
    right: "-15%",
    opacity: 0.5,
  },

  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(18px)",
    borderRadius: "24px",
    padding: "45px 35px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.35)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  heading: {
    fontWeight: "700",
    background: "linear-gradient(90deg, #007bff, #00b7ff)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: "30px",
    letterSpacing: 0.7,
    textAlign: "center",
  },

  inputGroup: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "18px",
    background: "rgba(255,255,255,0.35)",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  icon: {
    marginRight: "12px",
    color: "#007bff",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#003a61",
    fontWeight: "500",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #007bff, #00c6ff, #009dff)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },

  buttonSecondary: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    transition: "0.3s",
  },

  iconBackground: {
    position: "absolute",
    top: -40,
    right: -20,
    opacity: 0.15,
  },

  bgIcon: {
    position: "absolute",
    fontSize: "85px",
    color: "rgba(0,123,255,0.25)",
    animation: "floating 6s ease-in-out infinite",
  },
};
