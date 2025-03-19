require('dotenv').config();
const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const pool = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const app = express();

app.use(express.json());


app.use('/payment', paymentRoutes);
// Authentication Routes
app.use('/auth', authRoutes);

// app.use(cors());



const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT);
})