const express = require('express')
const router = express.Router()
const {createAssignment, updateAssignment, getAllAssignments, deleteAssignment, getAssignment}=require('../controllers/assignmentController')

router.post('/createAssignment',createAssignment)
router.put('/updateAssignment/:id',updateAssignment)
router.get('/getAllAssignments',getAllAssignments)
router.delete('/deleteAssignment/:id',deleteAssignment)
router.get('/getAssignment/:id',getAssignment)
module.exports=router
