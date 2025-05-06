import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const StudentList = ({ students, fetchStudents }) => {
    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
    };

    return (
        <ul>
            {students.map(student => (
                <li key={student.id}>
                    {student.name} - {student.course}
                    <button onClick={() => deleteStudent(student.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};
StudentList.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            course: PropTypes.string.isRequired,
        })
    ).isRequired,
    fetchStudents: PropTypes.func.isRequired,
};

export default StudentList;