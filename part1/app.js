const express = require('express');
const initializeDatabase = require('./db');

const dogsRouter = require('./routes/dogs');
const walkRequestsRouter = require('./routes/walkrequests');
const walkersSummaryRouter = require('./routes/walkers');

const app = express();
const PORT = 8080;

initializeDatabase().then((db) => {
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use('/api/dogs', dogsRouter);
  app.use('/api/walkrequests', walkRequestsRouter);
  app.use('/api/walkers', walkersSummaryRouter);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to init DB:', err.message);
});
