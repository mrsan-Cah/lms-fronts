import axios from "axios";

const API = "https://lms-back-o5uk.onrender.com/api/student";

export const studentLogin = (data) => axios.post(`${API}/login`, data);

export const getStudentDetails = (roll) =>
  axios.get(`${API}/details/${roll}`);

export const getStudentNotes = (roll) =>
  axios.get(`${API}/notes/${roll}`);
