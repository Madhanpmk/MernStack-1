const express = require("express")
const mongoose =require('mongoose')
const cors = require("cors")
const partnermodel=require('./models/login')
const MyModel = require("./models/insert")

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/partner")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


 // <-----------------------------SIGNUP-------------------------------->

app.post('/register', (req, res) => {
    const { email } = req.body; 
    partnermodel.findOne({ email: email })
      .then(user => {
        if (user) {
          res.json("User already registered");
        } else {
          partnermodel.create(req.body)
            .then(() => res.json("success"))
            .catch(err => res.status(500).json("Registration failed: " + err.message));
        }
      })
      .catch(err => res.status(500).json("Error: " + err.message)); 
  });


  // <-----------------------------LOGIN-------------------------------->
  
  app.post("/login", (req, res) => {
    const { email, pass } = req.body;//Getting email,password from frontend
    partnermodel.findOne({ email: email }) //searches for a document (record) in the database collection where email matches
      .then(user => {
        if (user) {
          if (user.pass === pass) {
            res.json("success");
          } else {
            res.json("Incorrect password");
          }
        } else {
          res.json("No record found");
        }
      })
      .catch(err => res.status(500).json("Error: " + err.message));
  });
  app.get("/log", async (req, res) => {
    try {
      const items = await partnermodel.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // <-----------------------------INSERT-------------------------------->

  
  app.post('/addData', (req, res) => {
    const { modelno, type, status, roomno } = req.body;

    // Check if all fields are provided
    if (modelno && type && status && roomno) {
        // Check for duplicate data based on "modelno"
        MyModel.findOne({ modelno }) // No need for `where`
            .then(existingRecord => {
                if (existingRecord) {
                    // Respond with an error if duplicate is found
                    res.status(409).json("Duplicate entry: Model number already exists");
                } else {
                    // Create new record if no duplicate is found
                    MyModel.create({ 
                        modelno, 
                        type, 
                        status, 
                        roomno, 
                        dateAdded: new Date() // Add the current date and time
                    })
                        .then(() => res.json("Data inserted successfully"))
                        .catch(err => res.status(500).json("Insertion failed: " + err.message));
                }
            })
            .catch(err => res.status(500).json("Error checking duplicates: " + err.message));
    } else {
        res.status(400).json("All fields are required");
    }
});


// <-----------------------------DELETE-------------------------------->

app.delete('/deleteData', async (req, res) => {
  const { modelno } = req.body;

  if (modelno) {
      try {
          // Check if the record with the given modelno exists
          const existingRecord = await MyModel.findOne({ modelno });

          if (!existingRecord) {
              return res.status(404).json("Model number not found. No record to delete."); // Return error if not found
          }

          // Perform the deletion
          await MyModel.deleteOne({ modelno });
          res.json("Data deleted successfully");
      } catch (err) {
          res.status(500).json("Deletion failed: " + err.message); // Handle server errors
      }
  } else {
      res.status(400).json("Model number is required");
  }
});

// <-----------------------------UPDATE-------------------------------->

  app.put('/updateData', (req, res) => {
    const { modelno, type, status, roomno } = req.body;
  
    if (modelno) {
      // Create an object with only the provided fields
      const updateData = {};
      if (type) updateData.type = type;
      if (status) updateData.status = status;
      if (roomno) updateData.roomno = roomno;
  
      MyModel.findOneAndUpdate(
        { modelno },
        { $set: updateData },
        { new: true, useFindAndModify: false } // Options to return the updated document and use the new MongoDB driver method
      )
        .then(data => {
          if (data) {
            res.json("Data updated successfully");
          } else {
            res.status(404).json("Record not found");
          }
        })
        .catch(err => res.status(500).json("Update failed: " + err.message));
    } else {
      res.status(400).json("Model number is required to update a record");
    }
  });

  // <-----------------------------DISPLAY DATA-------------------------------->
  
  app.get('/getDataByRoom', (req, res) => {
    const { roomno } = req.query;
  
    const query = roomno ? { roomno } : {};
  
    MyModel.find(query, 'type status')
      .then(data => {
        const typeCounts = data.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
        }, {});
  
        res.json({ data, typeCounts });
      })
      .catch(err => res.status(500).json("Error fetching data: " + err.message));
  });

  app.get("/fetch", async (req, res) => {
    try {
      const items = await MyModel.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  



// <---------------------connecting--------------------->

app.listen(3001,() =>{
    console.log("Connected ")
})

