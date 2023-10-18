const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON data in request body
app.use(express.json());

// Middleware to parse URL-encoded data in request body
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

const { User, Profile } = prisma;

// Use your Prisma models for handling routes (adjust as per your model structure)
app.use('/api/users', require('./routes/routes')(User, Profile));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

module.exports = app;