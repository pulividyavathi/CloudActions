require('dotenv').config()  
const express=require('express')
const app=express()
const sequelize = require('./config/dbConfig');
const bodyParser = require('body-parser')
const cors = require('cors');
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
})

const userRoute=require('./routes/userRoute')
const assignmentRoute=require('./routes/assignmentRoute')
const PORT=process.env.PORT

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());


app.use('/users',userRoute)
app.use('/v1/assignments',assignmentRoute)
// app.get('/healthz',async(req,res)=>{
  
//   if (req.headers['content-length'] || req.headers['transfer-encoding'] || Object.keys(req.query).length > 0){
//     res.status(400).json();
//     console.log("Bad Request - Query Parameters Not Allowed");
//     return;
//   }
//    try {
// 	   await sequelize.authenticate();
// 	    res.set('Cache-Control','no-cache')
// 	   res.status(200).json()
// 	   console.log("Connected to database")	   
//    } catch (error) {
// 	   res.status(503).json()
//      console.log("Disconnected")	   
//    }
// }) 

app.get('/healthz', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: 'Connected to database' });
  } catch (error) {
    res.status(503).json({ message: 'Disconnected' });
  }
});

app.use((req, res, next) => {
  if (req.headers['content-length'] || req.headers['transfer-encoding'] || Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    return res.status(400).json({ message: 'Bad Request - Query Parameters Not Allowed' });
  }
  next();
});
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Bad Request - Invalid JSON' });
  } else {
    next();
  }
});
app.all('/healthz', (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send();
    console.log("Method Not Allowed");
  }
})
sequelize
  .sync()
  .then(() => {
    console.log('Database is connected and synced.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

  app.get('/',(req,res)=>{
	res.status(200).json({message:"Hello Welcome to Cloud assignment 3 Cloud Applications"})
  })
// app.all('*', (req, res) => {
//   res.set('Cache-Control','no-cache')
//    res.status(405).json();
//  });

 
// app.listen(PORT,()=>{
// 		   console.log(`Node api app is running on ${PORT}`)
// 		})

module.exports={app}