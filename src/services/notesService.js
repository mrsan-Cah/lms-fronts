import axios from "axios";

const API = "https://lms-back-o5uk.onrender.com/api/notes";

export const uploadNotes = (formData, token) =>
  axios.post(`${API}/upload`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchNotes = (token) =>
  axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteNotes = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
