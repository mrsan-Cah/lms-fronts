import axios from "axios";

const API = "https://lms-server-17tl.onrender.com/api/admin";

export const adminLogin = (data) => axios.post(`${API}/login`, data);
export const adminRegister = (data) => axios.post(`${API}/register`, data);

export const addStudent = (data, token) =>
  axios.post(`${API}/student`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchStudents = (token) =>
  axios.get(`${API}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStudent = (id, data, token) =>
  axios.put(`${API}/student/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteStudent = (id, token) =>
  axios.delete(`${API}/student/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
