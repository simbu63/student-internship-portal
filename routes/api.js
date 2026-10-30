const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

const internships = [
  {
    id: "1",
    title: "Web Development Intern",
    company: "Tech Solutions",
    duration: "3 Months",
    location: "Remote",
    description:
      "Learn React, Node.js, Express, and modern web development."
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataWorks",
    duration: "2 Months",
    location: "Hybrid",
    description:
      "Explore data analysis, Python, and machine learning."
  },
  {
    id: "3",
    title: "Java Developer Intern",
    company: "CodeTech",
    duration: "3 Months",
    location: "On-site",
    description:
      "Develop Java programming and object-oriented programming skills."
  },
  {
    id: "4",
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    duration: "2 Months",
    location: "Remote",
    description:
      "Learn user interface design, user experience, and prototyping."
  }
];

router.get("/internships", (req, res) => {
  res.json(internships);
});

router.get("/internships/:id", (req, res) => {
  const internship = internships.find(
    (item) => item.id === req.params.id
  );

  if (!internship) {
    return res.status(404).json({
      message: "Internship not found"
    });
  }

  res.json(internship);
});

router.post("/applications", async (req, res) => {
  try {
    const { name, email, rollNumber, internship } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof rollNumber !== "string" ||
      typeof internship !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !rollNumber.trim() ||
      !internship.trim()
    ) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must contain at least 2 characters"
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        message: "Please provide a valid email address"
      });
    }

    const selectedInternship = internships.find(
      (item) => item.title === internship.trim()
    );

    if (!selectedInternship) {
      return res.status(400).json({
        message: "Please select an available internship"
      });
    }

    const application = await Application.create({
      name: name.trim(),
      email: email.trim(),
      rollNumber: rollNumber.trim(),
      internship: selectedInternship.title
    });

    return res.status(201).json({
      message: "Application submitted successfully!",
      application
    });
  } catch (error) {
    console.error("Application submission error:", error.message);

    return res.status(500).json({
      message: "Unable to submit the application"
    });
  }
});

router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1
    });

    return res.json(applications);
  } catch (error) {
    console.error("Application retrieval error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve applications"
    });
  }
});

module.exports = router;