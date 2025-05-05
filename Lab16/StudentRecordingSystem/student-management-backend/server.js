const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/students");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SchoolDB",
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed: " + err.stack);
        process.exit(1); // Stop server if DB fails
    }
    console.log("✅ Connected to MySQL database.");
});

app.get("/", (req, res) => {
    res.send("🎉 API is running...");
});

app.post("/add", (req, res) => {
    const { name, math, science, english } = req.body;
    if (!name || math == null || science == null || english == null) {
        return res.status(400).json({ error: "All fields (name, math, science, english) are required." });
    }

    const average = parseFloat(((math + science + english) / 3).toFixed(2));
    let grade;
    if (average >= 90) {
        grade = "A";
    } else if (average >= 80) {
        grade = "B";
    } else if (average >= 70) {
        grade = "C";
    } else {
        grade = "D";
    }

    const sql = "INSERT INTO Students (name, math, science, english, average, grade) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, math, science, english, average, grade], (err, result) => {
        if (err) {
            console.error("❌ Failed to insert student:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "✅ Student added successfully!" });
    });
});