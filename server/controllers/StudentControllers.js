import Student from "../models/StudentModels.js";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {validationResult} from 'express-validator'
const router = express.Router();
export const getAllStudents = async (req, res) => {
  try {
    const Students = await Student.find();

    res.status(200).json({
      message:'All student list',
      data: Students
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentByID = async (req, res) => {
  const { id } = req.params.id;
  try {
    const student = await Student.findOne(id);

    res.status(200).json({
      message : 'student with this ID',
      data : student
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  const { name, firstname, email, grade, age, branch, skills } = req.body;
  const image = req.file.path;
  if (!req.file) {
    const err = new Error("no img uploaded!!!");
    err.errorStatus = 422;
  }
  try {
    Student.create({
      name: name,
      firstname: firstname,
      email: email,
      grade: grade,
      age: age,
      branch: branch,
      skills: skills,
      img: image,
    });
    res.status(201).json({
      message: "gg",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//fonction pour supp img
const deletePics = (filePath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  filePath = path.join(__dirname, "../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
//fin fonction
export const deleteStudent = async (req, res, next) => {
  const id = req.params.id;

  Student.findById(id)
    .then((student) => {
      if (!student) {
        const error = new Error("no student with this id !!!!");
        error.errorStatus = 404;
        throw error;
      }
      deletePics(student.img);
      return Student.findByIdAndRemove(id);
    })
    .then((result) => {
      res.status(200).json({
        message: "Student deleted !!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const updateStudent = (req, res, next) => {
  const id = req.params.id;
  const { name, firstname, email, grade, age, branch, skills } = req.body;
  const image = req.file.path;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("No input value");
    (err.errorStatus = 400), (err.data = errors.array());
    throw err;
  }
  if (!req.file) {
    const err = new Error("no image to upload");
    err.errorStatus = 422;
    throw err;
  }
  Student.findById(id)
    .then((student) => {
      if (!student) {
        const err = new Error("No student with this ID");
        err.errorStatus = 404;
        throw err;
      }
      student.name = name;
      student.firstname = firstname;
      student.email = email;
      student.grade = grade;
      student.age = age;
      student.branch = branch;
      student.skills = skills;
      student.img = image;
      return student.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "student updated !!",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
export default router;
