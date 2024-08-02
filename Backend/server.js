const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const emailRoutes = require('./routes/email_routes');

mongoose.connect('mongodb+srv://sumitbhikhchandani99:Mohan123%40@cluster0.yixi6ic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', emailRoutes);
app.get('/', (req, res) => {
    res.send('This is backend of email_Schedular');
  });
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
