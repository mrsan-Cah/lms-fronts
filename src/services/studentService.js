import axios from "axios";

const API = "https://lms-server-17tl.onrender.com/api/student";

// Student Login
export const studentLogin = (data) =>
  axios.post(`${API}/login`, data);

// Fetch Student Details
export const getStudentDetails = (roll) =>
  axios.get(`${API}/details/${roll}`);

// Fetch Notes for Student
export const getStudentNotes = (roll) =>
  axios.get(`${API}/notes/${roll}`);

// ★ NEW — Submit Request (Fixes your error)
export const submitStudentRequest = (data) =>
  axios.post(`${API}/request`, data);

// ★ NEW — Get All Requests for this Student
export const getMyRequests = (roll) =>
  axios.get(`${API}/my-requests/${roll}`);
