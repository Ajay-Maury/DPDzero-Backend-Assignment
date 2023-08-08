const express = require('express');
require('dotenv').config();
const cors = require("cors");
const sequelize = require('./src/config/sequelize');
const userRoutes = require('./src/routes/userRoutes');
const dataRoutes = require('./src/routes/dataRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api', dataRoutes);

sequelize
  .sync({ force: false }) // Set force to true to drop and recreate tables on each start
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
