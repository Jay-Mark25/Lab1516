const express = require("express");
const db = require("../config/database");
const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { name, course } = req.body;
    if (!name || !course) return res.status(400).json({ error: "Both fields are required" });

    const sql = "INSERT INTO students (name, course) VALUES (?, ?)";
    db.query(sql, [name, course], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, course });
    });
});

router.put("/:id", (req, res) => {
    const { name, course } = req.body;
    const sql = "UPDATE students SET name = ?, course = ? WHERE id = ?";
    db.query(sql, [name, course, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Student updated" });
    });
});

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Student deleted" });
    });
});

module.exports = router;