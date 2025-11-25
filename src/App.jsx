import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddStudent from "./pages/Admin/AddStudent";
import ManageStudents from "./pages/Admin/ManageStudents";
import UploadNotes from "./pages/Admin/UploadNotes";
import ManageNotes from "./pages/Admin/ManageNotes";

import StudentLogin from "./pages/Student/StudentLogin";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentDetails from "./pages/Student/StudentDetails";
import StudentNotes from "./pages/Student/StudentNotes";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-student" element={<AddStudent />} />
      <Route path="/admin/manage-students" element={<ManageStudents />} />
      <Route path="/admin/upload-notes" element={<UploadNotes />} />
      <Route path="/admin/manage-notes" element={<ManageNotes />} />

      {/* Student */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/details" element={<StudentDetails />} />
      <Route path="/student/notes" element={<StudentNotes />} />
    </Routes>
  );
}

export default App;
