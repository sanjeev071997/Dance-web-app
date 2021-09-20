const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanjeevkumar:sanjeev19970@danceweb.6zxjy.mongodb.net/Contact?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});
const port = 8080;

// Define the mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  })
const contact = mongoose.model('contact', contactSchema);

// Express specific stuff
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// hbs specific stuff
app.set('view engine', 'hbs')  // set the template engine as hbs
app.set('views', path.join(__dirname, 'views')) // set the views directory
app.set('views', path.join(__dirname, 'views'))

// Endpoints [template engine roote]
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.hbs', params)
}) 

app.get('/ContactUs.hbs', (req, res)=>{
    const params = {}
    res.status(200).render('ContactUs.hbs', params)
})

// Endpoints [template engine roote]
app.post('/ContactUs.hbs', (req,res)=>{
    var myData = new contact(req.body);
    myData.save(). then(()=>{
        res.send("Your form has been successfully submitted thank you !")
    }).catch(()=>{
         res.status(400).send("Form was not submited to the database")
     });

    });

// Start the server
app.listen(port ,()=>{
    console.log(`The application started successfully on port ${port}`)
});
