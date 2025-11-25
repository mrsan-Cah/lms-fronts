import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaUpload, FaBook, FaSignOutAlt, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ---------- Internal CSS ----------
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "#e7ecf1",
  };

  const sidebarStyle = {
    width: "270px",
    background: "linear-gradient(180deg, #ff416c, #ff4b2b)",
    color: "white",
    padding: "35px 25px",
    boxShadow: "4px 0 18px rgba(0,0,0,0.18)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const sidebarTop = {
    display: "flex",
    flexDirection: "column",
  };

  const sidebarTitle = {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "35px",
    textAlign: "center",
    textShadow: "0 4px 10px rgba(0,0,0,0.3)",
    letterSpacing: "1px",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    margin: "10px 0",
    borderRadius: "12px",
    textDecoration: "none",
    background: "rgba(255,255,255,0.18)",
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
    transition: "0.35s",
  };

  const logoutBtn = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 18px",
    textAlign: "center",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.25)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  };

  const contentStyle = {
    marginLeft: "320px",
    padding: "50px",
    flexGrow: 1,
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#222",
    textShadow: "0 2px 4px rgba(0,0,0,0.15)",
  };

  const card = {
    background: "white",
    padding: "30px",
    borderRadius: "22px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    animation: "fadeSlide 1s ease",
    maxWidth: "650px",
    borderLeft: "5px solid #ff416c",
  };

  return (
    <div style={layoutStyle}>
      {/* Additional CSS Animations */}
      <style>
        {`
          a:hover {
            background: rgba(255,255,255,0.38) !important;
            transform: translateX(10px) scale(1.03);
            box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          }

          #logout:hover {
            background: rgba(255,255,255,0.45) !important;
            transform: scale(1.07);
            box-shadow: 0 6px 18px rgba(0,0,0,0.28);
          }

          @keyframes fadeSlide {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fadeIn {
            animation: fadeSlide 0.9s ease;
          }
        `}
      </style>

      {/* Sidebar */}
      <div style={sidebarStyle} className="fadeIn">

        {/* Top Menu */}
        <div style={sidebarTop}>
          <div style={sidebarTitle}>
            <FaCog style={{ marginRight: "8px", fontSize: "24px" }} />  
            Admin Panel
          </div>

          <Link style={linkStyle} to="/admin/add-student">
            <FaUserPlus size={20} /> Add Student
          </Link>

          <Link style={linkStyle} to="/admin/manage-students">
            <FaUsers size={20} /> Manage Students
          </Link>

          <Link style={linkStyle} to="/admin/upload-notes">
            <FaUpload size={20} /> Upload Notes
          </Link>

          <Link style={linkStyle} to="/admin/manage-notes">
            <FaBook size={20} /> Manage Notes
          </Link>
        </div>

        {/* Logout Button */}
        <div id="logout" style={logoutBtn} onClick={logout}>
          <FaSignOutAlt size={20} /> Logout
        </div>

      </div>

      {/* Dashboard Content */}
      <div style={contentStyle} className="fadeIn">
        <h2 style={titleStyle}>Welcome to Admin Dashboard</h2>

        <div style={card}>
          <p style={{ fontSize: "18px", color: "#444", lineHeight: "1.7" }}>
            Use the sidebar to manage students, upload notes, and control the 
            entire Notes Organizer System.  
            <br /><br />
            You can add students, delete students, upload study materials,
            and easily manage all notes in one place using the powerful 
            admin dashboard.
          </p>
        </div>
      </div>

    </div>
  );
}
