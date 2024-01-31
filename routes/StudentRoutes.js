import express from 'express'
import { createStudent, getAllStudents,getStudentByID,deleteStudent, updateStudent } from '../controllers/StudentControllers.js'
const router = express.Router()


router.get('/',getAllStudents)
router.get('/:id',getStudentByID)
router.post('/',createStudent)
router.delete('/:id',deleteStudent)  
router.put('/:id',updateStudent)
export default router