import { useContext } from "react";
import { StudentAuthContext } from "../../context/StudentAuthContext";

export default function StudentDetails() {
  const { studentData } = useContext(StudentAuthContext);

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {studentData?.name}</p>
      <p>Roll: {studentData?.roll}</p>
      <p>DOB: {studentData?.dob}</p>
      <p>Year: {studentData?.year}</p>
      <p>Semester: {studentData?.semester}</p>
    </div>
  );
}
