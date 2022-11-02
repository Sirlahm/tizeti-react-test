import React, { useState } from "react";
import { STUDENTS } from "../studentsList";

function Search({ setErrorMsg, setVerifiedStudents, verifiedStudents }) {
  const studentList_ = STUDENTS;
  const [studentDetails, setStudentDetails] = useState({
    studentName: "",
    joiningDate: "",
  });

  const verifyStudent = studentList_.find(
    (student_) =>
      student_.name.toLocaleLowerCase() ===
      studentDetails.studentName.toLocaleLowerCase()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !studentDetails.studentName.length ||
      !studentDetails.joiningDate.length
    ) {
      alert("Student Name or Joining Date cannot be empty!");
      return;
    }
    checkValidity(studentDetails.joiningDate, "");
  };

  function checkValidity(joiningDate, validityDate) {
    let studentObj = "";

    if (verifyStudent === undefined) {
      setStudentDetails({
        studentName: "",
        joiningDate: "",
      });
      setErrorMsg(
        `Sorry, ${studentDetails.studentName} is not a verified student!`
      );
      return;
    } else {
      studentObj = verifyStudent;
    }

    validityDate = verifyStudent.validityDate;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [year, month, day] = joiningDate.split("-");
    const [yyyy, mm, dd] = validityDate.split("-");
    const maxValid = new Date(yyyy, mm - 1, dd);
    const selected = new Date(year, month - 1, day);

    if (!(maxValid >= selected && maxValid >= today)) {
      setStudentDetails({
        studentName: "",
        joiningDate: "",
      });
      setErrorMsg(`Sorry, ${studentObj.name}'s validity has Expired!`);
      return;
    } else {
      setStudentDetails({
        studentName: "",
        joiningDate: "",
      });
      setErrorMsg("");
      setVerifiedStudents([...verifiedStudents, studentObj]);
    }
  }

  const handleChange = (e) => {
    setStudentDetails({ ...studentDetails, [e.target.id]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-50 layout-row align-items-end justify-content-end">
        <label htmlFor="studentName">
          Student Name:
          <div>
            <input
              id="studentName"
              onChange={handleChange}
              data-testid="studentName"
              type="text"
              className="mr-30 mt-10"
              value={studentDetails.studentName}
            />
          </div>
        </label>
        <label htmlFor="joiningDate">
          Joining Date:
          <div>
            <input
              id="joiningDate"
              onChange={handleChange}
              data-testid="joiningDate"
              type="date"
              className="mr-30 mt-10"
              value={studentDetails.joiningDate}
            />
          </div>
        </label>
        <button type="submit"
         data-testid="addBtn" className="small mb-0">
          Add
        </button>
      </div>
    </form>
  );
}

export default Search;
