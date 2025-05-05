import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [math, setMath] = useState("");
    const [science, setScience] = useState("");
    const [english, setEnglish] = useState("");

    // Optional fetch for future extension (GET route must be created in server.js)
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:3001/students"); // You'll need to implement this GET endpoint on server.js
            setStudents(res.data);
        } catch (err) {
            console.error("Failed to fetch students", err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/add", {
                name,
                math: parseInt(math),
                science: parseInt(science),
                english: parseInt(english),
            });

            alert("Student added successfully!");
            setName("");
            setMath("");
            setScience("");
            setEnglish("");
            fetchStudents(); // Refresh the list (requires GET /students to be implemented)
        } catch (err) {
            alert("Failed to add student.");
            console.error(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Student Management System</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Math</Form.Label>
                    <Form.Control
                        type="number"
                        value={math}
                        onChange={(e) => setMath(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Science</Form.Label>
                    <Form.Control
                        type="number"
                        value={science}
                        onChange={(e) => setScience(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>English</Form.Label>
                    <Form.Control
                        type="number"
                        value={english}
                        onChange={(e) => setEnglish(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button className="mt-3" type="submit">
                    Add Student
                </Button>
            </Form>

            {/* Optional student list table */}
            {students.length > 0 && (
                <div className="mt-5">
                    <h4>Student List</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Math</th>
                                <th>Science</th>
                                <th>English</th>
                                <th>Average</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.math}</td>
                                    <td>{student.science}</td>
                                    <td>{student.english}</td>
                                    <td>{student.average}</td>
                                    <td>{student.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default App;