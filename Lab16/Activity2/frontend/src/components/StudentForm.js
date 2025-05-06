import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const StudentForm = ({ fetchStudents }) => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !course) {
            alert("Both fields are required.");
            return;
        }
        await axios.post("http://localhost:5000/api/students", { name, course });
        fetchStudents();
        setName("");
        setCourse("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
            <button type="submit">Add Student</button>
        </form>
    );
};
StudentForm.propTypes = {
    fetchStudents: PropTypes.func.isRequired,
};

export default StudentForm;
