const Assignment = require('../models/assignmentModel');
// const { authenticateUser } = require('../controllers/userController')
const bcrypt=require('bcrypt')
const User=require('../models/userModel')

async function createAssignment(req, res) {
    try {
       
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
      }
  
     
      const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
      const [email, password] = credentials.split(':');
  
      
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed. User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
      }
        
      const { name, points, num_of_attempts, deadline } = req.body;
      const assignment = await Assignment.create({
        name,
        points,
        num_of_attempts,
        deadline,
        user_id:user.id
      });
  
      res.status(201).json(assignment);
    } catch (error) {
      console.error(`Error creating assignment: ${error.message}`);
      res.status(400).json({error:'Bad Request',message:"Missing required fields"});
    }
  }

  async function updateAssignment(req, res) {
    try {
       
      const authHeader = req.headers['authorization'];
      
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
      }
  
     
      const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
      const [email, password] = credentials.split(':');
  
      
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed. User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
      }

      const {id}=req.params;
      const { name, points, num_of_attempts, deadline } = req.body;
      const assignment=await Assignment.findOne({where:{id}})
      if(!assignment){
       return res.status(404).json({error:'Assignment not found'})
      }
      if(assignment.user_id!==user.id){
         return res.status(403).json({error:'Forbidden'})
      }
      assignment.name = name;
    assignment.points = points;
    assignment.num_of_attempts = num_of_attempts;
    assignment.deadline = deadline;
    await assignment.save();
    if (!assignment) {
        return res.status(400).json({ error: 'Bad Request. Failed to update assignment.' });
      }
  
      
      res.status(204).send()
    // res.status(200).json(assignment)
    }catch(error){
        res.status(400).json({message:"Bad Request"})
    }
}

async function getAllAssignments(req,res){
   
   
    try {
            
      const authHeader = req.headers['authorization'];
      
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
      }
  
     
      const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
      const [email, password] = credentials.split(':');
  
      
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed. User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
      }

        
        // const assignments = await Assignment.findAll()
        const assignments = await Assignment.findAll({
            where: { user_id: user.id },
          });
          if (assignments.length === 0) {
            return res.status(403).json({ error: 'Forbidden. User has not created any assignments.' });
          }
         res.status(200).json(assignments)
      } catch (error) {
        console.error(`Error fetching assignments: ${error.message}`)
        res.status(400).json({message:"Bad Request"})
      }
}


async function deleteAssignment(req, res) {
  try {
   
         
    const authHeader = req.headers['authorization'];
      
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

   
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
    }
    if(assignment.user_id!==user.id){
        return res.status(403).json({error:'Forbidden'})
     }
    const { id } = req.params;
    const assignment = await Assignment.findByPk(id);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    await assignment.destroy();
    res.status(204).send();
    // res.status(200).json(assignment);
  } catch (error) {
    console.error(`Error deleting assignment: ${error.message}`);
    res.status(400).json({message:"Bad Request"});
  }
}

async function getAssignment(req, res) {
    try {
     
           
      const authHeader = req.headers['authorization'];
        
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
      }
  
     
      const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
      const [email, password] = credentials.split(':');
  
      
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed. User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
      }
      // if(assignment.user_id!==user.id){
      //     return res.status(403).json({error:'Forbidden'})
      //  }
      const { id } = req.params;
      const assignment = await Assignment.findByPk(id);
  
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      if (assignment.user_id !== user.id) {
        return res.status(403).json({ error: 'Forbidden' });
    }
      res.status(200).json(assignment);
    } catch (error) {
      console.error(`Error Finding assignment: ${error.message}`);
      res.status(400).json({message:"Bad Request" });
    }
  }


  
  module.exports = {
    createAssignment,
    updateAssignment,
    getAllAssignments,
    deleteAssignment,
     getAssignment
  };
  

//   module.exports={createAssignment}
  
   
 